require('dotenv').config();
const nodemailer = require('nodemailer');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

// Zip the report using archiver (cross-platform)
async function zipReport() {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream('playwright-report.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', resolve);
    archive.on('error', reject);

    archive.pipe(output);
    archive.directory('playwright-report/', false);
    archive.finalize();
  });
}

async function sendEmail() {
  const results = JSON.parse(fs.readFileSync('playwright-report/results.json'));
  const { passed, failed, skipped } = results.stats;
  const status = failed > 0 ? '❌ FAILED' : '✅ PASSED';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `[Playwright] ${status} — ${passed} passed, ${failed} failed`,
    html: `
      <h2>Playwright Test Report</h2>
      <table>
        <tr><td>✅ Passed</td><td><b>${passed}</b></td></tr>
        <tr><td>❌ Failed</td><td><b>${failed}</b></td></tr>
        <tr><td>⏭️ Skipped</td><td><b>${skipped}</b></td></tr>
      </table>
      <p>Full report attached. Also available in <b>GitHub Actions → Artifacts</b>.</p>
    `,
    attachments: [
      {
        filename: 'playwright-report.zip',
        path: path.join(__dirname, 'playwright-report.zip'),
      },
    ],
  });

  console.log('Email sent successfully');
}

zipReport()
  .then(sendEmail)
  .catch(err => console.error('Error:', err));