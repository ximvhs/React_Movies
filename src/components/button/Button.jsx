const Button = ({
	onClick,
	className,
	children,
	type = "button",
	bgColor = "primary",
}) => {
	let bgClassName = "bg-primary";
	switch (bgColor) {
		case "primary":
			bgClassName = "bg-primary";
			break;
		case "secondary":
			bgClassName = "bg-secondary";
			break;
	}
	return (
		<>
			<button
				type={type}
				onClick={onClick}
				className={`py-3 px-6 rounded-lg w-full mt-auto ${bgClassName} ${className}`}
			>
				{children}
			</button>
		</>
	);
};

export default Button;
