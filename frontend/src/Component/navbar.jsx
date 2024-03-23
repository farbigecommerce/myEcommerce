import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../reducer/Actions";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircle from "@mui/icons-material/AccountCircle";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

const pages = [
  { name: "Products", url: "/product/list/" },
  { name: "About Us", url: "/about-us" },
  { name: "Blog", url: "/blog" },
];

const Navbar = ({ logout, isAuthenticated,cart_items_quantity }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            style={{ color: "inherit" }}
          >
            AntuFit
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar-nav"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar-nav"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)} // Ensure menu is open only if anchorElNav is not null
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.url}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            style={{ color: "inherit" }}
          >
            AntuFit
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.url}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Badge badgeContent={cart_items_quantity} sx={{ mr: { xs: 3 } }} color="secondary">
                <Link to="/cart" component={IconButton} sx={{ p: 0 }}>
                  <ShoppingCartIcon sx={{ color: 'white' }} />
                </Link>
              </Badge>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircle sx={{ color: "white", fontSize: "30px" }} />
                </IconButton>
              </Tooltip>
              {anchorElUser && (
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar-user"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    key={1}
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to="/change/password/"
                  >
                    <Typography textAlign="center" variant="inherit">
                      Change Password
                    </Typography>
                  </MenuItem>
                  <MenuItem key={2} onClick={logout}>
                    <Typography textAlign="center" variant="inherit">
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              )}
            </Box>
          ) : (
            <div>
              {currentPath !== "/login/" ? (
                <Button
                  color="inherit"
                  to="login/"
                  component={Link}
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                  style={{ color: "inherit" }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  color="inherit"
                  to="signup/"
                  component={Link}
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                  style={{ color: "inherit" }}
                >
                  Signup
                </Button>
              )}
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    cart_items_quantity: state.CartReducer.items.length,
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
