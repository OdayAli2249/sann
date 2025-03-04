import { SxProps } from "@mui/material";

export interface ICellProps {
    align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
    valign?: 'top' | 'bottom' | 'middle' | 'baseline';
    style?: any;
    class?: string;
}

export interface IRowProps {
    style?: any;
    class?: string;
}


export type TableColumn<T> = {
    key: string;
    title: string;
    sortKey?: string;
    dataIndex?: keyof T;
    headCellProps: ICellProps;
    dataCellProps: ICellProps;
    headCellRender?: () => React.ReactNode;
    dataCellRender?: (record: T, index: number) => React.ReactNode;
};

export type TableAdapter<T> = {
    tableColumns: TableColumn<T>[];
    getRowProps?: (record: T, index: number) => IRowProps;
};

export interface TablePlusProps<T> {
    data?: T[];
    schema: TableAdapter<T>;
    rowCallback?: (record: T, rowIndex?: number) => void;
    total?: number;
    hide?: boolean;
    showPages?: boolean;
    isLoading?: boolean;
    autoHeight?: boolean;
    height?: string;
    noDataStyle?: SxProps;
    selectable?: boolean;
    referenceBox?: React.ReactNode;
    customRowsPerPageOptions?: number[];
}