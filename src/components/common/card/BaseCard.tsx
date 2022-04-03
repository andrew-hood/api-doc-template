import { View, ViewProps } from "@go1d/go1d";
import React, { FC, ReactElement } from "react";

interface Props {
  header: ReactElement;
}

const BaseCard: FC<Props & ViewProps> = ({ header, children, ...props }) => {
  return (
    <View
      borderRadius={3}
      marginBottom={4}
      overflow="hidden"
      backgroundColor="faint"
      {...props}
    >
      <View padding={3} backgroundOpacity="highlight">
        {header}
      </View>
      <View flexGrow={1} flexShrink={1} overflow="auto">
        {children}
      </View>
    </View>
  );
};

export default BaseCard;
