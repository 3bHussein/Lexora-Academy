(function(){
const btn=document.getElementById("vocabTab");
if(!btn)return;
btn.addEventListener("click",function(){
const ar=localStorage.getItem("lexoraLanguage")==="ar";
const main=document.getElementById("lesson");main.replaceChildren();document.getElementById("nav").replaceChildren();
const h=document.createElement("h2");h.textContent=ar?"🖼️ مفردات روسية حسب الموضوع":"🖼️ Russian Vocabulary by Topic";main.append(h);
const p=document.createElement("p");p.textContent=ar?"64 كلمة ضمن 8 موضوعات مستوحاة من القاموس المصوّر. احفظ الكلمات التي تعلمتها.":"64 words in 8 themes inspired by the illustrated dictionary. Mark the words you have learned.";main.append(p);
const menu=document.createElement("div");menu.className="vocab-topics";main.append(menu);
const grid=document.createElement("div");grid.className="vocab-cards";main.append(grid);
const progress=document.createElement("p");progress.className="meta";progress.setAttribute("aria-live","polite");main.append(progress);
let saved;try{saved=JSON.parse(localStorage.getItem("lexoraVocabKnown")||"[]");if(!Array.isArray(saved))saved=[]}catch{saved=[]}
function update(){progress.textContent=(ar?"الكلمات المتعلمة: ":"Words learned: ")+saved.length+" / 64"}
function show(topic){
grid.replaceChildren();menu.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.id===topic.id));
topic.words.forEach(function(entry){
const ru=entry[0],translation=ar?entry[2]:entry[1],key=topic.id+":"+ru;
const card=document.createElement("article");card.className="vocab-card";
const word=document.createElement("strong");word.textContent=ru;word.lang="ru";word.dir="ltr";
const meaning=document.createElement("p");meaning.textContent=translation;
const learned=document.createElement("button");learned.type="button";
function label(){learned.textContent=saved.includes(key)?(ar?"✓ تم تعلمها":"✓ Learned"):(ar?"علّم كمتعلّمة":"Mark learned")}
label();learned.onclick=function(){const i=saved.indexOf(key);if(i===-1)saved.push(key);else saved.splice(i,1);localStorage.setItem("lexoraVocabKnown",JSON.stringify(saved));label();update()};
card.append(word,meaning,learned);
const recording=window.LEXORA_AUDIO?.[ru]||window.LEXORA_A2_AUDIO?.[ru];
if(recording){const play=document.createElement("button");play.textContent=ar?"▶ استمع":"▶ Listen";play.onclick=function(){new Audio(recording).play().catch(function(){progress.textContent=ar?"التسجيل غير متاح":"Recording unavailable"})};card.append(play)}
grid.append(card);
});update()}
(window.LEXORA_VISUAL_VOCAB||[]).forEach(function(topic){const tab=document.createElement("button");tab.type="button";tab.dataset.id=topic.id;tab.textContent=topic.icon+" "+(ar?topic.ar:topic.en);tab.onclick=function(){show(topic)};menu.append(tab)});
if(window.LEXORA_VISUAL_VOCAB?.length)show(window.LEXORA_VISUAL_VOCAB[0]);
});
})();