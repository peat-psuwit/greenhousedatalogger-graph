import ActionTypes from './AppActionTypes.js';
import dispatcher from './AppDispatcher.js';

const Actions = {
    setFilter(filter) {
        dispatcher.dispatch({
            type: ActionTypes.SET_FILTER,
            filter
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
