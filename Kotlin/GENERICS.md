# Kotlin Generics

Kotlin's generics are similar to Java's but **without wildcards and raw types**.

```kotlin
// Type Inference
val words = listOf("hello", "world") // List<String> inferred

// Explicit type declaration
val a: MutableList<Int> = mutableListOf(1,2)
val b = mutableListOf<Int>(1, 2) // Equivalent to `a`

// Generics in Extension Functions
fun <T> List<T>.slice(indices: IntRange): List<T> = subList(indices.first, indices.last + 1)
val letters = ('a'..'z').toList()
println(letters.slice(0..2)) // Type inferred as List<Char>

// Generics & Lambdas
fun <T> List<T>.filter(predicate: (T) -> Boolean): List<T> = this.filter(predicate)
val cities = listOf("Bergen", "Oslo", "Helsinki", "Åbo")
val capitals = listOf("Oslo", "Helsinki")

// `it`, inferred as String, is the implicit name of a single-parameter lambda argument.
println(cities.filter { it !in capitals })
```
