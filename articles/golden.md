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
$$f(n) = {\varphi^n - (1 - \varphi)^n \over \sqrt 5}$$
So if you get an interview question asking you to implement fibonacci, you get to be a smartass and write this:

```haskell
fib :: Int -> Integer
fib n = truncate $ (gold ^ n - (1 - gold) ^ n) / rad5
            where rad5 = sqrt (fromIntegral 5)
                  gold = (1 + rad5) / 2
```

Plus, it's in Haskell! Just because!