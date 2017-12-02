import React, { Component } from 'react';
import Footer from './assets/footer';
import './App.css';
import { config } from './config.js';

const hpUp = 20;
const weaponUp = 1;

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
        weapon: 1
      },
      stats: {},
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
      this.start();
    }
  }
  componentWillUpdate() {
    //console.log(this.state.stats);
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
      default: return;
    }

    let oldState = Object.assign({}, this.state);
    let newStatePlayer = oldState.player;
    let newStateMap = oldState.map;
    let newStateStats = oldState.stats;
    if (xPos < config.x && xPos >= 0 && yPos < config.y && yPos >=0) {
      newPos = xPos.toString() + 'x' + yPos.toString();
      switch (this.state.map[newPos]) {
        case 'wall':
          return;
        case 'enemy':
          console.log('fight', this.state.stats[newPos]);
          this.fight(newPos);
          return;
        case 'health':
          console.log('health', oldState.stats[newPos].hpUp);
          let upgradeHp = oldState.stats[newPos].hpUp;
          newStatePlayer.position = newPos;
          newStatePlayer.hp = oldState.player.hp + upgradeHp;
          newStateMap[newPos] = 'default';
          newStateStats[newPos] = {};
          this.setState({
            map: newStateMap,
            player: newStatePlayer,
            stats: newStateStats,
            message: 'HP +' + upgradeHp
          })
          break;
        case 'weapon':
          console.log('weapon', oldState.stats[newPos].weaponUp);
          let upgradeW = oldState.stats[newPos].weaponUp;
          newStatePlayer.position = newPos;
          newStatePlayer.weapon = oldState.player.weapon + upgradeW;
          newStateMap[newPos] = 'default';
          newStateStats[newPos] = {};
          this.setState({
            map: newStateMap,
            player: newStatePlayer,
            stats: newStateStats,            
            message: 'Weapon +' + upgradeW
          })
          break;
        default: 
          newStatePlayer.position = newPos;
          this.setState({
            player: newStatePlayer
          })
      }
    }
  }
  start = () => {
    let oldState = Object.assign({}, this.state)
    let newState = this.generateContents(oldState);

    newState.map[this.state.boss.position] = 'boss';

    this.setState(newState);
  }
  fight = (loc) => {
    let message = '';
    let map = Object.assign({}, this.state.map);

    let playerStat = Object.assign({}, this.state.player);
    let enemyStat = Object.assign({}, this.state.stats);

    console.log(enemyStat);

    let playerAttack = 10*playerStat.level*(1+playerStat.weapon/10);
    let playerDefense = 1-(playerStat.level/10 + playerStat.weapon/20);
    let enemyAttack = Math.round(enemyStat[loc].level*this.props.setting.attack*playerDefense);

    //randomize
    playerAttack = this.randomize(playerAttack, 0.1);
    enemyAttack = this.randomize(enemyAttack, 0.1);
    console.log(playerAttack,enemyAttack);
    playerStat.hp -= enemyAttack;
    enemyStat[loc].hp -= playerAttack;

    if (playerStat.hp <= 0) {
      alert("Game Over");
    } else if (enemyStat[loc].hp <=0) {
      let expUp = enemyStat[loc].level*20;
      playerStat.exp += expUp;
      map[loc] = 'default';
      playerStat.position = loc;
      if (playerStat.exp >= 100) {
        playerStat.exp = 0;
        playerStat.level++;
        message = 'Enemy defeated... Level Up!';
      } else {
        message = 'Enemy defeated... EXP gained: ' + expUp;
      }
    }

    this.setState({
      map: map,
      player: playerStat,
      stats: enemyStat,
      message: message
    });
  }
  randomize = (num, range) => {
    let max = num + num*range;
    let min = num - num*range;
    return Math.round(Math.random()*(max-min)+min);
  }
  generate = () => {
    console.log('generate map');
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
  generateContents = (oldState) => {
    console.log('generate contents');
    let types = ['enemy', 'health', 'weapon'];
    let counts = [this.props.setting.count, 10, 5];

    let newMap = oldState.map;
    let stats = {};

    types.forEach((type, index) => {
      let updates = {};
      let count = counts[index];
      for (let i=0; i<count; i++) {
        let minX = parseInt(config.x/count*(i), 10);
        let maxX = parseInt(config.x/count*(i+1), 10);
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
        updates[pos] = type;

        switch (type) {
          case 'enemy':
            stats[pos] = {
              level: 1,
              hp: 10
            };
            break;
          case 'health':
            stats[pos] = { hpUp: hpUp }
            break;
          case 'weapon':
            stats[pos] = { weaponUp: weaponUp }
            break;
          default: 
        }
        if (type === 'enemy') {
          
        }
      }
      newMap = Object.assign(newMap, updates);
    });

    let output = {
      map: newMap,
      stats: stats
    }

    return output;
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
        <h3>Level</h3>
        <p>{this.props.player.level}</p>
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
