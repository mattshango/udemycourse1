import React, { Component } from 'react';
import steem from 'steem';

export default class Post extends Component {
  componentDidMount(){
    steem.api.getContent('happymoneyman', 'eos-life-liberty-and-property-a-talk-with-eosocal-bp-candidate', (error, result) => {
      console.log(error, result);
    });
  }

  render() {
    return (
      <div>Post</div>
    );
  }
}