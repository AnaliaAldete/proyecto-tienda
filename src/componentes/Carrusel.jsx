import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import { Box } from "@mui/material";

export const Carrusel = () => {
	return (
		<Box
			sx={{
				height: { xs: "30vh", md: "60vh" },
				overflow: "hidden",
				width: { xs: "calc(100% + 32px)", sm: "100%" },
				marginLeft: { xs: "-16px", sm: "0" },
			}}
		>
			<Splide
				options={{
					type: "loop",
					perPage: 1,
					perMove: 1,
					height: "60vh",
					breakpoints: {
						600: {
							arrows: false,
						},
						850: { height: "30vh" },
					},
				}}
			>
				{[banner1, banner2, banner3, banner4].map((banner, index) => (
					<SplideSlide key={index}>
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
					</SplideSlide>
				))}
			</Splide>
		</Box>
	);
};
