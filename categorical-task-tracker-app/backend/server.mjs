import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

import passport from "./auth/githubStrategy.mjs";
import authRoutes from "./routes/auth.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// ✅ Required for secure cookies behind a proxy (Codespaces)
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // must match exactly
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // ✅ Codespaces is HTTPS, so secure cookies are correct
      secure: true,
      // ✅ Cross-site cookie needed (frontend 3000 <> backend 5050)
      sameSite: "none",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
