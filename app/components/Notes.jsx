import React from 'react';
import Note from './Note.jsx';

export default ({ notes, onEdit }) => {
	return (
		<ul>{notes.map(note =>
			<li key={note.id}>
				<Note task={note.task} onEdit={(task) => onEdit(note.id, task)} />
			</li>
		)}</ul>
	);
}
