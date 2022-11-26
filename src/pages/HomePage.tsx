import { Grid, styled, Box } from "@mui/material";
import { LeftNavigation, TopNavigation } from "../components";

const HomePage = () => {
    const TemplateGrid = styled(Grid)(({ theme }) => ({
        overflow: "auto",
        background: "#fff",
        flex: 1,
    }));
    const NavigationContainer = styled(Grid)(({ theme }) => ({
        display: "flex",
        flex: "0 0 250px",
        background: "#f4f4f4",
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
                <Box flex={1} p={3} overflow="auto">
                    Main Content
                </Box>
            </TemplateGrid>
        </Grid>
    );
};

export default HomePage;
