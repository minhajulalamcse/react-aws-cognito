import { Box, styled, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const LeftNavigation = () => {
    const navActiveLinkStyle = ({ isActive }: { isActive: boolean }) => {
        return {
            fontWeight: isActive ? "bold" : "normal",
            background: isActive ? "#e6e6e6" : "none",
        };
    };
    const LinkWrapper = styled(NavLink)(() => ({
        textDecoration: "none",
        fontWeight: "normal",
        padding: "12px",
        width: "100%",
        color: "black",
        "&:hover": {
            background: "#f0f0f0",
        },
    }));
    return (
        <Box flex={1}>
            <Box
                borderBottom="1px solid #e6e6e6"
                minHeight="80px"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Typography color="red" display="inline-block" fontWeight="bold">
                    React{" "}
                    <Typography color="black" display="inline-block" fontWeight="bold">
                        AWS Cognito
                    </Typography>
                </Typography>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
                <LinkWrapper to="/home" style={navActiveLinkStyle}>
                    Home
                </LinkWrapper>
                <LinkWrapper to="/profile">Profile</LinkWrapper>
                <LinkWrapper to="/change-password">Change Password</LinkWrapper>
            </Box>
        </Box>
    );
};

export default LeftNavigation;
