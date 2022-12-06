import React, { useState } from 'react';

export default ({ task, onEdit }) => {
	const [editing, setEditing] = useState(false);

	const finishEdit = (e) => {
		const value = e.target.value;
		if (onEdit) {
			onEdit(value);
			setEditing(false);
		}
	};


	const checkEnter = (e) => {
		if (e.key === 'Enter') {
			finishEdit(e);
		}
	};

	const edit = () => {
		setEditing(true);
	}

	const renderEdit = () => {
		return <input
			type='text'
			ref={
				(e) => {
					e ? e.selectionStart = task.length : null;
				}
			}
			autoFocus={true}
			defaultValue={task}
			onBlur={finishEdit}
			onKeyDown={checkEnter}
		/>;
	}

	const renderNote = () => {
		return <div onClick={edit}>{task}</div>;
	}

	if (editing) {
		return renderEdit();
	}
	return renderNote();
}
