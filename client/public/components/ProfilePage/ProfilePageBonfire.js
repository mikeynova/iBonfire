import React, {Component} from 'react';
import { connect } from 'react-redux';
import { allActions } from '../App';

class ProfilePageBonfire extends Component {
	handleBonfireMouse() {
		this.props.changeBonfirePopupData(this.props.data);
		$('.ProfilePageBonfirePopup').addClass('animateLeft');
		$('.ProfilePageBonfirePopup').removeClass('animateRight');
	}

	render() {
		return (
			<div className="BonfireEntry" onMouseOver={this.handleBonfireMouse.bind(this)}>
				<img className="BonfireEntryImage" src="../../media/newBonfire.png"/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		bonfire: state.bonfire,
		facebook: state.facebook,
		profile: state.updateUser
	}
};

export default connect(mapStateToProps, allActions)(ProfilePageBonfire);
