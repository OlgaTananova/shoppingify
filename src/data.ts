export interface Data {
    category: string,
    items: string[]
}

export interface ShoppingCategoryData {
    category: string,
    items: [string, number][]
}

export const shoppingList: ShoppingCategoryData[] = [
    {
        category: 'fruits and vegetables',
        items: [['coconut', 1], ['apples', 2], ['bananas 1kg', 1]]
    },
    {
        category: 'Meat and fish',
        items: [['chicken', 4], ['beef', 1], ['salmon', 2]]
    }
]

const data: Data[] = [
    {
        category: 'fruits and vegetables',
        items: ['coconut', 'apples', 'bananas 1kg', 'tomatoes 1kg', 'lettuce', 'carrots', 'bag of potatoes 5kg',
        'mushrooms', 'salad', 'oranges', 'avocado']
    },
    {
        category: 'Meat and fish',
        items: ['chicken', 'beef', 'salmon', 'seashells', 'shrimps']
    },
    {
        category: 'Beverages',
        items: ['Beer', 'Cola', 'Water', 'Fanta', '7Up', 'Vodka']
    }

]

export default data;
