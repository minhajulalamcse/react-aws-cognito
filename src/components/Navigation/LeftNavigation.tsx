import { Box, styled, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const LeftNavigation = () => {
    const navActiveLinkStyle = ({ isActive }: { isActive: boolean }) => {
        return {
            fontWeight: isActive ? "bold" : "normal",
            background: isActive ? "#fff" : "none",
        };
    };
    const LinkWrapper = styled(NavLink)(({ theme }) => ({
        textDecoration: "none",
        fontWeight: "normal",
        padding: "12px",
        width: "100%",
        color: "black",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        boxSizing: "border-box",
        borderRadius: "5px",
        marginBottom: "8px",
        transition: "0.5s all ease-in-out",
        "&:hover": {
            background: "#fff",
        },
        [theme.breakpoints.down("md")]: {
            p: {
                display: "none",
            },
        },
    }));

    const IconWrapper = styled(Box)(({ theme }) => ({
        minWidth: "20px",
        minHeight: "20px",
        background: "#BEBEBE",
        borderRadius: 1,
        marginRight: "8px",
        transition: "0.5s all ease-in-out",
        [theme.breakpoints.down("md")]: {
            marginRight: "0px",
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
                <Typography display="inline-block" fontWeight="bold">
                    RAC
                </Typography>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" p={3}>
                <LinkWrapper to="/home" style={navActiveLinkStyle}>
                    <IconWrapper />
                    <Typography variant="body1">Home</Typography>
                </LinkWrapper>
                <LinkWrapper to="/profile">
                    <IconWrapper />
                    <Typography variant="body1">Profile</Typography>
                </LinkWrapper>
                <LinkWrapper to="/change-password">
                    <IconWrapper />
                    <Typography variant="body1">Change Password</Typography>
                </LinkWrapper>
            </Box>
        </Box>
    );
};

export default LeftNavigation;
