# Sorts and Searches

## ...Searches and Sorts

---

### First Thing's First

In school, the first algorithms they teach you are are searches and sorts. While there are several sorting algorithms - insertion sort, selection sort, merge sort, quick sort, there are only two common searching algorithms: linear and binary.

<dl>
  <dt>Linear Search</dt>
  <dd>Go down the list, checking each item until the target item is found.</dd>
</dl>

```ruby
def linear_search(list, val)
  for i in 0..list.length
    return i if list[i] == val
  end
  nil
end
```

The linear search runs in `O(n)` time, meaning the average time it takes to run is propotional to the length of the list.

| List Length   | Average Algorithm Time |
|--------------:|-----------------------:|
|            10 |                      5 |
|           100 |                     50 |
|         1,000 |                    500 |
|     1,000,000 |                500,000 |
| 1,000,000,000 |            500,000,000 |

<dl>
  <dt>Binary Search</dt>
  <dd>Considering the whole list, compare the item in the middle of the list. If the middle item is greater than the target item, then repeat this process considering only the first half of the list. If the middle item is lesser than the target item, then repeat this process considering only the second half of the list.</dd>
</dl>

```ruby
def binary_search(list, val, low = 0, high = (list.length - 1))
  return nil if high < low
  mid = (low + high) / 2
  case
    when list[mid] > val then binary_search(list, val, low, mid - 1)
    when list[mid] < val then binary_search(list, val, mid + 1, high)
    else mid
  end
end
```

The binary search runs in `O(log n)` time, meaning it's average run time is proportional to the _logarithm_ of the length of the list.

| List Length   | Average Algorithm Time |
|--------------:|-----------------------:|
|            10 |                      3 |
|           100 |                      7 |
|         1,000 |                     10 |
|     1,000,000 |                     20 |
| 1,000,000,000 |                     30 |

You might notice that one is much faster than the other.

It would seem that the use of one entirely follows from the use of the other.
 
What makes searching a whole lot easier? Having a sorted collection.
Why sort? So you can search.
Why else would you sort?