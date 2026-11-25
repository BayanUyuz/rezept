# Rezepte-API 🍳

Ein RESTful Express-Server in TypeScript zur Verwaltung von Kochrezepten.

## Features

- **Schichtenarchitektur:** Router → Controller → Service
- **CRUD-Operationen:** Rezepte abrufen, filtern, anlegen und löschen
- **Authentifizierung:** Geschütztes Löschen über `x-api-key`-Header
- **Fehlerbehandlung:** Eigene Domain-Errors (`RecipeNotFoundError`, `ValidationError`) und globale Error-Middleware
- **Logging:** Middleware mit HTTP-Methode, Pfad, Statuscode und Dauer
- **Deployment:** Vercel-ready (Serverless Export via `api/index.ts`)

---

## Installation & Start

1. Abhängigkeiten installieren:
```bash
npm install
```

2. Entwicklungsserver starten (mit Auto-Reload):
```bash
npm run dev
```

3. TypeScript Typencheck ausführen:
```bash
npm run typecheck
```

---

## Bruno Collection

Die vorgefertigten API-Requests befinden sich im Ordner `bruno/`.
In Bruno einfach auf **Open Collection** klicken und den Ordner `bruno/` des Projekts öffnen.

---

## Endpunkte

| Methode | Pfad | Beschreibung | Auth nötig? |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Begrüßungstext | Nein |
| `GET` | `/health` | Server-Status (`{ "status": "ok" }`) | Nein |
| `GET` | `/recipes` | Alle Rezepte (Filterbar mit `?maxMinuten=20`) | Nein |
| `GET` | `/recipes/:id` | Einzelnes Rezept nach ID | Nein |
| `POST` | `/recipes` | Neues Rezept anlegen (JSON Body) | Nein |
| `DELETE` | `/recipes/:id` | Rezept löschen | Ja (`x-api-key: geheim123`) |
| `GET` | `/crash` | Test-Route für Fehlerbehandlung | Nein |

---

## Beispiel-Requests

### Rezept anlegen (POST `/recipes`)
```json
{
  "titel": "Pancakes",
  "minuten": 15,
  "portionen": 3,
  "zutaten": ["Mehl", "Milch", "Eier", "Backpulver", "Ahornsirup"]
}
```

### Rezept löschen (DELETE `/recipes/1`)
Header:
```http
x-api-key: geheim123
```
