import { View, Text, Heading } from "@go1d/go1d";
import { OpenAPI } from "openapi-types";
import { FC } from "react";
import MarkdownText from "../text/MarkdownText";
import BaseList from "./BaseList";

interface Props {
  parameters: OpenAPI.Parameter[];
}

const FILTER_QUERY = (param: Record<string, any>) => param.in === "query";

const ParameterList: FC<Props> = ({ parameters }) => {
  return parameters.filter(FILTER_QUERY).length > 0 ? (
    <BaseList
      title="Query Parameters"
      items={parameters.filter(FILTER_QUERY)}
      itemRenderer={(item, index) => (
        <View key={index} marginBottom={5}>
          <View flexDirection="row" alignItems="center">
            <Heading semanticElement="h5" visualHeadingLevel="Heading 5">
              {item.name}
            </Heading>
            <Text fontSize={1} marginLeft={3} color="thin">
              {item.schema.type}
            </Text>
          </View>
          <MarkdownText
            color="subtle"
            fontSize={1}
            text={item.description || "No description"}
          />
        </View>
      )}
    />
  ) : null;
};

export default ParameterList;
