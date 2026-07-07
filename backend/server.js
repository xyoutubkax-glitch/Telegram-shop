const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = "8850387826:AAGzS1qKBCLRS6_1z64CFgZgWJhzOdUh7SM";

const ADMIN_CHAT_ID = 7130132807;
const GROUP_CHAT_ID = -1003788971538;

const bot = new TelegramBot(BOT_TOKEN);
let products = [];
app.get("/products", (req, res) => {
  res.json(products);
});
app.post("/products", (req, res) => {
  const product = req.body;

  products.push(product);

  res.json({
    success: true,
    products,
  });
});

app.post("/order", async (req, res) => {
  try {
    const order = req.body;

    const itemsText = order.items
  .map((item, index) => {
    let text = `${index + 1}. ${item.name}\n`;

    if (item.selectedFlavor)
      text += `Вкус: ${item.selectedFlavor}\n`;

    if (item.selectedResistance)
      text += `Сопротивление: ${item.selectedResistance}\n`;

    if (item.selectedStrength)
      text += `Крепость: ${item.selectedStrength}\n`;

    if (item.selectedNicotine)
      text += `Никотин: ${item.selectedNicotine}\n`;

    if (item.selectedColor)
      text += `Цвет: ${item.selectedColor}\n`;

    text += `Цена: €${item.price}`;

    return text;
  })
  .join("\n\n");

    const profileUrl = order.telegram?.username
      ? `https://t.me/${order.telegram.username}`
      : null;

    const message = `
🛒 Новый заказ

👤 Покупатель:
${order.telegram?.first_name || ""}
${order.telegram?.last_name || ""}

🆔 Telegram ID:
${order.telegram?.id || "-"}

📦 Товары:
${itemsText}

💰 Сумма:
€${order.total}

📝 Комментарий:
${order.comment || "-"}
`;

    const options = profileUrl
      ? {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "👤 Открыть профиль",
                  url: profileUrl,
                },
              ],
            ],
          },
        }
      : {};

    await bot.sendMessage(
      ADMIN_CHAT_ID,
      message,
      options
    );

    await bot.sendMessage(
      GROUP_CHAT_ID,
      message,
      options
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.listen(3001, () => {
  console.log("🚀 Server started on port 3001");
});