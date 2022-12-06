import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import AltContainer from 'alt-container';
import LaneActions from '../actions/LaneActions';

export default ({ lane, ...props }) => {

	const editNote = (id, task) => {
		// Don't modify if trying set an empty value
		if (!task.trim()) {
			return;
		}
		NoteActions.update({ id, task });
	}
	const addNote = () => {
		const laneId = lane.id;
		const note = NoteActions.create({ task: 'New task' });
		LaneActions.attachToLane({
			noteId: note.id,
			laneId
		});
	}
	const deleteNote = (noteId, e) => {
		e.stopPropagation();
		const laneId = lane.id;
		LaneActions.detachFromLane({ laneId, noteId });
		NoteActions.delete(noteId);
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
					notes: () => NoteStore.getNotesByIds(lane.notes)
				}}
			>
				<Notes onEdit={editNote} onDelete={deleteNote} />
			</AltContainer>
		</div>
	);
}
