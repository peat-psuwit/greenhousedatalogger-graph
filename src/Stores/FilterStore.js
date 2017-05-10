import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import moment from 'moment';

import ActionTypes from './AppActionTypes.js';
import dispatcher from './AppDispatcher.js';

moment.locale('th');

class FilterStore extends ReduceStore {
    getInitialState() {
        return Immutable.Map({
            sensors: Immutable.Set(),
            startDate: moment(),
            endDate: moment(),
            selectedField: null
        });
    }

    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.SET_FILTER_ADD_SENSOR:
                return state.update('sensors', (sensors) => sensors.add(action.sensor))

            case ActionTypes.SET_FILTER_REMOVE_SENSOR:
                return state.update('sensors', (sensors) => sensors.remove(action.sensor));

            case ActionTypes.SET_FILTER_START_DATE:
                return state.set('startDate', moment(action.startDate));
                //TODO: check with SensorDataRangeStore

            case ActionTypes.SET_FILTER_END_DATE:
                return state.set('endDate', moment(action.endDate));

            case ActionTypes.SET_FILTER_SELECTED_FIELD:
                return state.set('selectedField', action.selectedField);

            default:
                return state;
        }
    }
}

export default new FilterStore(dispatcher);
