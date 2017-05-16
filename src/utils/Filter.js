import Immutable from 'immutable';
import moment from 'moment';

moment.locale('th');

const SECRET = 'SECRET_' + Math.random();

export default class Filter {
    constructor(secret, sensors, startDate, endDate, selectedField) {
        if (secret !== SECRET)
              throw new Error('Construct Filter using Filter.newInstance()');

        this._sensors = sensors;
        this._startDate = startDate;
        this._endDate = endDate;
        this._selectedField = selectedField;
    }

    getSensors() {
        return this._sensors;
    }

    getStartDate() {
        return this._startDate;
    }

    getEndDate() {
        return this._endDate;
    }

    getSelectedField() {
        return this._selectedField;
    }

    addSensors(sensorsToAdd) {
        var hasModified = false;
        var newSensors = this._sensors.withMutations((newSensors) => {
            sensorsToAdd.forEach((sensorToAdd) => {
                if (!this._sensors.has(sensorToAdd)) {
                    hasModified = true;
                    newSensors.add(sensorToAdd);
                }
            });
        });

        if (!hasModified)
            return this;

        return new Filter(
            SECRET,
            newSensors,
            this._startDate,
            this._endDate,
            this._selectedField
        );
    }

    removeSensors(sensorsToRemove) {
        var hasModified = false;
        var newSensors = this._sensors.withMutations((newSensors) => {
            sensorsToRemove.forEach((sensorToRemove) => {
                if (this._sensors.has(sensorToRemove)) {
                    hasModified = true;
                    newSensors.delete(sensorToRemove);
                }
            });
        });

        if (!hasModified)
            return this;

        return new Filter(
            SECRET,
            newSensors,
            this._startDate,
            this._endDate,
            this._selectedField
        );
    }

    setStartDate(startDate) {
        var startDateM = moment(startDate);

        if (startDateM.isSame(this._startDate))
            return this;

        return new Filter(
            SECRET,
            this._sensors,
            startDateM,
            this._endDate,
            this._selectedField
        );
    }

    setEndDate(endDate) {
        var endDateM = moment(endDate);

        if (endDateM.isSame(this._endDate))
            return this;

        return new Filter(
            SECRET,
            this._sensors,
            this._startDate,
            endDateM,
            this._selectedField
        );
    }

    setSelectedField(selectedField) {
        if (this._selectedField === selectedField)
            return this;

        return new Filter(
            SECRET,
            this._sensors,
            this._startDate,
            this._endDate,
            selectedField
        );
    }

    static newInstance() {
        return new Filter(
            SECRET,
            Immutable.Set(),
            null,
            null,
            ''
        );
    }
}
