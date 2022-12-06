import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import AltContainer from 'alt-container';

export default ({ lane, ...props }) => {

	const editNote = (id, task) => {
		// Don't modify if trying set an empty value
		if (!task.trim()) {
			return;
		}
		NoteActions.update({ id, task });
	}
	const addNote = () => {
		NoteActions.create({ task: 'New task' });
	}
	const deleteNote = (id, e) => {
		e.stopPropagation();
		NoteActions.delete(id);
	}

	return (
		<div {...props}>
			<div className='lane-header'>
				<div className='lane-add-note'>
					<button onClick={addNote}>+</button>
				</div>
				<div className='lane-name'>{lane.name}</div>
			</div>
			<AltContainer
				stores={[NoteStore]}
				inject={{
					notes: () => NoteStore.getState().notes || []
				}}
			>
				<Notes onEdit={editNote} onDelete={deleteNote} />
			</AltContainer>
		</div>
	);
}
