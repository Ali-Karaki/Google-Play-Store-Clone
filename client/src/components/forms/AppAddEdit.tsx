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
  Alert,
  Snackbar,
} from "@mui/material";
import AppsServices from "../../services/apps.service";

const AppModelSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  logo: Yup.string().required("Required"),
  devices: Yup.array().min(1, "Select at least one device"),
  type: Yup.string().required("Required"),
  version: Yup.string().required("Required"),
  releasedOn: Yup.date(),
  updatedOn: Yup.date(),
  size: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
  ageRestrictions: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  isOffline: Yup.boolean(),
  tags: Yup.array().min(1, "Select at least one tag"),
  isEditorChoice: Yup.boolean(),
});

const AppAddEdit = ({ editingApp }: any) => {
  const isEditing = editingApp !== null;

  const initialValues = {
    name: editingApp?.name ?? "",
    company: editingApp?.company ?? "",
    logo: editingApp?.logo ?? "",
    devices: editingApp?.devices ?? [],
    type: editingApp?.type ?? "",
    version: editingApp?.version ?? "",
    releasedOn: editingApp?.releasedOn.substring(0, 10) ?? new Date(),
    updatedOn: editingApp?.updatedOn.substring(0, 10) ?? new Date(),
    size: editingApp?.size ?? 0,
    description: editingApp?.description ?? "",
    ageRestrictions: editingApp?.ageRestrictions ?? "",
    price: editingApp?.price ?? 0,
    isOffline: editingApp?.isOffline ?? false,
    tags: editingApp?.tags ?? [],
    isEditorChoice: editingApp?.isEditorChoice ?? false,
  };

  const [successSnackbarOpen, setSuccessSnackbarOpen] = React.useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);

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

  return (
    <Box sx={{ paddingTop: "5%" }}>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSuccessSnackbarClose}
      >
        <Alert onClose={() => handleSuccessSnackbarClose} severity="success">
          App successfully created!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert onClose={() => handleErrorSnackbarClose} severity="error">
          An error occurred while creating the app!
        </Alert>
      </Snackbar>
      <Formik
        initialValues={initialValues}
        validationSchema={AppModelSchema}
        onSubmit={async (values) => {
          if (isEditing) {
            // edit service
          } else {
            const res = await AppsServices.createApp({
              ...values,
              stars: 0,
              downloads: 0,
            } as any);
            console.log(res);
            console.log(res.success);
            if (res.success) {
              setSuccessSnackbarOpen(true);
            } else {
              setErrorSnackbarOpen(true);
            }
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
            <FormControl fullWidth sx={{ margin: "13px 0px" }}>
              <InputLabel>Devices</InputLabel>
              <Select
                name="devices"
                label="Devices"
                multiple
                value={values.devices}
                onChange={handleChange}
                renderValue={(selected) =>
                  Array.isArray(selected) ? selected.join(", ") : ""
                }
              >
                <MenuItem value="phone">Phone</MenuItem>
                <MenuItem value="tablet">Tablet</MenuItem>
                <MenuItem value="tv">TV</MenuItem>
              </Select>
              {!!errors.devices && (
                <Box color="error.main" fontSize="0.75rem" mt={1}>
                  {errors.devices}
                </Box>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ margin: "13px 0px" }}>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                label="Type"
                value={values.type}
                onChange={handleChange}
              >
                <MenuItem value="app">App</MenuItem>
                <MenuItem value="game">Game</MenuItem>
              </Select>
              {!!errors.type && (
                <Box color="error.main" fontSize="0.75rem" mt={1}>
                  {errors.type}
                </Box>
              )}
            </FormControl>
            <TextField
              sx={{ margin: "13px 0px" }}
              fullWidth
              name="version"
              label="Version"
              value={values.version}
              onChange={handleChange}
              error={touched.version && !!errors.version}
              helperText={touched.version && errors.version}
            />
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
              name="updatedOn"
              label="Updated On"
              type="date"
              value={values.updatedOn}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              sx={{ margin: "13px 0px" }}
              fullWidth
              name="size"
              label="Size"
              type="number"
              value={values.size}
              onChange={handleChange}
              error={touched.size && !!errors.size}
              helperText={touched.size && errors.size}
            />
            <TextField
              sx={{ margin: "13px 0px" }}
              fullWidth
              multiline
              rows={4}
              name="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
              error={touched.description && !!errors.description}
              helperText={touched.description && errors.description}
            />
            <TextField
              sx={{ margin: "13px 0px" }}
              fullWidth
              name="ageRestrictions"
              label="Age Restrictions"
              value={values.ageRestrictions}
              onChange={handleChange}
              error={touched.ageRestrictions && !!errors.ageRestrictions}
              helperText={touched.ageRestrictions && errors.ageRestrictions}
            />
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
            <FormControlLabel
              control={
                <Checkbox
                  name="isOffline"
                  checked={values.isOffline}
                  onChange={handleChange}
                />
              }
              label="Offline availability"
            />
            <FormControl fullWidth sx={{ margin: "13px 0px" }}>
              <InputLabel>Tags</InputLabel>
              <Select
                name="tags"
                label="Tags"
                multiple
                value={values.tags}
                onChange={handleChange}
                renderValue={(selected) =>
                  Array.isArray(selected) ? selected.join(", ") : ""
                }
              >
                <MenuItem value="social">Social</MenuItem>
                <MenuItem value="productivity">Productivity</MenuItem>
                <MenuItem value="entertainment">Entertainment</MenuItem>
                <MenuItem value="lifestyle">Lifestyle</MenuItem>
                <MenuItem value="utilities">Utilities</MenuItem>
                <MenuItem value="education">Education</MenuItem>
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "13px" }}
            >
              {isEditing ? "Update" : "Create"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AppAddEdit;
