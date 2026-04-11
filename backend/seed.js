require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Business = require('./models/Business');
const User = require('./models/User');
const Review = require('./models/Review');

const businesses = [
  { name: "Campus Craves", category: "Food", description: "Your go-to spot for late-night snacks and quick bites.", address: "123 University Ave", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop", averageRating: 4.5, reviewCount: 12 },
  { name: "Study Grounds", category: "Cafe", description: "Quiet cafe, perfect for late-night study sessions with premium coffee.", address: "45 College St", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop", averageRating: 4.8, reviewCount: 30 },
  { name: "Tech & Pens", category: "Stationery", description: "Everything you need from notebooks to highlighters.", address: "B1 Student Center", image: "https://images.unsplash.com/photo-1583485088034-697b5a541b56?q=80&w=800&auto=format&fit=crop", averageRating: 4.2, reviewCount: 8 },
  { name: "Sunset PG", category: "PG", description: "Affordable and comfortable student accommodation.", address: "Lane 9, North Campus", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop", averageRating: 3.9, reviewCount: 5 },
  { name: "Spicy Wok", category: "Food", description: "Authentic pan-asian food for the spicy lovers.", address: "Food Court, East Gate", image: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=800&auto=format&fit=crop", averageRating: 4.4, reviewCount: 15 },
  { name: "Latte Lounge", category: "Cafe", description: "Vibrant and aesthetic cafe to hang out with friends.", address: "88 Hangout Plaza", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop", averageRating: 4.6, reviewCount: 22 },
  { name: "Artisans Craft", category: "Stationery", description: "Premium art supplies for the creative minds.", address: "Art St", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop", averageRating: 4.7, reviewCount: 19 },
  { name: "Cozy Corners AC PG", category: "PG", description: "Premium single and double sharing rooms with all amenities.", address: "Sector 14", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop", averageRating: 4.1, reviewCount: 11 }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear everything
    await Business.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');

    // Create Owners
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const owner1 = new User({ name: 'Alice Owner', email: 'alice@owner.com', password: hashedPassword, role: 'owner' });
    const owner2 = new User({ name: 'Bob Owner', email: 'bob@owner.com', password: hashedPassword, role: 'owner' });
    const student1 = new User({ name: 'Steve Student', email: 'steve@student.com', password: hashedPassword, role: 'student' });
    
    await owner1.save();
    await owner2.save();
    await student1.save();

    // Assign Owners to businesses (alternating)
    const businessesWithOwner = businesses.map((b, index) => {
      return { ...b, owner: index % 2 === 0 ? owner1._id : owner2._id };
    });

    await Business.insertMany(businessesWithOwner);
    console.log('Seed data inserted. Test Accounts: alice@owner.com & bob@owner.com & steve@student.com | Pass: password123');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Seed error:', err);
    mongoose.disconnect();
  });
