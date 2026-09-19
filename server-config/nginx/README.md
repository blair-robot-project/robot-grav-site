# nginx config for robot.mbhs.edu

## These are copies. nginx does not read them.

Editing a file in this folder changes **nothing** on the server. nginx reads only the
files under `/etc/nginx/` on the droplet. These copies exist so the config is
versioned, reviewable, and restorable — not so it can be edited here.

| File in this folder | The live file it copies |
|---|---|
| `robot.mbhs.edu.conf` | `/etc/nginx/sites-available/grav` (symlinked into `sites-enabled/`) |
| `99-security.conf` | `/etc/nginx/conf.d/99-security.conf` |

**The names deliberately differ.** The live vhost is called `grav`, which says nothing
about which site it serves; the copy is named for its domain so it is obvious at a
glance. Keep the mapping above in mind whenever you copy in either direction.

The copies are kept **byte-identical** to the live files. Do not add header comments
or reformat them — a single added line makes the drift check below report a false
difference, and then nobody trusts it.

## Why this folder exists

Everything else about this site is backed up or versioned. This config was neither.
It lives outside `user/`, so Grav's nightly backup does not include it, and until
2026-09-19 no copy existed in any repo.

That mattered. The config is a hand-made copy of the deny list Grav ships at
`webserver-configs/nginx.conf`, and Grav can never update an nginx config the way it
rewrites `.htaccess` for Apache sites. So it drifts silently. On 2026-09-19 three
separate gaps surfaced at once — the oldest a `json` transcription error dating to the
file's creation in February 2022. Reconstructing when that mistake was made required
digging through `/etc/nginx/sites-available/grav.bak-*` files and a retired `.git`
directory that happened to have survived. Both were luck. This folder replaces the luck.

See the CHANGELOG entries for 2026-09-19 and the "blocklist drifts" section of
[RUNBOOK.md](../../RUNBOOK.md) for the full story.

## Check whether live has drifted from this repo

```bash
ssh 449-live 'cat /etc/nginx/sites-available/grav' | diff -u server-config/nginx/robot.mbhs.edu.conf - \
  && ssh 449-live 'cat /etc/nginx/conf.d/99-security.conf' | diff -u server-config/nginx/99-security.conf - \
  && echo "IN SYNC"
```

No output before `IN SYNC` means they match. Any diff means someone changed the server
without updating this repo (or vice versa) — read the diff before assuming which side
is right. An undocumented live edit on 2026-07-30 is exactly the case this catches.

## Also worth diffing: this config against the one Grav ships

```bash
ssh 449-live 'diff -u /etc/nginx/sites-available/grav /srv/robot-grav-site/webserver-configs/nginx.conf'
```

Differences here are **expected** — we add hardening Grav does not ship, and we keep a
stricter `user/accounts` rule than Grav's current sample (Grav added an avatar carve-out
that would loosen ours). The point is not to make them identical. It is to notice when
Grav has learned something our copy has not, which is how `tmp/` went unblocked for two
releases.

## Push a change from this repo to the server

Edit the copy here, commit it, then:

```bash
scp server-config/nginx/robot.mbhs.edu.conf 449-live:~/robot.mbhs.edu.conf
```

```bash
ssh -t 449-live 'sudo cp /etc/nginx/sites-available/grav /etc/nginx/sites-available/grav.bak-$(date +%Y%m%d-%H%M%S) && sudo install -m 644 -o root -g root ~/robot.mbhs.edu.conf /etc/nginx/sites-available/grav && sudo nginx -t && sudo systemctl reload nginx'
```

`nginx -t` gates the reload: if the config is invalid the reload never runs and nginx
keeps serving the config it already has, so the site stays up. To roll back, copy the
`.bak-*` file the first command made back over `grav` and reload again.

**Keep making those `.bak-*` copies.** They were the only history this file had for four
years, and they are still the only record of *when* a change happened on the server
rather than in git.

## Permissions

Changing anything under `/etc/nginx/` needs `sudo`; `brad` has it (with a password
prompt), but there is no passwordless sudo, so this cannot be automated from a script
that runs unattended. Note also that being in the `editor` group is **not** enough to
write inside the webroot — an ACL mask leaves directories non-writable to the group, so
webroot work needs `sudo` too, while Grav page and config edits routed through the `api`
plugin do not.

## What guards this

`.github/workflows/private-files-check.yml` runs daily and fails if anything that should
be private becomes downloadable. It tests the server's actual behaviour from outside,
with no credentials, so it catches a bad edit to this config regardless of whether anyone
remembered to update this folder. It does **not** compare this folder against the server
— that needs SSH access from CI, which is a separate decision. Until that exists, the
drift check above is run by a person.
