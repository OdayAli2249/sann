import { TablePlusProps } from '@/types/table';
import {
    Box,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import { styles } from '../../styles/shared';
import { mergeSx } from '@/utils/helpers';

export function TablePlus<T>(props: TablePlusProps<T>) {
    let {
        hide,
        showPages,
        rowCallback,
        total,
        schema,
        data,
        isLoading,
        autoHeight,
        height,
        referenceBox,
        customRowsPerPageOptions,
    } = props;
    const handelRowClick = (record: T, rowIndex?: number) => {
        rowCallback?.(record, rowIndex);
    };

    return (
        <Box sx={hide ? { display: 'none' } : autoHeight ? mergeSx(styles.root, { height: 'auto' }) :
            height ? mergeSx(styles.root, { height }) : styles.root}>
            <Box sx={styles.body}>
                <TableContainer component={Paper} sx={styles.container}>
                    <Table>
                        <TableHead>
                            <TableRow sx={styles.fixedRow}>
                                {schema.tableColumns.map((column, index) => (
                                    <TableCell
                                        key={index}
                                        valign={column?.headCellProps?.valign ?? 'middle'}
                                        sx={mergeSx(
                                            { fontWeight: 'bold', color: 'grey', textTransform: 'capitalize' },
                                            column?.headCellProps?.style
                                        )}
                                        align={column?.headCellProps?.align ?? 'left'}
                                        className={column?.headCellProps?.class}
                                    >
                                        {column?.headCellRender?.() || <Typography>{column?.title}</Typography>}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading &&
                                Array.from({ length: 8 }, (_, index) => index).map((idx) => (
                                    <TableRow key={idx}>
                                        {schema.tableColumns.map((column, index) => (
                                            <TableCell
                                                key={index}
                                                align={column?.dataCellProps?.align ?? 'left'}
                                                sx={{ padding: 0, margin: 0 }}
                                            >
                                                <Skeleton
                                                    sx={{ height: '2rem', margin: 1 }}
                                                    variant="text"
                                                    animation="wave"
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            {data &&
                                data.length !== 0 &&
                                data?.map((record, rowIndex) => {
                                    return (
                                        <TableRow
                                            key={rowIndex}
                                            onClick={() => handelRowClick(record, rowIndex)}
                                            hover
                                            sx={{
                                                ...schema.getRowProps?.(record, rowIndex)?.style,
                                                boxSizing: 'border-box',
                                            }}
                                        >
                                            {schema.tableColumns.map((column) => (
                                                <TableCell
                                                    sx={column?.dataCellProps?.style}
                                                    align={column?.dataCellProps?.align ?? 'left'}
                                                    key={column.key}
                                                    className={column?.dataCellProps?.class}
                                                >
                                                    {column?.dataCellRender?.(record, rowIndex)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableFooter sx={styles.footer}>
                    {referenceBox ? <TableRow sx={styles.ref}>{referenceBox}</TableRow> : <Box />}
                    <TableRow>
                        {showPages && (
                            <TablePagination
                                component="div"
                                count={total as number}
                                page={0}
                                rowsPerPage={1}
                                rowsPerPageOptions={customRowsPerPageOptions ?? [10, 20, 40]}
                                onPageChange={() => { }}
                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                                labelRowsPerPage={'Rows per page'}
                                sx={styles.tablePagination}
                            />
                        )}
                    </TableRow>
                </TableFooter>
            </Box>
        </Box>
    );
}
