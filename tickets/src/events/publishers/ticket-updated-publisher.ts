import { Publisher, Subjects, TicketUpdatedEvent } from "@ms_ticking/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
