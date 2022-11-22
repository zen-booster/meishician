import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '../../../common/Input/Input';
import Select from '../../../common/Select/Select';
import Button from '../../../common/Button/Button';
import TextArea from '../../../common/TextArea/TextArea';
import domainData from '../../../../data/domainData';
import areaData from '../../../../data/areaData';

function Form() {
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
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center">
      <h2>名片職務資訊</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          rules={{ required: '不得為空' }}
          defaultValue=""
          render={({ field: { onChange, value, name } }) => (
            <Input
              onChange={onChange}
              value={value}
              name={name}
              type="text"
              placeholder="*姓名"
            />
          )}
        />
        <Controller
          control={control}
          name="company"
          rules={{ required: '不得為空' }}
          defaultValue=""
          render={({ field: { onChange, value, name } }) => (
            <Input
              onChange={onChange}
              value={value}
              name={name}
              type="text"
              placeholder="*公司"
            />
          )}
        />
        <Controller
          control={control}
          name="job"
          rules={{ required: '不得為空' }}
          defaultValue=""
          render={({ field: { onChange, value, name } }) => (
            <Input
              onChange={onChange}
              value={value}
              name={name}
              type="text"
              placeholder="*職稱"
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          defaultValue=""
          render={({ field: { onChange, value, name } }) => (
            <Input
              onChange={onChange}
              value={value}
              name={name}
              type="text"
              placeholder="電話"
            />
          )}
        />
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

        <Button type="submit">開始編輯名片</Button>
        <Button type="submit">返回上一頁</Button>
      </form>
    </div>
  );
}

export default Form;
