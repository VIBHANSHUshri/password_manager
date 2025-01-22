import { Github } from "lucide-react";

const Navbar = () => {
	return (
		<nav className=" bg-[#1e283c]">
			<div className="container mx-auto px-2 lg:px-16 py-2 flex justify-between items-center">
				<div className="font-bold text-3xl">
					<span className="text-green-500">&#60;</span>
					<span className="text-white">Pass</span>
					<span className="text-green-500">OP&#47;&#62;</span>
				</div>
				<div>
					<a
						href="https://github.com/Avijit07x?tab=repositories"
						target="_blank"
					>
						<button className="flex items-center gap-1 text-white bg-green-500 rounded-full px-2 py-1 border border-white">
							<Github />
							Github
						</button>
					</a>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
