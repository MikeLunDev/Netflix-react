import React, { Component } from "react";
import Slider from "react-slick";
import { Alert,Badge,Button } from "reactstrap";
import {Link} from "react-router-dom"

export default class ResponsiveCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "http://www.omdbapi.com/?apikey=1802dfa8&s=",
      errMess: undefined,
      searchResults: null
    };
  }

  componentDidMount = async () => {
    try {
      var response = await fetch(this.state.url + this.props.search);
      var json = await response.json();
      if (response.ok) {
      
       var onlyMovies = json.Search === undefined ? null : json.Search.filter((film => film.Type === "movie"));
          this.setState({
            errMess: undefined,
            searchResults: onlyMovies
          });
      } else {
        this.setState({
          errMess: json.Error,
        });
   
      }
    } catch (ex) {
      console.log("the real error is", ex);
    }
  };

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
            <h3>There was an error: <Badge color="danger">Error code: #{this.state.errMess}</Badge><br/><br/>
            Please contact us at <Badge color="success">lunatimichele@gmail.com</Badge> with the error code.<br/>
            </h3>
            <h5>Thanks for your patience, we hope to see you again!</h5>
            </Alert>
        )}
       
        {this.state.searchResults !== null && this.state.errMess === undefined && (
          <div className="container-fluid">
            <h2 className="py-2"> {this.props.search}</h2>
            <Slider {...settings}>
              {this.state.searchResults.map(movie => (
                <div key={movie.imdbID}>
                  <img
                    width="97%"
                    height="270px"
                    src={movie.Poster}
                    alt={movie.Title}
                  />
                     <Button style={{width:"97%"}}><Link className="nav-link text-white" to={"/moviedetails/" + movie.imdbID}> Show Details</Link></Button>
                </div>
              ))}
           
            </Slider>
          </div>
        )}
      </>
    );
  }
}
