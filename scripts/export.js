const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const fsExtra = require('fs-extra');
var zipFolder = require('zip-folder');

if (fs.existsSync('./addons')) {
    fs.readdir(`./addons`, (err, items) => {
        const files = [];
        for (var i = 0; i < items.length; i++) {
            let filePath = `./addons/${items[i]}`;
            files[i] = {
                baseName: path.basename(filePath),
                path: filePath
            };
        }
        inquirer
            .prompt({
                type: 'list',
                name: 'toExport',
                message: 'choose addon to export:',
                choices: files.map(f => f.baseName)
            })
            .then(moreAnswers => {
                const toExport = files.filter(f => f.baseName === moreAnswers.toExport)[0];
                fsExtra.ensureDirSync('./exports');
                zipFolder(
                    toExport.path, `./exports/${toExport.baseName.toLowerCase().split(' ').join('-')}.c3addon`,
                    err => {
                        if (err) {
                            console.log('Error occured:', err);
                        }
                        else {
                            console.log('Successfully exported .c3addon: ' + path.resolve(`./exports/${toExport.baseName.toLowerCase().replace(' ', '-')}.c3addon`));
                        }
                    });
            });
    });
}
else {
    console.warn('there are no addons to export.');
    console.warn('your addon files must be in a project folder named addons.');
}