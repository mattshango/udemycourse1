import React from 'react';
import moment from 'moment';
import Markdown from 'react-markdown';
import {
  Card, 
  CardText, 
  CardBody, 
  CardTitle, 
  CardSubtitle, 
  Row, 
  Col
} from 'reactstrap';

const getEarnings = (totalPayout, pendingPayout) => {
  return `$${(parseFloat(totalPayout)+parseFloat(pendingPayout)).toFixed(2)}`
}

export default ({
  username,
  date,
  title,
  body,
  upvotes,
  comments,
  totalPayout,
  pendingPayout
}) => {
  return (
    <div>
        <Card>
          <CardBody>
            <CardSubtitle>@{username}</CardSubtitle>
            <CardTitle>{title}</CardTitle>
            <CardText>
                <small>{moment(date).fromNow()}</small>
            </CardText>
          </CardBody>
          <CardBody>
            <CardText className="postBody"><Markdown source={body} /></CardText>
            <Row>
              <Col sm={6}>
                <CardText>
                  {`${upvotes} Upvotes | ${comments} Comments`}
                </CardText>
              </Col>
              <Col sm={6} style={{textAlign: 'right'}}>
                <CardText>
                  {getEarnings(totalPayout, pendingPayout)}
                </CardText>
              </Col>
            </Row>
          </CardBody>
        </Card>
    </div>
  )
}