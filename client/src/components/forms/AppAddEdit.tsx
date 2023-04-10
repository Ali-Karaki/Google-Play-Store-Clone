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
import AppsServices from "../../services/apps.service";

import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../../config/firebase";

const AppModelSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  devices: Yup.array().min(1, "Select at least one device"),
  type: Yup.string().required("Required"),
  version: Yup.string().required("Required"),
  releasedOn: Yup.date().required("Required"),
  updatedOn: Yup.date().required("Required"),
  size: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
  ageRestrictions: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  isOffline: Yup.boolean().required("Required"),
  tags: Yup.array().min(1, "Select at least one tag"),
  isEditorChoice: Yup.boolean().required("Required"),
});

const AppAddEdit = ({ editingApp }: any) => {
  const isEditing = editingApp !== null;

  const [file, setFile] = React.useState();
  const [imageUrl, setImageUrl] = React.useState(
    isEditing ? editingApp.logo : ""
  );

  const [successSnackbarOpen, setSuccessSnackbarOpen] = React.useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);

  const initialValues = {
    name: editingApp?.name ?? "",
    company: editingApp?.company ?? "",
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

  const handleAppCreate = async (values: any) => {
    const imgName = `${values.name}${values.company}`
      .trim()
      .replace(/\s+/g, "-");
    const imgUrl = await handleFileUpload(imgName);
    const res = await AppsServices.createApp({
      ...values,
      logo: imgUrl,
      stars: 0,
      downloads: 0,
    } as any);
    if (res.success) {
      setSuccessSnackbarOpen(true);
    } else {
      setErrorSnackbarOpen(true);
    }
  };

  const handleAppEdit = async (values: any) => {
    const imgName = `${values.name}${values.company}`
      .trim()
      .replace(/\s+/g, "-");
    const imgUrl = await handleFileUpload(imgName);
    const res = await AppsServices.editApp({
      ...values,
      _id: editingApp._id,
      logo: imgUrl,
    } as any);
    if (res.success) {
      setSuccessSnackbarOpen(true);
    } else {
      setErrorSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ paddingTop: "5%" }}>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSuccessSnackbarClose}
      >
        <Alert onClose={() => handleSuccessSnackbarClose} severity="success">
          {isEditing
            ? "App successfully updated!"
            : "App successfully created!"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert onClose={() => handleErrorSnackbarClose} severity="error">
          {isEditing
            ? "An error occurred while updating the app!"
            : "An error occurred while creating the app!"}
        </Alert>
      </Snackbar>
      <Formik
        initialValues={initialValues}
        validationSchema={AppModelSchema}
        onSubmit={async (values) => {
          if (isEditing) {
            handleAppEdit(values);
          } else {
            handleAppCreate(values);
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
                <MenuItem value="Phone">Phone</MenuItem>
                <MenuItem value="Tablet">Tablet</MenuItem>
                <MenuItem value="TV">TV</MenuItem>
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
                <MenuItem value="App">App</MenuItem>
                <MenuItem value="Game">Game</MenuItem>
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
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Communication">Communication</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Action">Action</MenuItem>
                <MenuItem value="Arcade">Arcade</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Simulation">Simulation</MenuItem>
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
