const ranges = { };
const gridSize = 10;
const canvas = document.getElementById('puzzleCanvas');
const ctx = canvas.getContext('2d');
const cellSize = canvas.width / gridSize;

const puzzle = new StarBattlePuzzleImport(gridSize, gridSize);
puzzle.addRegions(ranges);
const solver = new StarBattlePuzzleSolver(gridSize, gridSize, puzzle.board, puzzle.regions);

function draw(board) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById('solveBtn').addEventListener('click', () => {
    if (solver.tryPlacingStar(puzzle.board, 0)) {
        draw(solver.answerBoard);
        alert("解けました！");
    } else {
        alert("解が見つかりませんでした。");
    }
});

draw(puzzle.board);