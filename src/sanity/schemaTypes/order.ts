import { Rule } from "sanity"; // Import the Rule type from Sanity

const order = {
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    {
      name: "customerId",
      type: "reference",
      to: [{ type: "customer" }],
      title: "Customer",
    },
    {
      name: "items",
      type: "array",
      title: "Order Items",
      of: [{ type: "reference", to: [{ type: "orderItem" }] }],
    },
    {
      name: "totalAmount",
      type: "number",
      title: "Total Amount",
      validation: (Rule: Rule) => Rule.min(0).required(),
    },
    {
      name: "paymentMethod",
      type: "string",
      title: "Payment Method",
      options: {
        list: [
          { title: "Cash on Delivery", value: "cash_on_delivery" },
          { title: "Credit Card", value: "credit_card" },
          { title: "PayPal", value: "paypal" },
          { title: "Online Banking", value: "online_banking" },
        ],
      },
    },
    {
      name: "status",
      type: "string",
      title: "Order Status",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
        ],
      },
      initialValue: "pending",
    },
    {
      name: "orderDate",
      type: "datetime",
      title: "Order Date",
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};

export default order;
