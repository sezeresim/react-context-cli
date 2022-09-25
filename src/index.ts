#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import shell from 'shelljs'
import jscontent from './files/jscontent'
import tscontent from './files/tscontent'

/** Globals */
let contextFileName: string = 'ExampleContextFileName'
let fileType: 'ts' | 'js' = 'ts'

async function initContextFileName() {
    const answers = await inquirer.prompt({
        name: 'context_file_name',
        type: 'input',
        message: 'Enter context file prefix',
        default() {
            return 'ExampleContextFileName'
        },
    })

    contextFileName = answers.context_file_name
}

async function getFileType() {
    const answers = await inquirer.prompt({
        name: 'file_type',
        type: 'list',
        message: 'Select File Type\n',
        choices: ['ts', 'js'],
    })
    fileType = answers.file_type
}

function createFiles() {
    console.log(
        `\n\nCreating ${contextFileName}.context.${fileType}x ${contextFileName}.enums.${fileType} ${contextFileName}.types.${fileType} ${contextFileName}.reducer.${fileType}x\n\n`
    )

    const contentFiles = {
        js: [
            {
                command: `echo "${jscontent.CONTEXT_FILE.replace(
                    /RCACLI/gi,
                    contextFileName
                )}" >  ${contextFileName}.context.${fileType}x`,
            },
            {
                command: `echo "${jscontent.ENUMS_FILE}" >  ${contextFileName}.enums.${fileType}`,
            },
            {
                command: `echo "${jscontent.REDUCER_FILE.replace(
                    /RCACLI/gi,
                    contextFileName
                )}" >  ${contextFileName}.reducer.${fileType}x`,
            },
        ],
        ts: [
            {
                command: `echo "${tscontent.CONTEXT_FILE.replace(
                    /RCACLI/gi,
                    contextFileName
                )}" >  ${contextFileName}.context.${fileType}x`,
            },
            {
                command: `echo "${tscontent.ENUMS_FILE}" >  ${contextFileName}.enums.${fileType}`,
            },
            {
                command: `echo "${tscontent.TYPES_FILE.replace(
                    /RCACLI/gi,
                    contextFileName
                )}" >  ${contextFileName}.types.${fileType}`,
            },
            {
                command: `echo "${tscontent.REDUCER_FILE.replace(
                    /RCACLI/gi,
                    contextFileName
                )}" >  ${contextFileName}.reducer.${fileType}x`,
            },
        ],
    }

    contentFiles[fileType].forEach((el) => {
        shell.exec(el.command)
    })
}

// Run it with top-level await

async function run() {
    console.clear()
    await initContextFileName()
    await getFileType()
    createFiles()
}

run()
