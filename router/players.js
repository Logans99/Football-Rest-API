const playersController = require('../controller/players');
const playersRouter = require('koa-router')({
    prefix: '/players'
});

playersRouter.get('/', playersController.getPlayers);                       // Displays all players in database
playersRouter.get('/:id_number', playersController.getPlayerById);          // Displays single player by id number
playersRouter.put('/:id_number', playersController.updatePlayerById);    // Updates player information
playersRouter.delete('/:id_number', playersController.deletePlayer);        // Deletes player from database

module.exports = playersRouter;