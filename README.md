# ₹ Rupee Change Calculator

A lightweight, browser-based tool that breaks down any rupee amount into the **fewest possible notes and coins** using the greedy algorithm. No frameworks, no build tools, no backend — just three files that work straight from your file system.

---

## 📁 Project Structure

```
rupee-calculator/
├── index.html   # Markup and page structure
├── style.css               # All styles and CSS variables
├── script.js               # Calculator logic and DOM interactions
└── README.md               # You are here
```

---

## 🚀 Getting Started

1. Download or clone all three files into the **same folder**.
2. Open `index.html` in any modern browser.
3. That's it — no installation, no dependencies, no internet required (except for loading Google Fonts).

---

## ✨ Features

- **Instant breakdown** — enter any positive whole-number rupee amount and get the denomination split in one click (or press Enter).
- **Greedy algorithm** — always returns the minimum number of notes and coins.
- **All current denominations** — covers ₹500, ₹200, ₹100, ₹50, ₹20, ₹10, ₹5, ₹2, and ₹1.
- **Visual progress bars** — proportional bars let you compare counts at a glance.
- **Animated results** — rows slide in with staggered animation for a clean feel.
- **Input validation** — rejects decimals, negatives, and empty submissions with a clear error message.
- **Keyboard friendly** — press `Enter` to calculate, reset button returns focus to the input.
- **Fully client-side** — no data is sent anywhere.

---

## 🧮 How the Algorithm Works

The app uses the **greedy algorithm**: starting from the largest denomination (₹500), it takes as many of that note/coin as possible, subtracts the total, then moves to the next smaller denomination — repeating until the remainder is zero.

```
Example: ₹1375

₹500 × 2 = ₹1000   → remainder ₹375
₹200 × 1 = ₹200    → remainder ₹175
₹100 × 1 = ₹100    → remainder ₹75
₹50  × 1 = ₹50     → remainder ₹25
₹20  × 1 = ₹20     → remainder ₹5
₹5   × 1 = ₹5      → remainder ₹0

Total: 7 notes/coins
```

This works optimally for Indian currency because its denominations form a **canonical coin system** — greedy is guaranteed to produce the minimum count for any amount.

---

## 💻 Denominations Reference

| Value | Type        |
|-------|-------------|
| ₹500  | Note        |
| ₹200  | Note        |
| ₹100  | Note        |
| ₹50   | Note        |
| ₹20   | Note / Coin |
| ₹10   | Note / Coin |
| ₹5    | Coin        |
| ₹2    | Coin        |
| ₹1    | Coin        |

---

## 🎨 Customisation

All colours are defined as CSS variables at the top of `style.css`, making it easy to retheme:

```css
:root {
  --bg:      #0f0e17;   /* Page background      */
  --surface: #1a1828;   /* Card background       */
  --accent:  #f6ae2d;   /* Primary accent (gold) */
  --accent2: #f26419;   /* Secondary accent      */
  --green:   #2ec4b6;   /* Coin accent colour    */
  --text:    #fffffe;   /* Body text             */
  --muted:   #a7a9be;   /* Secondary text        */
}
```

To add or remove a denomination, edit the `DENOMS` array in `script.js`.

---

## 🌐 Browser Support

Works in all modern browsers — Chrome, Firefox, Safari, and Edge. No polyfills needed.

---

## 📄 License

Free to use and modify for personal or commercial projects.
