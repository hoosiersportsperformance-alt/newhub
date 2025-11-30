import fetch from "node-fetch";
import * as cheerio from "cheerio";

export const handler = async () => {
  try {
    const url = process.env.PT_CALENDAR_URL;
    const html = await fetch(url).then(r => r.text());
    const $ = cheerio.load(html);
    const events = [];

    $(".schedule-event, .event-row, .event").each((_, el) => {
      const date = $(el).find(".date, .event-date").text().trim();
      const time = $(el).find(".time, .event-time").text().trim();
      const sport = $(el).find(".sport, .event-sport").text().trim();
      const opponent = $(el).find(".opponent, .event-opponent").text().trim();
      const location = $(el).find(".location, .event-location").text().trim();
      if (date && sport) events.push({ date, time, sport, opponent, location });
    });

    return { statusCode: 200, body: JSON.stringify({ events }) };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: JSON.stringify({ error: "Calendar fetch failed" }) };
  }
};
