import { SX } from "@/types/shared";


export const styles = {
    root: {
        width: '100%',
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        height: '200px',
    } as SX,
    body: {
        width: '100%',
        mb: 2,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflowY: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    } as SX,
    container: {
        position: 'relative',
        height: '100%',
        overflowX: 'auto',
        overflowY: 'auto',
        '& .MuiTableCell-root': {
            padding: '6px',
            '& .MuiTypography-root': {
                fontSize: (theme) => theme.typography.subtitle2.fontSize,
            },
        },
    } as SX,
    tablePagination: {
        overflow: 'hidden',
        '& .MuiToolbar-root': {
            minHeight: '35px!important',
            paddingLeft: '0px!important',
            '& .MuiTablePagination-selectLabel': {
                fontSize: (theme) => theme.typography.caption.fontSize,
                color: (theme) => theme.palette.text.secondary,
            },
            '& .MuiInputBase-root': {
                fontSize: (theme) => theme.typography.caption.fontSize,
            },
        },
        '& .MuiTablePagination-displayedRows': {
            fontSize: (theme) => theme.typography.caption.fontSize,
        },
    } as SX,
    ref: {
        maxWidth: '64%',
    } as SX,
    fixedRow: {
        position: 'sticky',
        top: 0,
        backgroundColor: (theme) => theme.palette.secondary.contrast,
        zIndex: 1000,
        margin: '0px',
        borderSpacing: '0px',
    } as SX,
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '16px',
    } as SX,
    extraRow: {
        borderBottom: '1px solid #e0e0e0',
    } as SX,
    headerCell: {
        padding: '12px',
        margin: '0px',
        cursor: 'pointer',
        backgroundColor: '#ffffff',
    } as SX,
    cell: {
        padding: '0px',
        margin: '0px',
        borderSpacing: '0px',
        cursor: 'pointer',
    } as SX
};
