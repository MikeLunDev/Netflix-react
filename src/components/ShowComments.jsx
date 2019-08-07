import React, { Component } from "react";
import ReactLoading from "react-loading";
import MediaComment from "./MediaComment";
import AddComment from "./AddComment";
import { ListGroup, ListGroupItem, Badge } from "reactstrap";
import { IoMdHeartDislike } from "react-icons/io";

export default class ShowComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlForDetail: "http://www.omdbapi.com/?apikey=1802dfa8&i=",
      comments: null,
      detailSearchResults: null,
      isLoading: true,
      errMess: "",
      credentials: {
        username: "user4",
        password: "tdu5sD2PNUcc2Pae",
        genToken() {
          return btoa(`${this.username}:${this.password}`);
        }
      }
    };
  }

  componentDidMount = async () => {
    /* let [a, c] = await Promise.all([
      this.fetchDataMovie(this.props.movieId),
      this.fetchComments(this.props.movieId)
  ]); */

    await this.fetchDataMovie(this.props.movieId);
    await this.fetchComments(this.props.movieId);
  };

  fetchComments = async id => {
    try {
      var response = await fetch(
        "https://strive-school-testing-apis.herokuapp.com/api/comments/" + id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + this.state.credentials.genToken()
          }
        }
      );
      var json = await response.json();

      if (response.ok) {
        console.log(json);
        this.setState({
          comments: json,
          errMess: "",
          isLoading: false
        });
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

  fetchDataMovie = async id => {
    try {
      var response = await fetch(this.state.urlForDetail + id,
        {
          headers: {
            "Content-Type": "application/json"
          }
        });
      var json = await response.json();
      if (response.ok) {
        setTimeout(
          () =>
            this.setState({
              errMess: undefined,
              detailSearchResults: json,
              isLoading: false,
              errMess: ""
            }),
          1500
        );
      } else {
        this.setState({
          errMess: json.Error
        });
      }
    } catch (ex) {
      console.log("the real error is", ex);
    }
  };

  /* componentDidUpdate(prevProps) {
    if (this.props.movieId !== prevProps.movieId) {
      this.fetchData(this.props.movieId);
      this.fetchDataMovie(this.props.movieId);
    }
  } */

  render() {
    return (
      <>
        {this.state.isLoading && (
          <div className="container d-flex justify-content-center my-5">
            <div className="row">
              <div className="col-12">
                Loading...
                <ReactLoading
                  type="bars"
                  color="#fff"
                  width={130}
                  className=""
                />
              </div>
            </div>
          </div>
        )}
        {this.state.detailSearchResults &&
          !this.state.isLoading &&
          this.state.errMess === "" && (
            <div className="container">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src="" />
                </div>
                <div className="col-md-8" style={{ maxHeight: "480px" }}>
                  <ListGroup className="text-white">
                    <ListGroupItem className="bg-dark">
                      <h4>
                        <Badge color="info">Genre:</Badge>{" "}
                      </h4>
                      {this.state.detailSearchResults.Genre}
                    </ListGroupItem>
                    <ListGroupItem className="bg-dark">
                      <h4>
                        <Badge color="info">Actors:</Badge>{" "}
                      </h4>
                      {this.state.detailSearchResults.Actors}
                    </ListGroupItem>
                    <ListGroupItem className="bg-dark">
                      <h4>
                        <Badge color="info">Director:</Badge>{" "}
                      </h4>
                      {this.state.detailSearchResults.Director}
                    </ListGroupItem>
                    <ListGroupItem className="bg-dark">
                      <h4>
                        <Badge color="info">BoxOffice:</Badge>{" "}
                      </h4>
                      {this.state.detailSearchResults.BoxOffice}
                    </ListGroupItem>
                    <ListGroupItem className="bg-dark">
                      <h4>
                        <Badge color="info">Plot:</Badge>{" "}
                      </h4>
                      {this.state.detailSearchResults.Plot}
                    </ListGroupItem>
                  </ListGroup>
                </div>
              </div>
            </div>
          )}
        {this.state.comments && (
          <div className="col-12 text-center">
            {/*  <AddComment className="mb-4" movieId={this.props.movieId} /> */}
            <h4 className="py-5">Comment Section</h4>
            {this.state.comments.map((singleComment, index) => {
              return <MediaComment key={index} commentObj={singleComment} />;
            })}
          </div>
        )}
      </>
    );
  }
}
