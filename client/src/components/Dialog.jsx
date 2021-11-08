import React, {useRef} from 'react';
import {observer} from "mobx-react-lite";
import modalState from "../store/modalState";
import sessionState from "../store/sessionState";
import {Button, Input, InputGroup, Modal} from "rsuite";

const Dialog = observer(() => {

  const usernameRef = useRef()
  const connectionHandler = () => {
    sessionState.setUsername(usernameRef.current.value)
    modalState.setModalState(false)
  }

  return (
    <>
      <Modal backdrop={'static'} size={'xs'} open={modalState.opened}>
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

export default Dialog;