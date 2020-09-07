import React from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from './../../actions/notes';

export const NotesAppBar = () => {
	const dispatch = useDispatch();
	const { active } = useSelector((state) => state.notes);
	// const noteDate = moment(active.update);

	const handleSave = () => {
		// console.log(active);
		dispatch(startSaveNote(active));
	};

	const handlePictureUpload = () => {
		console.log('picture');
		document.querySelector('#fileSelector').click();
		document.querySelector('#fileSelector').value = '';
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		console.log(e);
		if (file) {
			dispatch(startUploading(file));
		}
	};

	return (
		<div className="notes__appbar">
			{active.update && (
				<Moment interval={60000} fromNow>
					{active.update}
				</Moment>
			)}
			{/* <span>{noteDate.fromNow()}</span> */}

			<input
				id="fileSelector"
				type="file"
				name="file"
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>

			<div>
				<button className="btn btn-info" onClick={handlePictureUpload}>
					Picture
				</button>
				<button className="btn btn-success ml-1" onClick={handleSave}>
					Save
				</button>
			</div>
		</div>
	);
};
