import React, { Component } from 'react';

class WordRain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leftCloudWords: [],
      centerCloudWords: [],
      rightCloudWords: []
    }
  }

  updateClouds(clouds) {
    this.setState({
      leftCloudWords: clouds[0],
      centerCloudWords: clouds[1],
      rightCloudWords: clouds[2]
    })
  }

  makeItRain(cloud, size) {
    return (
      <ul style={{width: size}}>
        {cloud.map((word, index) =>
          <li key={index}
              style={{fontSize: `${word[Object.keys(word)]}em`,
                      color: '#3456E5'}}>
                {`${Object.keys(word)}`}
          </li>)
        }
        </ul>
    )
  }

  componentDidMount() {
    const clouds = [[], [], []]
    {this.props.words.map(word => {
      let randomIndex = Math.floor(Math.random() * clouds.length)
      console.log(clouds[randomIndex].push(word))
    })}
    this.updateClouds(clouds)
  }

  render() {
    const { leftCloudWords, centerCloudWords, rightCloudWords } = this.state
    return (
      <div className="rain_conatainer">
        {this.makeItRain(leftCloudWords, '25%')}
        {this.makeItRain(centerCloudWords, '50%')}
        {this.makeItRain(rightCloudWords, '25%')}
      </div>
    )
  }
}

export default WordRain;
