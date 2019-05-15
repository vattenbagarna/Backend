const prompts = require('prompts');

const loginHandler	= require('../src/loginHandler.js');
const dbHandler		= require('../src/dbWrapper.js');

const createAccount = async (username, password) => {
	let tryCreateAccount = await dbHandler.dbSimpleStatement(
	    loginHandler.insertUserInDatabase,
	    [await loginHandler.createNewUser(
	        username, password, 1 
	    )]
	);
	
	if (tryCreateAccount == true) {
	    console.log("User successfully crated!");
	} else {
	    console.log("failed to create user!");
	}
	return tryCreateAccount;
};

const createAccountPrompt = async (username, password) => {

	let created = false;

	let questions = [
		{
		    type: 'text',
		    name: 'username',
		    message: 'Username: '
		},
		{
		    type: 'invisible',
		    name: 'password',
		    message: 'Password: '
		}
	];

	while (!created) {
		let response = await prompts(questions);
		created = await createAccount(response.username, response.password);
	}
	process.exit(0);
};

createAccountPrompt();
