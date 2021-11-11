import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchUsers } from '../store/reducers/usersReducer';
import { UserAddForm } from './userAddForm/userAddForm';
import { UsersList } from './usersList/usersList';

export const App: FC = () => {
  const dispatch = useDispatch();
  const { users, loaded } = useSelector((state: RootState) => state.users);
  useEffect((): void => {
    dispatch(fetchUsers());
  }, []);
  return (
    <>
      {loaded ? (
        <div className='app'>
          <UserAddForm />
          <UsersList users={users} />
        </div>
      ) : (
        <h1>Загрузка...</h1>
      )}
    </>
  );
};
