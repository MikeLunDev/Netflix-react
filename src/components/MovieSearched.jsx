import React, { Component } from "react";
import Slider from "react-slick";
import ReactLoading from "react-loading";
import { Alert, Badge } from "reactstrap";

export default class MovieSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "http://www.omdbapi.com/?apikey=1802dfa8&s=",
      errMess: undefined,
      searchResults: null
    };
  }

  

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      initialSlide: 0,
      arrows: true,
      dots: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <>
        {this.state.errMess !== undefined && (
          <Alert color="danger">
            <h3>
              There was an error:{" "}
              <Badge color="danger">Error code: #{this.state.errMess}</Badge>
              <br />
              <br />
              Please contact us at{" "}
              <Badge color="success">lunatimichele@gmail.com</Badge> with the
              error code.
              <br />
            </h3>
            <h5>Thanks for your patience, we hope to see you again!</h5>
          </Alert>
        )}
        {!this.props.searched && this.state.errMess === undefined && (
            <>
          <div className="container d-flex justify-content-center">
              <br/>
              <br/>
            <ReactLoading
              type="bars"
              color="#fff"
              width={150}
              className="mt-5"
            />
             <br/>
              
          </div>
           <br/>
           <br/>
           </>
        )}
        {this.props.searched && this.state.errMess === undefined && (
          <div className="container-fluid">
            <h2> Results for "{this.props.searchInput}" </h2>
            <Slider {...settings}>
              {this.props.searched.map(movie => (
                <div key={movie.imdbID}>
                  <img
                    width="97%"
                    height="270px"
                    src={movie.Poster}
                    alt={movie.Title}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </>
    );
  }
}
