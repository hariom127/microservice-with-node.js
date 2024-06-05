import { Publisher, Subjects, TicketCreatedEvent } from "@ms_ticking/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
