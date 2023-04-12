import type {FC} from 'react';
import {useQueryClient} from 'react-query';
import usePaginate from '@/hooks/request/usePaginate';
import Button from '@/components/button/Button';
import LinkButton from '@/components/button/LinkButton';
import {UserProps} from '@/types/user';
import Spinner from '@/components/loading/Spinner';
import usePost from '@/hooks/request/usePost';
import Avatar from '@/components/image/Avatar';

const Main: FC = () => {
  const queryClient = useQueryClient();

  const fetchUsers = usePaginate({
    name: 'users',
    url: 'users',
    page: 1,
    enabled: true
  });

  console.log(fetchUsers?.data);

  const deleteUser = usePost({
    url: '/users/{id}',
    method: 'DELETE',
    onSuccess() {
      queryClient.refetchQueries('users');
    }
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
            <LinkButton href="/users/create" title="Add UserProps" variant="primary-outline" />
          </div>
        </header>
        {fetchUsers?.isLoading ? (
          <div className="mt-10 flex w-full items-center justify-center">
            <Spinner size="!w-7 !h-7" className="ml-2 !p-0" />
          </div>
        ) : (
          <div className="mt-8 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          ID
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Avatar
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          FirstName
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          LastName
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Email
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {fetchUsers?.data?.map((user: UserProps) => (
                        <tr key={user?.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {user?.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <Avatar user={user} />
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.first_name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.last_name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                          <td className="flex flex-row items-center justify-end py-4 pl-3 pr-4 sm:pr-6">
                            <Button
                              title="Delete"
                              variant="danger"
                              className="mr-2"
                              isLoading={deleteUser?.isLoading && deleteUser?.params?.id === user?.id}
                              onClick={() => deleteUser.post(null, null, user)}
                            />
                            <LinkButton title="Edit" href={`/users/${user?.id}`} variant="secondary-outline" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Main;
