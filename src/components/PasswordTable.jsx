import { Copy, Eye, EyeOff, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { decryptPassword, encryptPassword } from "../utils/HashPassword";

const PasswordTable = ({
	passwords,
	deletePassword,
	editPassword,
	setPasswords,
}) => {
	// Update togglePassword to be an object that stores the toggle state for each password by ID
	const [togglePassword, setTogglePassword] = useState({});

	const copyText = (text) => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text);
			toast.success("Copied to clipboard", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} else {
			toast.error("Your browser does not support this feature", {
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

	const handleTogglePassword = (id) => {
		setTogglePassword((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}));

		const findPassword = passwords.find((item) => item.id === id);

		if (findPassword) {

			const decryptedPassword = decryptPassword(findPassword.password);
			const encryptedPassword = encryptPassword(findPassword.password);

			if (!togglePassword[id]) {
				setPasswords((prevState) =>
					prevState.map((item) =>
						item.id === id ? { ...item, password: decryptedPassword } : item
					)
				);
			} else {
				setPasswords((prevState) =>
					prevState.map((item) =>
						item.id === id ? { ...item, password: encryptedPassword } : item
					)
				);
			}
		}
	};

	return (
		<div className="relative overflow-x-auto select-none min-w-full lg:px-24">
			<table className="w-full  text-sm text-left rtl:text-right ">
				<thead className="text-base text-gray-700 uppercase ">
					<tr>
						<th scope="col" className="px-6 py-3">
							Site
						</th>
						<th scope="col" className="px-6 py-3">
							Username
						</th>
						<th scope="col" className="px-6 py-3">
							Password
						</th>
						<th scope="col" className="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{passwords &&
						passwords.map((item) => (
							<tr key={item.id} className="border-b">
								<th
									scope="row"
									className="px-6 py-4 font-medium  whitespace-nowrap"
								>
									<div className="flex gap-1 ">
										<a href={item.url} target="_blank">
											{item.url}
										</a>
										<Copy
											className="cursor-pointer"
											onClick={() => copyText(item.url)}
										/>
									</div>
								</th>
								<td className="px-6 py-4">
									<div className="flex gap-1">
										{item.username}
										<Copy
											className="cursor-pointer"
											onClick={() => copyText(item.username)}
										/>
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="flex gap-1">
										<input
											className="bg-transparent outline-none max-w-[100px]"
											type={togglePassword[item.id] ? "text" : "password"}
											value={item.password}
											readOnly
										/>
										<button onClick={() => handleTogglePassword(item.id)}>
											{togglePassword[item.id] ? (
												<Eye className="cursor-pointer" />
											) : (
												<EyeOff className="cursor-pointer" />
											)}
										</button>
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="flex gap-5 ">
										<Pencil
											className="cursor-pointer text-green-500"
											onClick={() => editPassword(item.id)}
										/>
										<Trash
											className="cursor-pointer text-red-500"
											onClick={() => deletePassword(item.id)}
										/>
									</div>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default PasswordTable;
