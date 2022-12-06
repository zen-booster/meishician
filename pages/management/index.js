function Management() {
  return <div>Management</div>;
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Management;
