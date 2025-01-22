import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { decryptPassword, encryptPassword } from "../utils/HashPassword";
import PasswordTable from "./PasswordTable";

const Hero = () => {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm();
	const [togglePassword, setTogglePassword] = useState(false);
	const [passwords, setPasswords] = useState([]);

	useEffect(() => {
		let password = localStorage.getItem("password");
		if (password) {
			setPasswords(JSON.parse(password));
		}
	}, []);

	// add password
	const onSubmit = (data) => {
		const hashedData = [
			{
				url: data.url,
				username: data.username,
				password: encryptPassword(data.password),
				id: uuidv4(),
			},
			...passwords,
		];
		if (data) {
			const encryptedPassword = encryptPassword(data.password);
		}

		setPasswords(hashedData);
		localStorage.setItem("password", JSON.stringify(hashedData));
		toast.success("Password saved successfully", {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
		reset();
	};

	// delete password
	const deletePassword = (id) => {
		let text = "Do you want to delete";
		if (confirm(text)) {
			setPasswords(passwords.filter((item) => item.id !== id));
			localStorage.setItem(
				"password",
				JSON.stringify(passwords.filter((item) => item.id !== id))
			);
			toast.success("Password deleted", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};

	// edit password
	const editPassword = (id) => {
		const filteredPasswords = passwords.filter((item) => item.id !== id);
		setPasswords(filteredPasswords);
		const passwordToEdit = passwords.find((item) => item.id === id);
		const decryptedPassword = decryptPassword(passwordToEdit.password);
		if (passwordToEdit) {
			setValue("url", passwordToEdit.url);
			setValue("username", passwordToEdit.username);
			setValue("password", decryptedPassword);
		}
	};

	// toggle password
	const HandleTogglePassword = () => {
		setTogglePassword((prev) => !prev);
	};

	return (
		<div className="text-center mt-10">
			<div className="font-bold text-3xl ">
				<span className="text-green-500">&#60;</span>
				<span className="text-black">Pass</span>
				<span className="text-green-500">OP&#47;&#62;</span>
			</div>
			<p className="text-[#768e7f]">Your own Password Manager</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full lg:w-2/4 mx-auto px-5"
			>
				<div className="w-full flex flex-col gap-2">
					<input
						className="w-full p-2 rounded-full pl-3 ring-1 focus:outline-2 outline-green-500 mt-5"
						type="text"
						name="url"
						placeholder="Enter Website URL"
						{...register("url", { required: true })}
					/>
					{errors.url && (
						<span className="text-red-500">This field is required</span>
					)}
				</div>
				<div className="lg:flex gap-3 mt-5">
					<div className="w-full flex flex-col gap-2 mb-5 lg:mb-0">
						<input
							className="w-full p-2 rounded-full pl-3 ring-1 focus:outline-2 outline-green-500"
							type="text"
							name="username"
							placeholder="Enter Username"
							{...register("username", { required: true })}
						/>
						{errors.username && (
							<span className="text-red-500">This field is required</span>
						)}
					</div>
					<div className="w-full flex flex-col gap-2">
						<div className="relative flex items-center">
							<input
								className="w-full lg:min-w-72 p-2 rounded-full pl-3 ring-1 focus:outline-2 outline-green-500 pr-12"
								type={togglePassword ? "text" : "password"}
								name="password"
								placeholder="Enter Password"
								{...register("password", { required: true })}
							/>
							{togglePassword ? (
								<Eye
									onClick={HandleTogglePassword}
									className="cursor-pointer absolute right-3"
								/>
							) : (
								<EyeOff
									onClick={HandleTogglePassword}
									className="cursor-pointer absolute right-3"
								/>
							)}
						</div>
						{errors.password && (
							<span className="text-red-500">This field is required</span>
						)}
					</div>
				</div>
				<button className=" text-white bg-green-500 rounded-full px-4 py-2 font-semibold border border-white mt-5">
					Submit
				</button>
			</form>
			{passwords && passwords.length === 0 ? (
				<div className="mt-40">No passwords</div>
			) : (
				<PasswordTable
					passwords={passwords}
					deletePassword={deletePassword}
					editPassword={editPassword}
					setPasswords={setPasswords}
				/>
			)}
		</div>
	);
};

export default Hero;
