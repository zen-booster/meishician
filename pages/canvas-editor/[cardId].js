import Canvas from '../../components/features/Canvas/Canvas';

export async function getServerSideProps(context) {
  const { cardId } = context.params;

  return { props: { cardId } };
}

export default Canvas;
