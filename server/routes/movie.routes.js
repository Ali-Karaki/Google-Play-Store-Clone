import { Router } from "express";
import { Movie } from "../schemas/movie.schema.js";
import { authenticate } from "../authenticateToken.js";

const router = Router();

router.get("/getMovies", async (req, res) => {
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
    const movies = await Movie.find();
    res.status(200).json({ message: movies, success: true });
  } catch (error) {
    res.status(404).json({ message: "No movies found", success: false });
  }
});

router.post("/createMovie", async (req, res) => {
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
      "releasedOn",
      "duration",
      "description",
      "ageRestrictions",
      "price",
      "stars",
      "downloads",
      "tags",
      "isEditorChoice",
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

    const movie = await Movie.create(req.body);
    res.status(200).json({ message: movie, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

export default router;
