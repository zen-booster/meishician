import { refreshHard } from 'aos';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendToast } from '../../store/actions/errorActions';
import Space from '../../components/common/Space/Space';

function index() {
  const dispatch = useDispatch();
  return (
    <>
      <Space />
      <button onClick={() => dispatch(sendToast('hihihi'))}>
        send!sendsendsendsendsendsendsend
      </button>
    </>
  );
}

export default index;
