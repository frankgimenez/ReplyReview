// Generic n8n Code-node patterns (illustrative, not production code).

// ── Pattern 1: flatten nested arrays into one n8n item per element ────────────
// Mode: "Run Once for All Items". Input items each carry a nested `reviews` array.
const out = [];
for (const item of items) {
  const reviews = Array.isArray(item.json.reviews) ? item.json.reviews : [];
  for (const r of reviews) {
    out.push({ json: { ownerId: item.json.ownerId, appId: item.json.appId, ...r } });
  }
}
return out;   // returning [] ends the workflow cleanly when there is nothing to do

// ── Pattern 2: recover context after an HTTP node (paired items) ──────────────
// Mode: "Run Once for Each Item". The HTTP response replaces the item, so the
// original fields are fetched from an earlier node and merged with the result.
//
//   const previous = $('Expand Reviews').item.json || {};
//   return { json: { ...previous, generated: $json.result || '' } };

// ── Pattern 3: build request bodies from untrusted text safely ────────────────
// Free text (quotes, line breaks, emoji) is serialised with JSON.stringify so it
// cannot break the JSON body of an HTTP Request node:
//
//   { "text": {{ JSON.stringify($json.text) }}, "rating": {{ $json.score }} }
