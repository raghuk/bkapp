import {showLoader, hideLoader} from '../actions/app';

export default function promise(sdk, client) {
    return ({ dispatch, getState }) => {
        return next => action => {
            if (typeof action === 'function') {
				return action(dispatch, getState);
			}

            const { promise, type, loader, ...rest } = action;
			if (!promise) {
				return next(action);
			}

            if (loader) {
				dispatch(showLoader());
			}

            const [REQUEST, SUCCESS, FAILURE] = type;
			next({ ...rest, type: REQUEST });

            return promise(sdk).then(
				(result) => {
                    dispatch(hideLoader());
                    return next({ ...rest, result, type: SUCCESS });
                },
				(error)  => {
                    throw error;
                }
			).catch((error) => {
                console.log("API call failed: ", error.message, action.type);

                dispatch(hideLoader());
				next({ ...rest, error, type: FAILURE });

                return { error: error };
			});
        };
    };
}
