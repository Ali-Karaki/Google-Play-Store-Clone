import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MovieModel } from "../../models/movie.model";

const MovieModelSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  logo: Yup.string().required("Required"),
  releasedOn: Yup.date(),
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

  const navigate = useNavigate();

  const initialValues: MovieModel = {
    name: editingMovie?.name ?? "",
    company: editingMovie?.company ?? "",
    logo: editingMovie?.logo ?? "",
    releasedOn: editingMovie?.releasedOn ?? new Date(),
    duration: editingMovie?.duration ?? 0,
    description: editingMovie?.description ?? "",
    ageRestrictions: editingMovie?.ageRestrictions ?? "",
    price: editingMovie?.price ?? 0,
    stars: editingMovie?.stars ?? 0,
    downloads: editingMovie?.downloads ?? 0,
    tags: editingMovie?.tags ?? [],
    isEditorChoice: editingMovie?.isEditorChoice ?? false,
  };

  return (
    <Box sx={{ paddingTop: "5%" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={MovieModelSchema}
        onSubmit={async (values: MovieModel) => {}}
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
            <TextField
              sx={{ margin: "13px 0px" }}
              fullWidth
              name="logo"
              label="Logo"
              value={values.logo}
              onChange={handleChange}
              error={touched.logo && !!errors.logo}
              helperText={touched.logo && errors.logo}
            />
            <TextField
              sx={{ margin: "13px 0px" }}
              fullWidth
              disabled={!isEditing}
              name="releasedOn"
              label="Released On"
              type="date"
              value={values.releasedOn.toString().substring(0, 10)}
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
            <TextField
              sx={{ margin: "13px 0px" }}
              fullWidth
              disabled={!isEditing}
              name="stars"
              label="Stars"
              type="number"
              value={values.stars}
            />
            <TextField
              sx={{ margin: "13px 0px" }}
              fullWidth
              disabled={!isEditing}
              name="downloads"
              label="Downloads"
              type="number"
              value={values.downloads}
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
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default MovieAddEdit;
