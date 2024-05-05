import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { fetcher, tmdbAPI } from "../../config";

// https://api.themoviedb.org/3/movie/now_playing?api_key=f248e3dafb4798632310ec893dbcd059

const MovieList = ({ type = "now_playing" }) => {
	const [movies, setMovies] = useState([]);
	const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);
	useEffect(() => {
		if (data && data.results) setMovies(data.results);
	}, [data]);
	console.log("movie: ", movies);

	return (
		<>
			<div className="movie-list">
				<Swiper grabCursor={"true"} spaceBetween={30} slidesPerView={"auto"}>
					{movies.length > 0 &&
						movies.map((item) => (
							<SwiperSlide key={item.id}>
								<MovieCard item={item}></MovieCard>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</>
	);
};

export default MovieList;
