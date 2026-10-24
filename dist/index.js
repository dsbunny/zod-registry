// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab
import * as z from 'zod';
// Registry layered over a parent: own metadata wins, then the parent's, then
// the Zod global registry.  The global fallback preserves `.describe()` text
// for `z.toJSONSchema()` without registering ids globally.
export class LayeredRegistry extends z.core.$ZodRegistry {
    parent;
    constructor(parent) {
        super();
        this.parent = parent;
    }
    get(schema) {
        const own = super.get(schema);
        const inherited = this.parent?.get(schema);
        const shared = z.globalRegistry.get(schema);
        if (!own && !inherited && !shared)
            return undefined;
        return { ...shared, ...inherited, ...own };
    }
    has(schema) {
        return super.has(schema) || !!this.parent?.has(schema);
    }
}
// Common registry for all public @dsbunny schema packages.
// Usage: `z.toJSONSchema(schema, { metadata: dsbunnyRegistry })`.
export const dsbunnyRegistry = new LayeredRegistry();
//# sourceMappingURL=index.js.map