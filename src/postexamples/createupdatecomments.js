import React, { Component } from 'react';
import steem from 'steem';
import { Container, Row, Col } from 'reactstrap';
import Form from '../components/commentsform';
import Post from '../components/post';


export default class CreateAndUpdateComments extends Component {
  constructor(props){
    super(props);

    this.state = {
      comment: {},
      commentVisibility: false,
      isUpdating: false
    }

    this.submitComment = this.submitComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
  }

  submitComment(body){
    const wif = ''; // Can be found in the Udemy Course Article
    const parentAuthor = 'guest9999';
    const parentPermlink = 'third-post';
    const author = 'guest9999';
    const permlink = steem.formatter.commentPermlink(parentAuthor, parentPermlink);
    const title = '';
    const jsonMetadata = {
    }

    steem.broadcast.comment(
      wif,
      parentAuthor,
      parentPermlink,
      author,
      permlink,
      title,
      body,
      jsonMetadata,
      (error, result) => {
        setTimeout(() => {
          steem.api.getContent(author, permlink, (error, result) => {
            this.setState({
              comment: result,
              commentVisibility: true
            })
          })
        }, 2000);
      }
    )
  }

  updateComment(body, permlink){
    const wif = ''; // Can be found in the Udemy Course Article
    const parentAuthor = 'guest9999';
    const parentPermlink = 'third-post';
    const author = 'guest9999';
    const title = '';
    const jsonMetadata = {
    }

    steem.api.getContent(author, permlink, (error, result) => {
      if(result.length < 1) return alert('Comment does not exist');

      steem.broadcast.comment(
        wif,
        parentAuthor,
        parentPermlink,
        author,
        permlink,
        title,
        body,
        jsonMetadata,
        (error, result) => {
          setTimeout(() => {
            steem.api.getContent(author, permlink, (error, result) => {
              this.setState({
                comment: result,
                commentVisibility: true
              })
            })
          }, 2000);
        }
      )
    });
  }

  render() {
    const { comment, commentVisibility } = this.state;

    return (
      <Container>
        <Row>
          <Col sm="12" md={{size: 8, offset: 2}}>
            <h1>Form</h1>
            <select onChange={radio => this.setState({isUpdating: !this.state.isUpdating})}>
              <option type='radio' value='create'> Create Comment</option>
              <option type='radio' value='update'> Update Comment</option>
            </select>
            <Form 
              isUpdating={this.state.isUpdating} 
              submitFunc={this.submitComment} 
              updateFunc={this.updateComment} 
            />
            <br />
            {
              commentVisibility && 
                <Post 
                  username={comment.author}
                  date={comment.created}
                  title={comment.title}
                  body={comment.body}
                  upvotes={comment.net_votes}
                  comments={comment.children}
                  totalPayout={comment.total_payout_value}
                  pendingPayout={comment.pending_payout_value}
                />
            }
          </Col>
        </Row>
      </Container>
    );
  }
}
