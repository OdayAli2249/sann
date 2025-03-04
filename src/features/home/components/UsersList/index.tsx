import React, { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { User } from "@/types/Auth";
import PaginatedList from "@/components/PaginationList";
import { users } from "../../dummyData";

// User List Item Component
const UserListItem: React.FC<{ user: User }> = ({ user }) => {
    return (
        <Card variant="outlined" sx={{ width: "100%" }}>
            <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {user.email}
                </Typography>
            </CardContent>
        </Card>
    );
};

export const UsersList: React.FC = () => {
    const [_, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [filteredData, setFilteredData] = useState<User[]>(users.slice(0, pageSize));

    const handlePaginationChange = (newPageSize: number, newPage: number) => {
        setPageSize(newPageSize);
        setCurrentPage(newPage);
        const startIndex = newPage * newPageSize;
        const endIndex = startIndex + newPageSize;
        setFilteredData(users.slice(startIndex, endIndex));
    };

    return (
        <Box sx={{ maxWidth: 600, margin: "auto", height: '100%' }}>
            <PaginatedList
                data={filteredData}
                total={users.length}
                initialPageSize={5}
                initialPage={0}
                onPaginationChange={handlePaginationChange}
                isLoading={false}
                builder={(user) => <UserListItem key={user.id} user={user} />}
            />
        </Box>
    );
};
