var serverController = require('./../controllers/server_controller.js')

module.exports = function(app) {

	app.post('/login', serverController.login);
	app.post('/register', serverController.register);
	app.get('/logout', serverController.logout);
	app.get('/current', serverController.current);
	
	// app.get('/'shows, serverController.shows);


}