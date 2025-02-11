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

### AOP in Action - A Simple Example (Spring AOP)

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

#### Key-Takaways

AOP **reduces code duplication** and **separates concerns** like logging, security, and transactions.
**Pointcuts** determine where aspects apply, while **advices** define what happens at those points.
**Weaving** integrates aspects into the main program, which can happen at compile-time, load-time, or runtime.
