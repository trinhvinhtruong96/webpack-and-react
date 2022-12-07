import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import itemTypes from '../constants/itemTypes';

export default ({ id, onMove, ...props }) => {
	// eslint-disable-next-line no-unused-vars
	const [{ isDragging }, drag] = useDrag(() => ({
		type: itemTypes.NOTE,
		item: { id },
		collect: (monitor) => {
			return {
				isDragging: !!monitor.isDragging(),
			}
		}
	}))

	// eslint-disable-next-line no-unused-vars
	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: itemTypes.NOTE,
			drop: (item) => {
				onMove({ sourceId: item.id, targetId: id });
			},
			collect: (monitor) => {
				return {
					isOver: !!monitor.isOver(),
				}
			}
		}),
		[]
	)

	return (
		<div ref={drop}>
			<div ref={drag}>
				<li  {...props}>{props.children}</li>
			</div>
		</div>
	)
}
