# War on Syntax

## Red Herrings of Language Design

> Typing semicolons is not the hardest part of the job.

### Multiline Strings

A see multi-line strings are a common feature that coders really appreciate. But they've always bothered me. It seems like it could be done better.

I read [an article][javaAnnoyingThings] where the other said that multi-line strings are one of the most annoying things that Java is missing compared to Scala. Below is the example given and the equivalent in Java.

```scala
println ("""Dear reader,
 
If we had this feature in Java,
wouldn't that be great?
 
Yours Sincerely,
Lukas""")
```

```java
System.out.println("Dear reader,\n" +
"\n" +
"If we had this feature in Java,\n" +
"wouldn't that be great?\n" +
"\n" +
"Yours Sincerely,\n" +
"Lukas");
```

While I agree the Java version is harder to look at and more prone to getting th newlines wrong I don't syntax is the fix for this. The Scala one still looks wrong to me because the beginning of the lines don't start in the same column.

You could put the first line of the multiline string on its own line:

```scala
println (
"""Dear reader,
 
If we had this feature in Java,
wouldn't that be great?
 
Yours Sincerely,
Lukas""")
```

That should work. But, depending on the language, you can't indent the other lines because those spaces would be part of the string.

```scala
println ("""Dear reader,

            If we had this feature in Java,
            wouldn't that be great?

            Yours Sincerely,
            Lukas""")
```

I think the mistake is limiting ourselves to expressing code with only ascii characters. The editor could collapse string literals, especially multi-line ones, and present a string editing mode or a popup containing the un-escaped string literal when the coder wants to view or edit it.

This could also extend to string interpolation. An editor-in-editor could give specialized commands and highlighting for applying format strings or view the output when sample values are provided.

### Collection Initializers

In the same vein as the above, specifying structured data could be done in a way that allows for easier visualization and editing. The syntax can really get in the way of working with the raw data.

Here's some collection initializer code in C#:

```csharp
var numbers = new Dictionary<String, int>
{
    {"one",   1},
    {"two",   2},
    {"three", 3},
    {"four",  4}
}
```

Here's another way that code could be viewed:

| Key     | Value |
|:--------|------:|
| "one"   |     1 |
| "two"   |     2 |
| "three" |     3 |
| "four"  |     4 |

One thing that I like in my code is to have things aligned when they are arranged in columns. By lining things up, the eye can easily ignore what's in common between lines and easily detect what's different.

One thing I don't like about coding is keeping those columns aligned. Maybe the editor could just do that itself, like the table visualization?

### Method Calls

In most languages, arguments are identified positionally. For a function like `f(x, y) = blah`, when called, the first argument gets bound to `x`, the second gets bound to `y`. When we have functions with many arguments, this can get confusing. Which argument is which again? Especially when we have multiple arguments of the same type, like a handful of booleans in a row: `DoWhatever(false, true, true, false, true)`.

Named arguments can help here, as then each argument is explicitly labeled, so the dev doesn't have to check what each argument means, and then the arguments can also be provided in any order. Instead of the collection of arguments being a list, it is now a dictionary.

But we still have a representation problem when we want to call that method multiple times:

```csharp
DoWhatever(thing1 = false, thing2 = true, thing3 = true, thing4 = false, thing5 = true);
DoWhatever(thing1 = true, thing2 = true, thing3 = true, thing4 = false, thing5 = false);
DoWhatever(thing1 = false, thing2 = true, thing3 = true, thing4 = false, thing5 = true);
DoWhatever(thing1 = false, thing2 = true, thing3 = false, thing4 = false, thing5 = false);
DoWhatever(thing1 = true, thing2 = false, thing3 = true, thing4 = false, thing5 = true);
```

Looks like another use for a table representation:

| DoWhatever() | | | | |
| thing1 | thing2 | thing3 | thing4 | thing 5 |
|-------|-------|-------|-------|-------|
| false | true | true | false | true |
| true | true | true | false | false |
| false | true | true | false | true |
| false | true | false | false | false |
| true | false | true | false | true |

### The Future

Future representations of software need to be to modern code what modern code is to cpu instructions and punch cards. Younger developers would find it hard to believe that useful software could be developed using those old methods. Those old methods, which were once state of the art, are now seen as relics and the punchline of joke. Software development of torromow should do the same to modern development.

[javaAnnoyingThings]: //blog.jooq.org/2014/08/01/the-10-most-annoying-things-coming-back-to-java-after-some-days-of-scala/
