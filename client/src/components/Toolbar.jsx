import React from 'react'
import {ButtonGroup, ButtonToolbar, IconButton} from "rsuite";
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import SortDownIcon from '@rsuite/icons/SortDown';
import EditIcon from '@rsuite/icons/Edit';
import SettingIcon from '@rsuite/icons/Setting';
import canvasState from "../store/canvasState";

const Toolbar = () => {

  return (
    <>

      <ButtonToolbar style={{display: 'flex', padding: '25px'}}>

        <ButtonGroup>
          <IconButton className={'rs-btn-primary'} icon={<EditIcon />} />
        </ButtonGroup>

        <ButtonGroup>
          <IconButton icon={<SettingIcon />} />
        </ButtonGroup>

        <ButtonGroup style={{marginLeft: 'auto'}}>
          <IconButton onClick={() => canvasState.undo()} icon={<ArrowLeftLineIcon />} />
          <IconButton onClick={() => canvasState.redo()} icon={<ArrowRightLineIcon />} />
        </ButtonGroup>

        <ButtonGroup>
          <IconButton icon={<SortDownIcon />} placement={'right'}>Download</IconButton>
        </ButtonGroup>

      </ButtonToolbar>

    </>
  );
};

export default Toolbar;