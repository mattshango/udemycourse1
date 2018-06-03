import React, { Component } from 'react';
import steem from 'steem';

export default class Auth extends Component {
  componentDidMount(){
    const username = 'guest9999';
    const privPostingKey = ''; // Can be found in the Udemy Course Article

    steem.api.getAccounts([username], (error, result) => {
      const publicKey = result[0].posting.key_auths[0][0];
      
      try {
        const isValid = steem.auth.wifIsValid(privPostingKey, publicKey);
        console.log('Valid login attempt');
      } catch (e){
        console.log('Invalid login attempt');
      }
    })
  }
  render() {
    return (
      <div>Auth</div>
    );
  }
}