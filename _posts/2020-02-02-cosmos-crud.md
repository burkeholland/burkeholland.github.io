---
layout: post
title: "Cosmos CRUD"
date: 2020-02-02
categories: posts
permalink: /posts/cosmos-crud/
---

[Cosmos DB JavaScript SDK](https://docs.microsoft.com/azure/cosmos-db/sql-api-nodejs-application?WT.mc_id=personal-blog-buhollan) is clean - I like it. But I feel like I always end up forgetting how to CRUD.

For the uninitiated in database street-slang, CRUD means Create, Read, Update And Delete. Feel free to use that if you find yourself in a turf war or dance-off.

Well, I take that back. I can “read” everything purty gud. Actually, I can “create” as well. It’s the retrieving of one item that always throw me off. This is because of partition keys. Partition keys always hang me up (because I am but a simple man) and, well, I need a reminder for how they do and don’t affect retrieving an item, so that’s what I’m going to document in this here article.

Assume that we’re working with the following document structure with a partition key on “/brand/name”.

<div class="highlight">

    {
      "name": "Artificial Tree",
      "price": 250,
      "brand": {
        "name": "Drillco"
      },
      "stockUnits": 654,
      "id": "66d7134f-ee03-4cab-b448-ab3bb5098a6f"
    }

</div>

Assume that all of the following examples have the following connection information…

<div class="highlight">

    import { CosmosClient } from "@azure/cosmos";
    const client = new CosmosClient(process.env.CONNECTION_STRING);
    const database = client.database("tailwind");
    const container = database.container("products");

</div>

## Creating an item

<div class="highlight">

    async create(product: Product) {
      let { resource } = await container.items.create(productToCreate);
      return resource;
    }

    const product = await create({
      name: "Hammer",
      price: 10,
      brand: {
        name: ACME
      },
      stockUnits: 1500
    });

</div>

> Note that Cosmos DB auto-creates an id if you don’t pass one in. It will be a GUID.

## Reading all items

<div class="highlight">

    async readAll() {
      let iterator = container.items.readAll();
      let { resources } = await iterator.fetchAll();
      return resources;
    }

    const products = await readAll();

</div>

## Reading one item

<div class="highlight">

    async read(id: string, brand: string) {
      let { resource } = container.item(id, brand).read();
      return resource;
    }

    const product = await read("66d7134f-ee03-4cab-b448-ab3bb5098a6f", "Drillco");

</div>

Sometimes you don’t have a partition key. In that case, you’ll want to pass `undefined` as the second parameter.

<div class="highlight">

    async read(id: string) {
      let { resource } = container.item(id, undefined).read();
      return resource;
    }

    const product = await read("66d7134f-ee03-4cab-b448-ab3bb5098a6f");

</div>

## Update an item

<div class="highlight">

    async update(product: Product) {

      // just like with reading one item, if your collection doesn't have a partition key,
      // pass "undefined" as the second parameter - container.item(product.id, undefined);
      let itemToUpdate = container.item(product.id, product.brand.name);
      let { resource } = itemToUpdate.replace(product);
      return resource;
    }

    const product = await update({
      name: "Artificial Tree Updated",
      price: 250,
      brand: {
        "name": "Drillco"
      },
      stockUnits: 654,
      id: "66d7134f-ee03-4cab-b448-ab3bb5098a6f"
    });

</div>

> Note that you **have** to include the id on the object that you pass in to the `replace` function. Even though you already specified it when you retrieved the item to update.

## Delete an item

<div class="highlight">

    async destroy(id: string, brand: string) {
      // just like with reading one item, if your collection doesn't have a partition key,
      // pass "undefined" as the second parameter - container.item(product.id, undefined).delete();
      await container.item(id, brand).delete();
    }

    await destroy("66d7134f-ee03-4cab-b448-ab3bb5098a6f", "Drillco")

</div>

## Partition key values vs names

The main takeaway from this article (besides my poor use of grammer and analogy) should be that CosmosDB wants a partition key VALUE, not name. When I was first working with the SDK, I would try to pass in the partition key name (/brand/name). This would throw an error telling me that an object with id of _whatever_ didn’t exist. That’s because I needed to pass in the _value_ of the partition key, not the name. This is why you need to pass in _undefined_ if you do **not** have a partition key defined for your collection.

There is a pretty good tutorial you can go through [here](https://docs.microsoft.com/azure/cosmos-db/sql-api-nodejs-application?WT.mc_id=personal-blog-buhollan) that covers this in more detail and shows it in a Node/Express context.

I hope this helps. Good luck out there.