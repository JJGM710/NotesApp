import React, { useState, useEffect } from 'react';
import { JournalEntries } from './JournalEntries';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from './../../actions/auth';
import { startNewNote } from '../../actions/notes';

export const SideBar = () => {
	const dispatch = useDispatch();
	const { name } = useSelector((state) => state.auth);
	const { config } = useSelector((state) => state.notes);
	const [userbanner, setUserbanner] = useState();
	// console.log(config);
	const handleLogout = () => {
		dispatch(startLogout());
	};

	const handleAddNew = () => {
		dispatch(startNewNote());
	};

	useEffect(() => {
		if (config > 0) {
			setUserbanner(config);
		} else if (config === 0) {
			setUserbanner('No hay entradas');
		}
	}, [setUserbanner, config]);

	return (
		<aside className="journal__sidebar animate__animated animate__fadeIn animate__faster">
			<div className="journal__sidebar-navbar">
				<h3 className="mt-1">
					<i className="fas fa-user-astronaut"></i>
					<span>{`  ${name}  (${
						userbanner ? userbanner : 'Loading...'
					})`}</span>
				</h3>

				<button className="btn btn-danger" onClick={handleLogout}>
					Logout
				</button>
			</div>

			<div className="journal__new-entry" onClick={handleAddNew}>
				<i className="far fa-calendar-plus fa-3x"></i>
				<p className="mt-1"> New Entry</p>
			</div>

			<JournalEntries />
		</aside>
	);
};
