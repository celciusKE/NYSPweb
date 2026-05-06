require('dotenv').config();

const nodemailer = require('nodemailer');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

// These values must be defined in .env before an email can be sent.
const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'EMAIL_TO'];

// Keep all report paths anchored to this script so it works from any shell.
const reportDir = path.join(__dirname, 'playwright-report');
const reportZip = path.join(__dirname, 'playwright-report.zip');
const resultsXml = path.join(__dirname, 'results.xml');

// Fail early with a clear message if the email configuration is incomplete.
for (const name of requiredEnvVars) {
  if (!process.env[name]) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}

// Compress the Playwright HTML report before attaching it to the email.
async function zipReport() {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(reportDir)) {
      reject(new Error(`Missing Playwright HTML report folder: ${reportDir}`));
      return;
    }

    const output = fs.createWriteStream(reportZip);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', resolve);
    archive.on('error', reject);

    archive.pipe(output);
    archive.directory(reportDir, false);
    archive.finalize();
  });
}

// Playwright writes totals to results.xml via the JUnit reporter.
function readStats() {
  if (!fs.existsSync(resultsXml)) {
    throw new Error(`Missing Playwright JUnit results file: ${resultsXml}`);
  }

  const xml = fs.readFileSync(resultsXml, 'utf8');
  const testsuitesTag = xml.match(/<testsuites\b[^>]*>/);

  if (!testsuitesTag) {
    throw new Error(`Could not read test totals from ${resultsXml}`);
  }

  const getNumber = (name) => {
    const match = testsuitesTag[0].match(new RegExp(`${name}="(\\d+)"`));
    return match ? Number(match[1]) : 0;
  };

  const total = getNumber('tests');
  const failed = getNumber('failures') + getNumber('errors');
  const skipped = getNumber('skipped');
  const passed = Math.max(total - failed - skipped, 0);

  return { passed, failed, skipped, total };
}

// Build and send the report email using Gmail credentials from .env.
async function sendEmail() {
  const { passed, failed, skipped, total } = readStats();
  const status = failed > 0 ? 'FAILED' : 'PASSED';

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
    subject: `[Playwright] ${status} - ${passed} passed, ${failed} failed`,
    html: `
      <h2>Playwright Test Report</h2>
      <table>
        <tr><td>Total</td><td><b>${total}</b></td></tr>
        <tr><td>Passed</td><td><b>${passed}</b></td></tr>
        <tr><td>Failed</td><td><b>${failed}</b></td></tr>
        <tr><td>Skipped</td><td><b>${skipped}</b></td></tr>
      </table>
      <p>Full report attached. Also available in <b>GitHub Actions - Artifacts</b>.</p>
    `,
    attachments: [
      {
        filename: 'playwright-report.zip',
        path: reportZip,
      },
    ],
  });

  console.log(`Email sent successfully to ${process.env.EMAIL_TO}`);
}

// Create the attachment first, then send it.
zipReport()
  .then(sendEmail)
  .catch((err) => {
    console.error('Error:', err);
    process.exitCode = 1;
  });
