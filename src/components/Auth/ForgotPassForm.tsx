"use client";

import { useGraphError } from "@/hooks/useGraphError";
import "@/styles/app/auth/login.scss";
import { gql, useMutation } from "@apollo/client";
import { Button as JoyButton } from "@mui/joy";
import { Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const FORGET_PASSWORD = gql`
    mutation ForgetPassword($email: String!) {
        forgetPassword(email: $email)
    }
`;

export default function ForgotPassForm() {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const { errors, setErrors, errorHandler } = useGraphError({});

    const [forgetPassword] = useMutation(FORGET_PASSWORD);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const { data } = await forgetPassword({
                variables: { email },
            });

            if (data) {
                toast.success("Reset password email sent successfully");
                setEmail("");
            }
        } catch (e: any) {
            if (
                e?.graphQLErrors?.[0]?.extensions?.code !==
                "INTERNAL_SERVER_ERROR"
            ) {
                errorHandler(e);
            } else {
                toast.error("Something went wrong!");
            }
        }

        setLoading(false);
    };

    return (
        <form className="px-5 w-[360px] lg:w-[400px]" onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>
                Forgot Password
            </Typography>

            <Stack spacing={3}>
                <TextField
                    name="email"
                    label="Email address"
                    type="email"
                    error={errors.hasOwnProperty("email")}
                    helperText={errors["email"]}
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Stack>

            <JoyButton
                loading={loading}
                variant="solid"
                type="submit"
                className="auth-btn !mt-4 w-full"
            >
                {!loading && "Send Password Reset Link"}
            </JoyButton>
        </form>
    );
}
