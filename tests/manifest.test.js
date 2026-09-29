import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = join(import.meta.dirname, '..');
const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

test('manifest targets the DSH 0.2 runtime', () => {
  assert.equal(manifest.engines.node, '>=22.19');
  assert.equal(manifest.peerDependencies['@deepseek-ai/dsh'], '>=0.2.0-rc.1 <0.3.0');
  assert.equal(manifest.peerDependenciesMeta['@deepseek-ai/dsh'].optional, true);
  assert.equal(manifest.dsh.client.platform, 'web');
});
