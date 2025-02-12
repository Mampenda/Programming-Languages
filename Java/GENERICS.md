# Generics

These generics functions will compute the minimum of two numbers.

**C++**

```c++
// Pass parameters as const T. Avoids unnecessary copies for non-primitive types (e.g., std::string or custom objects).
template <typename T>
T min(const T& a, const T& b) {
    return (a < b) ? a : b;
}
```

**Java**

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

## Basic Generig Interfaces/Classes

In Java, interfaces and classes can be declared with _type parameters_, which are specified using angle brackets (`<>`). These parameters should be provided both when declaring variables and when creating new instances of a class.

```java
// Built-In Java Generics (List & ArrayList)
List<String> words = new ArrayList<>();
words.add("Java");
words.add("Generics");
System.out.println(words.get(0));
```

Before generics were introduced, Java used _raw types_, meaning classes like `List` or `ArrayList` were used without specifying a type, leading to potential runtime errors due to unchecked type casting.

```java
import java.util.*;

public class RawTypesExample {
    public static void main(String[] args) {
        // Using a raw List (no type safety)
        List words = new ArrayList();  // No type specified
        words.add("Hello");
        words.add(42);  // Can cause runtime issues as 42 is not a String

        // Retrieving elements requires explicit casting
        String str1 = (String) words.get(0); // ✅ Works fine
        String str2 = (String) words.get(1); // ❌ Runtime error: ClassCastException

        System.out.println(str1);
        System.out.println(str2); // This will crash the program
    }
}
```

## Generic Methods

```java
import java.util.*;

public class GenericsExample {
    public static void main(String[] args) {
        // Using generics for type safety
        List<String> words = new ArrayList<>();  // Generic type specified
        words.add("Hello");
        words.add("World");

        String str = words.get(0);  // ✅OK: No explicit casting needed
        System.out.println(str);
    }
}
```

```java
import java.util.*;

public class GenericMethodExample {
    // Generic method that converts an array of any type T to a List<T>
    public static <T> List<T> toList(T[] array) {
        return new ArrayList<>(Arrays.asList(array));
    }

    // Example usage with different data types
    public static void main(String[] args) {

        String[] stringArray = {"Java", "Generics", "Optimization"};
        List<String> stringList = toList(stringArray);
        System.out.println(stringList); // Output: [Java, Generics, Optimization]

        Integer[] intArray = {1, 2, 3, 4, 5};
        List<Integer> intList = toList(intArray);
        System.out.println(intList); // Output: [1, 2, 3, 4, 5]
    }
}
```

### Variable Arguments / Varargs

The major optimization here is to leverage `varargs` to allow a more convenient and concise method invocation. With `varargs (T... array)`, you can pass multiple arguments of the same type directly to the method without having to explicitly wrap them into an array.

```java
import java.util.*;

public class MyListUtils {
    // Generic method using varargs (T... array)
    public static <T> List<T> toList(T... elements) {
        return new ArrayList<>(Arrays.asList(elements)); // Optimized conversion
    }

    public static void main(String[] args) {
        // Example usage with varargs (No need to pack into an array)
        List<Integer> ints = MyListUtils.toList(1, 2, 3);
        List<String> words = MyListUtils.toList("Hello", "World");

        System.out.println(ints);   // Output: [1, 2, 3]
        System.out.println(words);  // Output: [Hello, World]
    }
}
```

When calling the method `toList`, we can rely on _type inference_ for the generic parameter, which means we don’t always have to specify the type explicitly.

However, explicitly specifying the type parameter can sometimes be necessary to resolve ambiguity or to provide more clarity:

```java
List<Integer> ints = MyListUtils.<Integer>toList();  // Explicit type argument
List<Object> objs = Lists.<Object>toList(1, "two");  // Explicit type argument
```

#### When is explicit type required?

1. **When there is too little information to infer the type**: If we call `toList()` without arguments, Java cannot infer the type because there is no context. Thus, specifying the type explicitly is necessary:

```java
List<Integer> ints = MyListUtils.<Integer>toList();
```

2. **When there is too much information to choose from**: If we pass arguments that share multiple common superclasses or interfaces, Java may struggle to choose between them.

```java
List<Object> objs = Lists.<Object>toList(1, "two");
```

In this case, `1` (an `Integer`) and `"two"` (a `String`) are both `Object` types, but they also implement different interfaces like `Serializable` and `Comparable`. Java can't automatically determine which type to infer, and so explicit typing is required.

### Subtyping

Subtyping is an essential feature in object-oriented programming, where one type is considered a subtype of another if it's related through an `extends` or `implements` clause.

Examples of subtypes:

| Subtype         | Supertype       |
| --------------- | --------------- |
| `Integer`       | `Number`        |
| `Double`        | `Number`        |
| `ArrayList<E>`  | `List<E>`       |
| `List<E>`       | `Collection<E>` |
| `Collection<E>` | `Iterable<E>`   |

**Transitivity**: Subtyping is transitive. If `A` is a subtype of `B`, and `B` is a subtype of `C`, then `A` is a subtype of `C`.

**Reflexivity**: Every type is a subtype of itself.

#### The Substitution Principle

    Values of any subtype can be used wherever the supertype is expected.

```java
interface Collection<E> {
    boolean add(E element);
}
List<Number> numbers = new ArrayList<>();
numbers.add(2);    // ✅OK: Integer is a subtype of Number
numbers.add(3.14); // ✅OK: Double is a subtype of Number
```

#### Generics Complications

Generics introduce a challenge in subtyping, which can make it non-trivial:

`List<Integer>` is _not_ a subtype of `List<Number>`
`List<Number>`is _not_ a subtype of `List<Integer>`

The type safety provided by generics ensures that the list types are strictly enforced (i.e., you can't mix types).

But despite the challenges with generics, arrays work differently:

`Integer[]` is a subtype of `Number[]`

**_Key Takeaways:_**

**Generics are not covariant: `List<Integer>` is not a subtype of `List<Number>`**
**Arrays are covariant: `Integer[]` is a subtype of `Number[]`**

Subtyping works well in non-generic types but becomes more complex when dealing with generics.
