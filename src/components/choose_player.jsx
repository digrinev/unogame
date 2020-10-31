import React, { Component } from 'react';
import ScoreModal from './score_modal'
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
 
const SweetAlert = withSwalInstance(swal);

class ChoosePlayer extends Component {
    constructor(props) {
        super(props);
        this.emitPlayer = this.emitPlayer.bind(this)
        this.addScores = this.addScores.bind(this)

        this.state = {
            scores: 0,
            is_win: false,
        }
        
    }

    // Передаем в родительский компонент событие выбора игрока
    emitPlayer(){
        let playerData = {
            'name': this.props.name,
            'id': this.props.id,
            'chosen': true,
        }

        return this.props.setPlayer(playerData)
    }

    // Начислим очки
    addScores(scores){
        this.setState((prevState) => {
         let is_win = false   
         if ((this.state.scores + parseInt(scores)) >= 500){
            is_win = true
        }
            return { 
                scores: this.state.scores + parseInt(scores),
                is_win: is_win,
           };
         })
    }
  
    render() {
        const style = {
            backgroundImage: `url(./avatars/${this.props.avatar + '.png'})`
        }
        
        const chosen_style = {
            backgroundColor: '#87ff68'
        }
        const default_style = {
            
        }

        return (
            <div>
                <div className="row">
                    <div className="col">
                        <div className="player_card" style={(this.props.ingame ? chosen_style: default_style)}>
                            <div className="player_card_avatar" style={style}></div>
                            <div className="player_name">
                                {this.props.name}
                                {/* Начисленные очки */}
                                <div className="alert alert-success player_score" hidden={!this.props.gamestatus}>{this.state.scores}</div>
                            </div>                    
                            {/* Кнопка добавления игрока в игру */}
                            <div className="bottom_player">
                                <button hidden={this.props.ingame} className='btn btn-success form-control' onClick={this.emitPlayer} >ВЫБРАТЬ</button>
                            </div>         
                            <div className="bottom_player">
                                {this.props.gamestatus ? <ScoreModal name={this.props.name} scores_callback={this.addScores} /> : ''}
                            </div>                            

                        </div>
                    </div>
                </div>
                <SweetAlert
                    show={this.state.is_win}
                    title="Ура! Победа!!"
                    text={`${this.props.name}, поздравляем!`}
                    icon='success'
                    onConfirm={() => window.location.reload(false)}
                />
            </div>
        );
    }
}

export default ChoosePlayer;
