import { authenticate } from '../plugins/auth.js';

export default async function (fastify, options) {
  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body;

    if (username === 'admin' && password === 'password') {
      const token = fastify.jwt.sign({ username });
      return { token };
    }
    reply.code(401).send({ error: 'Unauthorized' });
  });

  fastify.get('/profile', { preHandler: authenticate }, async (request, reply) => {
    return { message: 'This is a protected route', user: request.user };
  });
}