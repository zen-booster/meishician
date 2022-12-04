import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';
import TextArea from '../../common/TextArea/TextArea';
import domainData from '../../../data/domainData';
import areaData from '../../../data/areaData';
import initJobInfo from '../../../utils/initJobInfo';
import { TOGGLE_LOADER } from '../../../constants/constants';
import Button from '../../common/Button/Button';

function AddCardForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isUpdate = false;
  const [isCustomize, setIsCustomize] = useState(false);

  const toggleCustomize = () => {
    setIsCustomize(!isCustomize);
  };

  const allArea = [
    {
      id: Math.random(),
      content: '地區',
      value: '',
      hidden: true,
    },
    ...areaData,
  ];
  const allDomain = [
    {
      id: Math.random(),
      content: '領域',
      value: '',
      hidden: true,
    },
    ...domainData,
  ];
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch({ type: TOGGLE_LOADER });
    const jobInfo = initJobInfo(data);
    if (data.phoneNumber) {
      const phoneNumber = {
        content: data.phoneNumber,
        isPublic: true,
      };
      jobInfo.phoneNumber = phoneNumber;
    }

    axios
      .post('http://localhost:3001/api/portfolio', { jobInfo })
      .then((res) => {
        console.log(res);
        const { cardId } = res.data.data;
        router.push(`/canvas-editor/${cardId}`);
      })
      .catch((err) => {
        alert('錯了啦！');
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: TOGGLE_LOADER });
      });
  };

  return (
    <div className="-mt-16 h-screen">
      <div className="pt-16" />
      <div className="h-36 bg-main-02">
        <div className="mx-auto flex h-full max-w-204 flex-col justify-center">
          <h2 className="text-h3 font-bold text-main-01">創建個人名片</h2>
        </div>
      </div>

      <div className="mx-auto max-w-container">
        <div className="flex h-80 items-center bg-dark-light">
          <div>
            <p className="mb-5 text-h5 font-bold text-main-01">
              開始之前，先填寫你的職務資訊吧
            </p>
            <p className="text-body">放心，你可以在之後選擇是否公開：）</p>
          </div>
          <Image src="/invite.svg" width={200} height={218} alt="invite" />
        </div>
      </div>

      <div className="mx-auto max-w-container">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
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

          <div className="mb-4">
            <Controller
              control={control}
              name="companyName"
              rules={{
                required: '*請輸入公司',
              }}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
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
                <Input
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
                <Input
                  onChange={onChange}
                  value={value}
                  name={name}
                  type="text"
                  title="電話"
                  placeholder="電話"
                />
              )}
            />
            <p className="absolute text-label text-danger">
              {errors.phoneNumber?.message}
            </p>
          </div>

          <div className="flex gap-6">
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

          {isUpdate && (
            <div>
              <label>
                <input
                  type="checkbox"
                  value={isCustomize}
                  onChange={toggleCustomize}
                />
                將發送通知，是否要自定義訊息？
              </label>
              {isCustomize && (
                <Controller
                  control={control}
                  name="message"
                  rules={{ required: '不得為空' }}
                  defaultValue=""
                  render={({ field: { onChange, value, name } }) => (
                    <TextArea onChange={onChange} value={value} name={name} />
                  )}
                />
              )}
            </div>
          )}

          <div className="mb-24 flex gap-6 text-fs-6">
            <Button
              className="w-full"
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
        </form>
      </div>
    </div>
  );
}

export default AddCardForm;
