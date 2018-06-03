import React, { Component } from 'react';
import steem from 'steem';

export default class Reblog extends Component {
  componentDidMount(){
    const username = 'guest9999';
    const wif = ''; // Can be found in the Udemy Course Article

    steem.api.getDiscussionsByHot({tag: 'steemit', limit: 1}, (error, result) => {
      const json = JSON.stringify(['reblog', {
        account: username,
        author: result[0].author,
        permlink: result[0].permlink
      }]);

      steem.broadcast.customJson(wif, [], [username], 'follow', json, (error, result) => {
        console.log(error, result);
      })
    });
  }
  render() {
    return (
      <div>Reblogging Posts</div>
    );
  }
}