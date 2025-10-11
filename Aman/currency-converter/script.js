 const countryList = {
            USD: "US", INR: "IN", EUR: "EU", AUD: "AU", GBP: "GB",
            JPY: "JP", CAD: "CA", CHF: "CH", CNY: "CN", NZD: "NZ",
            SGD: "SG", ZAR: "ZA", AED: "AE", SAR: "SA", HKD: "HK",
            BRL: "BR", MXN: "MX", KRW: "KR", SEK: "SE", NOK: "NO",
            DKK: "DK", PLN: "PL", CZK: "CZ", HUF: "HU", RUB: "RU",
            THB: "TH", MYR: "MY", IDR: "ID", PHP: "PH", VND: "VN"
        };

        // DOM refs
        const dropdowns = document.querySelectorAll(".dropdown select");
        const btn = document.querySelector("form button");
        const fromCurr = document.querySelector(".from select");
        const toCurr = document.querySelector(".to select");
        const msg = document.querySelector(".msg");
        const amountInput = document.querySelector(".amount input");

        // Populate dropdowns
        for (const select of dropdowns) {
            select.innerHTML = "";
            for (const currCode in countryList) {
                const opt = document.createElement("option");
                opt.value = currCode;
                opt.textContent = currCode;
                select.appendChild(opt);
            }
        }

        // Set sensible defaults
        fromCurr.value = "USD";
        toCurr.value = "INR";

        // Flag updater
        function updateFlag(selectEl) {
            const currCode = selectEl.value;
            const countryCode = countryList[currCode];
            const img = selectEl.parentElement.querySelector("img");
            if (img && countryCode) {
                img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
                img.alt = `${currCode} flag`;
            }
        }

        // On dropdown change, update flags
        dropdowns.forEach((sel) =>
            sel.addEventListener("change", (e) => {
                updateFlag(e.target);
            })
        );

        // Initial flags
        updateFlag(fromCurr);
        updateFlag(toCurr);

        // Exchange rate fetcher using a working API
        async function updateExchangeRate() {
            let amtVal = parseFloat(amountInput.value);
            if (!amtVal || amtVal < 1) {
                amtVal = 1;
                amountInput.value = "1";
            }

            // Using ExchangeRate-API (free tier)
            const url = `https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`;

            try {
                msg.textContent = "Loading...";
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                const rate = data.rates[toCurr.value];

                if (rate) {
                    const finalAmount = (amtVal * rate).toFixed(2);
                    msg.textContent = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
                } else {
                    throw new Error("Currency rate not found");
                }
            } catch (err) {
                console.error("Error fetching exchange rate:", err);
                msg.textContent = "Could not fetch exchange rate. Please try again.";
            }
        }

        // Button click → update
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            updateExchangeRate();
        });

        // Run on load
        window.addEventListener("load", updateExchangeRate);

        // Add swap functionality
        document.querySelector(".fa-right-left").addEventListener("click", () => {
            const fromValue = fromCurr.value;
            const toValue = toCurr.value;
            
            fromCurr.value = toValue;
            toCurr.value = fromValue;
            
            updateFlag(fromCurr);
            updateFlag(toCurr);
            updateExchangeRate();
        });