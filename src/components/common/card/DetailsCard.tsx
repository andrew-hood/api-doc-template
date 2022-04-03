import { Heading, View } from "@go1d/go1d";
import React, { FC, ReactElement } from "react";
import BaseCard from "./BaseCard";

interface Props {
  title: string;
  actions?: ReactElement;
  content: string | ReactElement;
}

const DetailsCard: FC<Props> = ({ title, actions, content }) => {
  return (
    <BaseCard
      flexGrow={1}
      flexShrink={1}
      border={1}
      borderColor="faded"
      mode="light"
      header={
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent={actions ? "space-between" : "flex-start"}
        >
          <Heading
            semanticElement="h6"
            visualHeadingLevel="Heading 6"
            color="default"
          >
            {title}
          </Heading>
          {actions}
        </View>
      }
    >
      <View padding={3}>{content}</View>
    </BaseCard>
  );
};

export default DetailsCard;
