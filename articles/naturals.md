# Natural Subtraction

## Arithmetic Operation I Found In My Couch

### Some Definitions

<dl>
    <dt>Natural Number</dt>
    <dd>1. A non-negative integer.</dd>
    <dd>2. An `unsigned int`.</dd>
    <dd>3. `type Natural = Zero | Successor Natural`</dd>
    <dt>Operation Closure</dt>
    <dd>Operation `f` is said to be closed over set `a` if for all values `x`, `y` that are members of `a`, then the result of `f(x, y)` is also a member of `a`.</dd>
</dl>

So addition is closed over integers because adding any two integers always results in an integer. Subtraction and multiplication are also closed over integers.

But division is not. For instance, `2 / 3` is division of two integers that does not result in an integer. In many programming languages, there is an integer division operation available that truncates the fractional part of the result, giving us a sort-of-division operator that is closed over integers.

*TODO: needs some use cases for naturals*

Notice that all four elementary operations (`+`, `-`, `*`, `%`) are closed over rational numbers.

Also notice that while addition and multiplication are closed over natural numbers, division is not, just like for integers, but neither is subtraction. 3 and 5 are both natural numbers, but `3 - 5` does not result in a natural.

So if we want to work with naturals, we might want a sort-of-subtraction operator that is closed over naturals. Just like with integer division, there will be some information loss when subtracting a larger number from a smaller number.

How would such an operator be defined?

Well, for integer division, we cut off the part of the result that integers intristically lack - the fractional part. This is like taking the `floor` of the result of real division.

If we did something similar for natural subtraction, that would mean dropping the negative sign, or basically taking the `abs` of the result of real subtraction.

Another approach might be to just return 0 if the result of real subtraction would be negative.

Some examples:

| x | y | x -- y | x --- y |
|--:|--:|-------:|--------:|
| 5 | 2 |      3 |       3 |
| 7 | 7 |      0 |       0 |
| 3 | 5 |      2 |       0 |

The absolute difference between the two could be useful.

Being able to decrement a number that naturall can only be reduced to 0 could also be helpful.

*TODO: needs some use cases for natural subtraction*

### A More-General Pattern?

So to keep division closed over integers, we have to redefine it. Then we have to redefine subtraction to keep it closed over naturals.

Is there a more general pattern here?

Notice also that division and subtraction are like the reverse of the other two operations: addition and multiplication. Addition and multiplication stay closed over all number sets.

We can say that when `x * y = z`, that `x` and `y` being integers implies that `z` is an integer. But we can't say that when `a / b = c` and `a` and `b` are integers, that `c` must be an integer.

Like wise for subtraction.

It's like commiting to a smaller number set prevents certain pieces of information from being persisted - fractions and signs. That means that some operations would no longer be reversible.

*TODO: need to figure out if I'm on to something or not*
