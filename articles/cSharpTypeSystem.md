# C# Type System

### NULL!!!!!!

I already wrote about this in the [Surely](/?sure) article about how nulls cannot be worked around in C#. Expect just to whip anyone who uses them.

*TODO move that article here*

### Still not unified

"Unified type system" usually refers to the idea that every type fits into the same hierarchy.

Java's type system definitely is not unified because of how the primitive types are treated differently from object types. So `int`s cannot be assigned to `Object` variables and generic functions are overbearing to write and work with:

```java
map
mapToInt
mapToShort
mapToBoolean
mapToDouble
// etc, omg
```

In C#, `int` is just an alias for `System.Int32` which is a subtype of `System.Object`. The primitive types are subtypes of `Object`, and this makes it a whole lot easier to write type-generic code.

But if the type system was truly unified, you should be able to write and use a function like this:

```csharp
/// <summary>Returns a function that always returns the given value.</summary>
public static Func<Object, A> Const<A>(A x)
{
	return _ => x;
}
```

The reasoning for having the returned function take `Object` is that it should be able to take anything and then return the constant value.

But it doesn't work in some contexts.

```csharp
public static A Something<A, B>(A x, B y)
{
	return Const(x)(y);
}
```

This is a really contrived example, but it should work.

The reason why it doesn't is because the unconstrained type parameter `A` can be some things that are not assignable to `Object`. In particular, it could be a pointer.

This causes problems with some edge cases of generic functions.

### Assignable and Subtype

There's also a difference between a type being assignable to another type and being a subtype of that other type. It's not proper to imply that these are the same. Like I did above.

### Class and Type

A class and a type are also not the same thing. The `String` class is a character array and an offset and some defined methods. The `String` type is either an instance of the `String` class or `null`. `null` strikes again.

### Vestigial Concepts

java, c# and of course C++ all have type systems with fundamental flaws that follow from the fact that they are inspired by C's type system. in C, a type is an alias for a memory layout primarily. in java and c#, types are all specializations of a most-general, all-inclusive type Object. java/csharp also conflate type with class, and implementation details with interface. until you start using interfaces, which provide the necessary separation. they're "object-oriented" languages that aren't very good at object-orientation becuase of their strong inspiration from C/C++.

### Compared to Alternatives

in MLs and Haskell, types are compositions of other types, it works somewhat in reverse. in these languages, types are much more easily used to specify things both to the machine and to the reader about code contracts.
