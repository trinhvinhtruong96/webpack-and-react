import React, { } from 'react';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import AltContainer from 'alt-container';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => {
	const addLane = () => {
		LaneActions.create({ name: 'New lane' });
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div>
				<button className='add-notes' onClick={addLane}>+</button>
				<AltContainer
					stores={[LaneStore]}
					inject={{
						lanes: () => LaneStore.getState().lanes
					}}
				>
					<Lanes />
				</AltContainer>
			</div>
		</DndProvider>
	);
}

export default App
