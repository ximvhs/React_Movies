import { useParams } from "react-router";
import useSWR from "swr";
import { apiKey, fetcher, tmdbAPI } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";

const MovieDetailsPage = () => {
	const { movieId } = useParams();
	const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
	if (!data) return null;
	const { backdrop_path, poster_path, title, genres, overview } = data;
	console.log("data: ", data);

	return (
		<frameElement>
			<div className="w-full h-[600px] relative mb-10">
				<div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
				<div
					className="w-full h-full bg-cover bg-no-repeat rounded-xl"
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
					}}
				></div>
				<div className="w-full h-[400px] max-w-[800px] mx-auto -translate-y-2/4">
					<img
						src={`https://image.tmdb.org/t/p/original/${poster_path}`}
						alt="#"
						className="w-full h-full object-cover rounded-xl"
					/>
					<h1 className="text-center text-white text-[32px] font-bold mt-5">
						{title}
					</h1>

					{genres.length > 0 && (
						<div className="flex justify-start gap-5 mt-5">
							{genres.map((item) => (
								<span
									className="border border-primary rounded-xl px-5 py-3 text-primary font-semibold"
									key={item.id}
								>
									{item.name}
								</span>
							))}
						</div>
					)}

					<div className="my-10">
						<p className="text-xl text-justify">{overview}</p>
					</div>
				</div>
				<div className="p-10 mt-20">
					<MovieCredits></MovieCredits>
					<MoviesVideos></MoviesVideos>
					<MoviesSimilar></MoviesSimilar>
				</div>
			</div>
		</frameElement>
	);
};

function MovieCredits() {
	const { movieId } = useParams();
	const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
	if (!data) return null;
	const { cast } = data;
	console.log("data: ", data);
	if (!cast || cast.length <= 0) return null;
	return (
		<div className="mt-10">
			<h2 className="font-bold text-center text-[40px] my-10">Casts</h2>
			<div className="grid grid-cols-4 gap-5">
				{cast.slice(0, 4).map((item) => (
					<div className="cast-item" key={item.id}>
						<img
							className="w-full h-[350px] object-cover rounded-xl"
							src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
							alt=""
						/>
						<h3 className="text-center font-semibold text-[18px] mt-5">
							{item.original_name}
						</h3>
					</div>
				))}
			</div>
		</div>
	);
}

function MoviesVideos() {
	const { movieId } = useParams();
	const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
	if (!data) return null;
	const { results } = data;
	if (!results || results.length <= 0) return null;
	console.log("dataVideo: ", data);

	return (
		<div className="">
			{results.slice(0, 3).map((item) => (
				<div className="w-full aspect-video" key={item.id}>
					<h3 className="font-bold text-[24px] bg-primary inline-block px-5 py-2 rounded-lg mb-3 mt-10">
						{item.name}
					</h3>
					<iframe
						width="736"
						height="414"
						src={`https://www.youtube.com/embed/${item.key}`}
						title="Dune: Part Two - 10 Minute Preview - Warner Bros. UK &amp; Ireland"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
						className="w-full h-full object-fill rounded-xl"
					></iframe>
				</div>
			))}
		</div>
	);
}

function MoviesSimilar() {
	const { movieId } = useParams();
	const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
	if (!data) return null;
	const { results } = data;
	if (!results || results.length <= 0) return null;
	return (
		<div className="py-10">
			<h2 className="font-bold text-[32px] mb-5">Similar movies</h2>
			<div className="movie-list">
				<Swiper grabCursor={"true"} spaceBetween={30} slidesPerView={"auto"}>
					{results.length > 0 &&
						results.map((item) => (
							<SwiperSlide key={item.id}>
								<MovieCard item={item}></MovieCard>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
}

export default MovieDetailsPage;
