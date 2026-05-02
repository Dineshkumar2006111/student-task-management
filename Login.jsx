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

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    alert("Please fill all fields ❌");
    return;
  }

  // ✅ Fetch users
  fetch("http://localhost:4000/details")
    .then((res) => res.json())
    .then((data) => {

      // ✅ Find matching user
      const user = data.find(
        (u) =>
          u.email === form.email &&
          u.password === form.password
      );

      if (user) {
        // ✅ Save user in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Go to home
        navigate("/home");
      } else {
        alert("Invalid Email or Password ❌");
      }
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
        maxWidth: "500px",   // 👈 increased width
        borderRadius: "15px"
      }}>

        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>

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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Login
          </Button>

        </form>

        <Typography align="center" style={{ marginTop: "10px" }}>
          <a href="#">Forgot Password?</a>
        </Typography>

        <Typography align="center" style={{ marginTop: "10px" }}>
          Don't have an account? <Link to="/">Sign Up</Link>
        </Typography>

      </Paper>

    </div>
  );
}

export default Login;