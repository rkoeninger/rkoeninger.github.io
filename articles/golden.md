# All That Glitters Is Gold

## The Golden Ratio

### Derivation

The golden ratio is defined as: $a+b$ is to $a$ as $a$ is to $b$:

$${a + b \over a} = {a \over b} \equiv \varphi$$

assume $b = 1$ so then $a = \varphi$

$${\varphi + 1 \over \varphi} = \varphi$$

$$\varphi + 1 = \varphi^2$$

$$\varphi^2 - \varphi - 1 = 0$$

use the quadratic forumla

$$\varphi = {-(-1) \pm \sqrt{(-1)^2-4(1)(-1)} \over 2(1)}$$

$$\varphi = {1 \pm \sqrt 5 \over 2}$$

and since we know $a > b > 0$, then $\varphi > 0$ so

$$\varphi = {1 + \sqrt 5 \over 2}$$

and the other value is the golden compliment

$$\Phi = {1 - \sqrt 5 \over 2} = {-1 \over \varphi} = {1 + {1 \over \varphi}}$$

### Fibonacci

Turns out there's a [closed-form (non-iterative) function](http://mathworld.wolfram.com/BinetsFibonacciNumberFormula.html) for fibonacci based on the golden ratio:

$$f(n) = {\varphi^n - \Phi^n \over \sqrt 5}$$

So if you get an interview question asking you to implement fibonacci, you get to be a smartass and write this:

```haskell
fib :: Int -> Integer
fib n = round $ (gold ^ n - gold_ ^ n) / root5
        where root5 = sqrt (fromIntegral 5)
              gold  = (1 + root5) / 2
              gold_ = (1 - root5) / 2
```

Rounding is needed due to non-exact floating-point results.

```ghci
Prelude> map fib [0..40]
[0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765,10946,17711,28657,46368,75025,121393,196418,317811,514229,832040,1346269,2178309,3524578,5702887,9227465,14930352,24157817,39088169,63245986,102334155]
```

Then [I discovered](http://mathworld.wolfram.com/FibonacciNumber.html) you can make it even simpler than that:

$$f(n) = round( {\varphi^n \over \sqrt 5} )$$

With code like this:

```haskell
fib :: Int -> Integer
fib n = round $ gold ^ n / root5
        where root5 = sqrt (fromIntegral 5)
              gold  = (1 + root5) / 2
```

And it gets the same results.


```ghci
Prelude> map fib [0..40]
[0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765,10946,17711,28657,46368,75025,121393,196418,317811,514229,832040,1346269,2178309,3524578,5702887,9227465,14930352,24157817,39088169,63245986,102334155]
```

Plus, it's in Haskell! Just because!