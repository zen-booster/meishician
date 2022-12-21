import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { useEffect } from 'react';
import InfoInput from '../../common/Input/InfoInput';
import Select from '../../common/Select/Select';
import { allDomain } from '../../../data/domainData';
import { allArea } from '../../../data/areaData';
import initJobInfo from '../../../utils/initJobInfo';
import Space from '../../common/Space/Space';
import Button from '../../common/Button/Button';
import { addCardInfo } from '../../../store/actions';

function AddCardForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const jobInfo = initJobInfo(data);
    dispatch(addCardInfo(jobInfo, router));
  };

  useEffect(() => {
    const loginStatus = localStorage.getItem('auth');
    if (!loginStatus?.startsWith('Bear')) router.push('/login');
  }, []);

  return (
    <div className="min-h-screen">
      <Space />
      <div className="h-36 bg-main-02">
        <div className="mx-auto flex h-full max-w-204 flex-col justify-center">
          <h2 className="text-h3 font-bold text-main-01">創建個人名片</h2>
        </div>
      </div>

      <div className="mx-auto max-w-container">
        <div className="flex h-80 items-center justify-center gap-36 bg-gray-04">
          <div>
            <p className="mb-5 text-h5 font-bold text-main-01">
              開始之前，先填寫你的職務資訊吧
            </p>
            <p className="text-body">放心，你可以在之後選擇是否公開：）</p>
          </div>
          <Image
            src="/invite.svg"
            width={200}
            height={218}
            alt="invite"
            priority
          />
        </div>
      </div>

      <div className="mx-auto max-w-container">
        <form
          className="flex flex-col gap-3 bg-gray-04"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-4">
              <Controller
                control={control}
                name="name"
                rules={{
                  required: '*請輸入名字',
                }}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <InfoInput
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

            <div className="mb-4">
              <Controller
                control={control}
                name="companyName"
                rules={{
                  required: '*請輸入公司',
                }}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <InfoInput
                    onChange={onChange}
                    value={value}
                    name={name}
                    type="text"
                    title="公司"
                    placeholder="請輸入公司名稱"
                  />
                )}
              />
              <p className="absolute text-label text-danger">
                {errors.companyName?.message}
              </p>
            </div>

            <div className="mb-4">
              <Controller
                control={control}
                name="jobTitle"
                rules={{
                  required: '*請輸入職稱',
                }}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <InfoInput
                    onChange={onChange}
                    value={value}
                    name={name}
                    type="text"
                    title="職稱"
                    placeholder="請輸入職稱"
                  />
                )}
              />
              <p className="absolute text-label text-danger">
                {errors.jobTitle?.message}
              </p>
            </div>

            <div className="mb-4">
              <Controller
                control={control}
                name="phoneNumber"
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <InfoInput
                    onChange={onChange}
                    value={value}
                    name={name}
                    option={false}
                    type="text"
                    title="電話"
                    placeholder="電話（選填）"
                  />
                )}
              />
              <p className="absolute text-label text-danger">
                {errors.phoneNumber?.message}
              </p>
            </div>

            <div className="mb-20 flex gap-6">
              <div className="mb-4 w-full">
                <p className="text-main-01">
                  地區<span className="text-danger">*</span>
                </p>
                <Controller
                  control={control}
                  name="city"
                  rules={{ required: '不得為空' }}
                  defaultValue=""
                  render={({ field: { onChange, value, name } }) => (
                    <Select onChange={onChange} value={value} name={name}>
                      {allArea}
                    </Select>
                  )}
                />
                <p className="absolute text-label text-danger">
                  {errors.city?.message}
                </p>
              </div>

              <div className="mb-4 w-full">
                <p className="text-main-01">
                  領域<span className="text-danger">*</span>
                </p>
                <Controller
                  control={control}
                  name="domain"
                  rules={{ required: '不得為空' }}
                  defaultValue=""
                  render={({ field: { onChange, value, name } }) => (
                    <Select onChange={onChange} value={value} name={name}>
                      {allDomain}
                    </Select>
                  )}
                />
                <p className="absolute text-label text-danger">
                  {errors.domain?.message}
                </p>
              </div>
            </div>

            <div className="mb-24 flex gap-6 text-fs-6">
              <Button
                className="w-full bg-white"
                variant="outlined"
                type="button"
                onClick={() => {
                  router.back();
                }}
              >
                返回
              </Button>
              <Button className="w-full" submit>
                開始打造名片
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCardForm;
