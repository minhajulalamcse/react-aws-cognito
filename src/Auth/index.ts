import { Auth } from "aws-amplify";
import { IResetPasswordStep2Form } from "../interfaces/IResetPasswordStep2Form";
import { ISignInFormValues } from "../interfaces/ISignInFormValues";
import { ISignUpFormValues } from "../interfaces/ISignUpFormValues";
import { IVerifyEmailValues } from "../interfaces/IVerifyEmailValues";
import { getFromLocalStorage } from "../utils";
import { LS_EMAIL } from "../utils/constants";

export const signUp = async (values: ISignUpFormValues) => {
    const { firstName, lastName, email, password } = values;
    try {
        const { user } = await Auth.signUp({
            username: email,
            password,
            attributes: {
                given_name: firstName,
                family_name: lastName,
            },
        });
        return user;
    } catch (error) {
        throw error;
    }
};

export const resendConfirmationCode = async (email: string) => {
    try {
        await Auth.resendSignUp(email);
    } catch (error) {
        throw error;
    }
};

export const confirmSignUp = async (values: IVerifyEmailValues) => {
    const { email, code } = values;
    try {
        await Auth.confirmSignUp(email, code);
    } catch (error) {
        throw error;
    }
};

export const signIn = async (values: ISignInFormValues) => {
    const { email, password } = values;
    try {
        const user = await Auth.signIn(email, password);
        return user;
    } catch (error) {
        throw error;
    }
};

export const getResetPasswordCodeByEmail = async (email: string) => {
    try {
        await Auth.forgotPassword(email)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (values: IResetPasswordStep2Form) => {
    const { email, code, password } = values;
    try {
        Auth.forgotPasswordSubmit(email, code, password)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    } catch (error) {
        throw error;
    }
};
