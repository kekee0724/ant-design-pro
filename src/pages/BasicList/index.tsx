import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { Button, Card, Col, Pagination, Row, Space, Table } from 'antd';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

import ActionBuilder from './builder/ActionBuilder';
import ColumnsBuilder from './builder/ColumnsBuilder';
import Modal from './components/Modal';
import styles from './index.less';

const Index: FC = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  const init = useRequest<{ data: BasicListApi.Data }>(
    `public/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}&sort=${sort}&order=${order}`,
  );
  console.log(init);

  useEffect(() => {
    init.run();
  }, [page, per_page, sort, order]);

  const searchLayout = () => {};

  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolBar}>
          <Space>{ActionBuilder(init?.data?.layout?.tableToolBar)}</Space>
        </Col>
      </Row>
    );
  };

  const paginationChangeHandler = (_page: any, _per_page: any) => {
    setPage(_page);
    setPerPage(_per_page);
  };

  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolBar}>
          <Pagination
            size="small"
            total={init?.data?.meta?.total || 0}
            current={init?.data?.meta?.page || 1}
            pageSize={init?.data?.meta?.per_page || 10}
            showSizeChanger
            // showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            onChange={paginationChangeHandler}
            onShowSizeChange={paginationChangeHandler}
          />
        </Col>
      </Row>
    );
  };

  const onChange = (_: any, __: any, sorter: any) => {
    setSort(sorter.field);
    setOrder(sorter.order === 'descend' ? 'desc' : 'asc');
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <PageContainer>
      <Button
        type="primary"
        onClick={() => {
          setModalUrl(`public/api/admins/add?X-API-KEY=antd`);
          setVisible(true);
        }}
      >
        Add
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setModalUrl(`public/api/admins/206?X-API-KEY=antd`);
          setVisible(true);
        }}
      >
        Edit
      </Button>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          rowKey="id"
          dataSource={init?.data?.dataSource}
          columns={ColumnsBuilder(init?.data?.layout?.tableColumn)}
          pagination={false}
          loading={init?.loading}
          onChange={onChange}
        />
        {afterTableLayout()}
      </Card>
      <Modal
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        modalUrl={modalUrl}
        onCancel={handleCancel}
      />
    </PageContainer>
  );
};

export default Index;
