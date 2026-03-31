// ១. ទាញយកម៉ោងចាស់មកវិញ
const savedTime = localStorage.getItem('wait_until');

// ២. ឆែកមើលថាបើមានម៉ោងចាស់ ហើយម៉ោងឥឡូវនៅតិចជាងម៉ោងកំណត់ (ពោលគឺនៅមិនទាន់ដល់ម៉ោង)
if (savedTime && Date.now() < savedTime) {
    // ១. ចាប់យកប៊ូតុង និងបិទមិនឱ្យចុចសិន
    let btn = document.getElementById("submitBtn");
    btn.disabled = true;
    btn.innerText = "សូមរង់ចាំ...";
    btn.style.backgroundColor = "gray";

    // ២. គណនាពេលវេលាដែលនៅសល់
    let timeLeft = savedTime - Date.now();

    // ៣. បញ្ជាឱ្យរាប់ថយក្រោយបន្ត តាមតែពេលវេលាដែលនៅសល់ប៉ុណ្ណោះ
    setTimeout(function() {
        btn.disabled = false; // បើកឱ្យចុចវិញ
        btn.innerText = "បញ្ជាក់ការទិញ";
        btn.style.backgroundColor = "#00bcd4";
    }, timeLeft); // យើងប្រើពាក្យ timeLeft ជំនួសឱ្យលេខ 600000
}

let botToken = "8662075440:AAEy0Azz0T_6zRv_fIKW40tuEtI0L_TBclM";
let chatId = "1928555453";

function showQR() {
  let qrLink=document.getElementById("product").value;
  document.getElementById("qr-code").src=qrLink;
}
function openPopup() {
  document.getElementById("buy-popup").style.display="block";
  document.getElementById("alert")
}
function closePopup() {
    document.getElementById("buy-popup").style.display="none";
}
function sendToTelegram() {
  // ១. ប្រមូលទិន្នន័យ
  let gName = document.getElementById("gameName").value;
  let tName = document.getElementById("teleName").value;
  let pic = document.getElementById("receipt").files[0];
  
  let selectBox = document.getElementById("product");
  let pName = selectBox.options[selectBox.selectedIndex].text;

  // ២. សន្តិសុខឆែកមើលទិន្នន័យ 🛑
  if (gName === "" || tName === "" || pic === undefined) {
    alert("⚠️សូមបំពេញឈ្មោះក្នុងហ្គេម\n⚠️នឹងឈ្មោះ telegram\n⚠️នឹងរូបថតវិក័យបត្រ \n☺️ឱ្យបានត្រឹមត្រូវជាមុនសិន☺️");
    return; 
  }
    // 🛡️ ចាប់ផ្តើមបង្កកប៊ូតុង
  let btn = document.getElementById("submitBtn");
  btn.disabled = true; // ដកសិទ្ធិមិនឱ្យចុចបាន
  btn.innerText = "កំពុងបញ្ជូន...";
  btn.style.backgroundColor = "gray"; // ប្តូរពណ៌ទៅប្រផេះឱ្យដឹងថាចុចលែងបាន

  // ⏳ ប្តូរអក្សរលើប៊ូតុងពេលចាប់ផ្តើមបញ្ជូន
  document.getElementById("submitBtn").innerText = "កំពុងបញ្ជូន...";

  // ៣. ចាប់ផ្តើមវេចខ្ចប់ទិន្នន័យ
  let parcel = new FormData();
  parcel.append("chat_id", chatId);
  parcel.append("photo", pic);
  parcel.append("caption", "🛍 មានការបញ្ជាទិញថ្មី!\n- ឈ្មោះហ្គេម: " + gName + "\n- តេឡេក្រាម: " + tName + "\n- ទំនិញ: " + pName);

  // ៤. ហៅអ្នករត់សំបុត្រមកយកវាទៅ Telegram
  let url = "https://api.telegram.org/bot" + botToken + "/sendPhoto";
  
  fetch(url, {
    method: "POST",
    body: parcel
  }).then(function() {
    alert("កាបញ្ជាទិញបានរួចរាល់ សូមរង់ចាំរយះ ២-៥នាទី");
    closePopup(); 
    
    // ៥. សម្អាតប្រអប់ចេញវិញ 🧹
    document.getElementById("gameName").value = "";
    document.getElementById("teleName").value = "";
    document.getElementById("receipt").value = "";
    
    // ត្រឡប់អក្សរប៊ូតុងមកសភាពដើមវិញ
    document.getElementById("submitBtn").innerText = "បញ្ជាក់ការទិញ";
        // ប្រាប់ភ្ញៀវឱ្យរង់ចាំ ១០នាទី
    btn.innerText = "សូមរង់ចាំរយះពេល ១០ នាទី ដើម្បីធ្វើការបញ្ជាការទិញម្ដងទៀត";
    // ១. កំណត់ម៉ោងផុតកំណត់ (១០ នាទី = ៦០០,០០០ មីលីវិនាទី)
    const expiryTime = Date.now() + 600000;

    // ២. កត់ត្រាម៉ោងផុតកំណត់នេះចូលក្នុង Local Storage របស់ Browser
    localStorage.setItem('wait_until', expiryTime);

    // ៣. បញ្ជាឱ្យប៊ូតុងរង់ចាំ ១០ នាទី ទើបអាចចុចបានវិញ
    setTimeout(function() {
        btn.disabled = false;
        btn.innerText = "បញ្ជាក់ការទិញ";
        btn.style.backgroundColor = "#00bcd4";
    }, 600000);
  });
}
function createSnowflake() {
    // ១. បង្កើតគ្រាប់ព្រឹលថ្មីមួយ
    let snow = document.createElement("div");
    snow.classList.add("snowflake");
    
    // ២. កំណត់ឱ្យវាបង្ហាញខ្លួននៅទីតាំងរាយប៉ាយ (ឆ្វេង ស្ដាំ) ខុសៗគ្នា
    snow.style.left = Math.random() * 100 + "vw";
    
    // ៣. កំណត់ទំហំគ្រាប់ព្រឹលតូចធំខុសៗគ្នា
    let size = Math.random() * 5 + 3;
    snow.style.width = size + "px";
    snow.style.height = size + "px";
    
    // ៤. បញ្ចូលគ្រាប់ព្រឹលនេះទៅក្នុងវេបសាយ
    document.body.appendChild(snow);
    
    // ៥. លុបវាចោលវិញក្រោយ ៥ វិនាទី (ដើម្បីកុំឱ្យវាមានច្រើនពេកបណ្ដាលឱ្យគាំងវេបសាយ)
    setTimeout(function() {
        snow.remove();
    }, 9000);
}

// បញ្ជាឱ្យបង្កើតគ្រាប់ព្រឹលថ្មីៗជារៀងរាល់ 0.1 វិនាទី
setInterval(createSnowflake, 100);
// សកម្មភាពពេលចុចប៊ូតុង "ខ្មែរ"
// សកម្មភាពពេលចុចប៊ូតុង "ខ្មែរ"
function setKhmer() {
    // ១. លាក់/បង្ហាញអក្សរ
    document.querySelectorAll('.lang-kh').forEach(function(el) {
        el.style.display = '';
    });
    
    document.querySelectorAll('.lang-en').forEach(function(el) {
        el.style.display = 'none';
    });

    // ២. ចងចាំភាសា (ដាក់នៅទីនេះវិញ ទើបត្រឹមត្រូវ)
    localStorage.setItem('saved_language', 'kh');
}

// សកម្មភាពពេលចុចប៊ូតុង "EN"
// សកម្មភាពពេលចុចប៊ូតុង "EN"
function setEnglish() {
    // ១. លាក់/បង្ហាញអក្សរ
    document.querySelectorAll('.lang-en').forEach(function(el) {
        el.style.display = '';
    });
    
    document.querySelectorAll('.lang-kh').forEach(function(el) {
        el.style.display = 'none';
    });

    // ២. ចងចាំភាសា 
    localStorage.setItem('saved_language', 'en');
}

// ចាប់យកប៊ូតុងព្រះច័ន្ទ
const themeToggle = document.getElementById('theme-toggle');

// បញ្ជាពេលមានគេចុចលើវា
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerText = '☀️'; 
        // ឱ្យកុំព្យូទ័រចងចាំថា ភ្ញៀវចូលចិត្តងងឹត
        localStorage.setItem('saved_theme', 'dark'); 
    } else {
        themeToggle.innerText = '🌙'; 
        // ឱ្យកុំព្យូទ័រចងចាំថា ភ្ញៀវចូលចិត្តភ្លឺ
        localStorage.setItem('saved_theme', 'light'); 
    }
});
// មុខងារនាឡិការាប់ថយក្រោយ ១០ នាទី
function startCountdown() {
    // ឆែកមើលថាតើធ្លាប់មានម៉ោងកត់ត្រាទុកក្នុង Local Storage ឬនៅ
    let endTime = localStorage.getItem('flashSaleEndTime');

    if (!endTime) {
        // បើមិនទាន់មានទេ យើងកំណត់ម៉ោងថ្មី (១០ នាទី គិតចាប់ពីពេលនេះ)
        // 10 នាទី * 60 វិនាទី * 1000 មីលីវិនាទី
        endTime = new Date().getTime() + 10 * 60 * 1000; 
        localStorage.setItem('flashSaleEndTime', endTime);
    }

    // បញ្ជាឱ្យនាឡិកាគណនាឡើងវិញរៀងរាល់ ១ វិនាទី (1000ms)
    let timerInterval = setInterval(function() {
        let now = new Date().getTime();
        let distance = endTime - now;

        // គណនាទាញយក នាទី និង វិនាទី
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // បង្ហាញតួលេខនៅលើវេបសាយ
        document.getElementById("flash-sale-timer").innerHTML = "🔥 ប្រញាប់ឡើង! បញ្ចុះតម្លៃពិសេសបញ្ចប់ក្នុង៖ " + minutes + " នាទី " + seconds + " វិនាទី";

        // បើអស់ម៉ោង (ដល់សូន្យ)
        if (distance < 0) {
            clearInterval(timerInterval); // បញ្ឈប់នាឡិកា
            document.getElementById("flash-sale-timer").innerHTML = "❌ ការបញ្ចុះតម្លៃបានបញ្ចប់ហើយ!";
                        // ថែមកូដមួយជួរនេះ ដើម្បីបញ្ជាឱ្យវាលុបការចងចាំម៉ោងចាស់ចោល

            // បើបងចង់ឱ្យវាលោត ១០ នាទីម្ដងទៀតពេលគេចូលថ្ងៃក្រោយ អាចដោះសញ្ញា // ខាងក្រោមនេះចេញ
            // localStorage.removeItem('flashSaleEndTime'); 
        }
    }, 1000);
}


// ពេលវេបសាយដើរ (Load) វានឹងឆែកមើលទាំងភាសា និងពណ៌
window.onload = function() {
    // ១. ឆែកមើលភាសា
    let savedLang = localStorage.getItem('saved_language');
    if (savedLang === 'en') {
        setEnglish();
    } else {
        setKhmer();
            // បញ្ជាឱ្យនាឡិកាចាប់ផ្ដើមដើរ
    startCountdown();
};

    // ២. ឆែកមើលពណ៌វេបសាយ (Dark Mode)
    let savedTheme = localStorage.getItem('saved_theme');
    if (savedTheme === 'dark') {
        // បើធ្លាប់រើសងងឹត ឱ្យវាពាក់អាវងងឹត ហើយដូររូបទៅព្រះអាទិត្យ
        document.body.classList.add('dark-mode');
        document.getElementById('theme-toggle').innerText = '☀️';
    }
};


