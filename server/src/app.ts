import "express-async-errors";
import { config } from "dotenv";
import express from "express";
import connectDB from "./db";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
	notFoundMiddleware,
	errorHandlerMiddleware,
	authenticateUser,
} from "./middlewares";
import { authRouter, noteRouter, archiveRouter, trashRouter } from "./routes";

config();
const app = express();

// constant
const PORT: number = parseInt(process.env.PORT, 10) || 4000;
const CLIENT_URL: string = process.env.CLIENT_URL;
const MONGO_URL: string = process.env.MONGO_URL;
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(cookieParser())

// routers
app.use("/auth", authRouter);
app.use("/note", authenticateUser, noteRouter);
app.use("/archive", authenticateUser, archiveRouter);
app.use("/trash", authenticateUser, trashRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
	try {
		await connectDB(MONGO_URL);
		app.listen(PORT, () =>
			console.log(`Server is listening on port ${PORT}...`)
		);
	} catch (error) {
		console.error(error);
	}
};

start();
