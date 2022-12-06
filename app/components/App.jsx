import React, { } from 'react';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import AltContainer from 'alt-container';

const App = () => {
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

	return (
		<div>
			<button className='add-notes' onClick={addNote}>+</button>
			<AltContainer
				stores={[NoteStore]}
				inject={{
					notes: () => NoteStore.getState().notes
				}}
			>
				<Notes
					onEdit={editNote}
					onDelete={onDelete}
				/>
			</AltContainer>
		</div>
	);

}

export default App
