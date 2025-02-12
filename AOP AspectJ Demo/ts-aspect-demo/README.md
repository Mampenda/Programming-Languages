# ts-aspect-demo

This project demonstrates the use of the `ts-aspect` library to apply aspect-oriented programming (AOP) in TypeScript.

## Project Structure

ts-aspect-demo/
├── node_modules/ # Directory containing installed npm packages
├── src/ # Directory containing the TypeScript source files
│ └── index.ts # Main TypeScript file with the example code
├── dist/ # Directory where the compiled JavaScript files will be output
├── package.json # npm configuration file
├── tsconfig.json # TypeScript configuration file
└── README.md # This README file

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Setup

1. **Install dependencies**:
   Navigate to the `ts-aspect-demo` directory and run the following command to install the required dependencies:

   ```sh
   npm install
   ```

2. **Build the project**:
   Compile the TypeScript code to JavaScript by running:

   ```sh
   npm run build
   ```

3. **Run the project**:
   Execute the compiled JavaScript code using Node.js:

   ```sh
   node dist/index.js
   ```

## Explanation

The `index.ts` file contains an example of using the `ts-aspect` library to log method calls in a `Calculator` class. The `LogAspect` class implements the `Aspect` interface and logs the method name whenever a method in the `Calculator` class is called.

The `addAspectToPointcut` function is used to apply the `LogAspect` to all methods in the `Calculator` class, logging a message before each method is executed.
