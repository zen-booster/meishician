import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Button from '../../../common/Button/Button';
import MemberInput from '../../../common/Input/MemberInput';
import { TOGGLE_LOADER } from '../../../../constants/constants';

function ForgetPasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  // const router = useRouter();

  const onSubmit = (data) => {
    console.log(data);
    dispatch({ type: TOGGLE_LOADER });
    axios
      .post('http://localhost:3001/api/users/send-reset-mail', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert(`沒這個帳號啦 ${err}`);
      })
      .finally(() => {
        dispatch({ type: TOGGLE_LOADER });
      });
  };

  return (
    <div className="min-h-screen bg-main-02 pt-20">
      <form
        className="mx-auto flex w-89 flex-col rounded-xl bg-white px-5 py-7 shadow-frame laptop:w-96 laptop:px-10 laptop:py-24"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-3 text-h4 font-bold">忘記密碼？</h2>

        <p className="mb-20 text-body font-medium">將寄出密碼郵件至你的信箱</p>

        <div className="mb-28">
          <Controller
            control={control}
            name="email"
            rules={{
              required: '*請輸入信箱',
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
                title="信箱"
                placeholder="E-mail"
              />
            )}
          />
          <p className="absolute text-label text-danger">
            {errors.email?.message}
          </p>
        </div>

        <div className="flex w-full gap-8 self-center">
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
  );
}

export default ForgetPasswordForm;
