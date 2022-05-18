# Tic-Tac-Toe logic

Each cell in the game board has a cell number , as shown in this chart:

```
      |   |
    0 | 1 | 2
  ----+---+----
    3 | 4 | 5
  ----+---+----
    6 | 7 | 8
      |   |
```

### Game board

- `gameBoard = ['-', '-', '-', '-', '-', '-', '-', '-']`

elements of gameBoard is` '-'` if cellNumber is unplayed,
`'X'` if played in by player X,
and` 'O'` if played in by player O.

#### Winner

- winner = '?'
  `'?'` by default
  `'X'` if game has been won by X
  `'O'` if game has been won by O
  `'S'` if game has been won by no one (no moves left, but no winner, stalemate)

#### Win conditions

- `function checkWin(p, q, r){}`

checkWin will take three params being the conditions game can be won

- `checkWin(0, 1, 2)`
- `checkWin(3, 4, 5)`
- `checkWin(6, 7, 8)`

- `checkWin(0, 3, 6)`
- `checkWin(1, 4, 7)`
- `checkWin(2, 5, 8)`

- `checkWin(0, 4, 8)`
- `checkWin(6, 4, 2)`

**checkWin will**

- Check if q is empty (returns false if is empty)
- Check if value of q is equal to p (ie `if('x' === 'x' )`) (returns false if isn't equal)
- Check if value of r is equal to p (ie `if('x' === 'x' )`) (returns false if isn't equal)
- if none of the above conditionals return false, else winner will be set to q (`'X'` / `'O'`) and function will return true

#### Stalemate condition

- `function isStalemate(){}`

**isStalemate will**

- Loop through gameBoard and check if every element is `'-'` or `'X'` or `'O'`, if not, will return false
- if the above conditional doesn't return false, the winner will be set to `'S'` for Stalemate and function will return true
