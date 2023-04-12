import type {FC} from 'react';
import type {UserProps} from '@/types/user';

interface props {
  user: UserProps;
}

const Avatar: FC<props> = ({user}) => {
  return (
    <img
      className="h-10 w-10 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500"
      src={user.avatar}
      alt={`${user.first_name} ${user.last_name} avatar`}
    />
  );
};
export default Avatar;
