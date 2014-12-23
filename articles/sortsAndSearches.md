# Sorts and Searches

## ...Searches and Sorts

---

### First Thing's First

In school, the first algorithms you learn early are sorts: Insertion, Selection, Merge, Quick. But there are only two common algorithms for searching a list: Linear and Binary. One's alot faster than the other.
 
linearSearch : O(n)
Items      | Reps
10         | 5
100        | 50
1000       | 500
1000000    | 500000
1000000000 | 500000000
 
binarySearch : O(log n)
Items      | Reps
10         | 3
100        | 7
1000       | 10
1000000    | 20
1000000000 | 30
 
It would seem that the use of one entirely follows from the use of the other.
 
What makes searching a whole lot easier? Having a sorted collection.
Why sort? So you can search.
Why else would you sort?