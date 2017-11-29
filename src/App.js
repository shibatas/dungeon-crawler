import React, { Component } from 'react';
import Footer from './assets/footer';
import './App.css';
import { config } from './config.js';

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
      map: config.emptyMap,
      wall: config.map[1].wall,
      boss: config.map[1].boss,
      setting: config.level.hard
    };
  }
  render() {
    return (
      <div className="App">
        <Game map={this.generateMap()} setting={this.state.setting} />
      </div>
    );
  }
  generateMap = () => {
    let map = Object.assign({}, config.emptyMap);
    
    //set class for walls
    this.state.wall.forEach((id) => {
      map[id] = 'wall';
    });
    
    //set class for boss
    map[this.state.boss] = 'boss';

    return map;
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      map: this.props.map,
      wall: config.map[1].wall,
      player: {
        position: config.player
      },
      enemy: {
        position: null
      }
    });
  }
  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUpdate() {
    //console.log(this.state);
  }
  render() {
    return (
      <div>
        <Map map={this.generate()} />
        <button onClick={this.generateEnemy}>Begin</button>
      </div>
    );
  }
  handleClick = (e) => {
    let target = e.target.id;
    this.update('wall', target);
  }
  handleKeyDown = (e) => {
    //tip on held down key https://forum.freecodecamp.org/t/dungeon-crawler-feedback-please/43394/11
    let curPos = this.state.player.position.split('x');
    let xPos = parseInt(curPos[0], 10), yPos = parseInt(curPos[1], 10);
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

    if (xPos < config.x && xPos >= 0 && yPos < config.y && yPos >=0) {
      newPos = xPos.toString() + 'x' + yPos.toString();
      if (!this.state.wall.includes(newPos)) {
        this.setState({
          player: {
            position: newPos
          }
        });
      }
    }
  }
  generate = () => {
    console.log('generate board');
    let map = Object.assign({}, this.state.map);
    
    //insert enemy
    if (this.state.enemy.position) {
      let enemy = this.state.enemy.position.slice();
      enemy.forEach((item) => {
        map[item] = 'enemy';
      });
    }
    
    //insert boss
    map[this.st]
    
    //insert player
    map[this.state.player.position] = 'player';
    
    let render = [];
    let style = {
      display: 'inline-block',
      width: config.w,
      height: config.h
    };
    for (let j=0; j<config.y; j++) {
      let row = [];
      for (let i=0; i<config.x; i++) {
        let pos = i+'x'+j;
        row.push(
          <span key={pos} id={pos} style={style} className={map[pos]} onClick={this.handleClick} ></span>
        );
      }
      render.push(
        <div key={'row'+j} id={'row'+j} style={{height: config.h}}>{row}</div>
      );
    }
    return render;
  }
  generateEnemy = () => {
    console.log('generate enemy');
    const enemyCount = this.props.setting.enemy;
    console.log('enemyCount', enemyCount);
    let position = [];
    for (let i=0; i<enemyCount; i++) {
      console.log('loop');
      let minX = parseInt(config.x/enemyCount*(i), 10);
      let maxX = parseInt(config.x/enemyCount*(i+1), 10);
      let minY = 0;
      let maxY = config.y;
      
      let x, y, pos;
      let valid = false;
      while (!valid) {
        x = parseInt((maxX-minX)*Math.random()+minX, 10);
        y = parseInt((maxY-minY)*Math.random()+minY, 10);  
        
        pos = x + 'x' + y;
        if (this.state.map[pos] === 'default') { valid = true; }
      }

      
      position.push(pos);
    }
    
    console.log(enemyCount);
    
    this.setState({ 
      enemy: {
        position: position
      }
    });
  }
  update = (val, target) => {
    console.log('update', target);
    let newClass = val;
    if (this.state.map[target] !== 'default') { newClass = 'default' }
    let update = Object.assign({}, this.state.map);
    update[target] = newClass;
    
    //for development purpose only. output wall array in console.
    let wall = this.state.wall;
    if (newClass === 'wall') { 
      wall.push(target);
    } else {
      wall.splice(wall.indexOf(target), 1);
      console.log(wall.indexOf(target));
    }
    
    console.log(wall);
    
    this.setState({
      map: update,
      wall: wall
    });
  }
}

class Map extends Component {
  render() {
    return (
      <div className="map">{this.props.map}</div>
    );
  }
}

export default Parent;