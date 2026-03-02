class StarBattlePuzzleImport {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.board = Array.from({length: this.rows}, () => Array(this.cols).fill("1"));
        this.regions = {};
        console.log("this is Board : ", this.board)
    }

    addRegions(ranges) {
        for (const key in ranges) {
            const data = ranges[key];
            const xStart = data[0];
            const label = key.replace("Range", "");
            this.regions[label] = [];

            for (let i = 1; i < data.length; i++) {
                const currentX = xStart + i - 1;
                const yRange = data[i];

                for (let j = 0; j < yRange.length / 2; j++) {
                    const yStart = yRange[2 * j];
                    const yEnd = yRange[2 * j + 1];

                    for (let k = yStart; k <= yEnd; k++) {
                        this.regions[label].push({x:currentX,y:k});
                    }
                }
            }
        }
        console.log("this is Regions : ", this.regions)
    }
}

class StarBattlePuzzleSolver {
    constructor (rows, cols, board, regions) {
        this.rows = rows;
        this.cols = cols;
        this.board = board;
        this.regions = regions;
    }

    getsmallestregion () {
        let minCount = Infinity;
        let smallestRegion = null;
        for (const label in this.regions) {
            const emptyCount = this.regions[label].filter(pos => {
                return this.board[pos.y-1][pos.y-1] === "1";
            }).length;

            if (emptyCount > 0 && emptyCount < minCount) {
                minCount = emptyCount;
                smallestRegion = label;
            };
        }
        return smallestRegion;
    }

    placeStar(board, x, y) {
        for (let i = -1; i < 1; i++) {
            for (let j = -1; j < 1; j++) {
                if (this.board[targetPosition.x + i][targetPosition.y + j] === 1) {
                    this.board[targetPosition.x + 1][targetPosition.y + j] = 0
                } else {
                    return false;
                }
            }
        }
        this.board[randomTarget.x][ranodmTarget.y] = 2;
    }

    placeRandomInSmallestRegion (currentStars) {
        const targetRegion = this.getsmallestregion();
        if (!targetRegion) return null;
        const positions = this.regions[targetRegion].filter(pos => {
            return this.board[pos.x-1][pos.y-1] === "1";
        });

    }

}

const ranges = {
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
};

const puzzle = new StarBattlePuzzleImport(10,10);
puzzle.addRegions(ranges);
