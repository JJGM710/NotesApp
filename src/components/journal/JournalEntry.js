import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';
export const JournalEntry = ({ id, date, title, body, url, update }) => {
	const noteDate = moment(date);
	console.log(url, update);
	const dispatch = useDispatch();
	const note = {
		title: title,
		body: body,
		date: date,
		url: url,
		update: update,
	};

	const handleEntreClick = () => {
		dispatch(activeNote(id, note));
	};

	const truncateString = (str, num) => {
		// If the length of str is less than or equal to num
		// just return str--don't truncate it.
		if (str.length <= num) {
			return str;
		}
		// Return str truncated with '...' concatenated to the end of str.
		return str.slice(0, num) + '...';
	};

	return (
		<div
			className="journal__entry animate__animated animate__fadeIn"
			onClick={handleEntreClick}
		>
			{url && (
				<div
					className="journal__entry-picture"
					style={{
						backgroundSize: 'cover',
						backgroundImage: `url(${url})`,
					}}
				></div>
			)}

			<div className="journal__entry-body">
				<p className="journal__entry-title">{truncateString(title, 30)}</p>
				<p className="journal__entry-content">{truncateString(body, 60)}</p>
			</div>

			<div className="journal__entry-date-box">
				<span>{noteDate.format('dddd')}</span>
				<h4>{noteDate.format('Do')}</h4>
			</div>
		</div>
	);
};
