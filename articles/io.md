# Functional and Object-Oriented approaches to I/O

## There are a few right ways to solve a problem, and a million wrong ways

### Holy False Dichotomy, Batman!

> OO makes code understandable by encapsulating moving parts.
> FP makes code understandable by minimizing moving parts.
> 
> <cite>Michael Feathers</cite>

There's a misconception that FP promotes totally side-effectless programming. The reaction is that programs can't do anything useful without side-effects so FP must be useless.

That's not the idea. The hype confuses the idea, and makes FP sound stupid while trying to promote it, but it's a sound idea. It's an old idea.

FP is not about writing programs that have no side effects. It's about isolating side-effecting code from non-side-effecting code. In particular, isolating I/O operations from "business logic". That's simply what is called "separation of concerns", a classic software design tenet.

### Hello, Goodbye

So if a pure function can only vary with respect to its arguments, how would a `getLine` function that read a line of input from the console work? Its type would have to be something like `() => String` and that wouldn't make sense. If it takes no arguments, it must always return the same value effectively making it a constant.

Well, in Haskell, `getLine` is indeed a constant.

I'll let that sink in.

Well, to clarify, it's not a constant of type `String`, it's a constant of type `IO String`. *TODO haskell syntax primer* And `IO a` is really a function that takes input from the outside world to produce an `a`, or in this case, a `String`.

So `getLine` is a constant not because it always produces the same `String` but because it always produces a `String` in the same way.

For a function like `putLine`, you'd expect it to have a type like `String => ()`. You give it a string to print and it prints it and doesn't give you anything back. Printing would be a side-effect. `putLine`'s type is actually `String -> IO ()`. So `putLine` is not a constant, that's interesting.

`putLine` returns a different `IO` action depending on what string it's given. That makes sense, doesn't it? `putLine "Hello!"` is a different operation from `putLine "Goodbye!"`.

### A Tale of Two Types

So we can divide code in our program into pure and side-effecting operations.

In Haskell, the type `IO a` is really `RealWorld -> (RealWorld, a)`, or basically a function that you're not supposed to run yourself.

### The IO Monad

Represents an IO action to be run at some point later. In Haskell, the whole program becomes one giant IO action.

### IO by Dependency Injection

Not mutually exclusive with the functional IO.
