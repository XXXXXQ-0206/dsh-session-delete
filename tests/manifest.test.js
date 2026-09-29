import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = join(import.meta.dirname, '..');
const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const hostManifest = JSON.parse(readFileSync(join(root, 'packages/session-trash-host/package.json'), 'utf8'));

test('manifest targets the DSH 0.2 runtime', () => {
  assert.equal(manifest.engines.node, '>=22.19');
  assert.equal(manifest.peerDependencies['@deepseek-ai/dsh'], '>=0.2.0-rc.1 <0.3.0');
  assert.equal(manifest.peerDependenciesMeta['@deepseek-ai/dsh'].optional, true);
  assert.equal(manifest.dsh.client.platform, 'web');
  assert.equal(hostManifest.peerDependencies['@deepseek-ai/cordis'], '~4.0.4');
  for (const name of [
    '@deepseek-ai/dsh-session',
    '@deepseek-ai/dsh-session-persistence',
    '@deepseek-ai/dsh-session-persistence-jsonl',
    '@deepseek-ai/dsh-session-projection-cache',
    '@deepseek-ai/dsh-workspace',
    '@deepseek-ai/dsh-storage-domain',
  ]) {
    assert.equal(hostManifest.peerDependencies[name], '>=0.2.0-rc.1 <0.3.0');
  }
});
