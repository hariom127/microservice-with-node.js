import { Publisher, Subjects, TicketUpdatedEvent } from '@ms_ticking/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
