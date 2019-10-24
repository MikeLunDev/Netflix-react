import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Container,
  Spinner,
  Alert
} from "reactstrap";

class AddComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlForComments: "http://www.localhost:3010/reviews/",
      comments: null,
      singleComment: {
        author: "",
        rate: 0,
        comment: ""
      },
      isLoading: false,
      errMess: ""
    };
  }

  handleChange = ({ target: { value, name } }) => {
    var comment = this.state.singleComment;
    comment[name] = value;

    this.setState({
      singleComment: comment
    });
    console.log(this.state.singleComment);
  };

  render() {
    return (
      <>
        <Container style={{ margin: "20px auto 20px auto" }}>
          {this.state.errMess.length > 0 && (
            <Alert color="danger">
              We encountered a problem while processing your request:{" "}
              {this.state.errMess}
            </Alert>
          )}
          <h3>To Add a Comment for Submit the form</h3>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button
                onClick={() => this.props.addComment(this.state.singleComment)}
              >
                Post a new Comment
              </Button>
            </InputGroupAddon>
            <Input
              type="text"
              placeholder="Your Name"
              name="author"
              onChange={this.handleChange}
            />
            <Input
              type="text"
              placeholder="Write a comment"
              name="comment"
              onChange={this.handleChange}
            />
            <Input
              type="number"
              placeholder="0 to 5"
              name="rate"
              onChange={this.handleChange}
            />
          </InputGroup>
        </Container>
        {this.state.isLoading && (
          <div className="container d-flex justify-content-center my-5 mx-4">
            <h4>Adding your comment</h4>
            <div>
              <Spinner className="mx-2" color="success" />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default AddComments;
