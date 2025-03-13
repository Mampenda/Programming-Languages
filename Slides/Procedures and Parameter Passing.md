# Procedures and Parameter Passing

## Procedure Signatures

A **procedure signature** defines the parameter types and return type.

```cpp
// Example
int myFunc(int x, string s, bool b) {
  // Do something
}
```

This code example has the **signature** `myFunc: Int × String × Bool → Int`

### Procedures in Haskell (Abstract Syntax)

```haskell
data ProcedureDeclaration = Procedure
  String -- name
  [Parameter] -- parameter list
  [VarDeclaration] -- local variables
  Stmt -- procedure body

type Parameter = (VarDeclaration, Mode)
type VarDeclaration = (String, Type)
data Mode = ??? -- To be discussed later
```

## Formal Parameters vs. Actual Arguments

Formal Parameters are declared in the procedure defintion while the actual arguments are passed in the function call.

```cpp
// Formal parameters: a, b
int add(int a, int b) {
  return a + b;
}

// Actual parameters: 1, 2
int x = add(1, 2);
```

### Impact of Argument Binding

Different binding strategies affect programming behavior, procedure meaning, and performance.

### Runtime Representation of Procedures

#### Memory Segments

**1. Code Segment:** Read-only, fixed size (e.g., function code, constants).
**2. Static Area:** Stores global/static variables.
**3. Stack:** Stores function activations (temporary).
**4. Heap:** Stores dynamically allocated data (variable lifetime).

#### Activation Records (Stack Frames)

**Activation Record** stores procedure execution data:

    Formal parameters
    Local variables
    Return value & address
    Temporary values
    Saved registers
    Dynamic link (points to caller’s frame)
    Static link (for nested functions)

##### Call and Return Mechanism

**Call** → Push activation record onto stack.
**Return** → Pop activation record from stack.

```cpp
// C++ Examle of Stack Structure
void h(int p) { int a = 0; }
void g() { int a = 2; h(1); }
void f(int p) { g(); }

f(3);
```

```sql
// Stack at runtime
Dynamic Link | p = 3 | return addr  <- f()
Dynamic Link | a = 2 | return addr  <- g()
Dynamic Link | p = 1 | a = 0        <- h()
```

### Parameter Passing Modes

Parameter passing modes defines how and what data flows in and out of a procedure.

**Terminology**

- **obs (Observed)**: Read-only (**input**)
- **out (Output)**: Write-only (**output**)
- **upd (Updated)**: Read + Write (**input & output**)

| Mode | Semantics                                 | Flow           | Variable Requirement |
| ---- | ----------------------------------------- | -------------- | -------------------- |
| obs  | Copy-in (`by-value`)                      | Input          | Any expression       |
| obs  | Reference (`by-reference`) (if-read-only) | Input          | Variable only        |
| out  | Copy-out (`by result`)                    | Output         | Variable only        |
| out  | Reference (`by reference`)                | Output         | Variable only        |
| upd  | Copy-in/out (`by value-result`)           | Input & Output | Variable only        |
| upd  | Reference (`by reference`)                | Input & Output | Variable only        |

### Parameter Passing Semantics

#### Reference Semantics ("by reference")

**Direct access** to caller's variable. Modifications **persist** after function execution.

```cpp
void modify(int& x) { x = 10; }
int a = 5;
modify(a); // Now a == 10
```

#### Copy Semantics

Creates a **local copy** inside the function.

- **Copy-in ("by value")**: Local copies are initialized with argument value and changes do not affect variable.

- **Copy-out ("by result")**: Uninitialized local copy. At return, it's copied back to argument.

- **Copy-in/out ("by value-result")**: Combination of copy-in and copy-out.

##### Comparision of the Parameter PAssing Mechanisms

| Semantics   | Callee Behaviour                | Initialized | At Return       |
| ----------- | ------------------------------- | ----------- | --------------- |
| Copy-in     | Local variable added            | ✅ Yes      | No effect       |
| Copy-out    | Local variable added            | ❌ No       | Copied back     |
| Copy-in/out | Local variable added            | ✅ Yes      | Copied back     |
| Reference   | New variable points to argument | N/A         | Changes persist |

#### Summary

- **Procedures** encapsulate logic with formal parameters.
- **Memory management** is key to function execution (stack frames, heap allocation).
- **Parameter passing modes** determine how data flows in/out of functions.
- **Copy vs. Reference semantics** affect whether modifications persist after function execution.
