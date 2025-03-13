# Autovivification

**Autovivification** is the automatic creation of nested data structures when accessing or assigning values, without needing explicit predefinition of their structure.

**Examples**

```php
// PHP
$myArray = array();
$myArray[42] = "Hello!";  // ✅ OK: automatically creates the key '42' for value "Hello!"
```

```js
// JavaScript
let point = { x: 10, y: 20 };
point.z = 30; // Creates 'z' and assigns 30
console.log(point.z); // ✅ OK: 30
console.log(point.t); // ❌ Error: undefined, 't' is not defined

a = [];
a[1] = 10;
console.log(a[1]); // ✅ OK: 10
console.log(a[2]); // ❌ Error: undefined, index 2 not defined
```

```csharp
// C# Using Dynamic Objects
class Program {
  public static void Main(string[] args) {
    dynamic t = new Tree();
    t.first.second.third = "Hello!";  // Creates nested structure
    Console.WriteLine(t.first.second.third);  // ✅ OK: "Hello!"
  }
}

// Tree Class
public class Tree : DynamicObject {
  private IDictionary<object, object> dict = new Dictionary<object, object>();
  public override bool TryGetMember(GetMemberBinder binder, out object result) {
    var key = binder.Name;
    if (dict.ContainsKey(key)) result = dict[key];
    else dict[key] = result = new Tree();
    return true;
  }
  public override bool TrySetMember(SetMemberBinder binder, object value) {
    dict[binder.Name] = value;
    return true;
  }
}
```

# JavaScript: Symbols

## Computed Property Names

```js
// Computed Property Names allow dynamic keys in objects.
const fieldNumber = 3;
const myObject = {
  field1: 100,
  field2: 200,
  ["field" + fieldNumber]: 300, // field3: 300
};
console.log(myObject["field" + (2 + 1)]); // ✅ OK: 300
console.log(myObject.field3); // ✅ OK: 300

// Symbols are unique, non-string property names, useful for avoiding conflicts in objects
let myPropertyName = Symbol("propname");
let obj = {};
obj[myPropertyName] = 42;
console.log(obj[myPropertyName]); // ✅ OK: 42
```

## Properties of Symbols:

**Uniqueness**: Every call to `Symbol()` creates a new unique symbol, even with the same argument. This ensures no property conflicts between modules.

```js
let obj = { a: 0, b: 0 };
let myProperty = Symbol("c");
obj[myProperty] = 10;

let myOtherProperty = Symbol("c");
obj[myOtherProperty] = 20;
console.log(obj[myProperty]); // ✅ OK: 10
console.log(obj[myOtherProperty]); // ✅ OK: 20
```

**Safe Extensions**: Symbols are perfect for adding properties to third-party objects without risking overwriting existing properties.

# Scala Implicit Variables

**Implicit Variables**: In Scala, `implicit` values are passed automatically to functions/methods when required, reducing boilerplate code.

```scala
case class Message(content: String)
implicit val defaultMessage: Message = Message("Hello!")

def greet(implicit message: Message): Unit = {
  println(message.content)  // ✅ OK: "Hello!"
}

greet  // ✅ OK: Implicit argument 'defaultMessage' is passed automatically
```

**Conflict**: If multiple implicit values of the same type exist in scope, the compiler raises an error.

**Usage**: Implicit values provide context-specific behavior, allowing for cleaner code and less boilerplate.

##

### Summary

**Autovivification**: Automatic creation of data structures in languages like PHP, JavaScript, and C# when assigning values to new properties.

**Computed Property Names**: In JavaScript, dynamic keys are supported, and Symbols provide unique property names to avoid conflicts.

**Scala Implicits**: Implicit values simplify function calls by automatically passing the correct argument, reducing boilerplate code.
