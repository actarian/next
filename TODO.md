
## TODO FE

- list ✔️

- forms ⏳

- husky ⏳

- market and languages -> getHomepage method ⏳

- template field in collections to override the default template (collection_name)

- mockup -> collections as separated json?

- github actions

- tests

## TODO CMS

- plugin pages ⏳  
  meta localizzati
  endpoint graphql pages
  abilitare campi uid per slugs

- plugin mktlng ⏳   
  esporre servizio localizedAttribute
  languages, countries localizzate da librerie node.
  campi uid localizzati
  custom fields > text, uid, wysiwyg 
  refactor 

- plugin menu (menu > menu_menu_item > menu_item)
  dipende da plugin pages
  possibilità di linkare singola pagina, collection di pagine, link esterni

- fix wysiwyg bug

---

## STRAPI

[Iniettare componenti nelle viste tramite plugin](https://docs.strapi.io/developer-docs/latest/developer-resources/plugin-api-reference/admin-panel.html#bootstrap)

[InjectionZoneApi](https://docs.strapi.io/developer-docs/latest/developer-resources/plugin-api-reference/admin-panel.html#injection-zones-api)

[Available Actions](https://docs.strapi.io/developer-docs/latest/developer-resources/plugin-api-reference/admin-panel.html#available-actions)

[Database](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/databases.html#configuration-structure)

[Design System (utilizzabile anche su consumer)](https://design-system-git-main-strapijs.vercel.app/?path=/docs/design-system-components-iconbutton--group)

[Strapi Plugin International Fields](https://github.com/MattieBelt/strapi-plugin-international-fields)

[Entity Service API CRUD operations](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service/crud.html#findone)

[Entity Service API: Filtering](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service/filter.html#logical-operators)

[Query Engine API (low level)](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine-api.html)

[Custom Fields rfcs](https://github.com/strapi/rfcs/blob/custom-fields/rfcs/xxxx-custom-fields.md)

[KeyStone Custom Fields](https://keystonejs.com/docs/apis/fields#json)

[RFCS Custom Fields](https://github.com/strapi/rfcs/pull/40)

---

## Headless CMS

[Directus](https://directus.io/platform/)

[GraphCMS](https://graphcms.com/)

---

## Builders

[Astro.Build](https://astro.build/)

[Quik.Builder](https://qwik.builder.io/)

---

## FrontEnd Frameworks

[React.Js](https://it.reactjs.org/)

[Next.Js](https://nextjs.org/)

[Svelte.Js](https://svelte.dev/)

[SvelteKit](https://kit.svelte.dev/)

[Solid.Js](https://www.solidjs.com/)

[ViteJs](https://vitejs.dev/)

[Remix](https://remix.run/)

[Remix Production metrics with Graphana](https://scottsmerchek.com/blog/setting-up-production-monitoring-for-remix-on-fly-io)

[Remix Utils](https://github.com/sergiodxa/remix-utils)

---

## Vercel

[Vercel](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables)

[Vercel static generator](https://static-tweet.vercel.app/)

[Vercel design](https://vercel.com/design/button)

---

## JamStack

[JamStack](https://jamstack.org/headless-cms/)

[State Of Js](https://2021.stateofjs.com/en-US/libraries/front-end-frameworks)

---

## Libraries

[AriaKit](https://github.com/ariakit/ariakit)

[Remix.Js multi tenant application issue (middleware)](https://github.com/remix-run/remix/discussions/2857)

[Geist UI](https://github.com/geist-org/geist-ui)

[React Typescript](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/)

---

## Generators

[JsonGenerator](https://json-generator.com/)

[
  '{{repeat(1, 1)}}',
  {
    id: '{{objectId()}}',
    schema: 'product',
    slug: '{{lorem(4, "words")}}',
    title: '{{lorem(4, "words")}}',
    abstract: { 'en': '{{lorem(10, "words")}}' },
    description: { 'en': '<p>{{lorem(1, "paragraphs")}}</p>' },
    image: '/assets/products/t-shirt.webp',
    price: '{{floating(50, 1500)}}',
    categoryId: '{{integer(6, 9)}}',
    tags: [
      '{{repeat(7)}}',
      '{{lorem(1, "words")}}'
    ],
    features: [
      '{{repeat(7)}}',
      { 'id': '{{index()}}', 'name': '{{lorem(1, "words")}}' }
    ],
    meta: {
      title: "T-Shirt",
      description: { 'en': '<p></p>' },
      keywords: '{{lorem(7, "words")}}',
      robots: 'all'
    }
  }
]






