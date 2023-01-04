const gameController = require('../controller/games');
const gameRouter = require('koa-router')({
    prefix: '/games'
});

gameRouter.get('/raiders', gameController.nextRaidersGame);              // This is my VIEW example. Can be made for more teams if needed
gameRouter.get('/', gameController.getGames);                            // Shows all scheduled games
gameRouter.get('/:game_id', gameController.getGameById);                 // Displays game by game_id
gameRouter.post('/', gameController.addNewGame);                         // Adds new game
gameRouter.post('/player_game', gameController.addPlayerToGame);         // Adds new player to a game
gameRouter.put('/:game_id', gameController.updateGameById);              // Alter all of a games data
gameRouter.put('/aud/:game_id', gameController.updateGameAudienceById);  // Changes from estimate audience to real audience
gameRouter.delete('/:id_number', gameController.deletePlayerFromGames);  // Removes a player from future games (season ending injury)

module.exports = gameRouter;