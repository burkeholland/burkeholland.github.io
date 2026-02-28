---
layout: post
title:  "Upload an Image to Azure Storage with Static Web Apps"
date:   2021-07-31 09:30:16 +0000
categories: posts
permalink: /posts/azure/upload-image-swa/
---

One of the great advantages to [Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/?WT.mc_id=devcloud-0000-buhollan) _should be_ the ability to easily integrate with other Azure services. I've been working on a [sample blog project](https://github.com/burkeholland/fresh-blog) a la the old Ruby on Rails tutorial, and I wanted to add the ability to upload an image to a blog.

![](/assets/lego-shoe.gif)

Now, there are two ways to go about this. You can do it from the client, or you can do it from the server.

### Client-side upload (I Don't Like)

In a client-side upload, you need to create a function in your static web app API that returns something called an SASToken, which is a temporary key that allows someone to upload an image. You then put all the upload code in your frontend application and upload the image directly to Azure Storage using that temporary key.

This was the strategy that we used in the Sunrise Standup demo. You can see the code to generate the SASToken [here](https://github.com/sunrise-standup/sunrise-standup/blob/main/api/GetSASToken/index.js), and the code to get that token and upload the image [here](https://github.com/sunrise-standup/sunrise-standup/blob/main/src/api/storageApi.js). The thing that should jump out at you right away is that it is a **lot** of code. It feels heavy for something that should be rather simple - especially from one Azure service to another. I felt at one point like I was trying to do OAuth and that's just not a feeling anyone wants to have.

### Server-side upload (I Like)

In a server-side upload, you upload your image to your static web app API, and let the API handle the upload to storage. The reason I like this is that it's **far less code**. It also centralizes the logic instead of spreading it between the frontend and API.

Let's talk about the client-side first. To upload an image to a static web app API (which is just an Azure Function), you need to post it as `FormData`. It looks like this...

```javascript
async function handleFileUpload(image) {
  // create a new form data object that will hold the image
  let formData = new FormData();
  formData.append("file_upload", image, image.name);

  // send the form data object to the server (uploads file)
  const response = await fetch("api/upload", {
    method: "POST",
    body: formData
  });
  const json = await response.json();
  return json.imageUrl;
}
```

This is pretty simple. Create a FormData object, append the image as data and then pass that form data object on the post request. It takes a bit of knowing about how to post form data, but if you don't know, now you know.

The second part is to create the function that will handle the "api/upload" request. This is the beefy part because it's doing all the work.

```typescript
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  newPipeline
} from "@azure/storage-blob";
import * as streamifier from "streamifier";
import * as multipart from "parse-multipart";

const STORAGE_ACCOUNT: string = process.env.STORAGE_ACCOUNT;
const STORAGE_KEY: string = process.env.STORAGE_KEY;
const STORAGE_CONTAINER: string = process.env.STORAGE_CONTAINER;
const STORAGE_URL: string = `https://${STORAGE_ACCOUNT}.blob.core.windows.net`;

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  // Get the image data from the request
  const bodyBuffer = Buffer.from(req.body);

  // use the parse-multipart library to parse the multipart form data
  const boundary = multipart.getBoundary(req.headers["content-type"]);
  const parts = multipart.Parse(bodyBuffer, boundary);

  const fileData = parts[0].data;
  // Append a date string to the front to make every file name unique
  const fileName = Date.now() + parts[0].filename;
  const contentType = parts[0].type;

  // Set auth credentials for upload
  const sharedKeyCredential = new StorageSharedKeyCredential(
    STORAGE_ACCOUNT,
    STORAGE_KEY
  );
  const pipeline = newPipeline(sharedKeyCredential);

  // Upload the file
  const blobServiceClient = new BlobServiceClient(STORAGE_URL, pipeline);
  const containerClient =
    blobServiceClient.getContainerClient(STORAGE_CONTAINER);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  const uploadBlobResopnse = await blockBlobClient.uploadStream(
    streamifier.createReadStream(new Buffer(fileData)),
    fileData.length,
    5,
    {
      blobHTTPHeaders: {
        blobContentType: contentType
      }
    }
  );

  context.res = {
    body: { imageUrl: `${STORAGE_URL}/${STORAGE_CONTAINER}/${fileName}` }
  };
};

export default httpTrigger;
```

Let's walk through what's going on here piece by piece...

1. The binary data comes into the function as "multipart/form-data" because remember - we used the `FormData` object on the client, so you need to parse it as such. You can use the [parse-multipart](https://www.npmjs.com/package/parse-multipart) node package to do this.
1. The form data comes in as binary, so you need to read it into a `Buffer` object so you can work with.
1. The request header contains the "boundary" for the data - or where the data ends. Once you know the boundary, you can pass that to the multipart library and it will parse out the form data.
1. Once you've parsed the form data, you can read it and get the file name, type (jpg, png, ect), image data ect. You'll get an array object when you parse the form data in case you uploaded multiple images so a single image will be at position 0.
1. Next you setup the shared access key for your storage account. Your key can be securely held in the API `local.settings.json` file.
1. Last, you upload the file as a stream. To do that, you want to use the [streamifier](https://www.npmjs.com/package/streamifier) Node package.
   1. An important note here is that you set the `blobHTTPHeaders` and the `blobContentType` so that your image is uploaded as an image. Otherwise it's uploaded as blob data and when you try to access it via your browser, your browser will download it instead of just displaying it.

## BRO THAT'S STILL A LOT OF CODE

I know. I put the upload logic in a service.ts so that my API function just looks like this...

```typescript
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import storageService from "../services/storageService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const imageUrl = await storageService.upload(req);

  context.res = {
    body: { imageUrl }
  };
};

export default httpTrigger;
```

## SECURITY!

This is where we take advantage of the [built-in security in static web apps](https://docs.microsoft.com/azure/static-web-apps/configuration?WT.mc_id=devcloud-0000-buhollan#example-configuration-file) and use a `staticwebapp.config.json` file to say that if you're not logged in and in the right role, you can't call this endpoint. In fact, I lock down every HTTP verb that might modify something under one rule.

```json
{
  "routes": [
    {
      "route": "/api/*",
      "methods": ["PUT", "POST", "PATCH", "DELETE"],
      "allowedRoles": ["author"]
    }
  ]
}
```

## Possible Drawbacks

The only drawback I can think of to this method is that you are technically uploading the image _twice_; once to the API and then once to Azure Storage. So if you had a large image, it _could_ be slower. But remember, static web app APIs are Azure Functions, which are already in Azure. So when you upload the image, it's already there. You're just transfering it over to storage. Transfering data within Azure is 1) FAST and 2) FREE. That last one being the most important.

## It's still harder than it should be

I agree. I would like to see some integration down the road where we provide you with a client-side API that will let you upload to storage and handle all of the key business for you. Perhaps we just light up and endpoint like "/.storage". I don't know. I'm not on the engineering team and you should be thankful for that otherwise you'd end up with features like the one I just suggested which now that I've typed it looks rediculous.

But you get the idea. In the meantime, I hope this helps. Happy uploading.
