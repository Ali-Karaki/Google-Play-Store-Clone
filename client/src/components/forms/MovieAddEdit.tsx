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
import MoviesServices from "../../services/movies.service";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const MovieModelSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  releasedOn: Yup.date().required("Required"),
  duration: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
  ageRestrictions: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  stars: Yup.number().required("Required"),
  downloads: Yup.number().required("Required"),
  tags: Yup.array().min(1, "Select at least one tag"),
  isEditorChoice: Yup.boolean().required(),
});

const MovieAddEdit = ({ editingMovie }: any) => {
  const isEditing = editingMovie !== null;

  const [file, setFile] = React.useState();
  const [imageUrl, setImageUrl] = React.useState(
    isEditing ? editingMovie.logo : ""
  );

  const [isLoading, setIsLoading] = React.useState(false);

  const [successSnackbarOpen, setSuccessSnackbarOpen] = React.useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);

  const initialValues = {
    name: editingMovie?.name ?? "",
    company: editingMovie?.company ?? "",
    releasedOn: editingMovie?.releasedOn.substring(0, 10) ?? new Date(),
    duration: editingMovie?.duration ?? 0,
    description: editingMovie?.description ?? "",
    ageRestrictions: editingMovie?.ageRestrictions ?? "",
    price: editingMovie?.price ?? 0,
    stars: editingMovie?.stars ?? 0,
    downloads: editingMovie?.downloads ?? 0,
    tags: editingMovie?.tags ?? [],
    isEditorChoice: editingMovie?.isEditorChoice ?? false,
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

  const handleMovieCreate = async (values: any) => {
    setIsLoading(true);
    const imgName = `${values.name}${values.company}`
      .trim()
      .replace(/\s+/g, "-");
    const imgUrl = await handleFileUpload(imgName);
    const res = await MoviesServices.createMovie({
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

  const handleMovieEdit = async (values: any) => {
    setIsLoading(true);
    const imgName = `${values.name}${values.company}`
      .trim()
      .replace(/\s+/g, "-");
    const imgUrl = await handleFileUpload(imgName);
    const res = await MoviesServices.editMovie({
      ...values,
      _id: editingMovie._id,
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
            ? "Movie successfully updated!"
            : "Movie successfully created!"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert onClose={() => handleErrorSnackbarClose} severity="error">
          {isEditing
            ? "An error occurred while updating the movie!"
            : "An error occurred while creating the movie!"}
        </Alert>
      </Snackbar>
      <Formik
        initialValues={initialValues}
        validationSchema={MovieModelSchema}
        onSubmit={async (values) => {
          if (isEditing) {
            handleMovieEdit(values);
          } else {
            handleMovieCreate(values);
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
              name="duration"
              label="Duration"
              type="number"
              value={values.duration}
              onChange={handleChange}
              error={touched.duration && !!errors.duration}
              helperText={touched.duration && errors.duration}
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
            <FormControl fullWidth sx={{ margin: "13px 0px" }}>
              <InputLabel>Tags</InputLabel>
              <Select
                multiple
                name="tags"
                label="Tags"
                value={values.tags}
                onChange={handleChange}
                renderValue={(selected: string[]) => selected.join(", ")}
              >
                <MenuItem value="Action">Action</MenuItem>
                <MenuItem value="Comedy">Comedy</MenuItem>
                <MenuItem value="Drama">Drama</MenuItem>
                <MenuItem value="Thriller">Thriller</MenuItem>
                <MenuItem value="Horror">Horror</MenuItem>
                <MenuItem value="Romance">Romance</MenuItem>
                <MenuItem value="Science Fiction">Science Fiction</MenuItem>
              </Select>
              {!!errors.tags && (
                <Box color="error.main" fontSize="0.75rem" mt={1}>
                  {errors.tags}
                </Box>
              )}
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  name="isEditorChoice"
                  checked={values.isEditorChoice}
                  onChange={handleChange}
                />
              }
              label="Editor's Choice"
            />

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

export default MovieAddEdit;
