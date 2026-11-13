# Search Console daily export: one-time setup

The workflow `.github/workflows/gsc-daily.yml` runs every day, reads Search Console and saves `docs/gsc/latest.csv` and `docs/gsc/report.md`.
It needs a Google service account. The key goes only into GitHub Secrets, never into the repo.

1. Google Cloud Console (console.cloud.google.com): create a project, then APIs and Services, Library, enable **Google Search Console API**.
2. IAM and Admin, Service Accounts, Create service account (any name). Open it, Keys, Add key, Create new key, **JSON**. A file downloads.
3. Copy the service account's email (it ends in `iam.gserviceaccount.com`).
4. Search Console (search.google.com/search-console), your property, Settings, Users and permissions, Add user, paste that email, permission **Restricted**.
5. GitHub repo, Settings, Secrets and variables, Actions, New repository secret:
   - `GSC_SERVICE_ACCOUNT_JSON`: paste the whole contents of the downloaded JSON file.
   - `GSC_SITE_URL`: the property exactly as Search Console shows it, for example `sc-domain:gulfelitetransportgroup.com` (Domain property) or `https://gulfelitetransportgroup.com/` (URL prefix, keep the trailing slash).
6. Actions tab, Search Console daily export, Run workflow once to test. Then delete the downloaded JSON file from your computer.

Search Console data runs about 3 days behind, so the newest day in the report is 3 days old.
