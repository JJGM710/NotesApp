import { loadNotes } from './loadNotes';

export const loadEntries = async (uid) => {
	// console.log(uid);
	// const entradas = await db.collection(`${uid}/config/totalentries`).get();

	// let entries = {};
	// entradas.forEach((snaphijo) => {
	// 	entries = { id: snaphijo.id, ...snaphijo.data() };
	// });

	const notes = await loadNotes(uid);
	// console.log(notes);
	const entries = notes.length;
	// notesSnap.forEach((snaphijo) => {
	// 	notes.push({ id: snaphijo.id, ...snaphijo.data() });
	// });

	return entries;
};
