<!--title=Arguing Semantics-->

# Arguing Semamtics

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