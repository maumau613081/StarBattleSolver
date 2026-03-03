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

function drawSqears() {
    ctx.beginPath();
    for (let i = 1; i <= gridSize; i++) {
        ctx.moveto(5 * i, 0);
        ctx.lineto(5 * i, 100);
    }
    for (let i = 0; i < gridSize; i++) {
        ctx.moveto(0, 5 * i);
        ctx.lineto(100, 5 * i); 
    }
    ctx.closePath();
}

document.getElementById('solveBtn').addEventListener('click', () => {
    if (solver.tryPlacingStar(puzzle.board, 0)) {
        draw(solver.answerBoard);
        alert("解けました！");
    } else {
        alert("解が見つかりませんでした。");
    }
});


drawOutline();
drawSqears();






