import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

const drawerWidth = 240;
const navItems = [
  { label: "Home", path: "/" },
  { label: "Job", path: "/job" },
  { label: "Companies", path: "/companies" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { token } = useSelector((state) => state.auth);

  const handleClick = () => navigate("/");
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", py: 3 }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2, color: "#6a1b9a", letterSpacing: 1 }}
      >
        SmartJOB
      </Typography>
      <Divider sx={{ bgcolor: "rgba(106,27,154,0.3)" }} />
      <List>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  textAlign: "center",
                  borderRadius: "8px",
                  mx: 2,
                  my: 0.5,
                  bgcolor: isActive ? "rgba(106,27,154,0.2)" : "transparent",
                  color: "#6a1b9a",
                  "&:hover": { bgcolor: "rgba(106,27,154,0.2)" },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}

        {/* ✅ Mobile: Profile or Login */}
        {!token ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/candidate-login"
                sx={{
                  textAlign: "center",
                  mt: 1,
                  borderRadius: "20px",
                  mx: 2,
                  bgcolor: "#0288d1",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "rgba(2,136,209,0.8)" },
                }}
              >
                <ListItemText primary="Candidate Login" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/login"
                sx={{
                  textAlign: "center",
                  mt: 1,
                  borderRadius: "20px",
                  mx: 2,
                  bgcolor: "#6a1b9a",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "rgba(106,27,154,0.8)" },
                }}
              >
                <ListItemText primary="Employer Login" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/profile"
              sx={{
                textAlign: "center",
                mt: 2,
                borderRadius: "20px",
                mx: 2,
                bgcolor: "#6a1b9a",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { bgcolor: "rgba(106,27,154,0.8)" },
              }}
            >
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />

      {/* Header */}
      <Box
        component="header"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          px: { xs: 2, sm: 3, md: 8, lg: 12 },
          py: 1.5,
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ cursor: "pointer", color: "#6a1b9a", letterSpacing: 1 }}
          onClick={handleClick}
        >
          Smart<span style={{ color: "#ffeb3b" }}>JOB</span>
        </Typography>

        {/* Desktop Nav */}
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            flex: 1,
            justifyContent: "center",
          }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  fontWeight: 500,
                  fontSize: "15px",
                  color: "#6a1b9a",
                  borderRadius: "20px",
                  px: 2.5,
                  mx: 1,
                  textTransform: "none",
                  bgcolor: isActive ? "rgba(106,27,154,0.1)" : "transparent",
                  "&:hover": { bgcolor: "rgba(106,27,154,0.1)" },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        {/* ✅ Desktop: Profile or Login */}
        <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 2 }}>
          {!token ? (
            <>
              <Button
                component={Link}
                to="/candidate-login"
                sx={{
                  backgroundColor: "#0288d1",
                  color: "#fff",
                  fontWeight: "bold",
                  px: 3,
                  borderRadius: "20px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "rgba(2,136,209,0.8)" },
                }}
              >
                Candidate Login
              </Button>

              <Button
                component={Link}
                to="/login"
                sx={{
                  backgroundColor: "#6a1b9a",
                  color: "#fff",
                  fontWeight: "bold",
                  px: 3,
                  borderRadius: "20px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "rgba(106,27,154,0.8)" },
                }}
              >
                Employer Login
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/profile"
              sx={{
                backgroundColor: "#6a1b9a",
                color: "#fff",
                fontWeight: "bold",
                px: 3,
                borderRadius: "20px",
                textTransform: "none",
                "&:hover": { backgroundColor: "rgba(106,27,154,0.8)" },
              }}
            >
              Profile
            </Button>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", lg: "none" } }}>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon sx={{ color: "#6a1b9a" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#ffffff",
            color: "#6a1b9a",
            boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Header;
