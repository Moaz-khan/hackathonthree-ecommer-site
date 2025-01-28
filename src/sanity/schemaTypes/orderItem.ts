import { Rule } from "sanity"; // Import Rule from sanity

const orderItem = {
  name: "orderItem",
  type: "document",
  title: "Order Item",
  fields: [
    {
      name: "productId",
      type: "reference",
      to: [{ type: "product" }],
      title: "Product",
    },
    {
      name: "image",
      type: "url",
      title: "Product Image",
      validation: (Rule: Rule) => Rule.required(), // Explicitly using Rule type
    },
    {
      name: "size",
      type: "string",
      title: "Product Size",
    },
    {
      name: "color",
      type: "string",
      title: "Product Color",
    },
    {
      name: "quantity",
      type: "number",
      title: "Quantity",
      validation: (Rule: Rule) => Rule.min(1).required(), // Explicitly using Rule type
    },
    {
      name: "price",
      type: "number",
      title: "Price",
      validation: (Rule: Rule) => Rule.min(0).required(), // Explicitly using Rule type
    },
  ],
};

export default orderItem;
