# Combining Variadic Functions and Currying/Partial Applications

In ML-family languages, it's common for functions to be curried so that they can be easily partially applied. A curried, binary `+` operator would have a type like `Number -> (Number -> Number)`. So you can write `(+) 1` and get a function that takes another number and adds `1` to it.

In LISP-family languages, it's common for some functions to be variadic so they take a variable number of arguments and make it easier to combine calls to that function or provide optional arguments. So you can write `(+ 1 2 3 4 5)` and get `15`.

Both of these are cool in their own ways. They both make it a little easier to express code you might find yourself writing often.

But they're hard to combine. ML-style functions can be partially applied because they have a known arity. LISP-style functions can be variadic because they need to have a specific type.

What would the type of a variadic function that can also be easily partially applied look like?

My first attempt looks like `(+) : Number | (Number -> @(+))` where `@` means `type-of`. So `+`, weirdly, has a recursive type.

The application of arguments to a curried function can be visualized like this:

<img alt="Curried Function" src="/diagrams/curriedFunctionType.svg" class="block" />

Start with `Number -> Number -> Number`. Apply a `Number` and you get `Number -> Number`. Apply another `Number`, and you get a `Number`.

Notice this resembles a deterministic finite automaton (DFA).

The partially applicable/variadic can be visualized like this:

<img alt="Non-Deterministic Type" src="/diagrams/nonDeterministicType.svg" class="block" />

Start with `Number | (Number -> @)`. Apply a `Number` and you get the same thing. Apply a `Number` as many times as you want, and you'll still get the same type. But it can also become a simple `Number` without being applied to anything.

Notice this resembles a non-deterministic finite automaton (NFA).

It's not known whether we need a number or a function until the result of the function is used. This can be determined dynamically by accumulating arguments or computing a running sum as they are applied, and then computing the sum or returning the running sum, when a number is needed. It could also work with a type system where the conversion to a `Number` is made when a `Number` is expected and it remains a function where a function is expected.

I was thinking this was a new idea (new to me, anyway), but I realized I've already done something like this. In my project [hyjinks](//github.com/rkoeninger/hyjinks), the `Tag` object implements the `IFn` interface so while it is a record representing an HTML tag, it is also a function that can be applied to further attributes and child tags.
