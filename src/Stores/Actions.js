import ActionTypes from './AppActionTypes.js';
import dispatcher from './AppDispatcher.js';

const Actions = {
    setFilterAddSensor(sensor) {
        dispatcher.dispatch({
            type: ActionTypes.SET_FILTER_ADD_SENSOR,
            sensor
        });
    },

    setFilterRemoveSensor(sensor) {
        dispatcher.dispatch({
            type: ActionTypes.SET_FILTER_REMOVE_SENSOR,
            sensor
        });
    },

    setFilterStartDate(startDate) {
        dispatcher.dispatch({
            type: ActionTypes.SET_FILTER_START_DATE,
            startDate
        });
    },

    setFilterEndDate(endDate) {
        dispatcher.dispatch({
            type: ActionTypes.SET_FILTER_END_DATE,
            endDate
        });
    },

    setFilterSelectedField(selectedField) {
        dispatcher.dispatch({
            type: ActionTypes.SET_FILTER_SELECTED_FIELD,
            selectedField
        });
    },

    requestSensorList() {
        dispatcher.dispatch({
            type: ActionTypes.SENSOR_LIST_REQUEST
        });
    },

    receivedSensorList(sensors, nextPageToken) {
        dispatcher.dispatch({
            type: ActionTypes.SENSOR_LIST_RECEIVED,
            sensors,
            nextPageToken
        })
    },

    errorInSensorListRequest(error) {
        dispatcher.dispatch({
            type: ActionTypes.SENSOR_LIST_ERROR,
            error
        })
    }
}

export default Actions;
