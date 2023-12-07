export type Paginated<T> = {
  count: number;
  items: T[];
};
export type Pagination = {
  limit: number;
  skip: number;
};
