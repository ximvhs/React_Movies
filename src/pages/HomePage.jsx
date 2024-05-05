import React from "react";
import MovieList from "../components/movie/MovieList";
import Banner from "../components/banner/Banner";

const HomePage = () => {
	return (
		<frameElement>
			<Banner></Banner>
			{/* Start List items movies Now Playing */}
			<section className="movies-layout page-container pb-10">
				<h2 className="capitalize text-white mb-10 text-3xl font-bold">
					Now playing
				</h2>
				<MovieList></MovieList>
			</section>
			{/* End List items movies Now Playing */}

			{/* Start List items movies Top Rated */}
			<section className="movies-layout page-container pb-10">
				<h2 className="capitalize text-white mb-10 text-3xl font-bold">
					Top Rated
				</h2>
				<MovieList type="top_rated"></MovieList>
			</section>
			{/* End List items movies Top Rated*/}

			{/* Start List items movies Trending*/}
			<section className="movies-layout page-container pb-10">
				<h2 className="capitalize text-white mb-10 text-3xl font-bold">
					Trending
				</h2>
				<MovieList type="popular"></MovieList>
			</section>
			{/* End List items movies Trending */}
		</frameElement>
	);
};

export default HomePage;
