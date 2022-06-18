export interface Data {
    category: string,
    items: string[]
}

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
