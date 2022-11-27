import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';
import Frame from '../Frame';
import Loader from '../../../common/Loader/Loader';

function ResetForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
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
          重設密碼
        </h2>

        <form
          className="flex w-full flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-9">
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
                <Input
                  onChange={onChange}
                  value={value}
                  name={name}
                  type="password"
                  title="新密碼"
                  placeholder="請輸入新密碼"
                />
              )}
            />
            <p className="absolute text-label text-danger">
              {errors.password?.message}
            </p>
          </div>

          <div className="mb-9">
            <Controller
              control={control}
              name="checkPassword"
              rules={{
                required: '*請輸入密碼',
                validate: (value) => value === watch('password') || '密碼錯誤',
              }}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  onChange={onChange}
                  value={value}
                  name={name}
                  type="password"
                  title="再次輸入"
                  placeholder="請再次輸入新密碼"
                />
              )}
            />
            <p className="absolute text-label text-danger">
              {errors.checkPassword?.message}
            </p>
          </div>
          <div className="mb-8 flex w-full gap-8 self-center">
            <Link href="/login" className="w-full">
              <Button type="button" variant="outlined">
                返回
              </Button>
            </Link>
            <Button type="submit" variant="contained">
              送出
            </Button>
          </div>
        </form>
      </div>
      {loading && <Loader />}
    </div>
  );
}
export default ResetForm;
