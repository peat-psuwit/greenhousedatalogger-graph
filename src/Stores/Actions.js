import ActionTypes from './AppActionTypes.js';
import dispatcher from './AppDispatcher.js';

const Actions = {
    setFilter(filter) {
        dispatcher.dispatch({
            type: ActionTypes.SET_FILTER,
            filter
        });
    },
}

export default Actions;
