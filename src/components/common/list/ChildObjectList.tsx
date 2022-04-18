import { View, Text, Heading, ButtonMinimal } from "@go1d/go1d";
import IconMinus from "@go1d/go1d/build/components/Icons/Minus";
import IconPlus from "@go1d/go1d/build/components/Icons/Plus";
import { FC, useEffect, useState } from "react";
import MarkdownText from "../text/MarkdownText";
import BaseList from "./BaseList";

interface Props {
  object: any;
}

const ChildObjectList: FC<Props> = ({ object }) => {
  const [visibility, setVisibility] = useState(false);
  const [properties, setProperties] = useState<any>([]);

  useEffect(() => {
    setProperties(
      Object.entries(object).map(([key, value]) => ({
        name: key,
        ...(value as object),
      }))
    );
  }, [object]);

  return properties.length > 0 ? (
    <View
      marginTop={3}
      border={1}
      borderRadius={3}
      borderColor="faded"
      overflow="hidden"
    >
      <ButtonMinimal
        justifyContent="flex-start"
        icon={visibility ? IconMinus : IconPlus}
        size="sm"
        onClick={() => setVisibility(!visibility)}
        backgroundColor={visibility ? "soft" : "background"}
        sizeStyles={{
          sm: {
            typeScale: 1,
            paddingX: 3,
            paddingY: 0,
          },
        }}
      >
        {visibility ? "Hide" : "Show"} child properties
      </ButtonMinimal>
      {visibility && (
        <BaseList
          paddingTop={3}
          paddingX={5}
          items={properties}
          itemRenderer={(item, index) => (
            <View key={index} paddingBottom={4}>
              <View flexDirection="row" alignItems="center">
                <Heading
                  semanticElement="h5"
                  visualHeadingLevel="Heading 5"
                  color="default"
                >
                  {item.name}
                </Heading>
                <Text fontSize={1} marginLeft={3} color="thin">
                  {item.type}
                </Text>
              </View>
              {item.description && (
                <MarkdownText color="subtle" text={item.description || ""} />
              )}
              {item.type === "object" && item.properties && (
                <ChildObjectList object={item?.properties || {}} />
              )}
            </View>
          )}
        />
      )}
    </View>
  ) : null;
};

export default ChildObjectList;
