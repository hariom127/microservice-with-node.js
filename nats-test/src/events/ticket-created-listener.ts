import { Message } from 'node-nats-streaming'
import { Listener } from './base-listener'
import { Subjects } from './subjects'
import { TicketCreatedEvent } from './ticket-created-event'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // subject: Subjects.TicketCreated = Subjects.TicketCreated;
  //or
  readonly subject = Subjects.TicketCreated
  // above both subject is same , and (readonly and type Subjects.TicketCreated both) make sure subject not going to change in the futer 😁
  queueGroupName = 'payments-service'

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data)
    msg.ack()
  }
}
