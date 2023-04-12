export interface mutationRequestProps {
  body?: any;
  queryParams?: object;
  params?: object;
}

export type MetaProps = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type ResponseProps = {
  data: any;
  meta?: MetaProps;
};
