#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import {exec}  from 'child_process'
import shell from 'shelljs';

let contextFileName="Test"
let fileType="js"

const CONTEXT_FILE=`import React, {
  ComponentType,
  createContext,
  useContext,
  useReducer,
} from "react";

import { ActionTypes } from "./ShipmentFirms.enums";
import seachReducer, { initialState } from "./ShipmentFirms.reducer";
import { ContextType } from "./ShipmentFirms.types";

const ShipmentFirms = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

export function ShipmentFirmsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(seachReducer, initialState);

  

  const value: ContextType = {
    state,
    dispatch,
  };

  return (
    <ShipmentFirms.Provider value={value}>{children}</ShipmentFirms.Provider>
  );
}

export function withShipmentFirms(Component: ComponentType) {
  return function LayoutHocWrapper(props: any) {
    return (
      <ShipmentFirmsProvider>
        <ShipmentFirms.Consumer>
          {() => <Component {...props} />}
        </ShipmentFirms.Consumer>
      </ShipmentFirmsProvider>
    );
  };
}

export function useShipmentFirms(): ContextType {
  const context = useContext(ShipmentFirms);
  if (context === undefined) {
    throw new Error(
      "useShipmentFirms must be used within a ShipmentFirmsProvider"
    );
  }
  return context;
}
`


const sleep = (ms = 500) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Hello cli-context \n'
  );
  await sleep();
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
      ".ts",
      ".js"
    ],
  });
  fileType = answers.file_type;
  
}


function createFiles() {
  
  console.log(
      chalk.green(
        `Creating ${contextFileName}.context.tsx ${contextFileName}.enums.ts ${contextFileName}.types.ts ${contextFileName}.reducer.tsx`
      )
    );
    shell.rm('-rf',"test");
    shell.mkdir("test")
    shell.cd("test")
    shell.exec(`echo "${CONTEXT_FILE}" >  ${contextFileName}.context.tsx`) 
    shell.touch(`${contextFileName}.enums.ts`)
    shell.touch(`${contextFileName}.types.ts`)
    shell.touch(`${contextFileName}.reducer.tsx`)

}





// Run it with top-level await
console.clear();
/* await welcome();
await initContextFileName();
await getFileType(); */
createFiles()
