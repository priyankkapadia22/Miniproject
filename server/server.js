//server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://22it053:12345@cluster0.2n6wrai.mongodb.net/", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const restaurantSchema = new mongoose.Schema({
	name: String,
	image: String,
	menu: [
		{
			name: String,
			price: Number,
			image: String,
		},
	],
	rating: Number,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Seed initial data
const seedData = [
	{
		name: "ITC NARMADA",
	image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/40/55/4a/lobby.jpg?w=700&h=-1&s=1",
		menu: [
			{
				name: "Pasta Alfredo",
				price: 190,
				image: "https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Spinach-Tomato-Pasta-bowl-500x375.jpg",
			},
			{
				name: "Margherita Pizza",
				price: 150,
				image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg",
			},
			{
				name: "Chole",
				price: 120,
				image: "https://www.goindigo.in/content/dam/indigov2/6e-website/destinations/get-inspired/food-tripping/chole-bhature.jpg",
			},
		],
		rating: 4.5,
	},
	{
		name: "Baghvan",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5n1WoLLx8DWQcK3DkNjfgFU1h2zqkHumyMmW_6NQNGw&s",
		menu: [
			{
				name: "Pavbhaji",
				price: 120,
				image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Bambayya_Pav_bhaji.jpg",
			},
			{
				name: "Lobster Bisque",
				price: 180,
				image: "https://cafedelites.com/wp-content/uploads/2020/02/Lobster-Bisque-IMAGE-2.jpg",
			},
		],
		rating: 3.8,
	},
	{
		name: "Vegetarian Haven",
		image: "https://assets.architecturaldigest.in/photos/64f84cc61d4896b633fba77a/master/w_1600%2Cc_limit/The%2520art%2520deco%2520inspired%2520de%25CC%2581cor%2520of%2520CIRQA%25201960%2520.jpg",
		menu: [
			{
				name: "Salad",
				price: 80,
				image: "https://www.thespruceeats.com/thmb/2GoDt7juuaU7lxtQDq-_IjEr6t8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-our-favorite-simple-green-salad-recipe-7370448-hero-01-4ca9788a0a3c4d53b70f1d07f8382b7f.jpg",
			},
			{
				name: "Veg manchurian",
				price: 120,
				image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/veg-manchurian.jpg",
			},
			{
				name: "Tacos",
				price: 165,
				image: "https://www.onceuponachef.com/images/2023/08/Beef-Tacos.jpg",
			},
		],
		rating: 4.2,
	},
	{
		name: "Sizzling Steakhouse",
		image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
		menu: [
			{
				name: "Filet Mignon",
				price: 220,
				image: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/02/Filet-Mignon-main.jpg",
			},
			{
				name: "New York Strip",
				price: 180,
				image: "https://www.harryanddavid.com/blog/wp-content/uploads/2021/09/New-York-Strip-Steak-2.jpg",
			},
			{
				name: "Sizzzler",
				price: 450,
				image: "https://www.archanaskitchen.com/images/archanaskitchen/0-Affiliate-Articles/Sizzling_dragon_chicken_sizzler.jpg",
			},
		],
		rating: 4.7,
	},
	{
		name: "Asian Fusion",
		image: "https://rishikeshcamps.in/wp-content/uploads/2023/05/restaarant.jpg",
		menu: [
			{
				name: "Sushi Platter",
				price: 200,
				image: "https://i.pinimg.com/originals/09/f0/8f/09f08f0886c39e2709550b1cdc18366b.jpg",
			},
			{
				name: "Pad Thai",
				price: 150,
				image: "https://www.recipetineats.com/wp-content/uploads/2020/01/Chicken-Pad-Thai_9-SQ.jpg",
			},
			{
				name: "Ransogulla",
				price: 180,
				image: "https://www.seema.com/wp-content/uploads/2022/08/Rasgulla.jpg",
			},
		],
		rating: 4.0,
	},
];

const seedDatabase = async () => {
	try {
		await Restaurant.deleteMany(); // Clear existing data
		await Restaurant.insertMany(seedData);
		console.log("Database seeded successfully.");
	} catch (error) {
		console.error("Error seeding the database:", error.message);
	}
};

// Seed data when the server starts
seedDatabase();

app.get("/restaurants", async (req, res) => {
	try {
		// Use the 'find' method of the 'Restaurant' model to retrieve all restaurants
		const restaurants = await Restaurant.find({});

		// Send the retrieved restaurants as a JSON response
		res.json(restaurants);
	} catch (error) {
		// Handle any errors that may occur during the process and send a 500 Internal Server Error response
		res.status(500).json({ error: error.message });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
