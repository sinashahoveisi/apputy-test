import type {FC} from 'react';
import {ToastContainer, Flip} from 'react-toastify';

const ToastConfig: FC = () => {
  return (
    <ToastContainer
      position="bottom-right"
      theme="dark"
      autoClose={1000}
      newestOnTop
      // limit={2}
      hideProgressBar
      // className="text-xs"
      // bodyClassName="m-0 p-0"
      transition={Flip}
      rtl
      closeOnClick
      pauseOnHover
      pauseOnFocusLoss
      draggable
    />
  );
};

export default ToastConfig;
