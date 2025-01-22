import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const initial = {
  postId: "",
  postProfile: "",
  reqExperience: 0,
  postTechStack: [],
  postDesc: "",
};

const Edit = () => {
  const { id } = useParams(); // Get the `id` from the URL
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  console.log("ID from URL:", id); // Debugging: Check the `id`

  // Fetch the job post data based on the `id`
  useEffect(() => {
    if (id) {
      const fetchInitialPosts = async () => {
        try {
          const response = await axios.get(`/api/jobPost/${id}`);
          console.log("Fetched data:", response.data); // Debugging: Check fetched data
          setForm(response.data); // Populate the form with the fetched data
        } catch (error) {
          console.error("Error fetching job post:", error);
          setSnackbarMessage("Failed to fetch job post. Please try again.");
          setOpenSnackbar(true);
        }
      };
      fetchInitialPosts();
    }
  }, [id]);

  useEffect(() => {
    console.log("Form state updated:", form); // Debugging: Check if `form` is updated
  }, [form]);

  // Validate the form
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .put(`/api/jobPost/${id}`, form) // Use PUT for updating
        .then((resp) => {
          console.log(resp.data);
          setSnackbarMessage("Post updated successfully!");
          setOpenSnackbar(true);
          setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
        })
        .catch((error) => {
          console.error("Error updating post:", error);
          setSnackbarMessage("Failed to update post. Please try again.");
          setOpenSnackbar(true);
        });
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedSkills = checked
      ? [...form.postTechStack, name]
      : form.postTechStack.filter((skill) => skill !== name);
    setForm({ ...form, postTechStack: updatedSkills });
    console.log("Updated skills:", form.postTechStack); // Debugging: Check updated skills
  };

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const skillSet = [
    { name: "Javascript" },
    { name: "Java" },
    { name: "Python" },
    { name: "Django" },
    { name: "Rust" },
  ];

  return (
    <Paper
      sx={{
        padding: "3%",
        maxWidth: "800px",
        margin: "2% auto",
        background: "linear-gradient(45deg, #1e3c72, #2a5298)",
        color: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        sx={{ marginBottom: "3%", fontFamily: "Poppins, sans-serif" }}
        align="center"
        variant="h4"
      >
        Edit Job Post
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            type="number"
            label="Post ID"
            variant="outlined"
            value={form.postId || ""}
            onChange={(e) => setForm({ ...form, postId: e.target.value })}
            error={!!errors.postId}
            helperText={errors.postId}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
          <TextField
            type="text"
            label="Job Profile"
            variant="outlined"
            value={form.postProfile || ""}
            onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
            error={!!errors.postProfile}
            helperText={errors.postProfile}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
          <TextField
            type="number"
            label="Years of Experience"
            variant="outlined"
            value={form.reqExperience || 0}
            onChange={(e) =>
              setForm({ ...form, reqExperience: e.target.value })
            }
            error={!!errors.reqExperience}
            helperText={errors.reqExperience}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
          <TextField
            type="text"
            label="Job Description"
            variant="outlined"
            value={form.postDesc || ""}
            onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
            error={!!errors.postDesc}
            helperText={errors.postDesc}
            multiline
            rows={4}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
          <FormControl component="fieldset" error={!!errors.postTechStack}>
            <FormLabel component="legend" sx={{ color: "white" }}>
              Required Skills
            </FormLabel>
            <FormGroup>
              {skillSet.map((skill, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      name={skill.name}
                      checked={form.postTechStack.includes(skill.name)}
                      onChange={handleCheckboxChange}
                      sx={{ color: "white" }}
                    />
                  }
                  label={
                    <Typography sx={{ color: "white" }}>
                      {skill.name}
                    </Typography>
                  }
                />
              ))}
            </FormGroup>
            {errors.postTechStack && (
              <Typography color="error" variant="body2">
                {errors.postTechStack}
              </Typography>
            )}
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{
              background: "white",
              color: "#1e3c72",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.9)",
              },
            }}
          >
            Update
          </Button>
        </Box>
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
  );
};

export default Edit;
