import {ReduceStore} from 'flux/utils';
import moment from 'moment';

import ActionTypes from './AppActionTypes.js';
import dispatcher from './AppDispatcher.js';

moment.locale('th');

class SensorDataRangeStore extends ReduceStore {
    getInitialState() {
        return {
            minimumDate: null,
            maximumDate: null
        };
    }

    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.SENSOR_DATA_REQUEST:
                return {
                    minimumDate: null,
                    maximumDate: null
                };

            case ActionTypes.SENSOR_DATA_RECEIVED:
                if (!action.sensorData)
                    return state;

                return action.sensorData.reduce(function(state, currentSensorData) {
                    var min, max;

                    if (!state.minimumDate)
                        min = moment(currentSensorData.timestamp);
                    else
                        min = moment.min(state.minimumDate, moment(currentSensorData.timestamp));

                    if (min.isValid()) state.minimumDate = min;

                    if (!state.maximumDate)
                        max = moment(currentSensorData.timestamp);
                    else
                        max = moment.max(state.maximumDate, moment(currentSensorData.timestamp));

                    if (max.isValid()) state.maximumDate = max;

                    return state;

                }, {...state}); //New object

            default:
                return state;
        }
    }
}

export default new SensorDataRangeStore(dispatcher);
