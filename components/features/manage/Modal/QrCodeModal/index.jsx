import { useDispatch, useSelector } from 'react-redux';

import { QRCodeSVG } from 'qrcode.react';
import Modal from '../Modal';
import ModalHeader from '../ModalHeader';

import Button from '../../../../common/Button/Button';

import { closeAll } from '../../../../../store/actions/manageActions';

function QrCodeModal() {
  const dispatch = useDispatch();
  const { baseUrl } = useSelector((state) => state.manage);
  const { activeCardId } = useSelector((state) => state.manage.activeSection);

  function handleCloseOpen() {
    dispatch(closeAll());
  }

  const urlValue = `${baseUrl}/homepage/${activeCardId}`;
  return (
    <Modal onCloseModal={() => handleCloseOpen()}>
      <ModalHeader>個人頁面 QR Code</ModalHeader>
      <QRCodeSVG value={urlValue} />
      <Button>取消</Button>
    </Modal>
  );
}

export default QrCodeModal;
