# Invariants

adding more invariants typically makes the program simpler by reducing the number of possibilities (same for languages). consider tic tac toe
* always exactly 2 players (having variable players is more complicated)
* players place exactly 1 symbol at time (adding variable symbols is more complicated)
but not always. sometimes, adding invariants increases the program complexity because the ambiguity or flexibility is easier.
* player cannot place a symbol on spot that already has a symbol (having to check if spot has a symbol is more work)
* player can't take longer than 30 to make a move or they forfiet (much harder, easier just to wait indefinitely)

