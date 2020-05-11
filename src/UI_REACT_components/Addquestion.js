import React, { Component } from 'react';
import Questionnaires from '../classes/Questionnaires';
import Utilities from '../classes/Utilities';

class Addquestion extends React.Component
{

	state = {
		submitBtn: 'btn_hide',
		btn1: 'no_answer_button',
		btn2: 'no_answer_button',
		trueorfalse: false
	}

	addQuestion = (event) =>
	{
		event.preventDefault();
		this.props.addQuestion(	
			this.refs.question.value, 
			this.state.trueorfalse
			);
	}


	changeButton = (val) =>
	{	
		let utilities = new Utilities();
		let result = utilities.changeButtonBoolean(val)
		this.setState({
			btn1: result.btn1,
			btn2: result.btn2,
			trueorfalse: result.trueorfalse
		});
	}


	changeFormState = (event) =>
	{
		let utilities = new Utilities();
		this.setState(utilities.changeButton(event));
	}


	handleChange(event) {
		this.setState({selectedOption: event.target.value});
	}


	render()
	{
		const props = this.props;
		return (
			<div className={props.popup[1]}>
			<form onSubmit={this.addQuestion.bind(this)}>
			<div>
			<p>Set question</p>
			<input type='text'
			ref='question'
			placeholder='Enter a question' 
			minLength='1'
			maxLength='100'
			defaultValue='Enter a question'
			onChange={(val) => this.changeFormState(val, props.index)}
			/>
			</div>
			<div>
			<p>Set correct answer</p>
			<button type='button' onClick={() => this.changeButton(1)} className={this.state.btn1}>True</button>
			<button type='button' onClick={() => this.changeButton(0)} className={this.state.btn2}>False</button>
			</div>
			<button type='submit' className={this.state.submitBtn}>SAVE QUESTION</button> 	
			</form>
			<button type='cancel' className='def_button' onClick={() => props.togglePopup(false, props.index)}>CANCEL</button> 	

			</div>
			)
	}
}



export default Addquestion;