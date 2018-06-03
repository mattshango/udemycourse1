import React, { Component } from 'react';
import steem from 'steem';

export default class Comment extends Component {
  componentDidMount(){
    steem.api.getContent('amirms','re-happymoneyman-2018531t121716501z', (error, result) => {
      console.log(error, result);
    })
  }
  render() {
    return (
      <div>Comment</div>
    );
  }
}