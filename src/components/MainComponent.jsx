import React, { Component } from "react";
import ResponsiveCarousel from "./Gallery";
import NetflixNavbar from "./NavBar";
import ReactLoading from "react-loading";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import searchIcon from '../assets/imgs/search.png'
import MovieSearch from './MovieSearched'
import ShowComments from "./ShowComments";
import {IoMdBackspace} from "react-icons/io";

export default class MainComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "http://www.omdbapi.com/?apikey=1802dfa8&s=",
      isLoading: false,
      searchWord: "",
      isSearching:false,
      searchResult: null,
      errMess: "",
      selectedMovie: null
    };
  }

  componentDidMount = () => {
    setTimeout(
      () =>
        this.setState({
          isLoading: true
        }),
      2500
    );
    clearTimeout();
  };

   handleSearch = async (e)=>{
       e.preventDefault();
       this.setState({
        isSearching:true
       })
       try {
        var response = await fetch(this.state.url + this.state.searchWord);
        var json = await response.json();
        if (response.ok) {
            var onlyMovies = json.Search === undefined ? null : json.Search.filter((film => film.Type === "movie"));
          setTimeout(() => {
            this.setState({
              errMess: "",
              searchResult: onlyMovies,
              isSearching:false
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


  handleShowComments = (movie)=>{
   this.setState({selectedMovie: movie})
  }

 handleBack = ()=>{
   this.setState({
    selectedMovie: null
   })
 }


  render() {
    return (
      <>
        <NetflixNavbar />
        <br />
        <br />
        <br />

        {!this.state.isLoading && (
          <div className="container d-flex justify-content-center">
            <ReactLoading
              type="bars"
              color="#fff"
              width={230}
              className="mt-5 mt-3"
            />
          </div>
        )}

        {this.state.isLoading && (
          <div className="container text-center">
          <h2>Search for a movie</h2>
          <InputGroup >
            <InputGroupAddon addonType="prepend">
              <Button onClick={this.handleSearch} className="py-0"><img className="p-0" width="35"height="35px"src={searchIcon} alt="search icon"/></Button>
            </InputGroupAddon>
            <Input value={this.state.searchWord}  onChange={this.handleChange} placeholder="Search For A Movie"/>
          </InputGroup>
          <br/>
          <br/>
          </div>
        )}

        {/* SHOWSEARCH */}
        {this.state.isLoading && this.state.isSearching &&(
          <MovieSearch searched={this.state.searchResult} searching={this.state.isSearching}/>
        )}
         

         {/* SHOW COMMENTS */}
        {this.state.isLoading && this.state.selectedMovie && (
         
          <div className="row">
          <div className="col-12 pl-5 ml-5">
          <Button className="bg-dark" onClick={this.handleBack}><IoMdBackspace/> Go Back</Button>
          </div>
          <div className="col-12">
          <ShowComments movie={this.state.selectedMovie}/>
          </div>
          </div>
          
        )}
        
        {/* DEFAULT HOMEPAGE */}
        {this.state.isLoading && (
          <>
            <ResponsiveCarousel onShowComments={this.handleShowComments} search="Star wars" />
            <br />
            <ResponsiveCarousel onShowComments={this.handleShowComments} search="007" />
            <br />
            <ResponsiveCarousel onShowComments={this.handleShowComments} search="Indiana jones" />
            <br />
            <br/>
          </>
        )}
      </>
    );
  }
}
