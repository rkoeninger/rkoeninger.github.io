# Functors and Type Variance

## The Well Runs Deep...

---

### Knowing a Little Bit of Haskell Might Help

``` haskell

class CovariantFunctor f where
    fmap :: (a -> b) -> f a -> f b

class ContravariantFunctor f where
    contramap :: (b -> a) -> f a -> f b

class InvariantFunctor f where
    xmap :: (a -> b, b -> a) -> f a -> f b

```

The type signature for `fmap` can be read as "If `a` implies `b`, then that implies that `f a` implies `f b`". In more OO-terms, "If `A` is a subtype of `B`, then `F<A>` is a subtype of `F<B>`". This is the same as saying that `f` is covariant.

The type signature for `contramap` can be read as "If `b` implies `a`, then that implies that `f a` implies `f b`" or "If `B` is a subtype of `A`, then `F<A>` is a subtype of `F<B>`. Notice that the `a` and `b` are reversed in the first part of the statement. This is the same as saything that `f` is contravariant.

``` haskell

class BivariantFunctor f where
    bimap :: Either (a -> b) (b -> a) -> f a -> f b

```

Functions with a fixed input type are a well-known CovariantFunctor.
Functions with a fixed output type are a well-known ContravariantFunctor.
There don't seem to be many InvariantFunctors.
But what counts as a BivariantFunctor? Identity?

``` haskell

instance BivariantFunctor Identity where
    bimap _ ix = ix

```

Does it even work for Maybe?

``` haskell

instance BivariantFunctor Maybe where
    bimap _ Nothing = Nothing
    bimap (Left f) (Just x) = Just (f x)
    bimap (Right g) (Just x) = error "Maybe isn't contravariant"

```

Looks like an invariant functor has to be **both** covariant and contravariant at the same time. The only type that is both broader and smaller than 'a' is 'a' itself, thus it's refered to as invariant.

A bivariant functor would then be **either** covariant or contravariant. But that introduces non-determinism and doesn't fit into the type system.

---

### Now I'm Just Goofing Around

Is there such a thing as a Contravariant Applicative Functor?

``` haskell

class ContravariantApplicativeFunctor f where
    ap :: f (b -> a) -> f a -> f b

instance ContravariantApplicativeFunctor (-> r) where
    ap Nothing _ = Nothing
    ap _ Nothing = Nothing
    ap (Just f) (Just g) = g . f

```

Apparently, a fixed-output-type function is one.

And is there such a thing as an Applicative Monad?

``` haskell

class ApplicativeMonad m where
    apm :: m (a -> m b) -> m a -> m b

instance ApplicativeMonad Maybe where
    apm Nothing _ = Nothing
    apm _ Nothing = Nothing
    apm (Just f) (Just x) = f x

```