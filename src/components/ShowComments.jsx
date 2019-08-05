import React, { Component } from "react";
import ReactLoading from "react-loading";
import MediaComment from "./MediaComment";
import AddComment from "./AddComment"

export default class ShowComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: null,
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
    await this.fetchData(this.props.movie.imdbID);
  };

  fetchData = async id => {
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
        setTimeout(()=>this.setState({
          comments: json,
          isLoading: false,
          errMess: ""
        }),1500);
        clearTimeout();
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

  componentDidUpdate(prevProps) {
   
    if (this.props.movie !== prevProps.movie) {
      this.fetchData(this.props.movie.imdbID);
    }
  }

  render() {
    return (
      <>
        {this.state.isLoading && (
          <div className="container d-flex justify-content-center my-5">
            <div className="row">
            <div className="col-12">
            Searching for Comments...
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
        {!this.state.isLoading &&
          this.state.errMess === "" && (
            <div className="container">
            <div className="row">
            <div className="col-md-4">
              <img src={this.props.movie.Poster}/>
            </div>
            <div className="col-md-8" style={{overflowY:"scroll", maxHeight:"480px"}}>
              <AddComment className="mb-4" movie={this.props.movie}/>
              {this.state.comments.map((singleComment, index) => {
                return <MediaComment key={index} commentObj={singleComment} />;
              })}
            </div>
            </div>
            </div>
          )}
      </>
    );
  }
}
