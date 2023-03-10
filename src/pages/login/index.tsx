import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  signIn,
  SignInResponse,
} from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import { BuiltInProviderType } from "next-auth/providers";
import { Alert, Box, Input, PasswordInput } from "@mantine/core";
import { ChangeEvent, useState } from "react";

interface FormProps {
  email: string;
  password: string;
}

const initialState = {
  "email": "",
  "password": "",
};

const SignIn: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ providers }) => {
  const {
    "query": { callbackUrl },
  }: NextRouter = useRouter();

  const callback = callbackUrl as string | undefined;

  const [formValue, setFormValue] = useState<FormProps>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      "email": formValue.email,
      "password": formValue.password,
      "redirect": false, // !This refreshes page
      // "callbackUrl": "/",
    });
    if (result?.error) {
      // TODO: Handle Error
      console.log(result?.error);
    } else {
      window.location.replace((callbackUrl as string) || "/");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta property="og:title" content="Login" key="title" />
      </Head>
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <Input.Wrapper label="Email" required>
          <Input
            name="email"
            placeholder="example@gmail.com"
            variant="filled"
            onChange={handleChange}
            value={formValue.email}
          />

          <PasswordInput
            name="password"
            placeholder="Password"
            label="Password"
            value={formValue.password}
            onChange={handleChange}
            variant="filled"
            width={500}
            required
          />
        </Input.Wrapper>

        <Box display={"flex"}>
          <button
            className="mr-4 flex items-center justify-center rounded-md bg-cyan-500 p-4 shadow-lg"
            onClick={handleLogin}
          >
            <p className="text-slate-800">Login</p>
          </button>

          {providers &&
            Object.values(providers).map((provider) =>
              provider.name === "Credentials" ? null : (
                <div key={provider.name}>
                  <button
                    className="flex items-center justify-center rounded-md bg-slate-200 p-4 shadow-lg"
                    onClick={async (): Promise<SignInResponse | undefined> =>
                      await signIn(provider.id, {
                        "callbackUrl": callback ?? "/",
                      })
                    }
                  >
                    <p className="text-slate-800">{provider.name}</p>
                  </button>
                </div>
              )
            )}
        </Box>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null;
}> = async (context) => {
  const session = await getSession(context);

  if (session?.user) {
    return {
      "redirect": {
        "permanent": false,
        "destination": "/",
      },
    };
  }

  const providers = await getProviders();

  return {
    "props": { providers },
  };
};

export default SignIn;
