import { spawnSync } from 'child_process';

const run = (args) => spawnSync('git', args, {
  encoding: 'utf8',
  stdio: 'pipe',
});

const lfsVersion = run(['lfs', 'version']);

if (lfsVersion.error || lfsVersion.status !== 0) {
  console.log('[photography] git-lfs is not available; skipping LFS pull.');
  process.exit(0);
}

const pullResult = run(['lfs', 'pull']);

if (pullResult.status !== 0) {
  console.log('[photography] git-lfs pull was skipped or failed; build will continue.');
  if (pullResult.stderr) {
    console.log(pullResult.stderr.trim());
  }
}