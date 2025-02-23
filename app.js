import { createApp } from './src/utils/config.js';
import { connectToDatabase } from './src/utils/db.js';
import userRoutes from './src/routes/user.js'
import http from 'http'
import { Server } from 'socket.io'
import path from 'path';
import { setupSocket } from './src/controllers/index.js';

const app = createApp()

const port = process.env.PORT || 3001;

connectToDatabase()

const server = http.createServer(app)
const io = new Server(server)

const __dirname = path.resolve();

setupSocket(io)

app.use('/api/user', userRoutes)
app.get('/', (_, res) => {
	res.sendFile(path.join(__dirname, 'public', '/index.html'))
})


server.listen(port, () => console.log(`Server is active on port ${port}`));