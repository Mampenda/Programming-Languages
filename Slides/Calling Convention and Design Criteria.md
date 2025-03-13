# Calling Convention, Design Criteria

## Calling Convention

Calling convention defines rules for frame layout and parameter passing, including:

- Argument passing (stack vs. register)
- Stack cleanup responsibility (caller or callee)
- Register saving/restoring (caller or callee)
- Return value location

Common calling conventions:

- C calling convention
- stdcall (WinAPI)
- Register calling convention

**Standard conventions enable interoperability** across different compliers and languages.

###

####

##### Example: Calling a C++ function from Pascal

```cpp
int __stdcall add(int a, int b) {
    return a + b;
}
```

```pascal
function add(a, b: Integer): Integer; stdcall; external './mylibrary.dll';
procedure main();
begin
    writeln('Result of adding 3 and 4 in C++:', add(3, 4));
end;
```

## Language Design Criteria

- **Definiteness**

  - Languages require a precise specification of syntac and semantics. This is **crucial for usability**.

- **Ambigious** descriptions lead to:

  - Unreliable behaviours across implementations.
  - Reduced portability.
  - Different compilers could produce different results.

- **Readability**

  - Essential for modifability and mainainability.
  - Readability is linked to writability (self-documenting code).
  - Key factors:
    - Comments
    - Consistent naming conventions (snake case, camel case, etc.)
    - Syntax clarity (explicit delimiters like `if...fi`, `do...od`)

- **Realiability**
  - Reliability is strengthened by:
    - Readable and writable code (easier reasoning and correctness).
    - Strong static and dynamic checks.
    - Well-defined language semantics.

### Orthogonality in Languge Design

**1. Combination Orthogonality**

- **Concept**: If one element of type `A` can combine with one of type `B`, then any element of type `A` should combine with **any** of type `B`.

  Example:

  - Variable declarations (`var x; var x = 10; const x = 10;`)
  - Types (`Basic`, `Array`, `Struct`)
  - Any declaration type should work with any variale type.

**2. Sort Orthogonality**

- **Concept**: Wherever one member of sort `A` is valied, all members of sort `A` should be valid.
  Example:
  ```java
  // Java allows arrays of primitive types, but not arrays of generic types
  String[] x = new String[10]; // ✅ Allowed
  Box<Integer>[] x = new Box<Integer>[10]; // ❌ Not allowed
  ```

**3. Number Orthogonality**

- **Concept**: Where one occurence of a construct is valid, zero or more occurences should also be valid.
  Example:
  ```java
  String s = "hello"; // One declaration
  String a, b;        // Multiple declarations
  ```

**4. Balance Between Simplicity & Orthogonality**

- More orthogonality increases flexibility but can complicate predictability.
- Goal: Find a balance that maintains language predictability.

## Java Code Example: Boxing & Equality

```java
public class Main {
    public static void main(String[] args) {
        Integer a = 127;
        Integer b = 127;
        System.out.println(a == b); // Outputs: true

        Integer x = 128;
        Integer y = 128;
        System.out.println(x == y); // Outputs: false
    }
}
```

### Key Concepts

This code demonstrates autoboxing and reference comparison (`==`) in Java.
**1. Autoboxing and Caching of Integer Objects**

- In Java, when you assign an `int` value to an `Integer` object (like `Integer a = 127;`), Java **automatically converts** the `int` to an `Integer` object. This is called **autoboxing**.
- To optimize memory usage, **Java caches `Integer` objects** for values between -128 and 127.
- The cached objects are **shared**, meaning if you assign two `Integer` objects the same value within this range, they will **reference the same object** in memory.

**2. Comparison using `==`**

- The `==` operator checks **whether two reference variables point to the same memory location**.
- It **does not compare actual values** (for that, use `.equals()`).

### Step-by-Step Explanation

---

**Case 1:** `Integer a = 127; Integer b = 127;`

Since **127 is within the cached range (-128 to 127)**, both `a` and `b` reference the same cached `Integer` object.
`a == b` evaluates to `true` because both variables refer to the **same memory address**.

---

**Case 2:** `Integer x = 128; Integer y = 128;`

Since **128 is outside the cached range**, Java creates new, separate `Integer` objects for `x` and `y`.
`x` and `y` refer to **different objects in memory**, so `x == y` evaluates to `false`.

---

**Correct Way to Compare Integer Values**

To compare actual values rather than memory addresses, use `.equals()`, which **compares values** instead of memory references. : `System.out.println(x.equals(y));` (this outputs true)
