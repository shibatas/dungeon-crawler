import React, { Component } from 'react';
import Footer from './assets/footer';
import './App.css';
import {x, y, mapWidth, emptyMap, initWall} from './config.js';

class Parent extends Component {
  render() {
    return (
      <div>
        <Header />
        <App />
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
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input onKeyDown={this.handleKeyPress} />
        
        <div onKeyDown={this.handleKeyPress}>
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
    this.state.wall.map((id) => {
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
  handleKeyPress = (e) => {
    console.log('key', e.key);
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
/*
let w = mapWidth / x;
let h = w;
let board = [];
for (let j=0; j<y; j++) {
  for (let i=0; i<x; i++) {
    let pos = i+'x'+j;
    defaultMap.pos = (
          <span key={pos} id={pos} >
            <svg width={w} height={h}>
              <rect id={pos} className={this.state.map[pos]} width={w} height={h} />
            </svg>
          </span>
        );
    }
}
*/