import React, { Component } from 'react';
import steem from 'steem';

export default class Voting extends Component {
  componentDidMount(){

    const weight = 10000 // 100% upvote

    steem.broadcast.vote(
      '', // WIF - can be found in the udemy course article
      'guest9999',
      'guest9999',
      'third-post',
      weight,
      (error, result) => {
        console.log(error, result);
      }
    )
  }
  render() {
    return (
      <div>Voting</div>
    );
  }
}