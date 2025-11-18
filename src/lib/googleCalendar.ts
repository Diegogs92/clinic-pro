import { google } from 'googleapis';
import { Appointment } from '@/types';

export interface CalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  status?: 'confirmed' | 'tentative' | 'cancelled';
}

/**
 * Crea un cliente de Google Calendar autenticado
 * @param accessToken Token de acceso OAuth2
 */
export function getCalendarClient(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  return google.calendar({ version: 'v3', auth });
}

/**
 * Convierte un appointment de la app a un evento de Google Calendar
 */
export function appointmentToCalendarEvent(appointment: Appointment): CalendarEvent {
  const startDateTime = new Date(`${appointment.date.split('T')[0]}T${appointment.startTime}`);
  const endDateTime = new Date(`${appointment.date.split('T')[0]}T${appointment.endTime}`);

  let status: 'confirmed' | 'tentative' | 'cancelled' = 'tentative';
  if (appointment.status === 'confirmed' || appointment.status === 'completed') {
    status = 'confirmed';
  } else if (appointment.status === 'cancelled' || appointment.status === 'no-show') {
    status = 'cancelled';
  }

  return {
    summary: `${appointment.patientName} - ${appointment.type}`,
    description: appointment.notes || '',
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'America/Argentina/Buenos_Aires',
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'America/Argentina/Buenos_Aires',
    },
    status,
  };
}

/**
 * Crea un evento en Google Calendar
 */
export async function createCalendarEvent(
  accessToken: string,
  appointment: Appointment
): Promise<string | null> {
  try {
    const calendar = getCalendarClient(accessToken);
    const event = appointmentToCalendarEvent(appointment);

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    return response.data.id || null;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return null;
  }
}

/**
 * Actualiza un evento en Google Calendar
 */
export async function updateCalendarEvent(
  accessToken: string,
  eventId: string,
  appointment: Appointment
): Promise<boolean> {
  try {
    const calendar = getCalendarClient(accessToken);
    const event = appointmentToCalendarEvent(appointment);

    await calendar.events.update({
      calendarId: 'primary',
      eventId: eventId,
      requestBody: event,
    });

    return true;
  } catch (error) {
    console.error('Error updating calendar event:', error);
    return false;
  }
}

/**
 * Elimina un evento de Google Calendar
 */
export async function deleteCalendarEvent(
  accessToken: string,
  eventId: string
): Promise<boolean> {
  try {
    const calendar = getCalendarClient(accessToken);

    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });

    return true;
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    return false;
  }
}
