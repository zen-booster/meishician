import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useContext } from 'react';
import Image from 'next/image';
import InfoInput from '../../common/Input/InfoInput';
import Select from '../../common/Select/Select';
import domainData from '../../../data/domainData';
import areaData from '../../../data/areaData';
import initJobInfo from '../../../utils/initJobInfo';
import { TOGGLE_LOADER, HIDE_INFO_FROM } from '../../../constants/constants';
import Button from '../../common/Button/Button';
import { updateCard } from '../../../store/actions';
import setSaveData from '../Canvas/service/setSaveData';
import { fabricContext } from '../Canvas/Canvas';

function ChangeCardForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cardInfo = useSelector((state) => state.cardInfo);
  const { history } = useSelector((state) => state);
  const { cardId } = router.query;
  const [isCustomized, setIsCustomized] = useState(false);
  const canvasRef = useContext(fabricContext);

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
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch({ type: TOGGLE_LOADER });
    const { message } = data;
    const jobInfo = initJobInfo(data);
    if (data.phoneNumber) {
      const phoneNumber = {
        content: data.phoneNumber,
        isPublic: true,
      };
      jobInfo.phoneNumber = phoneNumber;
    }
    const messageBody = isCustomized
      ? message
      : `${jobInfo.name.content}已更新名片`;

    const saveData = await setSaveData(canvasRef, history, dispatch);
    dispatch(updateCard(cardId, jobInfo, messageBody, saveData, router));
  };

  return (
    <div className="absolute top-0 z-10 h-screen w-full">
      <div className="pt-16" />
      <div className="h-36 bg-main-02">
        <div className="mx-auto flex h-full max-w-204 flex-col justify-center">
          <h2 className="text-h3 font-bold text-main-01">修改名片資訊</h2>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto max-w-container">
          <div className="flex h-80 items-center justify-center gap-36 bg-gray-04">
            <div>
              <p className="mb-5 text-h5 font-bold text-main-01">
                更新你的職務資訊？
              </p>
              <p className="text-body">
                MeishiCian會同步通知收藏你名片的所有人，
                <br />
                再也不用一一告知囉！
              </p>
            </div>
            <Image src="/invite.svg" width={200} height={218} alt="invite" />
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
                  defaultValue={cardInfo.name}
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
                  defaultValue={cardInfo.companyName}
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
                  defaultValue={cardInfo.jobTitle}
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
                  defaultValue={cardInfo.phoneNumber}
                  render={({ field: { onChange, value, name } }) => (
                    <InfoInput
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

              <div className="mb-10 flex gap-6">
                <div className="w-full">
                  <p className="text-main-01">
                    地區<span className="text-danger">*</span>
                  </p>
                  <Controller
                    control={control}
                    name="city"
                    rules={{ required: '不得為空' }}
                    defaultValue={cardInfo.city}
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

                <div className=" w-full">
                  <p className="text-main-01">
                    領域<span className="text-danger">*</span>
                  </p>
                  <Controller
                    control={control}
                    name="domain"
                    rules={{ required: '不得為空' }}
                    defaultValue={cardInfo.domain}
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

              <div className="mb-20">
                <label className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3 h-5 w-5"
                    value={isCustomized}
                    onChange={() => {
                      setIsCustomized(!isCustomized);
                    }}
                    checked={isCustomized === true}
                  />
                  <span>將發送通知，是否要自定義訊息？</span>
                </label>

                {isCustomized && (
                  <div>
                    <textarea
                      {...register('message', { required: true })}
                      cols="30"
                      rows="10"
                      className="h-28 w-full resize-none px-2 py-2"
                      placeholder="請輸入自定義訊息"
                    />
                    <p className="absolute text-label text-danger">
                      {errors.message?.message}
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-24 flex gap-6 text-fs-6">
                <Button
                  className="w-full bg-white"
                  variant="outlined"
                  type="button"
                  onClick={() => dispatch({ type: HIDE_INFO_FROM })}
                >
                  取消變更
                </Button>
                <Button className="w-full" submit>
                  更新名片並發送訊息
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangeCardForm;
