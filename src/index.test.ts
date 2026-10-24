// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab

import test from 'node:test';
import assert from 'node:assert/strict';
import * as z from 'zod';
import { LayeredRegistry, dsbunnyRegistry } from './index.js';

test('register does not pollute the global registry', () => {
	const schema = z.object({ a: z.string().describe('desc') })
		.register(dsbunnyRegistry, { id: 'ZodRegistryTestA' });
	assert.equal(z.globalRegistry._idmap.has('ZodRegistryTestA'), false);
	assert.equal(dsbunnyRegistry.get(schema)?.id, 'ZodRegistryTestA');
});

test('lookups fall back to global and parent metadata', () => {
	const schema = z.string().describe('hello');
	const child = new LayeredRegistry(dsbunnyRegistry);
	assert.equal(child.get(schema)?.description, 'hello');
	const other = z.number().register(dsbunnyRegistry, { id: 'ZodRegistryTestB' });
	assert.equal(child.get(other)?.id, 'ZodRegistryTestB');
});

test('toJSONSchema uses registry ids', () => {
	const inner = z.object({}).register(dsbunnyRegistry, { id: 'ZodRegistryTestInner' });
	const outer = z.object({ x: inner, y: inner });
	const json = z.toJSONSchema(outer, { metadata: dsbunnyRegistry }) as any;
	assert.ok(json.$defs?.ZodRegistryTestInner);
});
