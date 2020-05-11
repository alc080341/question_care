import React, { Component } from 'react';
import Editquestion from './Editquestion';
import Questionnaires from '../classes/Questionnaires';

class Editquestions extends Component {

	state =
	{
		questions: this.props.questions,
		updateBtn: false,
		btnArray: [],
		popupArr: [],
		quesCore: new Questionnaires(),
		deleteMSG: ''
	}

	componentDidMount()
	{
		this.mapButtonVals();
		this.mapPopupvals();
	}


	changeBtnState = (event, index) =>
	{
		let btns = this.state.btnArray;
		let targetbtn = btns[index];
		let res;
		if (event.target.value.trim().length > 0)
		{
			targetbtn = 'inline-block';
			res = true;
		}
		else
		{
			targetbtn = 'none';
			res = false;
		}
		btns[index] = targetbtn;
		this.setState({ 
			updateBtn: res,
			btnArray: btns });
	} 

	deleteQuestion = (id) =>
	{

		this.state.quesCore
		.getQuestionnaire(this.props.quesID)
		.then(obj => {
			this.setState( {questionnaire: obj, questions: obj.questions, quesLoaded: true} );
			let ques = this.state.questions;
			for(let i = id; i < ques.length; i++)
			{
				ques[i].sequencenumber = i;
			}

			let q = new Questionnaires()
			.deleteQuestion(id, this.props.quesID)
			.then(obj => {
				if(obj.msg !== 'error')
				{
					this.editQuestionsUpdate(ques);
				}
				else
				{
					alert('Sorry, there has been a problem');
				}
			});
		});
	}

	editQuestions = (question, curseq, newseq, btnVal) =>
	{ 
		const ques = this.state.questions;
		let newQues = ques;
		newQues[curseq-1].trueorfalse = btnVal;
		newQues[curseq-1].question = question;


		if(curseq !== newseq)
		{
			function difference(curseq, newseq)
			{
				return Math.abs(curseq - newseq)
			}	
			let diff = difference(curseq, newseq);
			if(diff > 1 || diff < -1)
			{
				newQues = filterQues(ques, curseq);
				function filterQues(ele, value) 
				{
					return ele.filter(function(ele){
						return ele.sequencenumber != value;
					});
				}
				let curQues = ques[curseq-1];
				newQues.splice( newseq-1, 0, curQues);
				newQues[newseq-1].sequencenumber = parseInt(newseq);
				if (newseq < curseq-1) 
				{
					for(let i = parseInt(newseq); i < curseq; i++)
					{
						newQues[i].sequencenumber = i+1;
					}
				}
				else if(newseq > curseq+1)
				{
					for(let j = parseInt(curseq)-1; j < newseq; j++)
					{
						newQues[j].sequencenumber = j+1;
					}
				}
			}
			else
			{
				newQues = ques;
				let 
				q1Seq = ques[newseq-1].sequencenumber,
				q2Seq = ques[curseq-1].sequencenumber;
				newQues[newseq-1].sequencenumber = q2Seq;
				newQues[curseq-1].sequencenumber = q1Seq;
			}

			this.editQuestionsUpdate(newQues);
		}
	}

	editQuestionsUpdate = (newQues) =>
	{
		this.setState({questions:[]});
		let q = new Questionnaires()
		.editQuestions(newQues)
		.then(obj => {
			if(obj.msg !== 'error')
			{
				this.state.quesCore
				.getQuestionnaire(this.props.quesID)
				.then(obj => {
					this.setState( { 
						questions: obj.questions,
						btnArray: [],
						popupArr: []
					} );
					this.mapButtonVals();
					this.mapPopupvals();
				});
			}
			else
			{
				console.log('error');
			}
		});


	}

	mapButtonVals = () =>
	{
		let ques = this.state.questions;
		let btnArray = [];
		ques.forEach((q) => {
			btnArray.push('inline-block');
			if(q.trueorfalse)
			{
				q.bt1 = 'answer_button';
				q.bt2 = 'no_answer_button';
			}
			else
			{
				q.bt1 = 'no_answer_button';
				q.bt2 = 'answer_button';
			}
		});
		this.setState({ 
			questions: ques, 
			btnArray: btnArray
		});
	}

	mapPopupvals = () =>
	{
		let ques = this.state.questions.length;
		let popups = [];
		for(let i = 0; i < ques; i++)
		{
			popups.push('def_popup_hide');
		}
		this.setState({ popupArr:popups });
	}

	togglePopup = (val, index) =>
	{
		let popups = this.state.popupArr;
		for(let i = 0; i < popups.length; i++)
		{
			if (i !== index) popups[i] = 'def_popup_hide';
		}
		let toggle = [
		[(val) ? 'def_popup_show' : 'def_popup_hide'],
		[(val) ? 'def_popup_background' : 'def_popup_hide'] 
		];
		popups[index] = toggle[0];
		this.setState({ popupArr:popups, deleteMSG: '' });
	}




	render() {

		return (
			<div>
			<div>
			<h2>Edit questions:</h2>
			<p>Click a question to edit</p>
			<ul>
			{this.state.questions.map((ques, index) => 
				{
					return (
						<li key={ques.sequencenumber}>
						<div 
						className='editable_question_item'
						onClick={() => this.togglePopup(1,index)}
						>
						<div>
						<p>{ques.sequencenumber}. {ques.question}</p>
						</div>
						<div>
						<button className={ques.bt1}>True</button>
						<button className={ques.bt2}>False</button>
						</div>
						</div>
						<Editquestion
						btnArray={this.state.btnArray}
						changeBtnState={this.changeBtnState}
						deleteQuestion={this.deleteQuestion}
						editQuestions={this.editQuestions}
						index={index}
						mapButtonVals={this.mapButtonVals}
						popupArr={this.state.popupArr}
						question={ques}
						questionsLen={this.state.questions.length}
						togglePopup={this.togglePopup}
						/>
						</li>
						);
				}
				)}
			</ul>
			</div>
			</div>
			);
	}
}

export default Editquestions;
