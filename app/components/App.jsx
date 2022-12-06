import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Notes from './Notes';

const App = () => {
	const [notes, setNotes] = useState([
		{
			id: uuidv4(),
			task: 'Learn Webpack'
		},
		{
			id: uuidv4(),
			task: 'Learn React'
		},
		{
			id: uuidv4(),
			task: 'Do laundry'
		}
	]);

	const handleAddNote = () => {
		setNotes(notes.concat([
			{
				id: uuidv4(),
				task: 'New task'
			}
		]))
	}

	const editNote = (id, task) => {
		if (!task.trim()) {
			return;
		}
		const newNote = notes.map(note => {
			if (note.id === id) {
				note.task = task;
			}
			return note;
		})
		setNotes(newNote);
	}

	return (
		<div>
			<button onClick={handleAddNote}>+</button>
			<Notes notes={notes} onEdit={editNote} />
		</div>
	);

}

export default App
