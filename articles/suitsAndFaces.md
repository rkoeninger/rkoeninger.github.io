# Suits and Faces

## How Far Does One Take Type-Directed Programming?

---

### From the Top

Imagine you had to develop a game based on conventional playing cards - say, Solitaire for example. In OO-land, the first step is to identify all of the nouns in your problem statement:

  * Card(s)
  * Draw pile
  * Discard pile
  * Goal piles - where cards of each suit get placed as you complete the game
  * Table piles - the seven piles where most of the cards start face-down

The only new data type in that list would be `Card`. All the others are `List`s or `Set`s of `Card`s.

So here's me taking a shot at designing the `Card` class:

```scala
case class Card(suit: Int, face: Int)

val aceOfSpades = Card(4, 1)
```

There would have be a shared understanding about which `Int` value represents which suit and which face. We could formalize this with an enum:

```scala
object Suit {
    val Diamonds = 1
    val Clubs = 2
    val Hearts = 3
    val Spades = 4
}

object Face {
    val Ace = 1
    val Two = 2
    val Three = 3
    // ... you get the idea ...
    val Ten = 10
    val Jack = 11
    val Queen = 12
    val King = 13
}

val aceOfSpades = Card(Suit.Spades, Face.Ace)
```

---

### One Step Further

So let's say we had some sort of requirement for a method where it could only accept Hearts...

```scala
def heartsOnlyClub(card: Card) {
    if (card.suit != Suit.Hearts)
        throw new InvalidArgumentException("card must be Hearts");
    // ... rest of the method ...
}
```

The logic to validate the argument will likely be duplicated in a few places in the application. This defensive programming is done because the programmer often doesn't know where else data is getting validated or if it is at all. This is most common with null-checking.

But if we designed our `Card` class differently, we could be more sure that the card is valid, but from the method's perspective and the caller's.

```scala
trait Suit
trait Diamonds extends Suit
trait Clubs extends Suit
trait Hearts extends Suit
trait Spades extends Suit

trait Face
trait Ace : Face
trait Two : Face
trait Three : Face
// ... you get the idea ...
trait Ten : Face
trait Jack : Face
trait Queen : Face
trait King : Face

case class Card[S : Suit, F : Face]
```

Now the suit and the face are part of the type. Wait, does this even make sense in Scala sense it doesn't have dependent types? I'm going to go read up on Idris and try again...

<disqus>