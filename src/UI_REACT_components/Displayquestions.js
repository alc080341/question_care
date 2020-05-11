import React, { Component } from 'react';
import Utilities from '../classes/Utilities';


class Displayquestions extends Component {

	state = 
	{ 
		questions: this.props.questions,
		initBtnVals: [],
		curBtnVals: [],
		submitBtn: 'btn_hide',
		questionList: 'questions_list_show',
		resultArea: 'result_area_hide',
		assessment: '',
		answered: 0
	}

	componentDidMount()
	{
		this.initialState = this.state;
		this.mapButtonVals();
	}
	
	mapButtonVals = () =>
	{
		let curVals = [];
		let newVals = [];
		let ques = this.props.questions;
		ques.forEach((q) => {
			q.bt1 = 'no_answer_button';
			q.bt2 = 'no_answer_button';
			if(q.trueorfalse)
			{
				curVals.push(true);
				newVals.push([]);
			}
			else
			{
				curVals.push(false);
				newVals.push([]);
			}
		});
		this.setState({ 
			initBtnVals: curVals, 
			curBtnVals: newVals, 
			questions: ques, 
			answered: 0 });
	}

	changeButton = (num, val) =>
	{
		let newAns = false;
		let ques = this.state.questions;
		let q = ques[num];
		let vals = this.state.curBtnVals;
		if (vals[num].length < 2) newAns = true;
		let utilities = new Utilities();
		let result = utilities.changeButtonBoolean(val);
		q.bt1 = result.btn1;
		q.bt2 = result.btn2;
		vals[num] = [result.trueorfalse, 1];
		ques[num] = q;
		this.setState({
			curBtnVals: vals, 
			questions: ques});
		if(newAns)
		{
			this.allAnswered(vals[num].length);
		}
	}

	allAnswered = (val) =>
	{
		if(this.state.answered === this.state.questions.length-1) 
		{
			this.setState({
				submitBtn: 'btn_show',
			})			
		}
		else
		{
			let answered = this.state.answered + 1;
			this.setState({answered: answered});
		}
	}

	assessAnswers = () =>
	{

		this.setState({
			questionList: 'questions_list_hide',
			resultArea: 'result_area_show'
		});
		let initVals = this.state.initBtnVals;
		let newVals = this.state.curBtnVals;
		let i = 0;
		let refer = false;
		let assessment = '';
		while((refer === false) && (i < initVals.length))
		{
			if(initVals[i] !== newVals[i][0])
			{
				refer = true;
				assessment = 'Refer';
			}
			i++;
		}
		if(assessment === '') assessment = 'Pass';

		this.setState({ assessment: assessment });
	}


	resetQuestions = () =>
	{
		this.setState(
		{
			initBtnVals: [],
			curBtnVals: [],
			submitBtn: 'btn_hide',
			questionList: 'questions_list_show',
			resultArea: 'result_area_hide',
			assessment: '',
			answered: 0
		});
		this.mapButtonVals();
	}


	render() {

		return (
			<div>
			<div className={this.state.questionList}>
			<p>Please answer all questions below:</p>
			<ul>
			{this.state.questions.map((ques, index) => 
				<li key={ques.sequencenumber}>
				<div className="questions_list_item">
				<div>
				<p>{ques.sequencenumber}: {ques.question}</p>
				</div>
				<div>
				<button onClick={() => this.changeButton(index, 1)} className={ques.bt1}>True</button><button onClick={() => this.changeButton(index, 0)} className={ques.bt2}>False</button>
				</div>
				</div>
				</li>
				)}
			</ul>
			<div>
			<button onClick={this.assessAnswers} className={this.state.submitBtn}>SUBMIT ANSWERS</button> 	
			</div>
			</div>
			<div className={this.state.resultArea}>
			<h1>Result: {this.state.assessment}</h1>
			<p>{this.props.message}</p>
			<button onClick={this.resetQuestions} className='def_button'>RESET</button>
			</div>
			</div>
			);
	}
}

export default Displayquestions;
