import Button from '../../../common/Button/Button';
import ToggleButton from '../../../common/Button/ToggleButton';
import personData from '../../../../data/personData';

function Section({ children }) {
  return <div className="my-24 mb-16 bg-gray-400 px-3 py-6">{children}</div>;
}

function ShowSetting({ title, content }) {
  return (
    <div className="flex items-center justify-between bg-white p-2">
      <div className="flex gap-3">
        <h3 className="font-bold">{title}</h3>
        <p>{content}</p>
      </div>
      <ToggleButton />
    </div>
  );
}

function LinkEdit() {
  return (
    <div>
      <Section>
        <h2 className="mb-5 text-center text-3xl font-bold">頁面資訊設定</h2>
        <div className="flex justify-between bg-white p-2">
          <div className="flex gap-3">
            <h3 className="font-bold">頁面標題</h3>
            <p>劉帥廷的個人頁面</p>
          </div>
          <Button>編輯</Button>
        </div>
      </Section>

      <Section>
        <h2 className="mb-5 text-center text-3xl font-bold">職務資訊顯示</h2>
        <div className="flex flex-col gap-5">
          <ShowSetting title="姓名" content={personData.name} />
          <ShowSetting title="公司" content={personData.company} />
          <ShowSetting title="職稱" content={personData.job} />
          <ShowSetting title="電話" content={personData.phone} />
          <ShowSetting title="地區" content={personData.city} />
          <ShowSetting title="領域" content={personData.domain} />
        </div>
      </Section>

      <Section>
        <h2 className="text-center text-3xl font-bold">連結設定</h2>
        <Button>新增連結</Button>
      </Section>
    </div>
  );
}

export default LinkEdit;
