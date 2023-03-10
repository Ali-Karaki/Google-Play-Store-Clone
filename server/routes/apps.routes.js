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
    res.status(400).json({ message: message, success: false });
    return;
  }

  try {
    const filter = { type: "app" };
    const apps = await Apps.find(filter);
    res.status(200).json({ message: apps, success: true });
  } catch (error) {
    res.status(404).json({ message: "No apps found", success: false });
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
    res.status(400).json({ message: message, success: false });
    return;
  }

  try {
    const filter = { type: "game" };
    const games = await Apps.find(filter);
    res.status(200).json({ message: games, success: true });
  } catch (error) {
    res.status(404).json({ message: "No games found", success: false });
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
    res.status(400).json({ message: message, success: false });
    return;
  }
  try {
    const requiredFields = [
      "name",
      "company",
      "logo",
      "pictures",
      "devices",
      "type",
      "version",
      "releasedOn",
      "updatedOn",
      "size",
      "description",
      "ageRestrictions",
      "price",
      "stars",
      "downloads",
      "isOffline",
      "tags",
      "isEditorChoice",
      "dataSafety",
    ];
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing fields: ${missingFields.join(", ")}`,
        success: false,
      });
    }

    const app = await Apps.create(req.body);
    res.status(200).json({ message: app, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

export default router;
