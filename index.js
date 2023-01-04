const koa = require('koa');
const koajson = require('koa-json');
const koabodyparser = require('koa-bodyparser');
const defaultRouter = require('./router/default.js');
const api = new koa();

const API_PORT = 8067;

api.use(async (ctx, next) => {
    await next() // --- Executes Thing Two
    const responseTime = ctx.response.get('X-Response-Time');
    console.log(`Type: ${ctx.method} Status: ${ctx.status} Path: ${ctx.url} RT: ${responseTime}ms`);
});

// Thing Two
api.use(async (ctx, next)=>{
    const startTime = Date.now();
    await next(); // ---> Executes Thing Three
    const responseTime = Date.now() - startTime;
    ctx.set('X-Response-Time', responseTime);
});

// Thing Three
api.use(async (ctx, next)=> {
    try {
        await next();
    } catch (e) {
        console.log(`Path: ${ctx.url} Status: ${ctx.status} Error: ${e.sqlMessage ?? 'Unknown error!'}`)
    }
});

api.use(koajson());
api.use(koabodyparser());

defaultRouter(api);
/*
module.exports = api => {
    api.use(defaultRouter.routes());
    api.use(defaultRouter.allowedMethods());
}
*/

api.listen(API_PORT); // Should be LAST line in index.js