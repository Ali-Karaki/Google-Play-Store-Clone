import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../../config/firebase";
import BooksServices from "../../services/books.service";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const BookModelSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  releasedOn: Yup.date().required("Required"),
  description: Yup.string().required("Required"),
  ageRestrictions: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  aboutAuthor: Yup.string().required("Required"),
  isComic: Yup.boolean().required(),
  category: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  pages: Yup.number(),
  duration: Yup.string(),
  narratedBy: Yup.string(),
});

const BookAddEdit = ({ editingBook }: any) => {
  const isEditing = editingBook !== null;

  const [file, setFile] = React.useState();
  const [imageUrl, setImageUrl] = React.useState(
    isEditing ? editingBook.logo : ""
  );

  const [isLoading, setIsLoading] = React.useState(false);

  const [successSnackbarOpen, setSuccessSnackbarOpen] = React.useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);

  const initialValues = {
    name: editingBook?.name ?? "",
    company: editingBook?.company ?? "",
    releasedOn: editingBook?.releasedOn.substring(0, 10) ?? new Date(),
    description: editingBook?.description ?? "",
    ageRestrictions: editingBook?.ageRestrictions ?? "",
    price: editingBook?.price ?? 0,
    aboutAuthor: editingBook?.aboutAuthor ?? "",
    isComic: editingBook?.isComic ?? false,
    category: editingBook?.category ?? "",
    type: editingBook?.type ?? "",
    pages: editingBook?.pages,
    duration: editingBook?.duration,
    narratedBy: editingBook?.narratedBy,
  };

  const handleSuccessSnackbarClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackbarOpen(false);
  };

  const handleErrorSnackbarClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorSnackbarOpen(false);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl((e.target as any).result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = async (fileName: string) => {
    if (file) {
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file as any);
      const url = await getDownloadURL(storageRef);
      return url;
    } else {
      return imageUrl;
    }
  };

  const handleBookCreate = async (values: any) => {
    setIsLoading(true);
    const imgName = `${values.name}${values.company}`
      .trim()
      .replace(/\s+/g, "-");
    const imgUrl = await handleFileUpload(imgName);
    const res = await BooksServices.createBook({
      ...values,
      logo: imgUrl,
      stars: 0,
      downloads: 0,
    } as any);
    setIsLoading(false);
    if (res.success) {
      setSuccessSnackbarOpen(true);
    } else {
      setErrorSnackbarOpen(true);
    }
  };

  const handleBookEdit = async (values: any) => {
    setIsLoading(true);
    const imgName = `${values.name}${values.company}`
      .trim()
      .replace(/\s+/g, "-");
    const imgUrl = await handleFileUpload(imgName);
    const res = await BooksServices.editBook({
      ...values,
      _id: editingBook._id,
      logo: imgUrl,
    } as any);
    setIsLoading(false);
    if (res.success) {
      setSuccessSnackbarOpen(true);
    } else {
      setErrorSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ paddingTop: "5%" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSuccessSnackbarClose}
      >
        <Alert onClose={() => handleSuccessSnackbarClose} severity="success">
          {isEditing
            ? "Book successfully updated!"
            : "Book successfully created!"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert onClose={() => handleErrorSnackbarClose} severity="error">
          {isEditing
            ? "An error occurred while updating the book!"
            : "An error occurred while creating the book!"}
        </Alert>
      </Snackbar>
      <Formik
        initialValues={initialValues}
        validationSchema={BookModelSchema}
        onSubmit={async (values) => {
          if (isEditing) {
            handleBookEdit(values);
          } else {
            handleBookCreate(values);
          }
        }}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <TextField
              sx={{ margin: "13px 0px" }}
              fullWidth
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            <TextField
              sx={{ margin: "13px 0px" }}
              fullWidth
              name="company"
              label="Company"
              value={values.company}
              onChange={handleChange}
              error={touched.company && !!errors.company}
              helperText={touched.company && errors.company}
            />

            <Box sx={{ p: 2 }}>
              <FormControl fullWidth sx={{ margin: "13px 0px" }}>
                <FormLabel>Logo</FormLabel>
                <Input type="file" onChange={handleFileChange} />
              </FormControl>

              {imageUrl && (
                <Paper sx={{ p: 2, mt: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={imageUrl}
                      alt="Preview"
                      style={{ maxWidth: "100%" }}
                    />
                  </Box>
                </Paper>
              )}
            </Box>
            <TextField
              sx={{ margin: "13px 0px" }}
              fullWidth
              name="releasedOn"
              label="Released On"
              type="date"
              value={values.releasedOn}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              sx={{ margin: "13px 0px" }}
              fullWidth
              name="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
              error={touched.description && !!errors.description}
              helperText={touched.description && errors.description}
            />
            <FormControl fullWidth sx={{ margin: "13px 0px" }}>
              <InputLabel>Age Restriction</InputLabel>
              <Select
                name="ageRestrictions"
                label="Age Restriction"
                value={values.ageRestrictions}
                onChange={handleChange}
              >
                <MenuItem value="G">G</MenuItem>
                <MenuItem value="PG">PG</MenuItem>
                <MenuItem value="PG-13">PG-13</MenuItem>
                <MenuItem value="R">R</MenuItem>
                <MenuItem value="NC-17">NC-17</MenuItem>
              </Select>
              {!!errors.ageRestrictions && (
                <Box color="error.main" fontSize="0.75rem" mt={1}>
                  {errors.ageRestrictions}
                </Box>
              )}
            </FormControl>
            <TextField
              sx={{ margin: "13px 0px" }}
              fullWidth
              name="price"
              label="Price"
              type="number"
              value={values.price}
              onChange={handleChange}
              error={touched.price && !!errors.price}
              helperText={touched.price && errors.price}
            />
            <TextField
              sx={{ margin: "13px 0px" }}
              fullWidth
              name="aboutAuthor"
              label="About Author"
              value={values.aboutAuthor}
              onChange={handleChange}
              error={touched.aboutAuthor && !!errors.aboutAuthor}
              helperText={touched.aboutAuthor && errors.aboutAuthor}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isComic"
                  checked={values.isComic}
                  onChange={handleChange}
                />
              }
              label="Is Comic"
            />
            <FormControl fullWidth sx={{ margin: "13px 0px" }}>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={values.type}
                onChange={handleChange}
                error={touched.type && !!errors.type}
              >
                <MenuItem value="Ebook">Ebook</MenuItem>
                <MenuItem value="Audiobook">Audiobook</MenuItem>
              </Select>
              {touched.type && errors.type && (
                <Box color="error.main">{errors.type}</Box>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ margin: "13px 0px" }}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                label="Category"
                value={values.category}
                onChange={handleChange}
              >
                <MenuItem value="Fiction">Fiction</MenuItem>
                <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                <MenuItem value="Mystery">Mystery</MenuItem>
                <MenuItem value="Science Fiction">Science Fiction</MenuItem>
                <MenuItem value="Romance">Romance</MenuItem>
              </Select>
              {!!errors.category && (
                <Box color="error.main" fontSize="0.75rem" mt={1}>
                  {errors.category}
                </Box>
              )}
            </FormControl>

            {values.type === "Ebook" && (
              <TextField
                sx={{ margin: "13px 0px" }}
                fullWidth
                name="pages"
                label="Pages"
                type="number"
                value={values.pages ?? ""}
                onChange={handleChange}
                error={touched.pages && !!errors.pages}
                helperText={touched.pages && errors.pages}
              />
            )}
            {values.type === "Audiobook" && (
              <>
                <TextField
                  sx={{ margin: "13px 0px" }}
                  fullWidth
                  name="duration"
                  label="Duration"
                  value={values.duration ?? ""}
                  onChange={handleChange}
                  error={touched.duration && !!errors.duration}
                  helperText={touched.duration && errors.duration}
                />
                <TextField
                  sx={{ margin: "13px 0px" }}
                  fullWidth
                  name="narratedBy"
                  label="Narrated By"
                  value={values.narratedBy ?? ""}
                  onChange={handleChange}
                  error={touched.narratedBy && !!errors.narratedBy}
                  helperText={touched.narratedBy && errors.narratedBy}
                />
              </>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <Button variant="contained" color="primary" type="submit">
                {isEditing ? "Update" : "Create"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default BookAddEdit;
