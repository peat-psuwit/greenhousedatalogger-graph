import {ReduceStore} from 'flux/utils';

import ActionTypes from './AppActionTypes.js';
import dispatcher from './AppDispatcher.js';

import Filter from '../utils/Filter.js';

class FilterStore extends ReduceStore {
    getInitialState() {
        return Filter.newInstance().setSelectedField('temperature');
    }

    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.SET_FILTER_ADD_SENSOR:
                return state.addSensor(action.sensor);

            case ActionTypes.SET_FILTER_REMOVE_SENSOR:
                return state.removeSensor(action.sensor);

            case ActionTypes.SET_FILTER_START_DATE:
                //TODO: check with SensorDataRangeStore
                return state.setStartDate(action.startDate);

            case ActionTypes.SET_FILTER_END_DATE:
                return state.setEndDate(action.endDate);

            case ActionTypes.SET_FILTER_SELECTED_FIELD:
                return state.setSelectedField(action.selectedField);

            default:
                return state;
        }
    }
}

export default new FilterStore(dispatcher);
