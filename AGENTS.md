<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep Green Renewals as one English-language home page with anchored sections; the supplied copy targets South Florida homeowners and does not require separate content routes.
- Use direct phone and map actions for contact rather than a nonfunctional lead form; no submission destination was supplied.
- Uploaded media (logo, photos, video) is served through Lovable CDN asset pointers at `src/assets/*.asset.json`, imported and read as `.url`; keep raw upload bytes out of the repo so the bundle stays small.
- The company video is a click-to-play card in a small `aspect-video` frame, never a hero or background loop; the served copy is 720p H.264 remuxed with `-movflags +faststart` so the browser can start playback without downloading the whole file.
- Headless test Chromium in this sandbox cannot decode H.264 (`canPlayType` returns empty), so verify video playback visually with a short WebM/VP8 proxy clip and otherwise rely on the network response plus the element's `src`.
- Use IBM Plex Sans for both headings and body text; its understated institutional tone keeps the established page layout intact.
- Keep a persistent mobile call action and use a Google Maps directions URL with the office as the destination so contact remains usable from anywhere on the page.
- Instagram is green_renewals; Facebook is the business page at facebook.com/profile.php?id=61594797155664 (provided by the business, so never fall back to a page search).
