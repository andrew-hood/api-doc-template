import { View, ViewProps } from "@go1d/go1d";
import React, { FC, ReactElement } from "react";

interface Props {
  header?: ReactElement;
}

const BaseCard: FC<Props & ViewProps> = ({ children, header, ...props }) => {
  return (
    <View
      borderRadius={3}
      marginBottom={4}
      overflow="hidden"
      backgroundColor="faint"
      {...props}
    >
      {header && (
        <View padding={2} backgroundOpacity="highlight">
          {header}
        </View>
      )}
      <View flexGrow={1} flexShrink={1} overflow="auto">
        {children}
      </View>
    </View>
  );
};

export default BaseCard;
