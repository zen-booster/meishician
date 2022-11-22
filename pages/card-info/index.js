import Navbar from '../../components/common/Navbar/Navbar';
import PersonInfo from '../../components/features/card-info/PersonInfo';
import LinkEdit from '../../components/features/card-info/LinkEdit';

function CardInfo() {
  return (
    <div>
      <Navbar />
      <PersonInfo />
      <LinkEdit />
    </div>
  );
}

export default CardInfo;
