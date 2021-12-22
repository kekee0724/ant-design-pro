import React, { useEffect, useState } from 'react';

import { Card, Col, Pagination, Row, Space, Table } from 'antd';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

import ActionBuilder from './builder/ActionBuilder';
import ColumnsBuilder from './builder/ColumnsBuilder';
import styles from './index.less';

const Index: React.FC = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);

  const init = useRequest<{ data: BasicListApi.Data }>(
    `public/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}`,
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

  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          dataSource={init?.data?.dataSource}
          columns={ColumnsBuilder(init?.data?.layout?.tableColumn)}
          pagination={false}
          loading={init?.loading}
        />
        {afterTableLayout()}
      </Card>
    </PageContainer>
  );
};

export default Index;
