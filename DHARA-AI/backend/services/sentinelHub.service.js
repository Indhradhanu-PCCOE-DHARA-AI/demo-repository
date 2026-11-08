
const TOKEN_URL =
  "https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token";
  const PROCESS_API_URL =
  "https://sh.dataspace.copernicus.eu/api/v1/process";

let cachedToken = null;
let tokenExpiresAt = 0;

export async function getSentinelHubToken() {
  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) {
    return cachedToken;
  }

  const clientId = process.env.COPERNICUS_CLIENT_ID;
  const clientSecret = process.env.COPERNICUS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Copernicus OAuth credentials are missing from backend .env"
    );
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    console.error("Copernicus token request failed:", response.status);

    throw new Error(
      "Unable to authenticate with Copernicus Data Space."
    );
  }

  cachedToken = data.access_token;
  tokenExpiresAt =
    Date.now() + (Number(data.expires_in) || 3600) * 1000;

  return cachedToken;
}
