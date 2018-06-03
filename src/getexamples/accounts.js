import React, { Component } from 'react';
import steem from 'steem';

export default class Accounts extends Component {
  componentDidMount(){
    steem.api.getAccounts(['shango', 'guest9999'], (error, results) => {
      console.log(error, results);
    });

    steem.api.getFollowCount('shango', (error, result) => {
      console.log(error, result);
    });

    steem.api.getFollowers('shango', '', 'blog', 10, (error, results) => {
      console.log(error, results);
      steem.api.getFollowers('shango', results[results.length-1].follower, 'blog', 11, (error2, results2) => {
        results2.shift();
        console.log(error2, results2);
      });
    });

    steem.api.getFollowing('shango', '', 'blog', 10, (error, result) => {
      console.log(error, result);
    });
  }
  render() {
    return (
      <div>Get Accounts</div>
    );
  }
}