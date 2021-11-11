import { ChangeEvent, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  createActionChangeCurrentUsers,
  createActionChangeValueInSearchInput,
} from '../../store/reducers/usersReducer';
import { IUser } from '../../types/users';
import { UserItem } from '../usersItem/usersItem';
import './usersList.css';

interface IUsersListProps {
  users: IUser[];
}

export const UsersList: FC<IUsersListProps> = ({ users }) => {
  const roles: string[] = [];
  const dispatch = useDispatch();
  const { currentUsers, valueInSearchInput } = useSelector(
    (state: RootState) => state.users
  );
  users.forEach((user) =>
    roles.includes(user.role) ? null : roles.push(user.role)
  );

  const currentUsersList = users.filter(
    (user) =>
      currentUsers.includes(user.role) && user.name.includes(valueInSearchInput)
  );

  const handlerChangeCurrentUsers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(createActionChangeCurrentUsers(event.target.value));
  };

  const handlerChangeValueInSearchInput = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(createActionChangeValueInSearchInput(event.target.value));
  };

  return (
    <div className='users-list'>
      <h1>Список пользователей:</h1>
      <form
        onKeyDown={(event) =>
          event.code === 'Enter' ? event.preventDefault() : null
        }
      >
        {roles.map((role) => (
          <label key={Math.random()}>
            {role}
            <input
              type='checkbox'
              value={role}
              checked={currentUsers.includes(role)}
              onChange={(event) => handlerChangeCurrentUsers(event)}
            />
          </label>
        ))}
        <input
          type='search'
          value={valueInSearchInput}
          onChange={handlerChangeValueInSearchInput}
          placeholder='Введите имя для поиска'
        />
      </form>
      {currentUsersList.length === 0 ? (
        <h1>Список пуст...</h1>
      ) : (
        <ul>
          {currentUsersList.map((user) => (
            <li key={user.id}>
              <UserItem user={user} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
