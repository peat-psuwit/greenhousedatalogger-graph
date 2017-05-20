import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';

import ActionTypes from './AppActionTypes.js';
import Actions from './Actions.js';
import dispatcher from './AppDispatcher.js';

import SensorDataManager from '../data_manager/SensorDataManager.js';
import PartiallyLoadObject from '../utils/PartiallyLoadObject.js';

var lastNextPageToken = null;

class SensorStore extends ReduceStore {
    getInitialState() {
        setTimeout(function() {
            Actions.requestSensorList();
        }, 0);

        return PartiallyLoadObject.newInstance(Immutable.List());
    }

    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.SENSOR_LIST_REQUEST:
                SensorDataManager.requestSensorList(undefined, undefined);
                lastNextPageToken = null;
                return PartiallyLoadObject.newInstance(Immutable.List()).setLoading(true);

            case ActionTypes.SENSOR_LIST_RECEIVED:
                if (action.sensors)
                    state = state.updateValue(sensors => sensors.concat(action.sensors));

                if (action.nextPageToken === lastNextPageToken) {
                    state = state.setLoading(false).setDataComplete(true);
                }
                else {
                    state = state.setLoading(true);
                    SensorDataManager.requestSensorList(undefined, action.nextPageToken);
                    lastNextPageToken = action.nextPageToken;
                }

                return state;

            case ActionTypes.SENSOR_LIST_ERROR:
                console.error(action.error);
                return state
                    .setLoading(false)
                    .setError(action.error);

            default:
                return state;
        }
    }
}

export default new SensorStore(dispatcher);
