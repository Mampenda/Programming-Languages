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
