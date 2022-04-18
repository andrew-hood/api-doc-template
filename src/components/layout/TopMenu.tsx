import { Container, Select, View } from "@go1d/go1d";
import { useRouter } from "next/router";
import React, { FC, ReactElement } from "react";

interface Props {
  title: string;
  api?: string;
  apis?: any;
  action?: ReactElement;
}

const TopMenu: FC<Props> = ({ title, api, apis, action }) => {
  const { push } = useRouter();

  return (
    <View height={58}>
      <View
        backgroundColor="background"
        position="fixed"
        zIndex={10}
        css={{ top: 0, right: 0, left: 0 }}
        boxShadow="crisp"
      >
        <Container
          contain="full"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          height={58}
          paddingY={3}
          paddingX={5}
        >
          <View>{title}</View>
          <View flexDirection="row">
            {action}
            {api && apis && (
              <Select
                size="sm"
                value={api}
                options={apis?.map((api: string) => ({
                  label: api,
                  value: api,
                }))}
                onChange={(e) => push(`/${e.target.value}`)}
              />
            )}
          </View>
        </Container>
      </View>
    </View>
  );
};

export default TopMenu;
