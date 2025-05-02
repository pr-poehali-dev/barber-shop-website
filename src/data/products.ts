
import { Product } from "@/types/product";

export const productData: Product[] = [
  {
    id: 1,
    name: "Шампунь для сухих волос",
    brand: "ProHair",
    description: "Шампунь для сухих и поврежденных волос обеспечивает глубокое увлажнение, питание и восстановление структуры волос. Содержит комплекс витаминов и натуральных масел, которые защищают волосы от внешних воздействий.",
    shortDescription: "Увлажняющий шампунь для сухих и поврежденных волос с комплексом витаминов и натуральных масел.",
    price: 1200,
    category: "Шампуни",
    image: "https://images.unsplash.com/photo-1619021015210-3a39c84141ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1320&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1619021015210-3a39c84141ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1320&q=80",
      "https://images.unsplash.com/photo-1619021015381-e9c9c65edc46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1320&q=80"
    ],
    inStock: true,
    popularity: 4.5,
    attributes: {
      "Объем": "250 мл",
      "Тип волос": "Сухие и поврежденные",
      "Состав": "Натуральные масла, витамины A, E, F"
    }
  },
  {
    id: 2,
    name: "Увлажняющая маска для волос",
    brand: "BeautyLab",
    description: "Интенсивная увлажняющая маска для всех типов волос. Глубоко питает, восстанавливает поврежденную структуру, придает блеск и эластичность. Содержит кератин, протеины шелка и кокосовое масло.",
    price: 1800,
    category: "Маски",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1320&q=80",
    inStock: true,
    popularity: 4.8,
    attributes: {
      "Объем": "200 мл",
      "Тип волос": "Все типы",
      "Состав": "Кератин, протеины шелка, кокосовое масло"
    }
  },
  {
    id: 3,
    name: "Питательное масло для волос",
    brand: "NaturalHair",
    description: "Питательное масло для кончиков волос с аргановым маслом и витамином E. Предотвращает сечение, защищает от высоких температур и УФ-излучения, придает блеск и гладкость.",
    price: 1500,
    category: "Масла и сыворотки",
    image: "https://images.unsplash.com/photo-1590393802688-ab3fd7c152d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1320&q=80",
    inStock: true,
    popularity: 4.6,
    attributes: {
      "Объем": "50 мл",
      "Тип волос": "Сухие, поврежденные",
      "Состав": "Аргановое масло, витамин E, экстракт жожоба"
    }
  },
  {
    id: 4,
    name: "Кондиционер для окрашенных волос",
    brand: "ColorProtect",
    description: "Кондиционер специально разработан для ухода за окрашенными волосами. Продлевает стойкость цвета, предотвращает вымывание пигмента, увлажняет и защищает от повреждений.",
    price: 1350,
    category: "Кондиционеры",
    image: "https://images.unsplash.com/photo-1635015992974-aea9300c4c6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1320&q=80",
    inStock: true,
    popularity: 4.4,
    attributes: {
      "Объем": "300 мл",
      "Тип волос": "Окрашенные",
      "Состав": "УФ-фильтр, экстракт граната, протеины пшеницы"
    }
  },
  {
    id: 5,
    name: "Спрей для термозащиты",
    brand: "HeatDefense",
    description: "Спрей для защиты волос при использовании термоинструментов. Предотвращает повреждения, запечатывает кутикулу, облегчает расчесывание и укладку волос.",
    price: 980,
    category: "Стайлинг",
    image: "https://images.unsplash.com/photo-1611604267462-78208f197e0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1320&q=80",
    inStock: true,
    popularity: 4.3,
    attributes: {
      "Объем": "150 мл",
      "Тип волос": "Все типы",
      "Состав": "Силиконовый комплекс, экстракт алоэ, пантенол"
    }
  },
  {
    id: 6,
    name: "Профессиональная кисть для окрашивания",
    brand: "ProTools",
    description: "Профессиональная кисть для окрашивания волос с удобной ручкой. Обеспечивает равномерное нанесение красителя, устойчива к агрессивным компонентам.",
    price: 650,
    category: "Инструменты",
    image: "https://images.unsplash.com/photo-1537473233007-d8c6c5953a10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1320&q=80",
    inStock: true,
    popularity: 4.2,
    attributes: {
      "Материал": "Нейлон, пластик",
      "Размер": "Средний",
      "Особенности": "Устойчива к химическим компонентам, эргономичная ручка"
    }
  },
  {
    id: 7,
    name: "Сухой шампунь",
    brand: "QuickFresh",
    description: "Сухой шампунь мгновенного действия. Освежает волосы между мытьем, поглощает излишки себума, придает объем и свежесть волосам. Имеет легкий цитрусовый аромат.",
    price: 890,
    category: "Шампуни",
    image: "https://images.unsplash.com/photo-1522337442083-d2a2cd432e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1320&q=80",
    inStock: true,
    popularity: 4.1,
    attributes: {
      "Объем": "200 мл",
      "Тип волос": "Все типы",
      "Состав": "Крахмал, абсорбирующие компоненты, эфирные масла"
    }
  },
  {
    id: 8,
    name: "Фен профессиональный",
    brand: "SalonPro",
    description: "Профессиональный фен с мощным мотором и несколькими режимами работы. Быстро высушивает волосы, защищая их от перегрева, имеет концентратор и диффузор в комплекте.",
    price: 5600,
    category: "Инструменты",
    image: "https://images.unsplash.com/photo-1590014085538-47672b7294ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1320&q=80",
    inStock: true,
    popularity: 4.9,
    attributes: {
      "Мощность": "2200 Вт",
      "Режимы": "3 скорости, 3 температуры",
      "Особенности": "Ионизация, холодный обдув, концентратор, диффузор"
    }
  }
];
