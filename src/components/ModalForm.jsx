import React, {useRef, useState} from 'react';
import {Button, Input, InputGroup, Modal} from "rsuite";
import modalState from "../store/modalState";
import {observer} from "mobx-react-lite";

const ModalForm = observer(() => {


  const usernameRef = useRef()
  const [modal, setModal] = useState(true)



  const connectionHandler = () => {
    modalState.setUsername(usernameRef.current.value)
    setModal(false)
  }

  return (
    <>
      <Modal backdrop={'static'} size={'xs'} open={modal}>
        <Modal.Title>Set Your Username</Modal.Title>
        <Modal.Body style={{display: 'flex', gap: '15px'}}>
          <InputGroup>
            <Input ref={usernameRef} style={{flex: '1'}} />
            <Button appearance="primary" onClick={() => connectionHandler()}>
              Confirm
            </Button>
          </InputGroup>
        </Modal.Body>
      </Modal>
    </>
  );
});

export default ModalForm;