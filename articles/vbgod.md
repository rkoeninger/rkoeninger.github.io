# I Am a VB God!

## Apparently...

### Some Context for My Claim

While setting up [my Elance profile][1] a while ago, I took a couple of the skills tests to see if I could get myself to stand out. I did pretty well on the standard Java and Scala tests (top 5% each) and since I was flying high, I tried the VB.Net test.

I thought I did alright...

Just alright...

And the results...

Top 10%.

Keep in mind that I have never used VB.Net in a project. I have never read more than a few dozen lines of VB.Net. I have never touched VB classic or VBScript or anything of the sort. All I know about VB.Net, I have picked up in passing.

One must wonder: is it possible to have absorbed that much in passing or are the other 90% of people who took that test really that bad?

### VB?! Ew, Gross!

Yes, it looks weird to me, too. But I've long been broken of the curly-brace fixation.

Looking at a feature comparison, VB.Net has quite a lot to offer. It's not that different from C#, as they were designed to be the two original flagship languages of the .Net Framework.

If you look past the syntax, the two languages have even more in common as C# does with Java. Considering C# and Java are almost the same language already, that's saying something.

The most apparent difference is VB prefers keywords over symbols. BASIC was supposed to be a language for learners so self-describing keywords are chosen over terse but cryptic symbols. Instead of `{ ... }`, you get `begin ... end`.

### Comparative Programming Language History

The undesirable parts of VB classic seem to share the pathology of JavaScript. They both started out as simple "scripting languages" that would only be used to link UI components to business logic or libraries (COM Components) where the real work would be done.

Problem was, over time, people started actually using it for real work. Doing real work in VB was a mess without very strict standards and another scourge of developers is born.

Maybe there's a lesson to be learned here: stop designing intentionally crappy languages. In trying to make them more simpler for people who don't know what they're doing, we got a language where no one knows what they're doing.

### VB Specialities

Looking at the difference between VB.Net and C# lends even more credit to the idea that VB is GUI-focused. VB has a few additional features like `Handles`, `WithEvents` and `RaiseEvent` specifically for coding GUIs.

It also has some syntax sugar for common values like XML and date literals. Identifiers are case-insensitive.

Some keywords have friendlier names like `Me` instead of `this`, `Shared` instead of `static` and `Friend` instead of `internal`.

One of the wiser choices is the use of the `&` character for string concatenation. The more popular choice is the `+` symbol, which is also used for addition. Using `+` for concatenation is can be confusing because one expects the `+` operator to be communative and associative. String concatenation is only associative. I'm sure people understand that (after looking up the definitions of associative and communative), but it makes it harder to understand code at first glance. The `&` character was a good choice.

And then there's what might be the worst choice in the language's design - it retains `Option Strict`, which is off by default. By default, code in VB is prone to subtle coding errors in order to give coders the impression that the language is easy to use. Such an option only creates the appearance of ease of use while actually making it harder to write correct, working code.

[1]: http://www.elance.com/s/robertkoeninger
