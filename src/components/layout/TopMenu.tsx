import React, { FC } from "react";
import { AuthNotification } from "src/components/features/Auth";

interface Props {
  title: string;
}

const TopMenu: FC<Props> = ({ title }) => {
  return (
    <>
      <AuthNotification />

      {/* <Container
        contain="full"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingY={5}
        paddingX={[6, 8, 9]}
      >
        <View>{title}</View>
        <View></View>
      </Container> */}
    </>
  );
};

export default TopMenu;
