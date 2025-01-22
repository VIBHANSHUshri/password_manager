import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<div className="bg-[#f1fcf4] min-h-screen">
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition="Bounce"
			/>
			<ToastContainer />
			<Navbar />
			<Hero />
		</div>
	);
};

export default App;
