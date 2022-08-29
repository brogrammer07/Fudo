import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: "production",
  apiVersion: "2022-08-28",
  useCdn: true,
  token:
    "skKGEzrDrOKt5mRztN8eemXtwYVwlYTuq0KEBNsSdiiS58IjaN9t7ourfTB8g4mn4EJ6P8QOoKYX8DBLF1FyWbAZLAHMAP4YFsVc63LKHJra0ninHa719dAD0xPySo7FR7EWeEDXQoStqgUT6SfczDAwk4ftKNjta7jhny21xFmzY7EzfCL2",
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
