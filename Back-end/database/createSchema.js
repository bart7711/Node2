import { db } from "./createConnection.js";

const isInDeleteMode = true;

if (isInDeleteMode) {
    db.exec("DROP TABLE IF EXISTS users;");
    db.exec("DROP TABLE IF EXISTS items;");
    db.exec("DROP TABLE IF EXISTS orders;");
    db.exec("DROP TABLE IF EXISTS shopping_basket");
}

db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(150),
    email VARCHAR(150),
    password VARCHAR(100),
    resetToken VARCHAR(100),
    role VARCHAR(20)
);`);
db.exec(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(150),
    price INT,
    category VARCHAR(20),
    ammount INT,
    imageLink VARCHAR(500),
    user_id REFERENCES users (id),
    description VARCHAR(2000)

);`);

db.exec(`CREATE TABLE IF NOT EXISTS shopping_basket (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INT,
    item_id INT,
    ammount INT
);`);


db.exec(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INT,
    item_id INT,
    ammount INT
);`);


if (isInDeleteMode) {
    db.run(`INSERT INTO users (username,email,password,resetToken,role) VALUES ('bart', 'bartek007k@gmail.com', '$2b$10$yiI0FzY0p46qSl9DI7Acsua/UMEAxnFp0CpOdZ/kueW8ZUrZni.z6', null, 'vendor')`);
    const user0 = await db.get("SELECT id FROM users WHERE email=?", ['bartek007k@gmail.com']);

    db.run(`INSERT INTO users (username,email,password,resetToken,role) VALUES ('test', 'test@gmail.com', '$2b$10$yiI0FzY0p46qSl9DI7Acsua/UMEAxnFp0CpOdZ/kueW8ZUrZni.z6', null, 'buyer')`);
    const user1 = await db.get("SELECT id FROM users WHERE email=?", ['test@gmail.com']);

    db.run(`INSERT INTO users (username,email,password,resetToken,role) VALUES ('helo', 'hello@gmail.com', '$2b$10$yiI0FzY0p46qSl9DI7Acsua/UMEAxnFp0CpOdZ/kueW8ZUrZni.z6', null, 'buyer')`);
    const user2 = await db.get("SELECT id FROM users WHERE email=?", ['hello@gmail.com']);

    db.run(`INSERT INTO users (username,email,password,resetToken,role) VALUES ('random', 'random@gmail.com', '$2b$10$yiI0FzY0p46qSl9DI7Acsua/UMEAxnFp0CpOdZ/kueW8ZUrZni.z6', null, 'buyer')`);
    const user3 = await db.get("SELECT id FROM users WHERE email=?", ['random@gmail.com']);
    
    db.run(
        `INSERT INTO items (name,price,category,ammount,imageLink,user_id,description)
         VALUES ('Logitech G502',340,'mice',123,'https://www.elgiganten.dk/image/dv_web_D180001002713461/31579/logitech-g502-lightspeed-tradlos-gamingmus--pdp_zoom-3000--pdp_main-960.jpg',${user0.id},
         'The Logitech G502 Hero is a part of the G502 line, one of the best selling gaming mice on the market. The hero iteration brings the beloved hero sensor with 16,000 dpi to the table as well as a substantial 11 programmable buttons and additional optional weights for those that prefer a heavier mouse. This is a great choice for someone looking for a budget G502 version due to the wired connection.')`
      );
      db.run(
        `INSERT INTO items (name,price,category,ammount,imageLink,user_id,description)
         VALUES ('RTX 3060TI',3900,'GPU',15,'https://m.media-amazon.com/images/I/51l79r6-guS._AC_.jpg',${user0.id},
         'The GeForce RTX 3060 Ti is a high-end graphics card by NVIDIA, launched on December 1st, 2020. Built on the 8 nm process, and based on the GA104 graphics processor, in its GA104-200-A1 variant, the card supports DirectX 12 Ultimate. This ensures that all modern games will run on GeForce RTX 3060 TiAdditionally, the DirectX 12 Ultimate capability guarantees support for hardware-raytracing, variable-rate shading and more, in upcoming video games. The GA104 graphics processor is a large chip with a die area of 392 mm² and 17,400 million transistors.')`
      );

            
      db.run(
        `INSERT INTO items (name,price,category,ammount,imageLink,user_id,description)
         VALUES ('HyperX Cloud II gaming headset',440,'headphones',51,'https://www.elgiganten.dk/image/dv_web_D18000100251004/HYPXCLOUDIIRE/hyperx-cloud-ii-gaming-headset-rodsort--pdp_zoom-3000--pdp_main-960.jpg',${user0.id},
         'The HyperX Cloud II gaming headset opens up a world of detail with sound that other gamers will not know about. The USB sound card audio control box amplifies sound and voice for an optimal Hi-Fi gaming experience. Hear all the details you previously missed. The headset has a robust design with a steel frame and super comfortable earcups in imitation leather. The earcaps have high density memory foam, so you will experience exceptional comfort even in longer tournaments- Other features: - Compatible with Xbox One and Xbox Series X / S - Detachable noise-canceling microphone (3.5 mm connector) - Single 3.5 mm mini-jack cable (1 meter) - Detachable audio extension cable with single 3.5 mm mini-jacks for PC (2 meters)
         ')`
      );

      db.run(
        `INSERT INTO items (name,price,category,ammount,imageLink,user_id,description)
         VALUES ('Apple iPhone 13',3000,'phone',120,'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-max-blue-select?wid=940&hei=1112&fmt=png-alpha&.v=1645552346295',${user0.id},
         'There arent many design changes to differentiate the 2021 and 2020 iPhones beyond new color options and rearrangement of the camera module. However, the design differences are enough to require a new case since certain parts of the iPhone have moved. For example, the speaker grill is higher in the bezel now since the notch is slightly smaller.')`
      );

      db.run(
        `INSERT INTO items (name,price,category,ammount,imageLink,user_id,description)
         VALUES ('AK-47',7144,'gun',322,'https://m.media-amazon.com/images/I/71pHtTy-lHL._AC_SL1100_.jpg',${user0.id},
         'A gun')`
      );


      db.run(
        `INSERT INTO items (name,price,category,ammount,imageLink,user_id,description)
         VALUES ('APPLE MACBOOK PRO 13 512GB - SILVER',3400,'laptop',51,'https://files.refurbed.com/ii/apple-macbook-pro-2020-133-tb-1632128916.jpg?t=resize&h=600&w=800',${user0.id},
         'The Apple M1 chip completely changes the 13 MacBook Pro with up to 2.8x faster processing power, 1 5x faster graphics1 and up to 20 hours of battery life - the longest ever in a Mac. So you can do more for longer, no matter where you is.

         The Apple M1 chip sets completely new standards for the 13 MacBook Pro. With an 8-core CPU that can easily handle complex workflows in photography, coding, video editing and more. An impressive 8-core GPU that quickly gets through graphics-intensive tasks and provides gaming with super-smooth graphics. An advanced 16-core Neural Engine for greater machine learning power in your favorite applications. Lightning-fast overall memory that delivers fluid performance. And the longest battery life ever in a Mac of up to 20 hours.2 Its Apples most popular portable Pro model.Much more performance and much more Pro.
         
         ')`
      );

      db.run(
        `INSERT INTO items (name,price,category,ammount,imageLink,user_id,description)
         VALUES ('Razer Deathadder V2 Pro gaming mouse',220,'mice',15,'https://www.elgiganten.dk/image/dv_web_D180001002532790/223155/razer-deathadder-v2-pro-gaming-mus--pdp_zoom-3000--pdp_main-960.jpg',${user0.id},
         'The Razer Deathadder V2 Pro gaming mouse helps you to the top of your scoreboards. The mouse has Razer HyperSpeed ​​Wireless to ensure a lightning fast connection, Razer Focus + optical sensor and a 2nd gen. optical mouse switch to ensure perfect response time and aiming. dDn also has 8 programmable buttons and 120 hours of battery life.         ')`
      );

      db.run(
        `INSERT INTO items (name,price,category,ammount,imageLink,user_id,description)
         VALUES ('Samsung Galaxy S21',7144,'phone',322,'https://cdn.movertix.com/media/catalog/product/cache/image/1200x/s/a/samsung-galaxy-s21-5g-phantom-violet-256gb-and-8gb-ram-sm-g991b_1.jpg',${user0.id},
         '6.2 FHD + 120hz Dynamic AMOLED (2400 x 1080) with Gorilla Glass Victus, 5G, Dual SIM, Exynos 2100 Octa-core, 8GB RAM, 256GB Flash, 64Mpixel f / 2.0 Telephoto with 30x Zoom & OIS + 12Mpixel Wide f / 1.8 Wide with AF & OIS + 12Mpixel f / 2.2 UltraWide with AF (Back), 10Mpixel f / 2.2 with AF (Front), IP68 Water & Dust Certified, Dolby Atmos, Android 11, 4000 mAh battery, SuperFast Charge + Wireless Fast Charging, 171 gram')`
      );

      const id = await user1.id;
      db.run(
        `INSERT INTO shopping_basket (user_id,item_id,ammount) VALUES(${id},1,1)`
      )
      db.run(
        `INSERT INTO shopping_basket (user_id,item_id,ammount) VALUES(${id},2,4)`
      )
      db.run(
        `INSERT INTO shopping_basket (user_id,item_id,ammount) VALUES(${id},3,1)`
      )
      
}
db.close();
