(function(){
const btn=document.getElementById("vocabTab");if(!btn)return;
btn.addEventListener("click",function(){
const ar=localStorage.getItem("lexoraLanguage")==="ar";
const tr=(en,arabic)=>ar?arabic:en;
const main=document.getElementById("lesson");main.replaceChildren();document.getElementById("nav").replaceChildren();
const heading=document.createElement("h2");heading.textContent=tr("🖼️ Russian Vocabulary by Topic","🖼️ مفردات روسية حسب الموضوع");main.append(heading);
const topics=window.LEXORA_VISUAL_VOCAB||[],numbers=window.LEXORA_NUMBERS||[];
const total=topics.reduce((n,t)=>n+(t.id==="numbers"?t.words.filter(x=>!["один","два","три","десять"].includes(x[0])).length:t.words.length),0)+numbers.length;
const intro=document.createElement("p");intro.textContent=tr("Learn vocabulary with natural Russian audio, number drills and saved progress.","تعلّم المفردات بالصوت الروسي الطبيعي وتدريبات الأرقام وحفظ التقدم.");main.append(intro);
const menu=document.createElement("div");menu.className="vocab-topics";main.append(menu);
const grid=document.createElement("div");grid.className="vocab-cards";main.append(grid);
const progress=document.createElement("p");progress.className="meta";progress.setAttribute("aria-live","polite");main.append(progress);
let saved;try{saved=JSON.parse(localStorage.getItem("lexoraVocabKnown")||"[]");if(!Array.isArray(saved))saved=[]}catch{saved=[]}
function update(){progress.textContent=tr("Words learned: ","الكلمات المتعلمة: ")+saved.length+" / "+total}
function audio(phrase,button,feedback){
 const src=window.LEXORA_CURRICULUM_AUDIO?.[phrase]||window.LEXORA_AUDIO?.[phrase]||window.LEXORA_A2_AUDIO?.[phrase];
 if(!src){if(feedback)feedback.textContent=tr("Recording being prepared","التسجيل قيد التجهيز");return}
 new Audio(src).play().catch(()=>{if(feedback)feedback.textContent=tr("Recording unavailable","التسجيل غير متاح")});
}
function card(ru,meaning,key,number){
 const el=document.createElement("article");el.className="vocab-card";
 const word=document.createElement("strong");word.textContent=ru;word.lang="ru";word.dir="ltr";
 const meaningEl=document.createElement("p");meaningEl.textContent=meaning;
 const learned=document.createElement("button");learned.type="button";
 function label(){learned.textContent=saved.includes(key)?tr("✓ Learned","✓ تم تعلمها"):tr("Mark learned","علّم كمتعلّمة")}
 label();learned.onclick=()=>{const i=saved.indexOf(key);if(i<0)saved.push(key);else saved.splice(i,1);localStorage.setItem("lexoraVocabKnown",JSON.stringify(saved));label();update()};
 const listen=document.createElement("button");listen.type="button";listen.className="vocab-listen";listen.textContent=tr("🔊 Listen","🔊 استمع");listen.onclick=()=>audio(ru,listen,progress);
 if(number!==undefined){const digit=document.createElement("span");digit.className="vocab-number";digit.textContent=String(number);el.append(digit)}
 el.append(word,meaningEl,listen,learned);return el;
}
function active(id){menu.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.id===id))}
function show(topic){
 active(topic.id);grid.replaceChildren();
 topic.words.forEach(entry=>grid.append(card(entry[0],ar?entry[2]:entry[1],topic.id+":"+entry[0])));
 update();
}
function numberSection(){
 active("numbers-practice");grid.replaceChildren();
 const panel=document.createElement("section");panel.className="numbers-lab";grid.append(panel);
 const title=document.createElement("h3");title.textContent=tr("🔢 Numbers Lab — 0 to 10,000","🔢 مختبر الأرقام — من 0 إلى 10000");
 const expl=document.createElement("p");expl.textContent=tr("Cardinal numbers in their basic forms. In Russian, some forms change with gender and case (e.g. один/одна, два/две).","الأرقام بصيغتها الأساسية. تتغير بعض الأشكال حسب الجنس والحالة الإعرابية مثل один/одна وдва/две.");
 const search=document.createElement("input");search.type="search";search.placeholder=tr("Search by number or Russian word","ابحث بالرقم أو الكلمة الروسية");search.setAttribute("aria-label",tr("Search numbers","ابحث عن الأرقام"));
 const groups=document.createElement("div");groups.className="numbers-groups";
 const list=document.createElement("div");list.className="numbers-list";
 const sets=[{name:tr("0–10","٠–١٠"),items:numbers.filter(x=>x.n<=10)},{name:tr("11–20","١١–٢٠"),items:numbers.filter(x=>x.n>=11&&x.n<=20)},{name:tr("21–100","٢١–١٠٠"),items:numbers.filter(x=>x.n>=21&&x.n<=100)},{name:tr("Hundreds & Thousands","المئات والآلاف"),items:numbers.filter(x=>x.n>100)}];
 let current=sets[0].items;
 function draw(items){list.replaceChildren();items.forEach(x=>list.append(card(x.ru,tr("Number ","رقم ")+x.n,"number:"+x.n,x.n)));if(!items.length){const empty=document.createElement("p");empty.textContent=tr("No matching numbers","لا توجد أرقام مطابقة");list.append(empty)}update()}
 sets.forEach((set,i)=>{const b=document.createElement("button");b.type="button";b.textContent=set.name;b.className=i===0?"active":"";b.onclick=()=>{current=set.items;search.value="";groups.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));draw(current)};groups.append(b)});
 search.oninput=()=>{const q=search.value.trim().toLocaleLowerCase("ru");draw(q?numbers.filter(x=>String(x.n).includes(q)||x.ru.includes(q)):current)};
 panel.append(title,expl,search,groups,list);
 const usage=document.createElement("section");usage.className="numbers-usage";grid.append(usage);
 const usageTitle=document.createElement("h3");usageTitle.textContent=tr("💬 Numbers in real life","💬 الأرقام في الحياة اليومية");usage.append(usageTitle);
 const situations=[
  {en:"Price",ar:"السعر",ru:"Сколько стоит? — Двадцать пять рублей.",meaningEn:"How much does it cost? — 25 rubles.",meaningAr:"بكام؟ — ٢٥ روبلًا."},
  {en:"Time",ar:"الوقت",ru:"Сейчас десять часов.",meaningEn:"It is ten o'clock now.",meaningAr:"الساعة الآن العاشرة."},
  {en:"Age",ar:"العمر",ru:"Мне двадцать лет.",meaningEn:"I am 20 years old.",meaningAr:"عمري ٢٠ سنة."},
  {en:"Quantity",ar:"الكمية",ru:"У меня три книги.",meaningEn:"I have three books.",meaningAr:"عندي ثلاثة كتب."},
  {en:"Phone number",ar:"رقم الهاتف",ru:"Мой номер: восемь, девять, два, ноль.",meaningEn:"My number: 8, 9, 2, 0 (practice example).",meaningAr:"رقمي: ٨، ٩، ٢، ٠ (مثال للتدريب)."}
 ];
 situations.forEach(item=>{
  const row=document.createElement("article");row.className="numbers-situation";
  const heading=document.createElement("strong");heading.textContent=tr(item.en,item.ar);
  const russian=document.createElement("p");russian.lang="ru";russian.dir="ltr";russian.textContent=item.ru;
  const meaning=document.createElement("p");meaning.textContent=tr(item.meaningEn,item.meaningAr);
  const listen=document.createElement("button");listen.type="button";listen.textContent=tr("🔊 Hear sentence","🔊 استمع للجملة");
  listen.onclick=()=>audio(item.ru,listen,progress);
  row.append(heading,russian,meaning,listen);usage.append(row);
 });

 const lifeQuiz=document.createElement("section");lifeQuiz.className="numbers-life-quiz";grid.append(lifeQuiz);
 const lifeTitle=document.createElement("h3");lifeTitle.textContent=tr("🧩 Everyday Numbers Challenge","🧩 تحدي الأرقام اليومية");
 const lifeHelp=document.createElement("p");lifeHelp.textContent=tr("Read the situation and choose the correct Russian expression.","اقرأ الموقف واختر التعبير الروسي الصحيح.");
 const lifeStatus=document.createElement("p");lifeStatus.setAttribute("aria-live","polite");
 const lifeChoices=document.createElement("div");lifeChoices.className="numbers-life-choices";
 const lifeFeedback=document.createElement("p");lifeFeedback.setAttribute("aria-live","polite");
 const lifeQuestions=[
  {en:"What is the Russian for 'I am twenty years old'?",ar:"كيف تقول «عمري عشرون سنة» بالروسية؟",answer:"Мне двадцать лет.",choices:["Мне двадцать лет.","Сейчас десять часов.","У меня три книги."]},
  {en:"How do you ask 'How much does it cost?'",ar:"كيف تسأل «كم السعر؟»",answer:"Сколько стоит?",choices:["Сколько стоит?","Который час?","Сколько тебе лет?"]},
  {en:"How do you say 'It is ten o'clock now'?",ar:"كيف تقول «الساعة الآن العاشرة»؟",answer:"Сейчас десять часов.",choices:["Сейчас десять часов.","Мне десять лет.","Десять рублей."]},
  {en:"How do you say 'I have three books'?",ar:"كيف تقول «لدي ثلاثة كتب»؟",answer:"У меня три книги.",choices:["У меня три книги.","У меня три рубля.","Мне три года."]},
  {en:"How do you say 'twenty-five rubles'?",ar:"كيف تقول «خمسة وعشرون روبلًا»؟",answer:"Двадцать пять рублей.",choices:["Двадцать пять рублей.","Двадцать пять часов.","Двадцать пять лет."]}
 ];
 let lifeRound=0,lifeScore=0,lifeDone=false;
 function lifeRender(){
  lifeChoices.replaceChildren();lifeFeedback.textContent="";
  if(lifeRound===lifeQuestions.length){
   lifeDone=true;lifeStatus.textContent=tr("Completed: ","انتهى التدريب: ")+lifeScore+"/5";
   localStorage.setItem("lexoraNumbersLifeBest",String(Math.max(lifeScore,Number(localStorage.getItem("lexoraNumbersLifeBest")||"0"))));
   const again=document.createElement("button");again.type="button";again.textContent=tr("Try again","أعد المحاولة");again.onclick=()=>{lifeRound=0;lifeScore=0;lifeDone=false;lifeRender()};lifeChoices.append(again);return;
  }
  const q=lifeQuestions[lifeRound];lifeStatus.textContent=tr("Question ","السؤال ")+(lifeRound+1)+"/5 — "+tr(q.en,q.ar);
  q.choices.forEach(choice=>{
   const b=document.createElement("button");b.type="button";b.textContent=choice;b.lang="ru";b.dir="ltr";b.onclick=()=>{
    if(lifeDone)return;
    const correct=choice===q.answer;if(correct)lifeScore++;
    lifeFeedback.textContent=correct?tr("✓ Correct!","✓ إجابة صحيحة"):tr("Correct answer: ","الإجابة الصحيحة: ")+q.answer;
    lifeChoices.querySelectorAll("button").forEach(x=>x.disabled=true);
    const hearAnswer=document.createElement("button");hearAnswer.type="button";hearAnswer.textContent=tr("🔊 Hear correct answer","🔊 اسمع الإجابة الصحيحة");hearAnswer.onclick=()=>audio(q.answer,hearAnswer,lifeFeedback);lifeChoices.append(hearAnswer);
    const next=document.createElement("button");next.type="button";next.textContent=tr("Next →","التالي ←");next.onclick=()=>{lifeRound++;lifeRender()};lifeChoices.append(next);
   };lifeChoices.append(b);
  });
 }
 lifeQuiz.append(lifeTitle,lifeHelp,lifeStatus,lifeChoices,lifeFeedback);lifeRender();
 const quiz=document.createElement("section");quiz.className="numbers-quiz";grid.append(quiz);
 const qTitle=document.createElement("h3");qTitle.textContent=tr("🎯 Number Challenge","🎯 تحدي الأرقام");
 const qHelp=document.createElement("p");qHelp.textContent=tr("Read the number, then type it in Russian. Ten rounds.","اقرأ الرقم ثم اكتبه بالروسية. عشر جولات.");
 const qPrompt=document.createElement("p");qPrompt.className="numbers-prompt";qPrompt.setAttribute("aria-live","polite");
 const qInput=document.createElement("input");qInput.type="text";qInput.dir="ltr";qInput.lang="ru";qInput.autocomplete="off";qInput.placeholder=tr("Write the number in Russian","اكتب الرقم بالروسية");
 const qPlay=document.createElement("button");qPlay.type="button";qPlay.textContent=tr("🔊 Hear number","🔊 اسمع الرقم");
 const qCheck=document.createElement("button");qCheck.type="button";qCheck.textContent=tr("Check answer","تحقق من الإجابة");
 const qFeedback=document.createElement("p");qFeedback.setAttribute("aria-live","polite");
 quiz.append(qTitle,qHelp,qPrompt,qPlay,qInput,qCheck,qFeedback);
 const testNumbers=[0,7,12,19,20,34,58,76,100,1000];
 let round=0,score=0,waiting=false;
 function render(){
  qInput.value="";qInput.disabled=false;waiting=false;qFeedback.textContent="";
  if(round===testNumbers.length){
   waiting=false;
   qPrompt.textContent=tr("Completed: ","انتهى التدريب: ")+score+"/10";
   qInput.disabled=true;qPlay.disabled=true;qCheck.textContent=tr("Try again","أعد المحاولة");
   localStorage.setItem("lexoraNumbersBest",String(Math.max(score,Number(localStorage.getItem("lexoraNumbersBest")||"0"))));
  }else{qPrompt.textContent=tr("Round ","الجولة ")+(round+1)+"/10 — "+testNumbers[round];qPlay.disabled=false;qCheck.textContent=tr("Check answer","تحقق من الإجابة")}
 }
 qPlay.onclick=()=>{const item=numbers.find(x=>x.n===testNumbers[round]);if(item)audio(item.ru,qPlay,qFeedback)};
 qCheck.onclick=()=>{
  if(waiting){render();return}
  if(round===testNumbers.length){round=0;score=0;render();return}
  const value=qInput.value.trim().toLocaleLowerCase("ru").replace(/\s+/g," ");
  if(!value){qFeedback.textContent=tr("Type an answer first.","اكتب الإجابة أولًا.");return}
  const expected=numbers.find(x=>x.n===testNumbers[round]).ru;
  if(value===expected){score++;qFeedback.textContent=tr("✓ Correct!","✓ إجابة صحيحة")}else{qFeedback.textContent=tr("Correct answer: ","الإجابة الصحيحة: ")+expected}
  round++;waiting=true;qInput.disabled=true;qCheck.textContent=tr("Next →","التالي ←");
 };
 draw(current);render();update();
}
function calendarSection(){
 active("calendar");grid.replaceChildren();
 const data=window.LEXORA_CALENDAR;if(!data)return;
 const heading=document.createElement("section");heading.className="calendar-lab";grid.append(heading);
 const h=document.createElement("h3");h.textContent=tr("📅 Days, Months & Dates","📅 الأيام والشهور والتواريخ");
 const info=document.createElement("p");info.textContent=tr("Learn weekday and month names, then practise Russian dates. Dates use ordinal forms and often change the month to genitive.","تعلّم أيام الأسبوع والشهور ثم تدرب على التواريخ. تستخدم التواريخ صيغ الترتيب وغالبًا يأتي الشهر في حالة المضاف إليه.");
 heading.append(h,info);
 for(const [key,en,arabic] of [["days","Days of the week","أيام الأسبوع"],["months","Months of the year","شهور السنة"],["phrases","Useful date phrases","عبارات التواريخ"]]){
  const title=document.createElement("h4");title.textContent=tr(en,arabic);heading.append(title);
  const section=document.createElement("div");section.className="calendar-items";heading.append(section);
  data[key].forEach(item=>section.append(card(item.ru,ar?item.ar:item.en,"calendar:"+item.ru)));
 }
 const quiz=document.createElement("section");quiz.className="calendar-quiz";grid.append(quiz);
 const title=document.createElement("h3");title.textContent=tr("🎯 Calendar Challenge","🎯 تحدي التقويم");
 const status=document.createElement("p");status.setAttribute("aria-live","polite");
 const choices=document.createElement("div");choices.className="calendar-choices";
 const feedback=document.createElement("p");feedback.setAttribute("aria-live","polite");
 quiz.append(title,status,choices,feedback);
 const questions=[
  {en:"Monday",ar:"الاثنين",answer:"понедельник",choices:["понедельник","вторник","среда"]},
  {en:"Friday",ar:"الجمعة",answer:"пятница",choices:["суббота","пятница","четверг"]},
  {en:"Sunday",ar:"الأحد",answer:"воскресенье",choices:["воскресенье","вторник","среда"]},
  {en:"January",ar:"يناير",answer:"январь",choices:["июнь","январь","июль"]},
  {en:"March",ar:"مارس",answer:"март",choices:["май","март","август"]},
  {en:"October",ar:"أكتوبر",answer:"октябрь",choices:["ноябрь","сентябрь","октябрь"]},
  {en:"December",ar:"ديسمبر",answer:"декабрь",choices:["декабрь","февраль","апрель"]},
  {en:"Today is Monday.",ar:"اليوم الاثنين.",answer:"Сегодня понедельник.",choices:["Сегодня понедельник.","Завтра вторник.","Сегодня первое января."]}
 ];
 let round=0,score=0;
 function render(){
  choices.replaceChildren();feedback.textContent="";
  if(round===questions.length){
   status.textContent=tr("Completed: ","انتهى التدريب: ")+score+"/"+questions.length;
   localStorage.setItem("lexoraCalendarBest",String(Math.max(score,Number(localStorage.getItem("lexoraCalendarBest")||"0"))));
   const retry=document.createElement("button");retry.type="button";retry.textContent=tr("Try again","أعد المحاولة");retry.onclick=()=>{round=0;score=0;render()};choices.append(retry);return;
  }
  const q=questions[round];status.textContent=tr("Question ","السؤال ")+(round+1)+"/"+questions.length+" — "+tr(q.en,q.ar);
  q.choices.forEach(option=>{
   const button=document.createElement("button");button.type="button";button.textContent=option;button.lang="ru";button.dir="ltr";
   button.onclick=()=>{
    if(option===q.answer)score++;
    feedback.textContent=option===q.answer?tr("✓ Correct!","✓ إجابة صحيحة"):tr("Correct answer: ","الإجابة الصحيحة: ")+q.answer;
    choices.querySelectorAll("button").forEach(b=>b.disabled=true);
    const next=document.createElement("button");next.type="button";next.textContent=tr("Next →","التالي ←");next.onclick=()=>{round++;render()};choices.append(next);
   };choices.append(button);
  });
 }
 render();update();
}
const calendarTab=document.createElement("button");calendarTab.type="button";calendarTab.dataset.id="calendar";calendarTab.textContent=tr("📅 Calendar & Dates","📅 التقويم والتواريخ");calendarTab.onclick=calendarSection;menu.append(calendarTab);
topics.filter(t=>t.id!=="numbers").forEach(topic=>{const tab=document.createElement("button");tab.type="button";tab.dataset.id=topic.id;tab.textContent=topic.icon+" "+(ar?topic.ar:topic.en);tab.onclick=()=>show(topic);menu.append(tab)});
const numberTab=document.createElement("button");numberTab.type="button";numberTab.dataset.id="numbers-practice";numberTab.textContent=tr("🔢 Numbers Lab","🔢 مختبر الأرقام");numberTab.onclick=numberSection;menu.append(numberTab);
const colors=topics.find(t=>t.id==="numbers");
if(colors){const tab=document.createElement("button");tab.type="button";tab.dataset.id="colors";tab.textContent=tr("🎨 Colors","🎨 الألوان");tab.onclick=()=>show({...colors,id:"colors",words:colors.words.filter(x=>!["один","два","три","десять"].includes(x[0]))});menu.append(tab)}
if(topics.length)show(topics[0]);
});
})();