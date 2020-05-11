import React, { Component } from 'react';
import Questionnaires from '../classes/Questionnaires';
import Displayquestions from './Displayquestions';

class Viewquestionnaire extends Component {

	state = { 
		quesCore: new Questionnaires(),
		popup: 'def_popup_hide',
		popupBG: 'def_popup_hide',
	}

	componentDidMount()
	{
		this.state.quesCore
		.getQuestionnaire(this.props.match.params.id)
		.then(obj => {
			this.setState( {questionnaire: obj, questions: obj.questions} );
		});
	}

	assessQuestions = (oldState, newState) =>
	{
		let refer = true;
		let i;
		while((i < oldState.length) && !refer)
		{
			if (oldState[i] !== newState[i])
			{
				refer = false;
			}
			i++;
		}
	}

	editQuestionnaire = () =>
	{
		this.props.history.push(`/editQuestionnaire/${this.props.match.params.id}/`);	
	}

	deleteQuestionnaire = () =>
	{
		this.state.quesCore
		.deleteQuestionnaire(this.props.match.params.id)
		.then(obj => {
			this.setState({ popup: 'def_popup_hide' });
			this.changeView();
		});
	}


	togglePopup = (val) =>
	{
		let toggle = [
		[(val) ? 'def_popup_show' : 'def_popup_hide'],
		[(val) ? 'def_popup_background' : 'def_popup_hide'] 
		];
		this.setState({ popup: toggle[0],
			popupBG: toggle[1]});
	}


	changeView = () =>
	{
		this.props.history.push('/');	
	}


	render() {

		if (!this.state.questionnaire) 
		{
			return <div>Loading</div>
		}
		else
		{
			const ques = this.state.questionnaire;
			return (
				<div>
				<div className='def_container'>
				<h2>{ques.name}</h2>
				<Displayquestions 
				questions={this.state.questions} 
				message={this.state.questionnaire.message}/>
				</div>
				<div className='admin_functions'>
				<button onClick={this.editQuestionnaire} className="def_button">Edit this questionnaire</button>
				<button onClick={() => this.togglePopup(true, 'Are you sure?')} className="def_button">Delete this questionnaire</button>
				</div>
				<div className={this.state.popupBG}></div>
				<div className={this.state.popup}>
				<h2>Are you sure?</h2>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<button onClick={this.deleteQuestionnaire} className='def_button'>DELETE</button>
				<button onClick={() => this.togglePopup(false)} className='def_button'>CANCEL</button>
				</div>
				</div>
				);
		}	
	}
}

export default Viewquestionnaire;
