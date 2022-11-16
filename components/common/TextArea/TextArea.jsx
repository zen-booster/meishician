function TextArea({ onChange, value, name }) {
  return (
    <textarea
      className="w-full border border-black"
      maxLength="300"
      onChange={onChange}
      value={value}
      name={name}
      placeholder="請輸入自定義的訊息通知 (300字內)"
    />
  );
}

export default TextArea;
