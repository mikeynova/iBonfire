import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { facebookInit, checkLoginStatus } from '../helpers/fbHelper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'react-redux';
import * as actions from '../actions/index';
import $ from 'jquery'; 

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick() {
    this.props.facebookLogin();
  }

  handleLearnMoreClick() {
    $('body#iBonfire').removeAttr('id');
    browserHistory.push('/about');
  }

  componentWillMount() {
    if(this.props.facebook.loggedIn) {
      browserHistory.push('/');
    }
  }

  componentDidMount() {
    if(!localStorage.getItem('latitude') || !localStorage.getItem('longitude') && !window.gettingLocation) {
      this.props.getLocation();
    }
  }

  render() {
    return (
      <div className="Login">
        {/* <video  id="bgvid" autoPlay loop muted>
          <source src="../media/Open-Fire/MP4/Open-Fire.mp4" type="video/mp4"/>
          <source src="../media/Open-Fire/WEBM/Open-Fire.webm" type="video/webm"/>
        </video> */}
        <div className="FrontPageBtns">
          <div
            className="fb-login-button"
            data-width=""
            data-size="large"
            data-button-type="continue_with"
            data-layout="default"
            data-auto-logout-link="false"
            data-use-continue-as="false"
          />
          {/* <li>
            <button id="FacebookLoginButton" type="button" onClick={this.handleLoginClick}>Login</button>
          </li> */}
          {/* <li>
            <button id="LearnMoreButton" type="button" onClick={this.handleLearnMoreClick}>More Info</button>
          </li> */}
        </div>
        {/* <div id="Logo">
          <img src="../media/iBonfire.png"/>
        </div> */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    markers: state,
    users: state.users,
    location: state.location,
    facebookUser: state.facebook,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, actions)(Login);