import Image from 'next/image';
import Button from '../../../common/Button/Button';
import Avatar from '../../../common/Avatar/Avatar';
import LinkCard from '../LinkCard';
import linkData from '../../../../data/linkData';
import personData from '../../../../data/personData';

function PersonInfo() {
  return (
    <div>
      <div className="bg-main-02">
        <div className="mx-auto flex flex-col items-center gap-6 py-12 laptop:max-w-204 laptop:flex-row laptop:py-8">
          <Image
            src="/avatar.svg"
            width={80}
            height={80}
            alt="avatar"
            className="laptop:pl-2"
          />
          <h2 className="text-rwd-h2 text-main-01">劉冠廷 的名片頁面</h2>
        </div>
      </div>

      <div className="mx-auto bg-gray-200 pt-10 laptop:max-w-204 laptop:pt-20">
        <div className="mb-10 flex flex-col items-center laptop:mb-28">
          <div>
            <Image
              src="https://fakeimg.pl/256x156/ccc"
              alt="business-card"
              className="mb-4 laptop:hidden"
              width={256}
              height={156}
            />
            <Image
              src="https://fakeimg.pl/256x156/ccc"
              alt="business-card"
              className="hidden laptop:mb-7 laptop:block"
              width={536}
              height={324}
            />
            <div className="flex flex-col items-center gap-2 laptop:flex-row">
              <button
                type="button"
                className="flex h-10 w-64 items-center justify-center rounded-xl border border-main-01 bg-white text-rwd-body text-main-01 laptop:text-body"
              >
                <Image
                  src="/edit.svg"
                  width={18}
                  height={18}
                  alt="edit"
                  className="mr-0.5 text-main-01"
                />
                編輯名片
              </button>
              <button
                type="button"
                className="h-10 w-64 rounded-xl border border-main-01 bg-white text-rwd-body text-main-01 laptop:text-body"
              >
                下載名片(.png)
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between bg-main-02 laptop:mb-12 laptop:bg-inherit">
          <h3 className="py-3 pl-4 text-rwd-h5 text-main-01 laptop:rounded-r-xl laptop:bg-main-02 laptop:py-2 laptop:pr-40 laptop:text-h5">
            個人資訊Info
          </h3>
          <div className="flex cursor-pointer items-center text-rwd-body laptop:text-body">
            <Image
              src="/edit.svg"
              width={18}
              height={18}
              alt="edit"
              className="mr-2.5 text-black"
            />
            修改資訊
          </div>
        </div>

        <div className="flex flex-col items-center laptop:flex-row laptop:items-start">
          <Image
            className="mb-16 laptop:mb-0 laptop:mr-6"
            src="/photo.png"
            width={186}
            height={186}
            alt="photo"
          />
          <div className="flex gap-4 laptop:gap-6">
            <div className="w-28 text-rwd-body laptop:text-body">
              <p>中文姓名：</p>
              <p>任職公司：</p>
              <p>職稱：</p>
              <p>電話：</p>
              <p>地區：</p>
              <p>領域：</p>
            </div>
            <div className="text-rwd-body laptop:text-body">
              <p>{personData.name}</p>
              <p>{personData.company}</p>
              <p>{personData.job}</p>
              <p>{personData.phone}</p>
              <p>{personData.city}</p>
              <p>{personData.domain}</p>
            </div>
          </div>
        </div>

        <div className="my-8 flex flex-col items-center gap-5">
          {linkData.map((data) => (
            <LinkCard key={data.id} data={data} />
          ))}
          <Button>修改資訊頁面</Button>
        </div>
      </div>
    </div>
  );
}

export default PersonInfo;
