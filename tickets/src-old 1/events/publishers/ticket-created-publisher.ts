import { Publisher, Subjects, TicketCreatedEvent } from '@ms_ticking/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
