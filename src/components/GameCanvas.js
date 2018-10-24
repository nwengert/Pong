import React, { Component } from "react";
import axios from "axios";

class GameCanvas extends Component {
  constructor(props) {
    super(props);
    this.deadBalls = [];
    this.state = {
      gameBall: {
        velocityX: "",
        velocityY: "",
        color: "",
        width: "",
        height: ""
      },
      paddle1: {
        velocityY: "",
        color: "",
        width: "",
        height: ""
      },
      paddle2: {
        velocityY: "",
        color: "",
        width: "",
        height: ""
      }
    };
  }
  componentDidMount = () => {
    this.setState({
      p1PaddleColor: this.props.p1PaddleColor,
      p2PaddleColor: this.props.p2PaddleColor,
      maxScore: this.props.maxScore,
      initialVelocity: this.props.initialVelocity,
      ballColor: this.props.ballColor,
      start: this.props.start
    });
    this._initializeGameCanvas();
  };

  pollingTimer = waitTime => {
    this.timer = setTimeout(() => {
      axios
        .get("https://wwwforms.suralink.com/pong.php?accessToken=pingPONG")
        .then(res => {
          console.log(res);
          //store the response's results
          this.pollingTimer(res.data.gameData.newDelay);
          let gameBall = res.data.gameData.ball;
          let paddle1 = res.data.gameData.paddle1;
          let paddle2 = res.data.gameData.paddle2;
          //BALL
          if (gameBall.velocityX) {
            this.gameBall.velocityX = gameBall.velocityX;
          }
          if (gameBall.velocityY) {
            this.gameBall.velocityY = gameBall.velocityY;
          }
          if (gameBall.color) {
            this.gameBall.color = `#${gameBall.color.hex}`;
          }
          if (gameBall.width) {
            this.gameBall.width = gameBall.width;
          }
          if (gameBall.height) {
            this.gameBall.height = gameBall.height;
          }
          //p1PADDLE
          if (paddle1.velocityY) {
            this.paddle1.velocityY = paddle1.velocityY;
          }
          if (paddle1.color) {
            this.paddle1.color = `#${paddle1.color.hex}`;
          }
          if (paddle1.width) {
            this.paddle1.width = paddle1.width;
          }
          if (paddle1.height) {
            this.paddle1.height = paddle1.height;
          }
          //p2PADDLE
          if (paddle2.velocityY) {
            this.player2.velocityY = paddle2.velocityY;
          }
          if (paddle2.color) {
            this.player2.color = `#${paddle2.color.hex}`;
          }
          if (paddle2.width) {
            this.player2.width = paddle2.width;
          }
          if (paddle2.height) {
            this.player2.height = paddle2.height;
          }
        });
    }, waitTime || 1234);
  };

  _initializeGameCanvas = () => {
    // initialize canvas element and bind it to our React class
    this.canvas = this.refs.pong_canvas;
    this.ctx = this.canvas.getContext("2d");

    // declare initial variables
    this.p1Score = 0;
    this.p2Score = 0;
    this.keys = {};

    // add keyboard input listeners to handle user interactions
    window.addEventListener("keydown", e => {
      this.keys[e.keyCode] = 1;
      if (e.target.nodeName !== "INPUT") e.preventDefault();
    });
    window.addEventListener("keyup", e => delete this.keys[e.keyCode]);

    // instantiate our game elements
    this.player1 = new this.GameClasses.Box({
      x: 10,
      y: 200,
      width: this.state.paddle1.width || 15,
      height: this.state.paddle1.height || 80,
      //this is what I have changed...
      color: this.props.p1PaddleColor,
      velocityY: 2
    });
    this.player2 = new this.GameClasses.Box({
      x: 725,
      y: 200,
      width: 15,
      height: 80,
      // color: "#FFF",
      color: this.props.p2PaddleColor,
      velocityY: 2
    });
    this.boardDivider = new this.GameClasses.Box({
      x: this.canvas.width / 2 - 2.5,
      y: -1,
      width: 5,
      height: this.canvas.height + 1,
      color: "#FFF"
    });
    this.gameBall = new this.GameClasses.Box({
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      width: 15,
      height: 15,
      color: `#${this.state.ballColor}` || this.props.ballColor,

      //Here's INITIAL Velocity
      velocityX: Number(this.props.initialVelocity),
      velocityY: Number(this.props.initialVelocity)
    });

    // start render loop
    this._renderLoop();
  };

  // recursively process game state and redraw canvas
  _renderLoop = props => {
    this._ballCollisionY();
    this._userInput(this.player1);
    this._userInput(this.player2);
    this.frameId = window.requestAnimationFrame(this._renderLoop);
  };

  // watch ball movement in Y dimension and handle top/bottom boundary collisions, then call _ballCollisionX
  _ballCollisionY = () => {
    if (
      this.gameBall.y + this.gameBall.velocityY <= 0 ||
      this.gameBall.y + this.gameBall.velocityY + this.gameBall.height >=
        this.canvas.height
    ) {
      this.gameBall.velocityY = this.gameBall.velocityY * -1;
      this.gameBall.x += this.gameBall.velocityX;
      this.gameBall.y += this.gameBall.velocityY;
    } else {
      this.gameBall.x += this.gameBall.velocityX;
      this.gameBall.y += this.gameBall.velocityY;
    }
    this._ballCollisionX();
  };

  // watch ball movement in X dimension and handle paddle collisions and score setting/ball resetting, then call _drawRender
  _ballCollisionX = props => {
    if (
      (this.gameBall.x + this.gameBall.velocityX <=
        this.player1.x + this.player1.width &&
        this.gameBall.y + this.gameBall.velocityY > this.player1.y &&
        this.gameBall.y + this.gameBall.velocityY <=
          this.player1.y + this.player1.height) ||
      (this.gameBall.x + this.gameBall.width + this.gameBall.velocityX >=
        this.player2.x &&
        this.gameBall.y + this.gameBall.velocityY > this.player2.y &&
        this.gameBall.y + this.gameBall.velocityY <=
          this.player2.y + this.player2.height)
    ) {
      this.gameBall.velocityX = this.gameBall.velocityX * -1;
    } else if (
      this.gameBall.x + this.gameBall.velocityX <
      this.player1.x - 15
    ) {
      this.p2Score += 1;

      // stop game once p2 score exceeds maxScore -NW
      if (this.p2Score === this.props.maxScore) {
        this.props.handleStop();
      }
      this.deadBalls.push(this.gameBall);
      this.gameBall = new this.GameClasses.Box({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        width: 15,
        height: 15,
        color: this.props.ballColor,
        //going RIGHT
        velocityX: 1,
        velocityY: 1
      });
    } else if (
      this.gameBall.x + this.gameBall.velocityX >
      this.player2.x + this.player2.width
    ) {
      this.p1Score += 1;
      // stop game once p1 score exceeds maxScore
      if (this.p1Score === Number(this.props.maxScore)) {
        //this doesn't work if it's a string
        console.log(`maxScore in state is ${typeof this.props.maxScore}`);
        this.props.handleStop();
      }
      this.deadBalls.push(this.gameBall);
      this.gameBall = new this.GameClasses.Box({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        width: 15,
        height: 15,
        color: this.props.ballColor,
        //going LEFT
        velocityX: -1,
        velocityY: 1
      });
    } else {
      this.gameBall.x += this.gameBall.velocityX;
      this.gameBall.y += this.gameBall.velocityY;
    }
    this._drawRender();
  };

  // clear canvas and redraw according to new game state
  _drawRender = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._displayScore1();
    this._displayScore2();
    this._drawBox(this.player1);
    this._drawBox(this.player2);
    this._drawBox(this.boardDivider);
    this._drawBox(this.gameBall);
  };

  // take in game object and draw to canvas
  _drawBox = box => {
    this.ctx.fillStyle = box.color;
    this.ctx.fillRect(box.x, box.y, box.width, box.height);
  };

  // render player 1 score
  _displayScore1 = () => {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.fillText(
      this.p1Score,
      this.canvas.width / 2 - (this.p1Score > 9 ? 55 : 45),
      30
    );
  };

  // render player 2 score
  _displayScore2 = () => {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.fillText(this.p2Score, this.canvas.width / 2 + 33, 30);
  };
  //track user input
  _userInput = () => {
    if (87 in this.keys) {
      if (this.player1.y - this.player1.velocityY > 0)
        this.player1.y -= this.player1.velocityY;
    } else if (83 in this.keys) {
      if (
        this.player1.y + this.player1.height + this.player1.velocityY <
        this.canvas.height
      )
        this.player1.y += this.player1.velocityY;
    }

    if (38 in this.keys) {
      if (this.player2.y - this.player2.velocityY > 0)
        this.player2.y -= this.player2.velocityY;
    } else if (40 in this.keys) {
      if (
        this.player2.y + this.player2.height + this.player2.velocityY <
        this.canvas.height
      )
        this.player2.y += this.player2.velocityY;
    }
  };

  GameClasses = (() => {
    return {
      Box: function Box(opts) {
        let { x, y, width, height, color, velocityX, velocityY } = opts;
        this.x = x || 10;
        this.y = y || 10;
        this.width = width || 40;
        this.height = height || 50;
        this.color = color || "#FFF";
        this.velocityX = velocityX || 2;
        this.velocityY = velocityY || 2;
      }
    };
  })();
  render() {
    return (
      <canvas
        id="pong_canvas"
        ref="pong_canvas"
        width="750"
        height="500"
        style={{ background: "#12260e", border: "4px solid #FFF" }}
      />
    );
  }
}

export default GameCanvas;
