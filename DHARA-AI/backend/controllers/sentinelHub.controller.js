
import { getSentinelHubToken } from "../services/sentinelHub.service.js";

export const testSentinelHubConnection = async (req, res) => {
  try {
    await getSentinelHubToken();

    return res.status(200).json({
      success: true,
      message: "Copernicus OAuth authentication successful.",
    });
  } catch (error) {
    console.error("Sentinel Hub authentication error:", error.message);

    return res.status(502).json({
      success: false,
      message: "Unable to authenticate with Copernicus Data Space.",
    });
  }
};
