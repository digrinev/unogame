import React, { Component } from "react";

import TodoItems from './todoitems'
import PlayerBottom from './player_bottom'

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.addItem = this.addItem.bind(this)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.addValue = this.addValue.bind(this)
        this.closePlayer = this.closePlayer.bind(this)

        this.state = {
            items: [],
            count: 0,
            _inputElement: 0,
            show: true,
            
          };
    }

    addItem(e){
        e.preventDefault()

        var newItem = {
            text: this._inputElement.value,
            key: Date.now()
        };

        this.setState((prevState) => {
            return { 
              items: prevState.items.concat(newItem) 
            };
        });

        this._inputElement.value = ''
        console.log(this.state.items);
    }

    addValue(e){
        e.preventDefault()

        let score = this._inputElement.value

        if (isNaN(parseInt(score))) {
            score = 0
        }

        this.setState({
            count: this.state.count + parseInt(score)
        });
        this._inputElement.value = ''
    }

    increment(e){
        e.preventDefault()
        this.setState({
            count: this.state.count + 5
        });
    }

    decrement(e){
        e.preventDefault()

        this.setState({
            count: this.state.count - 5
        });
    }

    closePlayer(){
        this.setState({
            show: !this.state.show
        })
    }

    render() {
      return this.state.show && (
            <div className="player">
                    <div className="row">
                        <div className="col-5">
                            <h1>{this.props.name}</h1>
                        </div>
                        <div className="col-7 text-right">
                            <button className="btn btn-secondary" onClick={this.closePlayer}>X</button>
                        </div>                        
                    </div>                  
                    <div className="alert alert-success"><h2>{this.state.count}</h2></div>
                    <PlayerBottom/>

            </div>
     
      );
    }
  }
   
  export default TodoList;