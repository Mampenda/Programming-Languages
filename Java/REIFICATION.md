# Reification in Java

## What is Reification?

Reification means making types **fully available at runtime**. In Java, generic type information is erased after compilation, but some types remain **reifiable**, meaning they retain their full type information.

### Reifiable Types

These types **exist completely at runtime**:

- Primitive types (`int`, `double`, etc.)
- Non-generic classes/interfaces (`String`, `Number`, `Runnable`)
- Wildcards (`List<?>`, `Map<?, ?>`)
- Raw types (`List`, `ArrayList`)
- Arrays of reifiable types (`int[]`, `List<?>[]`)

### Non-Reifiable Types

These types lose information at runtime due to type erasure:

- Type variables (`T`)
- Parameterized types (`List<String>`, `Map<Integer`, `Double>`)
- Bounded wildcards (`List<? extends Number>`)

```java
// Example of syntax trickery:

`List<?>` // ✅ OK: reifiable
`List<? extends Object>` // ❌ Error: not reifiable (even though they are equivalent)

// Instance Tests and Reification
if (x instanceof T) { /* CODE */ }  // ❌ Error: T is erased
if (c instanceof List<?>) { return (List<T>) c; } // ✅ OK

// Arrays and Reification (Java does NOT allow generic array creation)
T[] arr = new T[size];  // ❌ Error: Compile-time error
T[] arr = (T[]) java.lang.reflect.Array.newInstance(T.class, size); // ✅ OK: Using reflection
```

**Key Takeaways:**
✔ Instance tests (`instanceOf`) must use reifiable types
✔ Casts should be to reifiable types
✔ Generic exceptions (`Throwable<T>`) are forbidden
✔ Varargs (`T... args`) should be reifiable

This ensures type safety and avoids runtime errors caused by type erasure.
