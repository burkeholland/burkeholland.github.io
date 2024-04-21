---
layout: post
title: "Selecting the first item from an array"
date: 2019-11-17
categories: posts
permalink: /posts/select-one-javascript/
---

Sometimes, in life, you just want one of something. Not two. Never two. Just one. Like a toothbrush. Or a flu shot. Or a pug. Dear god, trust me, you do not want more than one pug. It’s like a choir of snoring with flatulance on backup vocals.

This is common in database queries, too. I mean, the desire to just get one result. Not the flatulance. Although it _might_ be. I’ve got no data on that and writing queries can be super stressful.

Applications that act as a form over some sort of data often require the retreiving of just one item so that you can edit that item. Which, according to science, is like 110% of all applications ever.

I recently built a small application with [Cosmos DB](https://www.npmjs.com/package/@azure/cosmos), and I quickly ran into a situation where I needed to select one item. Specifically, I have a database structure that looks like this…

    {
        productId: 1,
        productName: "Hammer",
        productDescription: "a tool consisting of a weighted \"head\" fixed to a long handle that is swung to deliver a swift and brutal impact to the thumb."
        brand: {
            brandId: 10,
            brandName: "Acme",
        }
    }

If we wanted to get just the Acme thumb smash…..er…..hammer, then we could write a select statement that looks like the following…

    SELECT *
    FROM products p
    WHERE p.name = "Hammer" AND p.brand.name = "Acme"

Executing this query in Cosmos DB looks something like this…

    async function getProduct(productName: string, brandName: string) {
      const query = `SELECT TOP 1 *
                   FROM products p
                   WHERE p.productName = "${productName}"
                   AND p.brand.brandName = "${brandName}"`;
      const result = await collection.items.query(query).fetchNext();
      return result.resources[0];
    }

    getProduct("Hammer", "Acme").then(product => {
      console.log(JSON.stringify(product));
    });

> Note that “SELECT Top 1 _” is preferred over “SELECT _” so you don’t return more data than you intend. And “SELECT p.ANYTHING_AT_ALL” is preferrable to “SELECT *” because your document structure may not always be the same in a NoSQL database because that’s the world we live in now.

Assuming that the brand name and product name together constitute a unique key, we should only ever get one result back. The Cosmos DB JavaScript SDK always returns an array for queries, even if there is only one item inside. To get that item, we can just grab the zero-index item from the `resources` object, which is what’s going on in that gorgeous code block above composed by yours truly.

The problem is that this returns `undefined` if there is no result. We could check for that and return en empty object easily enough…

    return result.resources[0] || {};

But…”yuck”. I don’t know what it is about array notation, but it always feels like I’m doing it wrong. Like I’m cheating by using the array index. I think this is because I’m explicitly asking for something that, much like god, may or may not exist. If it does exist, everything is fine. If it doesn’t, the only way to find out is the hard way.

Array notation isn’t bad per say, but I generally try and stay away from it because it’s the best way to smash your face on “undefined is not a function” if you use it with objects.

To feel less dirty, we could instead use the array “shift” method. This gives us the first object in the array or `undefined`.

    return result.resources.shift() || {};

But that also alters the original array, which we might not want. Like if we were going to use that same response again for another operation. I know you think you won’t. You always think you won’t. But then, eventually, you do and by the time you do you’ve forgotten all about this whole scenario because at least a year has passed, you’ve had a child, you’ve moved twice because you don’t get along with your neighbors and your wife has acquired two pugs.

It’s generally not a good idea to go around modifying collections unless you specifically want to do that. Insert esoteric HN article about immutability.

Instead we could use `find`, which will leave the original `resources` array intact…

    return result.resources.find(x => x) || {};

Cosmos DB enginner and JavaScript trickster [Steve Faulkner](https://twitter.com/southpolesteve) pointed out that you could also just destructure the array. But we can’t do that in a return statement for reasons that the JavaScript gods have not seen fit to reveal. So we would need two lines. Also, we can’t do a default value on the destructuring, so we would have to do it on the return.

    const [item] = result.resources;
    return item || {};

He also pointed out to me that the common denominator in all my failed neighbor relationships might be me.

At this point, we just have to ask, “Which of these is best”? We don’t have to ask that, but we probably should given this is a blog post and it needs a conclusion.

In my opinion, as much as I hate to admit it, it’s the line we started with. While array notation might seem dirty, in this instance, it simply makes the most sense and most clearly articulates what the code does.

    return result.resources[0] || {};

It’s also not a problem to use array notation here because we are in fact working with an array. The whole reason I was trying to avoid that situation in the first place is because I was looking for a solution to a problem that JavaScript just doesn’t have.

## A solution without a problem

If you have used C# before, you will be familiar with LINQ. You will also be very familiar with LINQ’s `firstOrDefault` or `singleOrDefault` methods. These methods return either the first result from the query, or an empty object of the query return type. LINQ doesn’t exist for JavaScript (that’s a [lie](https://github.com/mihaifm/linq)) and there is a reason for that: We don’t need it.

The `firstOrDefault` and `singleOrDefault` methods are needed for C# because it is a typed language. You can’t just return an object. You either have to get a result, or you need to get a null object of a certain type. In JavaScript, we don’t care about types (very much). So it’s easy enough for us to check and see if something is simply there and then return an empty object if it is not. We don’t even have to do that much. We can just use the result type later in our code if it’s defined at all.

    const product = await db.getProduct("Hammer", "Acme");
    if (product) {
      product.description = ...
    }
    else {
      console.log("Unable to find a(n) %s %s", "Acme", "Hammer");
    }

The moral of this story is that sometimes your first instinct is the right one. Or, it’s not. Either way, you won’t know until you write a blog post.

*   [Connect to and query data from Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/create-sql-api-nodejs)
*   [Nifty article from Steve Smith on mapping JavaScript array methods to LINQ methods](https://ardalis.com/javascript-es6-linq-equivalents)
