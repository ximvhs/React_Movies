import { Fragment } from "react";
import "./App.scss";
import "swiper/css";
import { Routes, Route } from "react-router-dom";
import Main from "./components/layout/Main";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetailsPage from "./components/movie/MovieDetailsPage";

function App() {
	return (
		<Fragment>
			<Routes>
				<Route path="/" element={<Main></Main>}>
					<Route
						path="/"
						element={
							<>
								<HomePage></HomePage>
							</>
						}
					></Route>
					<Route path="/movies" element={<MoviePage></MoviePage>}></Route>
					<Route
						path="/movie/:movieId"
						element={<MovieDetailsPage></MovieDetailsPage>}
					></Route>
					<Route path="*" element={<div>Not Found</div>}></Route>
				</Route>
			</Routes>
		</Fragment>
	);
}

export default App;
