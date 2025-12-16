import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Stack,
} from "@mui/material";
import { Work } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../../features/candidate/loginSlice.js";

const CandidateLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Redirect if token exists (already logged in)
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setSuccess(false);
    }
  };

  useEffect(() => {
    // Clear error when component unmounts
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          background: "linear-gradient(135deg, #f3e5f5, #e1bee7)",
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/cubes.png')",
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
                background: "linear-gradient(45deg, #6a1b9a, #ab47bc)",
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
            Candidate <span style={{ color: "#6a1b9a" }}>Login</span> to find
            the best jobs
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 5, color: "#475569", fontWeight: 400 }}
          >
            Just like Apna, SmartJob helps candidates connect with recruiters
            quickly and easily.
          </Typography>
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
              background: "linear-gradient(145deg, #ffffff, #f3e5f5)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
              border: "1px solid rgba(106,27,154,0.3)",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 1, textAlign: "center", color: "#1e293b" }}
              >
                Candidate Sign In
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 3, textAlign: "center", color: "#475569" }}
              >
                Login with email and password to access your dashboard
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

              <Box component="form" onSubmit={handleLoginSubmit}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
                />

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
                    "&:hover": { bgcolor: "#4a148c" },
                    borderRadius: 3,
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ color: "#475569" }}>
                    Don’t have an account?{" "}
                    <Link
                      to="/candidate-register"
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

export default CandidateLoginPage;