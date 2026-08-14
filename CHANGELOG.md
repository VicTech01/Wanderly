# Changelog

## 1.2.0 — 2026-08-15
- Profile rows are now fully functional with animated bottom sheets:
  - Personal information (editable form + save toast)
  - Payment methods (Visa / Mastercard / M-PESA list, default badge)
  - Notifications (4 keyboard-accessible toggle switches)
  - Language & currency (single-select choice rows with check marks)
  - Log out (confirmation dialog)
- Bottom sheet closes via ✕, backdrop tap, Esc key or Cancel
- Focus management + `aria-modal` dialog semantics
- `prefers-reduced-motion` respected for sheet/switch animations

## 1.1.0 — 2026-08-14
- Switched demo identity to John Doe placeholder (johndoe@email.com), JD avatars
- Refreshed all screenshots

## 1.0.0 — 2026-08-14
- Initial release: 6 screens (Explore, Search, Detail, Booking, Trips, Profile)
- Live price calculation, steppers, wishlist toggles, trips tabs
- Light warm theme with coral accent, design token system
- Fixed flex-shrink layout bug on Explore sections
