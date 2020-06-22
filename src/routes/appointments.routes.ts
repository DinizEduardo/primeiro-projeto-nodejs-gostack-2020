import { Router } from 'express';
import { isEqual, startOfHour, parseISO } from 'date-fns';
import Appointment from '../Models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked!' });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return response.json(appointment);
});
// isso é o mesmo que
// POST -> http://localhost:3333/appointments

export default appointmentRouter;
