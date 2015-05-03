# Syntax Primer

## Just Enough to Get Started

Hopefully C# is similiar enough to Java and C++ that most will understand this primer.

### Comparison of the Basics

Note that since Clojure does not have a native type system, many of these will be blank.

There is core.typed, but most Clojure will not use it.

Cells are left empty if matching syntax does not exist in a given language or is simply not meaningful.

| Syntax Form | C# | Haskell | Clojure |
|:-|:-:|:-:|:-:|
| Basic Types | `string` <br/> `int` <br/> `bool` | `String` <br/> `Int` <br/> `Bool` | |
| Unit | | `()` | |
| Null | `null` | | `nil` |
| False | `false` | `False` | only `nil` or `false` |
| True | `true` | `True` | anything except `nil` or `false` |
| List Type | `List<T>` | `[t]` | |
| Applied List Type | `List<string>` | `[String]` | |
| List Creation | `new List<int> {1, 2, 3}` <br/> `new [] {1, 2, 3}` | `[1, 2, 3]` | `[1 2 3]` |
| Dictionary Creation | `new Dictionary<string, int> {{"one", 1}, {"two", 2}, {"three", 3}}` | `fromList [("one", 1), ("two", 2), ("three", 3)]` | `{"one" 1 "two" 2 "three" 3}` |
| Parameterized Type App | `Set<string>` | `Set String` | |
| Tuple Type | `Tuple<string, int>` | `(String, Int)` | |
| Function Type | `Func<int, string>` | `Int -> String` | |
| void Function Type | `Action<String>` | | |
| Type Label | `string x` | `x :: String` | |
| Function Type Signature | `string F(int arg)` | `f :: Int -> String` | |
| No-arg Application | `F()` | | `(f)` |
| Application with args | `F(x, y)` | `f x y` | `(f x y)` |
| Lambdas | `x => x + 1` | `\x -> x + 1` | `(fn [x] (+ 1 x))` <br/> `#(+ 1 %)` |
| Partial Application | | `1 +` <br/> `(+) 1` | `(partial + 1)` |

In Clojure, whitespace is all that is needed to separate pieces of syntax. Commas are optional and are interpreted as whitespace. Identation never affects the meaning of code.

In Haskell, indentation can used to identify scope. A function can have backticks put around it to put it in infix position and an operator can have parens put around it to use it in prefix position or to pass it unapplied into another function.

```haskell
filter isPositive [1, -4, 2, 0, -5, 6]
isPositive `filter` [1, -4, 2, 0, -5, 6]

1 + 2
(+) 1 2
foldr (+) 0 [1..10]
```

### Pure Functions

Pure functions are functions whose return value only varies with respect to its argument(s) and has no visible side-effects.

By only varying with respect to it's arguments, I mean a function can't read non-constant globals (so accessing the value of PI is fine) or perform file system or network read operations to inform it's generation of a result value.

This means that it wouldn't make sense to have a pure function with the type `() -> a`. 

### Side-effects

By side-effects, I mean it doesn't set any mutable references or perform I/O or anything of that sort.

Naturally, all functions have side-effects like allocating memory or warming the CPU, but that's not what is being referred to in FP as "side-effects".

### Currying

It is typical in Haskell and some other languages to curry function paramters. Instead of `(a, b, c) -> d`, functions would appear `a -> b -> c -> d`. Instead of a function that takes `(a, b, c)` and returns `d`, it's a function that takes `a` and returns a function that takes `b` and in turn returns a function that takes `c` and finally returns `d`. This allows for easy partially applications and easy re-use of functions.

For instance, the addition operator in curried form has the type `Int -> Int -> Int`. This allows one to write `1 +` and get a function of type `Int -> Int` which will add `1` to its argument.

### Persistent Data Structures

Working with immutable collections results in functions that don't modify an existing collection, they create a new one that differs in the specified way. So adding `6` to the head of `let xs = [5, 4, 3, 2, 1]` would result in a new list: `[6, 5, 4, 3, 2, 1]` and the existing list `xs` would remain unchanged.

In Haskell and Clojure, these kind of data structures and operations are pervasive.

### Recursion and Tail Call Optimization

Immutability implies that a data structure cannot be changed and that variables cannot be re-bound in the same scope. Once a variable `x` has been assigned, it cannot be changed.

These means that a construct like a `while` loop can't be useful anymore. Either the loop condition is true when we get to the loop, and since the condition can't change (all of the symbols that make up it's condition can't be changed), the loop will run forever. Or it could be false initially and the loop won't run at all. So loops would be limited to running never or forever. Neither is a common preference.

So if we wanted to do something common like get all the phone numbers from a list of people, we wouldn't write code like this without side-effects:

```csharp
List<PhoneNumber> GetPhoneNumbers(List<Person> people)
{
	var phoneNumbers = new List<PhoneNumber>();

	foreach (var person in people)
	{
		phoneNumbers.Add(person.PhoneNumber);
	}

	return phoneNumbers;
}
```

Instead, we would define it recursively like this:

```haskell
getPhoneNumbers :: [Person] -> [PhoneNumber]
getPhoneNumbers [] = []
getPhoneNumbers (person : others) = (phoneNumber person) : (getPhoneNumbers others)
```

But if we have a very long list, we risk a stack overflow as each element will cause the function to recurse an additional level deeper.

Some languages have Tail Call Optimization which can turn a properly designed recursive function back into a loop under the hood (during compilation).

TCO can be done when the recursive call is the last thing we do in the loop. For instance:

```haskell
getPhoneNumbers :: [Person] -> [PhoneNumbers] -> [PhoneNumbers]
getPhoneNumbers [] = id -- just return the accumulated phone numbers when no people left
getPhoneNumbers (person : others) numbers = getPhoneNumbers others (phoneNumber person : numbers)
```

That would get really annoying to have to implement every time we want to loop. One might ask "isn't FP supposed to make the code simpler and more expressive, not less?".

Thankfully, we have plenty of provided functions that already implement this pattern, so we can just write `map phoneNumber people`.
