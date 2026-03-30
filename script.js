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
