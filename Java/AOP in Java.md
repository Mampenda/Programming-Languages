# Aspect-Oriented Programming (AOP)

## What is AOP?

Ascpect-Opriented Programming (AOP) is a programming paradigm that helps separate **cross-cutting concerns** (e.g., logging, security, caching) from the core business logic, improving **modularity** and **maintainability**.

### Core Concepts of AOP

`Aspect`: A modular unit that encapsulates a cross-cutting concern.
`Join Point`: A specific point in the program execution where an aspect can be applied (e.g., method execution).
`Pointcut`: A set of join points where an aspect’s advice should be applied.
`Advice`: The actual action to be executed at a join point (before, after, or around).
`Weaving`: The process of applying aspects to the target code at the specified join points.

#### Types of Advice

`Before Advice`: Runs before the target method executes.
`After Advice`: Runs after the target method executes.
`Around Advice`: Wraps the target method, allowing control before and after execution.
`After Returning Advice`: Runs only if the method executes successfully.
`After Throwing Advice`: Runs if an exception is thrown.

### AOP in Action - Spring AOP

```java
import org.aspectj.lang.annotation.*;

@Aspect
public class LoggingAspect {

    // Pointcut: Matches all methods starting with "set" in any class
    @Pointcut("execution(* set*(..))")
    public void setterMethods() {}

    // Before Advice: Runs before any setter method
    @Before("setterMethods()")
    public void logBeforeSetter() {
        System.out.println("Setter method called!");
    }

    // After Advice: Runs after any setter method
    @After("setterMethods()")
    public void logAfterSetter() {
        System.out.println("Setter method executed!");
    }
}

// Target Class
class Employee {
    private String name;

    public void setName(String name) {
        this.name = name;
    }
}

// Weaving Happens Here (Spring automatically applies aspects)
public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee();
        emp.setName("John Doe"); // Triggers AOP Logging
    }
}
```

#### Key Takaways

AOP **reduces code duplication** and **separates concerns** like logging, security, and transactions.
**Pointcuts** determine where aspects apply, while **advices** define what happens at those points.
**Weaving** integrates aspects into the main program, which can happen at compile-time, load-time, or runtime.

#### Key Terminology (repeated)

**Join Point** – A point in the execution where an aspect can be applied (e.g., method execution, field access).
**Pointcut** – A rule that specifies which join points should be intercepted (e.g., all methods starting with "set").
**Advice** – The actual action to perform at a join point (e.g., logging, security checks).

- `@Before` – Runs before the join point.
- `@After` – Runs after the join point.
- `@Around` – Wraps around the join point (executing before and after).

**Weaving** – The process of injecting aspect logic into the target code (compile-time, load-time, or runtime).

### AOP in Action - AspectJ in Java

```java
@Aspect
public class LoggingAspect {
    @Before("execution(* Book.*(..)) || execution(* Library.*(..))")
    public void logMethodAccess(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        System.out.println("METHOD CALLED: " + signature.getDeclaringType().getSimpleName() + "." + signature.getMethod().getName());
    }
}
```

**Pointcut**: Intercepts all methods in Book and Library classes.
**Advice**: Logs method calls before execution.
**Weaving**: Done by AspectJ at runtime.

#### Common Join Points in AspectJ

- Method execution
- Constructor execution
- Field assignment
- Exception handling
- Static initializer execution

#### Real-World AOP Use Cases

- Logging (track method calls)
- Security (authentication, authorization checks, validating inputs to prevent SQL injection)
- Transaction management (rollback on failure)
- Error handling (centralized try-catch)
- Performance monitoring (execution time tracking)
- Thread synchronization (prevent race conditions)

### Example: AOP in TypeScript

```typescript
// Importing necessary AOP functions and types from "ts-aspect"
import {
  Aspect, // Interface for defining an aspect (cross-cutting concern)
  AspectContext, // Provides details about the intercepted method
  Advice, // Enum for when the aspect should run (Before, After, Around, etc.)
  addAspectToPointcut, // Function to apply an aspect to specific methods
} from "ts-aspect";

// Defining a logging aspect that will execute before method calls
class LogAspect implements Aspect {
  execute(ctx: AspectContext): void {
    // Logs the method name before it gets executed
    console.log(ctx.methodName + " was called!!!");
  }
}

// A simple Calculator class with basic arithmetic operations
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

// Creating an instance of the Calculator class
const calculator = new Calculator();

// Applying the LogAspect before every method in the Calculator class
// ".*" (regex) means all methods in the class will be intercepted
addAspectToPointcut(calculator, ".*", Advice.Before, new LogAspect());

// Calling a method, which will trigger the aspect first
calculator.add(1, 2); // Logs "add was called!!!" before returning 3
```
