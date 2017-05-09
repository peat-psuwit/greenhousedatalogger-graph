import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';

import ActionTypes from './AppActionTypes.js';
import Actions from './Actions.js';
import dispatcher from './AppDispatcher.js';

import SensorDataManager from '../data_manager/SensorDataManager.js';

var lastNextPageToken = null;

class SensorStore extends ReduceStore {
    getInitialState() {
        setTimeout(function() {
            Actions.requestSensorList();
        }, 0);

        return {
            loading: false,
            dataComplete: false,
            error: null,
            sensors: Immutable.List()
        };
    }

    reduce(oldState, action) {
        switch (action.type) {
            case ActionTypes.SENSOR_LIST_REQUEST:
                SensorDataManager.requestSensorList(undefined, undefined);
                return {...oldState,
                    loading: true,
                    sensors: Immutable.List() //This has to be reset
                };

            case ActionTypes.SENSOR_LIST_RECEIVED:
                var newState = {...oldState};

                if (action.sensors)
                    newState.sensors = oldState.sensors.concat(action.sensors);

                if (action.nextPageToken === lastNextPageToken) {
                    newState.loading = false;
                    newState.dataComplete = true;
                }
                else {
                    newState.loading = true;
                    SensorDataManager.requestSensorList(undefined, action.nextPageToken);
                    lastNextPageToken = action.nextPageToken;
                }

                return newState;

            default:
                return oldState;
        }
    }
}

export default new SensorStore(dispatcher);
