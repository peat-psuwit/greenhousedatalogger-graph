import {ReduceStore} from 'flux/utils';
import ActionTypes from './AppActionTypes.js';
import dispatcher from './AppDispatcher.js';

import moment from 'moment';

class FilterStore extends ReduceStore {
    getInitialState() {
        return {
            sensor: [],
            startDate: moment(),
            endDate: moment(),
            propertyWanted: null
        };
    }

    reduce(oldState, action) {
        switch (action.type) {
            case ActionTypes.SET_FILTER:
                var state = {...oldState, ...action.filter};
                //TODO: check with SensorDataRangeStore
                return state;
            default:
                return oldState;
        }
    }
}

export default new FilterStore(dispatcher);
