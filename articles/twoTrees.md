# A Tale of Two Trees

Code in most languages has a hierarchical structure. In many languages, a file contains classes, classes contain fields and methods, methods contain a list of statements, statements are made of expressions, etc. Code gets parsed into a tree of structures that represent these elements. This is referred to as an Abstract Syntax Tree or AST.

The execution of a program has methods calling methods calling methods. When a method is called, memory is allocated for its local variables. And when that method calls another method, memory needs to be allocated for the second method. These blocks of memory are structured into a stack. It's referred to as "the stack". Stacks are common in computer science because they are useful for navigating trees. The execution of the program is also a tree.

So we have two trees: a *Syntax Tree* and an *Execution Tree*. And they usually don't line up at all. It would help if they did.

> Our intellectual powers are rather geared to master static relations and that our powers to visualize processes evolving in time are relatively poorly developed. For that reason we should do (as wise programmers aware of our limitations) our utmost to shorten the conceptual gap between the static program and the dynamic process, to make the correspondence between the program (spread out in text space) and the process (spread out in time) as trivial as possible.
>
> <cite>Edsger W. Dijkstra</cite>

The goal of language design should be to represent programs in ways that are helpful to programmers.

The syntax tree can't just be the execution tree, as functions usually get called from several different places. We wouldn't want to repeat ourselves and we don't want to pollute parts of our code with unnecessary details.

*maybe we could visually inline function definitions at the usage site to make some code more comprehensible*