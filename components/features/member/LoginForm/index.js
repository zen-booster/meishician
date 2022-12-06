import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { login } from '../../../../store/actions';
import Button from '../../../common/Button/Button';
import MemberInput from '../../../common/Input/MemberInput';
import Info from '../Info';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const router = useRouter();

  const { isLoginFailed, isLogin } = useSelector((state) => state.loginStatus);

  useEffect(() => {
    if (isLoginFailed === true) {
      toast.error('登入失敗', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    if (isLogin) {
      router.push('/');
    }
  }, [isLoginFailed, isLogin]);

  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(login(email, password));
  };

  return (
    <div className="laptop:shadow-frame flex flex-col items-center justify-center laptop:mx-auto laptop:mt-20 laptop:h-150 laptop:w-204 laptop:flex-row laptop:overflow-hidden laptop:rounded-xl">
      <Info />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

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

          <div className="mb-8 flex w-full  justify-center gap-8 laptop:justify-between">
            <Link href="/sign-up">
              <Button type="button" variant="outlined" className="w-[144px]">
                註冊帳號
              </Button>
            </Link>

            <Button
              type="submit"
              variant="contained"
              className="w-[144px]"
              submit
            >
              登入
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
