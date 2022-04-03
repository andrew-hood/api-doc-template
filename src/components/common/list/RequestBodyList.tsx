import { FC } from "react";
import PropertiesList from "./PropertiesList";

interface Props {
  requestBody: any;
}

const RequestBodyList: FC<Props> = ({ requestBody }) => {
  return <PropertiesList title="Request Object" object={requestBody} />;
};

export default RequestBodyList;
