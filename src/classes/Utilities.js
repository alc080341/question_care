export default class Utilities
{
	/** 
	*	Takes input of two buttons of True and False and sends which button is active based on the input val
	*/  
	changeButtonBoolean(val)
	{
		let trueorfalse;
		let btn1;
		let btn2;
		if(val)
		{
			btn1 = 'answer_button';
			btn2 = 'no_answer_button';
			trueorfalse = true;
		}
		else
		{
			btn1 = 'no_answer_button';
			btn2 = 'answer_button';
			trueorfalse = false;
		}

		let returnState = {
			btn1: btn1,
			btn2: btn2,
			trueorfalse: trueorfalse
		}
		return returnState;
	}


	/** 
	* 	Function to show/hide a button
	*/  
	changeButton(event)
	{
		if (event.target.value.trim().length > 0)
		{
			return { submitBtn: 'btn_show' };	
		}
		else
		{
			return { submitBtn: 'btn_hide' };
		}

	}
}