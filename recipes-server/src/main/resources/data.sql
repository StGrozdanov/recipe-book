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
VALUES (1, 'DESSERT', '2021-12-12 09:59:33', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/bananov_keks_s_karamelena_glazura.jpg', 'Кекс', 'APPROVED', 0, 3);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (2, 'CALF_PORK', '2021-12-12 10:01:37', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/spaghetti_bolognese.jpg', 'Болонезе', 'APPROVED', 0, 1);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (3, 'PORK', '2021-12-12 10:02:11', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/musaka.jpg', 'Мусака', 'APPROVED', 0, 2);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (4, 'DESSERT', '2021-12-12 21:09:04', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/baklava.jpg', 'Баклава', 'APPROVED', 0, 1);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (5, 'PASTA', '2021-12-14 18:51:49', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/banica.jpg', 'Баница със сирене', 'APPROVED', 0, 2);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (6, 'DESSERT', '2021-12-21 05:06:50', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/tikvenik.jpg', 'Тиквеник', 'APPROVED', 0, 2);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (7, 'PASTA', '2021-12-22 19:36:37', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/tutmanik.jpg', 'Тутманик', 'APPROVED', 0, 1);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (8, 'VEGAN', '2021-12-22 19:47:23', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/potato-cream-soup.jpg', 'Картофена крем супа', 'APPROVED', 0, 3);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (9, 'DESSERT', '2021-12-22 20:02:11', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/souffle.jpg', 'Малиново суфле', 'APPROVED', 0, 1);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (10, 'DESSERT', '2021-12-22 20:13:17', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/ricotta-roll.jpg', 'Рикота роле с шамфъстък', 'APPROVED', 0, 1);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (11, 'DESSERT', '2021-12-22 20:18:56', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/Tiramisu.jpg', 'Тирамису', 'APPROVED', 0, 1);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (12, 'DESSERT', '2021-12-22 20:26:29', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/ChristmasAppleCrumble.jpg', 'Ябълкова натрошенка', 'APPROVED', 0, 1);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (13, 'SALAD', '2021-12-22 20:36:32', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/Caesar-Salad.jpg', 'Салата цезар', 'APPROVED', 0, 3);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (14, 'CALF_PORK', '2021-12-22 20:47:05', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/Subway-Meatball.jpg', 'Брускети с доматени кюфтенца по италиански', 'APPROVED', 0, 1);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (15, 'CALF', '2021-12-22 20:59:44', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/ULTIMATE-BEEF-BURGER.jpg', 'Телешки бургер', 'APPROVED', 0, 1);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (16, 'DESSERT', '2022-01-09 08:24:28', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/pancakes.jpg', 'Палачинки', 'APPROVED', 0, 2);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (17, 'DESSERT', '2022-05-13 18:30:24', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/strawberry-dessert.jpg', 'Сладкиш с ягоди', 'APPROVED', 0, 2);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (18, 'PASTA', '2022-05-20 15:30:35', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/pizza.webp', 'Пица', 'APPROVED', 0, 1);
INSERT INTO recipes (id, category, created_at, image_url, recipe_name, status, visitations_count, owner_id)
VALUES (19, 'OTHER', '2022-05-24 06:41:12', 'https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/healthy-pancakes.jpg', 'Бананови палачинки', 'APPROVED', 0, 2);

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(1, '5 яйца, 1 и 1/2 ч ч захар, 2 ч ч Брашно, 1 бакпулвер, 2 ванилия, 1 ч ч вода, 1/2ч ч олио, Пудра захар за поръсване');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(1, 'стъпка 1, стъпка 2, стъпка 3');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(2, 'Кайма 60/40 телешка/свинска, сол, пепер, Мащерка, Червено вино, Моркови, Лук, Чесън, Целина, Домати белени консерва, Зеленчуков бульон, Телешки бульон, Пармезан, Зехтин, Спагети');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(2, 'Сосът: Тиган, Зехтин, Кайма 60/40 телешка/свинска, сол, пепер, Мащерка, Червено вино, Моркови, Лук, Чесън, Целина, Доматено пюре /Домати белени консерва + чесън + сол + пепер + босилек + бульон/, Телешки бульон, Покрива се 2 пръста над каймата, Ври 1 час, Спагетите: Тенджера, Вода, Сол, Пепер, Като заври - зехтин, Спагетите се слагат, Като се извадят - зехтин, сол, пепер, Смесване: В тиган с пармезан');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(3, '2 кг картофи, 450-500 гр кайма, 1 морков, 1 лук, 2 ск чесън, 1/2 ч ч олио, 2 кисело мляко, сол, червен пипер, черен пипер, магданоз, зеленчуков бульон');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(3, 'стъпка 1, стъпка 2, стъпка 3');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(4, '1бр Яйце, 150мл Прясно Мляко, 75мл Олио, 500гр Брашно, 1 + 1/2 чаени лъжици баклувер, Щипка сол, 250гр царевично нешесте, 250гр белен суров шамфъстък, 2 лимона, Пудра захар / на око /, 150гр масло, 1кг бяла захар');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(4, 'I. Тесто:, - 1 яйце, - 150 ml прясно мляко, - 75 мл олио, - 500 гр брашно, - 1 + 1/2 чаени лъжици баклувер, - щипка сол, Разбъркваме яйцето, млякото, олиото, баклувера и солта в купа. 350 гр брашно се изсипва в съд, прави се кладенче по средата и се изсипва сместта в центъра. Върти се кръгово тестото в тавата и се слагат на два пъти останалите,150 гр брашно, които са подготвени. Като се отдели от тавата се отупва 50 пъти,,меси се, отупва се 50 пъти общо 3 пъти. Пренасяме го на масата и продължаваме да,месим, докато не сме доволни от резултата. Покрива се да втаса за 60-90 мин.,,II. Смазка:,,- 250 гр царевично нешесте,- 1 + 1/2 супени лъжици брашно,,Прекарват се през цедка. Тази смазка се използва за да се отделят хубаво корите,на баклавата и да не лепкат.,,III. Точене на корите:,,Слага се смазка на масата, оваляме тестото в нея, режат се 3 части, после всяка,се реже на 4 и после пак на 4, от всяка част имаме 16 парчета.,Частите, които не се ползват се покриват с кърпа, с останалите 16,се работи. Правят се на малки топчета, като всяко се поставя в купата със смазка,и се оваля много яко в нея, после се точи, слага се 1 върху друго всяко парче,,като между пърчетата посипваме доволно смазка. Като наредим всички 8 парчета,едно върху друго, почваме да ги точим заедно, докато се точат продължава да се,ръси смазка, обръщат се наобратно, точат се, разместват се, отделят се, пак се,точи, трябва да станат много тънки. После се режат по дължината на съда, слагат,се и останките от изрязването се поставят отгоре. Съда трябва да е намазан с,масло и олио, корите се поставят напълно разделени, една върху друга.,,IV. Подредба и пълнеж:,,- 250 гр белен, суров шамфъстък,- Лимонени корички,- Пудра захар,,Шамфъстъка се натрошава, като се използва блендер за една част и чук за другата,На ренде се прекарва лимонена кора, добавя се пудра захар.,След като първата 16ка е поставена в съда, върху нея се слага пълнеж, върху,другата 16ка пак се повтаря това упражнение. Последните три корички се мажат,с масло!,,V. Подготовка и печене:,,- 150гр масло,,С много остър нож режем тестото на правоъгълници и поливаме всичко със 150 гр,вряло масло, на което е отстранена пяната. Печем в предварително загрята фурна,на 165 градуса към 45-50 мин, или до получаване на златист цвят.,,VI. Заливка:,,- 1кг захар,- 750ml вода,- Лимонени корички,- Сок от лимон,,Водата, захарта и лимонените корички се оставят да заврат на котлона, след като,заврат се оставят на мн ниски градуси и след 15 мин се добавя сок от лимон,,изчаква се още 1 мин и заливката е готова.,Баклавата трябва да изстине за 10 мин, изкарана от фурната преди да се залее!,После се оставя да престои 12 часа и се наръсва с прах от шамфъстък.');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(5, '5 яйца,500 гр кисело мляко,1 кори за баница,450 гр сирене,1/2 ч.л.сода,5 с.л.олио');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(5, 'стъпка 1, стъпка 2, стъпка 3');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(6, '1 пакет Кори за баница,1/2 Тиква,1/2 Канела,300/400 гр Орехи,1/2 ч ч Олио,1+1/2 ч ч захар,2 ванилия');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(6, 'стъпка 1, стъпка 2, стъпка 3');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(7, '1кг брашно,6бр яйца,4сл кисело мляко,4сл олио,2сл захар,1сл сол,1 + 1/2 пакетче мая,50гр масло,250гр сирене');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(7, 'Омесване на тестото: Изсипват се 600гр брашно, прави се кладенче по средата и се излива в него смес от 4 разбъркани яйца, 4 лъжици кисело мляко, 4 лъжици олио, 2 лъжици захар и 1 лъжица сол, довя се пакет и половина мая, разтворен в 150мл топла вода. Разбърква се брашното със сместа, като на два пъти се добавят допълнителни 200гр брашно. След като цялото брашно се изсипе (1кг) Върти се кръгово, като се отдели се вади от тавата, отупва се 3 пъти по 50 пъти и пак се меси, като сме доволни от резултата готовото тесто се слага в купа с фолио, върху тенджера с топла вода от бойлер, остава се да втаса 40-60 мин.,Точене на тестото: Разделяме тестото на 8 парчета, хубаво ги отупваме в брашно и месим с точилката и нареждаме едно върху друго, като между всяко се намазва олио, после се разточват заедно, докато не получим чаршаф. Намазваме чаршафа обилно с масло,Плънка: Състои се от 250гр сирене и 1 яйце, натрошава се сиренето и се смесва с яйцето. Върху чаршафа с масло изсипваме плънката и навиваме на палачинка. Режем палачинката на 2 и навиваме на охлюв около по-дългата част на тавата, после другата половинка от палачинката я режем на 2 и вием пак. Тавата трябва да е намазана обилно с олио, поставя се върху топла вода да втаса пак за 40 мин,Печене: Намазваме външната част на тестото с жълтък от 1 яйце. Слага се в фурна на 200 градуса, докато не пожълтее, после се пуска на 150 градуса за около час.');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(8, '2 глави праз,50гр масло,Глава лук,1кг картофи,200гр готварска сметана,Зеленчуков бульон');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(8, 'Празът се нарязва на дребно и се измива хубаво с вода, слага се във тиган с разтопеното масло и се запържва на средна температура, докато не омекне и промени цвета си, като се внимава да не загаря.,Добавя се лука да се запържи с праза,Добавят обелени и нарязани на кубчета картофите и се изсипва зеленчуков бульон /около 1-1.5л/ и се оставя да ври,Когато картофите омекнат се добавя сметаната и се пасира.,По желание се добавя пармезан/сирене/пържен лук/крутони и всякакви подобни екстри.');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(9, '600гр малини,230гр захар,6сл вода,500гр прясно мляко,65гр жълтъци,210гр белтъци,50гр царевично нишесте,5гр ванилия,1бр лимон,20гр масло,30гр суров, белен шамфъстък,Форми за суфле');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(9, 'формите се мажат 2 пъти с масло, като четката се прекарва нагоре! Овалят се с захар и с натрошен/нарязан на дребно шамфъстък и отиват в хладилника,В тиган се слагат: 600гр малини, 6 лъжици захар и 6 лъжици вода, средно ниска температура, с капак отгоре за 6 минути, маха се капака и се изчаква да се изпари водата от завирането на малините, това отнема около 5 минути, или докато не получим сироп, течноста не трябва да става златиста! (на карамел) Слага се в блендер, първо на ниска скорост и постепенно на висока за 1 мин. Сместта след това се изцежда през цедак, като се пресира с шпатула, 100гр от пюрето ни трябва за суфлетата и се слага в хладилник да се охлажда, останалата част е за заливката и се държи на стайна температура.,500 гр прясно мляко се оставя на котлон за 3-5 мин на средна температура, докато не започне да се случва нещо с него, вади се малко преди да заври.,В купа разбъркваме 65гр жалтък, 62гр захар, 50гр нишесте и 5гр ванилия, докато не получим еднородна смес, леко и на малки количества се изсипва млякото в сместта, когато половината мляко е изсипано в купата, купата се излива в,тигана с другата част от млякото и се разбърква на средна температура, докато не получим гъста и креместа консистенция, слагаме сместа в купа, покриваме я и за минимум 30 мин отива в хладилника.,Загрява се фурната на 180 градуса, в купа разбъркваме крема и сместта за печене, Разбиваме с миксер 210 гр белтъци. Белтъците трябва да се сгъстят на 2/3 от готовия продукт преди да им се добавя каквато и да е захар! Като се появи пяна се изтисква малко лимон, докато все още се бъркат белтъците. Когато стане време се добавя захарта, не се добавя на веднъж, а на пресекулки, 45гр захар. 1/3 от пяната се слага в сместа от крема за печене и малиновото пюре и се разбива енергично, докато не се получи еднородна смес. Останалата част леко се фолдва в сместта на две части.,Пълнят се формите за пекане догоре, потупваме ги върху кърпа, за да запълнем всякакви празнини и балончета с въздух, прекарваме шпатула през върха на формата и обикаляме с пръст, слагаме по средата на фурната с хартия за печене върху тава, но слагаме ДО ДВЕ суфлета наведнъж в фурната. Процесът отнема между 10 и 15 минути, в зависимост от големината на формите, като се пекат, докато се наддигнат и позлатеят.,Като се извадят се наръсват с пудра захар правят се 2 прекарвания на лъжица през центъра на суфлето и се изсипва малиновият сироп в дупката.,Може да се добави бутермасло, смесено с малини което се прави с масло + ванилия + пудра захар + мляко и миксер.');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(10, '5бр яйца,140гр захар,80гр брашно,500гр сирене рикота,Канела,50гр Шамфъстък,50гр шоколад,Малини/Ягоди за декорация');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(10, 'Отделят се 3 жълтъка и 5 белтъка в две купи. При жълтъците се слага 40 гр захар, разбиваме и докато разбъркваме добавяме по малко брашно, докато не стигнем 80гр.,Разбиват се белтъците с миксер, докато не станат на крем, като когато крема е на 2/3 завършен, добавяме 20гр захар,Премесва се крема от белтъци със сместа от жълтъци,Слагаме сместа в тава с хартия за пекане в предварително загрята фурна на 180 градуса за 5-7 мин.,Правим си крема от рикота (500гр) с 80гр захар, канела, шамфъстък (50гр) и натрошен/начупен шоколад,Като извадим тестото от фурната веднага го прегъваме с кърпа, докато още е топло! Ако изстине при опит да се прегъне ще се счупи на две.,Като изстине прегънатото тесто го разгъваме и си слагаме пълнежа и навиваме наново. Слага се в хладилник да престои и е готово за консумация.');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(11, '2бр яйца,140гр захар,450гр маскарпоне,300мл сладкарска сметана,1бр лимон,150-200мл кафе,100-200мл бейлис,2 пакета бишкоти,50гр шоколад');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(11, '2 жълтъка с 70 гр захар се разбиват, добавя се 450 гр маскарпоне, разбива се всичко, добавя се 300 мл сладкарска сметана, разбива се докато се сгъсти.,2 белтъка с лимон се разбиват с миксер, докато не станат на пяна и се добавят към сместа,Смесва се кафе с бейлис и 70гр захар, в които се топят двата пакета бишкоти,Шоколад се настъргва на ренде,Оставя се в хладилник да стегне');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(12, '1.5кг ябълки и круши,160гр конфитюр от червени боровинки,2бр мандарини,Малинов Ликьор / ликьор по избор,Канела,80гр масло,160гр брашно,80гр филиран бадем,80гр захар,160гр бисквити (за предпочитане с конфитюр)');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(12, 'Обелените ябълки и круши се слагат в тиган на средна температура, върху тях се изсипва конфитюра, нарязва се на ренде кора от мандарините и се изцежда сокът им върху тигана. Добавя се ликьора, канела и се поставя капак да се задуши всичко за 10 минути.,Натрошенката се прави като се смесят брашното с маслото, с филирания бадем, с захарта и с бисквитите, всичко заедно се намачква и начупва, докато не стане на \камъчета\.,Сместа от тигана се изсипва върху тава и отгоре се изсипва натрошенката. Тавата се оставя в предварително загрята фурна на 180 градуса за 30 минути.,Сервира се топло със топка сладолед.');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(13, '2 яйца,1сл горчица,1сл червен винен оцет,4сл зехтин,6скилидки чесън,Аншоа,100гр пармезан,1бр лимон,800гр пилешки гърдички,Розмарин,Мащерка,60гр масло,Хляб,Айсберг');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(13, 'Сос: 2 жълтъка, 1 лъжица горчица, червен винен оцет се разбиват с бая зехтин. Добавят се 3 нарязани скилидки чесън, премесени с аншоата, нарязани с ножа докато не се получи пюре.Добавя се 40гр пармезан и сок от един лимон, заедно с малко вода.,Пилешки гърдички: овалят се в сол и пепер, пържат се в тиган с зехтин, заедно с чесън, розмарин, мащерка. Като хванат коричка се добавят и 60гр масло, с които се заливат, докато се пържат. Когато са готови ги поливаме с част от дресинга на салатата и ги оставяме да изстинат.,Крутони: В същия тиган, в който са пекани пържолите: нарязан хляб на крутони, сол, пепер, като потъмнеят пармезан.,Крутоните, пържолите, дресинга и айсберга се смесват и се добавя остатъка от пармезана.');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(14, '2сл зехтин,1 глава лук,1 Морков,1бр целина,5 скилидки чесън,червени чушки, нарязани, мариновани в буркан,3 консерви белени домати,Червено вино,Магданоз,1бр яйце,500гр телешко-свинска кайма, микс,100гр галея,100гр пармезан,2 пакета моцарела,Брускети');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(14, 'Тиган, зехтин, лук, морков, целина, чесън, червени чушки в буркан, нарязани, червено вино, 3 консерви домати белени, от които едното бурканче напълнено с вода, като се изсипят в тигана, сол, пепер, 15 мин ври.,Магданоз, чесън, едно яйце, кайма телешка-свинска 500гр, 100гр галея, сол, пепер, зехтин, пармезан 100гр, омесват се и се разделят на малки топки кюфтаци, овалят се в брашно.,Тиган, зехтин, кюфтенцата вътре, искаме само коричка, не искаме да ги сготвим.,блендира се доматеното чудо в първия тиган. Кюфтенцата в доматите, бълбукат 50 мин,Моцарела, нарязва се на тънко, брускета на две, сос отгоре на брускетата, кюфтенцата отгоре, отгоре моцарела, отиват в фурната 2-3 мин.');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(15, 'I. За кюфтета:,,* Телешка кайма, към 60 гр на кюфте.,* Чесън на прах,* Лук на прах,* Чили,* Сол,* Пепер,* Жълтък от яйце,,II. За барбекю сос:,,* глава лук,* 5 глави чесън,* сол, пепер,* кафява захар, супена лъжица с връх,* пушен червен пепер, супена лъжица с връх,* бял винегрет,* Сос уорчестър / унисос маги,* Доматен кетчуп,,III. За всеки бургер:,,* 2 Питки,* Марула,* Домат,* Чедър 1-2 слайса,* 1 яйце,* Пушен бекон 2-3 слайса,* Сол и пепер');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(15, 'I. Кюфтетата се омесват с гореизброените продукти и се слагат в хладилника.,,II. За соса:,,* Загрява се тиган с зехтин,* Добавя се нарязан на ситно лук,* Когато лука се запърже се добавя чесън,* Сол и пепер, кафява захар, червен пепер,* Омесват се продуктите, докато не слепнат,* Добавя се бял винегрет, сос уорчестър и доматен кетчуп,* Намаля се котлона и се изчаква сместта да се сгъсти.,,III. След като соса е готов:,,* Загрява се тиган с зехтин,* Запържват се кюфтетата, като когато хванат лек загар и са почти готови се добавя масло и се намаля котлона,* Кюфтетата се заливат със соса от тигана,* След като са готови се изкарват от тигана и се добавят слайсове чедър върху тях.,,IV. В същия тиган, в който са запържени кюфтетата се запържват и питките от двете страни.,,V. Прави се яйце на очи,,VI. Запържва се бекона в тиган с зехтин,,VII. Кюфтетата, питките, соса, яйцето, бекона, зелената салата и домата се сглобяват.');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(16, '4 яйца,2/3 ч.ч. брашно,2/3 ч.ч. вода,1 к.ч. олио,сол,черен пипер,захар,олио за тигана');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(16, '1 Правиш си сместа,2 После и палачинките 😉');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(17, '3 -яйца,1ч.ч -брашно,1ч.ч-захар,1/2 ч.ч-олио,1ч.л-бакпулвер,2-ванилия,150гр. ягоди,пудра захар,масло за намазване на тавичката');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(17, 'Яйцата и захарта се разбъркват много добре,след това се добавя пресято брашно,олиото,бакпулвера и ванилията.,Намазва се тавичката с масло от всички страни и след това се добавя сместа.,Ягодите се измиват и нарязват като се нареждат с разрязаната част нагоре.,В предварително загрята фурна -180* се пече за около 30-35мин.,Десерта трябва да изтине напълно,поръсва  се с пудра захар и се сервира!');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(18, 'Настърган лук,Натрошен чесън,Риган,Сол,,Пепер,,Белени домати в доматен сос консерва,Босилек,,Зеленчуков бульон,,500гр брашно,1 Пакетче мая,325мл вода,Зехтин,Пармезан,Моцарела,Луканка,Царевица,Маслини');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(18, 'I. Сос:,- В загрят тиган с зехтин се слага настъргания лук,- Когато лука омекне се добавя чесъна и се запържва,- Добавя се сол, пепер, риган и бурканчето с обелените домати и соса, добавят се и 400мл зеленчуков бульон.,- Намаля се котлона и се оставя сместа да се сгъсти, като се добавят и листа от босилек,II. Тесто:,- Смесват се 500гр брашно, сол, пепер, пакетче мая и 325мл загрята вода. Полученото тесто се нарязва на 4 равни части (за 4 бр пица) и се оставя да втаса покрито за 2 часа.,III. Подготовка за печене:,- Тестото се наточва в кръгла форма,- Върху него се нанася приготвения сос,- Полива се със зехтин,- Сол и пепер,- Пармезан,- Моцарела,- Луканка,- Царевица,- Маслини,IV. Сглобената пица се слага в фурната на 220 градуса.');

INSERT INTO recipe_entity_products (recipe_entity_id, products)
VALUES(19, 'банани - 2 бр.,яйца - 2 бр.,овесени ядки - 90 г,прясно мляко - около 1/2 каф.ч.,масло - за намазване');
INSERT INTO recipe_entity_steps(recipe_entity_id, steps)
VALUES(19, 'Овесените ядки предварително се запичат на сух тиган.,В блендер се смилат продуктите: нарязаните банани, яйцата, овесените ядки и прясно мляко.,,С голяма лъжица се изсипва от сместа върху намазан с масло тиган за палачинки (може да се правят по 2-3 палачинки наведнъж).');

INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (1, 'ако е онова на Шушата е ТОП!', '2021-12-14 18:33:10', 2, 2);
INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (2, 'Всеки път става различна! ха ха ха', '2021-12-14 18:52:57', 2, 5);
INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (3, 'Баш неговото ще е! ТОП-ТОП!', '2021-12-16 15:27:01', 3, 2);
INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (4, '😋😍🥰', '2021-12-18 19:41:20', 2, 4);
INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (5, 'Хехе, много ясно!', '2021-12-26 07:25:34', 1, 2);
INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (6, 'Защото снощи правих кееекс!', '2022-01-03 16:26:27', 1, 1);
INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (7, 'Баси яката рецепта! Браво !', '2022-01-13 17:21:16', 1, 16);
INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (8, 'Много готина мусака', '2022-02-16 18:53:35', 1, 3);
INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (9, 'На 25/3/22 с Патюшка си направихме и ….следва продължение!', '2022-03-25 20:09:12', 2, 11);
INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (10, '…..  E,беше ФАМОЗНО!!! 🥰😍😚🤩😃😋', '2022-04-02 15:38:07', 2, 11);
INSERT INTO comments (id, content, created_at, owner_id, target_recipe_id)
VALUES (11, 'Оооооо тоя сладкиш е тооп ви казвам. Дегостиран е мноогократно!', '2022-05-13 18:57:51', 1, 17);

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