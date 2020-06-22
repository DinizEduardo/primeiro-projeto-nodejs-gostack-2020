import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentRouter = Router();

const appointments = [];

appointmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appointments.push(appointment);
  return response.json(appointment);
});
// isso é o mesmo que
// POST -> http://localhost:3333/appointments

export default appointmentRouter;
