const db = require('../database/connection');

class PlayersController {
    static getPlayers(ctx) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Players;';
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

    static getPlayerById(ctx) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Players WHERE id_number = ?;';
            db.query(
                {
                    sql: query,
                    values: [ctx.params.id_number]
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


    static updatePlayerById(ctx) {
        return new Promise((resolve, reject) => {
            const player = ctx.request.body;
            const query = `
                UPDATE Players
                SET position = ?,
                    name = ?,
                    DOB = ?,
                    contract_length = ?,
                    salary = ?,
                    street = ?,
                    city = ?,
                    state = ?,
                    zip = ?,
                    team_id = ?
                WHERE id_number = ?;`;
            db.query(
                {
                    sql: query,
                    values: [player.position, player.name, player.DOB, player.contract_length, 
                        player.salary, player.street, player.city, player.state, player.zip, player.team_id, ctx.params.id_number]
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

    static deletePlayer(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM Players
                WHERE id_number = ?;`;
            db.query(
                {
                    sql: query,
                    values: [ctx.params.id_number]
                }, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 204;
                    resolve();
                });
        });
    }
}

module.exports = PlayersController;