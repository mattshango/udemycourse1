import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';

export default class CommentsForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      body: '',
      permlink: ''
    }
  }


  render() {
    const { isUpdating, updateFunc, submitFunc  } = this.props;

    return (
      <div>
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
            isUpdating &&
            <FormGroup>
              <Label for="formPermlink">Comment Permlink</Label>
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
                    this.state.body,
                    this.state.permlink
                  )}>Update Comment</Button>
                  :
                  <Button onClick={() => submitFunc(
                    this.state.body
                  )}>Submit Comment</Button>
              }
              </FormGroup>
            </Col>
          </Row>
      </div>
    );
  }
}