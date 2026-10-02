# AGENTS.md — TelegramShop project context

## 1. Project overview

This is a Telegram Mini App online shop called **TelegramShop**.

Main project directory on Windows:

`C:\TelegramShop`

Structure:

- `C:\TelegramShop\frontend` — React/Vite frontend
- `C:\TelegramShop\backend` — Express/Telegram bot backend

The shop is intended to run inside Telegram as a Mini App.

Main navigation currently includes:

- `Главная`
- `Корзина`
- `Админ панель`

The project has already been developed and debugged through multiple iterations. **Do not rewrite or replace working parts unnecessarily. Inspect the existing code first and make the smallest safe change that solves the task.**

---

## 2. Important development history

The frontend has previously been run with Vite on ports:

- `5173`
- `5174`
- `5175`

If one port is busy, use the available Vite port instead of assuming a specific port.

Node/npm versions previously used:

- Node.js `v24.16.0`
- npm `11.13.0`
- Vite `8.0.16`

There was previously a mistaken working directory under `C:\Windows\system32`. The correct project location is:

`C:\TelegramShop`

---

## 3. Frontend

Frontend location:

`C:\TelegramShop\frontend`

The frontend is React + TypeScript + Vite.

Important previous issues:

- white screen after changes
- invalid/import errors
- Vite configuration problems
- `@tailwindcss/vite` / `ERR_MODULE_NOT_FOUND`
- TypeScript errors caused by incorrectly structured conditional rendering
- checkout errors
- Telegram WebApp integration

Before changing frontend code:

1. Inspect the existing `App.tsx` and related components.
2. Check current types.
3. Check how products/cart/order data are currently structured.
4. Preserve existing UI and functionality unless the task explicitly asks to change them.

---

## 4. Product model

A previous core product type looked approximately like:

```ts
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};
```

Products may additionally contain variants/options.

Existing order item fields can include:

- `selectedFlavor`
- `selectedResistance`
- `selectedStrength`
- `selectedNicotine`
- `selectedColor`

The project has a `flavors`-style structure for products with variants.

When modifying products or order items, **do not remove variant fields just because they are optional for some products**.

---

## 5. Cart

The cart has previously been stored in `localStorage`.

Known functions include concepts such as:

- `addToCart`
- `clearCart`
- `checkout`

The cart must continue to support multiple products and quantities.

Checkout should **not request the customer's phone number**. The user explicitly wanted checkout without a phone-number field.

---

## 6. Telegram Mini App user information

The frontend can obtain Telegram WebApp user information through:

```ts
window.Telegram.WebApp.initDataUnsafe.user
```

Relevant fields:

- `id`
- `username`
- `first_name`
- `last_name`

The order request has previously included Telegram information in a structure similar to:

```ts
telegram: {
  id,
  username,
  first_name,
  last_name
}
```

When changing Telegram user handling, preserve compatibility with users who do not have a username.

Do not assume `username` always exists.

---

## 7. Backend

Backend location:

`C:\TelegramShop\backend`

Backend stack:

- Express
- CORS
- `node-telegram-bot-api`

The backend package was configured as CommonJS.

Previously working package versions included approximately:

- `express ^5.2.1`
- `cors ^2.8.6`
- `node-telegram-bot-api ^0.66.0`

Important:

`node-telegram-bot-api` version `1.1.0` previously caused:

`ERR_PACKAGE_PATH_NOT_EXPORTED`

The project was moved back to `0.66.0`.

Backend starts with:

```bash
node server.js
```

Expected startup message:

```text
🚀 Server started on port 3001
```

---

## 8. Order API

The backend has an endpoint:

```text
POST /order
```

The frontend has previously sent requests to:

```text
http://localhost:3001/order
```

The order body has included:

```text
customer
comment
items
total
telegram
```

The backend builds a readable order receipt/message from `order.items`.

Items may include:

- product name
- quantity
- price
- selected flavor
- selected resistance
- selected strength
- selected nicotine
- selected color

When changing the order endpoint, preserve all existing order item options.

---

## 9. Telegram bot order notifications

The bot is used to notify the shop/admin about orders.

There are two important destinations:

1. Admin private Telegram chat
2. Admin supergroup

The private admin chat ID previously used:

```text
7130132807
```

The admin supergroup previously used:

```text
-1003788971538
```

The bot username previously used:

```text
@Chenko_shop_vapebot
```

Do not expose or hard-code secrets/tokens in frontend code.

If a bot token is needed, read it from the existing backend configuration/environment rather than inventing a new token.

---

## 10. Buyer profile link

A desired feature is for an admin order notification to include a clickable link/button to the buyer's Telegram profile.

The buyer may have:

```text
telegram.username
telegram.id
telegram.first_name
telegram.last_name
```

A username may be missing.

If username exists, a Telegram profile link can generally be based on the username.

If there is no username, do not create a broken `https://t.me/undefined`-style link.

Preserve useful fallback information such as Telegram ID/name.

---

## 11. Telegram polling issue

A previous backend error was:

```text
409 Conflict: terminated by other getUpdates request
```

This generally means that more than one process/instance is polling the same Telegram bot.

If this appears again:

1. Check for another running `node server.js`.
2. Check for another bot instance/process.
3. Do not immediately rewrite bot logic.
4. Make sure only one polling process is active.

---

## 12. Stock / inventory

A major current feature is product stock management.

Products are stored with stock information, and products with variants may have variant-specific stock.

A previous problem was:

> After placing an order, stock quantity did not decrease.

There was a proposed Supabase approach that:

1. Groups order items by product ID.
2. Loads the product from `products`.
3. Checks available stock.
4. Decreases stock by ordered quantity.

Conceptually:

```js
const quantities = {};

for (const item of order.items) {
  if (!quantities[item.id]) {
    quantities[item.id] = 0;
  }

  quantities[item.id] += item.quantity;
}
```

Then load the corresponding product from Supabase and update stock.

However, **do not blindly use this old snippet**. Inspect the current database schema and current code first.

Important distinction:

- ordinary product stock may use `products.stock`
- variant products may use variant-specific stock

If a customer orders a specific flavor/color/etc., the correct selected variant's stock must decrease, not merely the parent product's total stock.

Before implementing stock changes:

1. Inspect how the current frontend represents the selected variant.
2. Inspect the current Supabase product/variant schema.
3. Determine where the actual stock number is stored.
4. Validate requested quantity against available stock.
5. Decrease the correct stock record.
6. Make the operation safe against overselling.

---

## 13. Order display

There has previously been code that groups identical items and displays:

- `Количество`
- `Цена`
- `Сумма`
- `Вкус`
- `Цвет`

Do not remove these fields when refactoring the order receipt.

If several identical products have different variants, they should not be incorrectly merged into one line.

For example, two identical products with different flavors should remain distinguishable.

---

## 14. Supabase

The project uses Supabase for product/database functionality.

When working with Supabase:

- inspect the existing client/configuration first
- do not invent table names if they can be determined from the project
- do not expose Supabase service-role secrets to the frontend
- preserve existing environment variables
- prefer server-side privileged operations for stock/order operations when appropriate

The known product table has previously been called:

```text
products
```

and has included:

```text
id
name
stock
```

But the current schema may have changed. **Always inspect the current code/schema before relying on this.**

---

## 15. Admin panel

The project includes an admin panel.

A future/ongoing goal is an admin menu that can support:

- adding products
- managing products
- managing orders

When implementing admin functionality:

- keep normal customer UI separate from admin UI
- do not break the shop navigation
- preserve existing product display
- validate admin-only operations on the backend, not only in the frontend

---

## 16. Deployment

The frontend has previously been deployed to Vercel.

Known deployment URL:

`https://telegram-shop-zeta.vercel.app`

GitHub repository:

`https://github.com/xyoutubkax-glitch/Telegram-shop.git`

Main branch:

```text
main
```

The repository previously tracked:

```text
origin/main
```

When making deployment-related changes, first inspect the current git state and remote configuration.

Do not assume local code and deployed code are identical.

---

## 17. Current working style

The owner of this project prefers practical, direct fixes.

When asked to fix a bug:

1. Inspect the relevant existing files.
2. Explain the actual cause briefly.
3. Make the minimal necessary change.
4. Run/check the relevant code if possible.
5. Report exactly what changed.
6. Mention any command needed to restart the frontend/backend.
7. Do not rewrite unrelated parts.

If there are multiple possible approaches, prefer the one that:

- changes less existing code
- preserves current UI
- preserves existing data structures
- is easy to understand
- is easy to undo
- does not introduce unnecessary dependencies

---

## 18. Critical rule: preserve working functionality

This project has already had several bugs caused by changing one part and unintentionally breaking another.

Therefore:

**Do not replace a whole file just to fix a small bug unless it is genuinely necessary.**

Before editing:

- read the relevant file
- understand existing imports
- understand state
- understand API requests
- understand data flow

After editing:

- check TypeScript syntax
- check JSX brackets
- check imports
- check API URLs
- check that existing buttons/features still exist
- check that checkout still works

---

## 19. When debugging checkout

Follow this order:

### Frontend

Check:

```text
checkout()
```

Check:

- request URL
- request method
- request body
- `items`
- `total`
- `telegram`
- response handling
- error handling

### Backend

Check:

```text
POST /order
```

Check:

- `req.body`
- order validation
- Supabase operations
- Telegram message generation
- Telegram send operations
- response status

### Telegram

Check:

- bot token/config
- chat IDs
- polling
- duplicate bot instances
- message errors

Do not assume a Telegram error is a frontend error.

---

## 20. If an order succeeds but stock does not decrease

Treat this as a separate inventory transaction problem.

Do not change checkout UI unless necessary.

Investigate:

1. Did `/order` receive the correct item ID?
2. Did it receive the correct quantity?
3. Did it receive selected variant information?
4. Does the matching product exist in Supabase?
5. Is stock stored on the parent product or variant?
6. Did Supabase update return an error?
7. Was the update actually committed?
8. Is the frontend displaying cached/old product data?

Only after identifying the exact failure should code be changed.

---

## 21. Local commands

Frontend:

```bash
cd C:\TelegramShop\frontend
npm install
npm run dev
```

Backend:

```bash
cd C:\TelegramShop\backend
npm install
node server.js
```

Do not run destructive commands such as deleting `node_modules`, lockfiles, databases, or project files unless explicitly required and confirmed.

---

## 22. Git safety

Before major changes:

```bash
git status
```

For a substantial change, inspect the diff afterward:

```bash
git diff
```

Do not reset, force-push, delete branches, or discard user changes unless explicitly requested.

---

## 23. Communication style

The project owner is comfortable with informal Russian.

Technical explanations should be:

- short
- concrete
- step-by-step
- without unnecessary theory

When giving commands, clearly say which terminal/directory they belong to.

Example:

```text
PowerShell:
cd C:\TelegramShop\backend
node server.js
```

If a file needs editing, provide the exact file path.

---

## 24. Most important instruction

**Treat the existing project as the source of truth.**

This file describes the history and known architecture, but the actual files currently in:

`C:\TelegramShop`

are authoritative.

Before changing anything, inspect the current implementation.

Continue the project from its existing state rather than rebuilding it from this document.
