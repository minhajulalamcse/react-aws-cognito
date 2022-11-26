import { Grid, styled, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { LeftNavigation, TopNavigation } from "../components";

const MainPageTemplate = () => {
    const TemplateGrid = styled(Grid)(({ theme }) => ({
        overflow: "auto",
        background: "#fff",
        flex: 1,
    }));
    const NavigationContainer = styled(Grid)(({ theme }) => ({
        display: "flex",
        flex: "0 0 250px",
        background: "#F0F4F7",
        borderRight: "1px solid #e6e6e6",
        transition: "0.5s all ease-in-out",
        [theme.breakpoints.down("md")]: {
            flex: "0 0 50px",
        },
    }));
    return (
        <Grid display="flex" height="100vh">
            <NavigationContainer>
                <LeftNavigation />
            </NavigationContainer>
            <TemplateGrid xs={12} display="flex" flexDirection="column" height="100%">
                <TopNavigation />
                <Box flex={1} p={3} overflow="auto" display="flex" justifyContent="center" alignItems="flex-start">
                    <Outlet />
                </Box>
            </TemplateGrid>
        </Grid>
    );
};

export default MainPageTemplate;
