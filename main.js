class DrawCanvas {
    constructor (cellSize) {
        const canvas = document.getElementById('puzzleCanvas');
        this.cellSize = cellSize;
        ctx = canvas.getContext('2d');
    }

    drawBoard () {
        ctx.beginPath();
        ctx.strokeStyle = "#000000"
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        for (let i = 1; i < gridSize; i++) {
            ctx.moveTo(cellSize * i, 0);
            ctx.lineTo(cellSize * i, canvas.height);
            ctx.moveTo(0, cellSize * i);
            ctx.lineTo(canvas.width, cellSize * i);
        }
        ctx.strokeStyle = "#b1b1b1";
        ctx.stroke();
    }

    resetCanvas () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard();
    }

    refreshCanvas (regions, regionItems) {
        this.resetCanvas();
        for (const region in regions) {
            for (const cell in region) {
                if (cell.x, cell.y) {
                    ctx.beginPath();
                    ctx.strokeStyle = "#000000"
                    ctx.moveTo(cellSize * (cell.x + 1));
                    ctx.lineTo();
                    ctx.stroke();
                }
            }
        }
    }
}

const gridSize = 10;
const canvas = document.getElementById('puzzleCanvas');
const ctx = canvas.getContext('2d');
const cellSize = canvas.width / gridSize;
const regions = [];
let regionItems = [];

const puzzle = new StarBattlePuzzleImport(gridSize, gridSize);
puzzle.addRegions(ranges);
const solver = new StarBattlePuzzleSolver(gridSize, gridSize, puzzle.board, puzzle.regions);

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const cursor = {x : event.clientX - rect.left, y : event.clientY -rect.top};
    const col = Math.floor(cursor.x / cellSize);
    const row = Math.floor(cursor.y / cellSize);
    if (regions.come(region => region.some(pos => pos.x === col && pos.y === row))) return;
    regionItems.push({x : col, y : row})
    ctx.beginPath();
    ctx.fillStyle = "#ffbbbb";
    ctx.fillRect(cellSize * col, cellSize * row, cellSize, cellSize);
});

document.getElementById('createRegion').addEventListener('click', () => {
    regions[regions.length] = regionItems;
    regionItems = [];
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawOutline();
    drawCells();
})

document.getElementById('solveBtn').addEventListener('click', () => {
    if (solver.tryPlacingStar(puzzle.board, 0)) {
        draw(solver.answerBoard);
        alert("解けました！");
    } else {
        alert("解が見つかりませんでした。");
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    puzzle.resetboard();
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawOutline();
    drawCells();
})

drawOutline();
drawCells();

