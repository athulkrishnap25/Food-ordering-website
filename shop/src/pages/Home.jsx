import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import CategoryCard from "../components/CategoryCard";
import FoodCard from "../components/FoodCards.jsx";
import BottomNav from "../components/BottomNav";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

const ALL_WEBSITE_FOODS = [
  {
    foodName: "Gulab Jamun",
    foodPrice: "₹150.00",
    foodDescription:
      "Deep-fried milk solids balls soaked in a light, sweet, and aromatic sugar syrup.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.pUZBr5_gk2K3Z3dvQlML1gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    foodName: "Rasgulla",
    foodPrice: "₹160.00",
    foodDescription: "Spongy cottage cheese balls cooked in light sugar syrup.",
    image:
      "https://madhurasrecipe.com/wp-content/uploads/2023/10/Rasgulla-Featured-Image.jpg",
  },
  {
    foodName: "Tiramisu",
    foodPrice: "₹400.00",
    foodDescription:
      "A classic Italian dessert made of coffee-soaked ladyfingers and mascarpone cream.",
    image:
      "https://www.cookingclassy.com/wp-content/uploads/2022/08/tiramisu-17-1024x1536.jpg",
  },
  {
    foodName: "Caramel Custard",
    foodPrice: "₹220.00",
    foodDescription:
      "Creamy, smooth custard dessert topped with a layer of soft caramel.",
    image:
      "https://www.tasteofhome.com/wp-content/uploads/2018/01/Caramel-Custard_EXPS_DIYD20_3136_E07_29_9b.jpg",
  },
  {
    foodName: "Chicken Hakka Noodles",
    foodPrice: "₹250.00",
    foodDescription:
      "Stir-fried noodles with shredded chicken and mixed vegetables.",
    image:
      "https://www.spiritofindiapattaya.com/wp-content/uploads/2023/01/Chicken-Hakka-Noodles.jpg",
  },
  {
    foodName: "Veg Manchurian Dry",
    foodPrice: "₹220.00",
    foodDescription:
      "Crispy vegetable balls tossed in a spicy, tangy Manchurian sauce.",
    image:
      "https://vegecravings.com/wp-content/uploads/2017/03/veg-manchurian-dry-recipe-step-by-step-instructions-10.jpg",
  },
  {
    foodName: "Chilli Paneer Gravy",
    foodPrice: "₹300.00",
    foodDescription:
      "Fried paneer cubes cooked with onions, capsicum, and a savory sauce.",
    image:
      "https://www.dissdash.com/wp-content/uploads/2020/05/chilli-paneer.jpg",
  },
  {
    foodName: "Prawn Fried Rice",
    foodPrice: "₹350.00",
    foodDescription:
      "Wok-tossed rice with fresh prawns, scrambled egg, and scallions.",
    image:
      "https://www.licious.in/blog/wp-content/uploads/2022/07/shutterstock_1582779079.jpg",
  },
  {
    foodName: "Beef Stir Fry",
    foodPrice: "₹420.00",
    foodDescription:
      "Thin slices of beef stir-fried with broccoli and ginger-soy sauce.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.9L_9bPaV-JJDueQ0hBwj5QAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    foodName: "Chicken Lollipop",
    foodPrice: "₹280.00",
    foodDescription: "Spicy, deep-fried chicken wings shaped like lollipops.",
    image:
      "https://purendesi.in/wp-content/uploads/2024/05/Chicken-Lollipop-Recipe.jpg",
  },
  {
    foodName: "Cumin Lamb",
    foodPrice: "₹580.00",
    foodDescription: "Spicy, tender lamb cooked with cumin and other spices.",
    image:
      "https://feed-your-sole.com/wp-content/uploads/2020/07/Chinese-Cumin-Lamb-Recipe-1024x768.png",
  },
  {
    foodName: "Kerala Sadya",
    foodPrice: "₹350.00",
    foodDescription:
      "Traditional feast of 24+ vegetarian dishes served on banana leaf.",
    image: "https://www.keralatourism.org/images/cuisine/sadya-1024x576.jpg",
  },
  {
    foodName: "Dosa and Sambar",
    foodPrice: "₹120.00",
    foodDescription:
      "Crispy savory crepe served with lentil stew and coconut chutney.",
    image: "https://i.redd.it/244nqsm9fgnz.jpg",
  },
  {
    foodName: "Appam with Stew",
    foodPrice: "₹150.00",
    foodDescription:
      "Soft, lace-rimmed pancakes paired with mildly spiced coconut milk stew.",
    image:
      "https://images.slurrp.com/prodarticles/ln1j9x0luf.webp?impolicy=slurrp-20210601&width=1200&height=900&q=75",
  },
  {
    foodName: "Puttu with Kadala Curry",
    foodPrice: "₹100.00",
    foodDescription: "Steamed rice flour cylinders with black chickpea curry.",
    image: "https://i.ytimg.com/vi/e2kxi7BxvLs/maxresdefault.jpg",
  },
  {
    foodName: "Meen Curry",
    foodPrice: "₹230.00",
    foodDescription:
      "Tangy fish curry with tamarind and coconut oil tempering.",
    image:
      "https://melam.com/wp-content/uploads/2022/12/alappuzha-meen-curry.jpg",
  },
  {
    foodName: "Chicken Chettinad",
    foodPrice: "₹380.00",
    foodDescription:
      "Spicy, aromatic chicken dish from the Chettinad region of Tamil Nadu.",
    image:
      "https://www.funfoodfrolic.com/wp-content/uploads/2020/11/Chicken-Chettinad-Thumbnail.jpg",
  },
  {
    foodName: "Mutton Pepper Fry",
    foodPrice: "₹580.00",
    foodDescription:
      "Spicy, aromatic mutton dish from the Chettinad region of Tamil Nadu.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.lT5PyO-YDGL3v_6dmbEgBwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    foodName: "Beef Chettinad",
    foodPrice: "₹480.00",
    foodDescription:
      "Spicy, aromatic beef dish from the Chettinad region of Tamil Nadu.",
    image:
      "https://cdn.shopify.com/s/files/1/2313/8987/articles/Screen_Shot_2020-10-06_at_9.15.34_pm_1000x1000.png?v=1625548246",
  },
  {
    foodName: "Chicken Mandi",
    foodPrice: "₹650.00",
    foodDescription:
      "Traditional Yemeni dish of rice and chicken cooked in a deep pit.",
    image:
      "https://img.freepik.com/premium-photo/close-up-chicken-mandi-rice-dish-generative-ai_786587-4197.jpg?w=2000",
  },
  {
    foodName: "Lamb Kabsa",
    foodPrice: "₹800.00",
    foodDescription:
      "Aromatic mixed rice dish, commonly regarded as the national dish of Saudi Arabia.",
    image:
      "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2023/04/15/3773861-571269809.jpg?itok=pgy9HiVz",
  },
  {
    foodName: "Falafel Wrap",
    foodPrice: "₹200.00",
    foodDescription:
      "Deep-fried balls made from ground chickpeas, served wrapped in pita bread.",
    image: "https://recipes.timesofindia.com/photo/62708678.cms",
  },
  {
    foodName: "Hummus with Pita",
    foodPrice: "₹150.00",
    foodDescription:
      "Chickpea dip mixed with tahini, lemon juice, and garlic, served with warm bread.",
    image:
      "https://s3-us-east-2.amazonaws.com/electroluxarabia/wp-content/uploads/hummus-with-pita-bread.jpg",
  },
  {
    foodName: "Beef Kabsa",
    foodPrice: "₹550.00",
    foodDescription:
      "Aromatic rice dish cooked with tender beef and a blend of spices.",
    image:
      "https://th.bing.com/th/id/R.d3444cc6860be2e1687392ec18427e86?rik=wlo4JJ62di%2bmCg&riu=http%3a%2f%2f2.bp.blogspot.com%2f-z00WmFBciRs%2fVmZ8fcb8SJI%2fAAAAAAAACho%2fzCJJRVvFIRk%2fs1600%2f2015-12-08_09.07.27.jpg&ehk=LCL4N94eUi%2b1%2bCgT%2bv2eQ9ZMfgsq46d0jONwGkXWpys%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    foodName: "Chicken Tikka Masala",
    foodPrice: "₹400.00",
    foodDescription:
      "Classic Indian dish with tender chicken in a creamy tomato sauce.",
    image:
      "https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Tikka-Masala-min.jpg",
  },
  {
    foodName: "Spicy Beef Burger",
    foodPrice: "₹350.00",
    foodDescription:
      "Juicy beef patty topped with jalapeños, pepper jack, and a spicy mayo.",
    image:
      "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/pf-edgarcastrejon2-burger-018.jpg?w=400&dpr=1&fit=default&crop=default&auto=format&fm=pjpg&q=75&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-1.1.1&s=b45744391b6a95bed5528dd93ae318c7",
  },
  {
    foodName: "Veggie Spring Rolls",
    foodPrice: "₹120.00",
    foodDescription:
      "Crispy fried rolls filled with fresh cabbage, carrots, and glass noodles.",
    image:
      "https://www.connoisseurusveg.com/wp-content/uploads/2022/04/baked-spring-rolls-sq.jpg",
  },
  {
    foodName: "Parotta with Beef Curry",
    foodPrice: "₹180.00",
    foodDescription:
      "Flaky layered parotta served with spicy Kerala beef curry.",
    image: "https://i.redd.it/ixmmb8ufajq61.jpg",
  },
  {
    foodName: "Appam with Stew",
    foodPrice: "₹150.00",
    foodDescription:
      "Soft lacy appam paired with mildly spiced coconut milk stew.",
    image:
      "https://images.slurrp.com/prodarticles/ln1j9x0luf.webp?impolicy=slurrp-20210601&width=1200&height=900&q=75",
  },
  {
    foodName: "Puttu with Kadala Curry",
    foodPrice: "₹100.00",
    foodDescription: "Steamed rice flour cylinders with black chickpea curry.",
    image: "https://i.ytimg.com/vi/e2kxi7BxvLs/maxresdefault.jpg",
  },
  {
    foodName: "Fish Moilee",
    foodPrice: "₹220.00",
    foodDescription: "Fish simmered in creamy coconut milk with subtle spices.",
    image:
      "https://cdn.grofers.com/assets/search/usecase/banner/kerala_fish_moilee_01.png",
  },
  {
    foodName: "Kerala Sadya",
    foodPrice: "₹350.00",
    foodDescription:
      "Traditional feast of 24+ vegetarian dishes served on banana leaf.",
    image: "https://www.keralatourism.org/images/cuisine/sadya-1024x576.jpg",
  },
  {
    foodName: "Erachi Varutharacha",
    foodPrice: "₹210.00",
    foodDescription: "Beef cooked in roasted coconut and spices, Kerala style.",
    image:
      "https://www.slurrp.com/web/_next/image?url=https:%2F%2Fimages.slurrp.com%2Fprod%2Frecipe_images%2Ftranscribe%2Fmain%20course%2FErachi-Varutharacha-Curry.webp%3Fimpolicy%3Dslurrp-20210601%26width%3D1200%26height%3D675&w=3840&q=75",
  },
  {
    foodName: "Kerala Prawn Roast",
    foodPrice: "₹250.00",
    foodDescription:
      "Spicy prawns roasted with onions, curry leaves, and coconut oil.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.fulpzb-ClUFHoH8K5S102gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    foodName: "Karimeen Pollichathu",
    foodPrice: "₹300.00",
    foodDescription: "Pearl spot fish marinated and wrapped in banana leaf.",
    image:
      "https://www.krazybutterfly.com/wp-content/uploads/2022/01/Niraamaya-Karimeen-Pollichathu-e1643300273851.jpg",
  },
  {
    foodName: "Kerala Chicken Fry",
    foodPrice: "₹180.00",
    foodDescription:
      "Deep-fried chicken pieces with Kerala spices and curry leaves.",
    image:
      "https://hungryforever.net/wp-content/uploads/2018/01/kerala-style-chicken-fry-600x286.jpg",
  },
  {
    foodName: "Idiyappam Egg Curry",
    foodPrice: "₹160.00",
    foodDescription: "String hoppers served with spicy Kerala-style egg curry.",
    image:
      "https://images.slurrp.com/prod/articles/j67tfxujzj.webp?impolicy=slurrp-20210601&width=1200&height=900&q=75",
  },
  {
    foodName: "Nadan Kozhi Curry",
    foodPrice: "₹190.00",
    foodDescription:
      "Traditional Kerala chicken curry cooked with coconut oil.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.ImZKCamYQWQlrd5ODdsB9QHaLG?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    foodName: "Avial",
    foodPrice: "₹120.00",
    foodDescription:
      "Mixed vegetables cooked with coconut, yogurt, and curry leaves.",
    image:
      "https://www.masalakorb.com/wp-content/uploads/2021/06/Easy-Aviyal-Recipe-Aviyal-Curry-V1.jpeg",
  },
  {
    foodName: "Thalassery Biryani",
    foodPrice: "₹280.00",
    foodDescription:
      "Fragrant biryani from Malabar made with short-grain rice.",
    image:
      "https://4.bp.blogspot.com/-ki7mtItaI4I/WAE0421NZaI/AAAAAAAAAnk/1suTKwebHBYz-XPe07rUhJ2nj9OyZGj3ACLcB/s1600/z15.jpg",
  },
  {
    foodName: "Meen Curry",
    foodPrice: "₹230.00",
    foodDescription:
      "Tangy fish curry with tamarind and coconut oil tempering.",
    image:
      "https://melam.com/wp-content/uploads/2022/12/alappuzha-meen-curry.jpg",
  },

  {
    foodName: "Chicken Tikka Masala",
    foodPrice: "₹400.00",
    foodDescription:
      "Classic Indian dish with tender chicken in a creamy tomato sauce.",
    image:
      "https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Tikka-Masala-min.jpg",
  },
  {
    foodName: "Spicy Beef Burger",
    foodPrice: "₹350.00",
    foodDescription:
      "Juicy beef patty topped with jalapeños, pepper jack, and a spicy mayo.",
    image:
      "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/pf-edgarcastrejon2-burger-018.jpg?w=400&dpr=1&fit=default&crop=default&auto=format&fm=pjpg&q=75&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-1.1.1&s=b45744391b6a95bed5528dd93ae318c7",
  },
  {
    foodName: "Veggie Spring Rolls",
    foodPrice: "₹120.00",
    foodDescription:
      "Crispy fried rolls filled with fresh cabbage, carrots, and glass noodles.",
    image:
      "https://www.connoisseurusveg.com/wp-content/uploads/2022/04/baked-spring-rolls-sq.jpg",
  },
  {
    foodName: "Parotta with Beef Curry",
    foodPrice: "₹180.00",
    foodDescription:
      "Flaky layered parotta served with spicy Kerala beef curry.",
    image: "https://i.redd.it/ixmmb8ufajq61.jpg",
  },
  {
    foodName: "Appam with Stew",
    foodPrice: "₹150.00",
    foodDescription:
      "Soft lacy appam paired with mildly spiced coconut milk stew.",
    image:
      "https://images.slurrp.com/prodarticles/ln1j9x0luf.webp?impolicy=slurrp-20210601&width=1200&height=900&q=75",
  },
  {
    foodName: "Puttu with Kadala Curry",
    foodPrice: "₹100.00",
    foodDescription: "Steamed rice flour cylinders with black chickpea curry.",
    image: "https://i.ytimg.com/vi/e2kxi7BxvLs/maxresdefault.jpg",
  },
  {
    foodName: "Fish Moilee",
    foodPrice: "₹220.00",
    foodDescription: "Fish simmered in creamy coconut milk with subtle spices.",
    image:
      "https://cdn.grofers.com/assets/search/usecase/banner/kerala_fish_moilee_01.png",
  },
  {
    foodName: "Kerala Sadya",
    foodPrice: "₹350.00",
    foodDescription:
      "Traditional feast of 24+ vegetarian dishes served on banana leaf.",
    image: "https://www.keralatourism.org/images/cuisine/sadya-1024x576.jpg",
  },
  {
    foodName: "Erachi Varutharacha",
    foodPrice: "₹210.00",
    foodDescription: "Beef cooked in roasted coconut and spices, Kerala style.",
    image:
      "https://www.slurrp.com/web/_next/image?url=https:%2F%2Fimages.slurrp.com%2Fprod%2Frecipe_images%2Ftranscribe%2Fmain%20course%2FErachi-Varutharacha-Curry.webp%3Fimpolicy%3Dslurrp-20210601%26width%3D1200%26height%3D675&w=3840&q=75",
  },
  {
    foodName: "Kerala Prawn Roast",
    foodPrice: "₹250.00",
    foodDescription:
      "Spicy prawns roasted with onions, curry leaves, and coconut oil.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.fulpzb-ClUFHoH8K5S102gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    foodName: "Karimeen Pollichathu",
    foodPrice: "₹300.00",
    foodDescription: "Pearl spot fish marinated and wrapped in banana leaf.",
    image:
      "https://www.krazybutterfly.com/wp-content/uploads/2022/01/Niraamaya-Karimeen-Pollichathu-e1643300273851.jpg",
  },
  {
    foodName: "Kerala Chicken Fry",
    foodPrice: "₹180.00",
    foodDescription:
      "Deep-fried chicken pieces with Kerala spices and curry leaves.",
    image:
      "https://hungryforever.net/wp-content/uploads/2018/01/kerala-style-chicken-fry-600x286.jpg",
  },
  {
    foodName: "Idiyappam Egg Curry",
    foodPrice: "₹160.00",
    foodDescription: "String hoppers served with spicy Kerala-style egg curry.",
    image:
      "https://images.slurrp.com/prod/articles/j67tfxujzj.webp?impolicy=slurrp-20210601&width=1200&height=900&q=75",
  },
  {
    foodName: "Nadan Kozhi Curry",
    foodPrice: "₹190.00",
    foodDescription:
      "Traditional Kerala chicken curry cooked with coconut oil.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.ImZKCamYQWQlrd5ODdsB9QHaLG?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    foodName: "Avial",
    foodPrice: "₹120.00",
    foodDescription:
      "Mixed vegetables cooked with coconut, yogurt, and curry leaves.",
    image:
      "https://www.masalakorb.com/wp-content/uploads/2021/06/Easy-Aviyal-Recipe-Aviyal-Curry-V1.jpeg",
  },
  {
    foodName: "Thalassery Biryani",
    foodPrice: "₹280.00",
    foodDescription:
      "Fragrant biryani from Malabar made with short-grain rice.",
    image:
      "https://4.bp.blogspot.com/-ki7mtItaI4I/WAE0421NZaI/AAAAAAAAAnk/1suTKwebHBYz-XPe07rUhJ2nj9OyZGj3ACLcB/s1600/z15.jpg",
  },
  {
    foodName: "Meen Curry",
    foodPrice: "₹230.00",
    foodDescription:
      "Tangy fish curry with tamarind and coconut oil tempering.",
    image:
      "https://melam.com/wp-content/uploads/2022/12/alappuzha-meen-curry.jpg",
  },
  {
    foodName: "Masala Chai",
    foodPrice: "₹50.00",
    foodDescription:
      "Traditional Indian tea brewed with milk, sugar, and aromatic spices.",
    image: "https://shivanilovesfood.com/wp-content/uploads/2022/08/Chai-6.jpg",
  },
  {
    foodName: "Fresh Lime Soda",
    foodPrice: "₹80.00",
    foodDescription:
      "Refreshing Indian drink made with lime juice, sugar, salt, and soda/water.",
    image:
      "https://www.thealigarhchef.com/wp-content/uploads/2021/05/fresh-lime-soda-sweet-salted-1024x1024-1.jpg",
  },
  {
    foodName: "Cold Coffee",
    foodPrice: "₹150.00",
    foodDescription:
      "Blended coffee with chilled milk and ice cream, served cold.",
    image:
      "https://rachnas-kitchen.com/wp-content/uploads/2017/07/cold-coffee-2.jpg",
  },
  {
    foodName: "Mango Lassi",
    foodPrice: "₹180.00",
    foodDescription:
      "Thick, creamy yogurt-based drink blended with ripe mango pulp.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.xpvyVy-U8LxqpDtCLZF2qAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    foodName: "Strawberry Mojito",
    foodPrice: "₹200.00",
    foodDescription:
      "Non-alcoholic mocktail with fresh strawberries, mint, lime, and soda.",
    image: "https://bakesbychichi.com/wp-content/uploads/2021/07/DSC_4890.jpg",
  },
];

export default function Home() {
  const { name } = useContext(UserContext);
  const { cartTotal } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [showSplash, setShowSplash] = useState(true);

  const categories = [
    {
      name: "North Indian",
      link: "/category/North-Indian",
      image:
        "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg",
    },
    {
      name: "Arabian",
      link: "/category/Arabian",
      image:
        "https://img.freepik.com/premium-photo/close-up-chicken-mandi-rice-dish-generative-ai_786587-4197.jpg?w=2000",
    },
    {
      name: "South Indian",
      link: "/category/SouthIndian",
      image:
        "https://assets.vogue.com/photos/63d169f727f1d528635b4287/master/w_2560%2Cc_limit/GettyImages-1292563627.jpg",
    },
    {
      name: "Chinese",
      link: "/category/Chinese",
      image:
        "https://cooksimply.co.uk/wp-content/uploads/2023/04/char-siu-air-fryer-cook-simply-600x404.jpg",
    },
    {
      name: "Desserts",
      link: "/category/Desserts",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.rdi8I9-zmOXzNZOgxxJc3wHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      name: "Beverages",
      link: "/category/Beverages",
      image:
        "https://img.freepik.com/premium-photo/different-beautiful-cocktails-dark-background-bar-counter-3d-illustration-generative-ai_170984-4736.jpg?w=2000",
    },
  ];

  const suggestedFoods = [
    {
      foodName: "Chicken Tikka Masala",
      foodPrice: "₹400.00",
      foodDescription:
        "Classic Indian dish with tender chicken in a creamy tomato sauce.",
      image:
        "https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Tikka-Masala-min.jpg",
    },
    {
      foodName: "Spicy Beef Burger",
      foodPrice: "₹350.00",
      foodDescription:
        "Juicy beef patty topped with jalapeños, pepper jack, and a spicy mayo.",
      image:
        "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/pf-edgarcastrejon2-burger-018.jpg?w=400&dpr=1&fit=default&crop=default&auto=format&fm=pjpg&q=75&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-1.1.1&s=b45744391b6a95bed5528dd93ae318c7",
    },
    {
      foodName: "Veggie Spring Rolls",
      foodPrice: "₹120.00",
      foodDescription:
        "Crispy fried rolls filled with fresh cabbage, carrots, and glass noodles.",
      image:
        "https://www.connoisseurusveg.com/wp-content/uploads/2022/04/baked-spring-rolls-sq.jpg",
    },
    {
      foodName: "Chocolate Fudge Cake",
      foodPrice: "₹450.00",
      foodDescription:
        "Rich, dense chocolate cake with a velvety smooth fudge frosting.",
      image:
        "https://www.hickoryfarms.com/on/demandware.static/-/Sites-Web-Master-Catalog/default/dw78363360/images/products/decadent-chocolate-fudge-layer-cake-064026-2.jpg",
    },
    {
      foodName: "Parotta with Beef Curry",
      foodPrice: "₹180.00",
      foodDescription:
        "Flaky layered parotta served with spicy Kerala beef curry.",
      image: "https://i.redd.it/ixmmb8ufajq61.jpg",
    },
    {
      foodName: "Appam with Stew",
      foodPrice: "₹150.00",
      foodDescription:
        "Soft lacy appam paired with mildly spiced coconut milk stew.",
      image:
        "https://images.slurrp.com/prodarticles/ln1j9x0luf.webp?impolicy=slurrp-20210601&width=1200&height=900&q=75",
    },
    {
      foodName: "Puttu with Kadala Curry",
      foodPrice: "₹105.00",
      foodDescription:
        "Steamed rice flour cylinders with black chickpea curry.",
      image: "https://i.ytimg.com/vi/e2kxi7BxvLs/maxresdefault.jpg",
    },
    {
      foodName: "Fish Moilee",
      foodPrice: "₹220.00",
      foodDescription:
        "Fish simmered in creamy coconut milk with subtle spices.",
      image:
        "https://cdn.grofers.com/assets/search/usecase/banner/kerala_fish_moilee_01.png",
    },
    {
      foodName: "Kerala Sadya",
      foodPrice: "₹350.00",
      foodDescription:
        "Traditional feast of 24+ vegetarian dishes served on banana leaf.",
      image: "https://www.keralatourism.org/images/cuisine/sadya-1024x576.jpg",
    },
    {
      foodName: "Erachi Varutharacha",
      foodPrice: "₹210.00",
      foodDescription:
        "Beef cooked in roasted coconut and spices, Kerala style.",
      image:
        "https://www.slurrp.com/web/_next/image?url=https:%2F%2Fimages.slurrp.com%2Fprod%2Frecipe_images%2Ftranscribe%2Fmain%20course%2FErachi-Varutharacha-Curry.webp%3Fimpolicy%3Dslurrp-20210601%26width%3D1200%26height%3D675&w=3840&q=75",
    },
    {
      foodName: "Kerala Prawn Roast",
      foodPrice: "₹250.00",
      foodDescription:
        "Spicy prawns roasted with onions, curry leaves, and coconut oil.",
      image:
        "https://tse3.mm.bing.net/th/id/OIP.fulpzb-ClUFHoH8K5S102gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      foodName: "Karimeen Pollichathu",
      foodPrice: "₹300.00",
      foodDescription: "Pearl spot fish marinated and wrapped in banana leaf.",
      image:
        "https://www.krazybutterfly.com/wp-content/uploads/2022/01/Niraamaya-Karimeen-Pollichathu-e1643300273851.jpg",
    },
    {
      foodName: "Kerala Chicken Fry",
      foodPrice: "₹180.00",
      foodDescription:
        "Deep-fried chicken pieces with Kerala spices and curry leaves.",
      image:
        "https://hungryforever.net/wp-content/uploads/2018/01/kerala-style-chicken-fry-600x286.jpg",
    },
    {
      foodName: "Idiyappam Egg Curry",
      foodPrice: "₹160.00",
      foodDescription:
        "String hoppers served with spicy Kerala-style egg curry.",
      image:
        "https://images.slurrp.com/prod/articles/j67tfxujzj.webp?impolicy=slurrp-20210601&width=1200&height=900&q=75",
    },
    {
      foodName: "Nadan Kozhi Curry",
      foodPrice: "₹190.00",
      foodDescription:
        "Traditional Kerala chicken curry cooked with coconut oil.",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.ImZKCamYQWQlrd5ODdsB9QHaLG?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      foodName: "Avial",
      foodPrice: "₹120.00",
      foodDescription:
        "Mixed vegetables cooked with coconut, yogurt, and curry leaves.",
      image:
        "https://www.masalakorb.com/wp-content/uploads/2021/06/Easy-Aviyal-Recipe-Aviyal-Curry-V1.jpeg",
    },
    {
      foodName: "Thalassery Biryani",
      foodPrice: "₹280.00",
      foodDescription:
        "Fragrant biryani from Malabar made with short-grain rice.",
      image:
        "https://4.bp.blogspot.com/-ki7mtItaI4I/WAE0421NZaI/AAAAAAAAAnk/1suTKwebHBYz-XPe07rUhJ2nj9OyZGj3ACLcB/s1600/z15.jpg",
    },
    {
      foodName: "Meen Curry",
      foodPrice: "₹230.00",
      foodDescription:
        "Tangy fish curry with tamarind and coconut oil tempering.",
      image:
        "https://melam.com/wp-content/uploads/2022/12/alappuzha-meen-curry.jpg",
    },
  ];

  const filteredFoods = suggestedFoods.filter((food) =>
    food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-gray-900 to-black text-white text-4xl font-bold transition-opacity duration-1000 opacity-100">
        Hello, {name ? name : "Guest"}!
      </div>
    );
  }

  return (
    <div className="relative w-screen bg-gradient-to-r from-gray-900 to-black text-white min-h-screen">
      <div className="flex justify-between items-center p-5">
        <h1 className="text-4xl font-bold text-left">QuickBite</h1>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative text-white">
            <FaShoppingCart className="w-7 h-7" />
            {cartTotal > 0 && (
              <span className="absolute top-[-8px] right-[-10px] bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartTotal}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="px-5 pb-5">
        <input
          type="text"
          placeholder="Search food by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:ring-red-500 focus:border-red-500 focus:outline-none transition duration-150"
        />
      </div>

      {searchTerm && filteredFoods.length === 0 && (
        <p className="text-center text-gray-400 text-lg mt-10">
          No results found for "{searchTerm}"
        </p>
      )}

      {!searchTerm && (
        <div className="flex items-center justify-center p-4">
          <div className="w-full">
            <Carousel />
          </div>
        </div>
      )}

      {!searchTerm && (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Categories</h1>
          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
            {categories.map((cat, index) => (
              <Link key={index} to={cat.link}>
                <CategoryCard image={cat.image} name={cat.name} />
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          {searchTerm ? "Search Results" : "Suggested For You "}
        </h1>
        <div className="p-4">
          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
            {filteredFoods
              .slice()
              .sort(() => (searchTerm ? 0 : Math.random() - 0.5))
              .map((food, index) => (
                <FoodCard
                  key={food.foodName}
                  image={food.image}
                  foodName={food.foodName}
                  foodPrice={food.foodPrice}
                  foodDescription={food.foodDescription}
                />
              ))}
          </div>
        </div>
      </div>

      {!searchTerm && (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Newly Added</h1>
          <div className="p-4">
            <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
              {suggestedFoods.map((food, index) => (
                <FoodCard
                  key={food.foodName}
                  image={food.image}
                  foodName={food.foodName}
                  foodPrice={food.foodPrice}
                  foodDescription={food.foodDescription}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Items</h1>
        <div className="p-4">
          <div className="grid **grid-cols-1** sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ALL_WEBSITE_FOODS.map((food, index) => (
              <FoodCard
                key={food.foodName}
                image={food.image}
                foodName={food.foodName}
                foodPrice={food.foodPrice}
                foodDescription={food.foodDescription}
              />
            ))}
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <BottomNav />
    </div>
  );
}
