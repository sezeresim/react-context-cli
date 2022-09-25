#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import shell from 'shelljs';
import files from "./files"
let contextFileName="Test"
let fileType="ts"



async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Hello cli-context \n'
  );

  rainbowTitle.stop();
}

async function initContextFileName() {
  const answers = await inquirer.prompt({
    name: 'context_file_name',
    type: 'input',
    message: 'Enter context file prefix',
    default() {
      return 'Bookings';
    },
  });

  contextFileName = answers.context_file_name;
}

async function getFileType() {
  const answers = await inquirer.prompt({
    name: 'file_type',
    type: 'list',
    message: 'Select File Type\n',
    choices: [
      "ts",
      /* "js" */
    ],
  });
  fileType = answers.file_type;
  
}


function createFiles() {
  
  console.log(
      chalk.blue(
        `\n\nCreating ${contextFileName}.context.${fileType}x ${contextFileName}.enums.${fileType} ${contextFileName}.types.${fileType} ${contextFileName}.reducer.${fileType}x\n\n`
      )
    );

    shell.rm('-rf',"examples");
    shell.mkdir("examples")
    shell.cd("examples")
    shell.exec(`echo "${files.CONTEXT_FILE.replace(/CONTEXT_NAME/ig,contextFileName)}" >  ${contextFileName}.context.${fileType}x`) 
    shell.exec(`echo "${files.ENUMS_FILE}" >  ${contextFileName}.enums.${fileType}`) 
    shell.exec(`echo "${files.TYPES_FILE.replace(/CONTEXT_NAME/ig,contextFileName)}" >  ${contextFileName}.types.${fileType}`) 
    shell.exec(`echo "${files.REDUCER_FILE.replace(/CONTEXT_NAME/ig,contextFileName)}" >  ${contextFileName}.reducer.${fileType}x`) 
}





// Run it with top-level await


async function run() {
  console.clear();
await welcome();
await initContextFileName();
await getFileType();
createFiles()
}
run()