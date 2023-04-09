import { Router } from "express";
import { Book } from "../schemas/book.schema.js";
import { authenticate } from "../authenticateToken.js";

const router = Router();

router.get("/getBooks", async (req, res) => {
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
    const books = await Book.find();
    return res.status(200).json({ message: books, success: true });
  } catch (error) {
    return res.status(404).json({ message: "No books found", success: false });
  }
});

router.post("/createBook", async (req, res) => {
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
    const book = await Book.create(req.body);
    return res.status(200).json({ message: book, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
});

router.post("/deleteBook", async (req, res) => {
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
    const { bookId } = req.body;
    const book = await Book.findByIdAndDelete(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Book deleted successfully", success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
});

export default router;
