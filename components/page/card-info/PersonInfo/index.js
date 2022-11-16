import Button from '../../../common/Button/Button';
import Avatar from '../../../common/Avatar/Avatar';
import LinkCard from '../LinkCard';
import linkData from '../../../../data/linkData';
import personData from '../../../../data/personData';

function PersonInfo() {
  return (
    <div>
      <h2 className="my-12 text-center text-3xl font-bold">劉冠廷的名片頁面</h2>
      <div className="mb-8 flex flex-col items-center justify-center gap-5">
        <div className="flex gap-5">
          <Button>編輯名片</Button>
          <Button>下載圖片</Button>
        </div>
        <img src="https://fakeimg.pl/315x175/ccc" alt="" />
      </div>
      <div className="mb-12 flex flex-col gap-5 sm:flex-row">
        <div className="self-center">
          <Avatar />
        </div>
        <div>
          <p>中文姓名：{personData.name}</p>
          <p>任職公司：{personData.company}</p>
          <p>職稱：{personData.job}</p>
          <p>電話：{personData.phone}</p>
          <p>地區：{personData.city}</p>
          <p>領域：{personData.domain}</p>
        </div>
      </div>

      <div className="my-8 flex flex-col items-center gap-5">
        {linkData.map((data) => (
          <LinkCard key={data.id} data={data} />
        ))}
        <Button>修改資訊頁面</Button>
      </div>
    </div>
  );
}

export default PersonInfo;
