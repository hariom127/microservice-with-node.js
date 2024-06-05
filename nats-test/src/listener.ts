import nats from 'node-nats-streaming'
import { randomBytes } from 'crypto'
import { TicketCreatedListener } from './events/ticket-created-listener'

console.clear()

/**
 * @param name ticketing
 * @param clientId randomBytes(4).toString('hex') // we can connect one client id from one instance 
 * if cient id is smae for athor instance it will refuse to connect
 * 
 * 
 */
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
})

stan.on('connect', () => {
  console.log('Listener connected to NATS')

  stan.on('close', () => {
    console.log('NATS connection closed!')
    process.exit()
  })

  new TicketCreatedListener(stan).listen()
})

//close when signel intrapt
process.on('SIGINT', () => stan.close())

//close when signel terminate
process.on('SIGTERM', () => stan.close())
