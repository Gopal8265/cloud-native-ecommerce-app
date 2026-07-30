--
-- PostgreSQL database dump
--

\restrict fZFIZmseutVvfcheFDkGJ7mS6Ve5WMh4r6wCbxc9GVl8vb448UttSd15YlQgBBx

-- Dumped from database version 16.14 (Homebrew)
-- Dumped by pg_dump version 16.14 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: gopal
--

INSERT INTO public.products (id, name, description, price, stock, image_url, category, created_at) VALUES (3, 'Samsung Galaxy S25 Ultra', 'Samsung flagship smartphone with AI features', 89999.00, 15, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', 'Mobile', '2026-07-30 22:48:59.656084');
INSERT INTO public.products (id, name, description, price, stock, image_url, category, created_at) VALUES (4, 'Google Pixel 10 Pro', 'Google flagship Android smartphone', 75999.00, 18, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800', 'Mobile', '2026-07-30 22:48:59.656084');
INSERT INTO public.products (id, name, description, price, stock, image_url, category, created_at) VALUES (5, 'OnePlus 13', 'Fast and smooth flagship smartphone', 69999.00, 20, 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800', 'Mobile', '2026-07-30 22:48:59.656084');
INSERT INTO public.products (id, name, description, price, stock, image_url, category, created_at) VALUES (7, 'Dell XPS 15', 'Premium Windows laptop', 149999.00, 8, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800', 'Laptop', '2026-07-30 22:48:59.656084');
INSERT INTO public.products (id, name, description, price, stock, image_url, category, created_at) VALUES (8, 'Sony WH-1000XM6', 'Noise cancelling wireless headphones', 34999.00, 25, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', 'Accessories', '2026-07-30 22:48:59.656084');
INSERT INTO public.products (id, name, description, price, stock, image_url, category, created_at) VALUES (9, 'Apple Watch Series 11', 'Latest Apple smartwatch', 45999.00, 20, 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800', 'Wearable', '2026-07-30 22:48:59.656084');
INSERT INTO public.products (id, name, description, price, stock, image_url, category, created_at) VALUES (10, 'iPad Air M3', 'Apple tablet powered by M3 chip', 64999.00, 12, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800', 'Tablet', '2026-07-30 22:48:59.656084');
INSERT INTO public.products (id, name, description, price, stock, image_url, category, created_at) VALUES (11, 'PlayStation 5', 'Sony next-generation gaming console', 54999.00, 10, 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800', 'Gaming', '2026-07-30 22:48:59.656084');
INSERT INTO public.products (id, name, description, price, stock, image_url, category, created_at) VALUES (2, 'iPhone 16', 'Apple flagship smartphone', 79999.00, 20, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80', 'Mobile', '2026-07-29 19:27:57.833125');
INSERT INTO public.products (id, name, description, price, stock, image_url, category, created_at) VALUES (6, 'MacBook Air M4', 'Apple lightweight laptop with M4 chip', 129999.00, 10, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80', 'Laptop', '2026-07-30 22:48:59.656084');


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gopal
--

SELECT pg_catalog.setval('public.products_id_seq', 11, true);


--
-- PostgreSQL database dump complete
--

\unrestrict fZFIZmseutVvfcheFDkGJ7mS6Ve5WMh4r6wCbxc9GVl8vb448UttSd15YlQgBBx

