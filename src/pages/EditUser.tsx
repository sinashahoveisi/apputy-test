import type {FC} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {useQueryClient} from 'react-query';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigate} from 'react-router-dom';
import TextInput from '@/components/input/TextInput';
import Button from '@/components/button/Button';
import usePost from '@/hooks/request/usePost';
import {UserFormProps} from '@/types/user';
import useFetch from '@/hooks/request/useFetch';
import Spinner from '@/components/loading/Spinner';

const EditUser: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {id} = useParams<{id: string}>();

  const validationSchema = yup.object().shape({
    model: yup.string().trim().required('is Required'),
    year: yup
      .number()
      .typeError('must be number')
      .required('is Required')
      .min(1380, 'must be at least 1380')
      .max(1401, 'must not be greater than 1401.'),
    color: yup.string().trim().required('is Required')
  });
  const {handleSubmit, control} = useForm<UserFormProps>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const fetchCar = useFetch({
    name: ['cars', id],
    url: `cars/${id}`,
    enabled: id !== 'create'
  });

  const createCar = usePost({
    url: 'cars',
    onSuccess() {
      queryClient.refetchQueries('cars');
      navigate('/cars', {replace: true});
    }
  });

  const updateCar = usePost({
    url: 'cars/{id}',
    method: 'PATCH',
    onSuccess() {
      queryClient.refetchQueries('cars');
      queryClient.refetchQueries(['cars', id]);
      navigate('/cars', {replace: true});
    }
  });

  const onSubmit = (data: UserFormProps) => {
    id === 'create' ? createCar.post(data) : updateCar.post(data, null, {id});
  };

  if (fetchCar?.isError && id !== 'create') return <Navigate replace to="/cars" />;

  if (fetchCar?.isFetching)
    return (
      <div className="mt-10 flex w-full items-center justify-center">
        <Spinner size="!w-7 !h-7" className="ml-2 !p-0" />
      </div>
    );

  return (
    <form className="flex w-full flex-col items-center justify-center gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-center text-base font-thin">
        {id === 'create' ? 'Create Car' : `Update Car ${fetchCar?.data?.id}`}
      </h3>
      <TextInput name="model" label="Model" control={control} defaultValue={fetchCar?.data?.model} />
      <TextInput name="year" type="number" label="year" control={control} defaultValue={fetchCar?.data?.year} />
      <TextInput name="color" label="color" control={control} defaultValue={fetchCar?.data?.color} />
      <Button
        type="submit"
        title={id === 'create' ? 'Add Car' : 'Update Car'}
        className="!px-6"
        isLoading={createCar?.isLoading || updateCar?.isLoading}
      />
    </form>
  );
};

export default EditUser;
