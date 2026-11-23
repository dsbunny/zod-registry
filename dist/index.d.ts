import * as z from 'zod';
export declare class LayeredRegistry extends z.core.$ZodRegistry<z.GlobalMeta> {
    readonly parent?: z.core.$ZodRegistry<z.GlobalMeta>;
    constructor(parent?: z.core.$ZodRegistry<z.GlobalMeta>);
    get(schema: z.core.$ZodType): z.core.GlobalMeta | undefined;
    has(schema: z.core.$ZodType): boolean;
}
export declare const dsbunnyRegistry: LayeredRegistry;
//# sourceMappingURL=index.d.ts.map