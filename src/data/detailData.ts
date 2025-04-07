import { Book } from '../types';

// Book details
export const bookDetails = {
  kitobNomi: 'Jinlar Bazmi',
  title: 'Jinlar bazmi', // For the header title
  muallif: 'Джахонгир КИЗ',
  authorName: 'Kevin Smiley', // For the main info section
  isbn: '121341381648 (ISBN13: 121341381648)',
  til: 'Ўзбек',
  sahifalar: '450',
  chopEtilganSana: 'Апрель 7, 1999',
  nashriyot: 'Wepress Inc.',
  year: '1999', // For the main info section
  category: 'SIYOSAT, FANTASTIKA', // For the orange title
  rukn: ['SIYOSAT', 'CRECAT'],
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  reviewCount: 235, // Number of reviews shown in the UI
  rating: 4, // Star rating in the UI
};

// Prices for different formats
export const bookPrices = {
  physical: '65 000 сум',
  audio: '55 000 сум',
  online: '45 000 сум',
};

// Ratings and statistics
export const ratingStats = {
  total: 4.7,
  distribution: [
    { stars: 5, percentage: 60 },
    { stars: 4, percentage: 25 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 }
  ],
};

// Reviews data
export const reviews = [
  {
    id: 1,
    author: 'Azizbek',
    date: '2024-03-15',
    rating: 5,
    comment: 'Ajoyib kitob! Har bir o\'zbek o\'qishga majbur.',
    isVerified: true
  },
  {
    id: 2,
    author: 'Dilfuza',
    date: '2024-03-10',
    rating: 4,
    comment: 'Qiziqarli va o\'quvchan. Tarixiy voqealar juda yaxshi tasvirlangan.',
    isVerified: false
  },
  {
    id: 3,
    author: 'Shohruh',
    date: '2024-03-05',
    rating: 5,
    comment: "O'zbek adabiyotining durdonasi. Har bir sahifasi qiziqarli.",
    isVerified: true
  }
];

// Similar books data
export const similarBooks: Book[] = [
  {
    id: 1,
    name: "Oʻtgan kunlar",
    author: "Abdulla Qodiriy",
    image: "https://example.com/book1.jpg",
    rating: 4.5,
    comment_count: 120,
    categories: [
      { id: 1, name: "Roman", image: "" },
      { id: 2, name: "Tarixiy", image: "" }
    ],
    publisher: "Sharq nashriyoti",
    published_year: "1926",
    published_date: "1926-01-01",
    isbn: "978-1-234567-89-0",
    language: "Oʻzbek",
    pages: 350,
    description: "Oʻzbek adabiyotining eng yirik asarlaridan biri",
    paper: { price: 50000, sale_price: 45000, sale_percent: 10 },
    online: { price: 30000, sale_price: 25000, sale_percent: 15 },
    audio: { price: 40000, sale_price: 35000, sale_percent: 12 },
    views: 1000
  },
  {
    id: 2,
    name: "Mehrobdan chayon",
    author: "Abdulla Qahhor",
    image: "https://example.com/book2.jpg",
    rating: 4.2,
    comment_count: 85,
    categories: [
      { id: 1, name: "Roman", image: "" },
      { id: 3, name: "Ijtimoiy", image: "" }
    ],
    publisher: "Gʻafur Gʻulom nashriyoti",
    published_year: "1960",
    published_date: "1960-01-01",
    isbn: "978-1-234567-89-1",
    language: "Oʻzbek",
    pages: 280,
    description: "Ijtimoiy hayot haqida qiziqarli roman",
    paper: { price: 45000, sale_price: 40000, sale_percent: 11 },
    online: { price: 25000, sale_price: 20000, sale_percent: 20 },
    audio: { price: 35000, sale_price: 30000, sale_percent: 14 },
    views: 800
  }
];
