import {SelectChangeEvent} from '@mui/material';
import {FC} from 'react';

import StatusSelect from '@/components/common/statusSelect';
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {socketUpdateList} from '@/data/socket';

import style from './style.module.scss';

interface StatusProps {
  taskData: ITaskResponse;
  onSuccess?: () => void;
}

const Status: FC<StatusProps> = ({taskData, onSuccess}) => {
  const onChange = (event: SelectChangeEvent<unknown>) => {
    api.task
      .update({id: taskData.id, statusId: Number(event.target.value)})
      .then(onSuccess)
      .then(socketUpdateList)
      .catch(() => {});
  };
  return (
    <div className="status">
      <p className="title">Status</p>
      <StatusSelect className={style.status} status={taskData.status} items={taskData.todolist.status} onChange={onChange} />
    </div>
  );
};
export default Status;
