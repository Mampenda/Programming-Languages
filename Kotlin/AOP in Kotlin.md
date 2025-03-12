# Aspect-Oriented Programming (AOP)

AOP is primarily used in **Java**, especially with **Spring AOP** and **AspectJ**. However, it can also be used in **Kotlin**, since Kotlin runs on the JVM and is compatible with Java-based AOP frameworks like Spring AOP. Kotlin developers can leverage Spring AOP annotations (`@Aspect`, `@Before`, `@After`, etc.) just like in Java.

That said, AOP is **less common in Kotlin** because Kotlin favors more functional and inline approaches to handling cross-cutting concerns, such as **higher-order functions and delegated properties**.

## Example: AOP in Kotlin

This example of AOP in Kotlin uses Spring AOP and demonstrates **join** **points**, **pointcuts**, **advice**, and **weaving** in action.

###

**1. Dependencies**

```xml
<!-- Maven -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

```kotlin
// Gradle
implementation("org.springframework.boot:spring-boot-starter-aop")
```

**2. Target Class**

```kotlin
import org.springframework.stereotype.Service

@Service
class UserService {
    // Join Point: createUser() is where the AOP is applied
    fun createUser(name: String) {
        println("User $name has been created.")
    }
}
```

**3. Aspect Class**

```kotlin
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Before
import org.springframework.stereotype.Component

@Aspect
@Component
class LoggingAspect {

    // Pointcut: execution(* com.example.demo.UserService.createUser(..)) targets the createUser()-method
    // Advice: @Before logs a message before the method runs
    @Before("execution(* com.example.demo.UserService.createUser(..))")
    fun logBeforeMethod() {
        println("Logging BEFORE createUser method is executed.")
    }
}
```

**4. Testing the AOP Implementation**

```kotlin
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.AnnotationConfigApplicationContext

@SpringBootApplication
class AopExampleApplication

fun main() {
    val context = AnnotationConfigApplicationContext(AopExampleApplication::class.java)
    val userService = context.getBean(UserService::class.java)

    userService.createUser("John Doe")
}
```

**Expected Output**

```sql
Logging BEFORE createUser method is executed.
User John Doe has been created.
```

**Explanation:**

The example shows how logging is automatically added before calling `createUser()` without modifying `UserService`, which is the essence of AOP!

In other words:

- **Pointcut**: Intercepts all method calls in com.example package.
- **Advice**: Logs method calls before execution.
- **Weaving**: Spring AOP weaves the aspect at runtime.

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
