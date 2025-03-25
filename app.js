import { connectToDatabase, createApp } from './src/utils/index.js'
import userRoutes from './src/routes/user.js'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors';
import path from 'path';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { setupSocket } from './src/controllers/index.js';

const app = createApp()

const port = process.env.PORT || 3001;

connectToDatabase()

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: '*'
	}
})

const __dirname = path.resolve();

setupSocket(io)

const IS_DEV = process.env.NODE_ENV !== 'production';

const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Online chat API',
			version: '1.0.0',
			description: 'API documentation',
		},
		servers: IS_DEV
			? [
				{ url: 'http://localhost:4001', description: 'Local Server' },
			]
			: [
				{ url: process.env.APP_URL, description: 'Production Server' },
			],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
	},
	apis: ['./src/routes/*.js', './src/docs/websocket.yaml'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/user', userRoutes)
app.get('/', (_, res) => {
	res.sendFile(path.join(__dirname, 'public', '/index.html'))
})

app.use(cors({

}))

server.listen(port, () => console.log(`Server is active on port ${port}`));