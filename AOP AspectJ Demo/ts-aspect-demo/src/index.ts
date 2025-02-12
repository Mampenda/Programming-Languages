import {
    Aspect,
    AspectContext,
    Advice,
    addAspectToPointcut,
    addAspect,
    UseAspect,
  } from "ts-aspect";
  
  // More info: https://www.npmjs.com/package/ts-aspect
  
  class LogAspect implements Aspect {
    execute(ctx: AspectContext): void {
      console.log(ctx.methodName + " was called!!!");
    }
  }
  
  class Calculator {
    public add(a: number, b: number) {
      return a + b;
    }
  
    public subtract(a: number, b: number) {
      return a - b;
    }
  
    public divide(a: number, b: number) {
      if (b === 0) {
        throw new Error("Division by zero!");
      }
      return a / b;
    }
  
    public multiply(a: number, b: number) {
      return a * b;
    }
  }
  
  const calculator = new Calculator();
  addAspectToPointcut(calculator, ".*", Advice.Before, new LogAspect());
  
  calculator.add(1, 2);  