import { OpenAPIV3 } from "openapi-types";
import { FC } from "react";
import PropertiesList from "./PropertiesList";

const STATUS_CODE_NAMES = {
  200: "OK",
  201: "Created",
  204: "Empty",
  400: "Bad Request",
  401: "Forbidden",
  403: "Unauthenticated",
  404: "Not Found",
  405: "Method Not Accepted",
  500: "Server Error",
};

interface Props {
  responses: OpenAPIV3.ResponsesObject;
}

const ResponseBodyList: FC<Props> = ({ responses }) => {
  return (
    <>
      {Object.entries(responses || {}).map(([key, value]) => {
        const title = `Response: ${key} ${
          (STATUS_CODE_NAMES as any)[key] || ""
        }`;
        return <PropertiesList key={key} title={title} object={value} />;
      })}
    </>
  );
};

export default ResponseBodyList;
