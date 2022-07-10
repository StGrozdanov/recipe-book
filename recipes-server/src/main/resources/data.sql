INSERT INTO users (id, username, email, password, avatar_url, cover_photo_url, is_blocked)
VALUES (1, 'shushan', 'shushan@abv.bg', 'e55a6323d588941b26f652b43dc354e942b2ce8bf82d5aee7aa3445413c067db27b0086ec8d820bd', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/avatar.png', null, false);
INSERT INTO users (id, username, email, password, avatar_url, cover_photo_url, is_blocked)
VALUES (2, 'ani', 'ani@abv.bg', 'eb0e58faf11737e9073d173192908ca030b618e88b12651b1fdf46696395aefdc2bde58d0cca4ff2', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/avatar.png', null, false);
INSERT INTO users (id, username, email, password, avatar_url, cover_photo_url, is_blocked)
VALUES (3, 'Peter', 'peter@abv.bg', 'f70b82d41791bb6581d4f021313144621621fa46910ad95dca6f6ee331b31f1b2187cb2d500acf89', null, null, false);
INSERT INTO users (id, username, email, password, avatar_url, cover_photo_url, is_blocked)
VALUES (4, 'eftenow', 'eftenow@abv.bg', 'd21deea61deddb93e3da36410a78d03ce71dcd4f5b13272e163e2033e8718e1a5a7d7a567d102b6c', null, null, false);

INSERT INTO roles (id, role)
VALUES (1, 'ADMINISTRATOR');
INSERT INTO roles (id, role)
VALUES (2, 'MODERATOR');
INSERT INTO roles (id, role)
VALUES (3, 'USER');

INSERT INTO users_roles(user_entity_id, roles_id)
VALUES (1, 1);
INSERT INTO users_roles(user_entity_id, roles_id)
VALUES (2, 1);
INSERT INTO users_roles(user_entity_id, roles_id)
VALUES (3, 2);
INSERT INTO users_roles(user_entity_id, roles_id)
VALUES (4, 3);

INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (1, 'DESSERT', '2022-06-29 21:38:31', 'https://www.supichka.com/files/images/2565/bananov_keks_s_karamelena_glazura.jpg', 'Кекс', 'APPROVED', 1, 1);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (2, 'CALF_PORK', '2022-06-29 21:38:31', 'https://cdn.pro-nails.ru/kuchnia/9457043/spaghetti_bolognese_przepis_oryginalny_na_sos_pomidorowy_do_makaronu.jpg.webp', 'Болонезе', 'APPROVED', 1, 1);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (3, 'PORK', '2022-06-29 21:38:31', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFigbee7U_EsyaP0GE6Gs-s6SQVV9tvG14fA&usqp=CAU', 'Мусака', 'APPROVED', 1, 2);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (4, 'PASTA', '2022-06-29 21:38:31', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm7RzdOPVaBvaXk6ysc1EtBmXiwINygU4IeA&usqp=CAU', 'Баница със сирене', 'APPROVED', 1, 2);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (5, 'DESSERT', '2022-06-29 21:38:31', 'https://media.kaufland.com/images/PPIM/AP_Content_1010/std.lang.all/09/66/Asset_1670966.jpg', 'Тиквеник', 'APPROVED', 1, 4);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (6, 'DESSERT', '2022-06-29 21:38:31', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Classic_Italian_Tiramisu-3_%2829989504485%29.jpg/800px-Classic_Italian_Tiramisu-3_%2829989504485%29.jpg', 'Тирамису', 'APPROVED', 0, 1);

INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (1, 'тестов коментар от shushan', '2022-06-29 21:38:31', 1, 1);
INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (2, 'тестов коментар от shushan', '2022-06-29 21:38:31', 1, 2);
INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (3, 'тестов коментар от ani', '2022-06-29 21:38:31', 2, 1);
INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (4, 'тестов коментар от Peter', '2022-06-29 21:38:31', 3, 1);

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(1, 'Стъпка 1, Стъпка 2, Стъпка 3');

INSERT INTO notifications (action, created_at, location_id, location_name, is_marked_as_read, sender_avatar, sender_username, receiver_id)
VALUES('CREATED_COMMENT', CURRENT_DATE, 1, 'Кекс', false, null, 'shushan', 1);
INSERT INTO notifications (action, created_at, location_id, location_name, is_marked_as_read, sender_avatar, sender_username, receiver_id)
VALUES('CREATED_COMMENT', CURRENT_DATE, 1, 'Кекс', false, null, 'shushan', 1);
INSERT INTO notifications (action, created_at, location_id, location_name, is_marked_as_read, sender_avatar, sender_username, receiver_id)
VALUES('CREATED_COMMENT', CURRENT_DATE, 1, 'Кекс', false, null, 'shushan', 2);

INSERT INTO visitations (id, visited_at)
VALUES (1, DATE('2022-02-01'));
INSERT INTO visitations (id, visited_at)
VALUES (2, DATE('2022-02-05'));
INSERT INTO visitations (id, visited_at)
VALUES (3, DATE('2022-03-01'));
INSERT INTO visitations (id, visited_at)
VALUES (4, DATE('2022-04-01'));
INSERT INTO visitations (id, visited_at)
VALUES (5, DATE('2022-05-01'));
INSERT INTO visitations (id, visited_at)
VALUES (6, DATE('2022-05-02'));
INSERT INTO visitations (id, visited_at)
VALUES (7, DATE('2022-06-01'));
INSERT INTO visitations (id, visited_at)
VALUES (8, DATE('2022-07-06'));