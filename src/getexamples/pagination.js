import React, { Component } from 'react';
import steem from 'steem';

export default class Pagination extends Component {
  state = {
    posts: []
  }
  componentDidMount(){
    steem.api.getDiscussionsByTrending({tag: 'steemit', limit: 10}, (error, results) => {
      this.setState({posts: results}, () => {

        steem.api.getDiscussionsByTrending({
          tag: 'steemit',
          limit: 11,
          start_author: this.state.posts[this.state.posts.length-1].author,
          start_permlink: this.state.posts[this.state.posts.length-1].permlink
        }, (error2, results2) => {
          results2.shift();
          
          this.setState({posts: [...this.state.posts,...results2]}, () => {
            console.log(this.state.posts);
          })
        })



      });
    });
  }

  render() {
    return (
      <div>Pagination</div>
    );
  }
}