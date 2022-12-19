import { Ping } from '@uiball/loaders';

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Ping size={80} speed={2} color="#A8D8B9" />
    </div>
  );
}

export default Loader;
