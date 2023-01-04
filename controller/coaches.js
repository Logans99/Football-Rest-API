const db = require('../database/connection');

class CoachesController {
    static getcoaches(ctx) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Coaches;';
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

    static getCoachesById(ctx) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Coaches WHERE coach_id_number = ?;';
            db.query(
                {
                    sql: query,
                    values: [ctx.params.coach_id_number]
                }, (err, res) => {
                if(err) {
                    ctx.status = 400;
                    ctx.body = err.sqlMessage ?? 'Unknown error!';
                    reject(err);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        });
    }

    static updateCoachById(ctx) {
        return new Promise((resolve, reject) => {
            const coach = ctx.request.body;
            const query = `
                UPDATE Coaches 
                SET job_title = ?,
                    name = ?,
                    DOB = ?,
                    team = ?
                WHERE coach_id_number = ?;`;
            db.query(
                {
                    sql: query,
                    values: [coach.job_title, coach.name, coach.DOB, coach.team, ctx.params.coach_id_number]
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

    static deleteCoach(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM Coaches
                WHERE coach_id_number = ?;`;
            db.query(
                {
                    sql: query,
                    values: [ctx.params.coach_id_number]
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

module.exports = CoachesController;