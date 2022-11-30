import Button from '../../components/common/Button/Button';

function CardWallPage() {
  return (
    <div className="flex gap-2">
      <Button variant="outlined" color="danger">
        outlined警告
      </Button>

      <Button variant="contained" color="danger">
        contained警告
      </Button>
      <Button variant="contained" className=" bg-slate-100  text-main-01">
        className客製化
      </Button>
    </div>
  );
}

export default CardWallPage;
