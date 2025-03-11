export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwLtDZcDqu-Es2x4nuTTVIwKIVgjCV2d8Am02pgTuGEEIo_C4qw20ZhYk5M4-RcyZYX/exec";

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: event.body,
    });

    const data = await response.text();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success", response: data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
