import React, { Component } from "react";

//this is the shit i'm making
class GameControls extends Component {
  constructor() {
    super();
  }

  render(props) {
    console.log(this.props);
    return (
      <article>
        <div>
          <button id="startButton" onClick={this.props.handleStart}>
            Start
          </button>
          <button id="stopButton" onClick={this.props.handleStop}>
            Stop
          </button>

          <div id="maxScore">
            <h3>Max Score to Win:</h3>{" "}
            <input
              type="number"
              name="maxScore"
              className="controlsInput"
              placeholder="Enter Number"
              defaultValue={this.props.maxScore}
              onChange={this.props.handleChange}
            />
          </div>

          <div>
            <h3>Initial Ball Velocity: </h3>
            <select
              defaultValue={this.props.initialVelocity}
              name="initialVelocity"
              onChange={this.props.handleSelect}
            >
              <option value="1">1 - beginner</option>
              <option value="2">2 - advanced</option>
              <option value="3">3 - running riot</option>
            </select>
          </div>

          <div>
            <h3 id="paddleColors">Paddle Colors</h3>
            <div className="selectColorDiv">
              <p>Player 1:</p>
              <select
                value={this.props.p1PaddleColor}
                name="p1PaddleColor"
                onChange={this.props.handleSelect}
              >
                <option value="red">red</option>
                <option value="yellow">yellow</option>
                <option value="blue">blue</option>
                <option value="rebeccapurple">purple</option>
                <option value="green">lightgreen</option>
                <option value="teal">teal</option>
                <option value="orange">orange</option>
                <option value="brown">brown</option>
                <option value="gray">gray</option>
              </select>
            </div>
            <div className="selectColorDiv">
              <p>Player 2:</p>
              <select
                value={this.props.p2PaddleColor}
                name="p2PaddleColor"
                onChange={this.props.handleSelect}
              >
                <option value="red">red</option>
                <option value="yellow">yellow</option>
                <option value="blue">blue</option>
                <option value="rebeccapurple">purple</option>
                <option value="green">lightgreen</option>
                <option value="teal">teal</option>
                <option value="orange">orange</option>
                <option value="brown">brown</option>
                <option value="gray">gray</option>
              </select>
            </div>
          </div>

          <div>
            <h3>Game Ball Color:</h3>
            <select
              value={this.props.ballColor}
              name="ballColor"
              onChange={this.props.handleSelect}
            >
              <option value="red">red</option>
              <option value="yellow">yellow</option>
              <option value="blue">blue</option>
              <option value="rebeccapurple">purple</option>
              <option value="green">lightgreen</option>
              <option value="teal">teal</option>
              <option value="orange">orange</option>
              <option value="brown">brown</option>
              <option value="gray">gray</option>
            </select>
          </div>
        </div>
      </article>
    );
  }
}

export default GameControls;
