import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import AltContainer from 'alt-container';
import LaneActions from '../actions/LaneActions';
import Editable from './Editable.jsx';

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

	const editName = (name) => {
		const laneId = lane.id;
		// eslint-disable-next-line no-console
		console.log(`edit lane ${laneId} name using ${name}`);
	};

	const deleteLane = () => {
		const laneId = lane.id;
		// eslint-disable-next-line no-console
		console.log(`delete lane ${laneId}`);
	};

	const activateLaneEdit = () => {
		const laneId = lane.id;
		// eslint-disable-next-line no-console
		console.log(`activate lane ${laneId} edit`);
	};

	const activateNoteEdit = (id) => {
		// eslint-disable-next-line no-console
		console.log(`activate note ${id} edit`);
	}




	return (
		<div {...props}>
			<div className='lane-header' onClick={activateLaneEdit}>
				<div className='lane-add-note'>
					<button onClick={addNote}>+</button>
				</div>
				<Editable
					className='lane-name'
					editing={lane.editing}
					value={lane.name}
					onEdit={editName}
				/>
				<div className='lane-delete'>
					<button onClick={deleteLane}>x</button>
				</div>
			</div>
			<AltContainer
				stores={[NoteStore]}
				inject={{
					notes: () => NoteStore.getNotesByIds(lane.notes)
				}}
			>
				<Notes onEdit={editNote} onDelete={deleteNote} onValueClick={activateNoteEdit} />
			</AltContainer>
		</div>
	);
}
