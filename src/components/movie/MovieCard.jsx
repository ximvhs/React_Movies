import { useNavigate } from "react-router";
import Button from "../button/Button";

const MovieCard = ({ item }) => {
	const { title, vote_average, poster_path, release_date, id } = item;
	const navigate = useNavigate();
	return (
		<>
			<div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
				<img
					src={`https://image.tmdb.org/t/p/original/${poster_path}`}
					alt="#"
					className="w-full h-[250px] object-cover rounded-lg mb-5"
				/>
				<div className="flex flex-col flex-1">
					<h3 className="text-xl font-bold mb-3">{title}</h3>
					<div className="flex justify-between items-center text-sm opacity-50 mb-10">
						<span>{new Date(release_date).getFullYear()}</span>
						<span>{vote_average}</span>
					</div>
					<Button onClick={() => navigate(`/movie/${id}`)}> Watch Now</Button>
				</div>
			</div>
		</>
	);
};

export default MovieCard;
