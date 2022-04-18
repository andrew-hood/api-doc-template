import { View, Heading, foundations } from "@go1d/go1d";
import { FC } from "react";
import Link from "next/link";
import { AuthLoginButton } from "src/components/features/Auth";

const WIDTH = 300;

interface ItemType {
  label: string;
  href: string;
  subitems?: any[];
  tags?: string[];
}

interface Props {
  menu?: ItemType[];
  auth?: any;
}

const SideMenu: FC<Props> = ({ menu, auth }) => {
  return (
    <View width={WIDTH} display={["none", "none", "flex"]}>
      <View
        width={WIDTH}
        height="calc(100vh - 64px)"
        backgroundColor="background"
        color="thin"
        position="fixed"
        borderRight={1}
        borderColor="soft"
      >
        <View
          flexGrow={1}
          flexShrink={1}
          overflow="auto"
          paddingLeft={6}
          paddingRight={4}
          paddingBottom={4}
        >
          {menu?.map((item) => (
            <View key={item.label} paddingTop={4}>
              <View
                paddingY={2}
                flexDirection="row"
                alignItems="center"
                backgroundColor="background"
                css={{
                  top: 0,
                }}
              >
                <Heading
                  semanticElement="h5"
                  visualHeadingLevel="Heading 5"
                  color="contrast"
                  fontWeight="light"
                  ellipsis={true}
                >
                  <Link href={item.href} passHref>
                    {item.label}
                  </Link>
                </Heading>
              </View>
              {item.subitems?.map((subitem, index) => (
                <Heading
                  key={index}
                  semanticElement="h5"
                  visualHeadingLevel="Heading 5"
                  fontWeight="light"
                  paddingY={3}
                  ellipsis={true}
                  css={{
                    "& > a:hover": {
                      color: foundations.colors.contrast,
                    },
                  }}
                >
                  <Link href={subitem.href} passHref>
                    {subitem.label}
                  </Link>
                </Heading>
              ))}
            </View>
          ))}
        </View>
        {auth && (
          <View padding={4} borderTop={1} borderColor="faded">
            <AuthLoginButton />
          </View>
        )}
      </View>
    </View>
  );
};

export default SideMenu;
