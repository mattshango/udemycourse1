import React, { Component } from 'react';
import steem from 'steem';

// {tag: 'steemit', limit: 1}, (error, result) => {}

export default class Posts extends Component {
  componentDidMount(){
    steem.api.getDiscussionsByTrending({tag: 'steemit', limit: 10}, (error, results) => {
      console.log(error, results);
    });

    steem.api.getDiscussionsByCreated({tag: 'steemit', limit: 10}, (error, results) => {
      console.log(error, results);
    });

    steem.api.getDiscussionsByHot({tag: 'steemit', limit: 10}, (error, results) => {
      console.log(error, results);
    });

    steem.api.getDiscussionsByPromoted({tag: 'steemit', limit: 10}, (error, results) => {
      console.log(error, results);
    });

    steem.api.getPostDiscussionsByPayout({tag: 'steemit', limit: 10}, (error, results) => {
      console.log(error, results);
    });

    steem.api.getDiscussionsByBlog({tag: 'shango', limit: 10}, (error, results) => {
      console.log(error, results);
    });

    steem.api.getDiscussionsByFeed({tag: 'shango', limit: 10}, (error, results) => {
      console.log(error, results);
    });

    steem.api.getDiscussionsByAuthorBeforeDate('shango', '', '2018-05-30T13:30:30', 100, (error, results) => {
      console.log(error, results);
    });
  }
  render() {
    return (
      <div>Posts</div>
    );
  }
}