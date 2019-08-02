import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import logo from "../assets/imgs/logo.png";
import bell from "../assets/imgs/bell.png";
import search from "../assets/imgs/search.png";

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
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  <img src={search} alt="bell" width="30px" height="auto" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  <img src={bell} alt="bell" width="30px" height="auto" />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
