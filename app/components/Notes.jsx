import React from 'react';
import Editable from './Editable.jsx';
import Note from './Note.jsx';
import LaneActions from '../actions/LaneActions';

export default ({ notes, onEdit, onDelete, onValueClick }) => {
	return (
		<ul className='notes'>{notes.map(note =>
			<Note
				className='note'
				id={note.id}
				key={note.id}
				editing={note.editing}
				onMove={LaneActions.move}
			>
				<Editable
					editing={note.editing}
					value={note.task}
					onValueClick={() => onValueClick(note.id)}
					onEdit={(task) => onEdit(note.id, task)}
					onDelete={(e) => onDelete(note.id, e)}
				/>
			</Note>
		)
		}</ul >
	);
}
