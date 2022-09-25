#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const shelljs_1 = __importDefault(require("shelljs"));
const jscontent_1 = __importDefault(require("./files/jscontent"));
const tscontent_1 = __importDefault(require("./files/tscontent"));
/** Globals */
let contextFileName = 'ExampleContextFileName';
let fileType = 'ts';
function initContextFileName() {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer_1.default.prompt({
            name: 'context_file_name',
            type: 'input',
            message: 'Enter context file prefix',
            default() {
                return 'ExampleContextFileName';
            },
        });
        contextFileName = answers.context_file_name;
    });
}
function getFileType() {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer_1.default.prompt({
            name: 'file_type',
            type: 'list',
            message: 'Select File Type\n',
            choices: ['ts', 'js'],
        });
        fileType = answers.file_type;
    });
}
function createFiles() {
    console.log(`\n\nCreating ${contextFileName}.context.${fileType}x ${contextFileName}.enums.${fileType} ${contextFileName}.types.${fileType} ${contextFileName}.reducer.${fileType}x\n\n`);
    const contentFiles = {
        js: [
            {
                command: `echo "${jscontent_1.default.CONTEXT_FILE.replace(/RCACLI/gi, contextFileName)}" >  ${contextFileName}.context.${fileType}x`,
            },
            {
                command: `echo "${jscontent_1.default.ENUMS_FILE}" >  ${contextFileName}.enums.${fileType}`,
            },
            {
                command: `echo "${jscontent_1.default.REDUCER_FILE.replace(/RCACLI/gi, contextFileName)}" >  ${contextFileName}.reducer.${fileType}x`,
            },
        ],
        ts: [
            {
                command: `echo "${tscontent_1.default.CONTEXT_FILE.replace(/RCACLI/gi, contextFileName)}" >  ${contextFileName}.context.${fileType}x`,
            },
            {
                command: `echo "${tscontent_1.default.ENUMS_FILE}" >  ${contextFileName}.enums.${fileType}`,
            },
            {
                command: `echo "${tscontent_1.default.TYPES_FILE.replace(/RCACLI/gi, contextFileName)}" >  ${contextFileName}.types.${fileType}`,
            },
            {
                command: `echo "${tscontent_1.default.REDUCER_FILE.replace(/RCACLI/gi, contextFileName)}" >  ${contextFileName}.reducer.${fileType}x`,
            },
        ],
    };
    contentFiles[fileType].forEach((el) => {
        shelljs_1.default.exec(el.command);
    });
}
// Run it with top-level await
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        yield initContextFileName();
        yield getFileType();
        createFiles();
    });
}
run();
