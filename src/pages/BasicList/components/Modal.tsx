import { useEffect } from 'react';
import { Modal as AntdModal } from 'antd';
import { useRequest } from 'umi';
import FormBuilder from '../builder/FormBuilder';
import ActionBuilder from '../builder/ActionBuilder';

const Modal = ({
  visible,
  onOk,
  confirmLoading,
  onCancel,
  modalUrl,
}: {
  visible: boolean;
  onOk: () => void;
  confirmLoading: boolean;
  onCancel: () => void;
  modalUrl: string;
}) => {
  const init = useRequest<{ data: PageApi.Data }>(modalUrl);

  useEffect(() => {
    if (visible) init.run();
  }, [visible]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  return (
    <>
      <AntdModal
        {...layout}
        title={init?.data?.page?.title}
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        footer={ActionBuilder(init?.data?.layout?.actions[0]?.data)}
      >
        {FormBuilder(init?.data?.layout?.tabs[0]?.data)}
      </AntdModal>
    </>
  );
};

export default Modal;
