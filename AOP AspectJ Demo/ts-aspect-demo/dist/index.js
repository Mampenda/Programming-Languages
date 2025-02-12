"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_aspect_1 = require("ts-aspect");
// More info: https://www.npmjs.com/package/ts-aspect
class LogAspect {
    execute(ctx) {
        console.log(ctx.methodName + " was called!!!");
    }
}
class Calculator {
    add(a, b) {
        return a + b;
    }
    subtract(a, b) {
        return a - b;
    }
    divide(a, b) {
        if (b === 0) {
            throw new Error("Division by zero!");
        }
        return a / b;
    }
    multiply(a, b) {
        return a * b;
    }
}
const calculator = new Calculator();
(0, ts_aspect_1.addAspectToPointcut)(calculator, ".*", ts_aspect_1.Advice.Before, new LogAspect());
calculator.add(1, 2);
