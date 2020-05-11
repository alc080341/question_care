export default class Questionnaires
{

	addQuestionnaire(json)
	{
		return fetch(`/addquestionnaire` , {
			method: "POST", 
			mode: "cors", 
			cache: "no-cache", 
			credentials: "same-origin",  
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(json), 
		})
		.then((response) => {
			if(response.ok) {
				return response.json();
			} else {
				throw new Error('Server response wasn\'t OK');
			}
		})
		.then(obj => {
			if(obj.msg === 'success')
			{
				let question = 
				{
					questionnaireID: obj.id,
					question: 'This is an example question',
					message: '',
					trueorfalse: false,
					sequencenumber: 1 
				}
				return question
			}
		})
		.then(json =>
		{
			return fetch(`/addquestion` , {
				method: "POST", 
				mode: "cors", 
				cache: "no-cache", 
				credentials: "same-origin",  
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(json), 
			})
		})
		.then((response) => {
			if(response.ok) {
				return response.json();
			} else {
				throw new Error('Server response wasn\'t OK');
			}
		});
	}

	addQuestion(json)
	{
		return fetch(`/addquestion` , {
			method: "POST", 
			mode: "cors", 
			cache: "no-cache", 
			credentials: "same-origin",  
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(json), 
		})
		.then((response) => {
			if(response.ok) {
				return response.json();
			} else {
				throw new Error('Server response wasn\'t OK');
			}
		})
	}

	deleteQuestionnaire(ID)
	{
		return fetch(`/deletequestionnaire/${ID}` , {})
		.then((response) => {
			if(response.ok) {
				return response.json();
			} else {
				throw new Error('Server response wasn\'t OK');
			}
		});
	}

	deleteQuestion(ID, quesid)
	{
		return fetch(`/deletequestion/${ID}/${quesid}` , {})
		.then((response) => {
			if(response.ok) {
				return response.json();
			} else {
				throw new Error('Server response wasn\'t OK');
			}
		});
	}

	editQuestionnaire(json)
	{
		return fetch(`/updatequestionnaire` , {
			method: "POST", 
			mode: "cors", 
			cache: "no-cache", 
			credentials: "same-origin",  
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(json), 
		})
		.then((response) => {
			if(response.ok) {
				return response.json();
			} else {
				throw new Error('Server response wasn\'t OK');
			}
		});
	}

	editQuestions(json)
	{
		return fetch(`/updatequestions` , {
			method: "POST", 
			mode: "cors", 
			cache: "no-cache", 
			credentials: "same-origin",  
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(json), 
		})
		.then((response) => {
			if(response.ok) {
				return response.json();
			} else {
				throw new Error('Server response wasn\'t OK');
			}
		});
	}

	getQuestionnaires(order)
	{
		return fetch(`/getquestionnairelist/${order}`, {})
		.then((response) => {
			if(response.ok) {
				let a = response.json()
				console.log(a);
				return a;
			} else {
				throw new Error('Server response wasn\'t OK');
			}
		})
	}

	getQuestionnaire(ID)
	{
		return fetch(`/viewquestionnaire/${ID}` , {})
		.then((response) => {
			if(response.ok) {
				return response.json();
			} else {
				throw new Error('Server response wasn\'t OK');
			}
		})
	}


	sortQuestions(ques)
	{
		qSort(ques);
		
		function qSort(ques)
		{
			return qsHelper(ques, 0, ques.length-1);
		}

		function qsHelper(ques, first, last)
		{
			let splitpoint;
			if(first < last)
			{
				splitpoint = partition(ques, first, last);
				qsHelper(ques, first, splitpoint-1);
				qsHelper(ques, splitpoint+1, last);
			}
		}

		function partition(ques, first, last)
		{
			let pivotvalue = ques[first].sequencenumber;
			let lm = first + 1;
			let rm = last;
			let done = false;
			let temp;

			while(!done)
			{
				while (lm <= rm && ques[lm].sequencenumber <= pivotvalue)
				{
					lm = lm + 1;
				}
				while (ques[rm].sequencenumber >= pivotvalue && rm >= lm)
				{
					rm = rm - 1;		
				}
				if (rm < lm)
				{
					done = true;
				}
				else
				{
					temp = ques[lm];
					ques[lm] = ques[rm];
					ques[rm] = temp;
				}
			}
			temp = ques[first];
			ques[first] = ques[rm];
			ques[rm] = temp;
			return rm;
		}

		return ques;
	}


}

