function PlaceholderPage({ searchPlaceholder }) {
  return (
    <div className="mt-24 flex   justify-center text-5xl text-gray-300">
      {searchPlaceholder ? '沒有搜尋結果...' : '沒有名片，快點來新增一個吧！'}
    </div>
  );
}

export default PlaceholderPage;
