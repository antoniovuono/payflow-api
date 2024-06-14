import fastify from 'fastify'

export const server = fastify()

server.get('/', async () => {
  return { hello: 'world' }
})
