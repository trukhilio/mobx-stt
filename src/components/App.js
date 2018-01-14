import React, { Component } from 'react';
import logo from '../assets/blue.jpg';

import WishListView from './WishListView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt='b'/>
          <h1 className="App-title">Wish List</h1>
        </header>
        <WishListView wishList={this.props.wishList}/>
      </div>
    );
  }
}

export default App;
