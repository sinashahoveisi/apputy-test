import {type FC, useState} from 'react';
import usePaginate from '@/hooks/request/usePaginate';
import UserTable from '@/containers/users/UsersTable';
import UsersTablePaginate from '@/containers/users/UsersTablePaginate';
import Button from '@/components/button/Button';
import LinkButton from '@/components/button/LinkButton';

const UsersPage: FC = () => {
  const [page, setPage] = useState<number>(1);

  const fetchUsers = usePaginate({
    name: ['users', 'all'],
    url: 'users',
    page,
    enabled: true
  });

  const onRefetch = () => fetchUsers.refetch();

  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8">
        <header className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-200">users</h1>
            <p className="mt-2 text-sm text-gray-400">
              A list of all the users including their avatar, first name, last name and email.
            </p>
          </div>
          <div className="mt-4 flex flex-row sm:ml-16 sm:mt-0 sm:flex-none">
            <Button
              title="Refresh"
              variant="primary"
              className="mr-2"
              onClick={onRefetch}
              isLoading={fetchUsers?.isRefetching}
            />
            <LinkButton href="/users/create" title="Add User" variant="primary-outline" />
          </div>
        </header>
        <div className="mt-8 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <UserTable users={fetchUsers?.data} isLoading={fetchUsers?.isLoading} />
            <UsersTablePaginate page={page} onChangePage={setPage} lastPage={fetchUsers?.meta?.total} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default UsersPage;
