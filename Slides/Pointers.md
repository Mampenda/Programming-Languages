# Pointers

**Definition**
A **pointer** is a variable that stores the memory address of another variable. To **dereference** a pointer (access the value it points to), use the `^` operator.

##

###

#### Variable Lifetime

Variable lifetime is the duration for which memory is allocated for a variable. Typically, a variable's lifetime corresponds to its scope.

```pascal
// Example in Pascal
program PointerExample;
uses crt;

var myNumber: integer;
var myPointer: ^integer;

begin
  myNumber := 42;
  myPointer := @myNumber;  // `@myNumber` gets the address of `myNumber`

  writeln(myPointer^);  // Dereferencing: prints 42
  myPointer^ := 100;  // Modifying value through pointer

  writeln(myNumber);  // Prints 100 (same memory location as myPointer^)
end.

(*
Key Concepts
`@variable`: Gets memory address of `variabe`
`pointer^`: Deferences the pointer (gets value at that address)
*)
```

#### Dynamic Memory Management

Pointers allow manual memory allocation and deallocation using `new` and `dispose`. Accessing unitialized or freed memory leads to **undefined behaviour**.

```pascal
// Example (Pascal) - Allocating & Deallocating Memory
program MemoryAllocation;
uses crt;

var p: ^integer;

begin
  p^ := 1;  // ❌ Error:  `p` is uninitialized (dangling pointer)

  new(p);    // Allocate memory
  p^ := 42;  // Assign value
  writeln(p^);  // Prints 42

  dispose(p);  // Free allocated memory

  writeln(p^);  // ⚠️ Undefined behavior: `p` is now a dangling pointer
end.

(*
Key Concepts:
`new(p)`: Allocates memory for p.
`dispose(p)`: Deallocates memory, making p a dangling pointer (unsafe to use).
*)
```

### Variable Lifetime and Storage Duration

#### Storage Duration

Storage duration refers to how long a variable remains in memory.

**Types of Storage Duration**:

- **Automatic**:
  - Memory is allocated at the start of the enclosing code block and deallocated at the end.
  - Allocated each time the block is invoked.
  - Example: Local variables.
- **Static**:
  - Memory is allocated when the program starts and deallocated when it ends.
  - Example: Global variables.
- **Dynamic**:
  - Memory is allocated as needed during program execution (usually via pointers).

#### Pointers: Terminology

**C vs Pascal Terminology**

- In **Pascal**:
  - `x` → value of variable `x`
  - `@x` → address of variable `x`
- In **C**:
  **_- l-value and r-value are part of the variable’s type definition._**
  - **l-value** is the memory location (address) that refers to an object. It can appear on both sides of an assignment.
  - **r-value**: The value stored at a memory location. It appears only on the **right-hand side** of an assignment.

### Aliasing

**Aliasing** occurs when multiple variables refer to the same meory lovation, effectivelty creating multiuple names (or "aliases") for the same value.

```pascal
// Example in Pascal
program AliasingExample;
uses crt;

var x: integer;
var p, q: ^integer;

begin
  x := 10;
  p := @x;
  q := @x;  // p and q both point to the address of x

  p^ := 42;  // Dereference p to modify value of x through p
  writeln(p^);  // 42
  writeln(x);   // 42 (x is modified through p)
  writeln(q^);  // 42 (q points to same memory location as p)
end.

(*
Key Concepts:
p and q are both aliases for x, modifying the value of x through either pointer will affect both.
*)
```

#### Aliasing in Fortran (95)

**Equivalence** in Fortran 95 allows aliasing through the `equivalence` statement, where two variables are made to refer to the same memory location.

```fortran
! Example in Fortran
program Main
  implicit none

  integer :: x
  real :: a

  equivalence(x, a)  ! Aliases x and a

  x = 10
  a = 3.14

  print *, x   ! Prints 10
  print *, a   ! Prints 3.14

  a = 20.0
  print *, x   ! Prints 20 (x is modified through a)
  print *, a   ! Prints 20.0
end program Main

! Key Concept:
! Equivalence creates an alias, allowing changes to one variable (x or a) to affect the other
```
