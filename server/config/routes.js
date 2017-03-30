var serverController = require('./../controllers/server_controller.js')

module.exports = function(app){

	app.post('/login', serverController.login);
	app.post('/register', serverController.register);
	app.get('/logout', serverController.logout);
	app.get('/current', serverController.current);

	app.get('/allShows', serverController.allShows);
	app.get('/oneShow/:name', serverController.oneShow);
<<<<<<< HEAD
	
=======

>>>>>>> 852c1e01c765385c453679de384de18b9bb9810a
	app.post('/show/favorite', serverController.addFavorite);

}
