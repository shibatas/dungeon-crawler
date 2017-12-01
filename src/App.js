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
      gameState: 'paused',
      setting: config.level.hard
    };
  }
  render() {
    return (
      <div className="App">
        <Game gameState={this.state.gameState} setting={this.state.setting} />
        <button onClick={this.start}>Begin</button>
      </div>
    );
  }
  start = () => {
    this.setState({
      gameState: 'run'
    })
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      map: config.initMap,
      wall: config.map[config.defaultLevel].wall,
      player: {
        position: config.player,
        hp: 100,
        exp: 0,
        level: 1,
        weapon: 10
      },
      enemy: {},
      boss: {
        position: config.map[config.defaultLevel].boss,
        hp: 100
      },
      message: 'Click BEGIN to start!'
    });
  }
  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.gameState !== nextProps.gameState && nextProps.gameState === 'run') {
      this.generateEnemy();
    }
  }
  componentWillUpdate() {
    //console.log(this.state);
  }
  render() {
    return (
      <div>
        <Top message={this.state.message} />
        <div className="game">
          <Map map={this.generate()} />
          <Side player={this.state.player} />
        </div>
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
      let target = this.state.map[newPos];
      if (target.match(/^(default|weapon|health)$/)) {
        let newState = Object.assign({}, this.state.player);
        newState.position = newPos;
        this.setState({
          player: newState,
          message: ''
        });
      } else {
        this.fight(newPos);
      }
    }
  }
  start = () => {
    this.generateEnemy();
  }
  fight = (loc) => {
    let message = '';
    let map = Object.assign({}, this.state.map);
    
    let playerStat = Object.assign({}, this.state.player);
    let enemyStat = Object.assign({}, this.state.enemy);
    
    let playerAttack = playerStat.level*playerStat.weapon;
    let enemyAttack = enemyStat[loc].level*this.props.setting.attack;
    
    playerStat.hp -= enemyAttack;
    enemyStat[loc].hp -= playerAttack;
    
    if (playerStat.hp <= 0) {
      alert("Game Over"); 
    } else if (enemyStat[loc].hp <=0) {
      let expUp = enemyStat[loc].level*10;
      playerStat.exp += expUp;
      map[loc] = 'default';
      playerStat.position = loc;
      message = 'Enemy defeated... EXP gained: ' + expUp;
    } 
    
    this.setState({
      map: map,
      player: playerStat,
      enemy: enemyStat,
      message: message
    });
  }
  generate = () => {
    console.log('generate board');
    let map = Object.assign({}, this.state.map);
    //insert player
    map[this.state.player.position] = 'player';
    let render = [];
    for (let j=0; j<config.y; j++) {
      let row = [];
      for (let i=0; i<config.x; i++) {
        let pos = i+'x'+j;
        row.push(
          <span key={pos} id={pos} style={config.style} className={map[pos]} onClick={this.handleClick} ></span>
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
    const enemyCount = this.props.setting.count;
    let position = {};
    let stats = {};
    for (let i=0; i<enemyCount; i++) {
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
        if (this.state.map[pos] === 'default' && pos !== this.state.player.position) { 
          valid = true; 
        }
      }
      position[pos] = 'enemy';
      stats[pos] = {
        level: 1,
        hp: 10
      };
    }

    position[this.state.boss.position] = 'boss';

    let newMap = Object.assign(this.state.map, position);

    this.setState({
      map: newMap,
      enemy: stats
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

class Side extends Component {
  render() {
    return (
      <div className="side" style={{height: config.mapHeight}} >
        <h3>HP</h3>
        <p>{this.props.player.hp}</p>
        <h3>Exp</h3>
        <p>{this.props.player.exp}</p>
        <h3>Weapon</h3>
        <p>{this.props.player.weapon}</p>
      </div>
    );
  }
}

class Top extends Component {
  render() {
    return (
      <div className="top">
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default Parent;
