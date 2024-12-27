import * as dotenv from "dotenv";

dotenv.config({ override: true });

function requireEnvVariable(envVariableName: string): string {
  const envVariableValue = process.env[envVariableName];
  if (envVariableValue === undefined) {
    throw new Error(`Environment variable ${envVariableName} is not set.`);
  }
  return envVariableValue;
}

// eslint-disable-next-line import/prefer-default-export
export const BASE_URL = requireEnvVariable("BASE_URL");
