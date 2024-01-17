import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      type: 'input',
      message: 'Type in your URL:',
      name: 'url',
    },
  ])
  .then((answers) => {
    const url = answers.url;

    // Generate QR code image
    const qrSvg = qr.image(url, { type: 'png' });
    qrSvg.pipe(fs.createWriteStream('qr-code.png'));

    // Save user input to a TXT file
    fs.writeFile('URL.txt', url, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
  .catch((err) => {
    if (err.isTtyError) {
      console.error('Prompt couldn\'t be rendered in the current environment');
    } else {
      console.error('Something else went wrong', err);
    }
  });
