import { Router } from "express";
import { Apps } from "../schemas/apps.schema.js";
import { authenticate } from "../utilities.js";

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
  }

  try {
    const filter = { type: "App" };
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
  }

  try {
    const filter = { type: "Game" };
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

router.put("/editApp", async (req, res) => {
  const authenticated = await authenticate(req);
  if (
    !authenticated ||
    authenticated.status !== 200 ||
    !authenticated.userData
  ) {
    const { message } = authenticated;
    return res.status(400).json({ message: message, success: false });
  }
  try {
    const app = await Apps.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    if (!app) {
      return res.status(404).send({ message: "No app found", success: false });
    }
    return res.status(200).send({ message: "App updated", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error, success: false });
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
