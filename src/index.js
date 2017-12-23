import React from 'react';
import { render } from 'react-dom';
import Hello from './Hello';

const axios = require("axios")

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      imgURL: "",
      selectDog: "",
      breeds: []
    }
  }

  getDogSelect = () => {
    axios
      .get('https://dog.ceo/api/breeds/list')
      .then(response => {
        this.setState({
          breeds: response.data.message
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getRandomImage = () => {
    axios
      .get('https://dog.ceo/api/breeds/image/random')
      .then(response => {
        this.setState({
          imgURL: response.data.message
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getSelectedDog = () => {
    axios
      .get(`https://dog.ceo/api/breed/${this.state.selectDog}/images/random`)
      .then(response => {
        this.setState({
          imgURL: response.data.message
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handlerSelectDog = e => {
    this.setState({
      selectDog: e.target.value
    })
  }

  componentDidMount() {
    this.getRandomImage();
    this.getDogSelect();
    this.getSelectedDog();
  }

  render() {
    const { imgURL } = this.state;
    const styles = {
      img: {
        height: "15em"
      }
    }

    return (
      <div>
        <p> Random Dog Pictures v1 </p>
        <div>
          <select onChange={this.handlerSelectDog}>
            {this.state.breeds.map(el => <option value={el}>{el}</option>)}
          </select>
          <button onClick={this.getSelectedDog}>This dog!</button>
        </div>
        <div>
          <img style={styles.img} alt="" src={imgURL} />
        </div>
        <p>
          <button onClick={this.getRandomImage}> one more! </button>
        </p>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));
