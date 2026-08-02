require('ftp-deploy-static').deployFromEnv().catch(err => {
  console.error(err.message);
  process.exit(1);
});
