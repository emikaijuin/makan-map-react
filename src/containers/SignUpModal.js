import React, { Component } from "react";
import { Dialog, Input } from "@material-ui/core";
import axios from "axios";
import UserAuth from "../helpers/UserAuth";
import humps from "humps";

class SignUpModal extends Component {
  state = {
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/api/v1/users", {
        user: {
          ...humps.decamelizeKeys(this.state.user)
        }
      })
      .then(result => {
        UserAuth.signIn(
          {
            email: this.state.user.email,
            password: this.state.user.password
          },
          this.props.userSignedIn
        );
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  handleInputChange = event => {
    const userState = { ...this.state.user };
    userState[event.target.name] = event.target.value;
    this.setState({ user: { ...userState } });
  };

  render() {
    return (
      <Dialog open={this.props.isOpen} onClose={this.props.handleClose}>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <Input
              placeholder="First Name"
              name="firstName"
              onChange={this.handleInputChange}
              value={this.state.user.firstName}
            />
          </div>
          <div>
            <Input
              placeholder="Last Name"
              name="lastName"
              onChange={this.handleInputChange}
              value={this.state.user.lastName}
            />
          </div>
          <div>
            <Input
              placeholder="Email"
              name="email"
              onChange={this.handleInputChange}
              value={this.state.user.email}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.user.password}
            />
          </div>
          <div>
            <Input type="submit">Sign Up</Input>
          </div>
        </form>
      </Dialog>
    );
  }
}

export default SignUpModal;
