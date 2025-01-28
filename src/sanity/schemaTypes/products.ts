// schemas/product.js

const product = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string",
    },
    {
      name: "description",
      title: "Product Description",
      type: "text",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "isNew",
      title: "Is New",
      type: "boolean",
    },
    {
      name: "colors",
      title: "Colors",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true, // Optional: to enable cropping
      },
    },
    {
      name: "discountPercent",
      title: "Discount Percentage",
      type: "number",
    },
  ],
};

export default product;
