
CREATE TABLE admins (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    full_name VARCHAR(200),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    email VARCHAR(100) NOT NULL,
    birth_date DATE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plates (
    plate_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plate_categories (
    plate_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (plate_id, category_id)
);

CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    reservation_date_time TIMESTAMP NOT NULL,
    expiration_date_time TIMESTAMP NOT NULL,
    number_of_guests INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    special_requests TEXT,
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE plate_categories
    ADD CONSTRAINT fk_plate_categories_plate
    FOREIGN KEY (plate_id) REFERENCES plates(plate_id) ON DELETE CASCADE;

ALTER TABLE plate_categories
    ADD CONSTRAINT fk_plate_categories_category
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE;

ALTER TABLE reservations
    ADD CONSTRAINT fk_reservations_customer
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id);

INSERT INTO categories (name, description, is_active, created_at, updated_at) VALUES
('Plates', 'Platos fuertes de mariscos y pescados', true, NOW(), NOW()),
('Drinks', 'Bebidas alcohólicas y no alcohólicas', true, NOW(), NOW()),
('Sweets', 'Postres y dulces tradicionales', true, NOW(), NOW());

INSERT INTO plates (name, description, image_url, price, is_available, created_at, updated_at) VALUES
('Ceviche de pescado', 'Ceviche de pescado fresco con cebolla, cilantro y ají', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767567954/ceviche_de_pescado_new_4779a0.jpg', 30.00, true, NOW(), NOW()),
('Ceviche de conchas negras', 'Ceviche de conchas negras con cebolla morada', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767568450/ceviche_de_conchas_negras_new_2a6dc1.jpg', 35.00, true, NOW(), NOW()),
('Ceviche mixto', 'Ceviche con pescado, mariscos y conchas', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767568535/ceviche_mixto_new_f53383.jpg', 35.00, true, NOW(), NOW()),
('Chicharrón de pescado', 'Chicharrón de pescado crujiente', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767568658/chicharron_de_pescado_new_405bac.jpg', 28.00, true, NOW(), NOW()),
('Chicharrón mixto', 'Chicharrón de pescado y mariscos', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767568730/chicharron_mixto_new_312125.jpg', 35.00, true, NOW(), NOW()),
('Arroz con mariscos', 'Arroz con mariscos frescos', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767568955/arroz_con_mariscos_new_cf93d9.jpg', 30.00, true, NOW(), NOW()),
('Parihuela de tramboyo', 'Parihuela de tramboyo con mariscos', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767569043/parihuela_de_tramboyo_new_a8aa74.jpg', 35.00, true, NOW(), NOW()),
('Sudado de pescado', 'Sudado de pescado con cebolla y tomate', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767569096/sudado_de_pescado_new_7c6a4f.jpg', 35.00, true, NOW(), NOW()),
('Causa de cangrejo', 'Causa rellena de cangrejo', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767569196/causa_de_cangrejo_new_5d1e86.jpg', 28.00, true, NOW(), NOW()),
('Shot de tequila', 'Shot de tequila premium', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767563961/shot_de_tequila_new_0d61a6.jpg', 23.00, true, NOW(), NOW()),
('Pisco sour', 'Cóctel nacional con pisco y limón', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767564025/pisco_sour_new_f4a262.jpg', 23.00, true, NOW(), NOW()),
('Margarita', 'Cóctel de tequila con limón y sal', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767564076/margarita_new_2c7dd6.jpg', 22.00, true, NOW(), NOW()),
('Machu picchu', 'Cóctel especial con pisco y frutas', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767567735/machu_picchu_new_42c9ba.jpg', 25.00, true, NOW(), NOW()),
('Cuba libre', 'Cóctel de ron con cola', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767567782/cuba_libre_new_59c869.jpg', 20.00, true, NOW(), NOW()),
('Soda', 'Refresco gaseoso', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767567812/soda_new_4993c8.jpg', 15.00, true, NOW(), NOW()),
('Torta de chocolate', 'Torta de chocolate casera', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767563705/torta_de_chocolate_new_c8fa09.jpg', 15.00, true, NOW(), NOW()),
('Torta de zanahoria', 'Torta de zanahoria con crema', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767563543/torta_de_zanahoria_new_265c2b.jpg', 15.00, true, NOW(), NOW()),
('Tres leches', 'Postre tradicional de tres leches', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767563039/tres_leches_new_b63516.jpg', 16.00, true, NOW(), NOW()),
('Torta helada', 'Torta helada de diferentes sabores', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767563362/torta_helada_new_24340c.jpg', 14.00, true, NOW(), NOW()),
('Leche asada', 'Postre tradicional de leche asada', 'https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767563765/leche_asada_new_c1ccaa.jpg', 18.00, true, NOW(), NOW());

INSERT INTO plate_categories (plate_id, category_id) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1), (9, 1),
(10, 2), (11, 2), (12, 2), (13, 2), (14, 2), (15, 2),
(16, 3), (17, 3), (18, 3), (19, 3), (20, 3);
