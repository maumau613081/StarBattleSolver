class StarBattlePuzzleImport {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.board = Array.from({length: this.rows}, () => Array(this.cols).fill(null));
        this.regions = {};
    }

    //枠を読み込む
    addRegions(ranges) {
        for (const key in ranges) {
            const data = ranges[key];
            const xStart = data[0] - 1;
            const label = key.replace("Range", "");
            this.regions[label] = [];

            for (let i = 1; i < data.length; i++) {
                const currentX = xStart + i - 1;
                const yRange = data[i];

                for (let j = 0; j < yRange.length / 2; j++) {
                    const yStart = yRange[2 * j] - 1;
                    const yEnd = yRange[2 * j + 1] - 1;

                    for (let k = yStart; k <= yEnd; k++) {
                        this.regions[label].push({x:currentX,y:k});
                    }
                }
            }
        }
    }

    resetboard() {
        for (let r = 0; r < this.rows; r++) {
            this.board[r].fill(null);
        }
    }
}

class StarBattlePuzzleSolver {
    constructor (rows, cols, board, regions) {
        this.rows = rows;
        this.cols = cols;
        this.board = board;
        this.regions = regions;
        this.answerBoard = [];
    }

    //空きが最小の枠を取得
    getSmallestRegion (givenBoard) {
        let minCount = Infinity;
        let smallestRegion = null;
        for (const label in this.regions) {
            const emptyCount = this.regions[label].filter(pos => {
                return givenBoard[pos.y][pos.x] === null;
            }).length;

            if (emptyCount > 0 && emptyCount < minCount) {
                minCount = emptyCount;
                smallestRegion = label;
            };
        }
        return this.regions[smallestRegion];
    }

    //星を置いて×をつける
    placeStar(givenBoard, x, y) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                if (y + i < 0 || y + i > this.rows - 1) continue;
                if (x + j < 0 || x + j > this.cols - 1) continue;
                givenBoard[y + i][x + j] = false
            }
        }
        givenBoard[y][x] = true;
        let starsInRow = 0;
        for (let i = 0; i < 10; i++) {
            if (givenBoard[y][i] === true) starsInRow++;
        }
        if (starsInRow === 2) {
            for (let i = 0; i < 10; i++) {
                if (givenBoard[y][i] === null) givenBoard[y][i] = false;
            }
        }
        let starsInCol = 0;
        for (let i = 0; i < 10; i++) {
            if (givenBoard[i][x] === true) starsInCol++;
        }
        if (starsInCol === 2) {
            for (let i = 0; i < 10; i++) {
                if (givenBoard[i][x] === null) givenBoard[i][x] = false;
            }
        }
        return givenBoard;
    }

    tryPlacingStar(givenBoard, countOfStars) {
        if (countOfStars === 20) {
            this.answerBoard = givenBoard;
            return true;
        }
        const smallestRegion = this.getSmallestRegion(givenBoard);
        if (!smallestRegion) return false;
        const candidates = smallestRegion.filter(pos => givenBoard[pos.y][pos.x] === null);
        for (const pos of candidates) {
            const backup = givenBoard.map(row => [...row]);
            const newBoard = this.placeStar(backup, pos.x, pos.y)
            if (this.tryPlacingStar(newBoard, countOfStars + 1)) return true;
        }
        return false;
    }

}

/**const ranges = {
    ARange:[1,[1,2],[1,4],[1,3],[2,3],[3,5],[3,5],[2,5],[3,3]],
    BRange:[4,[1,2],[1,2],[1,1],[1,2]],
    CRange:[9,[1,3]],
    DRange:[8,[9,10],[4,5,7,10],[1,10],],
    ERange:[1,[3,5],[5,5]],
    FRange:[2,[6,6],[4,6],[4,5]],
    GRange:[8,[4,8],[6,6]],
    HRange:[1,[6,10],[7,10],[7,10],[6,7]],
    IRange:[4,[8,10],[6,10],[6,6,8,10],[6,6,8,10],[6,6],[6,6]],
    JRange:[6,[7,7],[7,10]]
};**/