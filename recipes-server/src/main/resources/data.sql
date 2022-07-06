INSERT INTO users (id, username, email, password, avatar_url, cover_photo_url, is_blocked)
VALUES (1, 'shushan', 'shushan@abv.bg', '123', 'data:image/png;base64,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', null, false);
INSERT INTO users (id, username, email, password, avatar_url, cover_photo_url, is_blocked)
VALUES (2, 'ani', 'ani@abv.bg', '123', 'data:image/png;base64,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', null, false);
INSERT INTO users (id, username, email, password, avatar_url, cover_photo_url, is_blocked)
VALUES (3, 'Peter', 'peter@abv.bg', '123', null, null, false);
INSERT INTO users (id, username, email, password, avatar_url, cover_photo_url, is_blocked)
VALUES (4, 'eftenow', 'eftenow@abv.bg', '123', null, null, false);

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