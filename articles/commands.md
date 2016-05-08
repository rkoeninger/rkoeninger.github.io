# Command Aliases in Windows

Here's a cool trick I found (can't remember where...) for managing the command PATH in Windows. It can be hard to maintain a crazy-long list of paths in the PATH environment variable. Oracle might even complain if your PATH is too long.

So instead, you might prefer add `C:\commands` and then put `.cmd` files there which redirect your command and arguments to the relevant binary.

This can be helpful due to differences in file system layout between Windows and Linux. On Linux, most of your commands will be in `/bin`, `/usr/bin`, etc. Either the binaries themselves are in those directories or aliases to them. Either way, you won't end up with a very long value in your PATH variable. On Windows, each program gets installed in its own directory. So every couple of binaries or scripts you might want to execute from the command line will require an additional directory to be appended to the PATH variable.

Using a `C:\commands` directory is a kind of emulation of the Linux pattern.

This also helps when your command window or some other program doesn't update its environment variables when they are updated under System Properties. If `C:\commands` is in the path from the beginning, you won't have to restart these programs to be able to run new commands.

A simple alias looks like this:

```dos
@echo off

start "" /i "C:\Program Files\Sublime Text 3\sublime_text.exe" %*
```

This is saved in a file named `subl.cmd`. It starts Sublime Text in a new process, passes along command line arguments and returns immediately.

Writing these middle-man scripts also allows one to do things like manipulating arguments before passing them along. This script accepts the name of a file and a line number to jump to and opens Sublime with that file at that line:

```dos
@echo off

start "" /i "C:\Program Files\Sublime Text 3\sublime_text.exe" %1:%2
```

This script was written for compatibility with another program that wanted to pass in the two arguments like this: `%1 %2`, but Sublime wants them passed in like this: `%1:%2`.

For other programs, you might want to be able to change directories before or after running a program, or between two different programs. This approach allows you to do that, where just using symlinks would not.
