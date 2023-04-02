import { useSelector } from 'react-redux';
import { Task } from 'components/Task/Task';
// Импортируем объект значений фильтра
import { statusFilters } from 'redux/constants';
import { getTasks } from 'redux/tasksSlice';
import { getStatusFilter } from 'redux/filtersSlice';
import css from './TaskList.module.css';

const getVisibleTasks = (tasks, statusFilter) => {
  switch (statusFilter) {
    case statusFilters.active:
      return tasks.filter(task => !task.completed);

    case statusFilters.completed:
      return tasks.filter(task => task.completed);

    default:
      return tasks;
  }
};

export const TaskList = () => {
  // Получаем массив задач из состояния Redux
  const tasks = useSelector(getTasks);

  // Получаем значение фильтра из состояния Redux
  const statusFilter = useSelector(getStatusFilter);

  // Вычисляем массив задач которые необходимо отображать в интерфейсе
  const visibleTasks = getVisibleTasks(tasks, statusFilter);

  return (
    <ul className={css.list}>
      {visibleTasks.map(task => (
        <li className={css.listItem} key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};