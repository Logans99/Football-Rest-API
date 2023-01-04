const db = require('../database/connection');

class GameController {

    // a VIEW function that shows the game the raiders will play next
    static nextRaidersGame(ctx) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Next_Game_For_Raiders;';
            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        });
    }

    
    static getGames(ctx) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Games;';
            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        });
    }
    

    // Displays game information based on a search with game_id
    static getGameById(ctx) { // Shows just the games by id
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Games WHERE game_id = ?;';
            db.query(
                {
                    sql: query,
                    values: [ctx.params.game_id]
                }, (err, res) => {
                    if (err) {
                        ctx.status = 200;
                        ctx.body = err.sqlMessage ?? 'Unknown error!';
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 200;
                    resolve();
                });
        });
    }

    static addNewGame(ctx) {
        return new Promise((resolve, reject) => {
            const game = ctx.request.body;
            const query = `
                INSERT INTO Games
                VALUES (?, ?, ?, ?, ?, ?);`;
            db.query(
                {
                    sql: query,
                    values: [game.date, game.audience, game.location, game.game_id, game.home_team, game.away_team]
                }, (err, res) => {
                if(err) {
                    ctx.status = 400;
                    ctx.body = err.sqlMessage ?? 'Unknown error!';
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 201;
                resolve();
            });
        });
    }

    static addPlayerToGame(ctx) {
        return new Promise((resolve, reject) => {
            const game = ctx.request.body;
            const query = `
                INSERT INTO Player_Game
                VALUES (?, ?, ?, ?);`;
            db.query(
                {
                    sql: query,
                    values: [game.id_number, game.date, game.home_team, game.away_team]
                }, (err, res) => {
                if(err) {
                    ctx.status = 400;
                    ctx.body = err.sqlMessage ?? 'Unknown error!';
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 201;
                resolve();
            });
        });
    }

    static updateGameById(ctx) {
        return new Promise((resolve, reject) => {
            const game = ctx.request.body;
            const query = `
                UPDATE Games 
                SET date = ?,
                    audience = ?,
                    location = ?,
                    home_team = ?,
                    away_team = ?
                WHERE game_id = ?;`;
            db.query(
                {
                    sql: query,
                    values: [game.date, game.audience, game.location, game.home_team, game.away_team, ctx.params.game_id]
                }, (err, res) => {
                if(err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 201;
                resolve();
            });
        });
    }

    static updateGameAudienceById(ctx) {
        return new Promise((resolve, reject) => {
            const game = ctx.request.body;
            const query = `
                UPDATE Games 
                SET audience = ?
                WHERE game_id = ?;`;
            db.query(
                {
                    sql: query,
                    values: [game.audience, ctx.params.game_id]
                }, (err, res) => {
                if(err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 201;
                resolve();
            });
        });
    }

    static deletePlayerFromGames(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM Player_Game
                WHERE id_number = ?;`;
            db.query(
                {
                    sql: query,
                    values: [ctx.params.id_number]
                }, (err, res) => {
                if(err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 204;
                resolve();
            });
        });
    }

    static deleteGame(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM Games
                WHERE game_id = ?;`;
            db.query(
                
                {
                    sql: query,
                    values: [ctx.params.game_id]
                }, (err, res) => {
                if(err) {
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 204;
                resolve();
            });
        });
    }
}

module.exports = GameController;