/* Natural MP3 pronunciation for Russian phrases. No browser speech synthesis. */
(function(){
const manifests=["alphabet-neural-audio.js","curriculum-neural-audio.js"];
for(const url of manifests){
 const script=document.createElement("script");
 script.src=url;
 script.onload=()=>{window.dispatchEvent(new Event("lexora-audio-ready"))};
 script.onerror=()=>{};
 document.head.append(script);
}
function fileFor(phrase){
 const p=phrase.trim().replace(/^[—–\s]+/,"").trim();
 return window.LEXORA_CURRICULUM_AUDIO?.[p]||window.LEXORA_AUDIO?.[p]||window.LEXORA_A2_AUDIO?.[p]||null;
}
function addAudio(root){
 const elements=root.querySelectorAll?.(".ru,[lang='ru'],.vocab-card strong,.alphabet-card strong,.alphabet-card .alphabet-letter")||[];
 for(const el of elements){
  if(el.dataset.audioBound)continue;
  el.dataset.audioBound="1";
  const phrase=el.textContent.trim();
  if(!/[А-Яа-яЁё]/.test(phrase))continue;
  const letter=el.closest(".alphabet-card");
  if(letter)continue; // Dedicated letter control is handled by the alphabet course.
  const btn=document.createElement("button");
  btn.type="button";btn.className="russian-audio-btn";
  const ar=localStorage.getItem("lexoraLanguage")==="ar";
  btn.textContent=ar?"🔊 استمع":"🔊 Listen";
  btn.setAttribute("aria-label",ar?"تشغيل النطق الروسي":"Play Russian pronunciation");
  btn.onclick=()=>{const src=fileFor(phrase);if(src)new Audio(src).play().catch(()=>{btn.textContent=ar?"الصوت غير متاح":"Audio unavailable"})};
  const refresh=()=>{const src=fileFor(phrase);btn.disabled=!src;btn.title=src?"":ar?"التسجيل قيد التجهيز":"Recording is being prepared"};
  refresh();window.addEventListener("lexora-audio-ready",refresh);
  el.after(btn);
 }
}
addAudio(document);
const observer=new MutationObserver(records=>{
 for(const record of records)for(const node of record.addedNodes)if(node.nodeType===1)addAudio(node.matches?.(".ru,[lang='ru'],.vocab-card strong")?node.parentElement:node);
});
observer.observe(document.body,{childList:true,subtree:true});
})();