import { GhRecordingAPI } from './GreenHouseDataLoggerAPI.js';
import Actions from '../Stores/Actions.js';

const GhRecordingDataManager = {
    requestSensorData(limit, nextPageToken) {
        GhRecordingAPI.listData(limit, nextPageToken)
            .then(function(jsonResponse) {
                Actions.receivedSensorData(jsonResponse.items, jsonResponse.nextPageToken);
            })
            .catch(function(e) {
                Actions.errorInSensorDataRequest(e);
            });
    }
};

export default GhRecordingDataManager;
