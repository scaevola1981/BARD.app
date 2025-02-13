const cardData = [
  {
    id: 1,
    judet: "Alba",
    cities: ["Alba Iulia"], // Un singur oraș
    comune: ["Galda de Jos"], // O singură comună
    eventDescription: "Târg de imobiliare în Alba.",
    categories: ["Imobiliare"],
    title: "Anunțuri în Alba",
    image: "./foto-icons/logo-imobiliare.png"
  },
  {
    id: 2,
    judet: "Arad",
    cities: ["Arad"], // Un singur oraș
    comune: ["Fântânele"], // O singură comună
    eventDescription: "Vânzare de echipamente IT în Arad.",
    categories: ["IT și Software"],
    title: "Anunțuri în Arad",
    image: "./foto-icons/logo-it.png"
  },
  {
    id: 3,
    judet: "Argeș",
    cities: ["Pitești"], // Un singur oraș
    comune: ["Băiculești"], // O singură comună
    eventDescription: "Eveniment de modă în Pitești.",
    categories: ["Modă"],
    title: "Anunțuri în Argeș",
    image: "./foto-icons/logo-fashion.png"
  },
  {
    id: 4,
    judet: "Bacău",
    cities: ["Bacău"], // Un singur oraș
    comune: ["Colonești"], // O singură comună
    eventDescription: "Târg de electronice în Bacău.",
    categories: ["Electronice"],
    title: "Anunțuri în Bacău",
    image: "./foto-icons/logo-electronic.png"
  },
  {
    id: 5,
    judet: "Bihor",
    cities: ["Oradea"], // Un singur oraș
    comune: ["Diosig"], // O singură comună
    eventDescription: "Expoziție de produse alimentare în Oradea.",
    categories: ["Produse Alimentare"],
    title: "Anunțuri în Bihor",
    image: "./foto-icons/logo-food.png"
  },
  {
    id: 6,
    judet: "Bistrița-Năsăud",
    cities: ["Bistrița"], // Un singur oraș
    comune: ["Dumitra"], // O singură comună
    eventDescription: "Târg de animale de companie ",
    categories: ["Animale"],
    title: "Anunțuri în Bistrița-Năsăud",
    image: "./foto-icons/logo-animals.png"
  },
  {
    id: 7,
    judet: "Brașov",
    cities: ["Brașov"], // Un singur oraș
    comune: ["Rupea"], // O singură comună
    eventDescription: "Eveniment de imobiliare în Brașov.",
    categories: ["Imobiliare"],
    title: "Anunțuri în Brașov",
    image: "./foto-icons/logo-imobiliare.png"
  },
  {
    id: 8,
    judet: "București",
    cities: ["Sector 1"], // Un singur oraș
    comune: ["Voluntari"], // O singură comună
    eventDescription: "Conferință IT în București.",
    categories: ["IT și Software"],
    title: "Anunțuri în București",
    image: "./foto-icons/logo-it.png"
  },
  {
    id: 9,
    judet: "Cluj",
    cities: ["Cluj-Napoca"], // Un singur oraș
    comune: ["Feleacu"], // O singură comună
    eventDescription: "Târg de modă în Cluj-Napoca.",
    categories: ["Modă"],
    title: "Anunțuri în Cluj",
    image: "./foto-icons/logo-fashion.png"
  },
  {
    id: 10,
    judet: "Constanța",
    cities: ["Constanța"], // Un singur oraș
    comune: ["Lumina"], // O singură comună
    eventDescription: "Eveniment echipamente IT în Constanța.",
    categories: ["Echipamente"],
    title: "Anunțuri în Constanța",
    image: "./foto-icons/logo-equipment.png"
  },
  {
    id: 11,
    judet: "Dolj",
    cities: ["Craiova"], // Un singur oraș
    comune: ["Cetate"], // O singură comună
    eventDescription: "Eveniment imobiliare în Craiova.",
    categories: ["Imobiliare"],
    title: "Anunțuri în Dolj",
    image: "./foto-icons/logo-imobiliare.png"
  },
  {
    id: 12,
    judet: "Galați",
    cities: ["Galați"], // Un singur oraș
    comune: ["Liești"], // O singură comună
    eventDescription: "Expoziție electronice în Galați.",
    categories: ["Electronice"],
    title: "Anunțuri în Galați",
    image: "./foto-icons/logo-electronic.png"
  },
  {
    id: 13,
    judet: "Iași",
    cities: ["Iași"], // Un singur oraș
    comune: ["Ciurea"], // O singură comună
    eventDescription: "Eveniment de modă în Iași.",
    categories: ["Modă"],
    title: "Anunțuri în Iași",
    image: "./foto-icons/logo-fashion.png"
  },
  {
    id: 14,
    judet: "Ilfov",
    cities: ["Otopeni"], // Un singur oraș
    comune: ["Afumați"], // O singură comună
    eventDescription: "Târg de animale de companie în Ilfov.",
    categories: ["Animale"],
    title: "Anunțuri în Ilfov",
    image: "./foto-icons/logo-animals.png"
  },
  {
    id: 15,
    judet: "Maramureș",
    cities: ["Baia Mare"], // Un singur oraș
    comune: ["Moisei"], // O singură comună
    eventDescription: "Eveniment echipamente IT în Baia Mare.",
    categories: ["Echipamente"],
    title: "Anunțuri în Maramureș",
    image: "./foto-icons/logo-equipment.png"
  },
  {
    id: 16,
    judet: "Mehedinți",
    cities: ["Drobeta-Turnu Severin"], // Un singur oraș
    comune: ["Șimian"], // O singură comună
    eventDescription: "Expoziție de imobiliare în Drobeta-Turnu Severin.",
    categories: ["Imobiliare"],
    title: "Anunțuri în Mehedinți",
    image: "./foto-icons/logo-imobiliare.png"
  },
  {
    id: 17,
    judet: "Mureș",
    cities: ["Târgu Mureș"], // Un singur oraș
    comune: ["Luduș"], // O singură comună
    eventDescription: "Târg de produse alimentare în Târgu Mureș.",
    categories: ["Produse Alimentare"],
    title: "Anunțuri în Mureș",
    image: "./foto-icons/logo-food.png"
  },
  {
    id: 18,
    judet: "Neamț",
    cities: ["Piatra Neamț"], // Un singur oraș
    comune: ["Bicaz"], // O singură comună
    eventDescription: "Eveniment de modă în Piatra Neamț.",
    categories: ["Modă"],
    title: "Anunțuri în Neamț",
    image: "./foto-icons/logo-fashion.png"
  },
  {
    id: 19,
    judet: "Olt",
    cities: ["Slatina"], // Un singur oraș
    comune: ["Scornicești"], // O singură comună
    eventDescription: "Vânzare de electronice în Slatina.",
    categories: ["Electronice"],
    title: "Anunțuri în Olt",
    image: "./foto-icons/logo-electronic.png"
  },
  {
    id: 20,
    judet: "Prahova",
    cities: ["Ploiești"], // Un singur oraș
    comune: ["Măneciu"], // O singură comună
    eventDescription: "Târg imobiliare în Ploiești.",
    categories: ["Imobiliare"],
    title: "Anunțuri în Prahova",
    image: "./foto-icons/logo-imobiliare.png"
  },
  {
    id: 21,
    judet: "Sălaj",
    cities: ["Zalău"], // Un singur oraș
    comune: ["Măieruș"], // O singură comună
    eventDescription: "Expoziție de produse locale în Zalău.",
    categories: ["Produse locale"],
    title: "Anunțuri în Sălaj",
    image: "./foto-icons/logo-food.png"
  },
  {
    id: 22,
    judet: "Sibiu",
    cities: ["Sibiu"], // Un singur oraș
    comune: ["Rășinari"], // O singură comună
    eventDescription: "Festival de muzică în Sibiu.",
    categories: ["Muzică"],
    title: "Anunțuri în Sibiu",
    image: "./foto-icons/logo-books.png"
  },
  {
    id: 23,
    judet: "Suceava",
    cities: ["Suceava"], // Un singur oraș
    comune: ["Gura Humorului"], // O singură comună
    eventDescription: "Târg de artizanat în Suceava.",
    categories: ["Artizanat"],
    title: "Anunțuri în Suceava",
    image: "./foto-icons/logo-hobby.png"
  },
  {
    id: 24,
    judet: "Teleorman",
    cities: ["Alexandria"], // Un singur oraș
    comune: ["Zimnicea"], // O singură comună
    eventDescription: "Festival al culturii în Alexandria.",
    categories: ["Cultură"],
    title: "Anunțuri în Teleorman",
    image: "./foto-icons/logo-books.png"
  },
  {
    id: 25,
    judet: "Timiș",
    cities: ["Timișoara"], // Un singur oraș
    comune: ["Moșnița Nouă"], // O singură comună
    eventDescription: "Eveniment gastronomic în Timișoara.",
    categories: ["Gastronomie"],
    title: "Anunțuri în Timiș",
    image: "./foto-icons/logo-food.png"
  },
  {
    id: 26,
    judet: "Tulcea",
    cities: ["Tulcea"], // Un singur oraș
    comune: ["Isaccea"], // O singură comună
    eventDescription: "Expoziție de pește în Tulcea.",
    categories: ["Pește și produse marine"],
    title: "Anunțuri în Tulcea",
    image: "./foto-icons/logo-food.png"
  },
  {
    id: 27,
    judet: "Vaslui",
    cities: ["Vaslui"], // Un singur oraș
    comune: ["Negrești"], // O singură comună
    eventDescription: "Târg de produse tradiționale în Vaslui.",
    categories: ["Produse tradiționale"],
    title: "Anunțuri în Vaslui",
    image: "./foto-icons/logo-food.png"
  },
  {
    id: 28,
    judet: "Vâlcea",
    cities: ["Râmnicu Vâlcea"], // Un singur oraș
    comune: ["Măldărești"], // O singură comună
    eventDescription: "Festival de teatru în Râmnicu Vâlcea.",
    categories: ["Teatru"],
    title: "Anunțuri în Vâlcea",
    image: "./foto-icons/logo-books.png"
  },
  {
    id: 29,
    judet: "Zalău",
    cities: ["Zalău"], // Un singur oraș
    comune: ["Măieruș"], // O singură comună
    eventDescription: "Festival gastronomic în Zalău.",
    categories: ["Gastronomie"],
    title: "Anunțuri în Zalău",
    image: "./foto-icons/logo-food.png"
  },
  {
    id: 30,
    judet: "Alba Iulia",
    cities: ["Alba Iulia"], // Un singur oraș
    comune: ["Galda de Jos"], // O singură comună
    eventDescription: "Târg de antichități în Alba Iulia.",
    categories: ["Antichități"],
    title: "Anunțuri în Alba Iulia",
    image: "./foto-icons/logo-antiques.png"
  }
];

export default cardData;
  