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

Briding the static and dynamic worlds would make life much simpler.

# Technical / Business Gap

Another gap is the one between business and IT. I've noticed that often the business or customer has a need that they don't even think to ask for because they think it's too difficult to implement or they don't realize it's possible. In reality, that need may be trivial to provide.

I remember working on an application that involved organizing effort among many residental and commerical addresses. Each location would receive a post card notifying them that a worker would arrive on a particular date in a given time window to perform the work.

In order to check if the post card had been sent to a partiular address, someone from the business unit would have to search for the address on the master job site screen, and then drill through 3 or 4 pages/dialogs to see if the post card had been sent.

A request came in to show if a post card had been sent on the master job site screen next to each address one had been sent to. This took me only a few minutes to implement. Adding this really made the manager's day. It probably saved him hours of time over the course of using the application and it only took a few minutes to make the customer happy.

Unfortunately, this sometimes works the other way. Customers demand that something be implemented and don't understand how it could be so difficult. It might not be possible to explain if the problem arises in the application's fundamental design or architecture in some way.

Changes are easier to make the less they defy the fundamental assumptions the application was built on.
