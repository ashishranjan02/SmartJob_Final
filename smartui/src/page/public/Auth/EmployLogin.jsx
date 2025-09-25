import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff, Work } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/employ/employAuthSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "", role: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false); // ✅ FIX: added success state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const loginResponse = await dispatch(login(formData)).unwrap();
    const token = loginResponse.token;
    const role = loginResponse.role?.toLowerCase(); // fix here

    // Save to localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", role);

    console.log("Role received:", role);

    setSuccess(true);

    // Redirect based on role
    if (role === "admin") {
      window.location.href = `http://localhost:5174/?token=${token}&role=${role}`;
    } else if (role === "recruiter") {
      window.location.href = `http://localhost:3000/?token=${token}&role=${role}`;
    }
  } catch (err) {
    console.error("Login failed", err);
    setSuccess(false);
  }
};


  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
          backgroundRepeat: "repeat",
          color: "#1e293b",
          p: { xs: 2, md: 0 },
        }}
      >
        {/* LEFT SIDE - Branding */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            px: { xs: 2, md: 10 },
            py: 6,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Work sx={{ fontSize: 40, mr: 1, color: "#6a1b9a" }} />
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(45deg, #6a1b9a, #6a1b9a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "1px",
              }}
            >
              Smart Job
            </Typography>
          </Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#1e293b" }}
          >
            Find the <span style={{ color: "#6a1b9a" }}>right job</span> or hire
            the best talent
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 5, color: "#6a1b9a", fontWeight: 400 }}
          >
            Just like Apna, SmartJob helps you connect with the right people
            quickly and easily.
          </Typography>
          {/* Stats */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 8 }}
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            <Box>
              <Typography variant="h6" fontWeight="bold" color="#6a1b9a">
                5 Crore+
              </Typography>
              <Typography variant="body2" color="#6a1b9a">
                Candidates
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="#6a1b9a">
                6 Lakh+
              </Typography>
              <Typography variant="body2" color="#6a1b9a">
                Employers
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="#6a1b9a">
                800+
              </Typography>
              <Typography variant="body2" color="#6a1b9a">
                Cities
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* RIGHT SIDE - Login Box */}
        <Box
          sx={{
            width: { xs: "100%", md: "420px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 2, md: 0 },
            py: { xs: 4, md: 0 },
          }}
        >
          <Card
            sx={{
              width: "100%",
              px: { xs: 2, sm: 4 },
              py: { xs: 4, sm: 6 },
              borderRadius: 4,
              background: "linear-gradient(145deg, #ffffff, #e3f2fd)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
              border: "1px solid rgba(25,118,210,0.3)",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 1, textAlign: "center", color: "#6a1b9a" }}
              >
                Sign in to your account
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 3, textAlign: "center", color: "#6a1b9a" }}
              >
                Enter your credentials to access your dashboard
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Login successful! Redirecting...
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "#6a1b9a" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  select
                  fullWidth
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  margin="normal"
                  required
                >
                  <MenuItem value="Recruiter">Recruiter</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </TextField>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.3,
                    bgcolor: "#6a1b9a",
                    "&:hover": { bgcolor: "#6a1b9a" },
                    borderRadius: 3,
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>

                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ color: "#6a1b9a" }}>
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      style={{
                        color: "#6a1b9a",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      Sign up here
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
