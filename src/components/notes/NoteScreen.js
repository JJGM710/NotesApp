import React, { useEffect, useRef } from 'react';
import { NotesAppBar } from './NotesAppBar';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from './../../hooks/useForm';
import { activeNote } from '../../actions/notes';
import { startDelete } from './../../actions/notes';
import { ImgLoad } from './ImgLoad';

export const NoteScreen = () => {
	const dispatch = useDispatch();
	const { active } = useSelector((state) => state.notes);
	const { formValues, handleInputChange, reset } = useForm({
		title: active.title,
		body: active.body,
		date: active.date,
		id: active.id,
	});
	const activeID = useRef(active.id);
	const { body, title } = formValues;
	console.log(formValues);

	useEffect(() => {
		if (active.id !== activeID.current) {
			reset({
				title: active.title,
				body: active.body,
				date: active.date,
				id: active.id,
			});
			activeID.current = active.id;
		}
	}, [active, reset]);

	useEffect(() => {
		dispatch(
			activeNote(formValues.id, {
				...formValues,
			})
		);
	}, [formValues, dispatch]);

	const handleDelete = () => {
		dispatch(startDelete(active.id));
	};

	return (
		<div className="notes__main-content animate__animated animate__zoomIn animate__faster">
			<NotesAppBar />

			<div className="notes__content">
				<input
					name="title"
					type="text"
					placeholder="Some awesome title"
					className="notes__title-input"
					value={title}
					onChange={handleInputChange}
				/>
				<textarea
					name="body"
					className="notes__textarea"
					placeholder="What happened today?"
					value={body}
					onChange={handleInputChange}
				></textarea>

				{active.url && <ImgLoad url={active.url} />}
			</div>
			<button className="btn btn-danger" onClick={handleDelete}>
				Delete
			</button>
		</div>
	);
};
