export interface IAddUserFormState {
  inputNameValue: string;
  selectRoleValue: string;
}

export enum AddUserFormActions {
  CHANGE_VALUE_IN_INPUT = 'CHANGE_VALUE_IN_INPUT',
  CHANGE_VALUE_IN_SELECT = 'CHANGE_VALUE_IN_SELECT',
}

export type AddUserFormAction = IChangeValueInInput | IChangeValueInSelect;

interface IChangeValueInInput {
  type: AddUserFormActions.CHANGE_VALUE_IN_INPUT;
  payload: string;
}

interface IChangeValueInSelect {
  type: AddUserFormActions.CHANGE_VALUE_IN_SELECT;
  payload: string;
}
