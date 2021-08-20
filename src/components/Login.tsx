import React, { SyntheticEvent } from "react";
import { AuthService } from "../services/AuthService";
import { User } from "../model/Model";
import history from "../utils/history";

interface LoginProps {
  authService: AuthService;
  setUser: (user: User) => void;
}

interface CustomEvent {
  target: HTMLInputElement;
}

interface LoginState {
  userName: string;
  password: string;
  loginAttenpted: boolean;
  loginSuccesfull: boolean;
}

export class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: any) {
    super(props);
    this.setPassword = this.setPassword.bind(this); //nice
    this.setUserName = this.setUserName.bind(this); //nice
    this.handleSubmit = this.handleSubmit.bind(this); //nice
  }

  state: LoginState = {
    userName: "",
    password: "",
    loginAttenpted: false,
    loginSuccesfull: false,
  };

  private setUserName(event: CustomEvent) {
    this.setState({ userName: event.target.value });
  }

  private setPassword(event: CustomEvent) {
    this.setState({ password: event.target.value });
  }

  private async handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const result = await this.props.authService.login(
      this.state.userName,
      this.state.password
    );
    if (result) {
      console.log(result);
      this.setState({
        userName: this.state.userName,
        password: this.state.password,
        loginAttenpted: true,
        loginSuccesfull: true,
      });
      this.props.setUser(result);
      history.push("/profile"); //this changes the route to /profile - you can go back though.
    } else {
      this.setState({
        userName: this.state.userName,
        password: this.state.password,
        loginAttenpted: true,
        loginSuccesfull: false,
      });
      console.log("wrong login");
    }
  }

  render() {
    let loginMessage: any = "";
    if (this.state.loginAttenpted) {
      if (this.state.loginSuccesfull) {
        loginMessage = <label>Login successful</label>;
      } else {
        loginMessage = <label>Login failed</label>;
      }
    }
    return (
      <div>
        <h2>Please login</h2>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.userName} onChange={this.setUserName} />
          <br />
          <input
            value={this.state.password}
            onChange={this.setPassword}
            type="password"
          />
          <br /> <input type="submit" value="Login" />
        </form>
        {loginMessage}
      </div>
    );
  }
}
