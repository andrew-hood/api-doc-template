import { ButtonFilled, GlobalMessage, Pill, Text, View } from "@go1d/go1d";
import IconUser from "@go1d/go1d/build/components/Icons/User";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./reducer";

export const AuthLoginButton = () => {
  const dispatch = useDispatch();
  const auth: any = useSelector<any>((state) => state.auth.value);

  const LOGIN_URL = [
    "https://auth.go1.com/oauth/authorize",
    "response_type=token&client_id=46c2803e7fc8876ef99019ee856969857fb58e8c&redirect_uri=http://127.0.0.1:8081/&scope=user.read&partner_portal_id=1866971",
  ].join("?");

  return auth?.access_token ? (
    <ButtonFilled icon={IconUser} onClick={() => dispatch(logout())}>
      Logout
    </ButtonFilled>
  ) : (
    <ButtonFilled icon={IconUser} color="accent" href={LOGIN_URL}>
      Login
    </ButtonFilled>
  );
};

export const AuthScopes = ({ security }: { security: any }) => {
  const auth: any = useSelector<any>((state) => state.auth.value);

  const Tag = ({ label }: { label: string }) => (
    <Pill
      color={auth?.scopes?.indexOf(label) >= 0 ? "success" : "warning"}
      fontSize={1}
      margin={2}
    >
      <Text fontWeight="semibold" fontSize={1}>
        {label}
      </Text>{" "}
      {auth?.scopes?.indexOf(label) < 0 && "(missing)"}
    </Pill>
  );
  return security?.length > 0 && security[0].OAuth2 ? (
    <View flexDirection="row" marginBottom={4} flexWrap="wrap">
      {security[0].OAuth2.map((scope: string) => (
        <Tag key={scope} label={scope} />
      ))}
    </View>
  ) : null;
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
        <Text marginRight={3}>You&apos;re currently logged in</Text>
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
