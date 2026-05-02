import React, { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Paper
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.password || !form.confirmPassword) {
    setError("All fields are required ❌");
    return;
  }

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match ❌");
    return;
  }

  setError("");

  // ✅ Create new user
  const newUser = {
      // json-server id
    studentId: "STU" + Math.floor(100 + Math.random() * 900), // STU123
    name: form.name,
    email: form.email,
    password: form.password,
    tasks: []   // 👈 empty tasks
  };

  // ✅ Save to API
  fetch("http://localhost:4000/details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
  .then(() => {
    // ✅ Store logged-in user (IMPORTANT)
    localStorage.setItem("user", JSON.stringify(newUser));

    // ✅ Go to home
    navigate("/home");
  });
};



  
  return (

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f5f5f5"
    }}>

      <Paper elevation={5} style={{
        padding: "30px",
        width: "100%",
        maxWidth: "450px",
        borderRadius: "15px"
      }}>

        <Typography variant="h5" align="center" gutterBottom>
          Sign <span style={{ color: "#1976d2" }}>Up</span>
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            margin="normal"
            value={form.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            margin="normal"
            value={form.confirmPassword}
            onChange={handleChange}
            error={
              form.confirmPassword &&
              form.password !== form.confirmPassword
            }
            helperText={
              form.confirmPassword &&
              form.password !== form.confirmPassword
                ? "Passwords do not match"
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {error && (
            <Typography color="error" align="center" style={{ marginTop: "10px" }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ marginTop: "20px" }}
            onClick={()=>{handleSubmit()}}
          >
            Sign Up
          </Button>

        </form>

        <Typography align="center" style={{ marginTop: "15px" }}>
          Already have an account? <Link to="/login">Log In</Link>
        </Typography>

      </Paper>

    </div>
  );
}

export default SignUp;