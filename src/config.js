//number of cells, [x, y]
const size = [30, 20];
const x = 30, y = 20;
//map width
const mapWidth = 800;
//initial state of the board (empty board)
let emptyMap = {};
for (let j=0; j<y; j++) {
  for (let i=0; i<x; i++) {
    emptyMap[i+'x'+j] = "default";
  }
}

let initWall = [
  "23x12", "24x12", "25x12", "26x12", "27x12", "28x12", "29x12", "30x12", "31x12", "31x13", "31x14", "31x15", "31x18", "31x19", "31x20", "31x21", "30x21", "29x21", "28x21", "27x21", "25x21", "26x21", "22x21", "22x19", "22x20", "22x18", "22x17", "22x16", "22x13", "22x12"
];

export {x, y, mapWidth, emptyMap, initWall};
