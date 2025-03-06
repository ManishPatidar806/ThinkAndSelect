import React from "react";

const Shape = () => {
	return (
		<svg
			className="absolute top-0 right-0 hidden sm:block -z-[1]"
			width="544"
			height="495"
			viewBox="0 0 544 495"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="336.426"
				y="-167.539"
				width="175"
				height="526"
				rx="87.5"
				transform="rotate(39.7614 336.426 -167.539)"
				fill="#FFC107"
			/>
			<rect
				x="523.426"
				y="-89.5391"
				width="175"
				height="526"
				rx="87.5"
				transform="rotate(39.7614 523.426 -89.5391)"
				fill="#2F80ED"
			/>
			<rect
				x="721.426"
				y="-21.5391"
				width="175"
				height="526"
				rx="87.5"
				transform="rotate(39.7614 721.426 -21.5391)"
				fill="#FF774D"
			/>
		</svg>
	);
};

const NotFound = () => {
	return (
		<section className="ezy__httpcodes4 dark py-48 md:py-80  dark:bg-[#0b1727] text-[#04004d] dark:text-white relative overflow-hidden z-[1] min-h-screen" style={{ backgroundColor: "#EEF2FF" }}>
			<Shape />

			<div className="container px-4 mx-auto">
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-12 lg:col-span-5 text-center lg:text-start flex flex-col h-full justify-center">
						<h2 className="text-[80px] leading-none font-bold md:text-[100px] mb-6">
							404
						</h2>
						<p className="text-xl leading-none opacity-80 md:text-[28px]">
							Something Missing ,Page not found!
						</p>
						
					</div>
					<div className="col-span-12 lg:col-span-7">
						<img
							src="https://res.cloudinary.com/dgmsfmeaz/image/upload/v1730317301/KnowledgeTest/ldmmhhyangsyeidp6foj.png"
							alt=""
							className="max-w-full h-auto"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFound;