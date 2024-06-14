import { server } from '@/app'

async function startServer() {
  try {
    await server.listen({ port: 3333 })
    console.log('Server started on port 3333')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

startServer()
