(() => {
  "use strict";

  const LANGS = ["en", "de", "fr", "he"];
  const LOCALES = { en: "en-GB", de: "de-DE", fr: "fr-FR", he: "he-IL" };
  const TZ = "Asia/Jerusalem";
  // ?demo loads sample data for previewing the layout before the first weekly run
  const DEMO = new URLSearchParams(location.search).has("demo");
  const CHECKOUT_CUTOFF_HOUR = 14; // on check-out day, after this hour the page assumes the next guest

  const UI = {
    en: {
      co_tomorrow: tm => `Check-out tomorrow by ${tm} - three things to do`, co_today: tm => `Check-out today by ${tm} - three things to do`,
      more_txt: "More",
      less_txt: "Less",
      tour_pill: "Tour",
      map_all: "All places on one map",
      map_title: "Plan your walk", map_text: "Two ready-made walking routes through the places above. They open in Google Maps and start at the first stop.",
      ok_title: "Everything OK?",
      ok_text: "Something missing, or not quite right? Tell me now and I will sort it out.",
      ok_btn: "Message Oren",
      fav: "My guests' pick", more_tours: "all tours",
      tours_title: "Day trips & tours", tab_tours: "Tours", book: "Details & booking",
      sos_static2: "Siren? Here's what to do", open_sat: "Open Sat", closed_sat: "closed Sat", until: "until", from: "from", open_247: "24/7", load_error: "Couldn't load the apartment guide - check your connection and refresh, or message Oren.",
      home_intro: "This is my home: you have your own room, and the kitchen, bathroom and living room are shared with me - I live here too. Below is what guests ask me most; the tiles lead to the other pages.", jump_house_sub: "Kitchen, AC, hot water, rules, emergency", jump_tours_sub: "Day trips I recommend", jump_places_sub: "Where I eat, what I love nearby", jump_week_sub: "Events in Tel Aviv", house_lead: "The room and the shared spaces: how things work, the house rules, and what to do in an emergency.", hood_title: "The city and the neighbourhood", hood_city_h: "Tel Aviv", hood_nz_h: "Neve Tzedek", hood_fl_h: "Florentin", hood_city: "Tel Aviv is more than a hundred years old: in 1909, 66 Jewish families drew plots of land by lottery on the sand dunes north of the ancient port of Jaffa. Jaffa and Tel Aviv became one city in 1950. In the 1930s the city filled with Bauhaus and International Style buildings, and the White City has been a UNESCO World Heritage Site since 2003.", hood_nz: "Neve Tzedek, a short walk from Florentin, was the first Jewish neighbourhood built outside the old city of Jaffa, in the 1880s. It fell into neglect by the 1960s, and from the end of the 1980s its old houses were restored. Today it is artist studios, cafés, boutiques and the Suzanne Dellal Centre for dance and theatre.", hood_text: "Florentin was founded in 1927 by Jews who came from Salonika, Greece, and is named after the Florentin family. The first residents were immigrants from Greece, Bulgaria, Turkey and North Africa, and they filled it with workshops, garages and small factories - some are still here. In the 1990s artists and young people, drawn by cheap rents, started moving in. Between the old workshops and colourful old buildings you will also find Bauhaus-style houses - some worn, many being restored - and today street art, bars and cafés.", hood_today: "Today Florentin is Tel Aviv's hipster neighbourhood: street art on almost every wall, galleries and cafés by day, and bars and clubs that fill up late - locals go out after 22:00. A few minutes from the flat, Levinsky market sells spices, nuts and dried fruit, and the area is full of design and furniture shops.", eat_sat: "Open on Saturday", d_fri: "Fri", d_sat: "Sat", closed_sun: "closed Sun", days_vary: "days vary - check Instagram", hummus_out: "until the hummus runs out (~14:30)", home_welcome: "Welcome to Cozy Room Florentin. This guide is here to make your stay easy: how things work in the apartment, a few tips from me, and the places, food and events I would send a friend to. Everything is one tap away - start with the tiles below.", sub_places: "Places", sub_eat: "Eat", jump_places: "Places & food", eat_more: n => `${n} more places`, eat_less: "Show fewer", gal_photos: n => `${n} photos`, gal_close: "Close", gal_prev: "Previous photo", gal_next: "Next photo", tab_home: "Home", tab_house: "Apartment", tab_places: "Places", tab_week: "This week",
      first_title: "Your first hour", first_lead: "What every guest asks about on day one - tap a tile.", hi_morning: "Good morning", hi_afternoon: "Good afternoon", hi_evening: "Good evening", hi_night: "Good night", hi_city: "Tel Aviv",
      brand: "A cozy room in Florentin", brand_short: "Cozy room", welcome: "Welcome home",
      house_title: "The apartment", week_title: "This week in Tel Aviv",
      places_title: "Places I love", places_lead: "My favourite corners of the city - most within a 20-minute walk. Tap a photo for more pictures, the Map button for directions. Guided-tour buttons are partner links - same price for you.", map: "Open in Maps", photo: "Photo",
      cat_food: "Food & restaurants", cat_culture: "Culture & city events", cat_nightlife: "Nightlife & parties",
      footer: "Made with care by your host. Enjoy Florentin!",
      stay_until: d => `Events during your stay · until ${d}`,
      checkout_today: "Check-out today - safe travels!",
      whatsapp: "WhatsApp Oren", sos: "Emergency", sos_police: "Police", sos_amb: "Ambulance", sos_fire: "Fire", map_short: "Map", reset_dates: "Reset to booking dates",
      welcome_name: n => `Welcome home, ${n}`, name_prompt: "Your first name", name_save: "Save", name_change: "Not you?",
      stay_label: "Showing events from today until your check-out:", stay_label_none: "Showing events from today. Enter your check-out date to narrow the list:",
      updated: d => `Updated ${d}`,
      during_stay: "during your stay", tip: "Worth a visit", new_opening: "New", ongoing: "Ongoing",
      empty: "Nothing listed for your dates in this category yet - check another tab.",
      loading: "Loading…", unavailable: "This week's listings are being refreshed. Please check back soon.",
      more: "Details", copy: "Copy", copied: "Copied", source: "via",
    },
    de: {
      co_tomorrow: tm => `Check-out morgen bis ${tm} - drei Dinge vorher`, co_today: tm => `Check-out heute bis ${tm} - drei Dinge vorher`,
      more_txt: "Mehr",
      less_txt: "Weniger",
      tour_pill: "Tour",
      map_all: "Alle Orte auf einer Karte",
      map_title: "Planen Sie Ihren Spaziergang", map_text: "Zwei fertige Fußrouten durch die Orte oben. Sie öffnen sich in Google Maps und beginnen am ersten Stopp.",
      ok_title: "Alles in Ordnung?",
      ok_text: "Fehlt etwas oder stimmt etwas nicht? Sagen Sie es mir jetzt, ich kümmere mich darum.",
      ok_btn: "Oren schreiben",
      fav: "Tipp meiner Gäste", more_tours: "alle Touren",
      tours_title: "Ausflüge & Touren", tab_tours: "Touren", book: "Details & Buchung",
      sos_static2: "Sirene? So geht's", open_sat: "Sa. offen", closed_sat: "Sa. geschlossen", until: "bis", from: "ab", open_247: "rund um die Uhr", load_error: "Der Wohnungsguide konnte nicht geladen werden - Verbindung prüfen und neu laden, oder Oren schreiben.",
      home_intro: "Das ist mein Zuhause: Sie haben Ihr eigenes Zimmer, Küche, Bad und Wohnzimmer teilen Sie mit mir - ich wohne auch hier. Unten steht, was Gäste mich am häufigsten fragen; die Kacheln führen zu den anderen Seiten.", jump_house_sub: "Küche, Klima, Warmwasser, Regeln, Notfall", jump_tours_sub: "Ausflüge, die ich empfehle", jump_places_sub: "Wo ich esse, was ich in der Nähe liebe", jump_week_sub: "Veranstaltungen in Tel Aviv", house_lead: "Das Zimmer und die gemeinsamen Räume: wie alles funktioniert, die Hausregeln und was im Notfall zu tun ist.", hood_title: "Die Stadt und das Viertel", hood_city_h: "Tel Aviv", hood_nz_h: "Neve Tzedek", hood_fl_h: "Florentin", hood_city: "Tel Aviv ist über hundert Jahre alt: 1909 losten 66 jüdische Familien Grundstücke auf den Sanddünen nördlich des antiken Hafens von Jaffa aus. 1950 wurden Jaffa und Tel Aviv zu einer Stadt. In den 1930er Jahren füllte sich die Stadt mit Bauhaus- und Internationalem Stil, und die Weiße Stadt ist seit 2003 UNESCO-Welterbe.", hood_nz: "Neve Tzedek, ein kurzer Spaziergang von Florentin entfernt, war in den 1880er Jahren das erste jüdische Viertel außerhalb der Altstadt von Jaffa. In den 1960er Jahren verfiel es, und ab Ende der 1980er wurden die alten Häuser restauriert. Heute gibt es dort Künstlerateliers, Cafés, Boutiquen und das Suzanne Dellal Centre für Tanz und Theater.", hood_text: "Florentin wurde 1927 von Juden aus Saloniki (Griechenland) gegründet und trägt den Namen der Familie Florentin. Die ersten Bewohner waren Einwanderer aus Griechenland, Bulgarien, der Türkei und Nordafrika; sie füllten es mit Werkstätten, Garagen und kleinen Fabriken - einige gibt es noch. In den 1990er Jahren zogen Künstler und junge Leute zu, angelockt von günstigen Mieten. Zwischen den alten Werkstätten und bunten alten Häusern stehen auch Häuser im Bauhaus-Stil - manche abgenutzt, viele werden gerade restauriert -, und heute gibt es hier Street Art, Bars und Cafés.", hood_today: "Heute ist Florentin das Hipster-Viertel von Tel Aviv: Street Art an fast jeder Wand, tagsüber Galerien und Cafés, abends Bars und Clubs, die sich spät füllen - die Einheimischen gehen erst nach 22:00 aus. Ein paar Minuten von der Wohnung entfernt verkauft der Levinsky-Markt Gewürze, Nüsse und Trockenfrüchte, und im Viertel gibt es viele Design- und Möbelläden.", eat_sat: "Samstags geöffnet", d_fri: "Fr.", d_sat: "Sa.", closed_sun: "So. geschlossen", days_vary: "Tage variieren - Instagram prüfen", hummus_out: "bis der Hummus aus ist (~14:30)", home_welcome: "Willkommen im Cozy Room Florentin. Dieser Guide macht Ihren Aufenthalt leichter: wie in der Wohnung alles funktioniert, ein paar Tipps von mir und die Orte, Restaurants und Veranstaltungen, die ich einem Freund empfehlen würde. Alles ist nur einen Fingertipp entfernt - starten Sie mit den Kacheln unten.", sub_places: "Orte", sub_eat: "Essen", jump_places: "Orte & Essen", eat_more: n => `${n} weitere Orte`, eat_less: "Weniger anzeigen", gal_photos: n => `${n} Fotos`, gal_close: "Schließen", gal_prev: "Vorheriges Foto", gal_next: "Nächstes Foto", tab_home: "Home", tab_house: "Wohnung", tab_places: "Orte", tab_week: "Woche",
      first_title: "Ihre erste Stunde", first_lead: "Was jeder Gast am ersten Tag fragt - Kachel antippen.", hi_morning: "Guten Morgen", hi_afternoon: "Guten Tag", hi_evening: "Guten Abend", hi_night: "Gute Nacht", hi_city: "Tel Aviv",
      brand: "Ein gemütliches Zimmer in Florentin", brand_short: "Gemütliches Zimmer", welcome: "Willkommen zu Hause",
      house_title: "Die Wohnung", week_title: "Diese Woche in Tel Aviv",
      places_title: "Meine Lieblingsorte", places_lead: "Meine liebsten Ecken der Stadt - die meisten in 20 Minuten zu Fuß. Foto antippen für mehr Bilder, Karte-Button für den Weg. Die Tour-Buttons sind Partnerlinks - gleicher Preis für Sie.", map: "In Maps öffnen", photo: "Foto",
      cat_food: "Essen & Restaurants", cat_culture: "Kultur & Stadtevents", cat_nightlife: "Nachtleben & Partys",
      footer: "Mit Liebe von Ihrem Gastgeber. Viel Spaß in Florentin!",
      stay_until: d => `Veranstaltungen während Ihres Aufenthalts · bis ${d}`,
      checkout_today: "Heute ist Check-out - gute Reise!",
      whatsapp: "WhatsApp an Oren", sos: "Notfall", sos_police: "Polizei", sos_amb: "Rettung", sos_fire: "Feuerwehr", map_short: "Karte", reset_dates: "Zurück zu den Buchungsdaten",
      welcome_name: n => `Willkommen zu Hause, ${n}`, name_prompt: "Ihr Vorname", name_save: "Speichern", name_change: "Nicht Sie?",
      stay_label: "Events von heute bis zu Ihrem Check-out:", stay_label_none: "Events ab heute. Check-out-Datum eingeben, um die Liste einzugrenzen:",
      updated: d => `Aktualisiert am ${d}`,
      during_stay: "während Ihres Aufenthalts", tip: "Einen Besuch wert", new_opening: "Neu", ongoing: "Laufend",
      empty: "Für Ihre Daten gibt es in dieser Kategorie noch nichts - schauen Sie in einen anderen Reiter.",
      loading: "Wird geladen…", unavailable: "Die Tipps dieser Woche werden gerade aktualisiert. Bitte später erneut vorbeischauen.",
      more: "Details", copy: "Kopieren", copied: "Kopiert", source: "via",
    },
    fr: {
      co_tomorrow: tm => `Départ demain avant ${tm} - trois choses à faire`, co_today: tm => `Départ aujourd'hui avant ${tm} - trois choses à faire`,
      more_txt: "Plus",
      less_txt: "Moins",
      tour_pill: "Visite",
      map_all: "Tous les lieux sur une carte",
      map_title: "Planifiez votre balade", map_text: "Deux itinéraires à pied prêts à l'emploi à travers les lieux ci-dessus. Ils s'ouvrent dans Google Maps et partent du premier arrêt.",
      ok_title: "Tout va bien ?",
      ok_text: "Il manque quelque chose, ou quelque chose ne va pas ? Dites-le-moi maintenant, je m'en occupe.",
      ok_btn: "Écrire à Oren",
      fav: "Le choix de mes voyageurs", more_tours: "toutes les excursions",
      tours_title: "Excursions & visites", tab_tours: "Visites", book: "Détails et réservation",
      sos_static2: "Sirène ? Voici quoi faire", open_sat: "Ouvert sam.", closed_sat: "fermé sam.", until: "jusqu'à", from: "à partir de", open_247: "24h/24", load_error: "Impossible de charger le guide - vérifiez la connexion et rechargez, ou écrivez à Oren.",
      home_intro: "Voici ma maison : vous avez votre propre chambre, la cuisine, la salle de bains et le salon sont partagés avec moi - j'habite ici aussi. Voici ce que les voyageurs me demandent le plus ; les tuiles mènent aux autres pages.", jump_house_sub: "Cuisine, clim, eau chaude, règles, urgence", jump_tours_sub: "Excursions que je recommande", jump_places_sub: "Où je mange, ce que j'aime près d'ici", jump_week_sub: "Événements à Tel Aviv", house_lead: "La chambre et les espaces partagés : comment tout fonctionne, le règlement et que faire en cas d'urgence.", hood_title: "La ville et le quartier", hood_city_h: "Tel Aviv", hood_nz_h: "Neve Tzedek", hood_fl_h: "Florentin", hood_city: "Tel Aviv a plus de cent ans : en 1909, 66 familles juives ont tiré au sort des parcelles sur les dunes de sable au nord de l'antique port de Jaffa. Jaffa et Tel Aviv sont devenues une seule ville en 1950. Dans les années 1930, la ville s'est couverte d'immeubles Bauhaus et de style international, et la Ville blanche est inscrite au patrimoine mondial de l'UNESCO depuis 2003.", hood_nz: "Neve Tzedek, à quelques pas de Florentin, a été le premier quartier juif construit hors de la vieille ville de Jaffa, dans les années 1880. Il était à l'abandon dans les années 1960, et ses vieilles maisons ont été restaurées à partir de la fin des années 1980. Aujourd'hui, on y trouve des ateliers d'artistes, des cafés, des boutiques et le Suzanne Dellal Centre de danse et de théâtre.", hood_text: "Florentin a été fondé en 1927 par des Juifs venus de Salonique, en Grèce, et porte le nom de la famille Florentin. Les premiers habitants étaient des immigrés de Grèce, de Bulgarie, de Turquie et d'Afrique du Nord ; ils l'ont rempli d'ateliers, de garages et de petites usines - certains sont toujours là. Dans les années 1990, artistes et jeunes, attirés par les loyers bas, s'y sont installés. Entre les anciens ateliers et les vieux immeubles colorés, on trouve aussi des maisons de style Bauhaus - certaines fatiguées, beaucoup en cours de restauration - et aujourd'hui du street art, des bars et des cafés.", hood_today: "Aujourd'hui, Florentin est le quartier hipster de Tel Aviv : du street art sur presque chaque mur, des galeries et des cafés le jour, des bars et des clubs qui se remplissent tard - les gens du coin sortent après 22h. À quelques minutes de l'appartement, le marché Levinsky vend épices, noix et fruits secs, et le quartier regorge de boutiques de design et de meubles.", eat_sat: "Ouvert le samedi", d_fri: "ven.", d_sat: "sam.", closed_sun: "fermé dim.", days_vary: "jours variables - voir Instagram", hummus_out: "jusqu'à épuisement de l'houmous (~14:30)", home_welcome: "Bienvenue au Cozy Room Florentin. Ce guide est là pour faciliter votre séjour : comment tout fonctionne dans l'appartement, quelques conseils de ma part, et les lieux, restaurants et événements que je recommanderais à un ami. Tout est à portée de doigt - commencez par les tuiles ci-dessous.", sub_places: "Lieux", sub_eat: "Manger", jump_places: "Lieux & table", eat_more: n => `${n} autres adresses`, eat_less: "Voir moins", gal_photos: n => `${n} photos`, gal_close: "Fermer", gal_prev: "Photo précédente", gal_next: "Photo suivante", tab_home: "Accueil", tab_house: "Appart", tab_places: "Lieux", tab_week: "Semaine",
      first_title: "Votre première heure", first_lead: "Ce que tout voyageur demande le premier jour - touchez une tuile.", hi_morning: "Bonjour", hi_afternoon: "Bon après-midi", hi_evening: "Bonsoir", hi_night: "Bonne nuit", hi_city: "Tel Aviv",
      brand: "Une chambre cosy à Florentin", brand_short: "Chambre cosy", welcome: "Bienvenue chez vous",
      house_title: "L'appartement", week_title: "Cette semaine à Tel Aviv",
      places_title: "Mes endroits préférés", places_lead: "Mes coins préférés de la ville - la plupart à 20 minutes à pied. Touchez la photo pour plus d'images, le bouton Carte pour l'itinéraire. Les boutons de visite guidée sont des liens partenaires - même prix pour vous.", map: "Ouvrir dans Maps", photo: "Photo",
      cat_food: "Cuisine & restaurants", cat_culture: "Culture & événements", cat_nightlife: "Vie nocturne & soirées",
      footer: "Préparé avec soin par votre hôte. Profitez de Florentin !",
      stay_until: d => `Événements pendant votre séjour · jusqu'au ${d}`,
      checkout_today: "Départ aujourd'hui - bon voyage !",
      whatsapp: "WhatsApp à Oren", sos: "Urgences", sos_police: "Police", sos_amb: "Ambulance", sos_fire: "Pompiers", map_short: "Carte", reset_dates: "Revenir aux dates de la réservation",
      welcome_name: n => `Bienvenue chez vous, ${n}`, name_prompt: "Votre prénom", name_save: "Enregistrer", name_change: "Ce n'est pas vous ?",
      stay_label: "Événements d'aujourd'hui jusqu'à votre départ :", stay_label_none: "Événements à partir d'aujourd'hui. Indiquez votre date de départ pour affiner la liste :",
      updated: d => `Mis à jour le ${d}`,
      during_stay: "pendant votre séjour", tip: "À découvrir", new_opening: "Nouveau", ongoing: "En cours",
      empty: "Rien pour vos dates dans cette catégorie pour l'instant - essayez un autre onglet.",
      loading: "Chargement…", unavailable: "Les sorties de la semaine sont en cours de mise à jour. Revenez bientôt.",
      more: "Détails", copy: "Copier", copied: "Copié", source: "via",
    },
    he: {
      co_tomorrow: tm => `צ'ק-אאוט מחר עד ${tm} - שלושה דברים לעשות`, co_today: tm => `צ'ק-אאוט היום עד ${tm} - שלושה דברים לעשות`,
      more_txt: "עוד",
      less_txt: "פחות",
      tour_pill: "סיור",
      map_all: "כל המקומות על מפה אחת",
      map_title: "תכננו את הטיול הרגלי", map_text: "שני מסלולי הליכה מוכנים דרך המקומות שלמעלה. נפתחים בגוגל מפות ומתחילים מהעצירה הראשונה.",
      ok_title: "הכל בסדר?",
      ok_text: "משהו חסר או לא בדיוק כמו שצריך? ספרו לי עכשיו ואסדר את זה.",
      ok_btn: "לכתוב לאורן",
      fav: "הבחירה של האורחים שלי", more_tours: "כל הסיורים",
      tours_title: "טיולי יום וסיורים", tab_tours: "טיולים", book: "פרטים והזמנה",
      sos_static2: "אזעקה? מה עושים", open_sat: "פתוח בשבת", closed_sat: "סגור בשבת", until: "עד", from: "מ-", open_247: "24/7", load_error: "לא הצלחנו לטעון את מדריך הדירה - בדקו חיבור ורעננו, או כתבו לאורן.",
      home_intro: "זה הבית שלי: יש לכם חדר משלכם, והמטבח, חדר האמבטיה והסלון משותפים איתי - אני גר פה גם. למטה מה שאורחים שואלים אותי הכי הרבה, והאריחים מובילים לשאר הדפים.", jump_house_sub: "מטבח, מזגן, מים חמים, כללים, חירום", jump_tours_sub: "טיולי יום שאני ממליץ עליהם", jump_places_sub: "איפה אני אוכל, מה אני אוהב בסביבה", jump_week_sub: "אירועים בתל אביב", house_lead: "החדר והחללים המשותפים: איך הכל עובד, כללי הבית ומה עושים במקרה חירום.", hood_title: "העיר והשכונה", hood_city_h: "תל אביב", hood_nz_h: "נווה צדק", hood_fl_h: "פלורנטין", hood_city: "תל אביב היא עיר בת יותר ממאה שנה: ב-1909 הגרילו 66 משפחות יהודיות מגרשים על דיונות החול מצפון לנמל העתיק של יפו. ב-1950 יפו ותל אביב אוחדו לעיר אחת. בשנות ה-30 התמלאה העיר בבניינים בסגנון באוהאוס והסגנון הבינלאומי, וה\"עיר הלבנה\" היא אתר מורשת עולמית של אונסק\"ו מאז 2003.", hood_nz: "נווה צדק, הליכה קצרה מפלורנטין, הייתה השכונה היהודית הראשונה שנבנתה מחוץ לעיר העתיקה של יפו, בשנות ה-80 של המאה ה-19. עד שנות ה-60 היא הידרדרה, ומסוף שנות ה-80 שיפצו את בתיה הישנים. היום יש בה סטודיות של אמנים, בתי קפה, בוטיקים ומרכז סוזן דלל למחול ותיאטרון.", hood_text: "פלורנטין הוקמה ב-1927 על ידי יהודים שבאו מסלוניקי שביוון, והיא נקראת על שם משפחת פלורנטין. התושבים הראשונים היו עולים מיוון, בולגריה, טורקיה וצפון אפריקה, והם מילאו אותה בבתי מלאכה, מוסכים ומפעלים קטנים - חלקם עדיין כאן. בשנות ה-90 התחילו להגיע אמנים וצעירים, שנמשכו לשכר דירה זול. בין בתי המלאכה הישנים והבניינים הישנים והצבעוניים יש כאן גם בתים בסגנון באוהאוס - חלקם שחוקים, רבים בשיפוץ - והיום גם אמנות רחוב, ברים ובתי קפה.", hood_today: "היום פלורנטין היא השכונה ההיפסטרית של תל אביב: אמנות רחוב כמעט על כל קיר, גלריות ובתי קפה ביום, וברים ומועדונים שמתמלאים מאוחר - המקומיים יוצאים אחרי 22:00. כמה דקות מהדירה, שוק לוינסקי מוכר תבלינים, אגוזים ופירות יבשים, והאזור מלא בחנויות עיצוב ורהיטים.", eat_sat: "פתוח בשבת", d_fri: "שישי", d_sat: "שבת", closed_sun: "סגור בראשון", days_vary: "הימים משתנים - לבדוק באינסטגרם", hummus_out: "עד שהחומוס נגמר (~14:30)", home_welcome: "ברוכים הבאים ל-Cozy Room פלורנטין. המדריך הזה נועד להקל עליכם את השהייה: איך הכל עובד בדירה, כמה טיפים ממני, והמקומות, המסעדות והאירועים שהייתי ממליץ עליהם לחבר. הכל במרחק לחיצה - תתחילו מהאריחים למטה.", sub_places: "מקומות", sub_eat: "אוכל", jump_places: "מקומות ואוכל", eat_more: n => `עוד ${n} מקומות`, eat_less: "הצג פחות", gal_photos: n => `${n} תמונות`, gal_close: "סגירה", gal_prev: "התמונה הקודמת", gal_next: "התמונה הבאה", tab_home: "בית", tab_house: "הדירה", tab_places: "מקומות", tab_week: "השבוע",
      first_title: "השעה הראשונה שלכם", first_lead: "מה שכל אורח שואל ביום הראשון - לחצו על תמונה.", hi_morning: "בוקר טוב", hi_afternoon: "צהריים טובים", hi_evening: "ערב טוב", hi_night: "לילה טוב", hi_city: "תל אביב",
      brand: "חדר נעים בפלורנטין", brand_short: "חדר נעים", welcome: "ברוכים הבאים הביתה",
      house_title: "הדירה", week_title: "השבוע בתל אביב",
      places_title: "מקומות שאני אוהב", places_lead: "הפינות האהובות עליי בעיר - רובן ב-20 דקות הליכה. לחיצה על התמונה פותחת עוד תמונות, כפתור המפה מנווט. כפתורי הסיור המודרך הם קישורי שותפים - אותו מחיר בשבילכם.", map: "פתיחה במפות", photo: "צילום",
      cat_food: "אוכל ומסעדות", cat_culture: "תרבות ואירועים", cat_nightlife: "חיי לילה ומסיבות",
      footer: "הוכן באהבה על ידי המארח שלכם. תיהנו מפלורנטין!",
      stay_until: d => `אירועים במהלך השהות · עד ${d}`,
      checkout_today: "צ'ק-אאוט היום - נסיעה טובה!",
      whatsapp: "וואטסאפ לאורן", sos: "חירום", sos_police: "משטרה", sos_amb: "מד\"א", sos_fire: "כיבוי אש", map_short: "מפה", reset_dates: "חזרה לתאריכי ההזמנה",
      welcome_name: n => `ברוכים הבאים הביתה, ${n}`, name_prompt: "השם שלכם", name_save: "שמירה", name_change: "לא אתם?",
      stay_label: "אירועים מהיום ועד הצ'ק-אאוט שלכם:", stay_label_none: "אירועים מהיום. הזינו תאריך צ'ק-אאוט כדי לצמצם את הרשימה:",
      updated: d => `עודכן ${d}`,
      during_stay: "במהלך השהות", tip: "שווה ביקור", new_opening: "חדש", ongoing: "מתמשך",
      empty: "עדיין אין פריטים לתאריכים שלכם בקטגוריה הזו - נסו לשונית אחרת.",
      loading: "טוען…", unavailable: "רשימת השבוע מתעדכנת כרגע. בדקו שוב בקרוב.",
      more: "פרטים", copy: "העתקה", copied: "הועתק", source: "מתוך",
    },
  };

  const state = { lang: pickLang(), cat: "food", house: null, places: null, weekly: null, stays: null, gallery: null };

  // Personalisation lives only in this browser. A link from the host's Airbnb message can carry
  // ?guest=Anna&checkout=2026-10-26 (Airbnb fills those in); we store them once and drop them from the URL.
  function guestName() { try { return (localStorage.getItem("guest") || "").trim().slice(0, 40); } catch (_) { return ""; } }
  function setGuestName(n) { try { n ? localStorage.setItem("guest", n.trim().slice(0, 40)) : localStorage.removeItem("guest"); } catch (_) {} }
  (function readLinkParams() {
    const q = new URLSearchParams(location.search);
    const g = (q.get("guest") || "").replace(/[<>"'&]/g, "").trim();
    const co = q.get("checkout") || "";
    let touched = false;
    if (g) { setGuestName(g); touched = true; }
    let iso = /^\d{4}-\d{2}-\d{2}$/.test(co) ? co : "";
    if (!iso && co) { const dt = new Date(co); if (!isNaN(dt)) iso = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`; }
    if (iso) { try { localStorage.setItem("checkout", iso); } catch (_) {} touched = true; }
    if (touched) { q.delete("guest"); q.delete("checkout"); history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q : "") + location.hash); }
  })();

  // ---------- helpers ----------
  function pickLang() {
    try {
      const saved = localStorage.getItem("lang");
      if (LANGS.includes(saved)) return saved;
    } catch (_) { /* storage blocked */ }
    const nav = (navigator.languages || [navigator.language || "en"]).map(l => l.slice(0, 2).toLowerCase());
    return nav.find(l => LANGS.includes(l)) || "en";
  }
  function saveLang(l) { try { localStorage.setItem("lang", l); } catch (_) {} }

  // "YYYY-MM-DD" of the current date in Tel Aviv, plus the local hour
  function nowInTLV() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hour12: false,
    }).formatToParts(new Date());
    const get = t => parts.find(p => p.type === t).value;
    return { date: `${get("year")}-${get("month")}-${get("day")}`, hour: Number(get("hour")) % 24 };
  }
  // Sunrise/sunset for Tel Aviv (NOAA approximation), returned as minutes-of-day in local (TLV) time.
  function sunTimesTLV(now = new Date()) {
    const lat = 32.08 * Math.PI / 180, lon = 34.78;
    const tlv = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(now);
    const g = t => Number(tlv.find(p => p.type === t).value);
    const localMin = (g("hour") % 24) * 60 + g("minute");
    const utcMin = now.getUTCHours() * 60 + now.getUTCMinutes();
    let offset = localMin - utcMin; if (offset > 720) offset -= 1440; if (offset < -720) offset += 1440;
    const start = Date.UTC(g("year"), 0, 0), doy = Math.floor((Date.UTC(g("year"), g("month") - 1, g("day")) - start) / 864e5);
    const y = 2 * Math.PI / 365 * (doy - 1 + (12 - 12) / 24);
    const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(y) - 0.032077 * Math.sin(y) - 0.014615 * Math.cos(2 * y) - 0.040849 * Math.sin(2 * y));
    const decl = 0.006918 - 0.399912 * Math.cos(y) + 0.070257 * Math.sin(y) - 0.006758 * Math.cos(2 * y) + 0.000907 * Math.sin(2 * y) - 0.002697 * Math.cos(3 * y) + 0.00148 * Math.sin(3 * y);
    const ha = Math.acos(Math.cos(90.833 * Math.PI / 180) / (Math.cos(lat) * Math.cos(decl)) - Math.tan(lat) * Math.tan(decl)) * 180 / Math.PI;
    const sunrise = 720 - 4 * (lon + ha) - eq + offset;
    const sunset = 720 - 4 * (lon - ha) - eq + offset;
    return { nowMin: localMin, sunrise, sunset };
  }
  function skyPhase() {
    const { nowMin: m, sunrise, sunset } = sunTimesTLV();
    const dawn = sunrise - 30, dusk = sunset + 25, glow = sunset - 75;
    if (m < dawn || m >= dusk) return "night";
    if (m >= glow) return "evening";
    if (m < 11 * 60) return "morning";
    return "noon";
  }
  function fmtDate(iso, opts) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Intl.DateTimeFormat(LOCALES[state.lang], { timeZone: "UTC", ...opts }).format(Date.UTC(y, m - 1, d));
  }
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null) continue;   // null/undefined attribute = not set (a null "hidden" must not hide the node)
      if (k === "class") n.className = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    for (const k of kids.flat()) if (k != null) n.append(k.nodeType ? k : document.createTextNode(k));
    return n;
  };
  // {{key}} placeholders; a per-language object picks the current language
  const fill = (s, host) => String(s).replace(/\{\{(\w+)\}\}/g, (_, k) => {
    const v = host[k];
    return v && typeof v === "object" ? (v[state.lang] ?? v.en ?? "") : (v ?? "");
  });
  const t = key => UI[state.lang][key];
  const ARROW = () => state.lang === "he" ? "←" : "→";
  // External links on a card or section: [{label: {en,...}, url: "https://..." | {en,...}}]
  const extLinks = links => el("div", { class: "ext-links" },
    links.map(l => el("a", { href: L_(l.url), target: "_blank", rel: "noopener" }, L_(l.label) + " " + ARROW())));
  // "until 17:00, closed Sat" style hour strings -> localised
  const hoursText = h => typo(String(h || "")
    .replace(/from 8:00 until the hummus runs out \(~14:30\)/, t("from") + " 8:00 " + t("hummus_out"))
    .replace(/days vary - check Instagram/, t("days_vary"))
    .replace(/\b24\/7\b/, t("open_247")).replace(/closed Sat/g, t("closed_sat")).replace(/closed Sun/g, t("closed_sun"))
    .replace(/\buntil\b/g, t("until")).replace(/\bfrom\b/g, t("from")).replace(/open Shabbat/g, t("open_sat"))
    .replace(/Fri-Sat/g, t("d_fri") + "-" + t("d_sat")).replace(/\bFri\b/g, t("d_fri")).replace(/\bSat\b/g, t("d_sat")).replace(/מ- (?=\d)/g, "מ-"));

  // Names mentioned in text become links: places -> their card, apartment cards -> the card,
  // shops/restaurants -> their map link. Built from the JSON, so nothing to maintain by hand.
  const LINKS = new Map();
  function registerLinks() {
    LINKS.clear();
    const add = (name, href, kind) => { if (name && name.length > 3) LINKS.set(name, { href, kind }); };
    for (const c of (state.house && state.house.cards) || []) {
      for (const L of LANGS) add(c.title[L], "#card-" + c.id, "card");
      for (const lst of c.lists || []) for (const r of lst.rows) add(r.name, r.url, "out");
    }
    // places win over shop rows with the same name (Levinsky Market -> the place card, not the map)
    for (const p of (state.places && state.places.places) || []) for (const L of LANGS) add(p.title[L], "#place-" + p.id, "in");
    const placeAlias = { beach: ["The beach", "the beach", "Strand", "la plage", "הים", "החוף"], old_jaffa: ["Old Jaffa", "Alt-Jaffa", "vieux Jaffa", "יפו העתיקה", "flea market", "Flohmarkt", "marché aux puces", "שוק הפשפשים"],
      jaffa_port: ["Jaffa Port", "Hafen von Jaffa", "port de Jaffa", "נמל יפו"], carmel: ["Carmel Market", "Carmel-Markt", "marché du Carmel", "שוק הכרמל"],
      rothschild: ["Rothschild", "רוטשילד"], neve_tzedek: ["Neve Tzedek", "נווה צדק"], levinsky: ["Levinsky", "Levinski", "לוינסקי"], hatachana: ["HaTachana", "התחנה"] };
    for (const [id, names] of Object.entries(placeAlias)) if ((state.places && state.places.places || []).some(p => p.id === id)) for (const n of names) add(n, "#place-" + id, "in");
    // a few plain words that point at cards
    const alias = { en: { "Groceries card": "shops", "Emergency card": "emergency", "kitchen guide": "kitchen", "House rules": "rules" },
                    de: { "Karte Einkaufen": "shops", "Karte Notfall": "emergency", "Küchenguide": "kitchen" },
                    fr: { "carte Courses": "shops", "carte Urgences": "emergency", "guide cuisine": "kitchen" },
                    he: { "כרטיס קניות": "shops", "כרטיס חירום": "emergency", "מדריך המטבח": "kitchen" } };
    for (const L of LANGS) for (const [k, id] of Object.entries(alias[L] || {})) add(k, "#card-" + id, "card");
    // phrases that point at the separate kitchen guide page
    const kitchenPage = (state.house && state.house.cards.find(c => c.id === "kitchen") || {}).link;
    if (kitchenPage) for (const k of ["The full guide", "full kitchen guide", "kitchen guide", "Die vollständige Anleitung", "Küchenguide", "Le guide complet", "guide cuisine", "המדריך המלא", "מדריך המטבח"])
      add(k, kitchenPage.href + "?lang=" + state.lang, "page");
  }
  // 480px variant for phones (generated as <name>-m.webp next to the original); desktop gets the original
  const smallSrc = (src, full) => /^assets\/img\/(eat|places)\/.*\.webp$/.test(src) ? { srcset: `${src.replace(/\.webp$/, "-m.webp")} 480w, ${src} ${full}w`, sizes: "(min-width: 900px) 520px, 100vw" } : {};
  // Typographic polish at display time (content files stay plain): " - " -> en dash, Hebrew gershayim/geresh, curly quotes
  function typo(text) {
    let t = String(text ?? "");
    t = t.replace(/ - /g, " \u2013 ");
    t = t.replace(/(?<=[\u05D0-\u05EA])"(?=[\u05D0-\u05EA])/g, "\u05F4").replace(/(?<=[\u05D0-\u05EA])'(?=[\u05D0-\u05EA])/g, "\u05F3");
    t = t.replace(/"([^"\n]{1,60})"/g, state.lang === "de" ? "\u201E$1\u201C" : state.lang === "fr" ? "\u00AB\u202F$1\u202F\u00BB" : "\u201C$1\u201D");
    return t;
  }
  function rich(text, selfId) {
    text = typo(text);
    if (!LINKS.size) return [text];
    const keys = [...LINKS.keys()].sort((a, b) => b.length - a.length);
    const re = new RegExp("(" + keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "g");
    const isLetter = ch => /[\p{L}\p{N}]/u.test(ch || "");
    const out = []; let last = 0, m;
    while ((m = re.exec(text))) {
      const before = text[m.index - 1], after = text[m.index + m[0].length];
      // whole words only (a Hebrew prefix letter ו/ב/ל/מ/ה/ש/כ directly before is fine)
      if (isLetter(after) || (isLetter(before) && !(/[ובלמהשכ]/.test(before) && !isLetter(text[m.index - 2])))) continue;
      const { href, kind } = LINKS.get(m[0]);
      if (selfId && href === "#card-" + selfId) continue;
      if (m.index > last) out.push(text.slice(last, m.index));
      const attrs = { class: "auto " + kind, href };
      if (kind === "out") { attrs.target = "_blank"; attrs.rel = "noopener"; }
      else if (kind === "page") { /* same tab */ }
      else attrs.onclick = e => { e.preventDefault(); showCardPage(href.slice(1)); const d = document.querySelector(href); if (!d) return; if (d.tagName === "DETAILS") d.open = true; requestAnimationFrame(() => d.scrollIntoView({ block: "start", behavior: "smooth" })); };
      out.push(el("a", attrs, m[0] + (kind === "out" ? " ↗" : "")));
      last = m.index + m[0].length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
  }
  const L_ = o => (o && typeof o === "object") ? (o[state.lang] ?? o.en ?? "") : (o ?? "");

  // ---------- line glyphs (3.10 polish): one consistent icon set, drawn in the accent colour ----------
  const CHEV = '<path d="m6 9 6 6 6-6"/>';
  const GLYPHS = {
    kitchen: '<path d="M4 11h16v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M2 11h2M20 11h2"/><path d="M9 4.5c-.7.8-.7 1.7 0 2.5M12 4c-.7.8-.7 1.7 0 2.5M15 4.5c-.7.8-.7 1.7 0 2.5"/>',
    tami4: '<path d="M12 3.5s6 6.4 6 10.7a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5z"/><path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2.5"/>',
    ac: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/><path d="m9.5 4.5 2.5 2 2.5-2M9.5 19.5l2.5-2 2.5 2"/>',
    tv: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8.5 21h7M12 17v4"/>',
    hot_water: '<path d="M4.5 21V7.5a3.5 3.5 0 0 1 3.5-3.5h3.5a2.5 2.5 0 0 1 2.5 2.5V8"/><path d="M9.5 12a4.5 4.5 0 0 1 9 0z"/><path d="M11 15.5v1M14 15.5v1M17 15.5v1M12.5 19v1M15.5 19v1"/>',
    laundry: '<path d="M8.5 3.5 4 6.5l2 3.8 2-1v11.2h8V9.3l2 1 2-3.8-4.5-3c-.4 1.5-1.9 2.6-3.5 2.6S8.9 5 8.5 3.5z"/>',
    checkout: '<rect x="4" y="7.5" width="16" height="12.5" rx="2.2"/><path d="M9 7.5V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5v2M9 11.5v4.5M15 11.5v4.5"/>',
    emergency: '<path d="M10.3 4.2 2.6 17.6A2 2 0 0 0 4.3 20.6h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4M12 17h.01"/>',
    rules: '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M12 17.2s-3-1.7-3-3.6a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 1.9-3 3.6-3 3.6z"/>',
    shops: '<circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/><path d="M3 4h2.2l2.3 11h10.9L21 7.5H6"/>',
    eat: '<path d="M6.5 3v5.5a2 2 0 0 0 4 0V3M8.5 10.5V21M8.5 3v4"/><path d="M17 21V3c-2.2 1.2-3 4-3 8h3"/>',
    florentin: '<path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6z"/><path d="M9 4v14M15 6v14"/>',
    review: '<path d="M4.5 5h15a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1H10l-4.5 3.5v-3.5h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="M8 9.5h8M8 12.5h5"/>',
  };
  const svg = (paths, size = 24) => {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("width", size); s.setAttribute("height", size);
    s.setAttribute("fill", "none"); s.setAttribute("stroke", "currentColor"); s.setAttribute("stroke-width", "1.8");
    s.setAttribute("stroke-linecap", "round"); s.setAttribute("stroke-linejoin", "round"); s.setAttribute("aria-hidden", "true");
    s.innerHTML = paths; return s;
  };
  const glyph = (id, emoji) => el("span", { class: "ico", "aria-hidden": "true" }, GLYPHS[id] ? svg(GLYPHS[id]) : emoji);

  async function getJSON(path) {
    const r = await fetch(path, { cache: "no-cache" });
    if (!r.ok) throw new Error(`${path}: ${r.status}`);
    return r.json();
  }

  // ---------- stay window (from calendar-derived check-out dates) ----------
  // The calendar only tells us the next check-out; it can't know who opened the page.
  // A guest may override it with the date picker (kept in this browser only).
  function guestCheckout() {
    try { const v = localStorage.getItem("checkout"); return /^\d{4}-\d{2}-\d{2}$/.test(v || "") ? v : null; } catch (_) { return null; }
  }
  function setGuestCheckout(v) { try { v ? localStorage.setItem("checkout", v) : localStorage.removeItem("checkout"); } catch (_) {} }
  function currentStay() {
    const { date: today, hour } = nowInTLV();
    const chosen = guestCheckout();
    if (chosen && chosen >= today) return { today, checkout: chosen, source: "guest" };
    const checkouts = (state.stays && state.stays.checkouts) || [];
    const next = checkouts.slice().sort().find(c => c > today || (c === today && hour < CHECKOUT_CUTOFF_HOUR));
    return { today, checkout: next || null, source: next ? "calendar" : null };
  }

  // ---------- render ----------
  function renderChrome() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "he" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(n => { const v = t(n.dataset.i18n); n.textContent = typeof v === "string" ? typo(v) : v; });
    document.querySelectorAll(".lang button").forEach(b =>
      b.setAttribute("aria-checked", String(b.dataset.lang === state.lang)));
    const lc = document.getElementById("lang-cur"); if (lc) lc.textContent = state.lang === "he" ? "עב" : state.lang.toUpperCase();
    const bw = document.getElementById("burger-wa"), wb = document.getElementById("wa-btn"); if (bw && wb) bw.href = wb.href;
    const bt = document.getElementById("burger-tours"); if (bt) bt.hidden = !!(document.getElementById("tours") && document.getElementById("tours").hidden);
    document.querySelectorAll("#cat-tabs button").forEach(b =>
      b.setAttribute("aria-selected", String(b.dataset.cat === state.cat)));

    const name = guestName();
    const hr = nowInTLV().hour;
    const hiKey = hr < 5 ? "hi_night" : hr < 12 ? "hi_morning" : hr < 18 ? "hi_afternoon" : hr < 23 ? "hi_evening" : "hi_night";
    const sky = skyPhase();
    document.getElementById("eyebrow").replaceChildren(
      el("img", { class: "sky", src: `assets/img/sky/${sky}.webp`, alt: "", width: "40", height: "40", loading: "eager" }),
      el("span", {}, `${t(hiKey)} · ${t("hi_city")}`));
    document.getElementById("welcome").textContent = name ? t("welcome_name")(name) : t("welcome");
    const nb = document.getElementById("name-box");
    nb.replaceChildren();
    // Name: a single quiet pill while unknown; once set, only a small "Not you?" link (3.10 polish)
    nb.classList.toggle("named", !!name);
    if (name) {
      nb.append(el("button", { class: "linkish not-you", type: "button", onclick: () => { setGuestName(""); renderChrome(); } }, t("name_change")));
    } else {
      const inp = el("input", { type: "text", maxlength: "40", placeholder: t("name_prompt"), autocomplete: "given-name", "aria-label": t("name_prompt"), enterkeyhint: "done" });
      const save = () => { if (inp.value.trim()) { setGuestName(inp.value); renderChrome(); } };
      inp.addEventListener("keydown", e => { if (e.key === "Enter") save(); });
      nb.append(inp, el("button", { class: "name-save", type: "button", onclick: save }, t("name_save")));
    }
    // Emergency numbers: one quiet line in the guest's language (the static English line is the no-script fallback)
    const sl = document.getElementById("sos-static");
    if (sl) sl.replaceChildren(...[["sos_police", "100"], ["sos_amb", "101"], ["sos_fire", "102"]].flatMap(([k, n], i) =>
      [i ? el("span", { class: "sep", "aria-hidden": "true" }, " · ") : null, el("span", { class: "sos-n" }, t(k) + " ", el("a", { href: "tel:" + n }, n))]).filter(Boolean));

    const wa = document.getElementById("wa-btn");
    const num = state.house && String(state.house.host.whatsapp || "").replace(/\D/g, "");
    if (num) wa.href = `https://wa.me/${num}`;
    wa.hidden = !(num || wa.getAttribute("href"));

    // date picker for the events section
    const { today, checkout, source } = currentStay();
    // The evening before and on the day itself: a small reminder under the greeting that opens the check-out card
    const coB = document.getElementById("co-banner");
    if (coB) {
      const [y, mo, da] = today.split("-").map(Number);
      const tomorrow = new Date(Date.UTC(y, mo - 1, da + 1)).toISOString().slice(0, 10);
      const tm = (state.house && state.house.host.checkout_time) || "12:00";
      const which = checkout === today ? "co_today" : checkout === tomorrow ? "co_tomorrow" : null;
      coB.hidden = !which;
      if (which) coB.textContent = t(which)(tm) + " " + ARROW();
    }
    // "Everything OK?" card (3.10): from the day after the first visit until check-out, opens WhatsApp
    const ok = document.getElementById("ok-card");
    if (ok) {
      let first = null;
      try { first = localStorage.getItem("firstOpen"); if (!first) { first = today; localStorage.setItem("firstOpen", today); } } catch (e) {}
      const show = first && first < today && (!checkout || today <= checkout) && num;
      ok.hidden = !show;
      if (show) { ok.querySelector("h3").textContent = t("ok_title"); ok.querySelector("p").textContent = t("ok_text"); ok.querySelector("a").href = `https://wa.me/${num}`; ok.querySelector("a").textContent = t("ok_btn") + " " + ARROW(); }
    }
    const label = document.getElementById("stay-label");
    const input = document.getElementById("checkout-input");
    const reset = document.getElementById("checkout-reset");
    label.textContent = checkout ? t("stay_label") : t("stay_label_none");
    input.min = today;
    input.value = checkout || "";
    reset.hidden = source !== "guest";
  }

  function renderHouse() {
    const box = document.getElementById("house-cards");
    box.replaceChildren();
    if (!state.house) return;
    const host = state.house.host;
    const L = state.lang;
    const groups = state.house.groups || {};
    const grids = {};
    for (const [gid, label] of Object.entries(groups)) {
      grids[gid] = el("div", { class: "cards", "data-group": gid });
      box.append(el("h3", { class: "group-title", "data-group": gid }, el("span", { class: "dot", "aria-hidden": "true" }), L_(label)), grids[gid]);
    }
    const strip = document.getElementById("first-hour");
    strip.replaceChildren();
    const firsts = state.house.cards.filter(c => c.first_hour).sort((a, b) => a.first_hour - b.first_hour);
    for (const c of firsts) {
      strip.append(el("a", { class: "tile", href: "#card-" + c.id, onclick: e => { e.preventDefault(); showCardPage("card-" + c.id); const d = document.getElementById("card-" + c.id); if (!d) return; d.open = true; requestAnimationFrame(() => d.scrollIntoView({ block: "start", behavior: "smooth" })); } },
        (c.tile || c.thumb) ? el("img", { src: c.tile || c.thumb, alt: "", loading: "lazy" }) : el("span", { class: "tile-ico" }, c.icon),
        el("span", { class: "tile-txt" }, el("strong", {}, L_(c.title)), el("span", {}, typo(L_(c.sub))))));
    }
    document.getElementById("first").hidden = firsts.length === 0;
    for (const c of state.house.cards) {
      const body = el("div", { class: "body" });
      const parts = { img: null, kv: null, tel: null, items: null, steps: [] };
      if (c.image) {
        parts.img = el("img", { class: "card-img", src: c.image, alt: (c.image_alt && L_(c.image_alt)) || "", loading: "lazy",
          onerror: e => e.target.remove() });
      }
      if (c.kv) {
        const dl = el("dl", { class: "kv" });
        for (const row of c.kv) {
          const val = fill(row.value, host);
          const dd = el("dd", {}, val);
          if (row.copy && navigator.clipboard) {
            const btn = el("button", { class: "copy", type: "button" }, t("copy"));
            btn.addEventListener("click", async () => {
              try { await navigator.clipboard.writeText(val); btn.textContent = t("copied"); } catch (_) {}
              setTimeout(() => { btn.textContent = t("copy"); }, 1500);
            });
            dd.append(btn);
          }
          dl.append(el("dt", {}, L_(row.label)), dd);
        }
        parts.kv = dl;
      }
      if (c.tel) {
        parts.tel = el("div", { class: "tel" },
          c.tel.map(x => el("a", { href: "tel:" + fill(x.number, host).replace(/[^\d+]/g, "") }, "📞 " + L_(x.label))));
      }
      if (c.items && c.id === "checkout") {
        // tick-box list (3.10): ticks are remembered on this phone for the day
        let done = {}; try { done = JSON.parse(localStorage.getItem("co-" + (new Date()).toISOString().slice(0, 10)) || "{}"); } catch (e) {}
        parts.items = el("ul", { class: "checks" }, L_(c.items).map((s, i) => {
          const id = "co-" + i;
          const cb = el("input", { type: "checkbox", id, checked: done[i] ? "" : null, onchange: e => { done[i] = e.target.checked; try { localStorage.setItem("co-" + (new Date()).toISOString().slice(0, 10), JSON.stringify(done)); } catch (x) {} } });
          if (!done[i]) cb.removeAttribute("checked");
          return el("li", { class: "check" }, cb, el("label", { for: id }, ...rich(fill(s, host), c.id)));
        }));
      } else if (c.items) parts.items = el("ul", {}, L_(c.items).map(s => el("li", {}, ...rich(fill(s, host), c.id))));
      if (c.steps) {
        if (c.steps_title) parts.steps.push(el("h4", { class: "sec-title" }, L_(c.steps_title)));
        parts.steps.push(el("ol", { class: "steps" }, L_(c.steps).map(s => el("li", {}, ...rich(fill(s, host), c.id)))));
      }
      // A card with numbered steps (the emergency card) shows what to DO first, the photo and phone numbers after
      body.append(...(c.steps ? [parts.items, ...parts.steps, parts.img, parts.kv, parts.tel]
                              : [parts.img, parts.kv, parts.tel, parts.items]).filter(Boolean));
      if (c.video) {
        body.append(el("video", { class: "card-video", src: c.video.src, poster: c.video.poster || "", muted: "", loop: "", playsinline: "", controls: "", preload: "none" }));
        body.append(el("p", { class: "muted small" }, L_(c.video.caption)));
      }
      for (const lst of c.lists || []) {
        body.append(el("h4", { class: "sec-title" }, L_(lst.title)));
        body.append(el("ul", { class: "plain" }, lst.rows.map(r => el("li", { class: "row" + (r.image ? " row-img" : "") },
          r.image ? el("a", { class: "row-pic", href: r.url, target: "_blank", rel: "noopener", "aria-hidden": "true", tabindex: "-1" },
            el("img", { src: r.image, alt: "", loading: "lazy", onerror: e => e.target.closest(".row-pic").remove() })) : null,
          el("div", { class: "row-txt" },
            el("a", { href: r.url, target: "_blank", rel: "noopener" }, r.name),
            el("span", { class: "muted" }, `${r.where} · ${hoursText(r.hours)}`),
            r.shabbat === true ? el("span", { class: "badge sat" }, t("open_sat")) : null,
            r.note ? el("div", { class: "muted small" }, typo(L_(r.note))) : null,
            (r.links || r.image_credit) ? el("div", { class: "row-links small" },
              ...(r.links || []).map(l => el("a", { href: l.url, target: "_blank", rel: "noopener" }, l.label + " " + ARROW())),
              r.image_credit ? el("a", { class: "credit-link", href: r.image_credit_url || r.url, target: "_blank", rel: "noopener" }, `${t("photo")}: ${r.image_credit}`) : null) : null)))));
      }
      for (const sec of c.sections || []) {
        body.append(el("h4", { class: "sec-title" }, L_(sec.title)));
        if (sec.image) body.append(el("img", { class: "card-img card-img-tall", src: sec.image, alt: (sec.image_alt && L_(sec.image_alt)) || "", loading: "lazy", onerror: e => e.target.remove() }));
        if (sec.items) body.append(el("ul", {}, L_(sec.items).map(s => el("li", {}, ...rich(fill(s, host), c.id)))));
        if (sec.links) body.append(extLinks(sec.links));
      }
      if (c.links) body.append(extLinks(c.links));
      if (c.link) body.append(el("div", { class: "tel" },
        el("a", { href: `${c.link.href}?lang=${L}` }, L_(c.link.label) + " " + ARROW())));

      // One icon system for every card (3.10 polish): a line glyph in a tinted square. The real photos
      // of the devices stay inside the card body, where the guest needs them.
      const card = el("details", { class: "card" + (c.emergency ? " emergency" : ""), id: "card-" + c.id },
        el("summary", {},
          glyph(c.id, c.icon),
          el("span", {}, el("h3", {}, fill(L_(c.title), host)), el("span", { class: "sub" }, typo(fill(L_(c.sub), host)))),
          el("span", { class: "chev", "aria-hidden": "true" }, svg(CHEV))),
        body);
      if (c.id === "eat") continue;   // rendered as its own open section (3.10, like "Places I love")
      (grids[c.group] || box).append(card);
    }
    // A group with fewer than three cards spreads them across the whole row instead of leaving a gap
    for (const g of Object.values(grids)) g.style.setProperty("--cols", Math.min(Math.max(g.children.length, 1), 3));
  }

  // "Where Oren eats" as open photo cards, same look as the places (3.10)
  function renderEat() {
    const sec = document.getElementById("eat"), box = document.getElementById("eat-list");
    const c = state.house && state.house.cards.find(x => x.id === "eat");
    if (!sec || !box) return;
    sec.hidden = !c; box.replaceChildren();
    if (!c) return;
    document.getElementById("eat-title").textContent = L_(c.title);
    document.getElementById("eat-lead").textContent = typo(L_(c.sub));
    const satBtn = document.getElementById("eat-sat"); satBtn.setAttribute("aria-pressed", String(!!state.eatSat));
    for (const lst of c.lists || []) {
      const rows = state.eatSat ? lst.rows.filter(r => r.shabbat === true) : lst.rows;
      if (!rows.length) continue;
      box.append(el("h3", { class: "group-title eat-group" }, el("span", { class: "dot", "aria-hidden": "true" }), L_(lst.title)));
      const SHOW = 4, extra = [];
      rows.forEach((r, i) => {
        const card = el("article", { class: "place eat" + (i >= SHOW ? " eat-extra" : ""), hidden: i >= SHOW ? "" : null },
          r.image ? el("a", { class: "place-media", href: r.url, target: "_blank", rel: "noopener", "aria-label": r.name },
            el("img", { src: r.image, alt: r.name, loading: "lazy", ...smallSrc(r.image, 900), onerror: e => e.target.closest(".place-media").remove() }),
            r.shabbat === true ? el("span", { class: "walk" }, t("open_sat")) : null) : null,
          el("div", { class: "place-body" },
            el("h3", {}, r.name),
            el("p", { class: "muted small" }, `${r.where} · ${hoursText(r.hours)}`),
            r.note ? el("p", { class: "place-text open" }, typo(L_(r.note))) : null,
            // Same footer as the place cards: compact Map pill + short "Photo ↗" credit link (designer round 2, item 3)
            el("div", { class: "place-foot" },
              el("a", { class: "map-link", href: r.url, target: "_blank", rel: "noopener", "aria-label": t("map") + ": " + r.name }, svg('<path d="M12 21s-6-5.2-6-11a6 6 0 0 1 12 0c0 5.8-6 11-6 11z"/><circle cx="12" cy="10" r="2.3"/>', 16), el("span", {}, t("map_short"))),
              r.image_credit ? el("a", { class: "credit-link", href: r.image_credit_url || r.url, target: "_blank", rel: "noopener", title: `${t("photo")}: ${r.image_credit}` }, t("photo") + (state.lang === "he" ? " ↖" : " ↗")) : null)));
        box.append(card); if (i >= SHOW) extra.push(card);
      });
      if (extra.length) {
        const btn = el("button", { class: "more-btn eat-more", type: "button", "aria-expanded": "false",
          onclick: () => { const open = btn.getAttribute("aria-expanded") !== "true"; extra.forEach(c => { c.hidden = !open; }); btn.setAttribute("aria-expanded", String(open)); btn.textContent = open ? t("eat_less") : t("eat_more")(extra.length); } }, t("eat_more")(extra.length));
        box.append(btn);
      }
    }
  }
  function renderPlaces() {
    const box = document.getElementById("places-list");
    box.replaceChildren();
    if (!state.places) return;
    for (const p of state.places.places) {
      const txt = el("p", { class: "place-text" }, ...rich(L_(p.text)));
      // Full photo credit (CC BY needs it) lives in the "More" part; collapsed cards show only "Photo ↗" (3.10 polish)
      const credit = el("a", { class: "credit-full", href: p.credit_url, target: "_blank", rel: "noopener", hidden: "" }, `${t("photo")}: ${p.credit}`);
      const more = el("button", { class: "more-btn", type: "button", "aria-expanded": "false",
        onclick: e => { const open = txt.classList.toggle("open"); credit.hidden = !open; e.currentTarget.setAttribute("aria-expanded", open); e.currentTarget.textContent = open ? t("less_txt") : t("more_txt"); } }, t("more_txt"));
      const main = { src: p.image, caption: p.title, credit: p.credit, credit_url: p.credit_url };
      box.append(el("article", { class: "place", id: "place-" + p.id },
        galleryMedia(el("a", { class: "place-media", href: p.map, target: "_blank", rel: "noopener", "aria-label": L_(p.title) },
          el("img", { src: p.image, alt: L_(p.title), loading: "lazy", width: "1200", height: "675", ...smallSrc(p.image, 780), style: p.focus ? "object-position:" + p.focus : null }),
          el("span", { class: "walk" }, L_(p.walk)),
          p.tour ? el("span", { class: "tour-pill" }, "🧭 " + t("tour_pill")) : null,
          galleryBadge(p.id, main)), p.id, main),
        el("div", { class: "place-body" },
          el("h3", {}, L_(p.title)),
          txt, credit, more,
          p.tour ? el("a", { class: "place-tour", href: p.tour.url, target: "_blank", rel: "noopener sponsored" }, "🧭 " + L_(p.tour.label) + " " + ARROW()) : null,
          el("div", { class: "place-foot" },
            el("a", { class: "map-link", href: p.map, target: "_blank", rel: "noopener", "aria-label": t("map") + ": " + L_(p.title) }, svg('<path d="M12 21s-6-5.2-6-11a6 6 0 0 1 12 0c0 5.8-6 11-6 11z"/><circle cx="12" cy="10" r="2.3"/>', 16), el("span", {}, t("map_short"))),
            el("a", { class: "credit-link", href: p.credit_url, target: "_blank", rel: "noopener", title: `${t("photo")}: ${p.credit}` }, t("photo") + (state.lang === "he" ? " ↖" : " ↗"))))));
    }
    // Map card (3.10 evening): small illustration, one sentence, walking routes through public landmarks.
    // No start address: the first stop is a public place, so nothing private ever reaches the page.
    const routeUrl = r => {
      const st = r.stops, enc = encodeURIComponent;
      return "https://www.google.com/maps/dir/?api=1&travelmode=" + (r.mode || "walking") + "&origin=" + enc(st[0]) +
        "&destination=" + enc(st[st.length - 1]) + (st.length > 2 ? "&waypoints=" + st.slice(1, -1).map(enc).join("%7C") : "");
    };
    const q = state.places.places.map(p => (p.title.en || L_(p.title)) + " Tel Aviv").join(" | ");
    const all = state.places.map_all || ("https://www.google.com/maps/search/" + encodeURIComponent(q));
    const pin = (x, y) => `<circle cx="${x}" cy="${y}" r="5" fill="var(--accent)"/><circle cx="${x}" cy="${y}" r="2" fill="var(--surface)"/>`;
    const art = el("div", { class: "mapcard-art", "aria-hidden": "true" });
    art.innerHTML = '<svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice"><rect width="320" height="120" fill="var(--accent-soft)"/>' +
      '<path d="M0 96c40-8 70 6 110-4s70-10 110-2 70 0 100-6V120H0z" fill="var(--chip)"/>' +
      '<path d="M30 30 90 52 140 40 200 74 270 58" fill="none" stroke="var(--accent)" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/>' +
      pin(30, 30) + pin(90, 52) + pin(140, 40) + pin(200, 74) + pin(270, 58) + "</svg>";
    box.append(el("section", { class: "mapcard" }, art,
      el("div", { class: "mapcard-body" },
        el("h3", {}, t("map_title")),
        el("p", {}, t("map_text")),
        el("div", { class: "mapcard-routes" }, (state.places.routes || []).map(r =>
          el("a", { class: "route", href: routeUrl(r), target: "_blank", rel: "noopener" },
            el("strong", {}, "🚶 " + L_(r.title)), el("span", {}, L_(r.meta))))),
        el("a", { class: "mapcard-all", href: all, target: "_blank", rel: "noopener" }, t("map_all") + " " + ARROW()))));
  }

  // Day trips & tours: open photo cards (same look as the weekly events), each with a partner link
  // ---------- photo gallery (3.10, Oren): extra photos for tours and places ----------
  // assets/img/gallery/manifest.json maps an item id to [{src, caption, credit, credit_url}].
  // A small "N photos" button on the card opens a full-screen strip (native scroll-snap, no library).
  function galleryPhotos(id, main) {
    const extra = (state.gallery && state.gallery[id]) || [];
    return extra.length ? [main, ...extra] : null;
  }
  function galleryBadge(id, main) {
    const photos = galleryPhotos(id, main);
    if (!photos) return null;
    return el("span", { class: "gal-badge", "aria-hidden": "true" },
      svg('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3.2"/><path d="M8 5l1.2-2h5.6L16 5"/>', 14),
      String(photos.length));
  }
  // Tapping the card photo opens the gallery when there is one (the map / booking links stay in the card)
  function galleryMedia(media, id, main) {
    const photos = galleryPhotos(id, main);
    if (!photos) return media;
    media.setAttribute("role", "button");
    media.setAttribute("aria-label", t("gal_photos")(photos.length));
    media.removeAttribute("aria-hidden"); media.removeAttribute("tabindex");
    media.addEventListener("click", e => { e.preventDefault(); openGallery(photos, 0); });
    return media;
  }
  function openGallery(photos, start) {
    let dlg = document.getElementById("lightbox");
    if (!dlg) { dlg = el("dialog", { id: "lightbox", class: "lightbox" }); document.body.append(dlg); }
    dlg.replaceChildren();
    const strip = el("div", { class: "lb-strip" }, photos.map(ph =>
      el("figure", { class: "lb-item" },
        el("img", { src: ph.src, alt: L_(ph.caption) || "", loading: "lazy" }),
        el("figcaption", {},
          el("span", { class: "lb-cap" }, L_(ph.caption) || ""),
          ph.credit ? el("a", { class: "lb-credit", href: ph.credit_url || "#", target: "_blank", rel: "noopener" }, `${t("photo")}: ${ph.credit}`) : null))));
    const counter = el("span", { class: "lb-count" }, `1 / ${photos.length}`);
    const go = d => { const w = strip.clientWidth; strip.scrollBy({ left: d * w * (document.documentElement.dir === "rtl" ? -1 : 1), behavior: "smooth" }); };
    strip.addEventListener("scroll", () => { const i = Math.round(Math.abs(strip.scrollLeft) / strip.clientWidth); counter.textContent = `${Math.min(i + 1, photos.length)} / ${photos.length}`; }, { passive: true });
    dlg.append(
      el("div", { class: "lb-top" }, counter,
        el("button", { class: "lb-close", type: "button", "aria-label": t("gal_close"), onclick: () => dlg.close() }, "✕")),
      strip,
      el("button", { class: "lb-nav lb-prev", type: "button", "aria-label": t("gal_prev"), onclick: () => go(-1) }, "‹"),
      el("button", { class: "lb-nav lb-next", type: "button", "aria-label": t("gal_next"), onclick: () => go(1) }, "›"));
    dlg.onclick = e => { if (e.target === dlg) dlg.close(); };   // tap the dark backdrop to close
    dlg.showModal();
    if (start) strip.scrollTo({ left: start * strip.clientWidth * (document.documentElement.dir === "rtl" ? -1 : 1) });
  }

  function renderTours() {
    const sec = document.getElementById("tours"), box = document.getElementById("tours-list");
    const tr = state.house && state.house.tours;
    const has = !!(tr && tr.items && tr.items.length);
    sec.hidden = !has;
    document.querySelectorAll('.jump a[href="#tours"], .tabbar a[data-target="tours"]').forEach(a => { a.hidden = !has; });
    box.replaceChildren();
    if (!has) return;
    document.getElementById("tours-lead").textContent = L_(tr.lead);
    const tn = document.getElementById("tours-note"); tn.textContent = L_(tr.note); tn.hidden = !tr.note;
    for (const it of tr.items) {
      if (it.langs && !it.langs.includes(state.lang)) continue;   // e.g. a Hebrew-only booking site
      const url = L_(it.url);                                     // may differ per language (English landing page)
      const main = { src: it.image, caption: it.title, credit: it.image_credit, credit_url: it.image_credit_url };
      const media = galleryMedia(el("a", { class: "ev-media", href: url, target: "_blank", rel: "noopener sponsored", "aria-hidden": "true", tabindex: "-1" },
        el("img", { src: it.image, alt: "", loading: "lazy", referrerpolicy: "no-referrer",
          onerror: e => { e.target.parentNode.replaceWith(el("div", { class: "ev-media ph ph-culture", "aria-hidden": "true" }, "🧭")); } }),
        galleryBadge(it.id, main)), it.id, main);
      // One uniform tile per tour (3.10 evening): photo, title, meta, short blurb, book link
      box.append(el("article", { class: "ev tour tour-tile", id: "tour-" + it.id },
        media,
        el("div", { class: "tour-txt" },
          it.fav ? el("span", { class: "fav-line" }, "★ " + t("fav")) : null,
          el("h3", {}, L_(it.title)),
          el("div", { class: "where" }, typo(L_(it.meta))),
          el("p", {}, typo(L_(it.blurb))),
          el("a", { class: "book", href: url, target: "_blank", rel: "noopener sponsored" }, t("book") + " " + ARROW()),
          // Photo credit as a short link under the text, same as the place cards (designer review 3.10, item 12)
          it.image_credit ? el("a", { class: "credit-link", href: it.image_credit_url || url, target: "_blank", rel: "noopener", title: `${t("photo")}: ${it.image_credit}` }, t("photo") + (state.lang === "he" ? " ↖" : " ↗")) : null)));
    }
    if (tr.more) box.append(el("a", { class: "more-tours", href: tr.more.url, target: "_blank", rel: "noopener sponsored" }, L_(tr.more.label) + " " + ARROW()));
  }

  const MAX_FEED_AGE_DAYS = 10;
  function feedIsStale() {
    if (!state.weekly || !state.weekly.generated_at) return true;
    const age = (Date.now() - Date.parse(state.weekly.generated_at)) / 86400000;
    return !(age >= -1 && age <= MAX_FEED_AGE_DAYS);
  }
  function renderEvents() {
    // Hide category chips that have nothing in the window (3.10); jump to the first one that does
    try {
      const { today: t0, checkout: c0 } = currentStay();
      const inWin = it => { const ds = it.date_start, de = it.date_end || ds; return !ds || (de >= t0 && (!c0 || ds <= c0)); };
      const counts = {}; for (const it of (state.weekly && state.weekly.items) || []) if (inWin(it)) counts[it.category] = (counts[it.category] || 0) + 1;
      const chips = document.querySelectorAll(".tabs button[data-cat]");
      if (chips.length && Object.keys(counts).length) {
        chips.forEach(b => { b.hidden = !counts[b.dataset.cat]; });
        if (!counts[state.cat]) { const first = [...chips].find(b => counts[b.dataset.cat]); if (first) { state.cat = first.dataset.cat; chips.forEach(b => b.setAttribute("aria-selected", String(b === first))); } }
      }
    } catch (e) {}

    const box = document.getElementById("events");
    const meta = document.getElementById("week-meta");
    box.replaceChildren();
    // A feed that failed to load or wasn't refreshed for over 10 days is hidden entirely -
    // showing expired events would be worse than showing nothing.
    const stale = state.weekly !== undefined && feedIsStale();
    document.getElementById("week").hidden = stale;
    document.querySelector('.jump a[href="#week"]').hidden = stale;
    const wt = document.querySelector('.tabbar a[data-target="week"]'); if (wt) wt.hidden = stale;
    const bwk = document.querySelector('#burger-panel a[href="#week"]'); if (bwk) bwk.hidden = stale;
    if (stale) { route(); return; }
    if (!state.weekly) {
      box.append(el("p", { class: "empty" }, state.weekly === null ? t("unavailable") : t("loading")));
      meta.textContent = "";
      return;
    }
    const L = state.lang;
    const hu = document.getElementById("headsup");
    hu.replaceChildren(...(state.weekly.headsup || []).map(n =>
      el("li", {}, el("span", { class: "hu-ico", "aria-hidden": "true" }, n.icon || "ℹ️"), L_(n.text))));
    hu.hidden = hu.children.length === 0;
    const { today, checkout } = currentStay();
    const stayTxt = checkout ? (checkout === today ? t("checkout_today") : t("stay_until")(fmtDate(checkout, { weekday: "short", day: "numeric", month: "short" }))) : "";
    meta.textContent = [stayTxt, t("updated")(fmtDate(state.weekly.generated_at.slice(0, 10), { day: "numeric", month: "long" }))].filter(Boolean).join(" · ");
    const windowEnd = state.weekly.window_end;
    const until = checkout && checkout < windowEnd ? checkout : windowEnd;

    const items = state.weekly.items
      .filter(it => it.category === state.cat)
      .filter(it => {
        if (!it.date_start) return true;                 // e.g. new restaurant openings
        const end = it.date_end || it.date_start;
        return end >= today && it.date_start <= until;   // overlaps [today, stay end]
      })
      .sort((a, b) => (a.date_start || "0").localeCompare(b.date_start || "0"));

    if (!items.length) { box.append(el("p", { class: "empty" }, t("empty"))); return; }

    for (const it of items) {
      let when;
      if (!it.date_start) when = it.is_new ? t("new_opening") : (it.category === "food" ? t("tip") : t("ongoing"));
      else if (it.date_end && it.date_end !== it.date_start && it.date_end > today)
        when = `${fmtDate(it.date_start < today ? today : it.date_start, { day: "numeric", month: "short" })} - ${fmtDate(it.date_end, { day: "numeric", month: "short" })}`;
      else when = fmtDate(it.date_end && it.date_start < today ? it.date_end : it.date_start, { weekday: "short", day: "numeric", month: "short" });   // a run that ends today shows just today, not "3 Oct – 3 Oct"
      if (it.time) when += ` · ${it.time}`;

      const inStay = checkout && it.date_start && it.date_start <= checkout && (it.date_end || it.date_start) >= today;
      const whereBits = [it.venue, it.area].filter(Boolean).join(" · ");
      const host = (() => { try { return new URL(it.url).hostname.replace(/^www\./, ""); } catch (_) { return it.source; } })();

      const ICON = { food: "🍽️", culture: "🎭", nightlife: "🎧" };
      const media = it.image
        ? el("div", { class: "ev-media" },
            el("img", { src: it.image, alt: "", loading: "lazy", referrerpolicy: "no-referrer",
              onerror: e => { e.target.parentNode.replaceWith(el("div", { class: `ev-media ph ph-${it.category}` }, ICON[it.category])); } }),
            it.image_credit ? el("span", { class: "credit" }, it.image_credit) : null)
        : el("div", { class: `ev-media ph ph-${it.category}`, "aria-hidden": "true" }, ICON[it.category]);

      // 3.10 polish: the date / "Worth a visit" chip sits above the title (same chip for every row);
      // the feed has no Hebrew, so English text keeps its own direction inside the RTL page (dir=auto).
      box.append(el("article", { class: "ev" },
        media,
        el("div", { class: "ev-top" },
          el("span", { class: "when" }, when),
          inStay ? el("span", { class: "badge" }, t("during_stay")) : null,
          el("h3", { dir: "auto" }, L_(it.title))),
        whereBits ? el("div", { class: "where", dir: "auto" }, whereBits + (it.price ? ` · ${it.price}` : "")) : null,
        el("p", { dir: "auto" }, L_(it.blurb)),
        el("div", { class: "foot-row" },
          el("span", { class: "src" }, `${t("source")} ${host}`),
          el("a", { href: it.url, target: "_blank", rel: "noopener" }, t("more") + " " + ARROW()))));
    }
  }

  // ---------- pages (3.10 evening, Oren: "a site with a page per topic, not one long landing page") ----------
  // One HTML file, five pages switched by the URL hash: start / apartment / tours / places (+eat) / this week.
  // Old deep links keep working (#card-tours, #card-ac, #week, #place-beach ...) because the hash picks the page.
  const PAGES = { start: [".hero", "#home-welcome", ".jump", "#first", "#hood"], house: ["#house"], tours: ["#tours"], places: ["#places-sub", "#eat", "#places"], week: ["#week"] };
  const TAB_OF = { start: "top", house: "house", tours: "tours", places: "places", week: "week" };
  function pageOfHash(h) {
    h = (h || "").replace(/^#/, "");
    if (h === "tours" || h === "card-tours" || /^tour-/.test(h)) return { view: "tours" };
    if (h === "eat") return { view: "places", sub: "eat" };
    if (h === "places" || /^place-/.test(h)) return { view: "places", sub: "places" };
    if (h === "week") { const w = document.getElementById("week"); return w && w.hidden ? { view: "start" } : { view: "week" }; }
    if (h === "house" || /^card-/.test(h)) return { view: "house" };
    return { view: "start" };
  }
  function setView(view, sub) {
    const changed = state.view !== view;
    state.view = view; if (sub) state.sub = sub;
    const eatEl = document.getElementById("eat");
    const eatOk = !!eatEl && !eatEl.hidden;
    if (!eatOk) state.sub = "places";
    state.sub = state.sub || "places";
    const on = new Set(PAGES[view]);
    for (const sel of new Set(Object.values(PAGES).flat())) {
      const n = document.querySelector(sel); if (!n) continue;
      let off = !on.has(sel);
      if (view === "places" && sel === "#eat") off = state.sub !== "eat";
      if (view === "places" && sel === "#places") off = state.sub !== "places";
      n.toggleAttribute("data-off", off);
    }
    document.body.dataset.view = view;
    document.querySelectorAll(".tabbar a").forEach(a => a.setAttribute("aria-current", String(a.dataset.target === TAB_OF[view])));
    document.querySelectorAll("#places-sub button").forEach(b => { b.setAttribute("aria-selected", String(b.dataset.sub === state.sub)); b.hidden = b.dataset.sub === "eat" && !eatOk; });
    const sw = document.getElementById("places-sub"); if (sw && !eatOk) sw.setAttribute("data-off", "");
    return changed;
  }
  const hashId = () => decodeURIComponent((location.hash || "").slice(1));
  const hashCard = () => (/^#card-[\w-]+$/.test(location.hash) ? location.hash.slice(1) : null);
  let openCard = hashCard(), hashScrolled = false, routedOnce = false;
  function route() {
    const { view, sub } = pageOfHash(location.hash);
    const changed = setView(view, sub);
    const id = hashId();
    const target = id && id !== "top" ? document.getElementById(id === "card-tours" ? "tours" : id) : null;
    if (changed && !(target && !target.hidden && /^(card-|tour-|place-)/.test(id))) { window.scrollTo({ top: 0, behavior: "instant" }); }
    return changed;
  }
  function applyHashCard() {
    route();
    if (!openCard) return;
    const d = document.getElementById(openCard === "card-tours" ? "tours" : openCard); if (!d || d.hidden) return;   // not rendered yet: try again after the data loads
    if (d.tagName === "DETAILS") d.open = true;
    if (!hashScrolled) { hashScrolled = true; requestAnimationFrame(() => d.scrollIntoView({ block: "start" })); }
  }
  window.addEventListener("hashchange", () => { openCard = hashCard(); hashScrolled = false; applyHashCard();
    const id = hashId(); if (/^(tour-|place-)/.test(id)) { const n = document.getElementById(id); if (n) requestAnimationFrame(() => n.scrollIntoView({ block: "start" })); } });
  // Used by buttons that open a card: make sure the page that holds it is showing first
  function showCardPage(id) { location.hash.slice(1) === id || history.pushState(null, "", "#" + id); route(); }
  function renderAll() { registerLinks(); renderChrome(); renderHouse(); renderEat(); renderTours(); renderPlaces(); renderEvents(); applyHashCard(); }
  document.getElementById("eat-sat").addEventListener("click", () => { state.eatSat = !state.eatSat; renderEat(); setView(state.view || "places"); });
  document.querySelectorAll("#places-sub button").forEach(b => b.addEventListener("click", () => { setView("places", b.dataset.sub); history.replaceState(null, "", "#" + (b.dataset.sub === "eat" ? "eat" : "places")); window.scrollTo({ top: 0, behavior: "instant" }); }));
  route();

  // ---------- wiring ----------
  document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => {
    state.lang = b.dataset.lang; saveLang(state.lang); closeMenus(); renderAll();
  }));
  // Header menus: language drop-down + hamburger (pages and contacts)
  function closeMenus() {
    document.getElementById("lang-list").hidden = true; document.getElementById("lang-btn").setAttribute("aria-expanded", "false");
    document.getElementById("burger-panel").hidden = true; document.getElementById("burger").setAttribute("aria-expanded", "false");
  }
  function toggleMenu(listId, btnId) {
    const list = document.getElementById(listId), btn = document.getElementById(btnId), open = list.hidden;
    closeMenus(); list.hidden = !open; btn.setAttribute("aria-expanded", String(open));
  }
  document.getElementById("lang-btn").addEventListener("click", e => { e.stopPropagation(); toggleMenu("lang-list", "lang-btn"); });
  document.getElementById("burger").addEventListener("click", e => { e.stopPropagation(); toggleMenu("burger-panel", "burger"); });
  document.getElementById("burger-panel").addEventListener("click", e => { const a = e.target.closest("a"); if (!a) return; closeMenus();
    if (a.classList.contains("burger-sos")) { e.preventDefault(); showCardPage("card-emergency"); const c = document.getElementById("card-emergency"); if (c) { c.open = true; requestAnimationFrame(() => c.scrollIntoView({ block: "start" })); } } });
  document.addEventListener("click", closeMenus);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenus(); });
  document.querySelectorAll("#cat-tabs button").forEach(b => b.addEventListener("click", () => {
    state.cat = b.dataset.cat; renderChrome(); renderEvents();
  }));

  // The Emergency button also opens the card, not just scrolls to it
  document.getElementById("co-banner").addEventListener("click", e => {
    showCardPage("card-checkout"); const card = document.getElementById("card-checkout"); if (!card) return;
    e.preventDefault(); card.open = true;
    requestAnimationFrame(() => card.scrollIntoView({ block: "start", behavior: "smooth" }));
  });
  document.querySelectorAll("#sos-btn, #sos-brand, #sos-link").forEach(b => b.addEventListener("click", e => {
    showCardPage("card-emergency"); const card = document.getElementById("card-emergency"); if (!card) return;
    e.preventDefault(); card.open = true;
    requestAnimationFrame(() => card.scrollIntoView({ block: "start", behavior: "smooth" }));
  }));
  document.getElementById("checkout-input").addEventListener("change", e => {
    setGuestCheckout(e.target.value || null); renderChrome(); renderEvents();
  });
  document.getElementById("checkout-reset").addEventListener("click", () => {
    setGuestCheckout(null); renderChrome(); renderEvents();
  });

  state.weekly = undefined; // loading
  renderAll();

  // Each part renders as soon as its own file arrives: a slow or failed events feed
  // never delays the apartment / emergency cards.
  getJSON("content/house.json").then(v => { state.house = v; registerLinks(); renderChrome(); renderHouse(); renderEat(); renderTours(); renderPlaces(); applyHashCard(); }).catch(() => { state.house = null; const b = document.getElementById("house-cards"); b.replaceChildren(el("p", { class: "empty" }, t("load_error"))); });
  getJSON("content/places.json").then(v => { state.places = v; registerLinks(); renderPlaces(); renderHouse(); renderEat(); applyHashCard(); }).catch(() => {});
  getJSON(DEMO ? "assets/img/gallery/manifest.sample.json" : "assets/img/gallery/manifest.json").then(v => { state.gallery = v; renderTours(); renderPlaces(); }).catch(() => {});
  Promise.allSettled([getJSON(DEMO ? "data/weekly.sample.json" : "data/weekly.json"), getJSON(DEMO ? "data/stays.sample.json" : "data/stays.json")])
    .then(([weekly, stays]) => {
      state.weekly = weekly.status === "fulfilled" ? weekly.value : null;
      state.stays = stays.status === "fulfilled" ? stays.value : null;
      renderChrome(); renderEvents();
    });
})();
