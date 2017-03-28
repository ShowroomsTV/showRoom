var serverController = require('./../controllers/server_controller.js')

module.exports = function(app) {

	app.post('/login', serverController.login);
	app.post('/register', serverController.register);
	app.get('/logout', serverController.logout);
	app.get('/current', serverController.current);

	// app.get('/dashboard', serverController.getQuestions);

	// app.post('/question', serverController.addQuestion);

	// app.get('/question/:id', serverController.showQuestion);
	// app.put('/likes/:answer_id', serverController.addLike);

	// app.post('/answer/:question_id', serverController.addAnswer);
}