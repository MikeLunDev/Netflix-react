import React, { Component } from "react";
import ResponsiveCarousel from "./ResponsiveCarousel";
import NetflixNavbar from "./NavBar";
import ReactLoading from "react-loading";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import searchIcon from "../assets/imgs/search.png";
import MovieSearch from "./MovieSearched";
import LoginPage from "./LoginPage";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import RegistrationPage from "./RegistrationPage";

export default class MainComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "http://www.omdbapi.com/?apikey=1802dfa8&s=",
      isLoading: false,
      searchWord: "",
      isSearching: false,
      searchResult: null,
      errMess: "",
      selectedMovie: null,
      redirectToLogin: false
    };
  }

  componentDidMount = async () => {
    setTimeout(
      () =>
        this.setState({
          isLoading: true
        }),
      2500
    );
    clearTimeout();
    var token = localStorage.getItem("token");
    if (token) {
      var res = await fetch("http://localhost:3055/user/refresh", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        method: "POST"
      });
      if (res.ok) {
        var json = await res.json();
        localStorage.setItem("token", json.token);
      } else this.setState({ errMess: res.message });
    } else this.setState({ redirectToLogin: true });
  };

  handleSearch = async e => {
    e.preventDefault();
    this.setState({
      isSearching: true
    });
    try {
      var response = await fetch(this.state.url + this.state.searchWord);
      var json = await response.json();
      if (response.ok) {
        var onlyMovies =
          json.Search === undefined
            ? null
            : json.Search.filter(film => film.Type === "movie");
        setTimeout(() => {
          this.setState({
            errMess: "",
            searchResult: onlyMovies,
            isSearching: false
          });
        }, 2500);
        clearTimeout();
      } else {
        this.setState({
          errMess: json.Error,
          isSearching: false
        });
      }
    } catch (ex) {
      console.log("the real error is", ex);
    }
  };

  handleChange = input => {
    this.setState({
      searchWord: input.currentTarget.value
    });
  };

  handleShowComments = movie => {
    this.setState({ selectedMovieId: movie.imbdID });
  };

  render() {
    return (
      <Router>
        <NetflixNavbar />
        <br />
        <br />
        <br />
        {this.state.redirectToLogin && <Redirect to="/login" />}
        <Route path="/registration" exact component={RegistrationPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route
          path="/"
          exact
          render={() => {
            return (
              <>
                {!this.state.isLoading && (
                  <div className="container d-flex justify-content-center">
                    <ReactLoading
                      type="cylon"
                      color="#fff"
                      width={230}
                      className="mt-5 mt-3"
                    />
                  </div>
                )}

                {this.state.isLoading && (
                  <>
                    <ResponsiveCarousel
                      onShowComments={this.handleShowComments}
                      search="Star wars"
                    />
                    <br />
                    <ResponsiveCarousel
                      onShowComments={this.handleShowComments}
                      search="007"
                    />
                    <br />
                    <ResponsiveCarousel
                      onShowComments={this.handleShowComments}
                      search="Indiana jones"
                    />
                    <br />
                    <br />
                  </>
                )}
              </>
            );
          }}
        />

        <Route
          path="/search"
          exact
          render={() => {
            return (
              <div className="container text-center">
                <h2>Search for a movie</h2>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Button onClick={this.handleSearch} className="py-0">
                      <img
                        className="p-0"
                        width="35"
                        height="35px"
                        src={searchIcon}
                        alt="search icon"
                      />
                    </Button>
                  </InputGroupAddon>
                  <Input
                    value={this.state.searchWord}
                    onChange={this.handleChange}
                    placeholder="Search For A Movie"
                  />
                </InputGroup>
                <br />
                <br />
              </div>
            );
          }}
        />

        {/* SHOWSEARCH */}
        {this.state.isLoading && this.state.isSearching && (
          <MovieSearch
            searched={this.state.searchResult}
            searching={this.state.isSearching}
          />
        )}

        {/* SHOW COMMENTS */}
        <Route path="/moviedetails/:movieId" component={MovieDetail} />

        {/* DEFAULT HOMEPAGE */}
      </Router>
    );
  }
}
