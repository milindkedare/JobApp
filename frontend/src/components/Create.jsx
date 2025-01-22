import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
  Container,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const initial = {
  postId: "",
  postProfile: "",
  reqExperience: 0, // Initialize to 0
  postTechStack: [],
  postDesc: "",
};

const Create = () => {
  const skillSet = [
    { name: "Javascript" },
    { name: "Java" },
    { name: "Python" },
    { name: "Django" },
    { name: "Rust" },
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!form.postId) newErrors.postId = "Post ID is required";
    if (!form.postProfile) newErrors.postProfile = "Job Profile is required";
    if (form.reqExperience < 0)
      newErrors.reqExperience = "Experience cannot be negative";
    if (!form.postDesc) newErrors.postDesc = "Job Description is required";
    if (form.postTechStack.length === 0)
      newErrors.postTechStack = "At least one skill is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .post("/api/jobPost", form)
        .then((resp) => {
          console.log(resp.data);
          setSnackbarMessage("Post created successfully!");
          setOpenSnackbar(true);
          setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
        })
        .catch((error) => {
          console.log(error);
          setSnackbarMessage("Failed to create post. Please try again.");
          setOpenSnackbar(true);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "postTechStack") {
      const updatedSkills = checked
        ? [...form.postTechStack, value]
        : form.postTechStack.filter((skill) => skill !== value);
      setForm({ ...form, postTechStack: updatedSkills });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const { postId, postProfile, reqExperience, postDesc, postTechStack } = form;

  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          padding: "3%",
          margin: "2% auto",
          borderRadius: "15px",
          background: "linear-gradient(45deg, #1e3c72, #2a5298)", // Gradient background
          color: "#ffffff", // White text for better contrast
        }}
        elevation={3}
      >
        <Typography
          sx={{
            marginBottom: "3%",
            fontWeight: "bold",
            textAlign: "center",
            color: "#ffffff", // White color for the title
          }}
          variant="h4"
        >
          Create New Job Post
        </Typography>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="number"
                name="postId"
                label="Post ID"
                variant="outlined"
                value={postId}
                onChange={handleChange}
                error={!!errors.postId}
                helperText={errors.postId}
                fullWidth
                sx={{
                  backgroundColor: "#ffffff", // White background for input
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="postProfile"
                label="Job Profile"
                variant="outlined"
                value={postProfile}
                onChange={handleChange}
                error={!!errors.postProfile}
                helperText={errors.postProfile}
                fullWidth
                sx={{
                  backgroundColor: "#ffffff", // White background for input
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                name="reqExperience"
                label="Years of Experience"
                variant="outlined"
                value={reqExperience || 0} // Ensure value is always a number
                onChange={handleChange}
                error={!!errors.reqExperience}
                helperText={errors.reqExperience}
                fullWidth
                sx={{
                  backgroundColor: "#ffffff", // White background for input
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="postDesc"
                label="Job Description"
                variant="outlined"
                value={postDesc}
                onChange={handleChange}
                error={!!errors.postDesc}
                helperText={errors.postDesc}
                multiline
                rows={4}
                fullWidth
                sx={{
                  backgroundColor: "#ffffff", // White background for input
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" error={!!errors.postTechStack}>
                <FormLabel
                  component="legend"
                  sx={{ color: "#ffffff", fontWeight: "bold" }} // White color for label
                >
                  Required Skills
                </FormLabel>
                <FormGroup>
                  <Grid container spacing={1}>
                    {skillSet.map((skill, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="postTechStack"
                              value={skill.name}
                              checked={postTechStack.includes(skill.name)}
                              onChange={handleChange}
                              sx={{
                                color: "#ffffff", // White color for checkbox
                                "&.Mui-checked": {
                                  color: "#ffffff", // White color for checked state
                                },
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ color: "#ffffff" }}>
                              {skill.name}
                            </Typography>
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>
                {errors.postTechStack && (
                  <Typography color="error" variant="body2">
                    {errors.postTechStack}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  padding: "10px",
                  fontSize: "1.1rem",
                  backgroundColor: "#ffffff", // White background for button
                  color: "#1e3c72", // Dark blue text for button
                  "&:hover": {
                    backgroundColor: "#f0f0f0", // Light gray on hover
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Create;
