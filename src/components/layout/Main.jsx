import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";

const Main = () => {
	return (
		<frameElement>
			<Header></Header>
			<Outlet></Outlet>
		</frameElement>
	);
};

export default Main;
