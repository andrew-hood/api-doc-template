import { Container, View } from "@go1d/go1d";
import Head from "next/head";
import { FC, ReactElement } from "react";
import { AuthNotification } from "../features/Auth";
import SideMenu from "./SideMenu";
import TopMenu from "./TopMenu";

interface Props {
  layout: {
    title: string;
    description?: string;
    menu?: any[];
    api?: string;
    apis?: any;
  };
  action?: ReactElement;
}

const Layout: FC<Props> = ({
  layout: { title, description = "", menu, api, apis },
  action,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopMenu title={title} api={api} apis={apis} action={action} />
      <View flexDirection="row">
        {menu && <SideMenu menu={menu} />}
        <View flexGrow={1} flexShrink={1}>
          <AuthNotification />
          <Container
            contain={menu ? "full" : "wide"}
            paddingY={8}
            paddingX={menu ? [6, 8, 9] : [4, 4, 0]}
          >
            {children}
          </Container>
        </View>
      </View>
    </>
  );
};

export default Layout;
