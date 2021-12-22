declare module PageApi {
  export interface Page {
    title: string;
    type: string;
  }

  export interface TabData {
    id: number;
    parent_id: number;
    name: string;
    create_time: Date;
    delete_time?: any;
    status: number;
    value: number;
    title: string;
    depth: number;
    children: TabData[];
  }

  export interface TabDatum {
    title: string;
    dataIndex: string;
    key: string;
    type: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
    disabled: boolean;
    data: TabData[];
  }

  export interface Tab {
    name: string;
    title: string;
    data: TabDatum[];
  }

  export interface Datum {
    component?: string;
    text?: string;
    type: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
    action?: string;
    uri?: string;
    method?: string;
  }

  export interface Action {
    name: string;
    title: string;
    data: Datum[];
  }

  export interface Layout {
    tabs: Tab[];
    actions: Action[];
  }

  export interface DataSource {
    id: number;
    username: string;
    display_name: string;
    create_time: Date;
    update_time: Date;
    status: number;
    groups: number[];
  }

  export interface Data {
    page: Page;
    layout: Layout;
    dataSource: DataSource;
  }

  export interface RootObject {
    success: boolean;
    message: string;
    data: Data;
  }
}
