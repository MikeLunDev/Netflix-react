import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 
} from "reactstrap";
import logo from "../assets/imgs/logo.png";
import bell from "../assets/imgs/bell.png";
import search from "../assets/imgs/search.png";
import prof from "../assets/imgs/prof.png";
import {Link} from "react-router-dom";

export default class NetflixNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    return (
      <div>
        <Navbar style={{ backgroundColor: "black" }} dark expand="lg">
          <NavbarBrand href="/">
            <img src={logo} alt="netflix logo" width="100px" height="auto" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <Link to="/registration" className="pt-3 nav-link">
                  Register
                </Link>
              </NavItem>
            <NavItem>
                <Link to="/search" className="pt-3 nav-link">
                  <img to="/search" src={search} alt="search icon" width="30px" height="auto" />
                </Link>
              </NavItem>
             
              <NavItem>
                <NavLink className="pt-3" href="https://github.com/reactstrap/reactstrap">
                  <img src={bell} alt="bell" width="30px" height="auto" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  <img src={prof} alt="profile picture"  width="50px" height="auto" />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
