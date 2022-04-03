import { Text, View } from "@go1d/go1d";
import { get } from "lodash";
import React, { FC, useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { transformObject } from "src/services/utils";
import ButtonGroup from "../button/ButtonGroup";
import DetailsCard from "./DetailsCard";

interface Props {
  responses: any;
}

const ResponseCard: FC<Props> = ({ responses }) => {
  const [statusCode, setStatusCode] = useState(Object.keys(responses)[0]);
  const [payload, setPayload] = useState({});

  useEffect(() => {
    setPayload(
      transformObject(
        get(
          responses,
          `${statusCode}.content.application/json.schema.properties`,
          {}
        )
      )
    );
  }, [responses, statusCode]);

  return (
    <DetailsCard
      title="RESPONSE"
      actions={
        <ButtonGroup
          items={responses}
          selected={statusCode}
          onSelect={setStatusCode}
          itemRenderer={(key) => key}
        />
      }
      content={
        responses && (
          <View
            css={{
              "& > pre": {
                background: "transparent !important",
                fontFamily: "monospace",
                fontSize: "16px",
              },
            }}
          >
            <Text fontSize={1} fontWeight="semibold" paddingBottom={3}>
              {get(responses, `${statusCode}.description`, "")}
            </Text>
            <SyntaxHighlighter language="json">
              {JSON.stringify(payload, null, 2)}
            </SyntaxHighlighter>
          </View>
        )
      }
    />
  );
};

export default ResponseCard;
