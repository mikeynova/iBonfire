import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { facebookInit, checkLoginStatus } from '../../helpers/fbHelper';
import * as actions from '../../actions/index';
import FBLogin from '../FBLogin';
import App from '../App';
import Home from '../Home';

const Wrapper = (CheckedComponent) => {
  return class InitFB extends Component {
    componentWillMount() {
      if(!window.isLoaded) {
        // console.log("Loading Facebook SDK");
        facebookInit();
      }
    }
    componentDidMount() {
      if(window.isLoaded) {
        checkLoginStatus();
        if(!this.props.facebook.currUser.id) {
          console.log('23')
          this.props.getCurrentUser();
        }
      }
      if(!localStorage.getItem('latitude') || !localStorage.getItem('longitude') && !window.gettingLocation) {
        this.props.getLocation();
      }
      this.props.getMarkers();
    }

    render() {
      console.log('window.isLoaded:', window.isLoaded)
      console.log('window.statusChecked:', window.statusChecked)
      console.log('this.props.facebook.loggedIn:', this.props.facebook.loggedIn)

      // if(window.isLoaded && window.statusChecked && !this.props.facebook.loggedIn) {
      //   console.log(34)
      //   return <FBLogin {...this.props} />
      // }


      if(!this.props.facebook.loggedIn) {
        console.log(34)
        return <FBLogin {...this.props} />
      }

      // if(!window.isLoaded || !window.statusChecked || window.gettingLocation) {
      //   console.log(39)
      //   return (
      //     <div className="spinner">
      //       <div className="double-bounce1"></div>
      //       <div className="double-bounce2"></div>
      //     </div>
      //   )
      // }

      // if(this.props.facebook.loggedIn) {
      //   console.log(49)
      //   return <CheckedComponent {...this.props} />
      // }
    }
  }
};

const mapStateToProps = state => {
  return {
    markers: state.markers,
    users: state.users,
    location: state.location,
    facebook: state.facebook
  }
}

const WrappedComponent = (CheckedComponent) => (
  connect(mapStateToProps, actions)(Wrapper(CheckedComponent))
  )

export default WrappedComponent;
