export const CATEGORIES = [
  {
    name: "Пиццы",
  },
  {
    name: "Завтрак",
  },
  {
    name: "Закуски",
  },
  {
    name: "Коктейли",
  },
  {
    name: "Напитки",
  },
];

export const INGREDIENTS = [
  {
    name: "Сырный бортик",
    price: 179,
    imageUrl: "/assets/images/ingredient1.png",
  },
  {
    name: "Сливочная моцарелла",
    price: 79,
    imageUrl: "/assets/images/ingredient2.png",
  },
  {
    name: "Сыры чеддер и пармезан",
    price: 79,
    imageUrl: "/assets/images/ingredient3.png",
  },
  {
    name: "Острый перец халапеньо",
    price: 59,
    imageUrl: "/assets/images/ingredient4.png",
  },
  {
    name: "Нежный цыпленок",
    price: 79,
    imageUrl: "/assets/images/ingredient5.png",
  },
  {
    name: "Шампиньоны",
    price: 59,
    imageUrl: "/assets/images/ingredient6.png",
  },
  {
    name: "Бекон",
    price: 79,
    imageUrl: "/assets/images/ingredient7.png",
  },
  {
    name: "Ветчина",
    price: 79,
    imageUrl: "/assets/images/ingredient8.png",
  },
  {
    name: "Пикантная пепперони",
    price: 79,
    imageUrl: "/assets/images/ingredient9.png",
  },
  {
    name: "Острая чоризо",
    price: 79,
    imageUrl: "/assets/images/ingredient10.png",
  },
  {
    name: "Маринованные огурчики",
    price: 59,
    imageUrl: "/assets/images/ingredient11.png",
  },
  {
    name: "Свежие томаты",
    price: 59,
    imageUrl: "/assets/images/ingredient12.png",
  },
  {
    name: "Красный лук",
    price: 59,
    imageUrl: "/assets/images/ingredient13.png",
  },
  {
    name: "Сочные ананасы",
    price: 59,
    imageUrl: "/assets/images/ingredient14.png",
  },
  {
    name: "Итальянские травы",
    price: 39,
    imageUrl: "/assets/images/ingredient15.png",
  },
  {
    name: "Сладкий перец",
    price: 59,
    imageUrl: "/assets/images/ingredient16.png",
  },
  {
    name: "Кубики брынзы",
    price: 79,
    imageUrl: "/assets/images/ingredient17.png",
  },
  {
    name: "Митболы",
    price: 79,
    imageUrl: "/assets/images/ingredient18.png",
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const PRODUCTS = [
  {
    name: "Омлет с ветчиной и грибами",
    imageUrl: "/assets/images/product1.webp",
    categoryId: 2,
  },
  {
    name: "Омлет с пепперони",
    imageUrl: "/assets/images/product16.webp",
    categoryId: 2,
  },
  {
    name: "Кофе Латте",
    imageUrl: "/assets/images/product15.webp",
    categoryId: 2,
  },
  {
    name: "Дэнвич ветчина и сыр",
    imageUrl: "/assets/images/product2.webp",
    categoryId: 3,
  },
  {
    name: "Куриные наггетсы",
    imageUrl: "/assets/images/product3.webp",
    categoryId: 3,
  },
  {
    name: "Картофель из печи с соусом 🌱",
    imageUrl: "/assets/images/product4.webp",
    categoryId: 3,
  },
  {
    name: "Додстер",
    imageUrl: "/assets/images/product5.webp",
    categoryId: 3,
  },
  {
    name: "Острый Додстер 🌶️🌶️",
    imageUrl: "/assets/images/product6.webp",
    categoryId: 3,
  },
  {
    name: "Банановый молочный коктейль",
    imageUrl: "/assets/images/product7.webp",
    categoryId: 4,
  },
  {
    name: "Карамельное яблоко молочный коктейль",
    imageUrl: "/assets/images/product8.webp",
    categoryId: 4,
  },
  {
    name: "Молочный коктейль с печеньем Орео",
    imageUrl: "/assets/images/product9.webp",
    categoryId: 4,
  },
  {
    name: "Классический молочный коктейль 👶",
    imageUrl: "/assets/images/product10.webp",
    categoryId: 4,
  },
  {
    name: "Ирландский Капучино",
    imageUrl: "/assets/images/product11.webp",
    categoryId: 5,
  },
  {
    name: "Кофе Карамельный капучино",
    imageUrl: "/assets/images/product12.webp",
    categoryId: 5,
  },
  {
    name: "Кофе Кокосовый латте",
    imageUrl: "/assets/images/product13.webp",
    categoryId: 5,
  },
  {
    name: "Кофе Американо",
    imageUrl: "/assets/images/product14.webp",
    categoryId: 5,
  },
  {
    name: "Кофе Латте",
    imageUrl: "/assets/images/product15.webp",
    categoryId: 5,
  },
];
