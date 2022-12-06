import React from 'react';
import Note from './Note.jsx';

export default ({ notes, onEdit, onDelete }) => {
	return (
		<ul>{notes.map(note =>
			<li key={note.id}>
				<Note
					task={note.task}
					onEdit={(task) => onEdit(note.id, task)}
					onDelete={() => onDelete(note.id)}
				/>
			</li>
		)}</ul>
	);
}
