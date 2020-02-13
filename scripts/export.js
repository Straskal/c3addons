const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const fsExtra = require('fs-extra');
const zipFolder = require('zip-folder');

fs.readdir(`./addons`, (_, items) => 
{
    const files = [];

    for (const item of items) 
    {
        const filePath = `./addons/${item}`;

        files.push({
            baseName: path.basename(filePath),
            path: filePath
        });
    }

    inquirer.prompt({
        type: 'list',
        name: 'addonToExport',
        message: 'choose addon to export:',
        choices: files.map(f => f.baseName)
    })
    .then(answer => 
    {
        fsExtra.ensureDirSync('./exports');
        
        const toExport = files.filter(f => f.baseName === answer.addonToExport)[0];

        zipFolder(
            toExport.path, 
            `./exports/${toExport.baseName.toLowerCase().split(' ').join('-')}.c3addon`,
            err => {
                if (err) 
                {
                    console.log('Error occured:', err);
                }
                else 
                {
                    console.log('Successfully exported .c3addon: ' + path.resolve(`./exports/${toExport.baseName.toLowerCase().replace(' ', '-')}.c3addon`));
                }
            });
    });
});