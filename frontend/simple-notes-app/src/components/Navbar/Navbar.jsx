// import React from 'react'

import { useNavigate } from 'react-router-dom';
import ProfileInfo from '../Cards/ProfileInfo';
import SearchBar from '../SearchBar/SearchBar';
import { useState } from 'react';

const Navbar = ({ userInfo, onSearchNote, handlerClearSearch }) => {
	const [searchQuery, setSearchQuery] = useState('');

	const navigate = useNavigate();

	const onLogout = () => {
		localStorage.clear();
		navigate('/signin');
	};

	const handleSearch = () => {
		if (searchQuery) {
			onSearchNote(searchQuery);
		}
	};
	const onClearSearch = () => {
		setSearchQuery('');
		handlerClearSearch();
	};

	return (
		<div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
			<h2 className="text-xl font-medium text-black py-2">Notes</h2>

			{userInfo && (
				<>
					<SearchBar
						value={searchQuery}
						onChange={({ target }) => {
							setSearchQuery(target.value);
						}}
						handleSearch={handleSearch}
						onClearSearch={onClearSearch}
					/>
					<ProfileInfo userInfo={userInfo} onLogout={onLogout} />
				</>
			)}
		</div>
	);
};

export default Navbar;
