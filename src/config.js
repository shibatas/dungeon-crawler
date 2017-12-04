// number of blocks
const x = 60;
const y = 40;
// map width
const mapWidth = 800;
// block size
const w = mapWidth / x;
const h = w;
// height of map area
const mapHeight = y*h;
const defaultLevel = 0;
// initial state of the board (empty board)
let initMap = {};
for (let j=0; j<y; j++) {
  for (let i=0; i<x; i++) {
    initMap[i+'x'+j] = 'default';
  }
}

// let noWall = [];
let map = [{
  wall: [
  "23x12",
  "24x12",
  "25x12",
  "26x12",
  "27x12",
  "28x12",
  "29x12",
  "30x12",
  "31x12",
  "31x13",
  "31x14",
  "31x15",
  "25x21",
  "22x21",
  "22x19",
  "22x20",
  "22x18",
  "22x17",
  "22x16",
  "22x13",
  "22x12",
  "21x21",
  "20x21",
  "19x21",
  "18x21",
  "18x20",
  "18x19",
  "18x18",
  "18x17",
  "18x16",
  "19x16",
  "20x16",
  "21x16",
  "21x17",
  "21x18",
  "21x19",
  "21x20",
  "20x20",
  "19x20",
  "19x19",
  "19x18",
  "19x17",
  "20x17",
  "20x18",
  "20x19",
  "25x22",
  "25x23",
  "25x25",
  "25x29",
  "25x32",
  "25x35",
  "25x37",
  "25x39",
  "25x38",
  "25x36",
  "25x31",
  "25x30",
  "25x28",
  "25x27",
  "25x26",
  "25x24",
  "31x11",
  "31x9",
  "31x10",
  "31x6",
  "31x5",
  "31x4",
  "31x3",
  "31x2",
  "31x0",
  "31x1",
  "35x21",
  "36x21",
  "37x21",
  "39x21",
  "38x21",
  "40x21",
  "42x21",
  "41x21",
  "43x21",
  "44x21",
  "45x21",
  "46x21",
  "47x21",
  "48x21",
  "49x21",
  "50x21",
  "51x21",
  "52x21",
  "53x21",
  "54x21",
  "55x21",
  "56x21",
  "57x21",
  "58x21",
  "59x21",
  "15x18",
  "14x18",
  "13x18",
  "12x18",
  "11x18",
  "9x18",
  "10x18",
  "8x18",
  "7x18",
  "5x18",
  "6x18",
  "4x18",
  "3x18",
  "2x18",
  "1x18",
  "0x18",
  "18x13",
  "18x12",
  "18x10",
  "18x11",
  "18x9",
  "18x7",
  "18x8",
  "18x6",
  "19x6",
  "20x6",
  "21x6",
  "22x6",
  "23x6",
  "25x6",
  "26x6",
  "24x6",
  "26x5",
  "18x5",
  "19x5",
  "20x5",
  "21x5",
  "22x5",
  "23x5",
  "24x5",
  "25x5",
  "30x0",
  "29x0",
  "28x0",
  "27x0",
  "26x0",
  "25x0",
  "24x0",
  "23x0",
  "22x0",
  "21x0",
  "20x0",
  "19x0",
  "18x0",
  "17x0",
  "16x0",
  "15x0",
  "14x0",
  "12x0",
  "13x0",
  "8x0",
  "7x0",
  "6x0",
  "4x0",
  "5x0",
  "3x0",
  "2x0",
  "1x0",
  "0x0",
  "0x1",
  "0x2",
  "0x3",
  "0x4",
  "0x5",
  "0x7",
  "0x6",
  "0x9",
  "0x8",
  "0x10",
  "0x11",
  "0x12",
  "0x13",
  "0x14",
  "0x15",
  "0x16",
  "0x17",
  "0x19",
  "0x20",
  "0x21",
  "0x22",
  "0x24",
  "0x23",
  "0x25",
  "0x26",
  "0x27",
  "0x28",
  "0x29",
  "0x30",
  "0x31",
  "0x32",
  "0x33",
  "0x34",
  "0x35",
  "2x39",
  "3x39",
  "4x39",
  "6x39",
  "5x39",
  "7x39",
  "8x39",
  "9x39",
  "10x39",
  "11x39",
  "12x39",
  "13x39",
  "14x39",
  "16x39",
  "18x39",
  "19x39",
  "17x39",
  "15x39",
  "20x39",
  "21x39",
  "22x39",
  "24x39",
  "23x39",
  "26x39",
  "32x0",
  "33x0",
  "34x0",
  "35x0",
  "36x0",
  "38x0",
  "37x0",
  "39x0",
  "40x0",
  "41x0",
  "42x0",
  "44x0",
  "43x0",
  "45x0",
  "47x0",
  "46x0",
  "48x0",
  "49x0",
  "50x0",
  "51x0",
  "53x0",
  "52x0",
  "54x0",
  "55x0",
  "57x0",
  "58x0",
  "56x0",
  "59x0",
  "59x1",
  "59x2",
  "59x3",
  "59x4",
  "59x5",
  "59x6",
  "59x7",
  "59x8",
  "59x9",
  "59x10",
  "59x12",
  "59x11",
  "59x14",
  "59x13",
  "59x15",
  "59x17",
  "59x18",
  "59x16",
  "59x19",
  "59x20",
  "59x22",
  "59x23",
  "59x24",
  "59x25",
  "59x26",
  "59x27",
  "59x28",
  "59x29",
  "59x30",
  "59x32",
  "59x31",
  "59x33",
  "27x39",
  "28x39",
  "29x39",
  "30x39",
  "31x39",
  "32x39",
  "33x39",
  "34x39",
  "36x39",
  "35x39",
  "38x39",
  "37x39",
  "39x39",
  "40x39",
  "41x39",
  "42x39",
  "43x39",
  "45x39",
  "44x39",
  "46x39",
  "47x39",
  "48x39",
  "49x39",
  "50x39",
  "51x39",
  "53x39",
  "52x39",
  "54x39",
  "55x39",
  "57x39",
  "56x39",
  "58x39",
  "59x39",
  "59x38",
  "32x9",
  "33x9",
  "34x9",
  "36x9",
  "35x9",
  "37x9",
  "37x10",
  "37x13",
  "37x14",
  "37x15",
  "36x15",
  "35x15",
  "34x15",
  "33x15",
  "32x15",
  "38x13",
  "39x13",
  "40x13",
  "41x13",
  "42x13",
  "43x13",
  "45x1",
  "45x2",
  "45x8",
  "45x10",
  "45x9",
  "45x11",
  "45x13",
  "44x13",
  "45x12",
  "45x6",
  "45x7",
  "56x4",
  "56x5",
  "56x6",
  "56x7",
  "56x8",
  "56x9",
  "56x10",
  "56x12",
  "56x11",
  "56x13",
  "56x14",
  "56x15",
  "54x15",
  "55x15",
  "55x14",
  "54x14",
  "54x13",
  "55x13",
  "55x12",
  "54x12",
  "54x11",
  "55x11",
  "55x6",
  "54x6",
  "53x6",
  "52x5",
  "52x6",
  "52x4",
  "52x3",
  "52x2",
  "52x1",
  "51x1",
  "51x2",
  "51x3",
  "51x4",
  "51x5",
  "51x6",
  "51x7",
  "51x8",
  "51x9",
  "51x11",
  "51x10",
  "51x12",
  "51x16",
  "51x17",
  "51x18",
  "51x19",
  "51x20",
  "54x20",
  "52x20",
  "53x20",
  "55x20",
  "56x20",
  "57x20",
  "58x20",
  "31x25",
  "31x27",
  "31x26",
  "30x25",
  "30x26",
  "30x27",
  "29x25",
  "29x26",
  "29x27",
  "28x25",
  "28x26",
  "28x27",
  "32x27",
  "33x27",
  "34x27",
  "35x27",
  "37x27",
  "38x27",
  "36x27",
  "39x27",
  "40x27",
  "42x27",
  "41x27",
  "43x27",
  "47x27",
  "49x27",
  "48x27",
  "50x27",
  "50x25",
  "50x26",
  "51x24",
  "50x24",
  "51x27",
  "51x26",
  "51x25",
  "58x31",
  "57x31",
  "55x30",
  "56x31",
  "56x30",
  "57x30",
  "58x30",
  "55x31",
  "54x30",
  "54x31",
  "54x32",
  "54x33",
  "54x34",
  "54x35",
  "51x28",
  "50x29",
  "51x29",
  "51x30",
  "47x28",
  "47x29",
  "47x30",
  "51x33",
  "51x31",
  "51x32",
  "48x30",
  "50x30",
  "49x30",
  "49x29",
  "48x29",
  "48x28",
  "49x28",
  "50x28",
  "43x38",
  "43x37",
  "43x36",
  "43x35",
  "43x34",
  "43x33",
  "43x32",
  "43x31",
  "31x32",
  "32x32",
  "33x32",
  "34x32",
  "35x32",
  "36x32",
  "37x32",
  "38x32",
  "38x33",
  "38x34",
  "37x33",
  "37x34",
  "37x35",
  "38x35",
  "37x36",
  "38x36",
  "30x36",
  "30x35",
  "30x34",
  "30x33",
  "30x32",
  "34x36",
  "34x35",
  "33x35",
  "33x36",
  "29x36",
  "29x35",
  "29x34",
  "29x33",
  "29x32",
  "29x31",
  "31x31",
  "30x31",
  "32x31",
  "33x31",
  "34x31",
  "35x31",
  "36x31",
  "37x31",
  "38x31",
  "1x30",
  "2x30",
  "4x30",
  "3x30",
  "5x30",
  "7x30",
  "6x30",
  "10x33",
  "10x34",
  "10x35",
  "10x36",
  "10x37",
  "10x38",
  "9x38",
  "9x37",
  "9x36",
  "9x33",
  "9x34",
  "9x35",
  "6x31",
  "4x31",
  "5x31",
  "3x31",
  "2x31",
  "1x31",
  "0x39",
  "1x39",
  "0x36",
  "0x38",
  "1x36",
  "1x38",
  "2x38",
  "3x38",
  "4x38",
  "5x38",
  "6x38",
  "7x38",
  "8x38",
  "8x37",
  "8x36",
  "7x37",
  "1x32",
  "1x33",
  "2x32",
  "16x18",
  "17x18",
  "14x5",
  "14x6",
  "14x7",
  "14x8",
  "14x9",
  "14x11",
  "14x13",
  "14x10",
  "14x12",
  "13x13",
  "12x13",
  "11x13",
  "10x13",
  "9x13",
  "8x13",
  "7x13",
  "6x13",
  "5x13",
  "4x13",
  "7x16",
  "8x17",
  "8x16",
  "7x17",
  "12x14",
  "12x15",
  "11x14",
  "11x15",
  "4x14",
  "4x15",
  "3x15",
  "3x14",
  "3x13",
  "8x1",
  "8x2",
  "8x4",
  "8x5",
  "8x3",
  "8x6",
  "8x7",
  "8x9",
  "8x10",
  "8x8",
  "7x10",
  "6x10",
  "5x10",
  "4x10",
  "3x10",
  "1x6",
  "2x6",
  "3x6",
  "4x6",
  "5x6",
  "5x7",
  "4x7",
  "3x7",
  "2x7",
  "1x7",
  "9x5",
  "9x6",
  "9x7",
  "9x8",
  "9x9",
  "9x10",
  "10x10",
  "10x9",
  "10x8",
  "10x7",
  "10x6",
  "10x5",
  "9x4",
  "10x4",
  "9x3",
  "18x22",
  "18x23",
  "18x24",
  "18x25",
  "18x27",
  "18x26",
  "18x28",
  "18x29",
  "18x30",
  "18x31",
  "18x32",
  "19x32",
  "21x32",
  "20x32",
  "22x32",
  "23x32",
  "24x32",
  "18x33",
  "18x34",
  "18x35",
  "18x36",
  "19x36",
  "20x36",
  "21x36",
  "22x36",
  "22x35",
  "22x33",
  "22x34",
  "21x34",
  "20x34",
  "19x34",
  "19x33",
  "20x33",
  "21x33",
  "21x35",
  "20x35",
  "19x35",
  "4x25",
  "4x27",
  "5x27",
  "6x27",
  "7x27",
  "7x26",
  "7x25",
  "4x21",
  "7x21",
  "11x21",
  "12x21",
  "13x21",
  "14x21",
  "14x22",
  "14x23",
  "11x23",
  "14x24",
  "13x24",
  "12x24",
  "11x24",
  "4x24",
  "5x24",
  "6x24",
  "7x24",
  "5x21",
  "6x21",
  "11x25",
  "11x26",
  "11x27",
  "12x27",
  "13x27",
  "14x27",
  "14x26",
  "13x30",
  "11x31",
  "10x32",
  "8x34",
  "8x35",
  "7x35",
  "7x36",
  "6x36",
  "6x37",
  "4x32",
  "5x32",
  "3x32",
  "4x33",
  "3x33",
  "2x33",
  "1x34",
  "1x35",
  "2x34",
  "3x34",
  "2x35",
  "5x37",
  "11x32",
  "14x30",
  "12x30",
  "12x31",
  "12x32",
  "13x32",
  "11x33",
  "12x33",
  "14x33",
  "13x33",
  "14x32",
  "14x31",
  "13x31",
  "11x0",
  "10x0",
  "9x0",
  "59x34",
  "59x35",
  "59x36",
  "59x37",
  "25x20",
  "25x19",
  "25x18",
  "25x17",
  "25x15",
  "25x16",
  "26x15",
  "27x15",
  "35x22",
  "35x23",
  "36x23",
  "37x23",
  "38x23",
  "38x22",
  "37x22",
  "36x22",
  "35x24",
  "36x24",
  "37x24",
  "38x24",
  "26x25",
  "27x25",
  "27x26",
  "26x26",
  "26x27",
  "27x27",
  "49x26",
  "49x25",
  "49x24",
  "48x26",
  "48x25",
  "48x24",
  "47x26",
  "47x25",
  "47x24",
  "51x34",
  "51x35",
  "40x28",
  "39x28",
  "36x30",
  "35x30",
  "32x28",
  "31x28",
  "40x16",
  "40x17",
  "40x18",
  "40x19",
  "40x20",
  "41x17",
  "41x16",
  "42x16",
  "42x17",
  "42x18",
  "42x19",
  "42x20",
  "41x19",
  "41x18",
  "41x20",
  "43x16",
  "43x17",
  "43x18",
  "43x19",
  "43x20"
],
  boss: '3x37'
}];

map[defaultLevel].wall.forEach((item) => {
  initMap[item] = 'wall';
});

let initPos = parseInt(x/2,10) + "x" + parseInt(y/2,10);

let level = {
  easy: {
    count: 8,
    attack: 10,
  },
  medium: {
    count: 12,
    attack: 15
  },
  hard: {
    count: 20,
    attack: 20
  }
};

//game board block css
let style = {
  display: 'inline-block',
  width: w,
  height: h
};

const initState = ({
  mapLevel: 0,
  map: initMap,
  wall: map[defaultLevel].wall,
  player: {
    position: initPos,
    hp: 100,
    exp: 0,
    level: 1,
    weapon: 1
  },
  stats: {},
  message: 'Click BEGIN to start!'
});

let config = {
  x: x,
  y: y,
  w: w,
  h: h,
  mapWidth: mapWidth,
  mapHeight: mapHeight,
  initMap: initMap,
  map: {
    0: map[0]
  },
  defaultLevel: 0,
  level: level,
  style: style,
  initState: initState
};
export {config};