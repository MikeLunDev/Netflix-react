import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBAlert
} from "mdbreact";
import { Redirect } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errMess: "",
      redirect: false,
      forgotPassword: false
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    var myFormdata = new FormData(e.target);
    var forLogin = {};
    for (var pair of myFormdata.entries()) {
      forLogin[pair[0]] = pair[1];
    }
    await this.handleLogin(forLogin);
  };

  handleLogin = async credentials => {
    console.log(credentials.password);
    var res = await fetch("http://localhost:3055/user/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    if (res.ok) {
      var json = await res.json();
      localStorage.setItem("token", json.token);
      this.setState({ redirect: true });
    } else this.setState({ forgotPassword: true });
  };

  render() {
    return !this.state.redirect ? (
      <>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6 offset-md-3">
              <form name="login" onSubmit={this.handleSubmit}>
                <p className="h5 text-center mb-4">Sign in</p>
                <div className="grey-text">
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    group
                    name="email"
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Type your password"
                    icon="lock"
                    group
                    name="password"
                    type="password"
                    validate
                  />
                </div>
                {this.state.forgotPassword && (
                  <MDBAlert color="danger">
                    <h5>
                      If you forgot your password click <a href="#">here</a>
                    </h5>
                  </MDBAlert>
                )}
                <div className="text-center">
                  <MDBBtn type="submit">Login</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default LoginPage;
