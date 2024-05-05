import { fetcher } from "../../config";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
	const { data } = useSWR(
		`https://api.themoviedb.org/3/movie/upcoming?api_key=f248e3dafb4798632310ec893dbcd059`,
		fetcher,
	);

	const movies = data?.results || [];
	return (
		<>
			<section className="banner h-[500px] page-container mb-20 overflow-hidden ">
				<Swiper>
					{movies.length > 0 &&
						movies.map((item) => (
							<SwiperSlide key={item.id}>
								<BannerItem item={item}></BannerItem>
							</SwiperSlide>
						))}
				</Swiper>
			</section>
		</>
	);
};

function BannerItem({ item }) {
	const { title, vote_average, poster_path, release_date } = item;

	return (
		<div className="w-full h-full rounded-xl relative text-white">
			<div className="overlay absolute inset-0 bg-gradient-to-t from-black to-black opacity-50 rounded-lg"></div>
			<img
				className="h-full w-full rounded-xl object-cover"
				src={`https://image.tmdb.org/t/p/original/${poster_path}`}
			/>
			<div className="absolute left-5 bottom-5 text-white">
				<h2 className="font-bold text-3xl mb-5">{title}</h2>
				<div className="flex items-center gap-x-5 mb-5">
					<span className="border border-white px-5 p-2 rounded-md ">
						Adventure
					</span>
					<span className="border border-white px-5 p-2 rounded-md ">
						Adventure
					</span>
					<span className="border border-white px-5 p-2 rounded-md ">
						Adventure
					</span>
				</div>
				<button className="px-5 py-3 bg-primary rounded-md">Watch Now</button>
			</div>
		</div>
	);
}

export default Banner;
