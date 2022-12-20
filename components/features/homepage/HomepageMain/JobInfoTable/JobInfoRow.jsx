function JobInfoRow({ label, value }) {
  return (
    <tr>
      <td className="font-bold laptop:p-2">{label}:</td>
      <td className="pl-3">{value}</td>
    </tr>
  );
}

export default JobInfoRow;
