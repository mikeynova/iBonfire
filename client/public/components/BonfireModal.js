import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
    
import DownArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import IconButton from 'material-ui/IconButton/IconButton';
import IconMenu from 'material-ui/IconMenu';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class BonfireModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      tag: '',
      correct: {
        color: 'white'
      },
      value: 1
    }
  window.addEventListener("keydown", this.hideModal.bind(this));
  }
  
  hideModal(event) {
    if(event.keyCode === 27) {
      this.props.changeBonfireModalClassName('fadeOut');
    }
  }

  descriptionBox(event) {
    if(event.keyCode === 13) {
      this.modalValidation('hit enter');
    }
  }

  componentWillReceiveProps(props) {
    if(props.changeClass.changed.bonfireModal === 'hidden') {
      this.setState({
        value: 1
      })
    }
    if(props.changeClass.changed.bonfireModal === 'hidden') {
      this.setState({
        copyDescription: this.state.description,
        description: ''
      })
    }
  }

  modalValidation(value) {
  let flag = true;
    if(value === 'hit enter') {
      if(this.state.description.length < 3 && this.state.value === 1 || this.state.description.length < 3 && value  === undefined) {
      flag = false;
      this.props.changeBonfireModalClassName('badSubmission');
      this.setState({
            description: ''
            })
      } else if(this.state.description.length > 3 && this.state.value  === 1 || this.state.description.length > 3 && value  === undefined) {
        flag = false;
        this.props.changeBonfireModalClassName('badDropDown');
        this.setState({
              description: ''
            })
      } else if(this.state.value  === 1 || this.state.value  === undefined) {
        flag = false;
        this.props.changeBonfireModalClassName('badDropDown');
      } else if(this.state.description.length < 3) {
        flag = false;
        this.props.changeBonfireModalClassName('badDescription');
        this.setState({
              description: ''
            })
      }
    } else if(this.state.description.length < 3 && value === 1 || this.state.description.length < 3 && value === undefined) {
      flag = false;
      this.props.changeBonfireModalClassName('badSubmission');
      this.setState({
            description: ''
          })
      } else if(this.state.description.length > 3 && value === 1 || this.state.description.length > 3 && value === undefined) {
        flag = false;
        this.props.changeBonfireModalClassName('badDropDown');
        this.setState({
              description: ''
            })
      } else if(value === 1 || value === undefined) {
        flag = false;
        this.props.changeBonfireModalClassName('badDropDown');
      } else if(this.state.description.length < 3) {
        flag = false;
        this.props.changeBonfireModalClassName('badDescription');
        this.setState({
              description: ''
            })
      }

    if(flag) {
      const sendLocation = this.props.convertCoordsToLocation(String(this.props.currentMarker.lat) + ',' + String(this.props.currentMarker.lng));
      this.props.changeBonfireModalClassName("fadeOut")
        return sendLocation
        .then((response) => {
          let descriptionArr = this.state.copyDescription.split(' ');
          let words = [];
          descriptionArr.forEach((word) => {
            let newWord = word.replace(/(.{36})/g, "$1\n");
            words.push(newWord);
          });
          return this.props.sendDescription({
            description: words.join(' '),
            tags: this.state.tag,
            cityState: response.data.results[4].formatted_address,
            latitude: String(this.props.currentMarker.lat),
            longitude: String(this.props.currentMarker.lng),
            createdBy: this.props.facebook.currUser.id
          })
         }) 
        .then(() => {
          return this.setState({
            description: '',
            value: 1
          })
        })  
    }
  }

  handleDropDown(event, index, value) {
    this.setState({value: value, tag: event.target.innerText});
    this.modalValidation(value);
  }

  render() {
    return (
      <div className={this.props.changeClass.changed.bonfireModal}>
        <h1 id="CreateBonfireHeader">Create New Bonfire</h1>
        <div id={this.props.changeClass.changed.modelTextBox}>
            <TextField
              underlineFocusStyle={{borderColor: '#C3B1AB'}}
              hintStyle={this.props.changeClass.changed.textColor}
              inputStyle={{color:'black',fontFamily:'raleway',fontWeight:'300'}}
              hintText={this.props.changeClass.changed.textHint}
              value={this.state.description}
              onChange={e => this.setState({description: e.target.value})}
              onKeyDown={this.descriptionBox.bind(this)}
            />
          <br/>   
          <DropDownMenu maxHeight={250} value={this.state.value} onChange={this.handleDropDown.bind(this)} labelStyle={this.props.changeClass.changed.dropDownColor}>

              <MenuItem style={{"maxHeight": "280px", "top": "447px"}} className='dropDownList' style={{color: 'black'}} value={1} primaryText="Tag your Bonfire" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={2} primaryText="#beer" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={3} primaryText="#sports" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={4} primaryText="#politics" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={5} primaryText="#random" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={6} primaryText="#fashion" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={7} primaryText="#medicine" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={8} primaryText="#tech" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={9} primaryText="#environment" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={10} primaryText="#adult" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={11} primaryText="#coffee" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={12} primaryText="#dictators" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={13} primaryText="#hats" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={14} primaryText="#jayKwerrie" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={15} primaryText="#cats" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={17} primaryText="#gambling" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={18} primaryText="#dogs" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={19} primaryText="#travel" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={20} primaryText="#student" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={21} primaryText="#food" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={22} primaryText="#agingTerribly" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={23} primaryText="#music" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={24} primaryText="#dancing" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={25} primaryText="#runnnig" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={26} primaryText="#fire" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={27} primaryText="#fitness" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={28} primaryText="#hotdogs" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={29} primaryText="#murica" />
              <MenuItem className='dropDownList' style={{color: 'black'}} value={30} primaryText="#drumCircle" />

          </DropDownMenu>
        </div>
        <div id="CreateBonfireImage" onClick={() => { this.props.changeBonfireModalClassName('fadeOut'); }}>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    changeClass: state.changeClass,
    markers: state.markers,
    currentMarker: state.currMarker,
    facebook: state.facebook
  }
}

export default connect(mapStateToProps, actions)(BonfireModal);
