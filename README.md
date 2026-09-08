# dsh-session-delete

**Session recycle bin and permanent delete for DeepSeek Harness.**

`dsh-session-delete` adds a safe, recoverable deletion workflow to DeepSeek Harness. Move a session into the recycle bin from its sidebar action menu, manage archived sessions in Settings, restore them with one click, or permanently remove them in batches. Active agents and live sessions are protected by default.

## Highlights

- **Sidebar action**  
  The **Delete** item joins the native session action menu next to Rename, Fork, and Archive.

- **Header action**  
  The active session can be moved into the recycle bin from the conversation header.

- **Recycle bin manager**  
  Settings → **会话回收站** provides search, workspace grouping, multi-select, batch restore, and batch permanent delete.

- **Permanent delete**  
  Removes both the durable session log and projection-cache records, including ghost sessions without a log.

- **Active-session protection**  
  Refuses to delete sessions that are running or otherwise in use.

- **Recovery path**  
  Every archive action is recoverable and shows a bottom-right undo toast.

- **Native-looking dark/light UI**  
  Uses DSH design tokens and adapts to `body[data-ds-dark-theme]` with an OS-level fallback.

## Why this workflow?

Deleting a Harness session is not merely removing a row. The session has durable event logs, projection cache, workspace membership, and potential in-progress work. `dsh-session-delete` treats deletion as a two-stage operation:

```text
active session -> archive (recoverable) -> restore / permanent delete
```

This keeps the fast path simple while making irreversible deletion deliberate.

## Install

Install the latest release tarball:

```sh
dsh plugin --profile web add https://github.com/XXXXXQ-0206/dsh-session-delete/releases/download/v0.5.2/dsh-session-delete-0.5.2.tgz
```

Or use a pinned Git tag:

```sh
dsh plugin --profile web add github:XXXXXQ-0206/dsh-session-delete#v0.5.2
```

Restart `dsh web` after installation.

Update or remove:

```sh
dsh plugin --profile web update dsh-session-delete
dsh plugin --profile web remove dsh-session-delete
```

## Usage

### Delete a session

1. Hover a session row in the sidebar.
2. Open the session action menu.
3. Select **删除**.
4. The session moves into the recycle bin and an undo toast appears.

### Restore or permanently delete

1. Open **Settings → 会话回收站**.
2. Select one or more archived sessions.
3. Choose **还原** or **彻底删除**.
4. Live sessions are protected automatically.

## Architecture

The bundle has a host half and a browser half:

```text
index.js                    Host entry: lifecycle, workspace/archive integration
client.js                   Browser half: sidebar action, recycle-bin UI, toasts
client.css                  DSH-native design tokens and components
cordis.patch.yml            Web Profile bundle patch
packages/session-trash-host Host implementation and HTTP routes
```

The browser talks to the host through the plugin-owned `/api/session-trash/*` routes. Non-GET requests carry the `x-dsh-plugin` header for CSRF protection. Host operations are idempotent, work per-session, and collect failures for batch operations.

## Development

```sh
pnpm test
```

The test suite covers host logic, archive/purge behavior, and HTTP route contracts.

## License

MIT
