## Sanity

### Making Queries
Refer to this [post](https://www.sanity.io/learn/course/typescripted-content/adding-generated-types-to-your-front-end) on Sanity for more information.

1. Define the `groq` query
2. In the `sanity-studio` directory, run `bun run codegen` to generate GROQ query types
3. The generated types will be added to `@/lib/sanity/types.ts`
4. Use the generated types to make queries as such:
   ```
	 import { groq } from 'next-sanity'

	 import { sanity } from '@/lib/sanity'
	 import { POSTS_QUERYResult } from '@/lib/sanity/types'

	 const POSTS_QUERY = groq`
		*[_type == "post"] {
			_id,
			title,
			slug,
			publishedAt,
			body
		}
	 `

	 const posts = await sanity<POSTS_QUERYResult>({ query: POSTS_QUERY })
	 ```

