"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import Link from "next/link";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getAuth, signOut } from "firebase/auth";
import { useCart } from "@/context/CartContext";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const { cartItems } = useCart();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("signout hogya");
      })
      .catch((error) => {
        console.log("error hogya", error);
      });
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "white", color: "#db2777", width: "100%" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Link href="/" passHref>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Image src="/assets/imgs/logo1.png" alt="Logo" width={100} height={100} />
            </Typography>
          </Link>

          {/* Mobile Menu Button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <ul className="flex flex-col justify-center gap-2 items-center text-xl">
                  <li><Link href="/home" className="hover:border-b-2 border-[#9d174d]">Home</Link></li>
                  <li><Link href="/products" className="hover:border-b-2 border-[#9d174d]">Products</Link></li>
                  <li><Link href="/about" className="hover:border-b-2 border-[#9d174d]">About Us</Link></li>
                  <li><Link href="/contact" className="hover:border-b-2 border-[#9d174d]">Contact Us</Link></li>
                </ul>
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Link href="/" passHref>
            <Typography
              variant="h5"
              noWrap
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
            >
              <Image src="/assets/imgs/logo1.png" alt="Logo" width={100} height={100} />
            </Typography>
          </Link>

          {/* Desktop Nav Links */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <ul className="flex justify-center gap-4 items-center text-xl pt-2">
              <li><Link href="/home" className="hover:border-b-2 border-[#9d174d]">Home</Link></li>
              <li><Link href="/products" className="hover:border-b-2 border-[#9d174d]">Products</Link></li>
              <li><Link href="/about" className="hover:border-b-2 border-[#9d174d]">About Us</Link></li>
              <li><Link href="/contact" className="hover:border-b-2 border-[#9d174d]">Contact Us</Link></li>
            </ul>
          </Box>

          {/* Icons Section */}
          <div className="header-icons" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Cart Icon with Count */}
            <Link href="/cart" passHref>
              <IconButton aria-label="Cart" className="icon-button" style={{ color: "#9d174d", position: "relative" }}>
                <AddShoppingCartIcon style={{ fontSize: "32px" }} />
                {cartItems.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "#db2777",
                      color: "#fff",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </IconButton>
            </Link>

            {/* Account Icon */}
            <Link href="/login" passHref>
              <IconButton aria-label="Account" className="icon-button" style={{ color: "#9d174d" }}>
                <AccountCircleIcon style={{ fontSize: "32px" }} />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </Container>

      <style jsx>{`
        .icon-button:hover {
          transform: scale(1.2);
          transition: transform 0.3s ease;
        }
      `}</style>
    </AppBar>
  );
}

export default Navbar;
