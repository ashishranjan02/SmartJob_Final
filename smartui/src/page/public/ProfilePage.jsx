import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Divider,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import { logout } from "../../features/candidate/loginslice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">You need to log in first.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        py: 4,
      }}
    >
      <Card
        sx={{
          width: 700,
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          p: 3,
        }}
      >
        {/* Profile Picture */}
        <Box sx={{ textAlign: "center" }}>
          <Avatar
            src={user.photo ? `http://localhost:5000/uploads/${user.photo}` : ""}
            alt={user.name}
            sx={{
              width: 100,
              height: 100,
              mx: "auto",
              mb: 2,
              border: "3px solid #6a1b9a",
            }}
          />
          <Typography variant="h6" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Personal Information */}
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Stack spacing={1.2} sx={{ mb: 3 }}>
            <Typography>
              <strong>Phone:</strong> {user.phone || "Not Provided"}
            </Typography>
            <Typography>
              <strong>Date of Birth:</strong> {user.dob || "Not Provided"}
            </Typography>
            <Typography>
              <strong>Gender:</strong> {user.gender || "Not Provided"}
            </Typography>
            <Typography>
              <strong>Current Location:</strong> {user.location || "Not Provided"}
            </Typography>
            <Typography>
              <strong>Home Town:</strong> {user.hometown || "Not Provided"}
            </Typography>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Work Experience */}
          <Typography variant="h6" gutterBottom>
            Work Experience
          </Typography>
          {user.experience && user.experience.length > 0 ? (
            <Stack spacing={1} sx={{ mb: 3 }}>
              {user.experience.map((exp, idx) => (
                <Typography key={idx}>
                  • {exp.role} at {exp.company} ({exp.duration})
                </Typography>
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              No work experience added.
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Internships */}
          <Typography variant="h6" gutterBottom>
            Internships
          </Typography>
          {user.internships && user.internships.length > 0 ? (
            <Stack spacing={1} sx={{ mb: 3 }}>
              {user.internships.map((int, idx) => (
                <Typography key={idx}>
                  • {int.role} at {int.company} ({int.duration})
                </Typography>
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              No internships added.
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Education */}
          <Typography variant="h6" gutterBottom>
            Education
          </Typography>
          {user.education && user.education.length > 0 ? (
            <Stack spacing={1} sx={{ mb: 3 }}>
              {user.education.map((edu, idx) => (
                <Box key={idx}>
                  <Typography fontWeight="bold">{edu.degree}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.institution} • Batch of {edu.batch}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              No education details provided.
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Links */}
          <Typography>
            <strong>LinkedIn:</strong>{" "}
            {user.linkedin ? (
              <MuiLink
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                {user.linkedin}
              </MuiLink>
            ) : (
              "Not Provided"
            )}
          </Typography>
          <Typography>
            <strong>Portfolio:</strong>{" "}
            {user.portfolio ? (
              <MuiLink
                href={user.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                {user.portfolio}
              </MuiLink>
            ) : (
              "Not Provided"
            )}
          </Typography>

          {/* Resume */}
          <Typography sx={{ mt: 1 }}>
            <strong>Resume:</strong>{" "}
            {user.resume ? (
              <MuiLink
                href={`http://localhost:5000/uploads/${user.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                Download Resume
              </MuiLink>
            ) : (
              "Not Uploaded"
            )}
          </Typography>

          {/* Logout */}
          <Button
            variant="contained"
            sx={{
              mt: 4,
              bgcolor: "#6a1b9a",
              "&:hover": { bgcolor: "#4a148c" },
              borderRadius: 3,
              px: 4,
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
