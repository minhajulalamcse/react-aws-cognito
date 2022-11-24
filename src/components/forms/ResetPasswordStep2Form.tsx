import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";
import { IResetPasswordStep2Form } from "../../interfaces/IResetPasswordStep2Form";
import FormWrapper from "../common/FormWrapper";

const ResetPasswordStep2Form = () => {
    const initialValues: IResetPasswordStep2Form = {
        code: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = yup.object().shape({
        code: yup.string().required("Required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Required"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .required("Required"),
    });

    const onSubmit = (values: IResetPasswordStep2Form, actions: FormikHelpers<IResetPasswordStep2Form>) => {
        console.log(values);
    };
    return (
        <FormWrapper>
            <Typography variant="h5" mb={1} textAlign="center">
                Reset Password
            </Typography>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {(formik) => {
                    return (
                        <Form>
                            <TextField
                                label="Code"
                                size="medium"
                                name="code"
                                sx={{
                                    border: "1px solid #FFF",
                                    borderRadius: 1,
                                    width: "100%",
                                    mt: "12px",
                                }}
                                autoComplete="off"
                                type="text"
                                placeholder="Email"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.code && Boolean(formik.errors.code)}
                                helperText={formik.touched.code && formik.errors.code}
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

                            <TextField
                                label="Confirm Password"
                                size="medium"
                                name="confirmPassword"
                                sx={{
                                    border: "1px solid #FFF",
                                    borderRadius: 1,
                                    width: "100%",
                                    mt: "12px",
                                }}
                                autoComplete="off"
                                type="password"
                                placeholder="Confirm Password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                            <Button type="submit" variant="contained" disableElevation fullWidth sx={{ mt: "12px" }}>
                                Submit
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </FormWrapper>
    );
};

export default ResetPasswordStep2Form;
