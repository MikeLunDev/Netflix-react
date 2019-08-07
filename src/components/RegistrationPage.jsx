import React, { Component } from "react";
import { LocalForm, Control, Errors } from "react-redux-form";
import { FormGroup, Label, Tooltip } from "reactstrap";
import { MdInfoOutline } from "react-icons/md";
import Swal from 'sweetalert2';

const requiredValidator = val => val && val.length;
const emailValidator = val =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    val
  );
const maxLengthValidator = len => val => !val || val.length <= len;
const minLengthValidator = len => val => !val || val.length >= len;
const passwordValidator = val =>
  /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/.test(val);
const zipValidator = val => /(?<!\d)\d{5}(?!\d)/g.test(val);
const minAgeValidator = val => val >= 18;
const maxAgeValidator = val => val <= 110;
const onlyDigitsValidator = val => /^\d+$/.test(val);

export default class RegistrationPage extends Component {
  constructor(params) {
    super(params);

    this.state = {
      isLoading: false,
      errMess: null,
      tooltipOpen: false,
      tooltipOpenEmail: false
    };
  }
  handleSubmit = async values => {
    console.log("SUBMIT", values);

    this.setState({
      isLoading: true
    });
  };

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  };
  toggleEmail = () => {
    this.setState({
      tooltipOpenEmail: !this.state.tooltipOpenEmail
    });
  };

  render() {
    return (
      <div className="container">
        <div className="container-fluid w-50" style={{ marginBottom: "80px" }}>
          <LocalForm
            style={{ width: "80%" }}
            onSubmit={values => this.handleSubmit(values)}
          >
            {/* NAME */}
            <FormGroup>
              <Label for="name">Name</Label>

              <Control.text
                id="name"
                model=".name"
                className="form-control mb-1 mb-1"
                placeholder="Your name"
                validators={{
                  requiredValidator,
                  minLengthValidator: minLengthValidator(2),
                  maxLengthValidator: maxLengthValidator(20)
                }}
              />

              <Errors
                model=".name"
                show={{ touched: true, focus: false }}
                className="form-error-message"
                component="li"
                messages={{
                  requiredValidator: "Required",
                  minLengthValidator:
                    "The name field should have at least 2 chars",
                  maxLengthValidator: "The name field should have max 20 chars"
                }}
              />
            </FormGroup>

            {/* SURNAME */}
            <FormGroup>
              <Label for="surname">Surname</Label>
              <Control.text
                id="surname"
                model=".surname"
                className="form-control mb-1"
                placeholder="Your Surname"
                validators={{
                  requiredValidator,
                  minLengthValidator: minLengthValidator(3),
                  maxLengthValidator: maxLengthValidator(15)
                }}
              />

              <Errors
                model=".surname"
                show={{ touched: true, focus: false }}
                className="form-error-message"
                component="li"
                messages={{
                  requiredValidator: "Required",
                  minLengthValidator:
                    "The surname field should have at least 3 chars",
                  maxLengthValidator:
                    "The surname field should have max 15 chars"
                }}
              />
            </FormGroup>

            {/* EMAIL */}
            <FormGroup>
              <Label for="email">
                Email &#32;{" "}
                <MdInfoOutline style={{ marginBottom: "2px" }} id="infoEmail" />
                <Tooltip
                  placement="top"
                  isOpen={this.state.tooltipOpenEmail}
                  target="infoEmail"
                  toggle={this.toggleEmail}
                >
                  E.G. yourname@gmail.com
                </Tooltip>
              </Label>
              <Control.text
                id="email"
                model=".email"
                className="form-control mb-1"
                placeholder="Your email"
                validators={{
                  emailValidator
                }}
              />

              <Errors
                model=".email"
                show={{ touched: true, focus: false }}
                className="form-error-message"
                component="li"
                messages={{
                  emailValidator: "The email should be a proper email "
                }}
              />
            </FormGroup>

            {/* PASSWORD */}
            <FormGroup>
              <Label for="password">Password</Label>
              <Control.text
                id="password"
                model=".password"
                className="form-control mb-1"
                placeholder="Your password"
                validators={{
                  passwordValidator,
                  minLengthValidator: minLengthValidator(8)
                }}
              />

              <Errors
                model=".password"
                show={{ touched: true, focus: false }}
                className="form-error-message"
                component="li"
                messages={{
                  minLengthValidator:
                    "Password should contain at least 8 character!",
                  passwordValidator:
                    "Password should contain at least 1 digit and at least 1 letter!"
                }}
              />
            </FormGroup>

            {/* AGE */}
            <FormGroup>
              <Label for="age">Your Age</Label>
              <Control.text
                id=".age"
                type="number"
                model=".age"
                className="form-control mb-1"
                placeholder="Your age"
                validators={{
                 requiredValidator,
                  minAgeValidator,
                  maxAgeValidator
                }}
              />

              <Errors
                model=".age"
                show={{ touched: true, focus: false }}
                className="form-error-message"
                component="li"
                messages={{
                  minAgeValidator: "You Must Be 18+",
                  maxAgeValidator: "Do you really have more than 110 years?",
                  requiredValidator: "Required!"

                }}
              />
            </FormGroup>

            {/* STREET ADDRESS */}
            <FormGroup>
              <Label for="streetaddress">Your Street Address</Label>
              <Control.text
                id=".streetaddress"
                model=".streetaddress"
                className="form-control mb-1"
                placeholder="Your streetaddress"
                validators={{
                  requiredValidator
                }}
              />
              <Errors
                model=".streetaddress"
                show={{ touched: true, focus: false }}
                className="form-error-message"
                component="li"
                messages={{
                  requiredValidator: "Required!"
                }}
              />
            </FormGroup>

            {/* CITY */}
            <FormGroup>
              <Label for="city">Your City </Label>
              <Control.text
                id=".city"
                model=".city"
                className="form-control mb-1"
                placeholder="Your city"
                validators={{
                  requiredValidator
                }}
              />
              <Errors
                model=".city"
                show={{ touched: true, focus: false }}
                className="form-error-message"
                component="li"
                messages={{
                  requiredValidator: "Required!"
                }}
              />
            </FormGroup>

            {/*ZIP CODE */}
            <FormGroup>
              <Label for="zipcode">
                Postal/ZIP Code {" "}
                <MdInfoOutline style={{ marginBottom: "2px" }} id="infoZip" />
                <Tooltip
                  placement="top"
                  isOpen={this.state.tooltipOpen}
                  target="infoZip"
                  toggle={this.toggle}
                >
                  Code that identify your city, E.G. 75100
                </Tooltip>
              </Label>
              <Control.text
                id=".zipcode"
                model=".zipcode"
                className="form-control mb-1"
                placeholder="Your zipcode"
                validators={{
                  requiredValidator,
                  zipValidator
                }}
              />
              <Errors
                model=".zipcode"
                show={{ touched: true, focus: false }}
                className="form-error-message"
                component="li"
                messages={{
                  requiredValidator: "Required!",
                  zipValidator: "Incorrect Zip Code, must have only 5 digit"
                }}
              />
            </FormGroup>

            {/* SUBMIT */}
            <Control.button
              className="btn btn-secondary mr-2"
              model="local"
              disabled={{ valid: false }}
            >
              Submit
            </Control.button>

            {/* RESET */}
            <Control.reset
              className="btn btn-outline-secondary"
              model="local"
              type="reset"
            >
              Reset
            </Control.reset>
          </LocalForm>
        </div>
      </div>
    );
  }
}
