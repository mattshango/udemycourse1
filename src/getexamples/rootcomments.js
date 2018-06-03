import React, { Component } from 'react';
import steem from 'steem';

export default class RootComments extends Component {
  componentDidMount(){
    steem.api.getContentReplies('happymoneyman','eos-life-liberty-and-property-a-talk-with-eosocal-bp-candidate', (error, results) => {
      console.log(error, results);
    });
  }
  render() {
    return (
      <div>Root Comments</div>
    );
  }
}