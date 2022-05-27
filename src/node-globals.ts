import { Blob as NodeBlob, File as NodeFile } from "@web-std/file";

import { btoa, atob } from "./base64";
import { Headers as NodeHeaders, Request as NodeRequest, Response as NodeResponse, fetch as nodeFetch } from "./fetch";
import { FormData as NodeFormData } from "./node-form-data";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
    }

    interface Global {
      atob: typeof atob;
      btoa: typeof btoa;

      Blob: typeof NodeBlob;
      File: typeof NodeFile;

      Headers: typeof NodeHeaders;
      Request: typeof NodeRequest;
      Response: typeof NodeResponse;
      fetch: typeof nodeFetch;
      FormData: typeof NodeFormData;
    }
  }
}

export function installGlobals() {
  global.atob = atob;
  global.btoa = btoa;

  global.Blob = NodeBlob as unknown as typeof Blob;
  global.File = NodeFile as unknown as typeof File;

  global.Headers = NodeHeaders as unknown as typeof Headers;
  global.Request = NodeRequest as unknown as typeof Request;
  global.Response = NodeResponse as unknown as typeof Response;
  global.fetch = nodeFetch as unknown as typeof fetch;
  global.FormData = NodeFormData as unknown as typeof FormData;
}
