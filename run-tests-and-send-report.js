const { spawnSync } = require('child_process');
const path = require('path');

const isWindows = process.platform === 'win32';
const playwrightBin = path.join(
  __dirname,
  'node_modules',
  '.bin',
  isWindows ? 'playwright.cmd' : 'playwright'
);

const testResult = spawnSync(playwrightBin, ['test'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: false,
});

const reportResult = spawnSync(process.execPath, ['send-report.js'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: false,
});

if (reportResult.status !== 0) {
  process.exit(reportResult.status || 1);
}

process.exit(testResult.status || 0);
