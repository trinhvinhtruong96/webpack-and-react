import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import AltContainer from 'alt-container';
import LaneActions from '../actions/LaneActions';
import Editable from './Editable.jsx';
import itemTypes from '../constants/itemTypes.js';
import { useDrop } from 'react-dnd';

export default ({ lane, ...props }) => {

	// eslint-disable-next-line no-unused-vars
	const [{ isOver }, laneDrop] = useDrop(
		() => ({
			accept: itemTypes.NOTE,
			drop: (item) => {
				if (!lane.notes.length) {
					LaneActions.attachToLane({
						laneId: lane.id,
						noteId: item.id
					});
				}
			},
			collect: (monitor) => {
				return {
					isOver: !!monitor.isOver(),
				}
			}
		}),
		[]
	)

	const editNote = (id, task) => {
		// Don't modify if trying set an empty value
		if (!task.trim()) {
			NoteActions.update({ id, editing: false });
			return;
		}
		NoteActions.update({ id, task, editing: false });
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
		// Don't modify if trying set an empty value
		if (!name.trim()) {
			LaneActions.update({ id: laneId, editing: false });
			return;
		}
		LaneActions.update({ id: laneId, name, editing: false });
	};

	const deleteLane = () => {
		const laneId = lane.id;
		LaneActions.delete(laneId);
	};

	const activateLaneEdit = () => {
		const laneId = lane.id;
		LaneActions.update({ id: laneId, editing: true });
	};

	const activateNoteEdit = (id) => {
		NoteActions.update({ id, editing: true });
	}

	return (
		<div {...props} ref={laneDrop}>
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
