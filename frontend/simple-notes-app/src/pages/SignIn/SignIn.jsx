// import React from 'react'

import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleSignIn = async (e) => {
		e.preventDefault();

		if (!validateEmail(email)) {
			setError('Please enter a valid email address');
			return;
		}

		if (!password) {
			setError('Please enter your password');
			return;
		}

		setError('');
		// SignIn API call

		try {
			const response = await axiosInstance.post('/signin', {
				email: email,
				password: password,
			});
			// Handle login success response
			if (response.data && response.data.accessToken) {
				localStorage.setItem('token', response.data.accessToken);
				navigate('/dashboard');
			}
		} catch (error) {
			// Handle login error
			if (error.response && error.response.data && error.response.data.message) {
				setError(error.response.data.message);
			} else {
				setError('An unexpected error occurred. Please try again later.');
			}
		}
	};

	return (
		<>
			<Navbar />

			<div className="flex items-center justify-center mt-28">
				<div className="w-96 border rounded bg-white px-7 py-10">
					<form onSubmit={handleSignIn}>
						<h4 className="text-2xl mb-7">Sign In</h4>

						<input type="email" placeholder="Email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} />

						<PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

						{error && <p className="text-xs text-red-500 pb-1">{error}</p>}

						<button type="submit" className="btn-primary">
							Sign In
						</button>

						<p className="text-sm text-center mt-4">
							Not registered yet?{' '}
							<Link to="/signup" className="font-medium text-primary underline">
								Create an Account
							</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	);
}

export default SignIn;
