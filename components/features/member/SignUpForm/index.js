import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Space from '../../../common/Space/Space';
import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';
import Info from '../Info';
import { LOGIN, TOGGLE_LOADER } from '../../../../constants/constants';

function SignUpForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = (data) => {
    dispatch({ type: TOGGLE_LOADER });
    axios
      .post('http://localhost:3001/api/users/sign-up', data)
      .then((res) => {
        localStorage.setItem('auth', `Bearer ${res.data.token}`);
        dispatch({ type: LOGIN });
        router.push('/');
      })
      .catch((err) => {
        alert(`這個 Email 有人用了啦`);
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: TOGGLE_LOADER });
      });
  };

  return (
    <div className="min-h-screen">
      <Space />
      <div className="laptop:shadow-frame flex flex-col items-center justify-center shadow-02 laptop:mx-auto laptop:mt-20 laptop:h-150 laptop:w-204 laptop:flex-row laptop:overflow-hidden laptop:rounded-xl">
        <Info />
        <div className="flex w-full flex-col px-7 laptop:items-center laptop:pl-16 laptop:pr-9">
          <h2 className="mt-7 mb-6 text-h4 font-bold laptop:self-start">
            創建帳號
          </h2>

          <form
            className="flex w-full flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-9">
              <Controller
                control={control}
                name="name"
                rules={{
                  required: '*請輸入名字',
                }}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    onChange={onChange}
                    value={value}
                    name={name}
                    type="text"
                    title="姓名"
                    placeholder="請輸入名字"
                  />
                )}
              />
              <p className="absolute text-label text-danger">
                {errors.name?.message}
              </p>
            </div>

            <div className="mb-9">
              <Controller
                control={control}
                name="email"
                rules={{
                  required: '請輸入E-mail',
                  pattern: {
                    value:
                      /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
                    message: '請輸入正確的E-mail',
                  },
                }}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    onChange={onChange}
                    value={value}
                    name={name}
                    type="email"
                    title="E-mail"
                    placeholder="請輸入你的 E-mail"
                  />
                )}
              />
              <p className="absolute text-label text-danger">
                {errors.email?.message}
              </p>
            </div>

            <div className="mb-9">
              <Controller
                control={control}
                name="password"
                rules={{
                  required: '請輸入密碼',
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
                    title="設定密碼"
                    placeholder="請輸入你的密碼"
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
                name="confirmPassword"
                rules={{
                  required: '請輸入密碼',
                  validate: (value) =>
                    value === watch('password') || '密碼錯誤',
                }}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    onChange={onChange}
                    value={value}
                    name={name}
                    type="password"
                    title="再次輸入密碼"
                    placeholder="請再次輸入密碼"
                  />
                )}
              />
              <p className="absolute text-label text-danger">
                {errors.confirmPassword?.message}
              </p>
            </div>

            <div className="mb-8 flex w-full justify-center gap-8 laptop:justify-between">
              <Link href="/login">
                <Button type="button" variant="outlined" className="w-36">
                  返回
                </Button>
              </Link>
              <Button submit variant="contained" className="w-36">
                送出
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
