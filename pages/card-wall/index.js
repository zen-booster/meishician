import axios from 'axios';
import CardWall from '../../components/features/card-wall';
import { DOMAIN_URL } from '../../configs';

export async function getServerSideProps(context) {
  const page = context.query.page || 1;
  const domain = context.query.domain || '';
  const city = context.query.city || '';
  const name = context.query.name || '';
  const defaultUrl = [`${DOMAIN_URL}/api/card-wall?page=${page}`];

  if (domain && domain !== 'all') defaultUrl.push(`&domain=${domain}`);
  if (city && city !== 'all') defaultUrl.push(`&city=${city}`);
  if (name) defaultUrl.push(`&name=${name}`);

  const apiUrl = defaultUrl.reduce((acc, cur) => acc + cur);
  const cardData = await axios.get(apiUrl);
  const { currentPage, totalPage, records } = cardData.data.data;

  return {
    props: {
      currentPage: parseInt(currentPage, 10),
      totalPage: parseInt(totalPage, 10),
      records,
    },
  };
}

export default CardWall;
