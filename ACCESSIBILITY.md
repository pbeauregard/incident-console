# Accessibility Audit

## Passed checks

- Tab navigation reached the Type, Status, and View selects before the visible incident-detail controls in a logical DOM order.
- Every tested button and select showed the yellow `:focus-visible` outline.
- The keyboard-only workflow successfully filtered incidents, switched to Cards, opened an incident, closed details, and acknowledged an active incident.
- At high browser zoom and a narrow window, controls remained visible and readable.
- The incident table used its own horizontal scroll container rather than causing unexpected page-level horizontal scrolling.

## Problems found

- Opening the details panel does not move keyboard focus into the newly revealed panel. A keyboard user can continue from the control that opened it, but may not immediately know that new detail content appeared.

## Next improvement

Prioritize focus management for the details panel: move focus to its heading or Close details button when an incident is selected, then restore focus to the triggering incident control when the panel closes.
