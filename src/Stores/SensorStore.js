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

        return Immutable.Map({
            loading: false,
            dataComplete: false,
            error: null,
            sensors: Immutable.List()
        });
    }

    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.SENSOR_LIST_REQUEST:
                SensorDataManager.requestSensorList(undefined, undefined);
                return state.merge({
                    loading: true,
                    sensors: Immutable.List()
                });

            case ActionTypes.SENSOR_LIST_RECEIVED:
                return state.withMutations(function (state) {
                    if (action.sensors)
                        state.update('sensors', (sensors) => sensors.concat(action.sensors));

                    if (action.nextPageToken === lastNextPageToken) {
                        state.merge({
                            loading: false,
                            dataComplete: true
                        });
                    }
                    else {
                        state.set('loading', true);
                        SensorDataManager.requestSensorList(undefined, action.nextPageToken);
                        lastNextPageToken = action.nextPageToken;
                    }
                });

            default:
                return state;
        }
    }
}

export default new SensorStore(dispatcher);
