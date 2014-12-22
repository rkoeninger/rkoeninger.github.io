# `Dr. Surelove<A>`

## ...or how I still have to live with null references in C# and am more worried than ever

---

### Where There Is a Will

One day, I decided I had seen enough `NullReferenceException`s for one lifetime and sought to abolish them from all of my future code.

C#, in addition to classes, has structs. Structs differ from classes in a few ways, but the difference that was important to me was that references to structs cannot be null.

So code like this would be illegal:

```csharp
DateTime dt = null;
```

So I thought: wouldn't it be great if String were a struct instead of a class? Then	we wouldn't have to worry about null references to Strings. A string can be either null or empty or non-empty and frequently, null and empty would have the same meaning, thus the need for: `String.IsNullOrEmpty`.

And you wouldn't have to worry about keeping track of whether a given String has been checked for non-null-ness or not. You could be **sure** that the reference has a value.

We could make something like:

```csharp
public struct SureString
{
    public SureString(char[] array, int start, int stop)
    {
        // validate arguments
        // save arguments
    }

    // all the string functions...

    public override String ToString()
    {
        return new String(Array, Start, Stop);
    }
}
```

But I don't want to have to re-make every class just so it can be non-null in some cases. So let's do something more generic:

```csharp
public struct Sure<A>
{
    public Sure(A value)
    {
        if (value == null)
            throw new ArgumentNullException();

        Value = value;
    }

    public A Value { get; private set; }

    public static implicit operator A(Sure<A> sure)
}
```

So, supposedly, you can put `Sure<Whatever>`, and be sure you won't have a null reference to a `Whatever`.

And when you see that the method or class you're working in takes a `Sure<String>`, you know you don't have to worry about whether that string will be null or not. Whoever provides that data can have the responsibility of making sure it's not null. Instead of everyone, everywhere in the program potentially having to worry about it.

```csharp
public void NoWorries(Sure<String> sure)
{
    // Do whatever with sure.Value, it won't be null
}
```

---

### Why?!

So this all seemed wonderful and I sunk time adding a `Sure<A>` class to my [zed-sharp](http://github.com/rkoeninger/zed-sharp) project and all, only to eventually notice that this code compiles:

```csharp
var ss = new Sure<String>();
```

And not only does it work, but it returns a `Sure<String>` with a null value!

**NOOOoooooOOO00000ooooO!!!1111`!!q!!!@!**

As it turns out, in C#, all struct types have a built-in zero-parameter constructor that returns an instance of that struct type with all its fields assigned a default value for their type.

For `String`, it's null.

The first thought that came to mind was: Just override the zero-parameter constructor to throw an exception, and then we can again be sure we'll never have a `Sure` with a null `Value`.

So I tried this:

```csharp
public struct Sure<A>
{
    public Sure()
    {
        throw new ApplicationException("Don't do that!");
    }

    // everything else stays the same
}
```

But of course: **Structs cannot contain parameterless constructors.**

So there's this facility built into the language that ruins my life and there's no way to override it.

Even if one could use the parameterless constructor above, it still wouldn't completely fix the problem, considering:

```csharp
default(Sure<String>).Value == null
```

For class types, `default()` returns null, and for struct types, `default()` returns an instance with all members initialized to their `default()`, which is null/0/false/all-members-default.

---

### The Nightmare Continues

For a while, I thought this was a really solid idea. It would require people to go through their programs and type `Sure<>` and `.Value` all over the place, but if they were being plagued by `NullReferenceException`s, as in every C# applcation I've ever seen, it could be worth it. But alas...

The other thing that's really annoying about all this is the C# designers took the time to implement a type system for the language. And then they defeat the purpose in large part but giving almost every type an additional null value with vague semantics (does it mean the value is not applicable, or we just don't know it or what?) that also behaves very differently from every other value in that it blows up your program when you least suspect it.

Instead of just having references to values be of type A, it's like they are all implicitly of type `Ref<A>` and all methods are `Func<A, Ref<B>>` instead of `Func<A, B>`, but you don't have `A`'s, you have `Ref<A>`'s, like this:

```haskell
type Ref a = Pointer a | Null

invoke :: (a -> Ref b) -> Ref a -> Ref b
invoke f (Pointer x) = f x
invoke _ Null = error "NullPointerException"
```

From the perspective of another Why do that? Why make using the language so complicated? This is normal to most people, I think, but from a more distanced perspective, it's just bizarre.

I guess we can just make like Scala and idiomatically avoid null by way of the `Maybe<A>` type. And if someone forgets to initialize a reference or sets it to null, throw them in the pit of despair.

!!!disqus
