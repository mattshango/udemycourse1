import React, { Component } from 'react';
import steem from 'steem';
import { Container, Row, Col } from 'reactstrap';
import Form from '../components/form';
import Post from '../components/post';


export default class CreateAndUpdatePosts extends Component {
  constructor(props){
    super(props);

    this.state = {
      post: {},
      postVisibility: false,
      isUpdating: false
    }

    this.submitPost = this.submitPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.createPermlink = this.createPermlink.bind(this);
  }

  submitPost(title, body, category, tags){
    const wif = ''; // Can be found in the Udemy Course Article
    const parentAuthor = '';
    const parentPermlink = category;
    const author = 'guest9999';
    let permlink = this.createPermlink(title);
    const jsonMetadata = {
      tags,
      //image: ['']
    }

    steem.api.getContent(author, permlink, (error, result) => {
      if(result.length > 0) permlink = `${permlink.substring(0,242)}${Date.now()}`;

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
          console.log(error, result);

          if(!error){
            setTimeout(() => {
              steem.api.getContent(author, permlink, (error, result) => {
                this.setState({
                  post: result,
                  postVisibility: true
                });
              });
            }, 3000);
          }
        }
      )
    })
  }

  updatePost(title, body, tags, permlink){
    const wif = ''; // Can be found in the Udemy Course Article
    const author = 'guest9999';
    const jsonMetadata = {
      tags,
      //image: ['']
    }

    steem.api.getContent(author, permlink, (error, result) => {

      if(result.length < 1) return alert('post does not exist');

      steem.broadcast.comment(
        wif,
        result.parent_author,
        result.parent_permlink,
        author,
        permlink,
        title,
        body,
        jsonMetadata,
        (error, result) => {
          console.log(error, result);

          if(!error){
            setTimeout(() => {
              steem.api.getContent(author, permlink, (error, result) => {
                this.setState({
                  post: result,
                  postVisibility: true
                });
              });
            }, 3000);
          }
        }
      )
    })
  }

  createPermlink(title){
    return title
            .toLowerCase()
            .trim()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'')
            .substring(0, 255);
  }

  render() {
    const { post, postVisibility } = this.state;

    return (
      <Container>
        <Row>
          <Col sm="12" md={{size: 8, offset: 2}}>
            <h1>Form</h1>
            <select onChange={radio => this.setState({isUpdating: !this.state.isUpdating})}>
              <option type='radio' value='create'> Create post</option>
              <option type='radio' value='update'> Update Post</option>
            </select>
            <Form 
              isUpdating={this.state.isUpdating} 
              submitFunc={this.submitPost} 
              updateFunc={this.updatePost} 
            />
            <br />
            {
              postVisibility && 
                <Post 
                  username={post.author}
                  date={post.created}
                  title={post.title}
                  body={post.body}
                  upvotes={post.net_votes}
                  comments={post.children}
                  totalPayout={post.total_payout_value}
                  pendingPayout={post.pending_payout_value}
                />
            }
          </Col>
        </Row>
      </Container>
    );
  }
}
