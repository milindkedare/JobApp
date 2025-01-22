import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all job posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/jobPosts");
      setPosts(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search functionality
  const searchPosts = async () => {
    setLoading(true);
    try {
      if (query.length > 2) {
        const response = await axios.get(`/api/jobPosts/keyword/${query}`);
        setPosts(response.data);
        setError(null);
      } else {
        fetchPosts(); // Reset to all posts when query is cleared
      }
    } catch (error) {
      console.error("Error searching posts:", error);
      setError("Failed to search posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load and pagination
  useEffect(() => {
    fetchPosts();
  }, [pageNumber]);

  // Trigger search on query change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchPosts();
    }, 500); // Debounce search to avoid too many API calls

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Handle deletion of a post
  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`/api/jobPost/${postId}`);
      if (response.status === 200 || response.status === 204) {
        fetchPosts(); // Re-fetch posts after successful deletion
      } else {
        setError("Failed to delete post. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post. Please try again.");
    }
  };

  // Handle edit navigation
  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`); // Pass the `id` in the URL
  };

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Grid container spacing={2} sx={{ margin: "2%" }}>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => setPageNumber((prev) => prev + 1)}
            variant="contained"
            disabled={loading}
            sx={{
              background: "linear-gradient(45deg, #1e3c72, #2a5298)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(45deg, #2a5298, #1e3c72)",
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Load More Posts"}
          </Button>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#1e3c72" }} />
                </InputAdornment>
              ),
            }}
            placeholder="Search..."
            fullWidth
            sx={{
              width: "50%",
              marginLeft: "2%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#1e3c72",
                },
                "&:hover fieldset": {
                  borderColor: "#2a5298",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2a5298",
                },
              },
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      </Grid>

      {loading ? (
        <Grid item xs={12}>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginTop: "5%" }}
          >
            <CircularProgress />
          </Box>
        </Grid>
      ) : posts.length === 0 ? (
        <Grid item xs={12}>
          <Typography align="center" variant="h6" sx={{ marginTop: "5%" }}>
            No posts found.
          </Typography>
        </Grid>
      ) : (
        posts.map((post) => (
          <Grid key={post.postId} item xs={12} md={6} lg={4}>
            <Card
              sx={{
                padding: "3%",
                overflow: "hidden",
                background: "linear-gradient(45deg, #1e3c72, #2a5298)",
                color: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: "2rem",
                  fontWeight: "600",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {post.postProfile}
              </Typography>
              <Typography
                sx={{
                  marginTop: "2%",
                  fontFamily: "Poppins, sans-serif",
                }}
                variant="body1"
              >
                Description: {post.postDesc}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontFamily: "Poppins, sans-serif", marginTop: "1%" }}
              >
                Experience: {post.reqExperience} years
              </Typography>
              <Typography
                sx={{ fontFamily: "Poppins, sans-serif", marginTop: "1%" }}
              >
                Skills:
              </Typography>
              {post.postTechStack.map((skill, index) => (
                <Typography key={index} variant="body2">
                  {skill}
                  {index !== post.postTechStack.length - 1 ? ", " : ""}
                </Typography>
              ))}
              <Box sx={{ marginTop: "2%", display: "flex", gap: "10px" }}>
                <DeleteIcon
                  onClick={() => handleDelete(post.postId)}
                  sx={{ cursor: "pointer", color: "white" }}
                />
                <EditIcon
                  onClick={() => handleEdit(post.postId)}
                  sx={{ cursor: "pointer", color: "white" }}
                />
              </Box>
            </Card>
          </Grid>
        ))
      )}

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Search;
