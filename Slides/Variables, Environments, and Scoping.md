# Variables, Environments, and Scoping

> (Based on materials by Anya Bagge, Magne Haveraaen, Jaakko Järvi & "JavaScript: The Definitive Guide" by D. Flanagan)

## Variables

### Key Concepts

- **Names & Identifiers**: Used to refer to entities in programs (variables, functions, classes, etc.).
- **Binding**: Assigning a value to a name.
- **Scope:** Defines where a variable is accessible.
  - **Lexical (Static) Scoping**: Determined at compile time.
  - **Dynamic Scoping**: Determined at runtime.
- **Variable Lifetime**: The duration a variable exists in memory.
- **Memory Management**:
  - **Heap & Stack**: Areas where variables are stored.
  - **Pointers & Dereferencing**: Referencing memory locations.
  - **Ownership & Borrowing**: Used in languages like Rust to manage memory safely.

### Variable Declarations

```javascript
// Declaration Syntax
var x;      // JavaScript
let x;      // JavaScript (block-scoped)
int x;      // Java, C, C++
bool b;     // Boolean declaration
string s;   // String variable
Person p;   // Object variable

// Initialization Syntax
let x = 42; // Declaration + Assignment

// Typed Variable Declarations
int x = 42;
string s = "hello world";

```

### Variable Naming Rules

**Common Restrictions**

- Must start with a letter, `$`, or `_`.
- Subsequent characters: letters, digints, `$`, `_`.

**Naming Conventions**
| Name | Example | Language Usage |
| ---- | ------- | -------------- |
| `camelCase` | `myVariable` | JavaScript, Java |
| `PascalCase` | `MyClass` | C#, TypeScript|
| `snake_case` | `my_variable` | Python, Ruby|
| `CONSTANT_CASE` | `PI_VALUE` | Constants|
| `kebab-case` | `my-variable` | CSS, URLs|

**Hungarian Notation (Rare Today)**
Prefixes indicate type (`strName`, `bBusy`, `nSize`).

## Variable Scope

- **Global Variables**: Accessible everywhere.
- **Local Variables**: Defined within a function/block.
- **Shadowing**: A local variable overrides a global one with the same name.
- **Nested Scoping**: Inner blocks can access outer variables.

### Shadowing in JavaScript

In JavaScript, **shadowing** occurs when a variable in a **local scope** has the same name as a variable in an **outer scope**, which results in the local variable **overriding** the outer one. This can sometimes lead to unexpected behavior if not understood properly.

```js
function f() {
  let x = 10; // Outer `x`
  {
    // Defines a new scope
    let x = 42; // This `x` shadows the outer `x`
    console.log(x); // ✅ 42 (local `x` is used)
  }
  console.log(x); // ✅ 10 (outer `x` is used)
}

f();
```

### Variable Usage vs. Declaration

```javascript
// Example of valid usage (Declaration -> Assignment -> Use)
var x;
x = 10;
x = x + 1;

// Example of invalid usage (Declare and Use in same line)
var c = c + 1; // ❌ Error
```

## Scoping

### Scoping in Practice

```javascript
// Lexical (Static) Scoping
function outer() {
  let x = 10;
  function inner() {
    console.log(x); // ✅ Accessible (defined in outer scope)
  }
  inner();
}
```

```lisp
; Dynamic Scoping (in some languages)
(defun outer ()
  (let ((x 10))
    (inner)))

(defun inner ()
  (print x))  ; Error if 'x' is not dynamically scoped

```

### Special Concepts in Variable Management

- **Closure**: Functions that capture variables from their outer scope.
- **Hoisting**: JavaScript moves variable/function declarations to the top of their scope.
- **Autovivfication**: Automatic creating of objects/arrays when accessed.

```javascript
console.log(x); // Undefined, but no error
var x = 5;
```

### Static vs. Dynamic Semantics

**Static Rules (Checked Before Execution):**

- Variables must be declared before use.
- No redeclarations of variables in `let` (e.g., `let x; let x;` is an error).

**Dynamic Semantics (Checked at Runtime):**

- Referencing undefined variables leads to errors.

**Summary Table**

| Concept          | Description                                 |
| ---------------- | ------------------------------------------- |
| Declaration      | `let x;` (reserves space for `x`)           |
| Assignment       | `x = 10;` (stores `10` in `x`)              |
| Scope            | Defines where a variable is accessible      |
| Shadowing        | Local variables override globals            |
| Closures         | Functions capturing outer scope variables   |
| Hoisting         | Moving declarations to the top (JavaScript) |
| Autovivification | Implicit object creation when accessed      |

## Environements

### Variables vs. Values

| Function                      | Description                                                             |
| ----------------------------- | ----------------------------------------------------------------------- |
| Store ≈ Memory                | Holds actual values.                                                    |
| Environment                   | A mapping between `variable names` and `memory locations` in the store. |
| Variables are bound to values | The environment keeps track of bound variables.                         |

**_Variable use expressions to retrieve values based on environment bindings._**
**_Accessing an unbound variable should be illegal (avoids undefined behavior)._**

```haskell
-- Abstract representation in Haskell (more complex in reality)
type Environment = [(String, Val)]
```

### API of an Environment

| Concept              | Definition                                                                                            |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| `lookup(x, env)`     | Finds the value bond to variable `x` in environment `env`. Returns **undefined** if `x` is not bound. |
| `isDefined(x, env)`  | Checks if `x` is bound in `env`. Returns **true** if `x` exists, otherwise **false**.                 |
| `declare(x, v, env)` | Binds `x` to value `v` in `env`, creating a **new** environment. Overwrites previous bindings.        |
| `newEnv()`           | Creates an **empty** environment.                                                                     |

### Formal Semantics of Environments

| Rule                                                                  | Meaning                                                       |
| --------------------------------------------------------------------- | ------------------------------------------------------------- |
| `isDefined(x, newEnv()) ⟺ false`                                      | Empty environments have no defined variables.                 |
| `lookup(x, newEnv()) ⟺ undefined`                                     | Looking up `x` in an empty environment returns **undefined**. |
| `lookup(x, declare(x, v, e)) ⟺ v`                                     | Declaring `x = v` and looking it up returns `v`.              |
| `isDefined(x, declare(x, v, e)) ⟺ true`                               | Declaring `x` makes it **defined**.                           |
| `lookup(x1, declare(x2, v, e)) ⟺ lookup(x1, e)` (for `x1 ≠ x2`)       | Declaring `x2` does **not** affect `x1`.                      |
| `isDefined(x1, declare(x2, v, e)) ⟺ isDefined(x1, e)` (for `x1 ≠ x2`) | Defining `x2` does **not** change `x1`’s status.              |

### Environments in Programming

Environments are used to _track contextual information_ in a program, such as

- Variable bindings
- Current function/class name
- Language options and settings

In its simplest form, an environment _acts as a map that associates variable names with their corresponding values._

### Store vs. Environment

| Concept     | Definition                                                              |
| ----------- | ----------------------------------------------------------------------- |
| Environment | A dictionary (symbol table) mapping variable names to memory locations. |
| Environment | An array (like a stack) holding actual values at memory locations.      |
| Environment | Tracks the next available spot in the store.                            |

## Scoping

### JavaScript: Hoisting

Hoisting in JavaScript is a behavior where variable and function declarations are moved to the top of their containing scope during compilation, before the code executes. However, only the declarations are hoisted, not the initializations.

```javascript
// When declared with `var`, the variable is hoisted but remains undefined until assigned a value
console.log(a); // ❌ Error: Undefined (hoisted, but not assigned)
var a = 10;
console.log(a); // ✅ OK: 10

// Equivalent interpretation
var a;
console.log(a); // ❌ Error: Undefined
a = 10;
console.log(a); // ✅ OK: 10

// `let` and `const` are also hoisted, but they remain in a "temporal dead zone" (TDZ) and cannot be accessed before declaration
console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 20;

// Function declarations are fully hoisted, meaning they can be called before they appear in the code
greet(); // ✅ OK: "Hello!"
function greet() {
  console.log("Hello!");
}

// Function expressions are not hoisted in the same way
console.log(sayHi); // ❌ Error: Undefined
var sayHi = function () {
  console.log("Hi!");
};
sayHi(); // ✅ OK: "Hi!"

// Since `var` does not scope variables to the loop body, multiple loops can re-declare and re-initialize the same variable without issues.
for (var i = 0; i < 3; i++) {
  console.log(i);
}
console.log(i); // ✅ OK: 3 (i is not block-scoped)

// Using `let` avoids this issue since it is block-scoped
for (let j = 0; j < 3; j++) {
  console.log(j);
}
console.log(j); // ❌ ReferenceError: j is not defined

// Another example of Hoisting in JavaScript
function f() {
  let x;
  x = 10; // x is assigned a value here

  let b = a; // `a` is hoisted, but it's still undefined at this point
  // let c = y; // Uncommenting this would cause an error, as `y` is not declared yet

  {
    let y = 20; // `y` is block-scoped and not hoisted outside of the block
    var a = 0; // `a` is hoisted because it's declared with `var`, but its assignment is not hoisted
  }

  console.log(x); // ✅ OK: 10, `x` is assigned before this point
  console.log(y); // ❌ Error: ReferenceError: y is not defined, because `y` is block-scoped

  console.log(a); // ✅ OK: 0, `a` is hoisted to the top of the function scope and gets assigned inside the block
  console.log(b); // ✅ OK: undefined, `b` is assigned the hoisted value of `a`, which is undefined at this point
  console.log(c); // ❌ Error: ReferenceError: c is not defined, `c` is declared but not initialized
}

f();
```

### Namespaces and Qualified Names

**Namespace**: A container for related identifiers, helping to organize code and prevent name collisions.

| Language | Container   | Example                       |
| -------- | ----------- | ----------------------------- |
| Java     | `package`   | `import mypackage.ClassName;` |
| C#       | `namespace` | `using MyNamespace;`          |
| Python   | `module`    | `import mymodule`             |

**Qualified Names**: Used to reference identifiers within a namespace explicitly, avoiding ambiguity.

Example:

```cpp
namespace A { int x; }
namespace B { int x; namespace C { int x; } }
namespace C { int x = A::x + B::x + B::C::x; }
```

### Dynamic Scoping

**Definition**: Variable binding depends on the execution context rather than the lexical structure of the code.
**Free Variable**: A variable not explicitly bound in the current context (e.g., `x` is free in `x * 2`).

_Languages that support dynamic scoping are LISP, Perl._

```lisp
;; Example in LISP

(defun foo ()
  (* x x))  ;; Refers to x in the current execution context

(let ((x 2))
  (foo))  ;; x refers to the most recent binding (dynamic scoping)
```

**Behavior**:

- Variables are bound to their most recent declaration in the execution path.
- A function refers to variables present in the call environment, not its definition environment.
- Leads to brittle code and confusion.

```perl
# Example in Perl
our $a = 2;  # Declaring a global variable `$a`

sub foo {
    return $a * 10;  # Accessing the global `$a`
}

sub bar {
    local $a = 3;  # `local` creates a dynamic scope for `$a`
    return foo();  # Calling `foo()` uses the most recent binding of `$a`
}

my $b = bar();  # Calls `bar()`, which calls `foo()`
print $b;  # Outputs: 30
```

### Dynamic vs. Lexical (Static) Scoping

| Concept                | Dynamic Scoping (Perl)                                      | Lecical Scoping (JavaScript)                                         |
| ---------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------- |
| **Definition**         | Uses the most recent variable binding in execution history. | Uses the variable binding from where the function was defined.       |
| **Code Understanding** | Hard to predict behavior without execution context.         | Easier to reason about; follows code structure.                      |
| **Example**            | Perl: `local $a = 3; foo();` (uses the latest `a`).         | JavaScript: `let a = 2; foo();` (uses `a` from function definition). |

```perl
# Example in Perl (Dynamic Scoping)

our $a = 2;
sub foo { return $a \* 10; }
sub bar {
  local $a = 3; # Temporary binding
  return foo(); # Uses $a = 3
}
my $b = bar();
print $b; # Output: 30
```

```js
// Example in JavaScript (Lexical Scoping)

let a = 2;
function foo() { return a \* 10; }
function bar() {
  let a = 3;
  return foo(); // Uses `a = 2` from outer scope
}
let b = bar();
console.log(b); // Output: 20
```

### Scope of Visibility

Access modifiers in OOP define variable visibility within objects

| Modifyer  | Variable visibility                             |
| --------- | ----------------------------------------------- |
| Public    | Accessible from anywhere.                       |
| Private   | Accessible only within the defining class.      |
| Protected | Accessible within the class and its subclasses. |
