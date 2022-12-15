import { useDispatch, useSelector } from 'react-redux';

import { QRCodeSVG } from 'qrcode.react';
import Modal from '../Modal';
import ModalHeader from '../ModalHeader';

import { closeAll } from '../../../../../store/actions/manageActions';

function QrCodeModal() {
  const dispatch = useDispatch();
  const { baseUrl } = useSelector((state) => state.manage);
  const { activeCardId } = useSelector((state) => state.manage.modal);

  function handleCloseOpen() {
    dispatch(closeAll());
  }

  const urlValue = `${baseUrl}/homepage/${activeCardId}`;
  return (
    <Modal onCloseModal={() => handleCloseOpen()}>
      <ModalHeader>個人頁面 QR Code</ModalHeader>
      <div className="flex justify-center">
        <QRCodeSVG value={urlValue} size={256} />
      </div>
    </Modal>
  );
}

export default QrCodeModal;
