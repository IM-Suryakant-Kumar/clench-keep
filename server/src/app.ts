import "express-async-errors";
import "dotenv/config";
import express from "express";
import connectDB from "./db";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import {
	notFoundMiddleware,
	errorHandlerMiddleware,
	authenticateUser,
} from "./middlewares";
import { authRouter, noteRouter, archiveRouter, trashRouter } from "./routes";
const app = express();

// constant
const PORT = process.env.PORT || 4000;
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors({ origin: process.env.CLIENT_URL!, credentials: true }));

// routers
app.use("/auth", authRouter);
app.use("/note", authenticateUser, noteRouter);
app.use("/archive", authenticateUser, archiveRouter);
app.use("/trash", authenticateUser, trashRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Server is listening on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error(error);
  }
})();

export default app;
