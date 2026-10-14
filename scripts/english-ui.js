/* Translate legacy UI strings without changing the original Russian learning text.
   The structured curriculum is translated in curriculum/english-content.js. */
(function(){
if(localStorage.getItem("lexoraLanguage")==="ar")return;
const phrases={
"الروسية • المستويان A1 وA2 • تعلم وتدرب واستمع":"Russian A1 & A2 • Learn, practice and listen",
"دروس المستوى الحالي":"Current level lessons",
"المستوى المتوسط المبتدئ":"Elementary level",
"اختر درسًا من القائمة لبدء التعلّم.":"Select a lesson to begin.",
"بالصوت الطبيعي":"with natural audio",
"✓ إجابة صحيحة":"✓ Correct answer",
"✗ حاول مجددًا":"✗ Try again",
"✓ ممتاز!":"✓ Excellent!",
"نسخ واستعادة التقدم":"Backup and Restore Progress",
"البيانات محفوظة محليًا على هذا الجهاز. يمكنك تصدير ملف JSON واستعادته على جهاز آخر. الاستعادة تستبدل تقدم الأقسام الموجودة في الملف بعد تأكيدك.":"Your data is stored locally on this device. Export a JSON backup and restore it on another device. Restoring replaces existing progress after confirmation.",
"⬇ تصدير نسخة احتياطية":"⬇ Export backup",
"⬆ استعادة الملف المختار":"⬆ Restore selected file",
"اختر ملف JSON أولًا":"Choose a JSON file first",
"الملف كبير جدًا":"File is too large",
"صيغة الملف غير مدعومة":"Unsupported file format",
"بيانات التقدم غير صالحة":"Invalid progress data",
"سيتم استبدال تقدم الأقسام الموجودة في الملف على هذا الجهاز. هل تريد المتابعة؟":"Existing progress for sections in this backup will be replaced. Continue?",
"✓ تمت الاستعادة. حدّث الصفحة لرؤية التقدم في جميع الأقسام.":"✓ Backup restored. Refresh to view updated progress.",
"تعذر الاستعادة: ":"Could not restore: ",
"لوحة التقدم":"Progress Dashboard",
"ملخص التقدم المحفوظ على هذا الجهاز. لا يتم إرسال البيانات إلى خادم.":"Summary of progress saved on this device. No data is sent to a server.",
"📚 دروس A1":"📚 A1 Lessons",
"📖 قراءة A1":"📖 A1 Reading",
"🚀 دروس A2":"🚀 A2 Lessons",
"📖 قراءة A2":"📖 A2 Reading",
"💬 محادثات A2":"💬 A2 Conversations",
"🎧 استماع A2":"🎧 A2 Listening",
" مكتمل":" completed",
"📝 آخر اختبار A2":"📝 Latest A2 Exam",
"النتيجة: ":"Score: ",
"اجتياز اختبار المراجعة":"Review exam passed",
"يحتاج مراجعة":"Needs review",
"لم يُؤدَّ الاختبار بعد":"Exam not taken yet",
"اختبار الاستماع الروسي":"Russian Listening Practice",
"شغّل الصوت، ثم اختر المعنى الصحيح. لا تظهر الجملة الروسية إلا إذا طلبت كشفها.":"Play the audio and select the correct meaning. Reveal the Russian sentence only if needed.",
"▶ تشغيل التسجيل":"▶ Play recording",
"كشف الجملة الروسية":"Reveal Russian sentence",
"✓ فهم صحيح":"✓ Correct understanding",
"✗ حاول الاستماع مرة أخرى":"✗ Listen again",
"التسجيل الطبيعي قيد التجهيز":"Natural recording is being prepared",
"تعذر تشغيل التسجيل":"Could not play recording",
"اختبار مراجعة A2":"A2 Review Exam",
"16 سؤالًا للمراجعة. نتيجة 12/16 أو أكثر تعني اجتياز هذا الاختبار التدريبي، وليست شهادة CEFR.":"16 review questions. A score of 12/16 or higher passes this practice exam; it is not a CEFR certificate.",
"تصحيح الاختبار":"Check exam",
"أجب عن جميع الأسئلة أولًا (":"Answer all questions first (",
"نتيجتك: ":"Your score: ",
"اجتزت اختبار المراجعة!":"You passed the review exam!",
"راجع الدروس ثم حاول مجددًا.":"Review the lessons and try again.",
"راجع ":"Review ",
" إجابة غير صحيحة":" incorrect answers",
"✓ جميع الإجابات صحيحة":"✓ All answers correct",
" — إجابتك: ":" — Your answer: ",
" | الصحيح: ":" | Correct: ",
"محادثات روسية":"Russian Conversations",
"اقرأ الحوار ثم اختبر فهمك. الترجمات العربية قابلة للإظهار.":"Read the dialogue and test your understanding. English translations can be revealed.",
"الترجمة العربية":"English translation",
"✗ حاول مرة أخرى":"✗ Try again",
"مختبر القراءة الروسية":"Russian Reading Lab",
"اقرأ النص ثم أجب عن سؤال الفهم. تقدمك محفوظ على هذا الجهاز.":"Read the passage and answer the comprehension question. Progress is saved on this device.",
"إظهار الترجمة العربية":"Show English translation",
"✓ فهم ممتاز!":"✓ Excellent comprehension!",
"✗ حاول مرة أخرى.":"✗ Try again.",
"اقرأ النصوص القصيرة، ثم اختبر فهمك. الإجابات تحفظ على هذا الجهاز.":"Read short passages and test your comprehension. Answers are saved on this device.",
"✗ راجع النص وحاول تاني.":"✗ Review the text and try again.",
"الروسية":"Russian",
"دروس":"Lessons",
"مكتمل":"completed"
};
const entries=Object.entries(phrases).sort((a,b)=>b[0].length-a[0].length);
function translate(value){
 if(!/[\u0600-\u06ff]/.test(value))return value;
 let result=value;
 for(const [ar,en] of entries)result=result.split(ar).join(en);
 return result;
}
function apply(root){
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 for(const node of nodes){
  if(node.parentElement?.closest("script,style,[lang='ru'],.ru"))continue;
  const translated=translate(node.nodeValue);
  if(translated!==node.nodeValue)node.nodeValue=translated;
 }
 if(root.nodeType===1){
  for(const el of [root,...root.querySelectorAll("*")]){
   if(el.matches("input,textarea"))for(const attr of ["placeholder","aria-label","title"]){const v=el.getAttribute(attr);if(v)el.setAttribute(attr,translate(v))}
  }
 }
}
apply(document.body);
const observer=new MutationObserver(records=>{
 for(const record of records){
  if(record.type==="characterData"){
   const node=record.target;if(node.parentElement?.closest("script,style,[lang='ru'],.ru"))continue;
   const t=translate(node.nodeValue);if(t!==node.nodeValue)node.nodeValue=t;
  }else for(const node of record.addedNodes){
   if(node.nodeType===3){const t=translate(node.nodeValue);if(t!==node.nodeValue)node.nodeValue=t}
   else if(node.nodeType===1)apply(node);
  }
 }
});
observer.observe(document.body,{subtree:true,childList:true,characterData:true});
})();