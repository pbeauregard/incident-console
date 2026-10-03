# Accessibility Audit

## Passed checks

- Tab navigation reached the Type, Status, and View selects before the visible incident-detail controls in a logical DOM order.
- Every tested button and select showed the yellow `:focus-visible` outline.
- The keyboard-only workflow successfully filtered incidents, switched to Cards, opened an incident, closed details, and acknowledged an active incident.
- Opening incident details moves focus to its heading; closing details returns focus to the incident control that opened it.
- The results table, incident cards, details panel, result count, active count, and loading state expose accessible names or announcements.
- At high browser zoom and a narrow window, controls remained visible and readable.
- The incident table used its own horizontal scroll container rather than causing unexpected page-level horizontal scrolling.

## Component semantics

- Filter controls retain visible labels and keyboard focus styling.
- Incident status is written as text and is not conveyed by color alone.
- Details and results regions are named by their headings, and changing counts use polite live announcements.
- Each card is named by its incident title, and its action names the incident it opens.
