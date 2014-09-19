# Natural Subtraction

## Ops That Are Desirable Actually Fairly Often

---

### Natural Number

The set of natural numbers can be defined in a couple of ways:

  * `[x | x <- integers, x >= 0]` - "The set of non-negative integers"
  * `data Nat = 0 | Succ Nat` - "Zero or any value that is one greater than a natural"

So how do the common arithmetic operators apply to naturals?

### Keep in Mind:

"Closed over X's" refers to the fact that is you add two X's, you will get an X.

### Integer Division

In order to get a division-esque operation that is closed over integers, it is necessary to toss the remainder of the operation. So `1 / 2` is actually `0`. Weird, but somethimes when used with `mod`, a desirable effect.

### Natural Addition, Multiplication, Division and Modulus

These are all essentially the same. The integer versions of these operations are already closed over naturals.

### Natural Subtraction

This is the interesting one.

Of course, `3 - 5 = -2`. All well and good for integer substraction, but what about a subtraction-esque operation that is closed over naturals?

I can think of two ways of handling `x nat- y` where `y > x`:

  * Truncate the negative sign. This would mean that `3 nat- 5` would be `2`.
  * Define `x nat- y = max 0 (x int- y)`. So `3 nat- 5` is now `0`

The later is the more common use case, I think. In many situations, when someone has 10 apples, and we try to take away 12 apples, they don't end up with -2 apples, they have 0. The -2 can be used as a way of indicating that they have a debt of 2 apples, but that's frequently not what we want, and if we're tracking balances, then we'd use integers anyway.
