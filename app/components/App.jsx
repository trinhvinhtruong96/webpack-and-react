import React, { useEffect, useState } from 'react';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

const App = () => {
	const [notes, setNotes] = useState(NoteStore.getState().notes);

	const addNote = () => {
		NoteActions.create({ task: 'New task' });
	}

	const editNote = (id, task) => {
		if (!task.trim()) {
			return;
		}
		NoteActions.update({ id, task });
	}

	const onDelete = (id, e) => {
		e.stopPropagation();
		NoteActions.delete(id)
	}

	const storeChanged = (state) => {
		setNotes(state.notes);
	};

	useEffect(() => {
		NoteStore.listen(storeChanged);
		return () => {
			NoteStore.unlisten(storeChanged);
		}
	}, [])

	return (
		<div>
			<button className='add-notes' onClick={addNote}>+</button>
			<Notes
				notes={notes}
				onEdit={editNote}
				onDelete={onDelete}
			/>
		</div>
	);

}

export default App
