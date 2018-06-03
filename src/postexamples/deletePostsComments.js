import React, { Component } from 'react';
import steem from 'steem';

export default class DeletePostsAndComments extends Component {
  componentDidMount(){
    const wif = ''; // Can be found in the Udemy Course Article
    const author = 'guest9999';
    const permlink = 're-guest9999-third-post-20180602t200134925z';

    steem.broadcast.deleteComment(
      wif,
      author,
      permlink,
      (error, result) => {
        console.log(error, result);
      }
    )
  }

  render() {
    return (
      <div>Delete Posts and Comments</div>
    );
  }
}