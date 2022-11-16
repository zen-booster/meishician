function BusinessCard({ data }) {
  const { src, mode } = data;
  if (mode === 'horizon') {
    return <img src={src} alt="business-card" />;
  }
  return <img src={data.src} alt="business-card" />;
}

export default BusinessCard;
