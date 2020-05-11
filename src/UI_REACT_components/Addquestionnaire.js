import React, { Component } from 'react';
import Questionnaires from '../classes/Questionnaires';
import Utilities from '../classes/Utilities';
import '../App.css';


class Addquestionnaire extends Component {


	state = {
		submitBtn: 'btn_hide'
	}

	changeFormState = (event) =>
	{
		let utilities = new Utilities();
		this.setState(utilities.changeButton(event));
	}

	addQuestionnaire = (event) =>
	{
		event.preventDefault();
		let ques = {
			name: this.refs.title.value,
			message: '' + this.refs.message.value,
			author: 'Chambers Creative'
		}
		let quesCore = new Questionnaires()
		quesCore.addQuestionnaire(ques)
		.then(obj => {
			if(obj.msg === 'success')
			{
				this.props.history.push(`/editquestionnaire/${obj.id}/`);	
			}
			else
			{
				this.props.history.push(`/`);	
			}
		});
	}


	render() {
		return (
			<div>
			<div className='def_container'>
			<h2>Add a questionnaire</h2>
			<form onSubmit={this.addQuestionnaire.bind(this)}>
			<input type='text' 
			ref='title'
			placeholder='Enter a title for the questionnaire' 
			minLength='1'
			maxLength='150'
			name='title'
			onChange= {this.changeFormState.bind(this)}
			/><br/>
			<input type='text'
			ref='message'
			placeholder='Enter a message to display with result' 
			minLength='1'
			maxLength='200'
			/>
			<br/><br/>
			<button className={this.state.submitBtn} type='submit'>Add Questionnaire</button>
			</form>
			</div>
			</div>
			);
	}
}

export default Addquestionnaire;
