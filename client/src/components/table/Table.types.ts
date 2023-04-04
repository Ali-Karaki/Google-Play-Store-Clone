export interface TableProps {
  logo: string;
  name: string;
  description: string;
}

export type TableComponentProps = {
  data: TableProps[];
};
