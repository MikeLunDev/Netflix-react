import React, { Component } from "react";
import ShowComments from "./ShowComments";
import { IoMdBackspace } from "react-icons/io";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

export default class MovieDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovieId: null
    };
  }

  componentDidMount = () => {
    this.setState({
      selectedMovieId: this.props.match.params.movieId
    });
  };

  render() {
    return (
      <>
        {this.state.selectedMovieId && (
          <div className="container">
            <Button
              className="bg-dark"
              style={{ position: "absolute", top: "10%", left: 0 }}
            >
              <Link className="nav-link text-white" to="/">
                {" "}
                <IoMdBackspace /> Go Back
              </Link>
            </Button>
            <div className="row">
              <div className="col-12">
                <ShowComments movieId={this.state.selectedMovieId} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
