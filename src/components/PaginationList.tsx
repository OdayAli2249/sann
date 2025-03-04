import React, { useState, useEffect } from "react";
import {
    Pagination,
    Typography,
    Box,
    Stack,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/system";
import PageLoading from "./PageLoading";

interface PaginatedListProps<T> {
    data: T[];
    total: number;
    initialPageSize?: number;
    initialPage?: number;
    onPaginationChange: (pageSize: number, page: number) => void;
    isLoading: boolean;
    builder: (data: T, index: number) => React.ReactNode;
    rowPerPage?: number[];
    specificFooterSize?: "small" | "medium" | "large";
}

function PaginatedList<T = any>({
    data,
    total,
    initialPageSize = 10,
    initialPage = 0,
    onPaginationChange,
    isLoading,
    builder,
    specificFooterSize,
}: PaginatedListProps<T>) {
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [page, setPage] = useState(initialPage);
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));

    const totalPages = Math.ceil(total / pageSize);

    useEffect(() => {
        onPaginationChange(pageSize, page);
    }, [pageSize, page]);

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value - 1);
        onPaginationChange(pageSize, value - 1);
    };

    const handlePageSizeChange = (value: any) => {
        setPageSize(value);
        setPage(0);
        onPaginationChange(value, 0);
    };

    console.log(handlePageSizeChange);


    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    height: 544,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: isLoading ? "center" : "flex-start",
                    alignItems: isLoading ? "center" : "stretch",
                    gap: 2,
                }}
            >
                {isLoading ? (
                    <PageLoading />
                ) : (
                    data.map((item, index) => (
                        <Box key={index}>{builder(item, index)}</Box>
                    ))
                )}
                {!!data && data.length === 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        No Data
                    </Box>
                )}
            </Box>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ marginTop: 2 }}
            >
                <Typography variant="body1" sx={{ p: 2 }}>
                    {"Total Records"}:{" "}
                    <Typography variant="body1" component={"span"} fontWeight={700}>
                        {total}
                    </Typography>
                </Typography>
                <Pagination
                    color="primary"
                    page={page + 1}
                    shape="rounded"
                    count={totalPages}
                    siblingCount={smallScreen ? 0 : specificFooterSize ? 0 : 1}
                    boundaryCount={smallScreen ? 0 : 1}
                    size={
                        specificFooterSize
                            ? specificFooterSize
                            : mediumScreen
                                ? "small"
                                : "large"
                    }
                    sx={{ size: { xs: "small" } }}
                    onChange={handlePageChange}
                />
            </Stack>
        </Box>
    );
}

export default PaginatedList;
