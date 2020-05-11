import React, { Component } from 'react';
import Questionnaires from '../classes/Questionnaires';
import '../App.css';
import {
	NavLink
} from "react-router-dom";


class Viewquestionnaireslist extends Component {

	state = { 
		questionnaires: [],
		quesCore: new Questionnaires(),
		sortBtn: 'DESCENDING', 
		search: ''
	}

	componentDidMount()
	{
		this.state.quesCore
		.getQuestionnaires('ASCENDING')
		.then(obj => {
			this.setState( {questionnaires: obj} );
		});
	}

	changeButton = () => {
		let btnState = this.state.sortBtn;
		let order = btnState;
		if(btnState === 'DESCENDING')
		{
			btnState = 'ASCENDING';
		}
		else
		{

			btnState = 'DESCENDING';
		}
		this.state.quesCore
		.getQuestionnaires(order)
		.then(obj => {
			this.setState( {
				questionnaires: obj,
				sortBtn: btnState
			} );
		});
	}


	updateSearch = (event) => {
		this.setState({search: event.target.value.substr(0,20)});
	}



	render() {
		let questionnaires = this.state.questionnaires;
		let filteredQues = questionnaires.filter(
			(q) => {

				return q.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
			}
			);

		if(questionnaires.length < 1)
		{
			return (
				<div className='no_ques_message'>
					<p>There are no questionnaires at the moment</p>
				</div>
			)

		}

		else
		{

		return (
			<div className='view_questionnaires_list'>
			<h2>QUESTIONNAIRES LIST</h2>
			<input
			type='text'
			value={this.state.search}
			onChange={this.updateSearch.bind(this)}
			placeholder='search by questionnaire name'
			/>
			<br/>
			<br/>
			<button onClick={this.changeButton} className='def_button'>SORT {this.state.sortBtn}</button>
			<ul>
			{filteredQues.map((ques) => 
				<li key={ques.ID}>
				<div>
				<p>Title: {ques.name}</p>
				<p>Author: {ques.author}</p>
				<NavLink to={`/Viewquestionnaire/${ques.ID}/`}>View this questionnaire</NavLink>
				</div>
				</li>
				)}
			</ul>
			</div>
			);
	}
	}
}

export default Viewquestionnaireslist;
