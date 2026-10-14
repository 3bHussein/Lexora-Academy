/* Lexora Academy: modern home and complete Cyrillic beginner onboarding. */
(function(){
const $=s=>document.querySelector(s);
const count=(key,max)=>{try{const v=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(v)?new Set(v.filter(n=>Number.isInteger(n)&&n>=0&&n<max)).size:0}catch{return 0}};
const courses=[
["📗","دروس A1","12 درسًا لتأسيس اللغة الروسية","lessonsTab","green"],
["📄","قراءة A1","4 نصوص وتدريبات","readingTab","blue"],
["📘","دروس A2","16 درسًا لتوسيع المعرفة","a2Tab","purple"],
["📕","قراءة A2","5 نصوص متدرجة","a2ReadingTab","pink"],
["💬","محادثات A2","4 محادثات واقعية","a2DialoguesTab","orange"],
["🎧","استماع A2","8 تدريبات استماع","a2ListeningTab","teal"],
["📋","اختبار A2","16 سؤالًا شاملًا","a2ExamTab","rose"],
["📊","لوحة التقدم","تابع جميع إنجازاتك","dashboardTab","gold"]
];
function showHome(){
  $("#nav").innerHTML="";
  const main=$("#lesson");main.replaceChildren();
  const hero=document.createElement("section");hero.className="hero";
  hero.innerHTML='<div class="hero-content"><h1>مرحبًا بك في<br><span>Lexora Academy</span></h1><p>تعلم اللغة الروسية بطريقة منظمة وممتعة<br>من المستوى المبتدئ A1 إلى المستوى المتوسط A2</p><div class="hero-actions"><button id="heroStart">▶ &nbsp; متابعة التعلم</button><button id="heroProgress">▥ &nbsp; لوحة التقدم</button></div></div><div class="hero-quote"><p lang="ru">«Маленькие шаги<br>ведут к большим результатам.»</p><p>«الخطوات الصغيرة تقود إلى نتائج كبيرة.»</p></div>';
  main.append(hero);
  hero.querySelector("#heroStart").onclick=()=>$("#alphabetTab").click();
  hero.querySelector("#heroProgress").onclick=()=>$("#dashboardTab").click();
  const stats=document.createElement("div");stats.className="stats-grid";
  const exam=(()=>{try{return JSON.parse(localStorage.getItem("lexoraA2exam")||"null")}catch{return null}})();
  const values=[
    ["📗","تقدم A1",count("lexoraA1done",12),12,"green"],
    ["📘","تقدم A2",count("lexoraA2done",16),16,"purple"],
    ["🎧","محادثات واستماع",count("lexoraA2listening",8)+count("lexoraA2dialogues",4),12,"orange"],
    ["📋","آخر نتيجة في اختبار A2",exam?.score??0,16,"rose"]
  ];
  values.forEach(([icon,label,n,total,tone],i)=>{const card=document.createElement("article");card.className="stat-card tone-"+tone;card.innerHTML='<span class="stat-icon"></span><div class="stat-copy"><h3></h3><strong></strong></div><div class="stat-progress"><progress></progress><small></small></div>';card.querySelector(".stat-icon").textContent=icon;card.querySelector("h3").textContent=label;card.querySelector("strong").textContent=i===3&&!exam?"لم تُجرِ الاختبار":n+" / "+total+" مكتمل";card.querySelector("progress").max=total;card.querySelector("progress").value=n;card.querySelector("small").textContent=Math.round(n/total*100)+"%";stats.append(card)});main.append(stats);
  const heading=document.createElement("div");heading.className="section-heading";heading.innerHTML='<h2>⭐ أقسام التعلم</h2><p>اختر القسم الذي تريد متابعته</p>';main.append(heading);
  const grid=document.createElement("div");grid.className="course-grid";
  courses.forEach(([icon,name,desc,id,tone])=>{const card=document.createElement("article");card.className="course-card tone-"+tone;const ico=document.createElement("span");ico.className="course-icon";ico.textContent=icon;const h=document.createElement("h3");h.textContent=name;const p=document.createElement("p");p.textContent=desc;const button=document.createElement("button");button.textContent="ابدأ التعلم ❯";if(id==="readingTab"||id==="a2ReadingTab")button.textContent="ابدأ القراءة ❯";if(id==="a2ListeningTab")button.textContent="ابدأ الاستماع ❯";if(id==="dashboardTab")button.textContent="عرض التقدم ❯";if(id==="a2ExamTab")button.textContent="ابدأ الاختبار ❯";button.onclick=()=>$("#"+id).click();card.append(ico,h,p,button);grid.append(card)});main.append(grid);
  const quick=document.createElement("div");quick.className="quick-grid";[["☁️","نسخ واستعادة التقدم","قم بتصدير تقدمك أو استعادته على جهاز آخر","backupTab"],["⚙️","البداية من الصفر","ابدأ بالحروف الروسية والنطق قبل الدروس","alphabetTab"]].forEach(([icon,title,desc,id])=>{const button=document.createElement("button");button.className="quick-card";button.innerHTML='<span class="quick-icon"></span><span class="quick-copy"><strong></strong><small></small></span><span class="quick-arrow">❯</span>';button.querySelector(".quick-icon").textContent=icon;button.querySelector("strong").textContent=title;button.querySelector("small").textContent=desc;button.onclick=()=>$("#"+id).click();quick.append(button)});main.append(quick);
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
