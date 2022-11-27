import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Button from '../../../common/Button/Button';
import MemberInput from '../../../common/Input/MemberInput';
import Frame from '../Frame';
import Loader from '../../../common/Loader/Loader';

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post('http://localhost:3001/api/users/login', data)
      .then((res) => {
        localStorage.setItem('user', `Bearer ${res.data.token}`);
      })
      .catch((err) => {
        alert('帳號密碼錯誤');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center laptop:mx-auto laptop:mt-20 laptop:h-150 laptop:w-204 laptop:flex-row laptop:overflow-hidden laptop:rounded-xl laptop:shadow-frame">
      <Frame />

      <div className="flex w-full flex-col px-7 laptop:items-center laptop:pl-16 laptop:pr-9">
        <h2 className="mt-7 mb-6 text-h4 font-bold laptop:self-start">
          帳號登入
        </h2>

        <form
          className="flex w-full flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-9">
            <Controller
              control={control}
              name="email"
              rules={{
                required: '*請輸入帳號',
                pattern: {
                  value:
                    /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
                  message: '請輸入正確的E-mail',
                },
              }}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <MemberInput
                  onChange={onChange}
                  value={value}
                  name={name}
                  type="email"
                  title="帳號"
                  placeholder="E-mail"
                />
              )}
            />
            <p className="absolute text-label text-danger">
              {errors.email?.message}
            </p>
          </div>

          <div className="mb-4">
            <Controller
              control={control}
              name="password"
              rules={{
                required: '*請輸入密碼',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: '密碼需至少8碼、含英文字母及數字',
                },
              }}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <MemberInput
                  onChange={onChange}
                  value={value}
                  name={name}
                  type="password"
                  title="密碼"
                  placeholder="請輸入密碼"
                />
              )}
            />
            <p className="absolute text-label text-danger">
              {errors.password?.message}
            </p>
          </div>

          <span className="mb-5 cursor-pointer self-end text-body">
            忘記密碼？
          </span>

          <div className="mb-8 flex gap-8 self-center">
            <Link href="/sign-up">
              <Button type="button" variant="outlined">
                註冊帳號
              </Button>
            </Link>

            <Button type="submit" variant="contained">
              登錄
            </Button>
          </div>
        </form>
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default LoginForm;
