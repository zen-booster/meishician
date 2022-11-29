import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Input from '../../../common/Input/Input';
import Select from '../../../common/Select/Select';
import TextArea from '../../../common/TextArea/TextArea';
import domainData from '../../../../data/domainData';
import areaData from '../../../../data/areaData';
import initJobInfo from '../../../../utils/initJobInfo';
import { TOGGLE_LOADER } from '../../../../constants/constants';

function InfoForm() {
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
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: TOGGLE_LOADER });
      });
  };

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center">
      <div className="pt-16" />
      <h2>名片職務資訊</h2>
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

        <div className="mb-4">
          <p className="text-main-01">
            領域<span className="text-danger">*</span>
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

        <div className="mb-4">
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

        <button type="submit">開始編輯名片</button>
        <button
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          返回上一頁
        </button>
      </form>
    </div>
  );
}

export default InfoForm;
