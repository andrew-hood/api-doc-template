import axios from "axios";
import { get } from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { transformObject } from "./utils";

class HttpClient {
  private domain: string;
  private token: string;

  constructor(domain: string, token: string) {
    this.domain = domain;
    this.token = token;

    axios.defaults.baseURL = this.domain;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  sendRequest = async (
    path: string,
    operation: string,
    request: OpenAPIV3.OperationObject
  ) => {
    const params: any = {};
    Object.values(request.parameters || []).map((value: any) => {
      params[value.name] = (value as any).example || "";
    });

    const data: any = transformObject(request.requestBody || {});

    let response;
    switch (operation) {
      case "get":
        response = await axios.get(path, { params });
        break;
      case "put":
        response = await axios.put(path, data, { params });
        break;
      case "patch":
        response = await axios.patch(path, data, { params });
        break;
      case "post":
        response = await axios.post(path, data);
        break;
      case "delete":
        response = await axios.delete(path, { params });
        break;
    }

    return response?.data;
  };

  convertToCurl = (
    path: string,
    operation: string,
    request: OpenAPIV3.OperationObject
  ) => {
    const params: any = {};
    Object.values(request.parameters || []).map((value: any) => {
      params[value.name] = (value as any).example || "";
    });

    const data: any = request.requestBody
      ? transformObject(
          get(
            request.requestBody,
            `content.application/json.schema.properties`,
            {}
          )
        )
      : null;

    return [
      `curl -X ${operation.toUpperCase()} '${this.domain}${path}'`,
      '-H "content-type: application/json"',
      `-H "Authorization: Bearer ${this.token}"`,
      data ? `-d ${JSON.stringify(data, null, 2)}` : "",
    ].join(" \n");
  };
}

export default HttpClient;
