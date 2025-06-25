"use strict";
try {
  const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
  const dropdown = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg");

  // Populate dropdowns
  for (let select of dropdown) {
    for (let currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;

      if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
      }

      select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }

  // Update flag image
  const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };

  // Currency exchange logic
  btn.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = parseFloat(amount.value);

    if (isNaN(amtVal) || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }

    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();
    const URL = `${base_url}/${from}.json`;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      const rate = data[from][to];
      const total = (rate * amtVal).toFixed(2);
      msg.innerText = `${amtVal} ${fromCurr.value} = ${total} ${toCurr.value}`;
    } catch (err) {
      msg.innerText = "Error fetching exchange rate.";
      console.error("Fetch failed:", err);
    }
  });

} catch (error) {
  console.error("Script error:", error.message);
}
