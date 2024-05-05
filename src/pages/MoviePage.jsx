import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard from "../components/movie/MovieCard";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/UseDebounce";
import ReactPaginate from "react-paginate";

const itemsPerPage = 20;

const MoviePage = () => {
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	const [nextPage, setNextPage] = useState(1);
	const [filter, setFilter] = useState("");
	const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
	const filterDebounce = useDebounce(filter, 1000);
	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};

	const { data, error } = useSWR(url, fetcher);
	const loading = !data && !error;

	useEffect(() => {
		if (filterDebounce) {
			setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
		} else {
			setUrl(tmdbAPI.getMovieList("popular", nextPage));
		}
	}, [filterDebounce, nextPage]);
	const movies = data?.results || [];

	useEffect(() => {
		if (!data || !data.total_results) return;
		setPageCount(Math.ceil(data.total_results / itemsPerPage));
	}, [data, itemOffset]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.total_results;
		setItemOffset(newOffset);
		setNextPage(event.selected + 1);
	};

	return (
		<div>
			<div className="flex mb-10">
				<div className="flex-1">
					<input
						type="text"
						placeholder="Type here to search ..."
						className="text-white w-full p-4 rounded-xl outline-none text-[18px] bg-slate-800 "
						onChange={handleFilterChange}
					/>
				</div>
				<button className="px-6 py-3 bg-primary rounded-xl text-white ">
					<svg
						width="25"
						height="25"
						viewBox="0 0 25 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.813 19.9109C16.2313 19.9109 19.813 16.3292 19.813 11.9109C19.813 7.49267 16.2313 3.91095 11.813 3.91095C7.39471 3.91095 3.81299 7.49267 3.81299 11.9109C3.81299 16.3292 7.39471 19.9109 11.813 19.9109Z"
							stroke="black"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M21.8129 21.911L17.4629 17.561"
							stroke="black"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>
			{loading && (
				<div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent mx-auto animate-spin"></div>
			)}
			<div className="grid grid-cols-4 gap-10">
				{!loading &&
					movies.length > 0 &&
					movies.map((item) => (
						<MovieCard key={item.id} item={item}></MovieCard>
					))}
			</div>
			<div className="p-20">
				<ReactPaginate
					breakLabel="..."
					nextLabel="next >"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={pageCount}
					previousLabel="< previous"
					renderOnZeroPageCount={null}
					className="navigation"
				/>
			</div>
		</div>
	);
};

export default MoviePage;
