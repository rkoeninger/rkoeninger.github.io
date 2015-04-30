# Who Cares About Monads?

## ...well, who cares about Iterables?

### Abstract Nonsense

A while ago, I remember seeing an interview of sorts with Gilad Bracha and Erik Meijer. Bracha has never seemed to be a fan of functional programming. He's made some good points about how evangelists are kidding themselves about the exagerated possibilites they suggest FP offers (as is the nature of evangelists).

But I remember a conversation that went something like this:

> I know all these things are Monads - Lists, Continuations,
> IO - but I don't understand what you get by idenifying them as such.
> What does it buy you?
> 
> <cite>Gilad Bracha</cite>

It's a good question. Meijer didn't offer much of a response as it wasn't his role to debate, just to interview.

It might help if we re-phrased the question:

> I know all these things are Iterables - Lists, HashMaps, Arrays
> ... What does it buy you to identify them as such?
> 
> <cite>Socrates</cite>

Well, it buys you the ability to generalize functions over *all* Iterables so you don't have to implement a function for every collection type. You can just implement a function that deals with an Iterable and be done with it. Look at .NET's `System.Linq.Enumerable` class. Future collection classes can also just implement Iterable and inherit all of that functionality.

Also, the language can have specialized syntax for dealing with Iterables, like the `for-each` loop.

### You Must Learn to Love the Dreaded M-Word

So let's get back to the original question, which now has a predictable response:

> I know all these things are Monads - Lists, Continuations, IO -
> but I don't understand what you get by idenifying them as such.
> What does it buy you?
> 
> <cite>Gilad Bracha</cite>

Well, it buys you the ability to generalize functions over *all* Monads so you don't have to implement a function for every monadic type. You can just implement a function that deals with an Monad and be done with it. Look at Haskell's `Control.Monad` module. Future monadic types can also just declare a Monad instance and inherit all of that functionality.

Also, the language can have specialized syntax for dealing with Monads, like `do` notation.

Explaining what a monad actually is task to no one has been completely successful at. The definition of the pattern in code can at least give some impression as to how it might be used.

```haskell
class Monad m where
    return :: a -> m a
    bind :: (a -> m b) -> m a -> m b
```

So it implements a chaining pattern. A function that takes `a` and returns `m b` can be turned into a function that takes `m a` and returns `m b`. So if there are a series of operations that each introduce some complication, like nullablility or IO or one might raise an exception, those operations can be chained easily.

> Monads are return types that guide you through the happy path.
> 
> <cite>Erik Meijer</cite>

That's a great explanation of the blather I wrote above. A series of monadic operations allows one to focus on the path of execution that doesn't involve hairy things like the possibility of missing data, raised exceptions, multiple values, no values, side-effects and anything else that matches the pattern.

### The Happy Path

Some people really object *TODO Tony Morris link* to the idea of explaining something using examples instead of starting with general principles, but the abstractness of a concept like monads is a little too far out for the reader to grasp their purpose or receive any motivation from their mathematical definition alone.

So let's start with the (second) simpliest one first: The `Maybe` monad. Also sometimes called the `Option` monad. `Maybe` is a fairly simple type that we could represent with this made-up syntax:

*TODO use haskell syntax instead and refer to haskell syntax primer*

```csharp
Maybe<A> = Some<A> | None
```

So a `Maybe` either has a value or it doesn't. It's almost like making type A nullable.

The happy path here is having a value, `Some`, and the exceptional case that we might want to gloss over is `None`. The monadic binding operation for `Maybe` is defined like this:

```csharp
Maybe<B> Bind<A, B>(Maybe<A> m, Func<A, Maybe<B>> f)
{
    return m is None ? None : f(m.Value);
}
```

So if we start with `None`, we ignore the operation and we just get `None`. If we have a value, we apply the function to the value. This is sort of like the "elvis operator" *TODO link* with respect to nullable types.

```
Maybe<double> GetNumberMaybe();
Maybe<double> DivMaybe(this double, double);
A OrElse(this Maybe<A>, A);

Bind(GetNumberMaybe(), 1.DivMaybe).OrElse(0)
// results in zero if either value was not read or was zero
```

The hidden complexity for Maybe is that the value might be missing.
The hidden complexity for List is that there might be multiple (or zero) values.
The hidden complexity for `r -> ` is that the value is being generated given some value of type `r`.
The hidden complexity for `IO` is that the value will be the result of a side-effecting operation. *TODO glossary for side-effects?*

### One Dev's Wisdom is Another Dev's Nonsense

As functional programming gains popularity, many people are encountering new terminology for the first time:

  * Functor
  * Monad
  * Lens
  * Typeclass
  * Referential Transparency

And some terms that carry a very negative connotation:

  * Impure
  * Imperative
  * Non-compositional

It is disconcerting to find yourself so confused. *What does it all mean?*

Do you remember the last time you felt this way? What were people saying then?

  * Factory
  * Decorator
  * Visitor
  * Singleton
  * Polymorphism

And words that became the new profanities:

  * Static
  * Procedural
  * Spaghetti

I think that OOP and OO Patterns were a big step past what people were doing before. Not just giving devs a common language, also a set of tools for building programs where they might not have had much to work with.

I also think that about these FP design patterns. And just like OOP, it is quickly becoming oversold and obscured. In both cases, these new patterns aren't as foreign or as complicated as they seems at first glance.

### What does it buy you?

Looking down the list of patterns, both object-oriented and functional, there seems to be a consistent theme. They all seem to try and take previous design patterns and design principles and realize them in a new language or new paradigm.

Separation of concerns is one classic design principle many of these patterns and language features revolve around.

  * The Factory pattern separates creation of object from use.

  * The Decorator pattern separates two levels of functionality.

  * Dynamic Dispatch (Subtype Polymorphism) separates implementation details from usage context.

  * The IO Monad in Haskell strongly separates I/O from data manipulation.

These are about avoiding spurious or hazardous dependencies between parts of a program, sometimes referred to as [complecting](http://www.infoq.com/presentations/Simple-Made-Easy).
