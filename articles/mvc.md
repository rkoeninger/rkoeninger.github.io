# Deconstruction of Model-View-Controller

## Why does OOP have to make things so damn confusing?

Even after all these years, there are still many developers who don't quite get the MVC concept. Like many object-oriented design patterns, it's assumed to be intuitive, but in practice, it hasn't played out that way.

I also find that this misunderstand causes strange habits like trying to re-use a ViewModel class in different ways in different contexts.

In the .Net world, some of this may also be the result of exposure to WebForms which will leave any normal developer scared for life.

After having worked with ASP.Net MVC for a while, I've started to think that we could do better by simplifying the concept from Model-View-Controller to something simpler like Action-View.

### Model

*TODO add textbook definition of Model*

It's become my opinion that the model should just be a simple data structure. It's job is to model data only and not behavior. The data that it represents is all contained in the model mostly for the sake of conveinence. This makes the concept of the model rather trivial so I wouldn't include it in the design pattern at all.

Frequently, a ViewModel class will get re-used to both build the page and submit form data page to the server, even if they don't contain the same data. The ViewModel ends up containing the union of a handful of different sets of fields and when which field should be set or might reasonably be left uninitialized becomes hard to figure out.

### View

*TODO add textbook definition of View*

Views in many languages are some kind of template language with it's own syntax, often specifically desinged to generate HTML. Despite looking like a template, it might be easier to think of them as functions. Functions that take an argument (or set of arguments) and return HTML. In many frameworks, they take a single argument, the view model. This also relates to the triviality of the model part of the pattern as the model is now just a conveinent way of passing data into the view.

```razor
@Model SomeModel;

<div>
    Hello, my name is @Model.FirstName @Model.LastName

    I am @Model.Age.ToString("0.00") years old
</div>
```

This could be written like:

```csharp
String SomeView(SomeModel model)
{
    return String.Format(
        @"<div>Hello, my name is {0} {1}
          I am {2:0.00} years old</div>",
        model.FirstName, model.LastName, model.Age);
}
```

Since the view is still a meaningful part of the design pattern, I wouldn't leave it out of the name.

### Controller

*TODO add textbook definition of Controller*

In the last couple of apps I've worked on, the Controller classes weren't *things* themselves, so much as scopes to hold dependencies that the Action methods they contain required.

So I wouldn't think of the Controller as being the important bit so much as the Actions, which are (again) just methods.

```csharp
class SomeController : Controller
{
    ICustomerDao CustomerDao { get; set; }

    ActionResult Summary(int customerId)
    {
        var customer = CustomerDao.ById(customerId);

        ...
    }
}
```

The action methods serve the purpose of linking business logic to user input and the view. The business logic is under the action methods not in the sense that it's in the class with the action methods, but under the execution path that extends from the action method.

### What's Left?

Only two things are left from the MVC pattern - views that render the UI and actions that link the UI to the business logic.

Boiled down to these two pieces, they simply represent a classic design tenet: separation of concerns.
