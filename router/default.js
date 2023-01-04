const playersRouter = require('./players');
const gamesRouter = require('./games') 
const coachesRouter = require('./coaches');
const defaultRouter = require('koa-router') ({ 
    prefix: '/api/v1'
});

defaultRouter.get('/', (ctx) => {
    ctx.body = 'Hello World!'
});

defaultRouter.get('/stopshowingthis/:you', (ctx) => {
    ctx.body = `Hello ${ctx.params.you}`
});

defaultRouter.get('/me/:me', (ctx) => {
    ctx.body = `Go Away ${ctx.params.me}`
});

defaultRouter.use(
    playersRouter.routes(),
    gamesRouter.routes(),
    coachesRouter.routes()
);

module.exports = api => {
    api.use(defaultRouter.routes());
    api.use(defaultRouter.allowedMethods());
}