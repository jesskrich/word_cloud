import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
    super(props)
      this.state = {
        handle: '',
        loading: true
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      handle: event.target.value
    })
  }

  handleSubmit(event) {
    {this.props.getData(this.state.handle, this.state.loading)};
    event.preventDefault();
    this.setState({
      handle: ''
    })
  }

  render() {
    return (
      <div style={{margin: 15}}>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text"
                   handle={this.state.handle}
                   value={this.state.handle}
                   onChange={this.handleChange} />
          </label>
            <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }

}

export default Search;
