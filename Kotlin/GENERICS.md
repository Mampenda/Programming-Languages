# Kotlin

## Generics

Kotlin's generics are similar to Java's but **without wildcards and raw types**.

```kotlin
// Type Inference
val words = listOf("hello", "world") // `List<String>` will be inferred by compiler

// Explicit Type Declaration
val a: MutableList<Int> = mutableListOf(1,2) // These declarations are equivalent
val b = mutableListOf<Int>(1, 2) // These declarations are equivalent

// Generics in Extension Functions
fun <T> List<T>.slice(indices: IntRange): List<T> =
    subList(indices.first, indices.last + 1) // Function that slices a list

val letters = ('a'..'z').toList()
println(letters.slice(0..2)) //`List<Char>`will be inferred by compiler

// Generics & Lambdas
fun <T> List<T>.filter(predicate: (T) -> Boolean): List<T> =
    this.filter(predicate)

// Examples of invoking the method
val cities = listOf("Bergen", "Oslo", "Göteborg", "Stockholm", "Aalborg", "København")
val capitals = listOf("Oslo", "Stockholm", "København")
println(cities.filter { it !in capitals }) // `it` inferred as String
```

### Genric Extension Properties

Kotlin allows defining generic propertirs in extensions

```kotlin
val <T> List<T>.penultimate: T // penultimate retrieves the second-to-last element of a list
    get() = this[size - 2]

println(listOf(1, 2, 3, 4).penultimate) //✅OK: Outputs 3
```

#### Bounds for Type Variables

**Upper bounds**: `T: U` is equivalent to Java's `T extends U`.
**No Lower bounds**: unlike, Java which supports them for wildcards.

```kotlin
  fun <T: Number> List<T>.sum(): T {/* CODE */}
  println(listOf(1, 2, 3).sum()) // ✅OK
```

**Comparable bounds**

```kotlin
fun <T: Comparable<T>> max(first: T, second: T): T =
    if (first > second) first else second
// Note: first > second is compiled to first.compareTo(second) > 0
```

**Mutliple bounds**

```kotlin
fun <T> ensureTrailingPeriod(seq: T) where T : CharSequence, T : Appendable {
    if (!seq.endsWith('.')) seq.append('.')
}

val s = StringBuilder("Hello world")
ensureTrailingPeriod(s)
println(s) // Output: "Hello world."
```

#### Nullability & Type Arguments

**In Kotlin:** `Any` is the root, as `Object` is in Java.

**Nullable types:** Explicitly marked with `?` (e.g., `Any?`, `String?`).

**Implicit upper bound**: If not specified, it defaults to `Any?`.

```kotlin
class Processor<T> {
    fun process(value: T) {
        value?.hashCode() // Uses safe call `?.`
    }
}
class Processor<T: Any> { /* T is guaranteed to be non-null */ }
```

#### Subtyping & Type System

**Subtype definition**: `B` is a subtype of `A` if it can replace `A` everywhere.

**Self-subtyping**: `A` is always a subtype of itself.

**_Key differences in Kotlin:_** `Int` is a subtype of `Int?`, but `Int?` is NOT a subtype of `Int`.
