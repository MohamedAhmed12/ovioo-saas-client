"use client";

import { useGraphError } from "@/hooks/useGraphError";
import { useInput } from "@/hooks/useInput";
import "@/styles/app/auth/login.scss";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@mui/joy";
import {
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SSOWrapper from "./SSOWrapper";

const Login = gql`
    mutation ($user: LoginDto!) {
        login(user: $user) {
            id
            fullname
            email
            avatar
            created_at
            updated_at
        }
    }
`;

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { errors, errorHandler } = useGraphError({});
    const { value: email, bind: bindEmail } = useInput("");
    const { value: password, bind: bindPassword } = useInput("");

    const searchParam = useSearchParams();
    const callbackUrl = searchParam.get("callbackUrl") || "/dashboard/task";

    const [login] = useMutation(Login);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { data } = await login({
                variables: {
                    user: {
                        email,
                        password,
                    },
                },
            });

            await signIn("credentials", {
                callbackUrl,
                data: JSON.stringify(data.login),
            });
        } catch (e: any) {
            errorHandler(e);
            setLoading(false);
        }
    };

    return (
        <div className="login__form w-full max-w-[360px] lg:max-w-[400px]">
            <Typography variant="h4" gutterBottom>
                Sign in to Ovioo
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
                Don’t have an account?
                <Link
                    href="/auth/register"
                    className="text-sm text-blue-600 ml-2"
                >
                    Get started
                </Link>
            </Typography>

            <SSOWrapper />

            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        required
                        name="email"
                        label="Email address"
                        error={errors.hasOwnProperty("email")}
                        helperText={errors["email"]}
                        {...bindEmail}
                    />

                    <TextField
                        required
                        name="password"
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
                        error={errors.hasOwnProperty("password")}
                        helperText={errors["password"]}
                        {...bindPassword}
                    />
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ my: 2 }}
                >
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Remember me"
                    />
                    <Link
                        href="/auth/password/forgot"
                        className="text-sm text-blue-600 font-normal"
                    >
                        Forgot password?
                    </Link>
                </Stack>
                <Button
                    loading={loading}
                    variant="solid"
                    type="submit"
                    className="auth-btn !mt-4 min-w-[75px]"
                >
                    {!loading && "Login"}
                </Button>
            </form>
        </div>
    );
}
