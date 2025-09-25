import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import { Work, Add, CloudUpload } from "@mui/icons-material";
import { registerUser, verifyOtp } from "../../../features/candidate/loginslice.js";

const CandidateRegisterPage = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    linkedin: "",
    portfolio: "",
    otherLinks: [""],
    resume: null,
    photo: null,
  });

  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleOtherLinkChange = (index, value) => {
    const newLinks = [...formData.otherLinks];
    newLinks[index] = value;
    setFormData({ ...formData, otherLinks: newLinks });
  };

  const addOtherLink = () => {
    setFormData({ ...formData, otherLinks: [...formData.otherLinks, ""] });
  };

  // Register submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "otherLinks") {
        value.forEach((link) => data.append("otherLinks[]", link));
      } else if (value) {
        data.append(key, value);
      }
    });

    dispatch(registerUser(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setOtpStep(true);
      }
    });
  };

  // OTP submission
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ email: formData.email, code: otp }))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          alert("OTP verified! You can now log in.");
        } else {
          alert(res.payload?.message || "Invalid OTP, please try again")
        }
      });
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
          backgroundColor: "#f5f5f5",
        }}
      >
        {!otpStep ? (
          <Card
            sx={{
              width: "100%",
              maxWidth: "950px",
              borderRadius: 5,
              backdropFilter: "blur(16px)",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(243,229,245,0.9))",
              boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
              overflow: "hidden",
            }}
          >
            <Grid container>
              {/* Left Branding */}
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  background: "#6a1b9a",
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  p: 6,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Work sx={{ fontSize: 45, mr: 1, color: "#fff" }} />
                  <Typography variant="h4" fontWeight="bold">
                    Smart Job
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                  Create your <span style={{ color: "#ffe082" }}>Profile</span>
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  Join thousands of candidates building their careers with Smart Job. Upload your resume, showcase your portfolio and connect with top recruiters instantly.
                </Typography>
              </Grid>

              {/* Right Form */}
              <Grid item xs={12} md={7} sx={{ p: { xs: 3, sm: 6 } }}>
                <CardContent sx={{ p: 0 }}>
                  {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                  {message && !otpStep && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      {message}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleRegisterSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="LinkedIn URL"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                        />
                      </Grid>

                      {/* Other Links */}
                      <Grid item xs={12}>
                        {formData.otherLinks.map((link, idx) => (
                          <TextField
                            key={idx}
                            fullWidth
                            label={`Other Link ${idx + 1}`}
                            value={link}
                            onChange={(e) => handleOtherLinkChange(idx, e.target.value)}
                            sx={{ mt: 1 }}
                          />
                        ))}
                        <IconButton onClick={addOtherLink} color="secondary">
                          <Add />
                        </IconButton>
                      </Grid>

                      {/* Resume Upload */}
                      <Grid item xs={12}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 2,
                            border: "2px dashed #6a1b9a",
                            textAlign: "center",
                            cursor: "pointer",
                            "&:hover": { bgcolor: "rgba(106,27,154,0.05)" },
                          }}
                        >
                          <CloudUpload sx={{ fontSize: 40, color: "#6a1b9a" }} />
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Upload Resume (PDF)
                          </Typography>
                          <input
                            type="file"
                            name="resume"
                            onChange={handleFileChange}
                            accept=".pdf"
                            style={{ marginTop: "10px" }}
                            required
                          />
                        </Paper>
                      </Grid>

                      {/* Photo Upload */}
                      <Grid item xs={12}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 2,
                            border: "2px dashed #ab47bc",
                            textAlign: "center",
                            cursor: "pointer",
                            "&:hover": { bgcolor: "rgba(171,71,188,0.05)" },
                          }}
                        >
                          <CloudUpload sx={{ fontSize: 40, color: "#ab47bc" }} />
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Upload Photo (JPG/PNG)
                          </Typography>
                          <input
                            type="file"
                            name="photo"
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ marginTop: "10px" }}
                            required
                          />
                        </Paper>
                      </Grid>
                    </Grid>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      sx={{
                        mt: 4,
                        py: 1.3,
                        fontWeight: "bold",
                        borderRadius: 3,
                        background: "linear-gradient(45deg, #6a1b9a, #ab47bc)",
                        "&:hover": {
                          background: "linear-gradient(45deg, #4a148c, #8e24aa)",
                        },
                      }}
                    >
                      {loading ? "Registering..." : "Register"}
                    </Button>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ) : (
          <Card
            sx={{
              width: "100%",
              maxWidth: 400,
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              textAlign: "center",
              p: 3,
              background: "linear-gradient(135deg, #ffe082, #ffb74d)",
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Verify Your Email
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Enter the OTP sent to <b>{formData.email}</b>
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleOtpSubmit}>
              <TextField
                fullWidth
                label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  background: "linear-gradient(45deg, #6a1b9a, #ab47bc)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #4a148c, #8e24aa)",
                  },
                }}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default CandidateRegisterPage;
