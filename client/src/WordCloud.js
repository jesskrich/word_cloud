import React, { Component } from 'react';

const WordCloud = (props) => {
  return (
    <ul>
      {props.words.map((word, index) =>
        <li key={index}
            style={{fontSize: `${word[Object.keys(word)]}em`,
                    color: '#3456E5'}}>
              {`${Object.keys(word)}`}
        </li>)
      }
    </ul>
  )
}

export default WordCloud;
