# Variables and Scoping

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

- Global Variables: Accesible everywhere.
- Local Variables: Defined within a function/block.
- Shadowing: A local variable overrides a global one with the same name.
- Nested Scoping: Inner blocks can acces outer variables.

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

| Function             | Description                                                                                           |
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
