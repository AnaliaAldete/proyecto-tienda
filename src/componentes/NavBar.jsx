import React, { useState, useContext } from "react";
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
	TextField,
	Slide,
	Button,
} from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserContext } from "../context/UserContext";
import { FiltrosContext } from "../context/FiltrosContext";
import { Carrito } from "../componentes/Carrito";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import logo2 from "../assets/logo2.png";

const pages = ["Productos", "Ordenes"];

export const NavBar = () => {
	const { usuario } = useContext(UserContext);
	const {
		setValueSearch,
		categorias,
		setCategoriaSeleccionada,
		resetearFiltros,
		valueSearch,
	} = useContext(FiltrosContext);
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [searchOpen, setSearchOpen] = useState(false);
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
				navigate("/login");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const toggleSearch = () => {
		setSearchOpen(!searchOpen);
	};

	const handleSearch = (e) => {
		setValueSearch(e.target.value);
	};

	//revisar a parte de aca
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (categoria) => {
		setCategoriaSeleccionada(categoria);
		setAnchorEl(null);
	};

	return (
		<AppBar position="sticky" sx={{ backgroundColor: "#0000FF" }}>
			<Container
				maxWidth="xl"
				sx={{ padding: { xs: "8px", sm: "8px 24px 8px 24px" } }}
			>
				<Toolbar
					disableGutters
					sx={{ display: "flex", justifyContent: "space-between" }}
				>
					{/* logo para pantallas grandes */}
					<Box
						component={Link}
						to="/"
						sx={{
							display: { xs: "none", md: "flex" },
							textDecoration: "none",
							marginRight: { sx: 0, md: 3 },
						}}
					>
						<Box
							component="img"
							src={logo2}
							alt="Logo"
							sx={{
								width: 160,
							}}
						/>
					</Box>
					<Box sx={{ display: "flex", gap: 1 }}>
						{/* Menú hamburguesa*/}
						<Box
							sx={{
								display: { xs: "flex", md: "none" },
							}}
						>
							<IconButton
								size="large"
								aria-label="open navigation menu"
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
									<MenuItem
										key={page}
										onClick={
											page === "Productos"
												? resetearFiltros
												: handleCloseNavMenu
										}
									>
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

						{/* Logo pantallas pequeñas */}
						<Box
							component={Link}
							to="/"
							sx={{
								display: { xs: "flex", md: "none" },
								textDecoration: "none",
							}}
						>
							<Box
								component="img"
								src={logo2}
								alt="Logo"
								sx={{
									width: 160,
								}}
							/>
						</Box>
					</Box>

					{/* Páginas en pantallas grandes */}
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<MenuItem
								key={page}
								onClick={
									page === "Productos" ? resetearFiltros : handleCloseNavMenu
								}
							>
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

					{/* Ícono de búsqueda, carrito y avatar */}
					<Box>
						<IconButton
							onClick={toggleSearch}
							sx={{
								color: "white",
							}}
						>
							<IoSearch
								sx={{
									color: "white",
								}}
							/>
						</IconButton>
						<Carrito />
						<IconButton
							onClick={handleOpenUserMenu}
							sx={{ paddingRight: { xs: 0, sm: "8px" } }}
						>
							{usuario ? (
								<Avatar
									sx={{
										width: 30,
										height: 30,
										color: "#0000FF",
										backgroundColor: "white",
									}}
								>
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

				<Box sx={{ position: "relative", zIndex: 1 }}>
					<Slide direction="down" in={searchOpen} mountOnEnter unmountOnExit>
						<Box
							sx={{
								display: "flex",
								flexDirection: { xs: "column", sm: "row" },
								gap: { xs: 1, md: 4 },
								paddingTop: 2,
								paddingBottom: { xs: 0, sm: 1 },
							}}
						>
							{/* menu categorias */}
							<Button
								onClick={handleClick}
								endIcon={<IoIosArrowDown />}
								sx={{
									color: "white",
									paddingInline: 2,
									order: { xs: 1, sm: 0 },
								}}
							>
								Categorías
							</Button>
							<Menu
								id="menu-categorias"
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={() => setAnchorEl(null)}
							>
								{categorias.map((categoria) => (
									<MenuItem
										key={categoria}
										onClick={() => {
											handleClose(categoria);
											setValueSearch("");
										}}
									>
										{categoria}
									</MenuItem>
								))}
							</Menu>
							{/* input de búsqueda */}
							<TextField
								value={valueSearch}
								variant="outlined"
								placeholder="Eso que querés, buscalo acá..."
								fullWidth
								size="small"
								onChange={handleSearch}
								sx={{
									backgroundColor: "white",
									borderRadius: "4px",
									order: { xs: 0, sm: 1 },
								}}
							/>
						</Box>
					</Slide>
				</Box>
			</Container>
		</AppBar>
	);
};
