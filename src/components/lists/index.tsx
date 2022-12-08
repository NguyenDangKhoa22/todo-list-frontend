import {FC, useEffect} from 'react';

import {ROUTES} from '@/configs/routes.config';
import FloatIcon from '@/core-ui/float-icon';
import useLists from '@/states/lists/use-lists';
import useModals from '@/states/modals/use-modals';
import LocalStorage from '@/utils/local-storage';

import List from './list';
import styles from './style.module.scss';
import Toolbar from './toolbar';

const Lists: FC = () => {
  const {myList, favoriteList, get} = useLists();
  const {setIsOpenModal, setSelectedTodolist} = useModals();

  const onNew = () => {
    setIsOpenModal('createList');
    setSelectedTodolist();
  };

  useEffect(() => {
    LocalStorage.checkPage.set(ROUTES.LIST);
    get();
  }, []);

  return (
    <div className={styles['page-list']}>
      <div className="container">
        <Toolbar title="My Lists" showActions={true} />
        <List list={myList} />
        <Toolbar title="Favorite Lists" className="mt-8" />
        <List list={favoriteList} hiddenDelete={true} hiddenEdit={true} />
      </div>
      <FloatIcon className="float-icon" onClick={onNew} />
    </div>
  );
};
export default Lists;
