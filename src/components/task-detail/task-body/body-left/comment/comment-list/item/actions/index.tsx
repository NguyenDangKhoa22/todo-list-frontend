import {ButtonBase, Popover} from '@mui/material';
import {FC, MouseEvent, useState} from 'react';

import Button from '@/core-ui/button';
import IconButton from '@/core-ui/icon-button';
import api from '@/data/api';

import {IItemProps} from '..';

interface Iprops extends IItemProps {
  show: boolean;
  onEdit: () => void;
}

const Actions: FC<Iprops> = ({commentData: {id, taskId}, onSuccess, onEdit, show}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const editButtonId = open ? 'simple-popover' : undefined;

  const handleDelete = () => {
    api.task.update({id: taskId, comment: {update: {id, isActive: false}}}).then(onSuccess);
  };

  const onDelete = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseDelete = () => {
    setAnchorEl(null);
  };
  if (!show) return null;
  return (
    <div className="actions">
      <button onClick={onEdit}>Edit</button>
      <span>-</span>
      <ButtonBase aria-describedby={editButtonId} onClick={onDelete}>
        Delete
      </ButtonBase>
      <Popover
        id={editButtonId}
        open={open}
        anchorEl={anchorEl}
        onClose={onCloseDelete}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <div className="relative max-w-[320px] p-5 text-h7">
          <IconButton name="ico-x" className="absolute top-3 right-3" onClick={onCloseDelete} />
          <p className="border-b pb-4 text-center text-slate-500">You want to delete attachments?</p>
          <p className="mt-3 text-slate-700">Attachments will be permanently deleted and you won&apos;t be able to undo them.</p>
          <div className="mt-2 flex justify-center gap-5">
            <Button color="primary" variant="contained" className="h-10 w-full" type="submit" onClick={handleDelete}>
              Yes
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};
export default Actions;
