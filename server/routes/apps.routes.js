import { Router } from "express";
import { Apps } from "../schemas/apps.schema.js";
import { authenticate } from "../authenticateToken.js";

const router = Router();

router.get("/getApps", async (req, res) => {
  const authenticated = await authenticate(req);
  if (
    !authenticated ||
    authenticated.status !== 200 ||
    !authenticated.userData
  ) {
    const { message } = authenticated;
    return res.status(400).json({ message: message, success: false });
    return;
  }

  try {
    const filter = { type: "app" };
    const apps = await Apps.find(filter);
    return res.status(200).json({ message: apps, success: true });
  } catch (error) {
    return res.status(404).json({ message: "No apps found", success: false });
  }
});

router.get("/getGames", async (req, res) => {
  const authenticated = await authenticate(req);
  if (
    !authenticated ||
    authenticated.status !== 200 ||
    !authenticated.userData
  ) {
    const { message } = authenticated;
    return res.status(400).json({ message: message, success: false });
    return;
  }

  try {
    const filter = { type: "game" };
    const games = await Apps.find(filter);
    return res.status(200).json({ message: games, success: true });
  } catch (error) {
    return res.status(404).json({ message: "No games found", success: false });
  }
});

router.post("/createApp", async (req, res) => {
  const authenticated = await authenticate(req);
  if (
    !authenticated ||
    authenticated.status !== 200 ||
    !authenticated.userData
  ) {
    const { message } = authenticated;
    return res.status(400).json({ message: message, success: false });
    return;
  }
  try {
    const app = await Apps.create(req.body);
    return res.status(200).json({ message: app, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
});

router.post("/deleteApp", async (req, res) => {
  const authenticated = await authenticate(req);
  if (
    !authenticated ||
    authenticated.status !== 200 ||
    !authenticated.userData
  ) {
    const { message } = authenticated;
    return res.status(400).json({ message: message, success: false });
    return;
  }

  try {
    const { appId } = req.body;
    const app = await Apps.findByIdAndDelete(appId);

    if (!app) {
      return res.status(404).json({ message: "App not found", success: false });
    }

    res
      .status(200)
      .json({ message: "App deleted successfully", success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
});

export default router;
