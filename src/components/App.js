import React, { Component } from "react";
import DisplayGraph from "./DisplayGraph";
import DisplayMap from "./DisplayMap";

class App extends Component {
  constructor() {
    super()
    this.state = {
      showChart: true
    }

    this.toggelChart = this.toggelChart.bind(this)
  }

  toggelChart () {
    this.setState({ showChart: !this.state.showChart })
  }

  render() {
    var draw = this.state.showChart? <DisplayGraph /> : <DisplayMap />;

    return (
      <div>
        <header>
          <h1>React Test App!</h1>
          <button onClick={this.toggelChart.bind(this)} > Toggle Chart </button>
        </header>
        {draw}
      </div>
    );
  }
}

export default App;
