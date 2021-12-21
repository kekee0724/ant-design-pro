import React, { useEffect, useState } from 'react';

import { Button, Card, Col, Pagination, Row, Space, Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import styles from './index.less';
import { useRequest } from 'umi';

const Index: React.FC = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);

  const init = useRequest<{ data: BasicListApi.Data }>(
    `/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}`,
  );
  console.log(init);

  useEffect(() => {
    init.run();
  }, [page, per_page]);

  const searchLayout = () => {};

  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolBar}>
          <Space>
            <Button type="primary">Add</Button>
            <Button type="primary">Edit</Button>
          </Space>
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

  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          dataSource={init?.data?.dataSource}
          columns={init?.data?.layout?.tableColumn.filter((item) => item.hideInColumn !== true)}
          pagination={false}
          loading={init?.loading}
        />
        {afterTableLayout()}
      </Card>
    </PageContainer>
  );
};

export default Index;
