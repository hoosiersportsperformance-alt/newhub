import fetch from "node-fetch";

export const handler = async () => {
  try {
    const tokenRes = await fetch("https://api.outputsports.com/api/v1/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grantType: "password",
        email: process.env.OUTPUT_EMAIL,
        password: process.env.OUTPUT_PASSWORD
      })
    });

    if (!tokenRes.ok) throw new Error(await tokenRes.text());
    const { accessToken } = await tokenRes.json();
    if (!accessToken) throw new Error("No access token returned");

    const athletesRes = await fetch("https://api.outputsports.com/api/v1/athletes", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const athletes = await athletesRes.json();

    const start = new Date();
    const end = new Date();
    start.setDate(start.getDate() - 7);

    const measurementsRes = await fetch("https://api.outputsports.com/api/v1/exercises/measurements", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        exerciseMetadataIds: [],
        athleteIds: athletes.map(a => a.id)
      })
    });

    const measurements = await measurementsRes.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ athletes, measurements })
    };
  } catch (err) {
    console.error("Output API Error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
