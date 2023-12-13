import "./App.css";
import React, { Component } from "react";
import ImageDisplay from "./components/ImageDisplay";

class App extends Component {
  constructor(props) {
    super(props);

    const best = localStorage.getItem("best");

    this.state = {
      score: 0,
      highScore: best ? best : 0,
      numbers: [
        {
          image:
            "https://content.sportslogos.net/logos/7/177/thumbs/kwth8f1cfa2sch5xhjjfaof90.gif",
          prevShown: false,
        },
        {
          image:
            "https://content.sportslogos.net/logos/7/149/thumbs/n0fd1z6xmhigb0eej3323ebwq.gif",
          prevShown: false,
        },
        {
          image:
            "https://content.sportslogos.net/logos/7/154/thumbs/15420492021.gif",
          prevShown: false,
        },
        {
          image:
            "https://content.sportslogos.net/logos/7/170/thumbs/17013982017.gif",
          prevShown: false,
        },
        {
          image: "https://content.sportslogos.net/logos/7/162/thumbs/857.gif",
          prevShown: false,
        },
        {
          image: "https://content.sportslogos.net/logos/7/158/thumbs/593.gif",
          prevShown: false,
        },
        {
          image:
            "https://content.sportslogos.net/logos/7/6446/thumbs/644616602020.gif",
          prevShown: false,
        },
        {
          image:
            "https://content.sportslogos.net/logos/7/150/thumbs/15073062018.gif",
          prevShown: false,
        },
        {
          image:
            " https://content.sportslogos.net/logos/7/151/thumbs/y71myf8mlwlk8lbgagh3fd5e0.gif",
          prevShown: false,
        },
        {
          image: "https://content.sportslogos.net/logos/7/166/thumbs/919.gif",
          prevShown: false,
        },
      ],
    };
  }

  testSc = (item, answer) => {
    let tempArray = this.generateRandomNumber();

    if (item.prevShown === answer) {
      let newScore = this.state.score + 1;

      if (newScore === 10) {
        localStorage.setItem("best", newScore);
        this.setState({
          score: 0,
          highScore: newScore,
          numbers: tempArray,
        });
      } else {
        tempArray.forEach((num) => {
          if (num.image === item.image) {
            num.prevShown = true;
          }
        });
        const newBest =
          this.state.highScore > newScore ? this.state.highScore : newScore;

        localStorage.setItem("best", newBest);

        this.setState({
          score: newScore,
          highScore: newBest,
          numbers: tempArray,
        });
      }
    } else {
      tempArray.forEach((item) => {
        item.prevShown = false;
      });
      this.setState({
        score: 0,
        highScore:
          this.state.highScore > this.state.score
            ? this.state.highScore
            : this.state.score,
        numbers: tempArray,
      });
    }
  };

  generateRandomNumber = () => {
    let array = this.state.numbers;
    let index = this.state.numbers.length,
      temporaryIndex,
      randomIndex;

    while (0 !== index) {
      randomIndex = Math.floor(Math.random() * index);
      index -= 1;

      temporaryIndex = array[index];
      array[index] = array[randomIndex];
      array[randomIndex] = temporaryIndex;
    }

    return array;
  };

  componentDidMount() {
    let array = this.generateRandomNumber();
    this.setState({ numbers: array });
  }

  render() {
    const randomIndex = Math.floor(Math.random() * this.state.numbers.length);
    const selectedNum = this.state.numbers[randomIndex];

    return (
      <main className="App">
        <header className="header">
          <h1>NFL Logo React Memory Card Project</h1>
          <p>
            Test your memory by answering Yes or No when asked if you have seen
            the logo already this round.
          </p>
          <p> Get 10 Correct in a Row for the Win</p>
          <div className="score-display">
            <span>Current Score: {this.state.score}</span>
            <span>🎯 High Score: {this.state.highScore}</span>
          </div>
        </header>
        <section className="App-box">
          <div className="App-sub-box">
            <ImageDisplay value={selectedNum} />
            <div>
              <h3>Have you seen this number yet?</h3>
              <button
                id="no"
                className="btn"
                onClick={() => this.testSc(selectedNum, false)}
              >
                No
              </button>
              <button
                id="yes"
                className="btn"
                onClick={() => this.testSc(selectedNum, true)}
              >
                Yes
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default App;
