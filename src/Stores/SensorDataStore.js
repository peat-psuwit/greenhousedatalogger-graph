import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import moment from 'moment';

import ActionTypes from './AppActionTypes.js';
import Actions from './Actions.js';
import dispatcher from './AppDispatcher.js';

import GhRecordingDataManager from '../data_manager/GhRecordingDataManager.js';
import PartiallyLoadObject from '../utils/PartiallyLoadObject.js';

import sensorDataRangeStore from './SensorDataRangeStore.js';
import filterStore from './FilterStore.js';

var lastNextPageToken = null;

class SensorDataStore extends ReduceStore {
    getInitialState() {
        setTimeout(function() {
            Actions.requestSensorData();
        }, 0);

        return PartiallyLoadObject.newInstance(Immutable.Map());
    }

    loadMoreDataIfNeeded(state) {
        if (state.isDataComplete())
            return state;

        let dataRange = sensorDataRangeStore.getState();
        let filter = filterStore.getState();

        if (dataRange.maximumDate.diff(filter.getEndDate(), 'day') < 1) {
            GhRecordingDataManager.requestSensorData(100, lastNextPageToken);
            return state.setLoading(true);
        }
        else {
            return state.setLoading(false);
        }
    }

    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.SENSOR_DATA_REQUEST:
                GhRecordingDataManager.requestSensorData(100, undefined);
                lastNextPageToken = null;
                return PartiallyLoadObject.newInstance(Immutable.Map()).setLoading(true);

            case ActionTypes.SENSOR_DATA_RECEIVED:
                if (action.sensorData)
                    state = state.updateValue(function (value) {
                        var newData = Immutable.Seq(action.sensorData)
                            .map((value) => {
                                value.timestamp = moment(value.timestamp);
                                return value;
                            })
                            .groupBy((value) => value.sensorId);

                        return value.mergeWith((oldVal, newVal) => oldVal.concat(newVal), newData);
                    });

                if (action.nextPageToken === lastNextPageToken) {
                    state = state.setLoading(false).setDataComplete(true);
                }
                else {
                    lastNextPageToken = action.nextPageToken;

                    dispatcher.waitFor([
                        sensorDataRangeStore.getDispatchToken(),
                        filterStore.getDispatchToken()
                    ]);

                    state = this.loadMoreDataIfNeeded(state);
                }

                return state;

            case ActionTypes.SET_FILTER_END_DATE:
                dispatcher.waitFor([
                    sensorDataRangeStore.getDispatchToken(),
                    filterStore.getDispatchToken()
                ]);

                if (state.isLoading())
                    return state;

                return this.loadMoreDataIfNeeded(state);

            default:
                return state;
        }
    }
}

export default new SensorDataStore(dispatcher);
