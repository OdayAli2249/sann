import { styles } from '@/styles/shared';
import { User } from '@/types/auth';
import { TableAdapter, TableColumn } from '@/types/table';
import { mergeSx } from '@/utils/helpers';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

export const useSchema = () => {

    const columns: TableColumn<User>[] = [
        {
            key: 'first_name',
            title: 'First Name',
            headCellProps: {
                style: styles.headerCell,
            },
            dataCellProps: { style: mergeSx(styles.cell, { width: '25%' }) },
            dataCellRender: (record, _) => <Typography>{record.first_name}</Typography>,
        },
        {
            key: 'last_name',
            title: 'Last Name',
            headCellProps: {
                style: styles.headerCell,
            },
            dataCellProps: { style: mergeSx(styles.cell, { width: '25%' }) },
            dataCellRender: (record, _) => <Typography>{record.last_name}</Typography>,
        },
        {
            key: 'status',
            title: 'Status',
            headCellProps: {
                style: styles.headerCell,
            },
            dataCellProps: { style: mergeSx(styles.cell, { width: '25%' }) },
            dataCellRender: () => {
                return <Box sx={{
                    padding: '0px 8px',
                    borderRadius: '4px',
                    width: 'fit-content',
                    color: (theme) => theme.palette.primary.main,
                    backgroundColor: '#F5F5F5',
                }}
                    component="div" whiteSpace="normal">
                    <Typography align="center">Employee</Typography>
                </Box>;
            },
        },
        {
            key: 'email',
            title: 'E-mail',
            headCellProps: {
                style: styles.headerCell,
            },
            dataCellProps: { style: mergeSx(styles.cell, { width: '25%' }) },
            dataCellRender: (record, _) => <Typography>{record.email}</Typography>,
        },
    ];

    const schema: TableAdapter<User> = { tableColumns: columns };

    return schema;
};
