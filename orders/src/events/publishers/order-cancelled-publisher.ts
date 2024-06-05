import { Subjects, Publisher, OrderCancelledEvent } from "@ms_ticking/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
