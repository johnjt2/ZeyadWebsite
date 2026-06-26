# Zeyad Website

One-page personal physiotherapy website for Zeyad Tharwat.

## Files

- `index.html` - main website page
- `assets/scss/` - editable SCSS source files
- `assets/css/main.css` - compiled CSS used by the page
- `assets/js/main.js` - navigation, theme toggle, workout PDF switching, package tabs, branch map tabs, counters
- `assets/pdfs/` - placeholder workout PDF files
- `assets/videos/` - add package videos here
- `assets/images/` - add local images here if you prefer local assets instead of remote placeholders

## Edit colors and fonts

Start with:

```scss
assets/scss/_variables.scss
```

Main variables:

```scss
--color-primary
--color-secondary-1
--color-secondary-2
--color-secondary-3
--color-text-main
--color-text-muted
--font-primary
--font-heading
```

## FormSubmit setup

The client information form currently uses:

```html
action="https://formsubmit.co/your-email@example.com"
```

Replace `your-email@example.com` with the email that should receive client submissions.

## Replace placeholder content

Search inside `index.html` for placeholder values like:

- `EGP 0`
- `your-email@example.com`
- `+20 000 000 0000`
- `@zeyadtharwat`
- `Branch 1` / `Branch 2`
- Google Maps iframe `src` values

## Replace branch maps

The Contact section has two branch buttons. Search for these placeholders in `index.html`:

```html
data-branch="branch-1"
data-branch="branch-2"
```

Replace the visible branch names, address text, and each iframe `src` with the real Google Maps embed links.

## Replace PDFs

Replace these files with the real workout PDFs:

- `assets/pdfs/workout-1.pdf`
- `assets/pdfs/workout-2.pdf`
- `assets/pdfs/workout-3.pdf`

## Replace videos

Add these files:

- `assets/videos/package-online-1.mp4`
- `assets/videos/package-online-2.mp4`
- `assets/videos/package-online-3.mp4`
- `assets/videos/package-offline-1.mp4`
- `assets/videos/package-offline-2.mp4`
- `assets/videos/package-offline-3.mp4`

## SCSS compiling

If you edit SCSS, compile it to `assets/css/main.css` using any SCSS compiler, for example:

```bash
sass assets/scss/main.scss assets/css/main.css
```
