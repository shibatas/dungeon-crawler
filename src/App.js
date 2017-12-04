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
      gameRunning: false,
      setting: config.level.easy
    };
  }
  render() {
    return (
      <div className="App">
        <Game gameRunning={this.state.gameRunning} setting={this.state.setting} />
        <button id='reset' onClick={this.handleClick}>Reset</button>
        <button id='start' onClick={this.handleClick}>Begin</button>
        <button id='difficulty' disabled={this.state.gameRunning} onClick={this.handleClick}>{this.state.setting.name}</button>
      </div>
    );
  }
  handleClick = (e) => {
    let newState = '';
    switch (e.target.id) {
      case 'start':
        newState = true;
        break;
      case 'reset':
        newState = false;
        break;
      case 'difficulty':
        if (this.state.gameRunning === false) {
          this.difficultyToggle();
          newState = false;
        }
        break;
      default: return;
    }
    this.setState({
      gameRunning: newState
    })
  }
  difficultyToggle = () => {
    let newState = {};
    switch (this.state.setting.name) {
      case 'Easy':
        newState = config.level.medium;
        break;
      case 'Medium':
        newState = config.level.hard;
        break;
      case 'Hard':
        newState = config.level.easy;
        break;
      default:
    }
    this.setState({
      setting: newState
    });
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        position: config.initState.player.position,
        stat: Object.assign({}, config.initState.player.stat)
      },
      message: config.initState.message,
      map: Object.assign({}, config.initState.map),
      mapLevel: config.defaultLevel,
      stats: Object.assign({}, config.initState.stats),
      wall: Object.assign({}, config.initState.wall)
    };
  }
  componentWillMount() {
    console.log(this.state);
    document.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.gameRunning !== nextProps.gameRunning) {
      if (nextProps.gameRunning === true) {
        this.reset();
        this.start();
      } else if (nextProps.gameRunning === false) {
        this.reset();
      }
    }
  }
  componentWillUpdate() {
    //console.log('will update', config.initState.player.stat);
  }
  render() {
    return (
      <div>
        <Top message={this.state.message} />
        <div className="game">
          <Map map={this.generate()} />
          <Side player={this.state.player.stat} />
        </div>
      </div>
    );
  }
  handleClick = (e) => {
    // below for clicking to add wall in dev mode
    //let target = e.target.id;
    //this.update('wall', target);
  }
  handleKeyDown = (e) => {
    if (this.props.gameRunning !== true) {return;}
    const curPos = this.state.player.position.split('x');
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
    let newStatePlayerPosition = Object.assign({}, this.state.player.position);
    let newStatePlayerStat = Object.assign({}, this.state.player.stat);
    let newStateMap = Object.assign({}, this.state.map);
    let newStateStats = Object.assign({}, this.state.stats);

    if (xPos < config.x && xPos >= 0 && yPos < config.y && yPos >=0) {
      newPos = xPos.toString() + 'x' + yPos.toString();
      switch (this.state.map[newPos]) {
        case 'wall':
          return;
          break;
        case 'enemy':
        case 'boss':
          console.log('fight', this.state.stats[newPos]);
          this.fight(newPos);
          return;
          break;
        case 'health':
          console.log('health', this.state.stats[newPos].hpUp);
          const upgradeHp = this.state.stats[newPos].hpUp;
          newStatePlayerPosition = newPos;
          newStatePlayerStat.hp = this.state.player.stat.hp + upgradeHp;
          newStateMap[newPos] = 'default';
          newStateStats[newPos] = {};
          this.setState({
            map: newStateMap,
            player: {
              position: newStatePlayerPosition,
              stat: newStatePlayerStat
            },
            stats: newStateStats,
            message: 'HP +' + upgradeHp
          })
          break;
        case 'weapon':
          console.log('weapon', this.state.stats[newPos].weaponUp);
          let upgradeW = this.state.stats[newPos].weaponUp;
          newStatePlayerPosition = newPos;
          newStatePlayerStat.weapon = this.state.player.stat.weapon + upgradeW;
          newStateMap[newPos] = 'default';
          newStateStats[newPos] = {};
          this.setState({
            map: newStateMap,
            player: {
              position: newStatePlayerPosition,
              stat: newStatePlayerStat
            },
            stats: newStateStats,            
            message: 'Weapon +' + upgradeW
          })
          break;
        default: 
          newStatePlayerPosition = newPos;               
          this.setState({
            player: {
              position: newStatePlayerPosition,
              stat: newStatePlayerStat
            },
            message: ''
          })
      }
    }
  }
  start = () => {
    let oldState = Object.assign({}, this.state)
    let newState = this.generateContents(oldState);
    newState.message = 'Move with your arrow keys.';
    console.log(this.props.setting.name);
    this.setState(newState);
  }
  reset = () => {
    console.log('reset');
    const newState = Object.assign({}, config.initState);
    this.setState(newState);
  }
  fight = (loc) => {
    let message = '';
    let map = Object.assign({}, this.state.map);

    let playerPosition = this.state.player.position;
    let playerStat = Object.assign({}, this.state.player.stat);
    let enemyStat = Object.assign({}, this.state.stats);

    let playerAttack = 10*playerStat.level*(1+playerStat.weapon/10);
    let playerDefense = 1-(playerStat.level/10 + playerStat.weapon/20);
    let enemyAttack = Math.round(enemyStat[loc].level*this.props.setting.attack*playerDefense);

    // randomize
    playerAttack = this.randomize(playerAttack, 0.3);
    enemyAttack = this.randomize(enemyAttack, 0.3);

    playerStat.hp -= enemyAttack;
    enemyStat[loc].hp -= playerAttack;

    if (playerStat.hp <= 0) {
      alert("Game Over");
      this.reset();
      return;
    } else if (enemyStat[loc].hp <=0) {
      let expUp = enemyStat[loc].level*20;
      playerStat.exp += expUp;
      if (map[loc] === 'boss') {
        alert('Boss defeated!');
        this.reset();
        return;
      } else if (playerStat.exp >= 100) {
        playerStat.exp = 0;
        playerStat.level++;
        message = 'Enemy defeated... Level Up!';
      } else {
        message = 'Enemy defeated... EXP gained: ' + expUp;
      }
      map[loc] = 'default';
      playerPosition = loc;
    } else {
      message = 'Enemy HP remaining: ' + enemyStat[loc].hp;
    }
    this.setState({
      map: map,
      player: {
        position: playerPosition,
        stat: playerStat
      },
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
    let map = Object.assign({}, this.state.map);
    //insert player
    map[this.state.player.position] = 'player';
    const playerCoordinate = this.state.player.position.split('x');
    const range = 8; // number of blocks in view, to each direction
    const rangeX = [parseInt(playerCoordinate[0],10)-range, parseInt(playerCoordinate[0],10)+range+1];
    const rangeY = [parseInt(playerCoordinate[1],10)-range, parseInt(playerCoordinate[1],10)+range+1];

    let render = [];
    for (let j=rangeY[0]; j<rangeY[1]; j++) {
      let row = [];
      for (let i=rangeX[0]; i<rangeX[1]; i++) {
        const pos = i+'x'+j;
        let emoji = '';
        switch (map[pos]) {
          case 'player':
            if (this.state.player.stat.hp > 70) {
              emoji = <span className="happy" role="img" aria-label="player">&#128515;</span>;
            } else if (this.state.player.stat.hp > 30) {
              emoji = <span className="ok" role="img" aria-label="player">&#128528;</span>;
            } else {
              emoji = <span className="sad" role="img" aria-label="player">&#128553;</span>;
            }
            
            break;
          case 'enemy':
            emoji = <span role="img" aria-label="enemy">&#128127;</span>;
            break;
          case 'boss':
            emoji = <span role="img" aria-label="enemy">&#128121;</span>;
            break;
          case 'weapon':
            emoji = <span role="img" aria-label="weapon">&#9876;</span>;
            break;
          case 'health':
            emoji = <span role="img" aria-label="health">&#10010;</span>;
            break;
          default: break;
        } 
        let className = map[pos];
        let distance = Math.round(Math.pow(Math.pow(i-playerCoordinate[0],2)+Math.pow(j-playerCoordinate[1],2),0.5));
        if (distance > 7) {
          className = 'shadow';
          emoji = '';
        }
        row.push(
          <span key={pos} id={pos} style={config.style} className={className} onClick={this.handleClick} >{emoji}</span>
        );
      }
      render.push(
        <div key={'row'+j} id={'row'+j} style={{height: config.h}}>{row}</div>
      );
    }
    return render;
  }
  generateContents = (oldState) => {
    let types = ['enemy', 'health', 'weapon'];
    let counts = [this.props.setting.count, 10, 5];

    let newMap = Object.assign({}, oldState.map);
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

    newMap[config.map[this.state.mapLevel].boss] = 'boss';
    stats[config.map[this.state.mapLevel].boss] = {
      level: 3,
      hp: 100
    }
    console.log(stats);

    let output = {
      map: newMap,
      stats: stats
    }

    return output;
  }
  update = (val, target) => {
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
  constructor(props) {
    super(props);
    this.state = {
      className: 'side'
    }
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.player) !== JSON.stringify(nextProps.player)) { 
      this.flash(); 
    }
  }
  render() {
    return (
      <div className={this.state.className} style={{height: config.mapHeight}} >
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
  flash = () => {
    this.setState({
      className: 'side flash'
    });
    setTimeout(() => { 
      this.setState({
        className: 'side'
      }); 
    }, 500);
  }
}

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: 'top',
      message: this.props.message
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('top props', this.props.message, nextProps.message);
    if (nextProps.message) {
      if (!this.props.message) {  
        this.newMessage(nextProps.message);
      } else if (nextProps.message !== this.props.message) {
        this.newMessage(nextProps.message);
      }
    }
  }
  render() {
    return (
      <div className={this.state.className}>
        <p>{this.state.message}</p>
      </div>
    );
  }
  newMessage = (message) => {
    this.setState({
      className: 'top flash',
      message: message
    });
    setTimeout(() => { 
      this.setState({
        className: 'top'
      }); 
    }, 500);
  }
}

export default Parent;
