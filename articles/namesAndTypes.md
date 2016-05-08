# Names and Types

## More Closely Related Than You Think

I have this idea that when you name a piece of data, you also give it a type. Whether you're using a language with or without a type system.

Consider a simple type like this:

```java
class Person {
    String givenName;
    String emailAddress;
}
```

`givenName` and `email` aren't just any strings. They are two different things that are rarely interchangeable. There may be no complete, formal way of verifying whether a particular character sequence is a valid given name. Even verifying emails isn't easy. But what would you think of code that did this: `p.emailAddress = p.givenName;`? You wouldn't write `p.emailAddress = p.birthDate`. Why would you write `p.emailAddress = p.givenName`.

And that code would pass the type-checker. But the type-checker is supposed to prevent type errors. I'm thinking it should also be a type error to assign a given name to an email address, just as it would be a type error to assign a birth date to a street address.

This can be done, even in Java. But it's not easy.

```java
abstract class NewType<T> {
    T value;
    NewType(T value) {
        this.value = value;
    }
}

class GivenName extends NewType<String> {
    GivenName(String name) {
        super(name);
    }
}

class EmailAddress extends NewType<String> {
    EmailAddress(String email) {
        super(email);
    }
}

class Person {
    GivenName givenName;
    EmailAddress emailAddress;
}
```

Now code like `p.emailAddress = p.givenName;` will cause the appropriate type error.

```no-highlight
error: incompatible types: GivenName cannot be converted to EmailAddress
        p.emailAddress = p.givenName;
                          ^
1 error
```

Type-checking isn't the whole point, though. I've always thought that type-checking was only a part of the potential benefits of a type system. If names-as-types is going to have any practical benefit, it would have to enable more effective code completion.
