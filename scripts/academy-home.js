/* Lexora Academy: modern home and complete Cyrillic beginner onboarding. */
(function(){
const $=s=>document.querySelector(s);
const count=(key,max)=>{try{const v=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(v)?new Set(v.filter(n=>Number.isInteger(n)&&n>=0&&n<max)).size:0}catch{return 0}};
const courses=[
["🔤","ابدأ من الصفر","الحروف الروسية والنطق وأول كلماتك","alphabetTab"],
["📗","دروس A1","12 درسًا للمبتدئين","lessonsTab"],
["📖","قراءة A1","4 نصوص وتدريبات","readingTab"],
["📘","دروس A2","16 درسًا لتطوير اللغة","a2Tab"],
["📄","قراءة A2","5 نصوص للفهم","a2ReadingTab"],
["💬","محادثات A2","4 مواقف من الحياة اليومية","a2DialoguesTab"],
["🎧","استماع A2","8 تمارين بالصوت الطبيعي","a2ListeningTab"],
["📝","اختبار A2","16 سؤالًا مع مراجعة الأخطاء","a2ExamTab"]
];
function showHome(){
  $("#nav").innerHTML="";
  const main=$("#lesson");main.replaceChildren();
  const hero=document.createElement("section");hero.className="hero";
  hero.innerHTML='<h1>مرحبًا بك في<br><span>Lexora Academy</span></h1><p>ابدأ الروسية من الحروف الأولى، وتقدم خطوة بخطوة من A1 إلى A2. دروس مبسطة بالعربية، وتدريب كتابة وقراءة واستماع.</p><div class="hero-actions"><button id="heroStart">▶ ابدأ من الصفر</button><button id="heroProgress">📊 لوحة التقدم</button></div>';
  main.append(hero);
  hero.querySelector("#heroStart").onclick=()=>$("#alphabetTab").click();
  hero.querySelector("#heroProgress").onclick=()=>$("#dashboardTab").click();
  const title=document.createElement("h2");title.className="section-title";title.textContent="📈 رحلتك التعليمية";main.append(title);
  const stats=document.createElement("div");stats.className="stats-grid";
  const values=[["📗","دروس A1",count("lexoraA1done",12),12],["📘","دروس A2",count("lexoraA2done",16),16],["🎧","استماع A2",count("lexoraA2listening",8),8],["💬","محادثات A2",count("lexoraA2dialogues",4),4]];
  values.forEach(([icon,label,n,total])=>{const card=document.createElement("article");card.className="stat-card";card.innerHTML='<span class="stat-icon"></span><h3></h3><strong></strong><progress></progress>';card.querySelector(".stat-icon").textContent=icon;card.querySelector("h3").textContent=label;card.querySelector("strong").textContent=n+" / "+total+" مكتمل";card.querySelector("progress").max=total;card.querySelector("progress").value=n;stats.append(card)});main.append(stats);
  const title2=document.createElement("h2");title2.className="section-title";title2.textContent="⭐ أقسام التعلم";main.append(title2);
  const grid=document.createElement("div");grid.className="course-grid";
  courses.forEach(([icon,name,desc,id])=>{const card=document.createElement("article");card.className="course-card";const ico=document.createElement("span");ico.className="course-icon";ico.textContent=icon;const h=document.createElement("h3");h.textContent=name;const p=document.createElement("p");p.textContent=desc;const button=document.createElement("button");button.textContent="ابدأ التعلم ←";button.onclick=()=>$("#"+id).click();card.append(ico,h,p,button);grid.append(card)});main.append(grid);
  const footer=document.createElement("p");footer.className="meta";footer.textContent="تقدمك محفوظ على هذا الجهاز. استخدم نسخ واستعادة التقدم لنقله إلى جهاز آخر.";main.append(footer);
}
function showAlphabet(){
  $("#nav").innerHTML="";const main=$("#lesson");main.replaceChildren();
  const h=document.createElement("h2");h.textContent="🔤 البداية من الصفر — الروسية A1";main.append(h);
  const intro=document.createElement("p");intro.textContent="لا تحتاج أي معرفة سابقة. الروسية تُكتب بالأبجدية السيريلية المكونة من 33 حرفًا. ابدأ بشكل الحرف وصوته، ثم انتقل إلى الكلمات والجمل.";main.append(intro);
  const steps=document.createElement("div");steps.className="intro-steps";
  [["1️⃣","تعرّف على الحروف","اقرأ شكل الحرف الكبير والصغير وطريقة نطقه التقريبية."],["2️⃣","كوّن أول كلماتك","ابدأ بكلمات سهلة مثل мама (ماما) و метро (مترو)."],["3️⃣","استمع وكرّر","اسمع الجمل الروسية الطبيعية، وكررها بصوت مرتفع."]].forEach(([icon,title,desc])=>{const box=document.createElement("section");box.className="example";const t=document.createElement("h3");t.textContent=icon+" "+title;const p=document.createElement("p");p.textContent=desc;box.append(t,p);steps.append(box)});main.append(steps);
  const alphabetTitle=document.createElement("h3");alphabetTitle.className="section-title";alphabetTitle.textContent="الأبجدية الروسية — 33 حرفًا";main.append(alphabetTitle);
  const notice=document.createElement("p");notice.className="meta";notice.textContent="النطق العربي تقريبي للتسهيل، وبعض الأصوات الروسية ليس لها مقابل عربي مطابق. العلامتان Ъ وЬ لا تنطقان وحدهما.";main.append(notice);
  const grid=document.createElement("div");grid.className="alphabet-grid";
  window.LEXORA_ALPHABET.forEach(({letter,latin,ar})=>{const box=document.createElement("article");box.className="alphabet-card";const big=document.createElement("strong");big.textContent=letter;const pronunciation=document.createElement("div");pronunciation.textContent="صوت تقريبي: "+ar;const small=document.createElement("small");small.textContent="Latin: "+latin;box.append(big,pronunciation,small);grid.append(box)});main.append(grid);
  const practice=document.createElement("section");practice.className="example";practice.innerHTML='<h3>✍️ أول تدريب</h3><p>اكتب الكلمة الروسية التي تعني «ماما» كما تظهر هنا: <b lang="ru" dir="ltr">мама</b></p><input id="alphabetWriting" dir="ltr" autocomplete="off" placeholder="اكتب мама"><button id="alphabetCheck" type="button" style="margin-top:10px">تحقق من الإجابة</button><p id="alphabetFeedback" aria-live="polite"></p>';
  main.append(practice);practice.querySelector("#alphabetCheck").onclick=()=>{const ok=practice.querySelector("#alphabetWriting").value.trim().toLocaleLowerCase("ru")==="мама";const feedback=practice.querySelector("#alphabetFeedback");feedback.textContent=ok?"✓ ممتاز! كتبت أول كلمة روسية بشكل صحيح.":"جرّب تاني: мама — م ا م ا";feedback.className=ok?"ok":"bad";if(ok)localStorage.setItem("lexoraAlphabetStarted","true")};
  const audio=document.createElement("section");audio.className="example";audio.innerHTML='<h3>🔊 أول جملة روسية</h3><p class="ru">Привет!</p><p>مرحبًا (غير رسمي)</p><button id="alphabetAudio">▶ استمع للصوت الطبيعي</button><p id="alphabetAudioFeedback" aria-live="polite"></p>';main.append(audio);
  audio.querySelector("#alphabetAudio").onclick=()=>{const src=window.LEXORA_AUDIO?.["Привет!"];if(!src){audio.querySelector("#alphabetAudioFeedback").textContent="التسجيل غير متوفر حاليًا";return}new Audio(src).play().catch(()=>{audio.querySelector("#alphabetAudioFeedback").textContent="تعذر تشغيل الصوت"})};
  const next=document.createElement("button");next.textContent="التالي: درس التحية والتعارف ←";next.onclick=()=>$("#lessonsTab").click();main.append(next);
}
$("#homeTab").onclick=showHome;
$("#alphabetTab").onclick=showAlphabet;
showHome();
})();
