import React, { Component } from 'react';
import Utilities from '../classes/Utilities';

class Editquestion extends React.Component
{


	state = {
		question: this.props.question,
		submitBtn: 'btn_show',
		selectedOption: this.props.question.sequencenumber,
		options: Array.from(Array(this.props.questionsLen), (x, index) => index + 1),
		popupDelete: 'def_popup_hide',
		popupBGDel: 'def_popup_hide',
		deleteBtn: ''
	}



	componentDidMount()
	{
		let btn;
		if(this.props.questionsLen < 2)
		{
			btn = 'none';
		}
		else
		{
			btn = 'inline-block';
		}
		this.setState({
			deleteBtn: btn
		});


	}

	editQuestion = (event) =>
	{
		event.preventDefault();
		this.props.editQuestions(	
			this.refs.question.value, 
			this.state.question.sequencenumber,
			this.refs.sequencenumber.value,
			this.state.question.trueorfalse
			);
	}


	changeButton = (val) =>
	{
		let q = this.state.question;
		let utilities = new Utilities();
		let result = utilities.changeButtonBoolean(val);
		q.bt1 = result.btn1;
		q.bt2 = result.btn2;
		q.trueorfalse = result.trueorfalse;
		this.setState({
			question: q
		});
	}

	handleChange(event) {
		this.setState({selectedOption: event.target.value});
	}

	togglePopup = (val) =>
	{
		if(this.props.questionsLen > 1)
		{
			this.props.togglePopup(0, this.props.index);
			let popup = (val) ? 'def_popup_show' : 'def_popup_hide';
			let popupBG = (val) ? 'def_popup_background' : 'def_popup_hide';
			this.setState({
				popupDelete: popup,
				popupBGDel: popupBG
			});
		}
	}


	render()
	{
		const props = this.props;
		return (
			<div>
			<div className={props.popupArr[props.index]}>
			<form onSubmit={this.editQuestion.bind(this)}>
			<div>
			<p>Set question position and details</p>
			<select 
			ref='sequencenumber'
			defaultValue={this.state.question.sequencenumber} 
			onChange={this.handleChange.bind(this)}>
			{this.state.options.map((option) => 
				<option key={option}>{option}</option>)}
			</select>
			<input type='text'
			ref='question'
			placeholder='Enter a question' 
			minLength='1'
			maxLength='100'
			defaultValue={this.state.question.question}
			onChange={(val) => props.changeBtnState(val, props.index)}
			/>
			</div>
			<div>
			<p>Set correct answer</p>
			<button type='button' onClick={() => this.changeButton(1)} className={props.question.bt1}>True</button>
			<button type='button' onClick={() => this.changeButton(0)} className={props.question.bt2}>False</button>
			</div>
			<br/>
			<br/>
			<button type='submit' className='def_button' style={{ display: props.btnArray[props.index] }}>SAVE</button> 	
			<button type='button' className='def_button' onClick={() => this.togglePopup(1)} style={{ display: this.state.deleteBtn }}>DELETE</button> 	
			<button type='button' className='def_button' onClick={() => props.togglePopup(0, props.index)}>CANCEL</button> 	
			<br/>
			<br/>
			</form>
			</div>
			<div className={this.state.popupBGDel}>
			</div>
			<div className={this.state.popupDelete}>
			<h2>Are you sure?</h2>
			<button type='button' onClick={() => this.props.deleteQuestion(props.question.sequencenumber)} className='def_button'>YES, DELETE</button> 	
			<button className='def_button' onClick={() => this.togglePopup(0)}>CANCEL</button> 				
			</div>
			</div>
			)
	}
}



export default Editquestion;