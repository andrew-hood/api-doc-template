import { ButtonFilled, GlobalMessage, Text, View } from "@go1d/go1d";
import IconUser from "@go1d/go1d/build/components/Icons/User";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./reducer";

const LOGIN_URL =
  "https://auth.go1.com/oauth/authorize?response_type=token&client_id=46c2803e7fc8876ef99019ee856969857fb58e8c&redirect_uri=http://127.0.0.1:8081/&scope=user.read&partner_portal_id=1866971#/";

export const AuthLoginButton = () => {
  const dispatch = useDispatch();
  const auth: any = useSelector<any>((state) => state.auth.value);

  return auth?.access_token ? (
    <ButtonFilled icon={IconUser} onClick={() => dispatch(logout())}>
      Sign out
    </ButtonFilled>
  ) : (
    <ButtonFilled icon={IconUser} color="accent" href={LOGIN_URL}>
      Login
    </ButtonFilled>
  );
};

export const AuthNotification = () => {
  const dispatch = useDispatch();
  const auth: any = useSelector<any>((state) => state.auth.value);
  const { route, push } = useRouter();

  useEffect(() => {
    const attributes = { access_token: null };
    window.location.hash
      .slice(1)
      .split("&")
      .map((attr) => {
        const [key, value] = attr.split("=");
        (attributes as any)[key] = value;
      });
    if (attributes?.access_token) {
      dispatch(login(attributes));
      push("", undefined, { shallow: true });
    } else {
      const token = window.localStorage.getItem("token");
      token && dispatch(login({ access_token: token }));
    }
  }, [route, push, dispatch]);

  return auth?.access_token ? (
    <GlobalMessage color="default" status="success">
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginTop={-3}
      >
        <Text marginRight={3}>You&apos;re logged in as Andrew Hood</Text>
        <ButtonFilled
          color="success"
          size="sm"
          onClick={() => dispatch(logout())}
        >
          Logout
        </ButtonFilled>
      </View>
    </GlobalMessage>
  ) : null;
};
