export async function handler(event) {

try {

const { instruction } = JSON.parse(event.body);

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{
role: "system",
content: `You are an expert proposal writer in Papua New Guinea.

Write a COMPLETE, detailed, professional and sellable proposal.

Return ONLY valid JSON:
{
"projectDetails": "...",
"scope": "...",
"timeline": "...",
"terms": "...",
"additionalNotes": "..."
}

Make it realistic, specific, and convincing.`
},
{
role: "user",
content: instruction
}
],
temperature: 0.7
})
});

const data = await response.json();

const text = data.choices[0].message.content;

return {
statusCode: 200,
headers: { "Access-Control-Allow-Origin": "*" },
body: JSON.stringify({ proposal: JSON.parse(text) })
};

} catch (err) {

return {
statusCode: 500,
headers: { "Access-Control-Allow-Origin": "*" },
body: JSON.stringify({ error: err.message })
};

}
}
