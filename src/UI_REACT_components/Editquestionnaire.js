import React, { Component } from 'react';
import Questionnaires from '../classes/Questionnaires';
import Utilities from '../classes/Utilities';
import Editquestions from './Editquestions';
import Addquestion from './Addquestion';
import '../App.css';


class Editquestionnaire extends Component {

	state = {
		submitBtn: 'btn_hide',
		quesCore: new Questionnaires(),
		popup: ['def_popup_hide','def_popup_hide'],
		popupBG: ['def_popup_hide', 'def_popup_hide'],
		quesLoaded: false
	}

	componentDidMount()
	{
		this.fetchQuestionnaire();
	}




	fetchQuestionnaire = () =>
	{
		this.state.quesCore
		.getQuestionnaire(this.props.match.params.id)
		.then(obj => {
			this.setState( {questionnaire: obj, questions: obj.questions, quesLoaded: true} );

		});
	}


	addQuestion = (question, btnVal) =>
	{	
		this.state.quesCore
		.getQuestionnaire(this.props.match.params.id)
		.then(obj => {
			this.setState( {questionnaire: obj, questions: obj.questions, quesLoaded: true} );
		let q = {
			questionnaireID: this.props.match.params.id,
			sequencenumber: this.state.questions.length+1,
			question: question,
			trueorfalse: btnVal
		}
		this.state.quesCore
		.addQuestion(q)
		.then(obj => {
			if(obj.msg === 'success')
			{
				this.setState({
					quesLoaded: false
				})
				this.togglePopup(1);
				this.fetchQuestionnaire();			
			}
			else
			{
				alert('Sorry,there has been a problem');
			}
		});
		});
	}

	changeFormState = (event) =>
	{
		let utilities = new Utilities();
		this.setState(utilities.changeButton(event));
	}

	editQuestionnaire = () =>
	{
		let ques = {
			ID: this.props.match.params.id,
			name: this.refs.title.value,
			message: '' + this.refs.message.value,
			author: 'Chambers Creative'
		}
		this.state.quesCore
		.editQuestionnaire(ques)
		.then(obj => {
			if(obj.msg === 'success')
			{
				this.togglePopup(0);
				this.fetchQuestionnaire();
			}
			else
			{
				alert('Sorry, there has been a problem');
			}
		});

	}
	
	togglePopup = (val, index) =>
	{
		let popups = this.state.popup;
		for(let i = 0; i < popups.length; i++)
		{
			if (i !== index) popups[i] = 'def_popup_hide';
		}
		let toggle = [
		[(val) ? 'def_popup_show' : 'def_popup_hide'],
		[(val) ? 'def_popup_background' : 'def_popup_hide'] 
		];
		popups[index] = toggle[0];
		this.setState({ popup:popups });
	}




	render() {
		if (!this.state.quesLoaded) 
		{
			return <div>Loading</div>
		}
		else
		{
			return (
				<div>
				<div className='def_container'>
				<div className='edit_questionnaire'>
				<h2>{this.state.questionnaire.name}</h2>
				<p>Completion message : {this.state.questionnaire.message}</p>
				<button onClick={() => this.togglePopup(true, 0)} className='def_button'>Edit Title/Message</button>
				<button onClick={() => this.togglePopup(true, 1)} className='def_button'>Add a question</button> 	
				<div className={this.state.popupBG[0]}>
				</div>
				<div className={this.state.popup[0]}>
				<h2>Edit Title/Message</h2>
				<div>
				<form onSubmit={this.editQuestionnaire.bind(this)}>
				<input type='text' 
				ref='title'
				placeholder='Enter a title for the questionnaire' 
				minLength='1'
				maxLength='150'
				defaultValue={this.state.questionnaire.name}
				onChange={this.changeFormState.bind(this)}
				/><br/>
				<input type='text'
				ref='message'
				placeholder='Enter a message to display with result' 
				minLength='1'
				maxLength='200'
				defaultValue={this.state.questionnaire.message}
				/>
				<br/><br/>
				<button className={this.state.submitBtn} type='submit'>SAVE NEW DETAILS</button>
				</form>
				</div>
				<div>
				<button onClick={() => this.togglePopup(false)} className='def_button'>CANCEL</button> 	
				</div>
				</div>
				</div>
				<Editquestions 
				questions={this.state.questions}
				quesID={this.props.match.params.id}
				quesLoaded={this.state.quesLoaded}
				fetchQuestionnaire={this.fetchQuestionnaire}
				/>
				<Addquestion
				index={1}
				popupArr={[]}
				popup={this.state.popup}
				popupBG={this.state.popupBG}
				togglePopup={this.togglePopup}
				addQuestion={this.addQuestion}
				/>
				</div>		
				</div>	
				);
		}
	}
}

export default Editquestionnaire;
