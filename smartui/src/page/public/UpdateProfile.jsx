import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../features/candidate/loginSlice.js";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    //  Prefill with existing user info
    const [formData, setFormData] = useState({
        phone: user?.phone || "",
        dob: user?.dob || "",
        location: user?.location || "",
        hometown: user?.hometown || "",
        linkedin: user?.linkedin || "",
        portfolio: user?.portfolio || "",
        resume: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "resume") {
            setFormData({ ...formData, resume: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        for (const key in formData) {
            if (formData[key] && formData[key] !== "") {
                form.append(key, formData[key]);
            }
        }

        try {
            await dispatch(updateProfile(form)).unwrap();
            navigate("/profile");
        } catch (err) {
            console.error("Update failed:", err);
            alert("Profile update failed!");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "linear-gradient(135deg, #6a11cb, #2575fc)",
                p: 4,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Card
                sx={{
                    width: "90%",
                    maxWidth: 800,
                    borderRadius: 5,
                    p: 4,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                    bgcolor: "rgba(255,255,255,0.95)",
                }}
            >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Update Profile
                </Typography>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Date of Birth"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Hometown"
                                    name="hometown"
                                    value={formData.hometown}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="LinkedIn"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Portfolio"
                                    name="portfolio"
                                    value={formData.portfolio}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="outlined" component="label">
                                    Upload Resume
                                    <input
                                        type="file"
                                        hidden
                                        name="resume"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleChange}
                                    />
                                </Button>
                                {formData.resume && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {formData.resume.name}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Box sx={{ textAlign: "center", mt: 4 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    bgcolor: "#6a11cb",
                                    px: 5,
                                    py: 1.2,
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    borderRadius: "30px",
                                    "&:hover": { bgcolor: "#2575fc" },
                                }}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UpdateProfile;