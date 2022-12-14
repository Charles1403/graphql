import {categories, data, reviews} from '../data.js';

export const resolvers = {
    Query: {
        products: (parent, args, context) => {
            const {filter} = args
            let filteredData = data
            if (filter) {
                if (filter.onSale === true) {
                    filteredData = filteredData.filter((d) => {
                        return d.onSale
                    })
                }
            }
            return filteredData
        },
        product : (parent, args, context) => {
            const productName = args.name
            const product = data.find((p) => p.name === productName)
            if (!product) return null
            return product
        },
        categories: () => categories,
        category: (parent, args, context) => {
            const {name} = args
            return categories.find((c) => c.name === name)
        }
    },
    Category: {
        products : (parent, args, context) => {
            const categoryId = parent.id
            return data.filter((d) => d.categoryId === categoryId)
        }
    },
    Product: {
        category: (parent, args, context) => {
            const {categoryId} = parent
            return categories.find((c) => c.id === categoryId)
        },
        review: (parent, args, context) => {
            console.log(parent)
            const {id} = parent
            return reviews.filter((r) => r.productId === id)
        }
    }
}