import React, { Component } from 'react';
import './App.css';
import Search from './Search';
import WordCloud from './WordCloud';
import cloud from './imgs/cloud.png';
import stickFigure from './imgs/stick_figure.png';
import sun from './imgs/sun.png';
import twitterEgg from './imgs/twitter_egg.png';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { handle: '',
                   avatar: twitterEgg,
                   words: [],
                   loading: false,
                   hasError: false
                 }

    this.getData = this.getData.bind(this);
  }

  handleSearchSuccess(data) {
    this.setState({
      handle: '@' + data.handle,
      words: data.words,
      avatar: data.avatar,
      hasError: false,
      loading: false
    })
  }

  handleSearchFail() {
    this.setState({
      words: [],
      handle: '',
      avatar: twitterEgg,
      hasError: true,
      loading: false
    })
  }

  getData(handle, loading) {
    this.setState({loading: loading})
    fetch('/cloud/' + handle)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
            return Promise.reject('Network failure.')
          }
        })
      .then(data => this.handleSearchSuccess(data))
      .catch(err => this.handleSearchFail())
  }

  showToUser() {
    if (this.state.loading)
      return <p>Loading...</p>
    if (this.state.hasError)
      return <p>Please enter a valid Twitter handle</p>
    return <WordCloud words={this.state.words} />
  }

  render() {
    return (
      <div className="App">
        <Search getData={this.getData} />
        <img src={sun} className="sun" />
        <img className="small_cloud" src={cloud} />
        <img className="large_cloud" src={cloud} />
        <img className="small_cloud" src={cloud} />
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {this.showToUser()}
          <div className="avatar" style={{backgroundImage: `url(${this.state.avatar})`}} />
          <img className="stick_figure" src={stickFigure} />
        </div>
        <div className="ground">
          <h2 style={{marginTop: 60}}>{this.state.handle}</h2>
        </div>
      </div>
    )
  }
}

export default App;
