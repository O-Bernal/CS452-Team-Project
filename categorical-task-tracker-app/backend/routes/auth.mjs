import express from "express";
import passport from "../auth/githubStrategy.mjs";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    res.redirect(process.env.FRONTEND_URL);
  }
);

router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      loggedIn: true,
      user: {
        username: req.user.username,
        photos: req.user.photos,
      },
    });
  } else {
    res.json({ loggedIn: false });
  }
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL);
  });
});

router.get("/failure", (req, res) => {
  res.status(401).send("GitHub Authentication Failed");
});

export default router;
