import {Route, Routes, Navigate} from 'react-router-dom';
import Main from '@/pages/Main';
import Users from '@/pages/Users';
import EditUser from '@/pages/EditUser';

const MyRoutes = () => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/users/:id" element={<EditUser />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
