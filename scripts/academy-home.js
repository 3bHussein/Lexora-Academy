/* Lexora Academy: modern home and complete Cyrillic beginner onboarding. */
(function(){
const $=s=>document.querySelector(s);
const isArabic=()=>localStorage.getItem("lexoraLanguage")==="ar";
const bi=(en,ar)=>isArabic()?ar:en;
const count=(key,max)=>{try{const v=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(v)?new Set(v.filter(n=>Number.isInteger(n)&&n>=0&&n<max)).size:0}catch{return 0}};
const courses=[
["📗","دروس A1","12 درسًا لتأسيس اللغة الروسية","lessonsTab","green"],
["📄","قراءة A1","4 نصوص وتدريبات","readingTab","blue"],
["📘","دروس A2","16 درسًا لتوسيع المعرفة","a2Tab","purple"],
["📕","قراءة A2","5 نصوص متدرجة","a2ReadingTab","pink"],
["💬","محادثات A2","4 محادثات واقعية","a2DialoguesTab","orange"],
["🎧","استماع A2","8 تدريبات استماع","a2ListeningTab","teal"],
["📋","اختبار A2","16 سؤالًا شاملًا","a2ExamTab","rose"],
["🖼️","المفردات المصوّرة","64 كلمة في 8 موضوعات","vocabTab","gold"]
];
function showHome(){
  $("#nav").innerHTML="";
  const main=$("#lesson");main.replaceChildren();
  const hero=document.createElement("section");hero.className="hero";
  hero.innerHTML='<div class="hero-content"><h1>مرحبًا بك في<br><span>Lexora Academy</span></h1><p>تعلم اللغة الروسية بطريقة منظمة وممتعة<br>من المستوى المبتدئ A1 إلى المستوى المتوسط A2</p><div class="hero-actions"><button id="heroStart">▶ &nbsp; متابعة التعلم</button><button id="heroProgress">▥ &nbsp; لوحة التقدم</button></div></div><div class="hero-quote"><p lang="ru">«Маленькие шаги<br>ведут к большим результатам.»</p><p>«الخطوات الصغيرة تقود إلى نتائج كبيرة.»</p></div>';
  main.append(hero);
  if(!isArabic()){hero.querySelector("h1").innerHTML='Welcome to<br><span>Lexora Academy</span>';hero.querySelector(".hero-content>p").innerHTML="Learn Russian in a structured, enjoyable way<br>from beginner A1 to intermediate A2";hero.querySelector("#heroStart").textContent="▶ Continue Learning";hero.querySelector("#heroProgress").textContent="▥ Progress Dashboard";hero.querySelector(".hero-quote p:last-child").textContent='"Small steps lead to big results."'}
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
  if(!isArabic()){const names=["A1 Progress","A2 Progress","Speaking & Listening","Latest A2 Exam Result"];stats.querySelectorAll(".stat-card").forEach((card,i)=>{card.querySelector("h3").textContent=names[i];const strong=card.querySelector("strong");strong.textContent=i===3&&!exam?"Not taken yet":strong.textContent.replace("مكتمل","completed")})}
  const heading=document.createElement("div");heading.className="section-heading";heading.innerHTML='<h2>⭐ أقسام التعلم</h2><p>اختر القسم الذي تريد متابعته</p>';main.append(heading);
  if(!isArabic()){heading.querySelector("h2").textContent="⭐ Learning Sections";heading.querySelector("p").textContent="Choose where you want to continue"}
  const grid=document.createElement("div");grid.className="course-grid";
  courses.forEach(([icon,name,desc,id,tone])=>{const card=document.createElement("article");card.className="course-card tone-"+tone;const ico=document.createElement("span");ico.className="course-icon";ico.textContent=icon;const h=document.createElement("h3");h.textContent=name;const p=document.createElement("p");p.textContent=desc;const button=document.createElement("button");button.textContent="ابدأ التعلم ❯";if(id==="readingTab"||id==="a2ReadingTab")button.textContent="ابدأ القراءة ❯";if(id==="a2ListeningTab")button.textContent="ابدأ الاستماع ❯";if(id==="dashboardTab")button.textContent="عرض التقدم ❯";if(id==="a2ExamTab")button.textContent="ابدأ الاختبار ❯";button.onclick=()=>$("#"+id).click();card.append(ico,h,p,button);grid.append(card)});main.append(grid);
  if(!isArabic()){const en=[["A1 Lessons","12 lessons to build your Russian foundation","Start Learning ❯"],["A1 Reading","4 texts and practice activities","Start Reading ❯"],["A2 Lessons","16 lessons to expand your knowledge","Start Learning ❯"],["A2 Reading","5 graded reading passages","Start Reading ❯"],["A2 Conversations","4 real-life conversations","Start Conversations ❯"],["A2 Listening","8 listening exercises","Start Listening ❯"],["A2 Exam","16 review questions","Start Exam ❯"],["Visual Vocabulary","64 words across 8 topics","Explore Words ❯"]];grid.querySelectorAll(".course-card").forEach((card,i)=>{card.querySelector("h3").textContent=en[i][0];card.querySelector("p").textContent=en[i][1];card.querySelector("button").textContent=en[i][2]})}
  const quick=document.createElement("div");quick.className="quick-grid";[["☁️","نسخ واستعادة التقدم","قم بتصدير تقدمك أو استعادته على جهاز آخر","backupTab"],["⚙️","البداية من الصفر","ابدأ بالحروف الروسية والنطق قبل الدروس","alphabetTab"]].forEach(([icon,title,desc,id])=>{const button=document.createElement("button");button.className="quick-card";button.innerHTML='<span class="quick-icon"></span><span class="quick-copy"><strong></strong><small></small></span><span class="quick-arrow">❯</span>';button.querySelector(".quick-icon").textContent=icon;button.querySelector("strong").textContent=title;button.querySelector("small").textContent=desc;button.onclick=()=>$("#"+id).click();quick.append(button)});main.append(quick);
  if(!isArabic()){const en=[["Backup & Restore Progress","Export your progress or restore it on another device"],["Start from Zero","Learn the Russian alphabet and pronunciation first"]];quick.querySelectorAll(".quick-card").forEach((card,i)=>{card.querySelector("strong").textContent=en[i][0];card.querySelector("small").textContent=en[i][1]})}
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
  window.LEXORA_ALPHABET.forEach(({letter,latin,ar})=>{const box=document.createElement("article");box.className="alphabet-card";const big=document.createElement("strong");big.textContent=letter;const pronunciation=document.createElement("div");pronunciation.textContent="صوت تقريبي: "+ar;const small=document.createElement("small");small.textContent="Latin: "+latin;box.append(big,pronunciation,small);
  const playLetter=document.createElement("button");playLetter.type="button";playLetter.className="alphabet-play";playLetter.textContent=isArabic()?"🔊 استمع للحرف":"🔊 Hear letter";
  const letterKey=letter.split(" ")[0];
  const updateAudio=()=>{
   const recording=window.LEXORA_ALPHABET_AUDIO?.[letterKey];
   playLetter.disabled=!recording;
   playLetter.title=recording?"":bi("Recording being prepared","التسجيل قيد الإعداد");
   playLetter.textContent=recording?bi("🔊 Hear letter name","🔊 اسمع اسم الحرف"):bi("Audio coming soon","الصوت قريبًا");
   playLetter.onclick=recording?()=>new Audio(recording).play().catch(()=>{playLetter.textContent=bi("Audio unavailable","تعذر تشغيل الصوت")}):null;
  };
  updateAudio();window.addEventListener("lexora-audio-ready",updateAudio);
  box.append(playLetter);grid.append(box)});main.append(grid);
  const practice=document.createElement("section");practice.className="example";practice.innerHTML='<h3>✍️ أول تدريب</h3><p>اكتب الكلمة الروسية التي تعني «ماما» كما تظهر هنا: <b lang="ru" dir="ltr">мама</b></p><input id="alphabetWriting" dir="ltr" autocomplete="off" placeholder="اكتب мама"><button id="alphabetCheck" type="button" style="margin-top:10px">تحقق من الإجابة</button><p id="alphabetFeedback" aria-live="polite"></p>';
  main.append(practice);practice.querySelector("#alphabetCheck").onclick=()=>{const ok=practice.querySelector("#alphabetWriting").value.trim().toLocaleLowerCase("ru")==="мама";const feedback=practice.querySelector("#alphabetFeedback");feedback.textContent=ok?"✓ ممتاز! كتبت أول كلمة روسية بشكل صحيح.":"جرّب تاني: мама — م ا م ا";feedback.className=ok?"ok":"bad";if(ok)localStorage.setItem("lexoraAlphabetStarted","true")};
  const letterQuiz=document.createElement("section");letterQuiz.className="example alphabet-quiz";
 const quizTitle=document.createElement("h3");quizTitle.textContent=bi("🎯 Letter recognition practice","🎯 تدريب تمييز الحروف");
 const quizHint=document.createElement("p");quizHint.textContent=bi("Listen to a letter, then choose its Cyrillic symbol. Complete five rounds.","استمع إلى الحرف ثم اختر رمزه الروسي. أكمل خمس جولات.");
 const quizProgress=document.createElement("p");quizProgress.className="meta";quizProgress.setAttribute("aria-live","polite");
 const quizChoices=document.createElement("div");quizChoices.className="alphabet-quiz-choices";
 const quizFeedback=document.createElement("p");quizFeedback.setAttribute("aria-live","polite");
 const hear=document.createElement("button");hear.type="button";hear.textContent=bi("🔊 Play letter name","🔊 اسمع اسم الحرف");
 letterQuiz.append(quizTitle,quizHint,quizProgress,hear,quizChoices,quizFeedback);main.append(letterQuiz);
 const letters=window.LEXORA_ALPHABET.map(x=>x.letter.split(" ")[0]);let round=0,score=0,answer="";
 function newRound(){
  quizChoices.replaceChildren();quizFeedback.textContent="";
  if(round===5){
   quizProgress.textContent=bi("Completed: ","انتهى التدريب: ")+score+"/5";
   const retry=document.createElement("button");retry.type="button";retry.textContent=bi("Try again","أعد المحاولة");retry.onclick=()=>{round=0;score=0;newRound()};quizChoices.append(retry);
   hear.disabled=true;return;
  }
  hear.disabled=false;answer=letters[(round*7+2)%letters.length];
  quizProgress.textContent=bi("Round ","الجولة ")+(round+1)+"/5";
  const distractors=[letters[(round*7+5)%letters.length],letters[(round*7+11)%letters.length]];
  const options=[answer,...distractors].sort((a,b)=>((letters.indexOf(a)+round)%3)-((letters.indexOf(b)+round)%3));
  options.forEach(letter=>{const button=document.createElement("button");button.type="button";button.textContent=letter;button.lang="ru";button.onclick=()=>{
   const correct=letter===answer;if(correct)score++;
   quizFeedback.textContent=correct?bi("✓ Correct!","✓ إجابة صحيحة"):bi("✗ The correct letter is ","✗ الحرف الصحيح هو ")+(!correct?answer:"");
   quizChoices.querySelectorAll("button").forEach(b=>b.disabled=true);
   const next=document.createElement("button");next.type="button";next.textContent=bi("Next round →","الجولة التالية ←");next.onclick=()=>{round++;newRound()};quizChoices.append(next);
   const best=Number(localStorage.getItem("lexoraAlphabetQuizBest")||"0");
   if(round===4)localStorage.setItem("lexoraAlphabetQuizBest",String(Math.max(best,score)));
  };quizChoices.append(button)});
 }
 hear.onclick=()=>{const src=window.LEXORA_ALPHABET_AUDIO?.[answer];if(!src){quizFeedback.textContent=bi("Audio is being prepared.","التسجيل قيد التجهيز");return}new Audio(src).play().catch(()=>{quizFeedback.textContent=bi("Could not play recording.","تعذر تشغيل التسجيل")})};
 newRound();
 const writingQuiz=document.createElement("section");writingQuiz.className="example alphabet-writing";
 const writingHeading=document.createElement("h3");writingHeading.textContent=bi("✍️ Write Russian letters","✍️ اكتب الحروف الروسية");
 const writingInfo=document.createElement("p");writingInfo.textContent=bi("Hear a letter and type its Cyrillic character. Complete five rounds.","اسمع الحرف واكتب رمزه الروسي. أكمل خمس جولات.");
 const writingProgress=document.createElement("p");writingProgress.className="meta";writingProgress.setAttribute("aria-live","polite");
 const writingListen=document.createElement("button");writingListen.type="button";writingListen.textContent=bi("🔊 Hear letter","🔊 اسمع الحرف");
 const writingInput=document.createElement("input");writingInput.type="text";writingInput.dir="ltr";writingInput.lang="ru";writingInput.autocomplete="off";writingInput.maxLength=2;writingInput.placeholder=bi("Type one Cyrillic letter","اكتب حرفًا روسيًا");
 const writingCheck=document.createElement("button");writingCheck.type="button";writingCheck.textContent=bi("Check answer","تحقق من الإجابة");
 const writingFeedback=document.createElement("p");writingFeedback.setAttribute("aria-live","polite");
 writingQuiz.append(writingHeading,writingInfo,writingProgress,writingListen,writingInput,writingCheck,writingFeedback);main.append(writingQuiz);
 const writingLetters=["А","М","О","Т","К"];let writingRound=0,writingScore=0;
 const normalizeLetter=x=>x.trim().normalize("NFC").toLocaleUpperCase("ru");
 function refreshWriting(){
   writingInput.value="";writingInput.disabled=false;writingFeedback.textContent="";
   if(writingRound===writingLetters.length){
     writingProgress.textContent=bi("Completed: ","انتهى التدريب: ")+writingScore+"/5";
     writingInput.disabled=true;writingListen.disabled=true;
     writingCheck.textContent=bi("Try again","أعد المحاولة");
     const best=Number(localStorage.getItem("lexoraAlphabetWritingBest")||"0");
     localStorage.setItem("lexoraAlphabetWritingBest",String(Math.max(best,writingScore)));
     return;
   }
   writingListen.disabled=false;
   writingProgress.textContent=bi("Round ","الجولة ")+(writingRound+1)+"/5";
   writingCheck.textContent=bi("Check answer","تحقق من الإجابة");
 }
 writingListen.onclick=()=>{
   const key=writingLetters[writingRound];
   const src=window.LEXORA_ALPHABET_AUDIO?.[key];
   if(!src){writingFeedback.textContent=bi("Audio is being prepared.","التسجيل قيد التجهيز");return}
   new Audio(src).play().catch(()=>{writingFeedback.textContent=bi("Could not play audio.","تعذر تشغيل الصوت")});
 };
 function writingSubmit(){
   if(writingRound===writingLetters.length){if(!writingInput.disabled){writingRound=0;writingScore=0;refreshWriting()}else{refreshWriting()}return}
   if(writingInput.disabled){refreshWriting();return}
   const expected=writingLetters[writingRound];
   if(!writingInput.value.trim()){writingFeedback.textContent=bi("Type a letter first.","اكتب الحرف أولًا");return}
   const correct=normalizeLetter(writingInput.value)===expected;
   if(correct)writingScore++;
   writingFeedback.textContent=correct?bi("✓ Correct!","✓ إجابة صحيحة"):bi("Correct letter: ","الحرف الصحيح: ")+expected;
   writingRound++;writingInput.disabled=true;
   writingCheck.textContent=bi("Next →","التالي ←");
   if(writingRound===writingLetters.length){
     const best=Number(localStorage.getItem("lexoraAlphabetWritingBest")||"0");
     localStorage.setItem("lexoraAlphabetWritingBest",String(Math.max(best,writingScore)));
   }
 }
 writingCheck.onclick=writingSubmit;
 refreshWriting();
 const audio=document.createElement("section");audio.className="example";audio.innerHTML='<h3>🔊 أول جملة روسية</h3><p class="ru">Привет!</p><p>مرحبًا (غير رسمي)</p><button id="alphabetAudio">▶ استمع للصوت الطبيعي</button><p id="alphabetAudioFeedback" aria-live="polite"></p>';main.append(audio);
  audio.querySelector("#alphabetAudio").onclick=()=>{const src=window.LEXORA_AUDIO?.["Привет!"];if(!src){audio.querySelector("#alphabetAudioFeedback").textContent="التسجيل غير متوفر حاليًا";return}new Audio(src).play().catch(()=>{audio.querySelector("#alphabetAudioFeedback").textContent="تعذر تشغيل الصوت"})};
  if(!isArabic()){
  h.textContent="🔤 Start from Zero — Russian A1";
  intro.textContent="No previous experience needed. Russian uses the 33-letter Cyrillic alphabet. Start with the letter shapes and sounds, then build your first words and sentences.";
  steps.querySelectorAll("h3").forEach((el,i)=>el.textContent=["1️⃣ Learn the letters","2️⃣ Build your first words","3️⃣ Listen and repeat"][i]);
  steps.querySelectorAll("p").forEach((el,i)=>el.textContent=["Learn uppercase and lowercase letters with approximate pronunciation.","Start with simple words like мама (mama) and метро (metro).","Listen to natural Russian recordings and repeat aloud."][i]);
  alphabetTitle.textContent="The Russian alphabet — 33 letters";
  notice.textContent="Arabic sound guides are approximate. Some Russian sounds have no exact equivalent; Ъ and Ь are not pronounced independently.";
  grid.querySelectorAll(".alphabet-card div").forEach(el=>el.textContent="Pronunciation: "+el.parentElement.querySelector("small").textContent.replace("Latin: ",""));
  practice.querySelector("h3").textContent="✍️ First writing exercise";
  practice.querySelector("p").textContent="Type the Russian word for mama: мама";
  practice.querySelector("#alphabetWriting").placeholder="Type мама";
  practice.querySelector("#alphabetCheck").textContent="Check answer";
  audio.querySelector("h3").textContent="🔊 Your first Russian phrase";
  audio.querySelector("p:not(.ru)").textContent="Hi! (informal)";
  audio.querySelector("#alphabetAudio").textContent="▶ Listen to natural audio";
}
const next=document.createElement("button");next.textContent="التالي: درس التحية والتعارف ←";next.onclick=()=>$("#lessonsTab").click();if(!isArabic())next.textContent="Next: Greetings & Introductions →";main.append(next);
}
const sidebar=document.querySelector("aside");
const sidebarOrder=["homeTab","alphabetTab","vocabTab","lessonsTab","readingTab","a2Tab","a2ReadingTab","a2DialoguesTab","a2ListeningTab","a2ExamTab","dashboardTab","backupTab"];
const labels={
homeTab:["🏠","الرئيسية","نظرة عامة على رحلتك"],
alphabetTab:["🔤","البداية من الصفر","الحروف والنطق"],
vocabTab:["🖼️","المفردات المصوّرة","64 كلمة في 8 موضوعات"],
lessonsTab:["📘","دروس A1","أساسيات اللغة الروسية"],
readingTab:["📄","قراءة A1","نصوص وتمارين"],
a2Tab:["📚","دروس A2","توسيع المعرفة"],
a2ReadingTab:["📕","قراءة A2","نصوص أكثر تقدمًا"],
a2DialoguesTab:["💬","محادثات A2","مواقف من الحياة اليومية"],
a2ListeningTab:["🎧","استماع A2","تدريبات الاستماع"],
a2ExamTab:["📋","اختبار A2","اختبار شامل"],
dashboardTab:["📊","لوحة التقدم","تابع إنجازاتك"],
backupTab:["☁️","نسخ واستعادة التقدم","احفظ بياناتك"]
};
const englishLabels={
homeTab:["Home","Overview of your journey"],
alphabetTab:["Start from Zero","Letters and pronunciation"],
vocabTab:["Visual Vocabulary","64 words in 8 themes"],
lessonsTab:["A1 Lessons","Russian language foundations"],
readingTab:["A1 Reading","Texts and practice"],
a2Tab:["A2 Lessons","Expand your knowledge"],
a2ReadingTab:["A2 Reading","Intermediate reading"],
a2DialoguesTab:["A2 Conversations","Everyday situations"],
a2ListeningTab:["A2 Listening","Listening practice"],
a2ExamTab:["A2 Exam","Comprehensive review"],
dashboardTab:["Progress Dashboard","Track your achievements"],
backupTab:["Backup & Restore","Keep your progress safe"]
};
sidebarOrder.forEach((id,i)=>{const button=$("#"+id);if(!button)return;const [ico,arabicLabel,arabicDesc]=labels[id];const [label,desc]=isArabic()?[arabicLabel,arabicDesc]:englishLabels[id];button.replaceChildren();const icon=document.createElement("span");icon.className="menu-ico";icon.textContent=ico;const copy=document.createElement("span");copy.className="menu-copy";const title=document.createElement("strong");title.textContent=label;const small=document.createElement("small");small.textContent=desc;copy.append(title,small);button.append(icon,copy);sidebar.append(button);if(i===8||i===10){const hr=document.createElement("hr");sidebar.append(hr)}});
const lessonHeading=sidebar.querySelector("h2");const lessonProgress=sidebar.querySelector("#progress");const lessonSummary=sidebar.querySelector("#summary");const lessonNav=sidebar.querySelector("#nav");
const lessonBox=document.createElement("div");lessonBox.className="lesson-submenu";[lessonHeading,lessonProgress,lessonSummary,lessonNav].forEach(el=>{if(el)lessonBox.append(el)});$("#lessonsTab").after(lessonBox);
sidebar.querySelectorAll("hr").forEach(hr=>{if(hr.nextElementSibling?.id==="dashboardTab"||hr.nextElementSibling?.id==="backupTab")return;hr.remove()});
function activateMenu(id){sidebar.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.id===id));document.body.classList.toggle("on-home",id==="homeTab");document.body.classList.toggle("on-lessons",id==="lessonsTab"||id==="a2Tab")}
sidebarOrder.forEach(id=>{const button=$("#"+id);if(!button)return;button.addEventListener("click",()=>activateMenu(id))});
const languageWrap=document.createElement("div");languageWrap.className="language-switch";languageWrap.innerHTML='<span>🌐</span><label for="academyLanguage">Language</label><select id="academyLanguage" aria-label="Website language"><option value="en">English</option><option value="ar">العربية</option></select>';
sidebar.querySelector(".brand-caption").after(languageWrap);
const langSelect=languageWrap.querySelector("select");langSelect.value=isArabic()?"ar":"en";
langSelect.onchange=()=>{localStorage.setItem("lexoraLanguage",langSelect.value);location.reload()};
document.documentElement.lang=isArabic()?"ar":"en";
document.documentElement.dir=isArabic()?"rtl":"ltr";
if(!isArabic()){$(".brand-caption").textContent="Learn Russian step by step";if(lessonHeading)lessonHeading.textContent="Current level lessons";if(languageWrap.querySelector("label"))languageWrap.querySelector("label").textContent="Language"}
$("#homeTab").onclick=showHome;
$("#alphabetTab").onclick=showAlphabet;
showHome();
activateMenu("homeTab");
})();
