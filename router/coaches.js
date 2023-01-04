const coachesController = require('../controller/coaches');
const coachesRouter = require('koa-router')({
    prefix: '/coaches'
});

coachesRouter.get('/', coachesController.getcoaches);                           // Displays all coaches in database
coachesRouter.get('/:coach_id_number', coachesController.getCoachesById);       // Displays a single coach by Id number
coachesRouter.put('/:coach_id_number', coachesController.updateCoachById);      // Update/Replace
coachesRouter.delete('/:coach_id_number', coachesController.deleteCoach);       // Deletes a coach

module.exports = coachesRouter;