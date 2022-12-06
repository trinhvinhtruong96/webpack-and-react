import React from 'react';
import Note from './Note.jsx';

export default ({ notes, onEdit, onDelete }) => {
	return (
		<ul className='notes'>{notes.map(note =>
			<li className='note' key={note.id}>
				<Note
					task={note.task}
					onEdit={(task) => onEdit(note.id, task)}
					onDelete={(e) => onDelete(note.id, e)}
				/>
			</li>
		)}</ul>
	);
}
