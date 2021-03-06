import { Heading, Link, Prose, Text, View } from "@go1d/go1d";
import { OpenAPIV3 } from "openapi-types";
import { FC } from "react";
import RequestCard from "src/components/common/card/RequestCard";
import ResponseCard from "src/components/common/card/ResponseCard";
import ParameterList from "src/components/common/list/ParameterList";
import RequestBodyList from "src/components/common/list/RequestBodyList";
import ResponseBodyList from "src/components/common/list/ResponseBodyList";
import { AuthScopes } from "src/components/features/Auth";

interface Props {
  path: string;
  method: string;
  operation: OpenAPIV3.OperationObject;
}

const Endpoint: FC<Props> = ({ path, method, operation }) => {
  return (
    <View
      id={operation.operationId}
      flexDirection={["column", "row"]}
      alignItems="flex-start"
      justifyContent="space-between"
      borderColor="delicate"
      paddingY={8}
      marginY={8}
      borderTop={1}
    >
      <View flexBasis={["auto", 0.45]}>
        <Link href={`#${operation.operationId}`}>
          <Heading
            semanticElement="h3"
            visualHeadingLevel="Heading 3"
            color="default"
          >
            {operation.summary}
          </Heading>
        </Link>
        <Text marginTop={1} marginBottom={3}>
          <Prose fontSize={2} HTML={operation.description} />
        </Text>
        <AuthScopes security={operation.security || []} />
        <ParameterList parameters={operation.parameters || []} />
        <RequestBodyList requestBody={operation.requestBody || {}} />
        <ResponseBodyList responses={operation.responses || {}} />
      </View>
      <View
        flexBasis={["auto", 0.47]}
        position={["relative", "sticky"]}
        css={{ top: "80px" }}
        maxHeight="90vh"
      >
        <RequestCard path={path} method={method} operationObject={operation} />
        <ResponseCard responses={operation.responses} />
      </View>
    </View>
  );
};

export default Endpoint;
