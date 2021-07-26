import { applyMiddleware, createStore, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'

import rootReducer, { AppState } from './rootReducer'
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = (middleware: any) => {
	const arrMiddleware = [middleware];

	if (process.env.NODE_ENV !== "production") {
		const { composeWithDevTools } = require("redux-devtools-extension")
		// arrMiddleware.push(createLogger());
		return composeWithDevTools(applyMiddleware(...arrMiddleware))
	}
	return applyMiddleware(...arrMiddleware)
}

export const makeStore = (context: any) => {
	const store: any = createStore(rootReducer, bindMiddleware(sagaMiddleware))

	store.runSagaTask = () => {
		store.sagaTask = sagaMiddleware.run(sagas);
	};
	
	store.runSagaTask();

	return store
}

export const wrapper = createWrapper<Store<AppState>>(makeStore, { debug: true })
