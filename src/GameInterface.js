import React, { Component } from "react";
import GameCanvas from "./components/GameCanvas";
import GameControls from "./components/GameControls";

//ths is what I"m adding from WesBox's Context video

class GameInterface extends Component {
  constructor() {
    super();
    this.state = {
      p1PaddleColor: "",
      p2PaddleColor: "",
      maxScore: "",
      initialVelocity: "",
      ballColor: "",
      start: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }
  handleSelect(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleStart(e) {
    this.setState({ start: true });
  }
  handleStop() {
    this.setState({ start: false });
  }
  render() {
    if (this.state.start === true) {
      return (
        <main
          style={{
            width: "100vw",
            height: "100vh",
            background: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div className="wrapperDiv">
              <GameControls
                {...this.state}
                handlePaddle1={this.handlePaddle1}
                handleSelect={this.handleSelect}
                handleChange={this.handleChange}
                handleStart={this.handleStart}
                handleStop={this.handleStop}
              />
              <GameCanvas {...this.state} handleStop={this.handleStop} />
            </div>
          </section>
        </main>
      );
    } else {
      return (
        <main
          style={{
            width: "100vw",
            height: "100vh",
            background: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div className="wrapperDiv">
              <GameControls
                {...this.state}
                handlePaddle1={this.handlePaddle1}
                handleSelect={this.handleSelect}
                handleChange={this.handleChange}
                handleStart={this.handleStart}
                handleStop={this.handleStop}
              />
            </div>
          </section>
        </main>
      );
    }
  }
}

export default GameInterface;
