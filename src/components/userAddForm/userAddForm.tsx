import { response } from 'express';
import { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  createActionChangeValueInInput,
  createActionChangeValueInSelect,
} from '../../store/reducers/addUserFormReducer';
import {
  createActionAddUser,
  createActionChangeUser,
} from '../../store/reducers/usersReducer';
import { IUser } from '../../types/users';

export const UserAddForm: FC = () => {
  const { inputNameValue, selectRoleValue } = useSelector(
    (state: RootState) => state.addUserForm
  );
  const { changed, changedUser } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch();

  const handlerChangeInputNameValue = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(createActionChangeValueInInput(event.target.value));
  };

  const handlerChangeValueInSelect = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    dispatch(createActionChangeValueInSelect(event.target.value));
  };

  const handlerAddUser = () => {
    if (inputNameValue !== '' && !changed) {
      const newUser: IUser = {
        id: Date.now(),
        name: inputNameValue,
        role: selectRoleValue,
      };
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(newUser),
      }).then((response) => {
        if (response.status === 200) {
          dispatch(createActionAddUser(newUser));
          dispatch(createActionChangeValueInInput(''));
        }
      });
    } else if (inputNameValue !== '' && changed) {
      const currentUser: IUser = {
        id: changedUser,
        name: inputNameValue,
        role: selectRoleValue,
      };
      fetch('/api/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(currentUser),
      }).then((response) => {
        if (response.status === 200) {
          dispatch(createActionChangeUser(currentUser));
          dispatch(createActionChangeValueInInput(''));
        }
      });
    }
  };

  return (
    <form className='add-user-form'>
      <h4>Форма ввода пользователя</h4>
      <input
        type='text'
        value={inputNameValue}
        onChange={handlerChangeInputNameValue}
        placeholder='Введите имя пользователя'
      />
      <select onChange={handlerChangeValueInSelect}>
        <option value='Администратор'>Администратор</option>
        <option value='Пользователь'>Пользователь</option>
        <option value='Гость'>Гость</option>
      </select>
      <input
        type='submit'
        value={changed ? 'Изменить' : 'Добавить'}
        onClick={(event) => {
          event.preventDefault();
          handlerAddUser();
        }}
      />
    </form>
  );
};
