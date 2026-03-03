const ranges = { };
const gridSize = 10;
const canvas = document.getElementById('puzzleCanvas');
const ctx = canvas.getContext('2d');
const cellSize = canvas.width / gridSize;

const puzzle = new StarBattlePuzzleImport(gridSize, gridSize);
puzzle.addRegions(ranges);
const solver = new StarBattlePuzzleSolver(gridSize, gridSize, puzzle.board, puzzle.regions);

function drawOutline() {
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawCells() {
    ctx.beginPath();
    for (let i = 1; i < gridSize; i++) {
        ctx.moveTo(cellSize * i, 0);
        ctx.lineTo(cellSize * i, canvas.height);
        ctx.moveTo(0, cellSize * i);
        ctx.lineTo(canvas.width, cellSize * i);
    }
    ctx.closePath();
    ctx.strokeStyle = #b1b1b1;
    ctx.stroke();
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const cursor = {x : event.clientX - rect.left, y : event.clientY -rect,top};
    const col = Math.floor(cursor.x / cellSize);
    const row = Matj.floor(cursor.y / cellSize);
});

document.getElementById('solveBtn').addEventListener('click', () => {
    if (solver.tryPlacingStar(puzzle.board, 0)) {
        draw(solver.answerBoard);
        alert("解けました！");
    } else {
        alert("解が見つかりませんでした。");
    }
});


drawOutline();
drawCells();












