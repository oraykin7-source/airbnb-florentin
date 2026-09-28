# STATUS – נקודת המשך לשיחה הבאה

עודכן: 2026-09-29 בבוקר (אחרי תיקוני המועצות). קרא את זה לפני כל דבר אחר.

## מה זה

מדריך דיגיטלי לאורחי ה-Airbnb בפלורנטין. QR בדלת → עמוד אחד ב-GitHub Pages, EN/DE/FR.
- **חי:** https://oraykin7-source.github.io/airbnb-florentin/
- **ריפו (ציבורי):** https://github.com/oraykin7-source/airbnb-florentin – branch `main`, קומיט אחרון `a56e534`
- **מקומי:** `~/Documents/Projects/airbnb-florentin` (venv ב-`.venv/` עם Pillow, לא בגיט)
- **תצוגה מקומית:** `python3 -m http.server 8420` → http://localhost:8420 (`?demo` לנתוני דוגמה)
- הפרויקט מנוהל בצ'אט עם Claude; המארח (אורן) אינו מפתח.

## מבנה

| קובץ | תפקיד |
|---|---|
| `index.html`, `assets/app.js`, `assets/style.css` | העמוד. ללא build. |
| `content/house.json` | כרטיסי הדירה. `host.shelter`/`boiler_switch` לכל שפה – עדיין TODO; `host.whatsapp` ריק (הכפתור מוסתר עד שימולא). בלי סודות. |
| `content/places.json` + `assets/img/places/*.jpg` | 13 מקומות מומלצים, תמונות CC מ-Wikimedia עם קרדיט. |
| `kitchen/index.html` | מדריך מטבח מפורט (3 שפות). עדיין עם שאריות QR/הדפסה. |
| `data/weekly.json` | האירועים השבועיים – נכתב ע"י ה-Routine. לא לערוך ידנית. |
| `data/stays.json` | תאריכי צ'ק-אאוט בלבד, מהיומן. נכתב ע"י ה-Routine. |
| `agent/ROUTINE.md` | ההוראות שה-Routine השבועי מבצע. **זה המקום לשנות התנהגות של הסוכן.** |
| `agent/validate.py` | בדיקת `weekly.json` (מקורות, חלון, שפות, תמונות). |
| `agent/refresh.py` | פרסור iCal (`--stays`) + גרסת API של המחקר (לא בשימוש). |
| `.github/workflows/refresh.yml` | fallback ידני עם API key. **מת בפועל** – אין מפתח. |
| `TODO.md` | משימות תוכן מהמארח. |
| `docs/council-review-2026-09-28.md` | פסק דין מועצת החכמים. |
| `docs/reports/` | דוחות יומיים. |

## אוטומציה (Claude Code Routines, על המנוי – בלי API key)

| Routine | id | מתי | סביבה | מודל |
|---|---|---|---|---|
| Florentin guide – weekly events refresh | `trig_016hQPzge4EHs3WRXerHu5sR` | שבת 19:00 IL (`0 16 * * 6` UTC) | `Florentin guide` (`env_01TwwXds8K6zJUbDwq4RGKEN`, Network: Full) | claude-opus-5 |
| Florentin guide – nightly check-out dates | `trig_01MXPob9kK9YuWVcqq7ypkJr` | 02:30 IL יומי | אותה סביבה | claude-sonnet-5 |

- ניהול: https://claude.ai/code/routines/<id>. עריכה: חץ ▾ ליד השם → Edit.
- **קישור ה-iCal של Airbnb נמצא רק בפרומפט של ה-Routine הלילי** (הוסר מהשבועי ב-29.9; המארח הדביק אותו ידנית). לא בריפו, לא בצ'אט. מסווג ההרשאות חוסם את Claude מלכתוב אותו – שינויים בפרומפט שדורשים לשמור אותו: או שהמארח עורך בממשק, או עריכה ב-textarea דרך הדפדפן המובנה עם JS replace (עבד ב-28.9 להחלפת chillz.co.il→chillz.com).
- הסביבה הישנה `Default` חסמה את כל אתרי המקור (403 בפרוקסי). לכן נוצרה סביבה חדשה עם Full network.
- ריצה שבועית ראשונה (28.9, סשן `cse_017kWAXx5tqovacuXhQXgY7g`): 19 דקות, 29 פריטים, כולם עם תמונות Pexels, קומיט `804282d`.
- התראות (push) מופעלות על שני ה-Routines מ-29.9.
- דיבוג: `RemoteTrigger list_runs` → `get_run_log`.

## מקורות ותוצאות

- visit.tel-aviv.gov.il – מרנדר ב-JS; הסוכן משתמש ב-`Pages/SearchWhatsOn.aspx`.
- secrettelaviv.com – המקור העיקרי (22/29 פריטים), דפי הכרטיסים מצוינים.
- **chillz.com** (לא chillz.co.il – זה לא קיים) – מאחורי Vercel bot check (429). הסוכן כנראה לא יצליח לקרוא. המועצה ממליצה להוריד.
- תמונות: Unsplash ו-Wikimedia חסמו את הסוכן (401/429); Pexels עבד.

## החלטות שהתקבלו

- Routines במקום GitHub Actions + API key (חינם על המנוי).
- ריפו ציבורי (נדרש ל-Pages בחשבון חינמי).
- תמונות: רק מקורות חופשיים (Pexels/Unsplash/Wikimedia) עם קרדיט; לעולם לא מאתר העסק/רשתות. קרדיט לא מכשיר תמונה מוגנת.
- מקומות מומלצים: תמונות CC אמיתיות מ-Wikimedia, מאוחסנות בריפו, קרדיט + קישור למקור בכל כרטיס.

## החלטות פתוחות (ממתינות לאורן)

1. ~~פרטיות~~ (הוחלט, ראה 3) – המועצה המליצה: לא להכניס Wi-Fi/כתובת/טלפון ל-`house.json` (ריפו ציבורי). במקום: כרטיס מודפס ליד הנתב + הודעת צ'ק-אין ב-Airbnb; הדף יגיד "on the card by the router". Claude מסכים. **stays.json** – המועצה: למחוק; Claude: אפשר להשאיר אם הכתובת לא בדף (הזמינות ממילא ציבורית ב-Airbnb). **צריך "כן" מאורן לפני ביצוע** – זה הופך החלטה קודמת.
2. ✅ 29.9: ChatGPT (דרך התוסף בכרום, שיחה "חוות דעת על מדריך Airbnb") הריץ מועצה משלו – סיכום ב-`docs/chatgpt-review-2026-09-29.md`, משימות ב-TODO §8. החלטה פתוחה: סינון לפי תאריך שהאורח בוחר (date picker) במקום/בנוסף ליומן.
3. ✅ 29.9: פרטיות הוחלטה – סודות מחוץ לריפו (בוצע, קומיט `42adf30`), stays.json נשאר.

## מה למחר – ראה `docs/reports/2026-09-28.html` (סעיף "משימות למחר") ו-`TODO.md`.
