import React from "react";
import {
    Drawer,
    Box,
    Typography,
} from "@mui/material";
import BooleanInput from "./inputs/BooleanInput";
import { Layout } from "@/types/shared";
import { useLocation, useNavigate } from "react-router-dom";

type PropTypes = {
    layout: Layout;
    setRightDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    rightDrawerOpen: boolean;
};

const RightDrawer = ({ rightDrawerOpen, layout, setRightDrawerOpen }: PropTypes) => {

    const location = useLocation();
    const navigate = useNavigate();
    const nextSearchParams = new URLSearchParams(location.search);
    const handleNavigate = (nextSearchParams: URLSearchParams) => navigate({
        ...location,
        search: nextSearchParams.toString()
    });

    return (
        <Drawer
            sx={{ position: "fixed", '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 } }}
            anchor="right"
            open={rightDrawerOpen}
            onClose={() => {
                setRightDrawerOpen(false);
            }}
        >
            <Box sx={{ width: '100%', padding: 2, mt: 4 }}>
                <Typography variant="body1" sx={{ fontSize: 18, mb: 2 }}>Menu Settings</Typography>

                {/* Vertical Menu Switch */}
                <BooleanInput
                    label={"Vertical Menu"}
                    onChange={() => {
                        nextSearchParams.set('layout', "vertical");
                        handleNavigate(nextSearchParams);
                    }}
                    value={layout === "vertical"}
                />
                {/* Horizontal Menu Switch */}
                <BooleanInput
                    label={"Horizontal Menu"}
                    onChange={() => {
                        nextSearchParams.set('layout', "horizontal");
                        handleNavigate(nextSearchParams);
                    }}
                    value={layout === "horizontal"}
                />
            </Box>
        </Drawer>
    );
};

export default RightDrawer;
