import React, { Component } from "react";


class PlayerBottom extends Component {

    constructor(props){
        super(props)

        // Наш стейт
        this.state = {
            cw: 1
        }
    }

    change_reverse(){
        this.setState({
            cw: !this.state.cw
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <button type="submit" className='btn btn-success' onClick={this.increment}>+5</button>
                </div>
                <div className="col-md-3">
                    <button type="submit" className='btn btn-success' onClick={this.decrement}>-5</button>
                </div>
                <div className="col-md-4">
                <input className='form-control' ref={(a) => this._inputElement = a}></input>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary" onClick={this.addValue}>+</button>
                </div>                        
            </div>
        );
      }
}

export default PlayerBottom