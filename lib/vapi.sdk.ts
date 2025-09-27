import Vapi from "@vapi-ai/web";
import { validateVapiConfig } from "./vapi-validation";

let vapi: Vapi;

try {
  const { token } = validateVapiConfig();
  vapi = new Vapi(token);
} catch (error) {
  console.error('VAPI Configuration Error:', error);
  // Create a dummy instance to prevent import errors
  vapi = new Vapi('dummy-token');
}

export { vapi };