import React, { useState } from 'react';

export default ({ task, onEdit, onDelete }) => {
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

	const renderDelete = () => {
		return <button onClick={onDelete} className='delete-note'>x</button>;
	};

	const renderNote = () => {
		return <div onClick={edit}>
			<span className='task'>{task}</span>
			{onDelete && renderDelete()}
		</div>;
	}

	if (editing) {
		return renderEdit();
	}
	return renderNote();
}
