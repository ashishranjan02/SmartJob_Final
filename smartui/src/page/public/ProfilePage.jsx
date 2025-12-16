import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/candidate/loginSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f5f5",
        }}
      >
        <Typography variant="h6">No profile data found. Please log in.</Typography>
      </Box>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #2575fc, #6a11cb)",
        p: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "90%",
          maxWidth: 700,
          borderRadius: 5,
          p: 4,
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          bgcolor: "rgba(255,255,255,0.95)",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Avatar
            sx={{ width: 100, height: 100, mx: "auto", bgcolor: "#6a11cb" }}
          >
            {user.name ? user.name[0].toUpperCase() : "U"}
          </Avatar>
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
            {user.name || "Unnamed User"}
          </Typography>
          <Typography color="text.secondary">{user.email}</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <CardContent>
          <Stack spacing={2}>
            <Typography>
              <b>Phone:</b> {user.phone || "Not provided"}
            </Typography>
            <Typography>
              <b>Date of Birth:</b> {user.dob || "Not provided"}
            </Typography>
            <Typography>
              <b>Location:</b> {user.location || "Not provided"}
            </Typography>
            <Typography>
              <b>Hometown:</b> {user.hometown || "Not provided"}
            </Typography>
            <Typography>
              <b>LinkedIn:</b>{" "}
              {user.linkedin ? (
                <a href={user.linkedin} target="_blank" rel="noreferrer">
                  {user.linkedin}
                </a>
              ) : (
                "Not provided"
              )}
            </Typography>
            <Typography>
              <b>Portfolio:</b>{" "}
              {user.portfolio ? (
                <a href={user.portfolio} target="_blank" rel="noreferrer">
                  {user.portfolio}
                </a>
              ) : (
                "Not provided"
              )}
            </Typography>
            <Typography>
              <b>Resume:</b>{" "}
              {user.resume ? (
                <a href={user.resume} target="_blank" rel="noreferrer">
                  Download Resume
                </a>
              ) : (
                "Not uploaded"
              )}
            </Typography>
          </Stack>
        </CardContent>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            sx={{ bgcolor: "#6a11cb", "&:hover": { bgcolor: "#2575fc" } }}
            onClick={() => navigate("/update-profile")}
          >
            Edit Profile
          </Button>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Profile;