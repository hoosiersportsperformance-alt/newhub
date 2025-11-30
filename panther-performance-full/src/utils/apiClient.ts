export async function getOutputData() {
  const r = await fetch("/api/fetchOutputData");
  return r.json();
}
export async function getParkTudorEvents() {
  const r = await fetch("/api/fetchParkTudor");
  return r.json();
}
export async function getAIInsights(body: any) {
  const r = await fetch("/api/aiInsights", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return r.json();
}