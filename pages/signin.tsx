import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import TextLink from '../components/TextLink';

type Inputs = {
  mailAddress: string;
  password: string;
};

const Signin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="container w-full">
      <div className="w-full">
        <p className="text-center pt-8 font-bold text-lg">サインイン</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="メールアドレス"
            className="block mx-auto p-1 mt-6 border-gray-300 border-2 rounded w-1/2"
            {...register('mailAddress', { required: true })}
          />
          <input
            placeholder="パスワード"
            className="block mx-auto p-1 mt-6 border-gray-300 border-2 rounded w-1/2"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <p className="text-center pt-3 text-yellow-600 text-base">
              This field is required
            </p>
          )}
          <button
            className="block mx-auto mt-6 px-8 py-2 bg-blue-600 hover:bg-indigo-600 shadow rounded text-white font-bold"
            type="submit"
          >
            ログイン
          </button>
        </form>
      </div>

      <div className="w-full text-center grid gap-8 mx-auto max-w-md">
        <p className="text-center pt-16 font-bold text-lg">
          SNSアカウントでログイン
        </p>
        <Button theme="facebook">Facebook</Button>
        <Button theme="google">Google</Button>
        <Button theme="twitter">Twitter</Button>
        <TextLink>登録はこちら</TextLink>
      </div>
    </div>
  );
};

export default Signin;
