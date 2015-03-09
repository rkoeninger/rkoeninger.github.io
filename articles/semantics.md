# Arguing Semantics

## The important limitations of a type system are not computational

---

### Structural Typing

Structural typing can be desirable because nominal typing can be arbitrary. If two objects have all the same values, but are of two differently-named classes, they are considered different. But why should they be? They are intended to represent the same thing.

---

### Person, Human

In a conceiveable structural type system, the following two classes could be considered identical:

```scala
case class Person(firstName: String, lastName: String)

case class Human(firstName: String, lastName: String)
```

...because they have members with the same **names** and types.

The same **NAMES**.

What about the following?

```scala
case class Person(firstName: String, lastName: String)

case class Human(givenName: String, surName: String)
```

The `firstName` and `givenName` properties have equivalent meanings to us, but not to the machine.

---

### Semantics

Arbitrary names are relevant because so much of the semantic information we want to encode with the type system (a formal system) is not strictly formal. So identifying things by name is our only recourse.

---

### Type Systems

Type systems are usually considered in the context of correctness checking (i.e. typechecking), but that is not their foremost purpose.

Type systems are about communicating with the machine the specifics of a program. Consider the following:

```java
int addOne(int x) {
    return x + 1;
}
```
```python
def addOne(x):
    return x + 1
```
```ruby
def addOne(x)
    x + 1
end
```
```haskell
addOne x = x + 1
```

Each of these functions is intended to do the same thing, but only in some of them will the machine be able to infer things about that intention. In the Python and Ruby examples, the machine cannot (or, at least, it does not by design) infer that `x` should be of a numeric type. In the Java example, the intended type of `x` is made in explicitly clear. In the F# example, the type of `x` is not made explicitly clear, but the language is designed in such a way that the type can be reliably inferred. So, in languages with a type system, the machine will be able to know things about the program.

What it does with those things depends on what tooling is available and, of course, the expressiveness of the type system. Compile-time typechecking, Intellisense&trade;-style auto-completion, documentation cross-referencing, refactoring (many of the functions of an IDE), are made possible or are greatly facilitated by this feature of the language.

### The type system I really want is impossible to build

The implication of the above section about semantics is that not all we intend about our program cannot be communicated to the machine. The machine is a formal system and not all of our ideas about the world are organized that way. So trying to model them with a formal system will always have gaps (unless it is something completely definable in formal terms - like mathematics). That's how type systems fail us. That's why the profoundly-structural type system I envisioned cannot work.

This is not a technological limitation. It is an issue inherent in how human beings preceive and work within the world. I don't believe it can be overcome with technology.

I want a type system that can express what I *mean*. What I'm *intending* to communicate.

Unfortunately, what goes in our minds ultimately makes no sense.

<disqus>
