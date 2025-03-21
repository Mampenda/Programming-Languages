# Type Erasure

Generics only exist for a human and at compile-time to ensure type safety. After the type safety has been ensured, they are not needed anymore.

```java
// Before compilation
class A<T> { abstract T id(T x); }
class B extends A<Integer> {
    Integer id(Integer x) { return x; }
}

// After type erasure
class A { abstract Object id(Object x); }
class B extends A {
    Object id(Object x) { return id((Integer) x); } // Bridge method
}
```

**Implications of Type Erasure**

- All generics become raw types (`List<T>`→`List`).
- Type parameters are replaced with their bounds (`List<T extends Number>`→`List<Number>`).
- `instanceOf` does not work on generics (e.g., `x.instanceOf(T)` is not valid).
- Overloaded methods may conflict dure to erasure.
- Generic exceptions are forbidden (`SomeException<T>` cannot extend `Throwable`).
