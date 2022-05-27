export type ApiConfig = {

  /**
   * A suffix which is attached to url on the client /api/<name>
   * Used by proxy to know to which API requests should be proxied
   */
  name: string

  /**
   * Full API path. It could be found in OpenApi specification under `servers` field
   */
  server: URL
}

export type LocalURL = `http${"s" | ""}://${string}`

export type ApiConfigPerEnv = {
  name: string
  servers: Record<
    keyof typeof NodeJS.Environment,
    (localBaseOverride?: LocalURL) => URL
  >
}

export const colleagueInboxApiConfig: ApiConfigPerEnv = {
  name: "colleague-inbox",
  servers: {
    local: (localBaseOverride: LocalURL = "http://localhost:7100/mocks") =>
      new URL(`${localBaseOverride}/colleague-inbox`),
    dev: () => new URL("https://api-ppe.tesco.com/colleague/v1/inbox"),
    ppe: () => new URL("https://api-ppe.tesco.com/colleague/v1/inbox"),
    prod: () => new URL("https://api.tesco.com/colleague/v1/inbox"),
  },
}

export const getColleagueInboxApiConfig = (
  env: keyof typeof NodeJS.Environment,
  localBaseOverride?: LocalURL,
): ApiConfig => {
  return getApiConfigForEnv(env, colleagueInboxApiConfig, localBaseOverride);
}

const getApiConfigForEnv = (
  env: keyof typeof NodeJS.Environment,
  apiConfigPerEnv: ApiConfigPerEnv,
  localBaseOverride?: LocalURL,
): ApiConfig => {
  return {
    name: apiConfigPerEnv.name,
    server: apiConfigPerEnv.servers[env](localBaseOverride),
  }
}
