import {
  AddUserFormAction,
  AddUserFormActions,
  IAddUserFormState,
} from '../../types/addUserForm';

const localState: IAddUserFormState = {
  inputNameValue: '',
  selectRoleValue: 'Администратор',
};

export const addUserFormReducer = (
  state = localState,
  action: AddUserFormAction
): IAddUserFormState => {
  switch (action.type) {
    case AddUserFormActions.CHANGE_VALUE_IN_INPUT:
      return { ...state, inputNameValue: action.payload };
    case AddUserFormActions.CHANGE_VALUE_IN_SELECT:
      return { ...state, selectRoleValue: action.payload };
    default:
      return state;
  }
};

export const createActionChangeValueInInput = (
  value: string
): AddUserFormAction => {
  return {
    type: AddUserFormActions.CHANGE_VALUE_IN_INPUT,
    payload: value,
  };
};

export const createActionChangeValueInSelect = (
  value: string
): AddUserFormAction => {
  return {
    type: AddUserFormActions.CHANGE_VALUE_IN_SELECT,
    payload: value,
  };
};
