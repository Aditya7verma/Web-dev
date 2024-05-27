const mongoose = require("mongoose");
const product = require("./models/product");

mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerece")
  .then(() => {
    console.log("DB-Connected");
  })
  .catch((e) => console.log(e));

const dummy_products = [
  {
    name: "Drone",
    img:
      "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRyb25lfGVufDB8fDB8fHww",
    price: 200,
    desc: "Ziria Foldable Toy Drone with HQ WiFi Camera Remote Control for Kids Quadcopter with Gesture Selfie, Flips Bounce Mode,",
  },
  {
    name: "Iphone",
    img:
      "https://images.unsplash.com/photo-1677563277026-17a254ea02f7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aXBob25lJTIwMTR8ZW58MHx8MHx8fDA%3D",
    price: 150,
    desc: "The iPhone 14 has a 6.1-inch Super Retina XDR OLED display with a resolution of 2532 x 1170 pixels and a 19.5:9 aspect ratio.",
  },
  {
    name: "Macbook",
    img:
      "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
    price: 200,
    desc: "The MacBook Pro features a sleek and durable design with a stunning Retina display that provides vibrant colors and crisp visuals.",
  },
  {
    name: "Sony bravia xr",
    img:
      "https://imgs.search.brave.com/EQXEHrsx1A9G-THXMPbdDwKWp7dYx4iiO9WTF8CwjvY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/OTFUdTRpZ1NVN0wu/anBn",
    price: 200,
    desc: "Sony BRAVIA XR is a series of TVs that utilize Cognitive Intelligence, a technology that mimics the human brain’s ability to detect and analyze visual and auditory information. ",
  },
  {
    name: "Nike Shoes",
    img:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TmlrZSUyMHNob2VzfGVufDB8fDB8fHww",
    price: 60,
    desc: "Designed for everyday wear, these shoes are comfortable and stylish.",
  },
  {
    name: "Armani Watch",
    img:
      "https://images.unsplash.com/photo-1619375052076-7a293c2a428f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJtYW5pJTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
    price: 320,
    desc: "Armani Watch is a luxury watch brand that offers a range of timepieces for both men and women. ",
  },
  {
    name: "Headphones",
    img:
 "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
    price: 220,     
    desc: "These headphones use Bluetooth or Wi-Fi connectivity to connect to devices, allowing for wireless listening.",
  },
];

async function seedDB() {
  await product.deleteMany({});
  await product.insertMany(dummy_products);
  console.log("DB seeded");
}

seedDB();
