---
layout: post
title: "Trimming expenses on The Urlist with Azure Cosmos DB Free Tier"
date: 2020-03-17
categories: posts
permalink: /posts/cosmos-free-tier/
---

<summary>
Summary: We migrated <a href="https://www.theurlist.com">theurlist.com</a> to the new Cosmos DB Free Tier and shaved ~35$ per month off of our Azure bill. Cosmos DB Free Tier gives you 400 RU/s for free every month. This should be more than enough for most small projects.
<p></p>
<div class="cta-container"><a class="cta" href="https://devblogs.microsoft.com/cosmosdb/build-apps-for-free-with-azure-cosmos-db-free-tier/?WT.mc_id=personal-blog-buhollan">Get Azure Cosmos DB Free Tier</a></div>
<p></p>

</summary>

<p></p>

[theurlist.com](https://www.theurlist.com) is a project that I wrote with my colleague [Cecil Phillip](https://twitter.com/cecilphillip) last year. We wanted to see if we could build a site on Azure that was two things…

1.  Serverless
2.  Cheap

Now you would think that “cheap” would go hand-in-hand with “Serverless”, and that’s true. But there are portions of theurlist.com that are not strictly “Serverless” by definition because those pieces didn’t exist in Azure at the time. One of those is our database - Azure Cosmos DB.

Azure Cosmos DB is the NoSQL data store that backs everything that theurlist.com does. Cosmos DB does not yet allow you to pay by request, or only for what you use. You need to buy something called “Request Units per Second” up front in batches. The lowest amount you can buy is 400, and that costs ~24\$ per month.

The database for theurlist.com is dead simple. It’s one database with one collection.

![Cosmos DB instance in Data Explorer](/assets/linkylinkdb.png)

> The database is called “linkylinkdb”. The original working name for this project was “Linky Link”. Although [linkylink.com](http://linkylink.com/) was already registered and is the home page of a dog named “Lincoln” where you can see a slide show of him in various poses. It’s probably a better use of the URL if we’re being honest.

Monthly traffic to theurlist.com is around 60K visits. This equates to around 2 ru/s in Cosmos DB. TWO. We are currently paying for 400\. That’s 200 times more throughput than we need and we’re paying for it. And sometimes we don’t even use that. In fact, in the last 7 days, we haven’t even averaged 1.

![The average number of Cosmos DB RU/s displayed in Azure portal](/assets/cosmos-db-rus.png)

Our 400 RU cost each month, combined with with us occasionally upping the RU/s to do load testing demos tipped our total Cosmos DB bill to around 32\$ per month.

![Cosmos DB cost summary](/assets/cosmos-db-old-cost.png)

Most of that we simply aren’t using, but we have to pay for it anyway. Which, doesn’t feel great. In our endless persuit of running a cost-effective app on Azure, we were excited to learn about the launch of the new Cosmos DB Free Tier.

## Migrating to the Cosmos DB Free Tier

Cosmos DB has officially launched a [free tier](https://devblogs.microsoft.com/cosmosdb/build-apps-for-free-with-azure-cosmos-db-free-tier/?WT.mc_id=personal-blog-buhollan). But what exactly does that mean?

Free Tier allows you to have one Cosmos DB account where you apply a “Free Tier” discount. This gives you the first 400 RU/s free every month. They are deducted from the bill. For theurlist.com, this is perfect. We aren’t anywhere _near_ 400 RU/s. And based on my calculations, if 60K views equates to 2 RU/s, we could go up to 12 MILLION requests per month before we get to 400 RU/s. That’s a LOT of traffic.

Last week, we migrated our database to the Cosmos DB free tier. We filmed the whole thing so you can see how to move your Cosmos DB database if you’ve got a small project like we do. There are two options you can use in terms of tools to do this.

1.  [Azure Data Factory](https://ms-adf.azure.com?WT.mc_id=personal-blog-buhollan)
2.  [Cosmos DB Migration Tool](https://ms-adf.azure.com?WT.mc_id=personal-blog-buhollan)

The Cosmos DB Migration tool is Windows only, so we opted for the Azure Data Factory, which is browser-based.

The downside of the Azure Data Factory is that we had to create the database and collection before we could migrate the data. If you have a lot of databases or collections, and or you have lots of triggers and stored procedures, you’re better off using the Cosmos DB Migration Tool.

We decided to record the process in case you are looking to migrate your own Cosmos DB database to the Free Tier. Enjoy!

{% include youtubePlayer.html id="kEuEvPtgaK0" %}
