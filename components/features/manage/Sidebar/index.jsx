import SectionTag from '../SectionTag';

function SectionHeader({ onToggleClick, children, className, active }) {
  return (
    <h2
      className={`mb-3 block bg-slate-200 p-2 text-xl font-bold  ${
        active && 'text-blue-600'
      } ${className} `}
    >
      <button type="button" onClick={() => onToggleClick()}>
        {children}
      </button>
    </h2>
  );
}

function SectionListItem({ children }) {
  return <li className="border-b-2 py-3 pl-6">{children}</li>;
}

export default function BookmarkSidebar() {
  return (
    <>
      <SectionHeader active className="mb-3">
        我的名片
      </SectionHeader>

      <div>
        <SectionHeader className="mb-0">收藏的名片</SectionHeader>

        <ul
          className={`max-h-[500px]
            overflow-y-auto`}
        >
          <SectionListItem>預設</SectionListItem>
          <SectionListItem>潛力客戶</SectionListItem>
          <SectionListItem>大老闆</SectionListItem>
          <SectionListItem>我的朋友</SectionListItem>
          <SectionListItem>
            <button type="button" className="rounded-lg bg-slate-300 py-2 px-2">
              + 新增群組
            </button>
          </SectionListItem>
        </ul>
      </div>
      <SectionHeader>標籤</SectionHeader>

      <ul className="flex flex-wrap gap-2">
        <SectionTag>業務</SectionTag>
        <SectionTag>業務</SectionTag>
        <SectionTag>業務</SectionTag>
        <SectionTag>業務</SectionTag>
      </ul>
    </>
  );
}
