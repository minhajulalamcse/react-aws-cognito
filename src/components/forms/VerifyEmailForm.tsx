import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { confirmSignUp, resendConfirmationCode } from "../../Auth";
import { IVerifyEmailValues } from "../../interfaces/IVerifyEmailValues";
import { getFromLocalStorage, removeFromLocalStorage } from "../../utils";
import { LS_EMAIL } from "../../utils/constants";
import FormWrapper from "../common/FormWrapper";
import Timer from "../Timer";

const VerifyEmailForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string | null>(null);
    const [resendCountdownStart, setResendCountdownStart] = useState<boolean>(false);

    useEffect(() => {
        setEmail(getFromLocalStorage(LS_EMAIL));
    }, []);

    const initialValues: IVerifyEmailValues = {
        email: email || "",
        code: "",
    };

    const validationSchema = yup.object().shape({
        code: yup.string().required("Required"),
        email: yup.string().email("Invalid email").required("Required"),
    });

    const onSubmit = (values: IVerifyEmailValues, actions: FormikHelpers<IVerifyEmailValues>) => {
        handleConfirmEmail(values, actions);
    };

    const handleConfirmEmail = async (values: IVerifyEmailValues, actions: FormikHelpers<IVerifyEmailValues>) => {
        try {
            await confirmSignUp(values);
            removeFromLocalStorage(LS_EMAIL);
            actions.setSubmitting(false);
            navigate("/signin");
        } catch (error) {
            actions.setSubmitting(false);
            console.log(error);
        }
    };

    const handleResendCode = async () => {
        const email = getFromLocalStorage(LS_EMAIL);
        if (email) {
            try {
                await resendConfirmationCode(email);
                setResendCountdownStart(true);
            } catch (error) {
                console.log(error);
            }
        } else {
            // redirect to page so that user can provide email and request again for code
        }
    };
    return (
        <FormWrapper>
            <Typography variant="h5" mb={1} textAlign="center">
                Verify Email
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

                            <Typography textAlign="right" mt={1}>
                                Didn&apos;t receive the code?
                                {resendCountdownStart ? (
                                    <Timer setResendCountdownStart={setResendCountdownStart} />
                                ) : (
                                    <Typography
                                        display="inline-block"
                                        ml={1}
                                        color="primary"
                                        sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                                        onClick={handleResendCode}
                                    >
                                        Resend
                                    </Typography>
                                )}
                            </Typography>
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

export default VerifyEmailForm;
