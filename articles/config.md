# Configuration

## Stop It

### Common Understanding

*But what if we need to change something?*

This question haunts our minds. If you hardcode a value into your program, like a timeout duration, for instance, and you need to change it, what do you do? Edit the code, rebuild, and redeploy? Are you crazy?

So you put the timeout value in a separate file and have the program read from that file on startup. Or even refresh the in-memory value when the program detects the separate file has changed.

Now values that control the details of the program's behavior can be controlled convienently and safely.

The world of the program has been split into a dichotomy: "code" and "configuration".

Code is compilied into an immutable executable ahead of time. It is environment (Dev machine, QA, Staging, Production) agnostic. Don't put anything here thay you might need to change post-deployment.

Configuration is paired with a copy of the compiled code upon deploy and can be modified with a simple text editor. It is environment specific. Anything that you might need to change post-deployment is put here.

### Socrates Lives

*What do people do when they want to be able to configure which behavior to use?*

From what I've seen, they write a few, different implementations of possible, desired behaviors and then put a setting in the config where one of them can be specified: A, B or C.

*But what if we need an option other than A, B or C?*

Then you add one in the code...

*So I still have to edit the code, making this approach to config pointless?*

Oh... I guess it does...

*Or what if some of those config values need to depend on each other or we want to put a function in the config? So I have setting A and setting B and setting B needs to be A + 1 or something to that effect...*

Well, then you put A in the config and declare B in the code and make B = lookup("A") + 1.

*But I want B to be part of the config so I can change it's relationship to A.*

Well, then declare both of them in the config and make B one more than whatever you make A.

*But that defeats the purpose of the config. I want the relationship between A and B to be explicit, I want to not repeat myself and I want be able to modify all of these things.*

That sounds more like non-AOT code.

*So this non-AOT code thing can do what I need...*

### A Different Take On it

Basically, the lesson is that depending on how far you want to take configuration, you might need to use a full programming language for your config files.

You might even need to compile the whole application on startup.

Have fun with that.

Should probably edit this some more.

### C# Example

Drop something like this into your application to use a "config file" like the one described above:

```csharp
// Declares the properties in the config file.
public interface IConfig
{
    String Greeting { get; }

    int RetryCount { get; }

    DateTime Cutoff { get; }

    String FormatName(String name);
}

// Compiles and loads the config file implementation
// and makes it available to the application.
public static class App
{
    private static readonly CsConfigLoader<IConfig> loader =
        new CsConfigLoader<IConfig>(
            ConfigurationManager.AppSettings["CsConfigPath"].ToString());
    public static void LoadConfig() { loader.Get(); }
    public static IConfig Config { get { return loader.Get(); } }
}

// Call LoadConfig() instead of waiting for first usage
// to lazily compile/load.
// Loading up front prevents compile errors from happening
// at some unknown point in the future.
public static class Program
{
    public static void Main(String[] args)
    {
        App.LoadConfig();
        Console.WriteLine("Brand name: " + App.Config.Greeting);
    }
}
```
