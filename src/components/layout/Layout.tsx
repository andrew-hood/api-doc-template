import { Container, View } from "@go1d/go1d";
import Head from "next/head";
import { FC } from "react";
import SideMenu from "./SideMenu";
import TopMenu from "./TopMenu";

interface Props {
  title: string;
  description?: string;
  menu?: {
    id?: string;
    items: any[];
  };
}

const Layout: FC<Props> = ({ title, description = "", menu, children }) => {
  return (
    <View flexDirection="row">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SideMenu id={menu?.id} items={menu?.items} />
      <View flexGrow={1} flexShrink={1}>
        <TopMenu title={title} />
        <Container contain="full" paddingY={8} paddingX={[6, 8, 9]}>
          {children}
        </Container>
      </View>
    </View>
  );
};

export default Layout;
