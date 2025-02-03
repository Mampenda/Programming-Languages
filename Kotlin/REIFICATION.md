# Reification in Kotlin

**Issue with Type Erasure in Kotlin:**
Normally, type parameters are erased at runtime, making instance checks impossible.

```kotlin
fun <T> isOfType(value: Any) = value is T  // ❌Error: Compile-time error

// Reified Type Parameters are allowed in Kotlin in inline functions to retain type information,
// because the compiler replaces function calls with actual bytecode, embedding the type directly.
inline fun <reified T> isOfType(value: Any) = value is T  // ✅ OK

// Practical use: filterIsInstance
inline fun <reified T> Iterable<*>.filterIsInstance(): List<T> = filter { it is T } as List<T>
val items = listOf("one", 2, "three")
println(items.filterIsInstance<String>())  // ✅ OK: Output = [one, three]
```

## Type Projections

**Star Projections**(`List<*>`):
A type of unknown type parameter. Equivalent to Java's `List<?>`. It allows access to elements but restricts modifications. It allows safe reading but not modification.

- **Kotlin**: Safe element retrieval (`list.first()`), but no safe element modification or adding.
- **Java**: Similar restrictions apply.

**`OUT`-Projections**(`List<out T>`):

Represents a covariant type, meaning `T` can only be returned, not accepted (no modifying).

- **Example**: `VendingMachine<out Snack>`.
- **Limitation**: Methods with `in`-position parameters become impossible to implement (can't pass `Nothing`).

**`IN`-Projections** (`List<in T>`):

Represents a contravariant type, where `T` can only be passed as arguments, not returned.

- **Example**: `VendingMachine<in CandyBar>`.
- **Limitation**: Return types are `Any?`.

**Star-Projections** (`VendingMachine<*>`):

Treats the type argument as unknown. Behaves similarly to `out` with a broader scope. Equivalent to `VendingMachine<out Product>`.

- Use when the type argument is irrelevant.
- It replaces `in`-position types with `Nothing` and `out`-position types with the upper bound of `T`.

Kotlin's projection system allows flexibility in handling variance, letting you control the behavior of types in generics based on whether they are inputs or outputs.
