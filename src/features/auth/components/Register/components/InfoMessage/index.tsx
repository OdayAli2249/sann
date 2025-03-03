import React from "react";
import { Box, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const InfoMessage: React.FC = () => {
    return (
        <Box sx={{ display: "flex", alignItems: "flex-start", color: "text.secondary" }}>
            <InfoIcon fontSize="small" sx={{ marginRight: 1, color: "primary.main" }} />
            <Typography variant="body2" sx={{ fontSize: 13 }}>
                Configure the international trade and tax return preferences in your organization by navigating to{" "}
                <strong>Settings &gt; Taxes</strong>.
            </Typography>
        </Box >
    );
};

export default InfoMessage;
