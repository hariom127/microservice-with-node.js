import nats from 'node-nats-streaming'
import { TicketCreatedPublisher } from './events/ticket-created-publisher'
console.clear()

/**
 * name
 * id
 * host with want to connect
 * */
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
})

stan.on('connect', async () => {
  console.log('Publisher connected to NATS')

  const publisher = new TicketCreatedPublisher(stan)
  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20,
    })
  } catch (err) {
    console.error(err)
  }

  /**
   * we cant pass JS object direct to NARS server
   * so we have to convert it to JSON
   */
  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: 20,
  // })

  /**
   * @param subject name 'ticket:created'
   * @param data data we want to send
   * @param callback function exicute after event has been published
   */
  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published')
  // })
})
