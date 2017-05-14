import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';

import ActionTypes from './AppActionTypes.js';
import Actions from './Actions.js';
import dispatcher from './AppDispatcher.js';

import GhRecordingDataManager from '../data_manager/GhRecordingDataManager.js';
import PartiallyLoadObject from '../utils/PartiallyLoadObject.js';

var lastNextPageToken = null;

class SensorDataStore extends ReduceStore {
    getInitialState() {
        setTimeout(function() {
            Actions.requestSensorData();
        }, 0);

        return PartiallyLoadObject.newInstance(Immutable.Map());
    }

    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.SENSOR_DATA_REQUEST:
                GhRecordingDataManager.listData(undefined, undefined);
                lastNextPageToken = null;
                return PartiallyLoadObject.newInstance(Immutable.Map()).setLoading(true);

            case ActionTypes.SENSOR_DATA_RECEIVED:
                if (action.sensorData)
                    state = state.updateValue(function (value) {
                        var newData = Immutable.Seq(action.sensorData)
                            .groupBy((value) => value.sensorId);

                        return value.mergeWith((oldVal, newVal) => oldVal.concat(newVal), newData);
                    });

                if (action.nextPageToken === lastNextPageToken) {
                    state = state.setLoading(false).setDataComplete(true);
                }
                else {
                    //TODO: check if it includes the whole Filter
                    state = state.setLoading(false);
                }

                return state;

            default:
                return state;
        }
    }
}

export default new SensorDataStore(dispatcher);
