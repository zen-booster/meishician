import { useState } from 'react';
import Overlay from '../../../../../common/Overlay/Overlay';

export default function Modal({ action, title }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="flex items-center justify-center">
        <button
          className="rounded-md bg-purple-600 px-6 py-1 text-purple-100"
          type="button"
          onClick={() => setShowModal(true)}
        >
          {title}
        </button>
      </div>
      {showModal ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <Overlay show={setShowModal} />
          <div className="flex min-h-screen items-center px-4 py-8">
            <div className="relative mx-auto w-full max-w-md rounded-md bg-white p-4 shadow-lg">
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <h4 className="mb-8 text-center text-2xl font-medium text-gray-800">
                  要更改名片方向嗎？
                </h4>
                <p className="mt-2 mb-8 text-center text-lg leading-relaxed text-gray-500">
                  名片轉向後編輯器畫面中的物件將會全部重製
                </p>
                <div className="mt-3 items-center gap-2 sm:flex">
                  <button
                    className="mt-2 w-full flex-1 rounded-md bg-red-600 p-2.5 text-white outline-none ring-red-600 ring-offset-2 focus:ring-2"
                    onClick={() => {
                      action();
                      setShowModal(false);
                    }}
                    type="button"
                  >
                    確認修改
                  </button>
                  <button
                    className="mt-2 w-full flex-1 rounded-md border p-2.5 text-gray-800 outline-none ring-indigo-600 ring-offset-2 focus:ring-2"
                    onClick={() => setShowModal(false)}
                    type="button"
                  >
                    取消修改
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
