"use client";

import { useGraphError } from "@/hooks/useGraphError";
import { useInput } from "@/hooks/useInput";
import { AuthProviderEnum } from "@/interfaces";
import { getClient } from "@/utils/getClient";
import { gql } from "@apollo/client";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Button as JoyButton } from "@mui/joy";
import {
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import SSOWrapper from "./SSOWrapper";

const Register = gql`
    mutation ($user: RegisterDto!) {
        register(user: $user) {
            id
            fullname
            email
            avatar
            created_at
            updated_at
        }
    }
`;

export default function RegisterForm() {
    const router = useRouter();
    const client = getClient();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const { errors, errorHandler } = useGraphError({});
    const { value: fullname, bind: bindFullname } = useInput("");
    const { value: email, bind: bindEmail } = useInput("");
    const { value: company, bind: bindCompany } = useInput("");
    const { value: password, bind: bindPassword } = useInput("");
    const { value: password_confirmation, bind: bindPasswordConfirmation } =
        useInput("");
    const { value: phone, bind: bindPhone } = useInput("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            await client.mutate({
                mutation: Register,
                variables: {
                    user: {
                        fullname,
                        company,
                        email,
                        password,
                        password_confirmation,
                        phone: +phone,
                        provider: AuthProviderEnum.Credentials,
                    },
                },
            });
            toast.success("Account created successfully.", {
                position: "top-right",
            });
            await router.push("/auth/login");
        } catch (e: any) {
            errorHandler(e);
            setLoading(false);
        }
    };

    return (
        <div className="register__form w-[360px] lg:w-[400px]">
            <Typography variant="h4" gutterBottom>
                Create your account
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
                Already have an account?
                <Link href="/auth/login" className="text-sm text-blue-600 ml-2">
                    Log in
                </Link>
            </Typography>

            <SSOWrapper />
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        required
                        name="fullname"
                        error={errors.hasOwnProperty("fullname")}
                        helperText={errors["fullname"]}
                        label="Full name"
                        type="text"
                        {...bindFullname}
                    />
                    <TextField
                        name="company"
                        error={errors.hasOwnProperty("company")}
                        helperText={errors["company"]}
                        label="Company"
                        type="text"
                        {...bindCompany}
                    />
                    <TextField
                        required
                        name="email"
                        error={errors.hasOwnProperty("email")}
                        helperText={errors["email"]}
                        label="Work email"
                        type="email"
                        {...bindEmail}
                    />
                    <TextField
                        required
                        name="password"
                        error={errors.hasOwnProperty("password")}
                        helperText={errors["password"]}
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <AiFillEye />
                                        ) : (
                                            <AiFillEyeInvisible />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        {...bindPassword}
                    />
                    <TextField
                        required
                        name="password_confirmation"
                        error={errors.hasOwnProperty("password_confirmation")}
                        helperText={errors["password_confirmation"]}
                        label="Password Confirmation"
                        type={showPasswordConfirmation ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowPasswordConfirmation(
                                                !showPasswordConfirmation
                                            )
                                        }
                                        edge="end"
                                    >
                                        {showPasswordConfirmation ? (
                                            <AiFillEye />
                                        ) : (
                                            <AiFillEyeInvisible />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        {...bindPasswordConfirmation}
                    />
                    <TextField
                        name="phone"
                        error={errors.hasOwnProperty("phone")}
                        helperText={errors["phone"]}
                        label="Phone number"
                        type="text"
                        placeholder="+971"
                        {...bindPhone}
                    />
                </Stack>

                <JoyButton
                    loading={loading}
                    variant="solid"
                    type="submit"
                    className="auth-btn !mt-8 !mb-2 min-w-[155px]"
                >
                    {!loading && "Create Account"}
                </JoyButton>

                <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
                    <p>
                        By creating account, you agree to Ovioo's{" "}
                        <Link
                            href="/terms"
                            className="text-sm text-blue-600 font-normal"
                        >
                            Terms and Policies
                        </Link>
                    </p>
                </Stack>
            </form>
        </div>
    );
}
