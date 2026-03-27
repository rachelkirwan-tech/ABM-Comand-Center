# Output specs - Influ2 ads

Formatting rules, character limits, field requirements, and copy tone for all Influ2 display, social, and native ad outputs. The app reads this file on every Influ2 generation run. Do not edit without updating the app prompt schema.

---

## 01 Pre-generation extraction - required before writing

Before writing a single word of copy, extract these four things from the source material. The app runs this extraction step first. All ad outputs derive from what is identified here.

**Step 1 - Strongest insight or stat**
One sentence. The single most compelling data point or finding from the source material.

**Step 2 - Buyer pain point**
One sentence. The operational or strategic problem this insight hits directly.

**Step 3 - Industry**
Retail, M&E, FSI, or Tech. Pulled from the industry folder selected in the app.

**Step 4 - Persona**
CX Director, IT leader, or ops exec. Determines tone and framing for all outputs.

---

## 02 Output format rule - applies to every ad

Each element on its own line with a line break between them. Never run together. Headline, Body, and CTA are never in the same paragraph. Each label gets its own line. This is a hard formatting rule for the app output.

Correct format example:

```
Headline: Your fans won't wait.

Body: 51% resolved automatically. Zero new hires.

CTA: Read Now
```

---

## 02b Copy length philosophy - limits are ceilings, not targets

Write the best line. Stop. Do not fill the limit just because it exists.

Character limits define the maximum allowed. They do not define the goal. The right length is whatever serves the message. A 4-word headline that stops the scroll beats a 7-word headline padded to hit the spec. A 60-char body that lands a stat beats 90 chars of explanation nobody reads.

**The test: does every word earn its place?**

Before submitting any element, read it and ask: does removing a word make it worse? If not, remove it. This applies to headlines, body copy, and CTAs equally. Zendesk brand rule: if you run out of breath reading a sentence, it is too long.

**What research shows on length:** Optmyzr analysis of 1M+ ads found shorter headlines consistently outperform longer ones on CTR. B2B display CTR benchmarks run at 0.46% on average, every wasted word erodes that. Source: Optmyzr / Firebrand B2B Benchmarks 2024.

**What Influ2 context adds:** Influ2 targets named individuals, not broad audiences. The person seeing this ad already fits the ICP. The job is not to explain, it is to agitate and provoke. Shorter, sharper copy outperforms in high-specificity environments. Source: Influ2 platform documentation.

**The persona read test - run this before finalizing:** Would a CX Director, IT leader, or ops exec stop scrolling for this? If the answer relies on context, background, or explanation, the copy is not done. Influ2 serves one impression at a time to one named buyer. The copy must land without setup.

---

## 03 Display ad specs

| Size | Fields | Required | Constraints |
|------|--------|----------|-------------|
| 300x250 | Headline / Body / CTA | Yes | Headline: 5-7 words max, one idea, works alone. Body: 10-15 words max, one stat or tension point only. CTA: 2-3 words. |
| 728x90 | Headline / CTA | Yes | Headline only. No body copy. CTA: 2-3 words. |
| 160x600 | Headline / Body / CTA | No | Same constraints as 300x250. |
| 300x600 | Headline / Body / CTA | No | Same constraints as 300x250. |
| 320x50 | Headline / CTA | No | Mobile. Headline + CTA only. No body copy. Same format as 728x90. Short, punchy headline. |
| 970x250 | Headline / Body / CTA | No | Same constraints as 300x250. |

**2 versions per output:** Version A and Version B must be meaningfully different. Not a light rewrite. Version A and Version B should take different angles: different stat, different tension point, or different persona framing. If both versions could be swapped without anyone noticing, one of them is wrong. Generate Version A first, then Version B as a distinct creative direction.

**Headline rule - applies to all display sizes:** 5-7 words max. One idea only. Must work as a standalone statement without the body copy. If it needs the body to make sense, rewrite it.

---

## 04 Social ad - LinkedIn sponsored

Strict character limits. Text is cut off in feed if over limit. These are LinkedIn's hard cutoffs, not guidelines.

| Field | Char limit | Notes |
|-------|-----------|-------|
| Introductory text | 80 chars max | Body copy above the image. One stat or tension point. Never run into the headline. |
| Headline | 70 chars max | Appears below the image. Different from the display ad headline. Can be slightly longer. |
| CTA button | LinkedIn presets only | Use only: Learn More / Download / Read More / Sign Up. No custom text. |

---

## 05 Native ad

| Field | Char limit | Notes |
|-------|-----------|-------|
| Headline | 60 chars max | Short. Punchy. Works as a standalone. |
| Body | 90 chars max | One idea. One stat or pain point. Never two sentences if you can use one. |

---

## 06 CTA button options - pick by asset type

**Report / Guide:** Download Now, Get the Guide

**Blog / Article:** Read Now, Learn More

**Webinar / Video:** Watch Now

**General:** See More

**LinkedIn only:** Learn More, Download, Read More, Sign Up

**Max length rule:** 3 words max for display. LinkedIn uses presets only. No custom CTA text on LinkedIn.

---

## 07 Voice and tone - Influ2 + Zendesk brand rules

**Influ2 copy standard:** B2B but not boring. Provocative enough to stop the scroll, credible enough to earn the click. Exec-level, not feature-level. Short sentences win. Cheeky but not cringe. Bold but not vague.

**Keep it brief:** Concise copy respects the reader's time and holds attention. If you run out of breath reading a sentence, it is too long. Cut the excess. One idea per element, always.

**Active voice only:** "Zendesk AI handles support requests efficiently." Not "Support requests are handled by Zendesk AI." Active voice is direct, confident, and takes responsibility.

**Stay on message:** Strong statements drive conversions. Clear, confident messaging reinforces authority. No hedging. No qualifiers. If you are not sure you can say it, say something stronger.

**Think globally:** Write for a global audience. Avoid idioms, regional slang, or cultural references that do not translate. Inclusive language broadens reach. No unnecessary gender references.

**Influ2-specific copy rules:**

- Challenge the status quo, not the reader
- Use tension: what they are doing vs. what they should be doing
- Stats should agitate, not just inform
- Frame data as "Zendesk data shows" or "Zendesk [industry] data shows", never "our customers report"
- Exec-level framing. Speak to strategy and margin, not features
- Use "you" or "we" to speak directly to the reader. Builds connection.

**Zendesk mechanics - hard rules:**

- Sentence case always. First letter of phrase only. Never title case for headlines or subject lines.
- AP Style. Always use the Oxford (serial) comma. No period at end of a headline.
- No ampersands unless they are part of a brand name.
- Numerals are acceptable as a design element. Use figures for stats.
- Zendesk is an adjective, not a verb or noun. "Zendesk products" not "Zendesk's products." No possessive on the trademark.
- Do not add "Zen" to names. No invented portmanteaus.
- Localize spellings based on region when applicable (e.g., localise for UK).

---

## 08 Never use - banned words and patterns

- empower, leverage, seamless, unlock, transform - banned words, no exceptions
- Em dashes. Use commas, periods, or plain dashes instead
- Hedging language. If it sounds unsure, cut it
- "Our customers report" - always "Zendesk data shows" or "Zendesk [industry] data shows"
- Vague benefit statements. Every claim needs grounding in tension, metric, or outcome
- Headline and body running in the same paragraph. Always separate lines.
- Title case for headlines or subject lines. Sentence case only.
- Period at the end of a headline
- Jargon, business cliches, or acronyms unless more common than the full term
- Possessives on Zendesk. "Zendesk products" not "Zendesk's products"
- Ampersands unless part of a brand name

---

## 09 Flags - required in every output

Stats needing source confirmation before publishing. Every generation run must end with a flags section listing any stats or claims that need source verification before the ad goes live. This is a required output field, not optional. If no flags, write "None - all claims sourced from provided materials."

---

## 10 Full output structure - app must return in this order

Every Influ2 generation run returns these sections in order. The app output is not complete if any section is missing.

| # | Section | Contents |
|---|---------|----------|
| 1 | Core extraction | Strongest insight, buyer pain, industry, persona - one sentence each |
| 2 | Display ads | 6 sizes (300x250, 728x90, 160x600, 300x600, 320x50, 970x250). 300x250 and 728x90 required. Each size returns Version A then Version B. Versions must take different creative angles. |
| 3 | Social ad | LinkedIn sponsored: Version A and Version B. Each has introductory text (80 chars max), headline, CTA button. Different angle per version. |
| 4 | Native ad | Version A and Version B. Headline and body only. Different stat or tension point per version. |
| 5 | Flags | Stats needing source confirmation. Required field even if empty. |
