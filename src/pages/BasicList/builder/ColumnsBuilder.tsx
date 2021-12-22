import { Space, Tag } from 'antd';
import moment from 'moment';

import ActionBuilder from './ActionBuilder';

const ColumnsBuilder = (tableColumn?: BasicListApi.TableColumn[]) => {
  const newColumns: BasicListApi.TableColumn[] = [];
  (tableColumn || []).forEach((column: BasicListApi.TableColumn) => {
    if (column.hideInColumn !== true) {
      switch (column.type) {
        case 'datetime':
          column.render = (value: any) => {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
          };
          break;
        case 'switch':
          column.render = (value: any) => {
            const option = (column.data || []).find((item) => item.value === value)?.title;
            return <Tag color={value ? 'blue' : 'red'}>{option}</Tag>;
          };
          break;
        case 'actions':
          column.render = () => {
            return <Space>{ActionBuilder(column.actions)}</Space>;
          };
          break;
        default:
          break;
      }

      newColumns.push(column);
    }
  });

  const idColumn: BasicListApi.TableColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      key: 'id',
    },
  ];
  return idColumn.concat(newColumns);
};

export default ColumnsBuilder;
