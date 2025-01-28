import { Rule } from "sanity";
const customer = {
  name: "customer",
  title: "Customer",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "password",
      title: "Password",
      type: "string",
    },
  ],
};

export default customer;
