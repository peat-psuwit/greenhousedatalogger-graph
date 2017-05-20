import { SensorAPI } from './GreenHouseDataLoggerAPI.js';
import Actions from '../Stores/Actions.js';

const SensorDataManager = {
    requestSensorList(limit, nextPageToken) {
        SensorAPI.list(limit, nextPageToken)
            .then(function(jsonResponse) {
                Actions.receivedSensorList(jsonResponse.items, jsonResponse.nextPageToken);
            })
            .catch(function(e) {
                Actions.errorInSensorListRequest(e);
            });
    }
};

export default SensorDataManager;
