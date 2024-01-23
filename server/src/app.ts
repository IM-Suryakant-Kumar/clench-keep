import "express-async-errors";
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import notFoundMiddleware from "./middlewares/not-found";
import errorHandlerMiddleware from "./middlewares/error-handler";
import authRouter from "./routes/auth";

config();
const app = express();

// constant
const PORT: number = parseInt(process.env.PORT, 10) || 4000;
const CLIENT_URL: string = process.env.CLIENT_URL;
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors({ origin: CLIENT_URL, credentials: true }));

// routers
app.use("/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
	try {
		app.listen(PORT, () =>
			console.log(`Server is listening on port ${PORT}...`)
		);
	} catch (error) {
		console.error(error);
	}
};

start();
