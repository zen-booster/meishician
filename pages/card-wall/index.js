import axios from 'axios';
import CardWall from '../../components/features/card-wall';
import { DOMAIN_URL } from '../../configs';

export async function getServerSideProps() {
  const cardData = await axios.get(`${DOMAIN_URL}/api/card-wall`);
  const { currentPage, totalPage, records } = cardData.data.data;
  return { props: { currentPage, totalPage, records } };
}

export default CardWall;
