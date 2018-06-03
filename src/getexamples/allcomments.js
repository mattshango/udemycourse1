import React, { Component } from 'react';
import steem from 'steem';

export default class AllComments extends Component {
  componentDidMount(){
    steem.api.getState('eos/@happymoneyman/eos-life-liberty-and-property-a-talk-with-eosocal-bp-candidate', (error, results) => {
      console.log(error, results);
    
      const comments = this.getComments(results);
      console.log(comments);

      const commentsChildrenList = this.getCommentChildrenLists(results);
      console.log(commentsChildrenList);

    });
  }

  getComments(apiRes){
    return Object.values(apiRes.content).filter(comment => comment.depth > 0);
  }

  getCommentChildrenLists(apiRes){
    const listById = {};

    Object.keys(apiRes.content).forEach(commentKey => {
      listById[apiRes.content[commentKey].id] = apiRes.content[commentKey].replies.map(
        childKey => apiRes.content[childKey].id
      );
    });

    return listById;
  }

  render() {
    return (
      <div>All Comments</div>
    );
  }
}