import CryptoJS from "crypto-js";

export function encryptPassword(password) {
	const secretKey = import.meta.env.VITE_SECRET_KEY;
	const encryptedPassword = CryptoJS.AES.encrypt(
		password,
		secretKey
	).toString();
	return encryptedPassword;
}

// Function to decrypt password
export function decryptPassword(encryptedPassword) {
	const secretKey = import.meta.env.VITE_SECRET_KEY;
	const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
	const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
	return originalPassword;
}

