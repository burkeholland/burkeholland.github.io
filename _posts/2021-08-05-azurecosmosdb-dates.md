---
layout: post
title: "Converting Cosmos DB Timestamps to JavaScript Dates"
date: 2021-08-05 10:34:40 +0000
categories: posts
permalink: /posts/azure/azurecosmosdb-dates/
---

Cosmos DB automactially adds a timestamp field called "\_ts". everytime a document is **created** or **updated**. And it looks like this...

```json
{
  "_ts": 1628083065
}
```

That number is described by [this blog post](https://devblogs.microsoft.com/cosmosdb/new-date-and-time-system-functions/?WT.mc_id=devcloud-0000-buhollan#converting-the-system-_ts-property-to-a-datetime-string) as an "epoch value in seconds (not milliseconds) since an item was last modified." The number of seconds since what? Well, the number of seconds since January 1st, 1970 to be exact. This is a Unix date format (aslo called "epoch") and you can use JavaScript to convert that into a date object that you can actually use.

## Converting JavaScript Date

You can create a JavaScript Date object from an epoch value by just passing the value to the Date constructor. HOWEVER; the [docs for the JavaScript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date) say that "Date objects contain a number that respresents the number of _milliseconds_ since January 1, 1970." By contrast, the Cosmos DB `_ts` property is the number of _seconds_ since January 1, 1970. So in order to get the correct time, we have to multiply the \_ts value by 1000 so that it's milliseconds instead of seconds. So the final answer looks like this...

```javascript
const d = new Date(_ts * 1000);
console.log(d.toDateString());
```