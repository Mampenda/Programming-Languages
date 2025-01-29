# Wildcards

Wildcards (`?`) allow flexibility in generic types.

```java
interface Collection<E> {
    public boolean addAll(Collection<? extends E> c);
    // ...
}
```

The `addAll()` method in `Collection<E>` uses `? extends E`, meaning it can accept a collection containing elements of `E` or any of its subtypes. This ensures type safety while enabling broader compatibility.

The `?` wildcard is essential for handling generics efficiently.

```java
import java.io.*;
import java.util.*;

// Superclass
class Animal { // CODE HERE }

// Subclass extends superclass
class Dog extends Animal { // CODE HERE }

// Main class
public class Main {
  public static void main(String[] args) {

    // OK during compile becasue an Dog[] is subtype of Animal[]
    Animal[] animalsArray = new Dog[5];

    // List<Animal> wontn't compile
    List<Animal> animalsList1 = new ArrayList<Dog>();

    // Wildcard extends Aminal will compile
    List<? extends Animal> animalsList2 = new ArrayList<Dog>();

    // print OK after compiling without error
    System.out.println("OK!");

  }
}
```

**With `? extends E`, _elements can be read from it, but new elements cannot be added_, ensuring type safety by preventing incompatible insertions.**
