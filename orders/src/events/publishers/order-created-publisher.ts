import { Publisher, OrderCreatedEvent, Subjects } from "@ms_ticking/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
