import { createStore } from 'redux';

import reducers from './reducers';

function configureStore(initialState) {
  return createStore(
      reducers,
      initialState,
  );
}

export default store = configureStore();