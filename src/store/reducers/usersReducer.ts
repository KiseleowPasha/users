import { Dispatch } from 'react';
import {
  IUser,
  IUsersState,
  UsersAction,
  UsersActions,
} from '../../types/users';

const localState: IUsersState = {
  users: [],
  loaded: false,
  changed: false,
  changedUser: 0,
  currentUsers: ['Администратор', 'Пользователь', 'Гость'],
  valueInSearchInput: '',
};

export const usersReducer = (
  state = localState,
  action: UsersAction
): IUsersState => {
  switch (action.type) {
    case UsersActions.LOAD_USERS:
      return { ...state, users: [...action.payload], loaded: true };
    case UsersActions.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case UsersActions.DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter((user) => user.id !== action.payload.id)],
      };
    case UsersActions.CHANGE_USER: {
      const currentUser = state.users.find(
        (user) => user.id === action.payload.id
      );
      if (currentUser) {
        currentUser.name = action.payload.name;
        currentUser.role = action.payload.role;
      }
      return { ...state, changed: false };
    }
    case UsersActions.SHOULD_CHANGE:
      return { ...state, changed: true, changedUser: action.payload };
    case UsersActions.CHANGE_CURRENT_USERS: {
      state.currentUsers.includes(action.payload)
        ? (state.currentUsers = [
            ...state.currentUsers.filter((user) => user !== action.payload),
          ])
        : (state.currentUsers = [...state.currentUsers, action.payload]);
      return { ...state };
    }
    case UsersActions.CHANGE_VALUE_IN_SEARCH_INPUT:
      return { ...state, valueInSearchInput: action.payload };
    default:
      return state;
  }
};

const createActionLoadUsers = (users: IUser[]): UsersAction => {
  return {
    type: UsersActions.LOAD_USERS,
    payload: users,
  };
};

export const fetchUsers = (): Function => {
  return (dispatch: Dispatch<UsersAction>): void => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((users: IUser[]) => dispatch(createActionLoadUsers(users)));
  };
};

export const createActionAddUser = (user: IUser): UsersAction => {
  return {
    type: UsersActions.ADD_USER,
    payload: user,
  };
};

export const createActionDeleteUser = (user: IUser): UsersAction => {
  return {
    type: UsersActions.DELETE_USER,
    payload: user,
  };
};

export const createActionChangeUser = (user: IUser): UsersAction => {
  return {
    type: UsersActions.CHANGE_USER,
    payload: user,
  };
};

export const createActionShouldChange = (id: number): UsersAction => {
  return {
    type: UsersActions.SHOULD_CHANGE,
    payload: id,
  };
};

export const createActionChangeCurrentUsers = (value: string): UsersAction => {
  return {
    type: UsersActions.CHANGE_CURRENT_USERS,
    payload: value,
  };
};

export const createActionChangeValueInSearchInput = (
  value: string
): UsersAction => {
  return {
    type: UsersActions.CHANGE_VALUE_IN_SEARCH_INPUT,
    payload: value,
  };
};
