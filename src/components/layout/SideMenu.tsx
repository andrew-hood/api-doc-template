import { View, Heading, Text, foundations } from "@go1d/go1d";
import { FC } from "react";
import Link from "next/link";
import IconPlus from "@go1d/go1d/build/components/Icons/Plus";
import IconMinus from "@go1d/go1d/build/components/Icons/Minus";
import { AuthLoginButton } from "src/components/features/Auth";

const WIDTH = 300;

interface Props {
  id?: string;
  items?: {
    label: string;
    href: string;
  }[];
}

const SideMenu: FC<Props> = ({ id, items }) => {
  const menus = [
    { id: "introduction", label: "Introduction", href: "/" },
    { id: "tags", label: "Tags", href: "/tags" },
    { id: "endpoints", label: "Endpoints", href: "/endpoints" },
  ];

  return (
    <View width={WIDTH} display={["none", "none", "flex"]}>
      <View
        width={WIDTH}
        height="100vh"
        backgroundColor="background"
        color="subtle"
        position="fixed"
        borderRight={1}
        borderColor="soft"
      >
        <View flexGrow={1} flexShrink={1} overflow="auto" paddingX={4}>
          {menus.map((menu) => (
            <View key={menu.id} paddingBottom={3}>
              <View
                paddingY={4}
                flexDirection="row"
                alignItems="center"
                position="sticky"
                backgroundColor="background"
                borderBottom={1}
                borderColor="faint"
                css={{
                  top: 0,
                }}
              >
                {menu.id === id ? (
                  <IconMinus marginRight={3} />
                ) : (
                  <IconPlus marginRight={3} />
                )}
                <Heading
                  semanticElement="h4"
                  visualHeadingLevel="Heading 4"
                  color="contrast"
                >
                  <Link href={menu.href}>{menu.label}</Link>
                </Heading>
              </View>
              {menu.id === id && (
                <View paddingLeft={4}>
                  {items?.map((item, index) => (
                    <Link key={index} href={item.href} passHref>
                      <Heading
                        semanticElement="h5"
                        visualHeadingLevel="Heading 5"
                        fontWeight="light"
                        paddingY={3}
                        ellipsis={true}
                        css={{
                          cursor: "pointer",
                          ":hover": {
                            fontWeight: "500",
                            color: foundations.colors.contrast,
                          },
                        }}
                      >
                        {item.label}
                      </Heading>
                    </Link>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
        <View padding={4} borderTop={1} borderColor="faded">
          <AuthLoginButton />
        </View>
      </View>
    </View>
  );
};

export default SideMenu;
