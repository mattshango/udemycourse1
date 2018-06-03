import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';

export default class PostForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      body: '',
      category: '',
      tags: ['','','',''],
      permlink: ''
    }

    this.updateTag = this.updateTag.bind(this);
  }

  updateTag(text, row){
    let tags = this.state.tags;
    tags[row] = text;
    this.setState({tags});
  }

  render() {
    const { isUpdating, updateFunc, submitFunc  } = this.props;

    return (
      <div>
        <Row>
          <Col xs={12}>
          <FormGroup>
            <Label for="formTitle">Title</Label>
            <Input 
              type="text" 
              value={this.state.title} 
              onChange={title => this.setState({title: title.target.value})}
              placeholder="Enter the title of the post" 
            />
          </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
          <FormGroup>
            <Label>Body</Label>
            <Input 
              type="textarea" 
              value={this.state.body}
              onChange={body => this.setState({body: body.target.value})}
              placeholder="Can use markdown" 
            />
          </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
          {
            !isUpdating && 
            <FormGroup>
              <Label>Category</Label>
              <Input 
                type="text" 
                value={this.state.category}
                onChange={category => this.setState({category: category.target.value})}
                placeholder="Enter category" 
              />
            </FormGroup>
          }
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
          <FormGroup>
            <Label for="formTags">Tags</Label>
            <Row>
              <Col xs={6}>
                <Input 
                  type="text" 
                  placeholder="1st Tag" 
                  value={this.state.tags[0]}
                  onChange={text => this.updateTag(text.target.value, 0)}
                />
              </Col>
              <Col xs={6}>
                <Input 
                  type="text" 
                  placeholder="2nd Tag" 
                  value={this.state.tags[1]}
                  onChange={text => this.updateTag(text.target.value, 1)}
                />
              </Col>
              <Col xs={6}>
                <Input 
                  type="text" 
                  placeholder="3rd Tag" 
                  value={this.state.tags[2]}
                  onChange={text => this.updateTag(text.target.value, 2)}
                />
              </Col>
              <Col xs={6}>
                <Input 
                  type="text" 
                  placeholder="4th Tag" 
                  value={this.state.tags[3]}
                  onChange={text => this.updateTag(text.target.value, 3)}
                />
              </Col>
            </Row>
          </FormGroup>
          </Col>
        </Row>
        <Row>
         <Col xs={12}>
          {
            isUpdating &&
            <FormGroup>
              <Label for="formPermlink">Post Permlink</Label>
              <Input 
                type="text"
                id="formPermlink" 
                placeholder="Enter post permlink to update" 
                value={this.state.permlink}
                onChange={permlink => this.setState({permlink: permlink.target.value})}
              />
            </FormGroup>
          }
          </Col>
        </Row>
          <Row>
            <Col xs={12}>
              <FormGroup>
              {
                isUpdating ?
                  <Button onClick={() => updateFunc(
                    this.state.title,
                    this.state.body,
                    this.state.tags,
                    this.state.permlink
                  )}>Update Post</Button>
                  :
                  <Button onClick={() => submitFunc(
                    this.state.title,
                    this.state.body,
                    this.state.category,
                    this.state.tags
                  )}>Submit Post</Button>
              }
              </FormGroup>
            </Col>
          </Row>
      </div>
    );
  }
}