import {ReduceStore} from 'flux/utils';

import ActionTypes from './AppActionTypes.js';
import dispatcher from './AppDispatcher.js';

import Filter from '../utils/Filter.js';
import sensorDataRangeStore from './SensorDataRangeStore.js';

class FilterStore extends ReduceStore {
    getInitialState() {
        return Filter.newInstance().setSelectedField('temperature');
    }

    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.SET_FILTER_ADD_SENSOR:
                return state.addSensors([action.sensor]);

            case ActionTypes.SET_FILTER_REMOVE_SENSOR:
                return state.removeSensors([action.sensor]);

            case ActionTypes.SET_FILTER_START_DATE:
                //TODO: check with SensorDataRangeStore
                return state.setStartDate(action.startDate);

            case ActionTypes.SET_FILTER_END_DATE:
                return state.setEndDate(action.endDate);

            case ActionTypes.SET_FILTER_SELECTED_FIELD:
                return state.setSelectedField(action.selectedField);

            case ActionTypes.SENSOR_DATA_RECEIVED:
                dispatcher.waitFor([sensorDataRangeStore.getDispatchToken()]);

                var dataRange = sensorDataRangeStore.getState();

                if (!state.getStartDate())
                    state = state.setStartDate(dataRange.minimumDate);

                if (!state.getEndDate()) {
                    var endDate = dataRange.minimumDate.clone().add(1, 'day');

                    if (endDate.isAfter(dataRange.maximumDate))
                        endDate = dataRange.maximumDate;

                    state = state.setEndDate(endDate);
                }

                return state;

            default:
                return state;
        }
    }
}

export default new FilterStore(dispatcher);
