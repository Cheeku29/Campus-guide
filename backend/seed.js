require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Business = require("./models/Business");
const User = require("./models/User");
const Review = require("./models/Review");

const businesses = [
  {
    name: "The Daily Grind Cafe",
    category: "Cafe",
    description: "Artisanal coffee and fresh pastries. The ultimate late-night study sanctuary featuring gigabit WiFi and ambient lo-fi beats.",
    address: "MG Road, near Trendset Mall, Vijayawada, AP 520010",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
    averageRating: 4.8,
    reviewCount: 34,
  },
  {
    name: "Bite Box",
    category: "Food",
    description: "Premium comfort food on the go. Famous for our signature truffle fries and loaded smashed burgers.",
    address: "Food Court, Benz Circle, Vijayawada, AP 520010",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop",
    averageRating: 4.6,
    reviewCount: 42,
  },
  {
    name: "Campus Stationers",
    category: "Stationery",
    description: "Your one-stop shop for Moleskine notebooks, fine art supplies, and tech accessories to fuel your semester.",
    address: "Labbipet Main Road, Vijayawada, AP 520010",
    image: "https://images.unsplash.com/photo-1583485088034-697b5a541b56?q=80&w=800&auto=format&fit=crop",
    averageRating: 4.3,
    reviewCount: 15,
  },
  {
    name: "The Hub PG",
    category: "PG",
    description: "Luxury off-campus housing. Featuring a private gym, rooftop lounges, and fully furnished suites.",
    address: "Guru Nanak Colony, Vijayawada, AP 520008",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
    averageRating: 4.1,
    reviewCount: 28,
  },
  {
    name: "Midnight Noodles",
    category: "Food",
    description: "Authentic pan-Asian street food. We stay open late so your 2 AM cravings never go unsatisfied.",
    address: "Auto Nagar Gate, Vijayawada, AP 520007",
    image: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=800&auto=format&fit=crop",
    averageRating: 4.5,
    reviewCount: 56,
  },
  {
    name: "Brew & Book",
    category: "Cafe",
    description: "A cozy, book-lined coffeehouse serving ethically sourced single-origin roasts and organic teas.",
    address: "Patamata, near NTR Circle, Vijayawada, AP 520014",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
    averageRating: 4.9,
    reviewCount: 88,
  },
  {
    name: "Artistic Edge",
    category: "Stationery",
    description: "Premium architectural drafting tools, canvases, and imported pens for the creative minds on campus.",
    address: "Governor Peta, Eluru Road, Vijayawada, AP 520002",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    averageRating: 4.7,
    reviewCount: 19,
  },
  {
    name: "Zenith Student Housing",
    category: "PG",
    description: "Modern, quiet, and secure. Premium single and double sharing rooms with an all-inclusive amenity package.",
    address: "Bhavanipuram, Vijayawada, AP 520012",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop",
    averageRating: 4.4,
    reviewCount: 21,
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Clear everything
    await Business.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});
    console.log("Cleared existing data");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const owner1 = new User({
      name: "Alice Owner",
      email: "alice@owner.com",
      password: hashedPassword,
      role: "owner",
    });
    const owner2 = new User({
      name: "Bob Owner",
      email: "bob@owner.com",
      password: hashedPassword,
      role: "owner",
    });
    const student1 = new User({
      name: "Steve Student",
      email: "steve@student.com",
      password: hashedPassword,
      role: "student",
    });

    await owner1.save();
    await owner2.save();
    await student1.save();

    const businessesWithOwner = businesses.map((b, index) => {
      return { ...b, owner: index % 2 === 0 ? owner1._id : owner2._id };
    });

    await Business.insertMany(businessesWithOwner);
    console.log(
      "Seed data inserted. Test Accounts: alice@owner.com & bob@owner.com & steve@student.com | Pass: password123",
    );
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Seed error:", err);
    mongoose.disconnect();
  });
