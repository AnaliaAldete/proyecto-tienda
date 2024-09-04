import React, { useEffect } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import { Box } from "@mui/material";

export const Carrusel = () => {
	useEffect(() => {
		const splide = new Splide("#image-carousel", {
			type: "loop",
			autoplay: true,
			interval: 3000,
			pauseOnHover: false,
			perPage: 1,
			perMove: 1,
		});
		splide.mount();
		return () => splide.destroy();
	}, []);

	return (
		<Box
			id="image-carousel"
			className="splide"
			sx={{ height: { xs: "30vh", md: "60vh" }, overflow: "hidden" }}
		>
			<Box className="splide__track" sx={{ height: "100%" }}>
				<Box component="ul" className="splide__list">
					{[banner1, banner2, banner3, banner4].map((banner, index) => (
						<Box
							component="li"
							className="splide__slide"
							key={index}
							sx={{ height: "100%" }}
						>
							<Box
								component="img"
								src={banner}
								alt={`banner${index + 1}`}
								sx={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};
