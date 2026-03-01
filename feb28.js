const rows = 10;
const cols = 10;
const board = [];

for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
        row.push(`1`);
    }
    board.push(row);
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

const regions = {
    A:[],
    B:[],
    C:[],
    D:[],
    E:[],
    F:[],
    G:[],
    H:[],
    I:[],
    J:[],
}

/**foreach (Ranges, i) {
    for (j=0; j<Ranges[i].length-1; j++) {
        for (k=Ranges[j][1]; k<Ranges[j][2]; k++) {
            regions.A.push({x:j,y:k});
        }
    }
}
**/

for (const key in ranges) {
    const data = ranges[key];
    const xStart = data[0];
    const label = key.replace("Range", "");

    for (let i = 1; i < data.length; i++) {
        const currentX = xStart + i - 1;
        const yRange = data[i];

        for (let j = 0; j < (yRange.length)/2; j++) {
            const yStart = yRange[2*j];
            const yEnd = yRange[2*j+1];

            for (let k = yStart; k <= yEnd; k++) {
                regions[label].push({x:currentX,y:k})
            }
        }
    }
}