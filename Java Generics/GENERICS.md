# Generics

These generics functions will compute the minimum of two numbers.

## Based on:

> Naftalin, Maurice, and Philip Wadler. _Java Generics and Collections_. O’Reilly Media, 2006.
>
> Dmitry Jemerov and Svetlana Isakova. _Kotlin in Action_. Manning Publications, 2017.

```c++
// Pass parameters as const T&: Avoids unnecessary copies for non-primitive types (e.g., std::string or custom objects).
template <typename T>
T min(const T& a, const T& b) {
    return (a < b) ? a : b;
}
```

```java
// Uses if-else
public static <T extends Comparable<T>> T min (T a, T b) {
    if (a.compareTo(b) < 0) {
        return a;
    } else {
    return b;
    }
}

// Uses ternary operator
public static <T extends Comparable<T>> T min(T a, T b) {
    return (a.compareTo(b) < 0) ? a : b;
}

```

## Java: Basic Generig Interfaces/Classes
