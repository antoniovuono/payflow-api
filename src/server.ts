import fastify from "fastify";

const server = fastify();

server.get('/', async (request, reply) => {
 return { hello: "world"}
});

async function startServer() {
    try {
        await server.listen({ port: 3333 });
        console.log(`Server listening on port 3333`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

startServer();