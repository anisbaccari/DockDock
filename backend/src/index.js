import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';


dotenv.config();

const fastify = Fastify({ logger: true });

// Register plugins
fastify.register(cors, { origin: '*' });
fastify.register(jwt, { secret: process.env.JWT_SECRET });


// Sample route
fastify.get('/', async () => {
return { message: 'Fastify backend is! sullnnin;;g!' };
});

// Import routes
import userRoutes from '../routes/users.js';
fastify.register(userRoutes, { prefix: '/api/users' });

// Start server
const start = async () => {
try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('🚀 Server runnig on http://localhost:3000');
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
};
start();