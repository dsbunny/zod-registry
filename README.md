# @dsbunny/zod-registry

Common Zod registry for public `@dsbunny` schema packages, so that schema ids are
not added to Zod's default `z.globalRegistry` of downstream applications.

```typescript
import * as z from 'zod';
import { dsbunnyRegistry } from '@dsbunny/zod-registry';

const Foo = z.object({}).register(dsbunnyRegistry, { id: 'Foo' });
z.toJSONSchema(Foo, { metadata: dsbunnyRegistry });
```

`LayeredRegistry` lookups fall back to the parent registry and then the global
registry, preserving `.describe()` metadata.
