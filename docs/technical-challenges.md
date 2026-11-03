# Technical Challenges

## 1. Two incompatible review sources

**Challenge.** The official Google Play API returns reviews that can be answered but covers a limited history. Public pages cover more history but with unrelated identifiers, so their reviews cannot be answered and would duplicate the official ones.

**Solution.** The API queries both, maps them to one schema, flags which items can be answered and removes duplicates using a business key. Each source is isolated so a failure in one does not break the other.

**Outcome.** Dashboard and automations see one consistent list, and replies are only offered where they are valid.

## 2. Automating replies without losing control

**Challenge.** Posting replies automatically on a customer's behalf is high-impact: a wrong reply is public.

**Solution.** Layered safeguards: ownership verification, per-app opt-in, usage limits, a test mode that exercises the whole pipeline without publishing, service-to-service authentication and an activity report. All rules live in the API, so no workflow can bypass them.

**Outcome.** The same workflow can be validated end-to-end safely, and enabling automation for a customer is a configuration change.

## 3. One execution for many customers

**Challenge.** One workflow per customer does not scale, and one e-mail per app would flood users who own several apps.

**Solution.** Multi-tenant workflows driven by configuration data: fan-out per app for API calls and fan-in per recipient to build a single message.

**Outcome.** Onboarding requires no workflow edits, and each user receives one e-mail per day.

## 4. Multilingual analysis without an NLP service

**Challenge.** Reviews arrive in many languages, with accents, emoji and slang.

**Solution.** Consistent text normalisation, multilingual dictionaries and patterns, the star rating as tie-breaker, and the reviewer's device language for replies. Deterministic preprocessing in JavaScript runs before any AI model.

**Outcome.** Explainable alerts inside an n8n Code node, and smaller, cheaper and more reliable AI prompts.

## 5. Safe handling of untrusted text

**Challenge.** Review text contains quotes, line breaks and emoji. Injecting it into a request body or an HTML e-mail can break the request or open an injection path.

**Solution.** Structured serialisation of free text in every request body and escaping of third-party text in generated HTML.

**Outcome.** Arbitrary reviews, including emoji-only ones, pass through the pipeline safely.
