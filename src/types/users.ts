export interface IUsersState {
  users: IUser[];
  loaded: boolean;
  changed: boolean;
  changedUser: number;
  currentUsers: string[];
  valueInSearchInput: string;
}

export interface IUser {
  name: string;
  role: string;
  id: number;
}

export enum UsersActions {
  LOAD_USERS = 'LOAD_USERS',
  ADD_USER = 'ADD_USER',
  DELETE_USER = 'DELETE_USER',
  CHANGE_USER = 'CHANGE_USER',
  SHOULD_CHANGE = 'SHOULD_CHANGE',
  CHANGE_CURRENT_USERS = 'CHANGE_CURRENT_USERS',
  CHANGE_VALUE_IN_SEARCH_INPUT = 'CHANGE_VALUE_IN_SEARCH_INPUT',
}

interface ILoadUsers {
  type: UsersActions.LOAD_USERS;
  payload: IUser[];
}

interface IAddUser {
  type: UsersActions.ADD_USER;
  payload: IUser;
}

interface IDeleteUser {
  type: UsersActions.DELETE_USER;
  payload: IUser;
}

interface IChangeUser {
  type: UsersActions.CHANGE_USER;
  payload: IUser;
}

interface IShouldChange {
  type: UsersActions.SHOULD_CHANGE;
  payload: number;
}

interface IChangeCurrentUsers {
  type: UsersActions.CHANGE_CURRENT_USERS;
  payload: string;
}

interface IChangeValueInSearchInput {
  type: UsersActions.CHANGE_VALUE_IN_SEARCH_INPUT;
  payload: string;
}

export type UsersAction =
  | ILoadUsers
  | IAddUser
  | IDeleteUser
  | IChangeUser
  | IShouldChange
  | IChangeCurrentUsers
  | IChangeValueInSearchInput;
