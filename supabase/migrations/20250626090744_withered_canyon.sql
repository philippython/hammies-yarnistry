/*
  # Create products table for Hammies Yarnistry

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `title` (text, product name)
      - `description` (text, product description)
      - `price` (numeric, price in Nigerian Naira)
      - `image_url` (text, product image URL)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (anyone can view products)
    - Add policy for authenticated admin access (only authenticated users can modify)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read products (public access for viewing)
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert products (admin functionality)
CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update products (admin functionality)
CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete products (admin functionality)
CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial products
INSERT INTO products (title, description, price, image_url) VALUES
  ('Boho Crochet Tote Bag', 'Handcrafted bohemian-style tote bag perfect for daily use', 18000, 'https://images.pexels.com/photos/6045242/pexels-photo-6045242.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Cozy Crochet Slippers', 'Warm and comfortable house slippers in soft yarn', 11200, 'https://images.pexels.com/photos/7691691/pexels-photo-7691691.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Vintage Crochet Top', 'Elegant sleeveless crochet top with intricate patterns', 26000, 'https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Chunky Knit Shrug', 'Oversized cozy shrug perfect for layering', 22000, 'https://images.pexels.com/photos/7691728/pexels-photo-7691728.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Crochet Bucket Hat', 'Trendy bucket hat with beautiful stitch patterns', 12800, 'https://images.pexels.com/photos/5691630/pexels-photo-5691630.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Baby Crochet Blanket', 'Soft and gentle blanket perfect for little ones', 30000, 'https://images.pexels.com/photos/6032874/pexels-photo-6032874.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Crochet Market Bag', 'Eco-friendly mesh bag for shopping and storage', 14000, 'https://images.pexels.com/photos/7078662/pexels-photo-7078662.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Amigurumi Cat', 'Adorable handmade cat toy for children', 16000, 'https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Crochet Cardigan', 'Elegant long cardigan with button closure', 34000, 'https://images.pexels.com/photos/7691735/pexels-photo-7691735.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Crochet Headband', 'Stylish headband with flower detail', 8800, 'https://images.pexels.com/photos/7691740/pexels-photo-7691740.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Crochet Scarf', 'Long cozy scarf in beautiful gradient colors', 15200, 'https://images.pexels.com/photos/7691745/pexels-photo-7691745.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Crochet Poncho', 'Stylish poncho perfect for any season', 27200, 'https://images.pexels.com/photos/7691750/pexels-photo-7691750.jpeg?auto=compress&cs=tinysrgb&w=800');