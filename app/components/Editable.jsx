import React from 'react';

export default ({
	value,
	onEdit,
	onValueClick,
	editing,
	onDelete,
	...props
}) => {
	const finishEdit = (e) => {
		const value = e.target.value;
		if (onEdit) {
			onEdit(value);
		}
	};

	const checkEnter = (e) => {
		if (e.key === 'Enter') {
			finishEdit(e);
		}
	};

	const renderEdit = () => {
		return <input
			type='text'
			ref={
				(e) => {
					e ? e.selectionStart = value.length : null;
				}
			}
			autoFocus={true}
			defaultValue={value}
			onBlur={finishEdit}
			onKeyDown={checkEnter}
		/>;
	}

	const renderDelete = () => {
		return <button onClick={onDelete} className='delete-note'>x</button>;
	};

	const renderValue = () => {
		return (
			<div onClick={onValueClick}>
				<span className='value'>{value}</span>
				{onDelete ? renderDelete() : null}
			</div>
		);
	}



	return (
		<div {...props}>
			{editing ? renderEdit() : renderValue()}
		</div>
	)
}
