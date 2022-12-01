import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Button from '../../../common/Button/Button';
import MemberInput from '../../../common/Input/MemberInput';
import Info from '../Info';
import { LOGIN, TOGGLE_LOADER } from '../../../../constants/constants';

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = (data) => {
    dispatch({ type: TOGGLE_LOADER });
    axios
      .post('http://localhost:3001/api/users/login', data)
      .then((res) => {
        localStorage.setItem('auth', `Bearer ${res.data.token}`);
        dispatch({ type: LOGIN });
        router.push('/');
      })
      .catch((err) => {
        alert(`帳號密碼錯誤 ${err}`);
      })
      .finally(() => {
        dispatch({ type: TOGGLE_LOADER });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center laptop:mx-auto laptop:mt-20 laptop:h-150 laptop:w-204 laptop:flex-row laptop:overflow-hidden laptop:rounded-xl laptop:shadow-frame">
      <Info />

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

          <button
            className="mb-5 cursor-pointer self-end text-body"
            type="button"
          >
            <Link href="/forget-password" className="w-full">
              忘記密碼？
            </Link>
          </button>

          <div className="mb-8 flex w-full gap-8 self-center">
            <Link href="/sign-up" className="w-full">
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
    </div>
  );
}

export default LoginForm;
