import React, { Component } from "react";

class ReverseState extends Component {

    constructor(props){
        super(props)

        this.change_reverse = this.change_reverse.bind(this)

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
            <div className={(this.state.cw ? "reverse-body-cw" : "reverse-body-ccw")} onClick={this.change_reverse}>
            </div>
        );
      }
}

export default ReverseState