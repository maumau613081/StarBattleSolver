const rows = 10;
const cols = 10;
const board = [];

for (let i = 1; i <= rows; i++) {
    const row = [];
    for (let j = 1; j <= cols; j++) {
        row.push(`x:${j}, y:${i}`);
    }
    board.push(row);
}

console.log(board);