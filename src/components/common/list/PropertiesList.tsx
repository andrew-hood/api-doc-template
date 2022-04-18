import { View, Text, Heading } from "@go1d/go1d";
import { get } from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { IJsonSchema } from "openapi-types";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useContentType from "src/hooks/useContentType";
import MarkdownText from "../text/MarkdownText";
import BaseList from "./BaseList";
import ChildObjectList from "./ChildObjectList";

interface Props {
  title: string;
  object:
    | OpenAPIV3.RequestBodyObject
    | OpenAPIV3.ResponseObject
    | OpenAPIV3.ReferenceObject;
}

const PropertiesList: FC<Props> = ({ title, object }) => {
  const [properties, setProperties] = useState<any>([]);
  const [contentType, contentTypeOptions, setContentType] =
    useContentType(object);

  useEffect(() => {
    if (!contentType) return;

    const values = Object.entries(
      get(object, `content.${(contentType as any).label}.schema.properties`, {})
    ).map(([key, value]) => ({
      name: key,
      ...(value as object),
    })) as (IJsonSchema & { name: string })[];
    setProperties(values);
  }, [object, contentType]);

  return contentType ? (
    <BaseList
      title={title}
      items={properties}
      itemRenderer={(item, index) => (
        <View key={index} marginBottom={5}>
          <View flexDirection="row" alignItems="center" marginBottom={2}>
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
          <MarkdownText color="subtle" text={item.description || ""} />
          {item.type === "object" && item.properties && (
            <ChildObjectList object={item?.properties || {}} />
          )}
        </View>
      )}
      options={contentTypeOptions}
      selected={contentType}
      onChange={(val: any) => setContentType(val)}
    />
  ) : null;
};

export default PropertiesList;
