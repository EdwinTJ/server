import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: "admin1",
  password: "admin123",
  host: "localhost",
  port: 5432,
  database: "salon_database",
});

const seedServices = [
  {
    name: "Haircut",
    price: 50.0,
    description: "Professional haircut service with washing and styling",
    duration: 45,
    image: "haircut.jpg",
  },
  {
    name: "Hair Coloring",
    price: 120.0,
    description: "Full hair coloring service including bleaching if necessary",
    duration: 120,
    image: "hair-coloring.jpg",
  },
  {
    name: "Manicure",
    price: 35.0,
    description: "Basic manicure with nail polish",
    duration: 30,
    image: "manicure.jpg",
  },
  //   {
  //     name: "Pedicure",
  //     price: 45.0,
  //     description: "Relaxing pedicure with foot massage",
  //     duration: 45,
  //     image: "pedicure.jpg",
  //   },
  //   {
  //     name: "Facial Treatment",
  //     price: 75.0,
  //     description: "Deep cleansing facial with massage",
  //     duration: 60,
  //     image: "facial.jpg",
  //   },
];

async function seedDatabase() {
  try {
    // Clear existing data
    await pool.query("TRUNCATE TABLE services CASCADE");

    // Insert seed data
    for (const service of seedServices) {
      await pool.query(
        `INSERT INTO services (name, price, description, duration, image)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          service.name,
          service.price,
          service.description,
          service.duration,
          service.image,
        ]
      );
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await pool.end();
  }
}

seedDatabase();
