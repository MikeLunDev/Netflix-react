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
    
        singleComment: {
        },
        credentials: {
          username: "user4",
          password: "tdu5sD2PNUcc2Pae",
          genToken() {
            return btoa(`${this.username}:${this.password}`);
          }
        },
        isLoading: false,
        errMess: ""
      };
  }

componentDidMount = ()=>{
  console.log("i've received the id movie of",this.props.movie.imdbID)
  this.setState({
    singleComment: {
      elementId: this.props.movie.imdbID,
      comment: "",
      rate: 2
    }
  })
}
  
componentDidUpdate = (prevProps)=>{
  console.log("on update i've received the id movie of",this.props.movie.imdbID)
    if (this.props.movie !== prevProps.movie) {
        this.setState({
          singleComment:{
          elementId: this.props.movie.imdbID,
          comment: "",
          rate: 2
          }
        })
      }

    console.log("new state is", this.state.singleComment)
}

  handleChange = input => {
    var comment = this.state.singleComment;
    var currentId = input.currentTarget.id;
    comment[currentId] =
      currentId === "rate"
        ? parseInt(input.currentTarget.value)
        : input.currentTarget.value;
    this.setState({
      singleComment: comment
    });
  };

  handleSubmitComment = async () => {
    try {
      var response = await fetch(
        "https://strive-school-testing-apis.herokuapp.com/api/comments/",
        {
          method: "POST",
          body: JSON.stringify(this.state.singleComment),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + this.state.credentials.genToken()
          }
        }
      );
      var json = await response.json();
      if (response.ok) {
       setTimeout(()=>{this.setState({
          isLoading: false,
          errMess: "",
          singleComment: {
            comment: "",
            rate: "",
            elementId: ""
          }
        })}, 2500);
      } else {
        this.setState({
          errMess: json.message,
          isLoading: false
        });
      }
    } catch (ex) {
      console.log("the real error is", ex);
    }
  };
  render() {
    return (
        <>
     
      <Container style={{margin:"0 auto 20px auto"}}>
      {this.state.errMess.length > 0 && (
          <Alert color="danger">We encountered a problem while processing your request: {this.state.errMess}</Alert>
        )}  
           <h3>To Add a Comment for Submit the form</h3>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <Button onClick={this.handleSubmitComment}>Post a new Comment</Button>
          </InputGroupAddon>
          <Input
            type="text"
            value={this.state.singleComment.comment}
            placeholder="Write a comment"
            id="comment"
            onChange={this.handleChange}
          />
          <Input
            type="number"
            value={this.state.singleComment.rate}
            placeholder="Rate from 0 to 5"
            id="rate"
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
