import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const NoteSection: React.FC = () => {
    const features = [
        "Chart of Accounts",
        "Payment Modes",
        "Email Templates",
        "Default Tax Rates",
        "Template Customizations",
    ];

    return (
        <Box>
            {/* Note Section */}
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 13 }}>
                Note:
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 1, fontSize: 13 }}>
                • You can update some of these preferences from Settings anytime.
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 2, fontSize: 13 }}>
                • The language you select on this page will be the default language for the following features even if you change the language later:
            </Typography>

            {/* Features Grid (Responsive Columns) */}
            <Grid container spacing={2}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Typography variant="body2" sx={{
                            color: "text.secondary", display: "flex",
                            alignItems: "center", fontSize: 13
                        }}>
                            <StarIcon sx={{ fontSize: '16px', color: "orange", marginRight: 1 }} />
                            {feature}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default NoteSection;
