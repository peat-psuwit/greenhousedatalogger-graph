import fetchJsonp from 'fetch-jsonp';

const BASE_URL = 'https://greenhousedatalogger.appspot.com/_ah/api';
const SENSOR_URL = BASE_URL + '/sensor/v1';
const GHRECORDING_URL = BASE_URL + '/ghRecording/v1';

function convertToJson(response) {
    return response.json();
}

const SensorAPI = {
    list(limit, nextPageToken) {
        var url = new URL(SENSOR_URL + '/sensor');

        if (limit != undefined)
            url.searchParams.set('limit', limit.toString(10));

        if (nextPageToken != undefined)
            url.searchParams.set('cursor', nextPageToken);

        return fetchJsonp(url.href)
            .then(convertToJson);
    }
}

export SensorAPI;

const GhRecordingAPI = {
    listData(limit, nextPageToken) {
        var url = new URL(GHRECORDING_URL + '/GreenhouseRecordList');

        if (limit != undefined)
            url.searchParams.set('limit', limit.toString(10));

        if (nextPageToken != undefined)
            url.searchParams.set('cursor', nextPageToken);

        return fetchJsonp(url.href)
            .then(convertToJson);
    }
}

export GhRecordingAPI;