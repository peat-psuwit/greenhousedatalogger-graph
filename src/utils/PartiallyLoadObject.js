const SECRET = 'SECRET_' + Math.random();

export default class PartiallyLoadObject {
    constructor(secret, value, loading, dataComplete, error) {
        if (secret !== SECRET)
              throw new Error('Construct PartiallyLoadObject using ' +
                                'PartiallyLoadObject.newInstance()');

        this._value = value;
        this._loading = loading;
        this._dataComplete = dataComplete;
        this._error = error;
    }

    getValue() {
        return this._value;
    }

    isLoading() {
        return this._loading;
    }

    isDataComplete() {
        return this._dataComplete;
    }

    getError() {
        return this._error;
    }

    updateValue(updaterFn) {
        var newValue = updaterFn(this._value);

        if (newValue === this._value)
            return this;

        return new PartiallyLoadObject(
            SECRET,
            newValue,
            this._loading,
            this._dataComplete,
            this._error
        );
    }

    setLoading(loading) {
        if (loading && this._dataComplete) {
            throw new Error('Data is complete. What do you want to load?');
        }

        if (this._loading === loading)
            return this;

            return new PartiallyLoadObject(
                SECRET,
                this._value,
                loading,
                this._dataComplete,
                this._error
            );
    }

    setDataComplete(dataComplete) {
        if (dataComplete && this._loading) {
            throw new Error('You must wait until loading is finished');
        }

        if (this._dataComplete === dataComplete)
            return this;

        return new PartiallyLoadObject(
            SECRET,
            this._value,
            this._loading,
            dataComplete,
            this._error
        );
    }

    setError(error) {
        if (this._error === error)
            return this;

        return new PartiallyLoadObject(
            SECRET,
            this._value,
            this._loading,
            this._dataComplete,
            error
        );
    }

    clearError() {
        return this.setError(null);
    }

    static newInstance(initialValue) {
        return new PartiallyLoadObject (
            SECRET,
            initialValue,
            false,
            false,
            null
        );
    }
}
