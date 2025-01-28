import { type SchemaTypeDefinition } from 'sanity'
import products from './products'
import order from './order'
import customer from './customer'
import orderItem from './orderItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products,order,customer,orderItem],
}
