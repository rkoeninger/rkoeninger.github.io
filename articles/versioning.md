# Versioning

## How to Meaningfully Identify Code

### What Does a Version Number Mean?

Semantic versioning (link needed) is an attempt to make traditional x.y.z version numbers meaningful.

My idea of an informative version <s>number</s> identifier is something like this:

```
tfs://yourcompany.visualstudio.com/DefaultCollection/ProjectName?975
```

I got this idea while working on a project with code hosted on Visual Studio Online (link needed).

The vid (version identifer) tells you exactly where the code came from and can be used to get the exact source code which can be used to determine the live application's behavior. A version number like `2.3.4` tells you the degree to which that version differs from `1.2.3`.

### Who Are Version Numbers For?

As a developer on an application that gets frequently deployed, I like knowing *exactly* what code is currently deployed. `1.2.3` doesn't tell me that. It doesn't tell me anything. The full path to the source code repo and the exact revision or commit number would be more helpful if I want to debug locally or check diffs with the revisions that immediately preceeded the deployed revision.

As a user trying to get something done or make a decision, the path the code repo isn't very useful. Odds are, I won't even have access to the code repo. Having some hints as to the high-level differences between what I have and what I'm considering upgrading to are what I need. Although `1.2.3` and `1.3.0` don't tell me that either. They just tell me that there are changes between the two that effect compatibility. But not how. I suppose it's still nice to have a hint.

<disqus>
