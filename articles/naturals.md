# Natural Subtraction

## Arithmetic Operation I Found In My Couch

---

### Natural Number

So a natural number is just an unsigned int.

There. That was easy.

---

### "Closed"

---

### Integer Division

When `x` is and `int` and `y` is an `int` and `let z = x / y`, `z` wouldn't normally be guaranteed to be an integer. So in integer division, the remainder is dropped off so it will always return an int.

My attempt to re-write this article is failing miserably.

---

### Natural Subtraction

Could go two ways:

```haskell
natSub x y = abs (x - y)
```

```haskell
natSub x y = if y >= x then 0 else x - y
```

I don't think the first is likely to be useful very often, though. The second seems to be a desirable operation on occasion.

---

### A More-General Pattern?

So to keep division closed over integers, we have to redefine it. Then we have to redefine subtraction to keep it closed over naturals.

Is there a more general pattern here?

Notice also that division and subtraction are like the reverse of the other two operations: addition and multiplication. Addition and multiplication stay closed over all number sets.

We can say that when `x * y = z`, that `x` and `y` being integers implies that `z` is an integer. But we can't say that when `a / b = c` and `a` and `b` are integers, that `c` must be an integer.

<disqus>