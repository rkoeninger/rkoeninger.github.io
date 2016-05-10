Getting a Decent Windows Command Line

* TODO: merge with command alias article *

Console2

cmder

This is actually quite a simple fix, just run the following command before starting GHCi:

This sets Window's encoding to the 65001 code page, which lets the λ get displayed properly:

```no-highlight
> chcp.com 65001
```
