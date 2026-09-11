const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");
const supabase = require("./supabase");

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = "8818876066:AAGp3ChnPquAMjaUPMb0HEiuLA-jKFxSCuM";

const ADMIN_CHAT_ID = 7130132807;
const GROUP_CHAT_ID = -1004456053400;

const bot = new TelegramBot(BOT_TOKEN);
app.get("/products", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  res.json(data);
});
app.post("/products", async (req, res) => {
  const product = req.body;

  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select();

  if (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  res.json(data);
});
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("products")
    .update(req.body)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  res.json(data);
});
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  res.json({
    success: true,
  });
});

app.post("/order", async (req, res) => {
  try {
    const order = req.body;

    // ==========================================
    // УМЕНЬШАЕМ ОСТАТОК ВЫБРАННОГО ВАРИАНТА
    // ==========================================

    const flavorQuantities = {};

    for (const item of order.items) {
      // Если у товара есть выбранный вариант
      if (!item.selectedFlavor) {
        continue;
      }

      const key = '${item.id}::${item.selectedFlavor}';

      if (!flavorQuantities[key]) {
        flavorQuantities[key] = {
          product_id: item.id,
          flavor_name: item.selectedFlavor,
          quantity: 0,
        };
      }

   flavorQuantities[key].quantity += Number(item.quantity) || 1;
    }

    const stockItems = Object.values(flavorQuantities);

    // Отправляем данные в Supabase
    if (stockItems.length > 0) {
      const { error: stockError } = await supabase.rpc(
        "decrement_flavor_stocks",
        {
          p_items: stockItems,
        }
      );

      if (stockError) {
        console.error("Ошибка изменения остатка:", stockError);

        if (stockError.message.includes("NOT_ENOUGH_STOCK")) {
          return res.status(409).json({
            success: false,
            message: "Недостаточно товара на складе",
          });
        }

        if (stockError.message.includes("FLAVOR_NOT_FOUND")) {
          return res.status(400).json({
            success: false,
            message: "Выбранный вариант товара не найден",
          });
        }

        throw stockError;
      }
    }

    // ==========================================
    // ФОРМИРУЕМ ТЕКСТ ЗАКАЗА
    // ==========================================

    const quantities = {};

    for (const item of order.items) {
      const key = '${item.id}::${item.selectedFlavor || ""}';

      if (!quantities[key]) {
        quantities[key] = {
          item,
          quantity: 0,
        };
      }

      flavorQuantities[key].quantity += Number(item.quantity) || 1;
    }

    const itemsText = Object.values(quantities)
      .map(({ item, quantity }, index) => {
        let text = '${index + 1}. ${item.name}\n';

        text += 'Количество: ${quantity}\n';
        text += 'Цена: BYN${item.price}\n';
        text += 'Сумма: BYN${item.price * quantity}';

        if (item.selectedFlavor) {
          text += '\nВариант: ${item.selectedFlavor}';
        }

        if (item.selectedResistance) {
          text += '\nСопротивление: ${item.selectedResistance}';
        }

        if (item.selectedStrength) {
          text += '\nКрепость: ${item.selectedStrength}';
        }

        if (item.selectedNicotine) {
          text += '\nНикотин: ${item.selectedNicotine}';
        }

        if (item.selectedColor) {
          text += '\nЦвет: ${item.selectedColor}';
        }

        return text;
      })
      .join("\n\n");

    // ==========================================
    // ПРОФИЛЬ ПОКУПАТЕЛЯ
    // ==========================================

    const profileUrl = order.telegram?.username
      ? 'https://t.me/${order.telegram.username}'
      : null;

    // ==========================================
    // СООБЩЕНИЕ
    // ==========================================

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
${order.total} BYN

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

    // ==========================================
    // ОТПРАВЛЯЕМ АДМИНУ
    // ==========================================

    await bot.sendMessage(
      ADMIN_CHAT_ID,
      message,
      options
    );

    // ==========================================
    // ОТПРАВЛЯЕМ В ГРУППУ
    // ==========================================

    await bot.sendMessage(
      GROUP_CHAT_ID,message,
      options
    );

    res.json({ success: true });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Ошибка оформления заказа",
    });
  }
});

app.listen(3001, () => {
  console.log("🚀 Server started on port 3001");
});