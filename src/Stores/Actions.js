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

    setFilterAddAllSensors() {
        dispatcher.dispatch({
            type: ActionTypes.SET_FILTER_ADD_ALL_SENSORS
        });
    },

    setFilterRemoveAllSensors() {
        dispatcher.dispatch({
            type: ActionTypes.SET_FILTER_REMOVE_ALL_SENSORS
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
    },

    requestSensorData() {
        dispatcher.dispatch({
            type: ActionTypes.SENSOR_DATA_REQUEST
        });
    },

    receivedSensorData(sensorData, nextPageToken) {
        dispatcher.dispatch({
            type: ActionTypes.SENSOR_DATA_RECEIVED,
            sensorData,
            nextPageToken
        })
    },

    errorInSensorDataRequest(error) {
        dispatcher.dispatch({
            type: ActionTypes.SENSOR_DATA_ERROR,
            error
        })
    }
}

export default Actions;
