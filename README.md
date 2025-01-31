# Git-based CMS

Exploring an idea around combining git-based content management, continuous deployments, and API functions.

## `.env` setup

Env template below. If you've already set up and deployed the project, it may be easiest to run `vercel env pull`.

```bash
# Use a Personal Access Token from GitHub
GITHUB_TOKEN=github-pat-abc-123
# Set an arbitrary password to validate edits via form submission
EDIT_PASSWORD=foobar
```
 
## Local Development

```bash
vercel dev
```

## Next steps

- Implement some basic edit protection. Maybe a password field in the form would be enough.
- Figure out how to redirect somehow after "/api/handle-form" submission
- Further thoughts in `public/change.html`
- Look more into form security, eg <https://austingil.com/how-to-build-html-forms-right-security/>

## Reference 

- GitHub REST API - https://docs.github.com/en/rest/git?apiVersion=2022-11-28
  - In particular - https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#create-or-update-file-contents
- Vercel Functions - https://vercel.com/docs/functions/quickstart
