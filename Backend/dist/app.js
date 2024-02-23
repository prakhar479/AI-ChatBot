import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { FRONTEND_URL } from './utils/constants.js';

// Load env variables
config();
// Init express
const app = express();
// Body parser middleware
app.use(express.json());
// Cookie parser middleware
app.use(cookieParser(process.env.COOKIE_SECRET));
// Dev logging middleware ( remove in production )
app.use(morgan('dev'));
// CORS middleware
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));
// Routes
app.use("/api/v1", router);
app.get('/', (req, res) => {
    res.send('API running');
});
export default app;
//# sourceMappingURL=app.js.map