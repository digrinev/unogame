import React, { Component } from 'react';
import './App.css';
import ReverseState from './components/reverse';
import ChoosePlayer from './components/choose_player'

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
</style>

class App extends Component {

  constructor(props) {
    super(props);

    this.addPlayer = this.addPlayer.bind(this)
    this.startGame = this.startGame.bind(this)

    this.state = {
       players: [
        {
          id: 0,
          name: 'Аня',
          avatar: 'anya',
          key: Math.random(),
          ingame: false,
        },
        {
          id: 1,
          name: 'Маша',
          avatar: 'masha',
          key: Math.random(),
          ingame: false,
        },
        {
          id: 2,
          name: 'Папа',
          avatar: 'papa',
          key: Math.random(),
          ingame: false,
        },
        {
          id: 3,
          name: 'Мама',
          avatar: 'mama',
          key: Math.random(),
          ingame: false,
        },
      ],
      chosen_count: 0,
      game_started: 0,
    }
    
  }

  addPlayer(item){

    // Изменяем стейт наших игроков, который прилетел от дочернего компонента
    const elementsIndex = this.state.players.findIndex(element => element.id == item.id )
    let newPlayers = [...this.state.players]
    newPlayers[elementsIndex] = {...newPlayers[elementsIndex], ingame: !newPlayers[elementsIndex].ingame}

    let count_chosen = [].concat(...newPlayers) /* flatten the array */
                              .filter(item => item.ingame) /* return only enabled: true */
                              .length /* get the count */

    this.setState((prevState) => {
       return { 
        players: newPlayers,
        chosen_count: count_chosen,
      };
    });
  }

  startGame(){
      let count_chosen = [].concat(...this.state.players) /* flatten the array */
      .filter(item => item.ingame) /* return only enabled: true */

      this.setState((prevState) => {
        return { 
          game_started: !this.state.game_started,
          players: count_chosen,
      };
    });      
  }
  
  render() {
      const style = { marginTop: "15rem" };
    
      const listPlayers = this.state.players.map((player, index) =>
              <div className="col mb-5" key={player.key}>
                <ChoosePlayer gamestatus={this.state.game_started} ingame={player.ingame} setPlayer={this.addPlayer} id={player.id} key={player.key} name={player.name} avatar={player.avatar}/>
              </div>      
      );

      const chosenPlayersList = this.state.players.map(player => 
           player.ingame && (<li className="list-group-item">{player.name}</li>)
      );

      return (
          <div className="App">
            <div className="container">
              <div className="row text-center">
                {listPlayers}   
              </div>        

            {/* <div className="row" hidden={this.state.chosen_count == 0}>
              <div className="offset-3 col-2 text-center">
              <div class="card text-black bg-info">
                  <div class="card-header">
                    Выбранные игроки
                  </div>
                  <ul className="list-group list-group-flush">
                    {chosenPlayersList}
                  </ul>
                </div>
              </div>     
            </div> */}
          
              <div className="row" hidden={this.state.game_started}>
                <div className="col">
                  <div className="alert alert-warning choose_players">Выберите игроков для начала игры</div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col">
                  {this.state.game_started && <ReverseState />}
                </div>
              </div>
            </div>

            {/* Кнопка старт игры */}
            <div className="start_button" hidden={this.state.chosen_count < 2 || this.state.game_started}>
              <button className='btn btn-primary btn-lg' onClick={this.startGame}>НАЧАТЬ ИГРУ</button>
            </div>
          </div>
    
    
      );

  }
}

export default App;