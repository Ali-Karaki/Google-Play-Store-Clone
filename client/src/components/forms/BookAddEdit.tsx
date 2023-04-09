import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  MenuItem,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BookModel } from "../../models/book.model";

const BookModelSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  logo: Yup.string().required("Required"),
  releasedOn: Yup.date().required(),
  description: Yup.string().required("Required"),
  ageRestrictions: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  aboutAuthor: Yup.string().required("Required"),
  isComic: Yup.boolean().required(),
  category: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  pages: Yup.number().test("pages", "Required", function (value) {
    const { type } = this.parent;
    return type === "Ebook" ? !!value : true;
  }),
  duration: Yup.string().test("duration", "Required", function (value) {
    const { type } = this.parent;
    return type === "Audiobook" ? !!value : true;
  }),
  narratedBy: Yup.string().test("narratedBy", "Required", function (value) {
    const { type } = this.parent;
    return type === "Audiobook" ? !!value : true;
  }),
});

const BookAddEdit = ({ editingBook }: any) => {
  const isEditing = editingBook !== null;

  const navigate = useNavigate();

  const initialValues: BookModel = {
    name: editingBook?.name ?? "",
    company: editingBook?.company ?? "",
    logo: editingBook?.logo ?? "",
    releasedOn: editingBook?.releasedOn ?? new Date(),
    description: editingBook?.description ?? "",
    ageRestrictions: editingBook?.ageRestrictions ?? "",
    price: editingBook?.price ?? 0,
    stars: editingBook?.stars ?? 0,
    downloads: editingBook?.downloads ?? 0,
    aboutAuthor: editingBook?.aboutAuthor ?? "",
    isComic: editingBook?.isComic ?? false,
    category: editingBook?.category ?? "",
    type: editingBook?.type ?? "",
    pages: editingBook?.pages,
    duration: editingBook?.duration,
    narratedBy: editingBook?.narratedBy,
  };

  return (
    <Box sx={{ paddingTop: "5%" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={BookModelSchema}
        onSubmit={async (values: BookModel) => {}}
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

export default BookAddEdit;