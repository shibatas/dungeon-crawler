import React, { Component } from 'react';
import Footer from './assets/footer';
import './App.css';
import {x, y, mapWidth, emptyMap, initWall} from './config.js';

class Parent extends Component {
  render() {
    return (
      <div>
        <div className="wrapper">
          <Header />
          <App />
        </div>
        <Footer />
      </div>
    );
  }
}
class Header extends Component {
    render() {
      return (
        <header>
          <div className="App App-header">
            <h1 className='App-title'>Dungeon Crawler</h1>
          </div>
        </header>
      );
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      map: emptyMap,
      wall: initWall,
      player: '27x17'
    };
  }
  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  render() {
    return (
      <div className="App">
        <div>
          {this.generateMap()}
        </div>
      </div>
    );
  }
  componentDidUpdate() {
    //console.log(this.state.map);
  }
  generateMap = () => {
    let map = Object.assign({}, this.state.map);
    //set class @ player position
    map[this.state.player] = 'player';

    //set class for walls
    this.state.wall.forEach((id) => {
      map[id] = 'wall';
    });

    //generate map
    let render = [];
    let w = mapWidth / x;
    let h = w;
    for (let j=0; j<y; j++) {
      let row = [];
      for (let i=0; i<x; i++) {
        let pos = i+'x'+j;
        row.push(
          <span key={pos} id={pos} onClick={this.handleClick} >
            <svg width={w} height={h}>
              <rect id={pos} className={map[pos]} width={w} height={h} />
            </svg>
          </span>
        );
      }
      render.push(
        <div key={'row'+j} id={'row'+j} style={{height: h}}>{row}</div>
      );
    }
    return render;
  }
  handleClick = (e) => {
    let target = [ e.target.id ];
    this.update('wall', target);
  }
  handleKeyDown = (e) => {
    //tip on held down key https://forum.freecodecamp.org/t/dungeon-crawler-feedback-please/43394/11
    let walls = this.state.wall;
    let curPos = this.state.player.split('x');
    let xPos = parseInt(curPos[0]), yPos = parseInt(curPos[1]);
    let newPos = curPos;
    switch (e.key) {
      case 'ArrowUp': yPos--;
        break;
      case 'ArrowDown': yPos++;
        break;
      case 'ArrowRight': xPos++;
        break;
      case 'ArrowLeft': xPos--;
        break;
      default: break;
    }

    if (xPos < x && xPos >= 0 && yPos < y && yPos >=0) {
      newPos = xPos.toString() + 'x' + yPos.toString();
      if (!walls.includes(newPos)) {
        this.setState({
          player: newPos
        })
      }
    }

  }
  update = (newClass, target) => {
    let wall = this.state.wall.slice();
    let obj = Object.assign({}, this.state.map);
    target.forEach((item) => {
      obj[item] = newClass;
      wall.push(item);
    });
    console.log(wall);
    this.setState({
      map: obj,
      wall: wall
    });
  }
}


export default Parent;
