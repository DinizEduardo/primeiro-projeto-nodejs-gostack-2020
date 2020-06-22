import { Router } from 'express';
import { uuid } from 'uuidv4';
import { isEqual, startOfHour, parseISO } from 'date-fns';

const appointmentRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointment[] = [];

appointmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );
  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked!' });
  }

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);
  return response.json(appointment);
});
// isso é o mesmo que
// POST -> http://localhost:3333/appointments

export default appointmentRouter;
