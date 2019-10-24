import React, { Component } from "react";
import ReactLoading from "react-loading";
import MediaComment from "./MediaComment";
import AddComment from "./AddComment";
import { ListGroup, ListGroupItem, Badge, Alert } from "reactstrap";

export default class ShowComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlForDetail: "http://www.omdbapi.com/?apikey=1802dfa8&i=",
      urlForComments: "http://www.localhost:3010/reviews/movie/",
      comments: null,
      detailSearchResults: null,
      isLoading: true,
      errMess: ""
    };
  }

  componentDidMount = async () => {
    await this.fetchDataMovie(this.props.movieId);
    await this.fetchComments(this.props.movieId);
  };

  fetchComments = async id => {
    try {
      var response = await fetch(this.state.urlForComments + id, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      var json = await response.json();
      if (response.ok || response.status == 404) {
        setTimeout(
          () =>
            this.setState({
              comments: json,
              errMess: ""
            }),
          500
        );
      } else {
        this.setState({
          errMess: json.message
        });
      }
    } catch (ex) {
      console.log("Error", ex);
    }
  };

  fetchDataMovie = async id => {
    try {
      var response = await fetch(this.state.urlForDetail + id);
      var json = await response.json();
      console.log(json);
      if (response.ok) {
        setTimeout(
          () =>
            this.setState({
              errMess: undefined,
              detailSearchResults: json,
              isLoading: false,
              errMess: ""
            }),
          1100
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

  handleDelete = async (commentid, movieid) => {
    console.log(commentid, movieid);
    try {
      var resp = await fetch(this.state.urlForComments + commentid, {
        method: "DELETE"
      });
      if (resp.ok) {
        try {
          await this.fetchComments(movieid);
        } catch (err) {
          console.log("error on comments fetch", err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleAdd = async newcomment => {
    try {
      var response = await fetch(
        this.state.urlForComments + this.props.movieId,
        {
          method: "POST",
          body: JSON.stringify(newcomment),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      var json = await response.json();
      if (response.ok) {
        this.setState({
          comments: json,
          errMess: ""
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

  render() {
    return (
      <>
        {this.state.isLoading && (
          <div className="container d-flex justify-content-center my-5">
            <div className="row">
              <div className="col-12">
                <ReactLoading type="bars" color="#fff" width={130} />
              </div>
            </div>
          </div>
        )}
        {this.state.detailSearchResults &&
          !this.state.isLoading &&
          this.state.errMess === "" && (
            <div className="container mt-0 mb-2">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={this.state.detailSearchResults.Poster} />
                </div>
                <div className="col-md-8 pr-4">
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
        {this.state.comments != null && (
          <div className="container myScroll">
            <div className="col-12 text-center mt-5 pt-5">
              <h3 className="pt-3 pb-2 mt-4 font-weight-bold">
                Comment Section
              </h3>
              <AddComment
                className="my-5"
                movieId={this.props.movieId}
                addComment={this.handleAdd}
              />

              {this.state.comments.length == 0 ? (
                <Alert color="info">
                  <h3 className="py-5 my-3">
                    <strong>Still no comments. Be the first one!</strong>
                  </h3>
                </Alert>
              ) : (
                this.state.comments.map((singleComment, index) => {
                  return (
                    <MediaComment
                      key={index}
                      commentObj={singleComment}
                      deleteComment={this.handleDelete}
                    />
                  );
                })
              )}
            </div>
          </div>
        )}
        {this.state.comments === null && !this.state.isLoading && (
          <Alert color="warning">
            There is something wrong with comment section
          </Alert>
        )}
      </>
    );
  }
}
