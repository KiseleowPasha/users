import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { addUserFormReducer } from './reducers/addUserFormReducer';
import { usersReducer } from './reducers/usersReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  addUserForm: addUserFormReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
