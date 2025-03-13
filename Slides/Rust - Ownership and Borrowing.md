# Rust

## Ownership

**Ownership** means that each value has one owner, and only one owner at a time.
**Scope and Destruction** refers to when the owner goes out of scope, the value is dropped (destructed).

**Move Semantics**:

- When ownership is transferred (e.g., `let s2 = s1`), the original variable (`s1`) is no longer valid.
- Attempting to use a moved variable results in a **compile-time error**.

```rust
// Example of ownership transfer
let s1 = String::from("hello");
let s2 = s1;  // Ownership of s1 moves to s2
println!("s1 = {}", s1);  // Error: s1 is no longer valid
```

## Borrowing

**References (Borrowing)**
Instead of transferring ownership, we can **borrow** a value using references.

- **Immutable Reference** (`&`): Allows reading, but not modifying the value.
- **Mutable Reference** (`&mut`): Allows modifying the value.

```rust
// Example of immutable borrowing
let s1 = String::from("hello");
let s2 = &s1;  // Borrowing s1 immutably
println!("s1 = {}", s1);  // ✅ OK

// Example of mutable borrowing
let mut s1 = String::from("hello");
change(&mut s1);  // Borrowing s1 mutably
println!("s1 = {}", s1);  // ✅ OK

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}

// Invalid Code
let mut s = String::from("hello");
let r1 = &mut s;
let r2 = &mut s;  // ❌ Error: Can't borrow `s` mutably more than once becasue rust prevents data races by restricting concurrent mutable access
```

**Mutability Restrictions**:

- Only one mutable reference to a value is allowed at a time
- Immutable references cannot co-exists with mutable references.

### Rust: Borrowing and Scopes

A **Scope** refers to the fact that a reference must not outlive the data it points to. Rust allows multiple mutable references, but **not simoultaneously**.

```rust
// Multiple mutable borrows across scopes
let mut s = String::from("hello");
{
    let r1 = &mut s;  // ✅ OK: r1 is valid here
}  // r1 goes out of scope
let r2 = &mut s;  // ✅ OK

// Borrowing after scope
let y: &i32;
{
    let x = 5;
    y = &x;  // ❌ Error: x is out of scope
}
println!("y = {}", y);  // ❌ Error: x no longer exists
```

### Stack-Only Value Types (Copy Semantics)

For **stack-only value types** (e.g., intergers), moves are **copies**.

```
// Copying Stack-Only Types
let a = 1;
let b = a;  // `a` is copied, not moved
println!("a = {}", a); // ✅ OK
```

### Rust: Summary on Ownership and Borrowing

**Each value has exactly one owner**; ownership can be transferred via a move.

**Ownership transfer** (`let s2 = s1`): The original variable is no longer valid.

**Move semantics**: For stack-only types, moves are copies.

**References**:

- Immutable references (`&`) allow read-only access.
- Mutable references (`&mut`) allow modifying the value.
- Only one mutable reference at a time is allowed.
- Immutable references cannot coexist with mutable references.

**Rust tracks scopes** to ensure safety, preventing issues like **data races** at compile time.
