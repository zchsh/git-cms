# Git-based CMS

Exploring an idea around combining git-based content management, continuous deployments, and API functions.

## `.env` setup

Env template below. If you've already set up and deployed the project, it may be easiest to run `vercel env pull`.

```bash
# Use a Personal Access Token from GitHub
GITHUB_TOKEN=github-pat-abc-123
# Set an arbitrary password to validate edits via form submission
EDIT_PASSWORD=foobar
# Use a token from Vercel, see https://vercel.com/docs/rest-api#authentication
VERCEL_API_TOKEN=
# Grab this from the Vercel deployment
VERCEL_PROJECT_ID=
```
 
## Local Development

```bash
vercel dev
```

## Next steps

- [x] Implement some basic edit protection. Maybe a password field in the form would be enough.
- [x] Figure out how to redirect somehow after "/api/handle-form" submission
  - Found a simple way, returning an HTML doc with Javascript that then executes the redirect
  - Later, could have the redirect happen once the build is complete according to Vercel
- [ ] Look into image upload methods
  - Images are a key part of any website
  - For this use case, seems logical to have them committed to version control
  - Maybe there's a separate `/uploads` path for this or something...
  - Maybe uploading assets does _not_ trigger a continuous deployment... so that you can upload a bunch of assets at once, without triggering a bunch of builds... and then _manually_ trigger a re-build so that your uploaded assets show up.
  - This could evolve a little into a kind of "digital asset manager" via a GitHub repo.
    - Display a grid of assets that are already present in the deployed version of the site (ie Vercel CDN). Click to copy image URL.
    - Display an area to upload new assets. Multiple assets can be uploaded at once, will make a bunch of commits.
    - In "already present" assets area, show button to "Rebuild site". Also show build status. Maybe there's a way to say "x changes since last build", indicating how many commits there've been on `main` since the last time the site was rebuilt. This would be a rough proxy for the number of new assets that will show up when you rebuild.
    - No folders, no organization method. But there should be the option to delete assets. (Ideally there's some warning if the asset is used in any content files... heck maybe even prevent deletion if the URL is referenced elsewhere in the repo code).
- [ ] Figure out how to poll Vercel for build status (prior art in `eats-plants` repo)
- [ ] Display status from Vercel
- [ ] Switch to a `<textarea>` to edit JSON file contents (for now, later will want auto-generated forms)
- [ ] Use inline script tags to pre-populate values somehow
  - I feel like I want some kind of templating language here...
  - But a templating language that can run in the browser, too. So the "edit" pages can show an edit form alongside a live preview of the website.
  - Maybe the right time to switch to NextJS or something. New repo for that, probably.
  - Or, maybe the right time to look into simple HTML templating languages.
- [ ] Further thoughts in `public/change.html`
- [ ] Look more into form security, eg <https://austingil.com/how-to-build-html-forms-right-security/>

## Reference 

- GitHub REST API - https://docs.github.com/en/rest/git?apiVersion=2022-11-28
  - In particular - https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#create-or-update-file-contents
- Vercel Functions - https://vercel.com/docs/functions/quickstart
