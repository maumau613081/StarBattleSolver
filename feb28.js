const rows = 10;
const cols = 10;
const board = [];

for (let i = 0; i <= rows; i++) {
    const row = [];
    for (let j = 0; j <= cols; j++) {
        row.push(`x:${j + 1}, y:${i + 1}`);
    }
    board.push(row);
}

console.log(board);