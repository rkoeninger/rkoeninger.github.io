# Doing the Impossible

## With Style

### Impossible is Hard

> There are only two hard things in Computer Science: cache invalidation and naming things.
>
> <cite>[Phil Karlton](//karlton.hamilton.com)</cite>

Cache invalidation, naming things, natural language processing, autocorrect... they all have something in common. They are not just difficult to do correctly, they are impossible to do correctly, strictly speaking.

### Computers Are Not Humans

Things that seem simple for humans to do, like parse an English sentence, are notoriously difficult for computers to do.

Humans and computers learn and are taught differently. Computers are programmed. Facts and algorithms are inserted directly into their memory. Humans learn by example, slowly building a set of statistical hueristics.

Humans also spend years developing their statisical language analysis abilities before they are even considered fluent and many years more before they are considered eloquent. How many years has the most educated computer been learning natural language?

*TODO look for reference*

### Humans Can't English Too Good, Neither

*TODO just dropped this in here, nead to edit*

There's this idea out there that English (or some other natural language) is the ideal programming language or even the highest-level one.

I really have to disagree.

English is a terrible programming language. It's very ambiguous, heavily reliant on idiom (expressions that cannot be defined in terms of more primitive expressions in the language), and has poor support for quotation and anti-quotation, especially in spoken form.

"But we read and hear English all the time, so it's something everyone can readily understand"

You may _think_ you understand English, but you don't. English is not a formally defined language. You don't learn it by being provided a list of definitions and then definitions based on those definitions, like a programming language. You're given a series of examples, and over time, approximate closer and closer what the meaning is. When you hear or read English, you're really guessing what the writer or speaker is meaning. Comptuers aren't very good at that. And I wouldn't want them to try.

"But we all have Meriam-Websters to tell us exactly what a word or phrase means"

In natural language, we have this concept of "connotation". The connotation of a word is all of the implied ideas and feeling surrounding a word. We don't have connotation in programming languages (thank god), only denotation: the dictionary definition of a word. If we had connotation in programming, it would be supremely important not just what instructions you were giving the computer, but how you gave them. Maybe you could argue this is already true - one algorithm might be more time or space efficient than another, even though they ultimately have the same result (e.g. a sorted list). But there's no risk that a computer will _feel_ a certain way about you calling MergeSort() over BubbleSort(). It's not going to think that bubbles sound like fun and that it would rather do a bubble sort (like humans who communicate by natural language might).

"Language X reads just like English. It's so much easier to read than Language Y, which has parenthesis all over the place"

When you write a program, you're not telling a story or painting a picture or anything of the sort. You're describing a set of rules and formulas and schemae. You're describing a formal system. English is especially poor for describing a formal system because it's not a formal language. If it was, maybe we should use English for describing mathematics? What would that even be like? Try writing "f(x) = x^2" in English as an exercise and see if it's as clear and concise as the mathematical notation.

Here's my attempt:

> There is a function called "f". "f" takes an arguemnt called "x". When "f" is applied to "x", the result is equivalent to the square of "x".

Or you could just say "f(x) = x^2". Although, in spoken form, they're not that different.

So if mathematics (and Logic) has a much better language for descrbing a formal system. Maybe we could just start with that. Oh, wait! We already did that!

* Lambda calculus
* Turing machine
* LISP
* Prolog
* Standard ML

Ruby is one newer language that I've heard someone make this claim about (it reads like English and that's a good thing).

People used to say that COBOL.

Not only is it not true that it reads like English. An English-like programming language is also undesirable.

So there's some reasons why I think modeling a language for describing a formal system on an informal language is a mistake.

(Insert dijkstra quote that aggrees with me, i'm sure there is one).

Oh, and I forgot to explain why english is not especially high-level either, but whatever.

**Dictated but not read**

### The Formal vs The Informal

A significant number of the problems in developing software isn't caused by tooling within the formalized world of our programs. It's caused by the fuzzy gap between the formal world of computers and the informal world of real life and human notions of things.

People don't naturally think of color as something that is quantitative (formal). They think of colors as different entities with different connotations and meanings. This doesn't make sense to a computer. In a computer, colors are just numbers. Often, they are values of Red, Green and Blue, but Hue, Saturation and Brightness is also common.

### They Want The Impossible

People have developed the expectation that technology do the impossible.
