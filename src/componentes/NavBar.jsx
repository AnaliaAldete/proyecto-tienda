import * as React from "react";
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	MenuItem,
	Avatar,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { OrderContext } from "../context/OrderContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { Carrito } from "../componentes/Carrito";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const pages = ["Productos", "Ordenes"];

export function NavBar() {
	const { usuario } = useContext(UserContext);
	const { vaciarCarrito } = useContext(OrderContext);
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const navigate = useNavigate();

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

	const handleLogOut = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				vaciarCarrito();
				navigate("/login");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl" sx={{ padding: "8px 24px 8px 24px" }}>
				<Toolbar disableGutters>
					<Box
						component="img"
						src={logo}
						alt="Logo"
						sx={{
							width: 50,
							height: 50,
							borderRadius: "50%",
							objectFit: "cover",
							display: { xs: "none", md: "flex" },
							mr: 1,
						}}
					/>
					<Typography
						variant="h6"
						noWrap
						href="#app-bar-with-responsive-menu"
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
						<Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
							TechLink
						</Link>
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
							sx={{ p: 0 }}
						>
							<GiHamburgerMenu />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">
										<Link
											to={`/${page}`}
											style={{ textDecoration: "none", color: "inherit" }}
										>
											{page}
										</Link>
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box
						component="img"
						src={logo}
						alt="Logo"
						sx={{
							width: 50,
							height: 50,
							borderRadius: "50%",
							objectFit: "cover",
							display: { xs: "flex", md: "none" },
							mr: 1,
						}}
					/>
					<Typography
						variant="h5"
						noWrap
						href="#app-bar-with-responsive-menu"
						sx={{
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						TechLink
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<MenuItem key={page} onClick={handleCloseNavMenu}>
								<Typography textAlign="center">
									<Link
										to={`/${page}`}
										style={{ textDecoration: "none", color: "inherit" }}
									>
										{page}
									</Link>
								</Typography>
							</MenuItem>
						))}
					</Box>

					<Box display="flex" gap="16px" sx={{ flexGrow: 0 }}>
						<Carrito />

						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
							{usuario ? (
								<Avatar sx={{ width: 35, height: 35, bgcolor: pink[500] }}>
									{usuario.nombre ? usuario.nombre[0].toUpperCase() : "U"}
								</Avatar>
							) : (
								<Link
									to={"/Login"}
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<Avatar
										src="/broken-image.jpg"
										sx={{ width: 35, height: 35 }}
									/>
								</Link>
							)}
						</IconButton>
						{usuario && (
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem
									onClick={() => {
										handleCloseUserMenu();
										handleLogOut();
									}}
								>
									<Typography textAlign="center">Cerrar sesión</Typography>
								</MenuItem>
							</Menu>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
