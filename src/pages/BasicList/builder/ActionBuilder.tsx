import { Button } from 'antd';
import type { ButtonType } from 'antd/lib/button';

const ActionBuilder = (actions?: BasicListApi.Action[]) => {
  return (actions || []).map((action) => {
    if (action.component === 'button') {
      return <Button type={action.type as ButtonType}>{action.text}</Button>;
    }
    return null;
  });
};

export default ActionBuilder;
