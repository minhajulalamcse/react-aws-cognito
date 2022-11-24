import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { resetPassword } from "../../Auth";
import { IResetPasswordStep2Form } from "../../interfaces/IResetPasswordStep2Form";
import { getFromLocalStorage, removeFromLocalStorage } from "../../utils";
import { LS_EMAIL } from "../../utils/constants";
import FormWrapper from "../common/FormWrapper";

const ResetPasswordStep2Form = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        let email = getFromLocalStorage(LS_EMAIL);
        if (email) {
            setEmail(email);
        }
    }, []);

    const initialValues: IResetPasswordStep2Form = {
        email: email || "",
        code: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Required"),
        code: yup.string().required("Required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Required"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .required("Required"),
    });

    const onSubmit = (values: IResetPasswordStep2Form, actions: FormikHelpers<IResetPasswordStep2Form>) => {
        handleResetPassword(values, actions);
    };

    const handleResetPassword = async (
        values: IResetPasswordStep2Form,
        actions: FormikHelpers<IResetPasswordStep2Form>
    ) => {
        try {
            await resetPassword(values);
            actions.setSubmitting(false);
            removeFromLocalStorage(LS_EMAIL);
            navigate("/signin");
        } catch (error) {
            console.log(error);
            actions.setSubmitting(false);
        }
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
                            {!email && (
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
                            )}
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
                                placeholder="Code"
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
