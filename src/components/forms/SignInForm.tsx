import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";
import { signIn } from "../../Auth";
import { ISignInFormValues } from "../../interfaces/ISignInFormValues";
import FormWrapper from "../common/FormWrapper";

const SignInForm = () => {
    const initialValues: ISignInFormValues = {
        email: "",
        password: "",
    };

    const validationSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Required"),
        password: yup.string().required("Required"),
    });

    const onSubmit = (values: ISignInFormValues, actions: FormikHelpers<ISignInFormValues>) => {
        handleSignIn(values, actions);
    };

    const handleSignIn = async (values: ISignInFormValues, actions: FormikHelpers<ISignInFormValues>) => {
        try {
            const user = await signIn(values);
            actions.setSubmitting(false);
        } catch (error) {
            actions.setSubmitting(false);
            console.log(error);
        }
    };
    return (
        <FormWrapper>
            <Typography variant="h5" mb={1} textAlign="center">
                Sign In
            </Typography>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {(formik) => {
                    return (
                        <Form>
                            <TextField
                                label="Email"
                                size="medium"
                                name="email"
                                sx={{
                                    border: "1px solid #FFF",
                                    borderRadius: 1,
                                    width: "100%",
                                    mt: "12px",
                                }}
                                autoComplete="off"
                                type="text"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />

                            <TextField
                                label="Password"
                                size="medium"
                                name="password"
                                sx={{
                                    border: "1px solid #FFF",
                                    borderRadius: 1,
                                    width: "100%",
                                    mt: "12px",
                                }}
                                autoComplete="off"
                                type="password"
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />

                            <Button
                                disabled={!formik.isValid || formik.isSubmitting}
                                type="submit"
                                variant="contained"
                                disableElevation
                                fullWidth
                                sx={{ mt: "12px" }}
                            >
                                Submit
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </FormWrapper>
    );
};

export default SignInForm;
