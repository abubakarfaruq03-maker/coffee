import express from 'express';
const router = express.Router();


const menu = [
  {
    id: '1',
    title: 'Espresso',
    price: 3.50,
    image: '/images/espresso.png',
    menu_image: '/images/espresso.jpeg',
    hasMilk: false,
    toppings: ['Cinnamon Dust', 'Cocoa Powder', 'Lemon Twist'],
    description: 'Our signature Espresso is the heart of our coffee house. Crafted from a premium blend of dark-roasted Arabica beans, it offers a bold, intense flavor profile with notes of toasted caramel and a rich, golden crema. It is the perfect quick pick-me-up for those who appreciate the pure essence of coffee.'
  },
  {
    id: '2',
    title: 'Double Espresso',
    price: 4.50,
    image: '/images/double_espresso.png',
    menu_image: '/images/double_espresso.JPG',
    hasMilk: false,
    toppings: ['Cinnamon Dust', 'Cocoa Powder'],
    description: 'Double the intensity and double the flavor. This "Doppio" features two full shots of our concentrated espresso, providing a deep, complex body with a lingering smoky finish. Perfectly balanced between bitterness and sweetness, it’s designed for the serious coffee lover looking for an extra boost of caffeine and a robust taste.'
  },
  {
    id: '3',
    title: 'Americano',
    price: 4.25,
    image: '/images/americano.png',
    menu_image: '/images/americano.jpeg',

    hasMilk: false,
    toppings: ['Splash of Milk', 'Honey', 'Lemon'],
    description: 'Created by adding hot water to our rich espresso shots, the Americano maintains the depth of a traditional coffee but with a smoother, more approachable finish. It carries the distinct aroma of roasted beans while offering a lighter body, making it a versatile choice for any time of the day.'
  },
  {
    id: '4',
    title: 'Caramel Machiatto',
    price: 5.75,
    image: '/images/caramel_machiatto.png',
    menu_image: '/images/caramel_machiatto.JPG',

    hasMilk: true,
    toppings: ['Chocolate Curls Topping', 'Extra Caramel Drizzle', 'Sea Salt'],
    description: 'A beautifully layered masterpiece. We combine freshly steamed milk with a touch of vanilla-flavored syrup, then "mark" it with our bold espresso shots. Finished with a generous crosshatch drizzle of buttery caramel, this drink is a creamy, sweet indulgence that provides a perfect harmony of flavors in every single sip.'
  },
  {
    id: '5',
    title: 'Iced Gingerbread',
    price: 6.50,
    image: '/images/iced_gingerbread.png',
    menu_image: '/images/iced_gingerbread.jpeg',

    hasMilk: true,
    toppings: ['Gingerbread Crumbs', 'Whipped Cream', 'Molasses Drizzle'],
    description: 'Experience the warmth of the holidays in a refreshing iced format. This seasonal treat blends cold-brewed espresso with spicy gingerbread syrup and chilled milk, served over ice. Topped with pillowy whipped cream and crunchy gingerbread crumbs, it delivers a nostalgic, cozy flavor profile that is both spicy and sweet.'
  },
  {
    id: '6',
    title: 'Cappuccino',
    price: 5.25,
    image: '/images/cappuccino.png',
    menu_image: '/images/cappuccino.jpeg',

    hasMilk: true,
    toppings: ['Chocolate Curls Topping', 'Cinnamon', 'Nutmeg'],
    description: 'A timeless Italian classic. Our Cappuccino features a balanced ratio of rich espresso, steamed milk, and a thick, luxurious layer of airy milk foam. The texture is velvety and light, allowing the natural sweetness of the milk to complement the boldness of the coffee. It’s an elegant, satisfying choice for any enthusiast.'
  },
  {
    id: '7',
    title: 'Flat White',
    price: 5.25,
    image: '/images/flat_white.png',
    menu_image: '/images/flat_white.jpeg',

    hasMilk: true,
    toppings: ['Micro-foam Art', 'Vanilla Powder'],
    description: 'Hailing from Australia, the Flat White is all about the "micro-foam." We fold a thin layer of velvety, finely textured milk into a double shot of ristretto espresso. This results in a silky mouthfeel and a stronger coffee-to-milk ratio than a latte, highlighting the intricate floral and nutty notes of our beans.'
  },
  {
    id: '8',
    title: 'Mocha',
    price: 5.95,
    image: '/images/mocha.png',
    menu_image: '/images/mocha.JPG',

    hasMilk: true,
    toppings: ['Chocolate Curls Topping', 'Whipped Cream', 'Chocolate Ganache'],
    description: 'The ultimate fusion of coffee and chocolate. We whisk premium cocoa into our espresso before adding steamed milk for a rich, dessert-like experience. This drink is indulgent and comforting, offering a deep chocolate flavor that perfectly balances the acidity of the coffee. It is best enjoyed with a swirl of whipped cream.'
  },
  {
    id: '9',
    title: 'Iced Coffee',
    price: 4.75,
    image: `/images/iced_coffee.png`,
    menu_image: '/images/iced_coffee.jpeg',

    hasMilk: true,
    toppings: ['Vanilla Syrup', 'Caramel Drizzle', 'Cold Foam'],
    description: 'Simple, crisp, and incredibly refreshing. Our Iced Coffee is brewed double-strength over ice to lock in the flavor without watering it down. It provides a clean, bright caffeine kick with subtle notes of milk chocolate. Customize it with your choice of milk or sweeteners to create your perfect midday revitalization.'
  },
  {
    id: '10',
    title: 'Cafe Au Lait',
    price: 4.50,
    image: '/images/cafe_au_lait.png',
    menu_image: '/images/cafe_au_lait.jpeg',
    hasMilk: true,
    toppings: ['Brown Sugar', 'Cinnamon Stick'],
    description: 'A French favorite that brings a touch of elegance to your morning. Unlike a latte, the Cafe Au Lait uses equal parts strong brewed coffee and warm, scalded milk. This creates a mellow, comforting flavor that is less intense than espresso-based drinks, making it a smooth and easy-drinking companion for a pastry.'
  },
  {
    id: '11',
    title: 'Affogato',
    price: 7.50,
    image: '/images/affogato.png',
    menu_image: '/images/affogato.JPG',
    hasMilk: false,
    toppings: ['Chocolate Curls Topping', 'Toasted Hazelnuts', 'Sea Salt Caramel'],
    description: 'Part drink, part dessert, and entirely delicious. We take a generous scoop of artisanal vanilla bean gelato and "drown" it in a hot shot of our premium espresso. As the gelato melts, it creates a creamy, marbled mixture of hot and cold, bitter and sweet. It’s a sophisticated treat that never fails to delight.'
  },
  {
    id: '12',
    title: 'Vienna',
    price: 6.25,
    image: '/images/vienna.png',
    menu_image: '/images/vienna.JPG',
    hasMilk: false,
    toppings: ['Extra Whipped Cream', 'Chocolate Shavings', 'Cocoa Dust'],
    description: 'An old-world classic that skips the milk in favor of luxury. The Vienna consists of two shots of strong black espresso topped with a generous swirling dome of cool, thick whipped cream. Instead of stirring, you sip the hot, dark coffee through the cold cream for a unique and decadent sensory contrast.'
  },
  {
    id: '13',
    title: 'Cafe Latte',
    price: 5.00,
    image: '/images/cafe_latte.png',
    menu_image: '/images/cafe_latte.JPG',

    hasMilk: true,
    toppings: ['Chocolate Curls Topping', 'Caramel Syrup', 'Hazelnut Syrup'],
    description: 'The gentlest of our espresso drinks. A Cafe Latte is composed of a single shot of espresso topped with a large amount of silky steamed milk and a light touch of foam. It is creamy, mild, and the perfect canvas for our flavored syrups, offering a soothing and warm experience that’s ideal for relaxing.'
  },
  {
  id: '14',
  title: 'Hazelnut Latte',
  price: 5.75,
  image: '/images/hazelnut_latte.png',
  menu_image: '/images/hazelnut_latte.jpeg',
  hasMilk: true,
  isFeatured: true,
  toppings: ['Hazelnut Drizzle', 'Crushed Praline', 'Cinnamon Powder'],
  description: 'A nutty twist on a classic favorite. This latte combines our smooth signature espresso with silky steamed milk and a rich, toasted hazelnut syrup. The result is a warm, buttery flavor profile that is perfectly balanced by the earthy notes of our premium coffee beans.'
},
{
  id: '15',
  title: 'Almond Latte',
  price: 5.95,
  image: '/images/almond.png',
  menu_image: '/images/almond.jpeg',
  hasMilk: true,
  isFeatured: true,
  toppings: ['Toasted Almond Flakes', 'Honey Swirl', 'Vanilla Bean'],
  description: 'A light and aromatic experience. Our Almond Latte features a delicate balance of bold espresso and creamy almond milk, steamed to a fine micro-foam. It carries a naturally sweet, marzipan-like fragrance with a subtle nuttiness that lingers on the palate without being overpowering.'
}
];

// 1. Get the full menu
router.get('/', (req, res) => {
  res.json(menu);
});


router.get('/search', (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: "Please provide a search term" });
  }

  // Filter for partial matches (case-insensitive)
  const results = menu.filter(item =>
    item.title.toLowerCase().includes(title.toLowerCase())
  );

  if (results.length === 0) {
    return res.status(404).json({ message: `No drinks found matching "${title}".` });
  }

  res.json(results);
});


// 1. GET /api/menu/featured
// Move this ABOVE the /:id route so Express doesn't think "featured" is an "id"
router.get('/featured', (req, res) => {
  // Filter the array for items marked as featured
  const featuredItems = menu.filter(item => item.isFeatured === true);

  if (featuredItems.length === 0) {
    return res.status(404).json({ message: "No featured drinks found" });
  }

  res.json(featuredItems);
});

// 2. GET /api/menu/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const item = menu.find(m => m.id === id);

  if (!item) {
    return res.status(404).json({ message: "Coffee drink not found" });
  }

  res.json(item);
});

export default router;


