const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = "8850387826:AAFQU6xhdJWED_o4WFtYvbU8LLpfRkAizCc";

const ADMIN_CHAT_ID = 7130132807;
const GROUP_CHAT_ID = -1003788971538;

const bot = new TelegramBot(BOT_TOKEN);

app.post("/order", async (req, res) => {
  try {
    const order = req.body;

    const itemsText = order.items
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} — €${item.price}`
      )
      .join("\n");

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