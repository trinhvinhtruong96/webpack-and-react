import React, { } from 'react';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import AltContainer from 'alt-container';

const App = () => {
	const addLane = () => {
		LaneActions.create({ name: 'New lane' });
	}

	return (
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
	);

}

export default App
