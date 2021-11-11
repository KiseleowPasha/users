import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { createActionChangeValueInInput } from '../../store/reducers/addUserFormReducer';
import {
  createActionDeleteUser,
  createActionShouldChange,
} from '../../store/reducers/usersReducer';
import { IUser } from '../../types/users';

interface IUserItemProps {
  user: IUser;
}

export const UserItem: FC<IUserItemProps> = ({ user }) => {
  const dispatch = useDispatch();

  const handlerDeleteUser = (): void => {
    fetch('/api/users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(user),
    }).then((response) =>
      response.status === 200 ? dispatch(createActionDeleteUser(user)) : null
    );
  };

  const handlerChangeUser = (): void => {
    dispatch(createActionChangeValueInInput(user.name));
    dispatch(createActionShouldChange(user.id));
  };

  return (
    <div className='user-item'>
      <span>{`${user.name}(${user.role})`}</span>
      <div className='users-action'>
        <span onClick={() => handlerChangeUser()}>Изменить</span>
        {'/'}
        <span onClick={() => handlerDeleteUser()}>Удалить</span>
      </div>
    </div>
  );
};
