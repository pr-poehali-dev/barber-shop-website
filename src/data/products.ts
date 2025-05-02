
export const productData = [
  {
    id: 1,
    name: "Шампунь для сухих волос",
    brand: "Kerastase",
    description: "Интенсивно увлажняющий шампунь для сухих и поврежденных волос. Восстанавливает структуру волос, придает им блеск и мягкость.",
    shortDescription: "Увлажняющий шампунь для восстановления сухих волос",
    price: 1500,
    discountPrice: 1800,
    category: "Шампуни",
    image: "https://images.unsplash.com/photo-1619021015210-3a39c84141ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1619021015210-3a39c84141ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1611323593752-f7fcefc939ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ],
    inStock: true,
    popularity: 4.8,
    attributes: {
      "Объем": "250 мл",
      "Тип волос": "Сухие и поврежденные",
      "Состав": "Аргановое масло, кератин, протеины шелка",
      "Страна производства": "Франция"
    },
    relatedProducts: [2, 3, 5]
  },
  {
    id: 2,
    name: "Маска для интенсивного увлажнения",
    brand: "Olaplex",
    description: "Глубоко увлажняющая маска, которая восстанавливает сухие и поврежденные волосы. Формула, обогащенная натуральными маслами и протеинами, глубоко проникает в структуру волоса, питая и увлажняя его изнутри.",
    price: 2500,
    category: "Маски",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    inStock: true,
    popularity: 4.9,
    attributes: {
      "Объем": "200 мл",
      "Тип волос": "Все типы",
      "Состав": "Масло ши, макадамии, авокадо, пептиды",
      "Страна производства": "США"
    }
  },
  {
    id: 3,
    name: "Масло для кончиков волос",
    brand: "Moroccanoil",
    description: "Легкое питательное масло, которое защищает кончики волос от сечения и придает им здоровый блеск. Формула на основе арганового масла не утяжеляет волосы и быстро впитывается.",
    price: 1800,
    category: "Масла",
    image: "https://images.unsplash.com/photo-1590393802688-ab3fd7c152d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    inStock: true,
    popularity: 4.7,
    attributes: {
      "Объем": "100 мл",
      "Тип волос": "Все типы",
      "Состав": "Аргановое масло, витамин Е, масло семян льна",
      "Страна производства": "Марокко"
    }
  },
  {
    id: 4,
    name: "Спрей для термозащиты",
    brand: "GHD",
    description: "Профессиональный спрей для защиты волос от высоких температур при укладке феном, утюжком или плойкой. Предотвращает повреждение волос, снижает пушистость и придает блеск.",
    price: 1300,
    category: "Стайлинг",
    image: "https://images.unsplash.com/photo-1643123917203-593a8867a339?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    inStock: false,
    popularity: 4.5,
    attributes: {
      "Объем": "150 мл",
      "Тип волос": "Все типы",
      "Защита до": "230°C",
      "Состав": "Протеины пшеницы, витамин В5, UV-фильтр",
      "Страна производства": "Великобритания"
    }
  },
  {
    id: 5,
    name: "Кондиционер для окрашенных волос",
    brand: "Wella Professionals",
    description: "Профессиональный кондиционер для ухода за окрашенными волосами. Сохраняет яркость цвета, увлажняет и придает блеск, защищает от UV-лучей и внешних воздействий.",
    price: 1200,
    category: "Кондиционеры",
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    inStock: true,
    popularity: 4.6,
    attributes: {
      "Объем": "250 мл",
      "Тип волос": "Окрашенные",
      "Состав": "Витамин Е, экстракт гибискуса, UV-фильтр",
      "Страна производства": "Германия"
    }
  },
  {
    id: 6,
    name: "Сыворотка против выпадения волос",
    brand: "Kerastase",
    description: "Интенсивная сыворотка, которая укрепляет волосяные фолликулы, стимулирует рост волос и предотвращает их выпадение. Формула обогащена активными компонентами для здоровья кожи головы.",
    price: 3500,
    category: "Сыворотки",
    image: "https://images.unsplash.com/photo-1608249522518-2186c97dda44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    inStock: true,
    popularity: 4.9,
    attributes: {
      "Объем": "60 мл",
      "Тип волос": "Все типы",
      "Применение": "Ежедневно на чистую кожу головы",
      "Состав": "Аминексил, экстракт имбиря, витамины группы B",
      "Страна производства": "Франция"
    }
  },
  {
    id: 7,
    name: "Лак для волос сильной фиксации",
    brand: "L'Oreal Professionnel",
    description: "Профессиональный лак для волос с сильной фиксацией. Надежно фиксирует прическу на длительное время, при этом не склеивает волосы и не оставляет видимых следов. Легко удаляется при расчесывании.",
    price: 950,
    category: "Стайлинг",
    image: "https://images.unsplash.com/photo-1559599126-4a886475355a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    inStock: true,
    popularity: 4.4,
    attributes: {
      "Объем": "300 мл",
      "Фиксация": "Сильная",
      "UV-защита": "Да",
      "Страна производства": "Франция"
    }
  },
  {
    id: 8,
    name: "Пилинг для кожи головы",
    brand: "Philip Kingsley",
    description: "Отшелушивающий пилинг для кожи головы, который удаляет омертвевшие клетки кожи, излишки себума и остатки стайлинг-средств. Восстанавливает баланс кожи головы и улучшает рост волос.",
    price: 2200,
    category: "Уход за кожей головы",
    image: "https://images.unsplash.com/photo-1610705267928-1b9f2fa7f1c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    inStock: true,
    popularity: 4.7,
    attributes: {
      "Объем": "150 мл",
      "Тип кожи": "Все типы",
      "Применение": "1-2 раза в неделю",
      "Состав": "Салициловая кислота, ментол, аллантоин",
      "Страна производства": "Великобритания"
    }
  }
];
