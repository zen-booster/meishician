import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';

function SignUpForm() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex flex-col">
      <h2 className="my-12 text-center text-3xl font-bold">登入帳號</h2>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          rules={{ required: '不得為空' }}
          defaultValue=""
          render={({ field: { onChange, value, name } }) => (
            <Input
              onChange={onChange}
              value={value}
              name={name}
              type="email"
              placeholder="Email"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: '不得為空' }}
          defaultValue=""
          render={({ field: { onChange, value, name } }) => (
            <Input
              onChange={onChange}
              value={value}
              name={name}
              type="password"
              placeholder="密碼"
            />
          )}
        />
        <Link href="/login/reset">
          <Button>重設密碼</Button>
        </Link>
        <Button type="submit">登錄</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
