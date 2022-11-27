function MemberInput({ onChange, value, placeholder, type, title }) {
  return (
    <div className="flex">
      <div className="h-12 w-20 rounded-l-xl bg-main-01 py-2 px-3  text-center text-fs-6 text-white">
        {title}
      </div>
      <input
        type={type}
        className="h-12 w-full flex-1 rounded-r-xl border-y border-r border-dark-light px-3 outline-0"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
}

export default MemberInput;
