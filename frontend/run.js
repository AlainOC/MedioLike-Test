const { exec } = require('child_process');
const fs = require('fs');

exec('npx ng build', (error, stdout, stderr) => {
    fs.writeFileSync('build.log', `STDOUT:\n${stdout}\nSTDERR:\n${stderr}`);
    console.log('Log dumped to build.log');
});
