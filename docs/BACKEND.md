# Backend — Contact & Chatbot

## 1. Variables d'environnement

Copie `.env.example` en `.env.local` à la racine du projet et remplis les valeurs.

```bash
cp .env.example .env.local
```

- **Supabase** : Dashboard → Settings → API (URL + anon key + service_role key).
- **Mailtrap** : Settings → API Tokens → Generate. Pour l’envoi d’emails (formulaire de contact).
- **CONTACT_TO_EMAIL** : adresse qui reçoit les messages du formulaire (ex. `izayidali@biacode.tech`).

## 2. Supabase — Table contact

Dans le **Dashboard Supabase** → **Table Editor** → **New table** :

- **Nom de la table** : `contact_messages`
- **Colonnes** (ajoute-les si besoin) :
  - `id` : `uuid`, primary key, default `gen_random_uuid()`
  - `name` : `text`, not null
  - `email` : `text`, not null
  - `phone` : `text`, nullable
  - `message` : `text`, nullable
  - `country_code` : `text`, nullable
  - `created_at` : `timestamptz`, default `now()`

Tu peux activer Row Level Security (RLS) et une policy qui autorise l’insert uniquement (pas de lecture publique).

## 3. Structure des API

| Route           | Méthode | Rôle |
|----------------|--------|------|
| `/api/contact` | POST   | Enregistre le message (Supabase) + envoi email (Mailtrap) |
| `/api/chat`    | POST   | Réponse du chatbot (simulée ; tu peux brancher une API IA plus tard) |

## 4. Mailtrap

- L’envoi utilise l’API Mailtrap **Send** (`https://send.api.mailtrap.io/api/send`).
- Vérifie que le domaine / l’email expéditeur est bien configuré dans Mailtrap (Sending Domains).

## 5. Chatbot

- Pour l’instant, `/api/chat` renvoie une réponse parmi une liste fixe.
- Pour un vrai bot IA : ajoute dans `.env.local` une clé (ex. `OPENAI_API_KEY`) et modifie `app/api/chat/route.ts` pour appeler l’API choisie.
