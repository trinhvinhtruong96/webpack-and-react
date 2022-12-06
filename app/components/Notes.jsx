import React from 'react';
import Editable from './Editable.jsx';

export default ({ notes, onEdit, onDelete, onValueClick }) => {
	return (
		<ul className='notes'>{notes.map(note =>
			<li className='note' key={note.id}>
				<Editable
					editing={note.editing}
					value={note.task}
					onValueClick={() => onValueClick(note.id)}
					onEdit={(task) => onEdit(note.id, task)}
					onDelete={(e) => onDelete(note.id, e)}
				/>
			</li>
		)}</ul>
	);
}
