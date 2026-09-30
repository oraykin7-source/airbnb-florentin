# STATUS – נקודת המשך לשיחה הבאה

עודכן: 2026-09-29 בערב. קרא את זה לפני כל דבר אחר. דוחות: `docs/reports/2026-09-29.html` (היום), `2026-09-28-evening.html`.

## מצב: מוכן לאורח

מדריך דיגיטלי לאורחי ה-Airbnb בפלורנטין. QR בדלת → עמוד אחד ב-GitHub Pages, EN/DE/FR/HE.
- **חי:** https://oraykin7-source.github.io/airbnb-florentin/
- **ריפו (ציבורי):** https://github.com/oraykin7-source/airbnb-florentin – branch `main` (79 קומיטים ב-28.9, 25 ב-29.9)
- **מקומי:** `~/Documents/Projects/airbnb-florentin` (venv ב-`.venv/` עם Pillow + rembg, לא בגיט)
- **תצוגה מקומית:** `python3 -m http.server 8420` → http://localhost:8420 (`?demo` לנתוני דוגמה)
- המארח (אורן) אינו מפתח; עובד בצ'אט + Remote Control מהטלפון.

## מבנה

| קובץ | תפקיד |
|---|---|
| `index.html`, `assets/app.js`, `assets/style.css` | העמוד. ללא build. 4 שפות, RTL, `translate="no"`, סרגל טאבים תחתון, קישורים אוטומטיים (`rich()`), לוגו מילולי. **אחרי כל שינוי CSS/JS לקדם `?v=` ב-index.html.** |
| `content/house.json` | 13 כרטיסים ב-4 שפות (נוסף `checkout`). שדות: `thumb`, `tile` (אריח "השעה הראשונה"), `group` (comfort / safe="Good to know" / local), `first_hour`, `sections`, `lists` (rows: `url` = מקום מדויק, `image`+`image_credit`, `links`, `shabbat`). בלי סודות. |
| `content/places.json` + `assets/img/places/` | 13 מקומות, תמונות CC. |
| `assets/img/house/` + `thumb/` | תמונות המכשירים (צילומי אורן; קפה/דוד/תמי 4 משופרים ב-ChatGPT). `ninja-combi.jpg` = תמונת יצרן זמנית. |
| `assets/img/eat/`, `assets/img/tiles/` | תמונות מנה CC לכרטיס "איפה אורן אוכל"; אריחי השעה הראשונה (Pexels + תמי 4 של אורן). |
| `.claude/skills/site-review/` | סקיל `/site-review` – סקירת מומחה של האתר (מבנה/תוכן/עיצוב/מובייל). |
| `kitchen/index.html` | מדריך מטבח מפורט (EN/DE/FR בלבד). |
| `data/weekly.json`, `data/stays.json` | נכתבים ע"י ה-Routines. לא לערוך ידנית. |
| `agent/ROUTINE.md`, `agent/validate.py` | הוראות הסוכן השבועי + בדיקות (`validate.py house` לפני כל commit של תוכן). |
| `docs/` | דוחות יומיים, סקירות מועצה/ChatGPT, חומרי הדפסה (QR, שלט, בריף למוכר). |
| `../airbnb-florentin-private/airbnb-texts.md` | מחוץ לריפו (כתובת). הטקסטים שהוזנו ל-Airbnb. |

## אוטומציה (Claude Code Routines)

| Routine | id | מתי | סביבה |
|---|---|---|---|
| Florentin guide – weekly events refresh | `trig_016hQPzge4EHs3WRXerHu5sR` | שבת 19:00 IL | `Florentin guide` (`env_01TwwXds8K6zJUbDwq4RGKEN`, Network: Full) |
| Florentin guide – nightly check-out dates | `trig_01MXPob9kK9YuWVcqq7ypkJr` | 02:30 IL | אותה סביבה |

- **ה-iCal של Airbnb נמצא רק בפרומפט הלילי.** לא בריפו, לא בצ'אט. מסווג ההרשאות חוסם את Claude מלכתוב אותו.
- **הריצה השבועית הראשונה "בשידור" אחרי כל השינויים: שבת 3.10.** push מגיע לאורן.

## Airbnb (listing 5202090)

הכול מעודכן ותואם לאתר: כללי הבית, הוראות הגעה, מדריך לאורחים, צ'ק-אאוט, 5 הודעות מתוזמנות (Welcome עם קישור אישי `?guest=&checkout=`, "חדר בפלורנטין" יום לפני – **מכילה קוד דלת, לא לגעת**, Day after check-in, Day before check-out, After check-out), מדריך "מה בסביבה" (id 1882254, 20 מקומות). עריכה דרך Claude-in-Chrome; טיפים טכניים בדוח.

## החלטות שעומדות

- סודות מחוץ לריפו; WhatsApp של אורן גלוי בדף בבחירתו.
- תמונות: צילום של אורן או CC עם קרדיט. AI-edit רק למכשירים פשוטים אחרי בדיקת כפתורים; לשלטים – רק צילום. תמונות יצרן/מסעדות – לא.
- ברירת מחדל אנגלית; זיהוי שפת הטלפון נשאר.
- הגרמנית אושרה ע"י דובר שפת אם (28.9). צרפתית – לא נבדקה.
- מועצה נוספת – רק אחרי האורח הראשון.

## מה פתוח (ראה `TODO.md` + "משימות למחר" בדוח)

0. מוכר אליאקספרס ענה (30.9) – החלטה על משלוח (55 ₪) / הדפסה מקומית; rendering לסריקה לפני אישור.
0b. החלטה על "מפתח בקישור" (הצפנת כתובת/Wi-Fi, ~שעה) – לפני הדפסת ה-QR.
1. שבת 3.10 – לבדוק את ריצת ה-Routine ואת האתר.
2. אורח ראשון – לוודא שהקישור האישי עובד (פורמט `{check-out date}`).
3. 6.10 – הנינג'ה מגיע → אורן מצלם → להחליף את `ninja-combi.jpg`.
4. להזמין שלטי QR (`docs/print/seller-message.md`); בינתיים להדפיס `docs/print/qr-guide.png`.
5. ליטוש: עין צרפתית; קישור המדריך בהודעת "חדר בפלורנטין"; מחיקת 3 קטגוריות ישנות במדריך "מה בסביבה"; עברית ל-feed השבועי ולמדריך המטבח.
