const STORE_KEY = "ahmed-command-center-v3"; // Updated: 2026-05-14 17:40

let modalResolve = null;

function getLocalTodayId() {
  const localToday = new Date();
  const year = localToday.getFullYear();
  const month = String(localToday.getMonth() + 1).padStart(2, '0');
  const day = String(localToday.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDaysBetween(d1, d2) {
  const t1 = new Date(d1).getTime();
  const t2 = new Date(d2).getTime();
  return Math.floor((t2 - t1) / (1000 * 60 * 60 * 24));
}

function checkRecurringTasks() {
  const todayId = getLocalTodayId();
  const allTasks = allTaskGroups().flatMap(g => g.tasks);
  
  allTasks.forEach(task => {
    if (task.recurrence && task.done && task.lastDoneDate && task.lastDoneDate !== todayId) {
      const daysPassed = getDaysBetween(task.lastDoneDate, todayId);
      if (daysPassed >= task.recurrence) {
        task.done = false;
        // Keep the old lastDoneDate if it's not yet time to reset again? 
        // No, if we reset, we wait for the NEXT completion.
      }
    }
  });
}

function showCustomModal(options) {
  const overlay = document.getElementById("modal-overlay");
  const content = document.getElementById("modal-content");
  const isAr = lang() === "ar";

  return new Promise(resolve => {
    modalResolve = resolve;
    
    content.innerHTML = `
      <h2 class="modal-title">${esc(options.title)}</h2>
      <p class="modal-body">${esc(options.message)}</p>
      ${options.type === 'prompt' ? `<input type="text" class="modal-input" id="modalInput" value="${esc(options.defaultValue || '')}" placeholder="...">` : ''}
      <div class="modal-footer">
        ${options.type !== 'alert' ? `<button class="secondary-btn" id="modalCancelBtn">${isAr ? "إلغاء" : "Cancel"}</button>` : ''}
        <button class="primary-btn" id="modalConfirmBtn">${isAr ? "تأكيد" : "Confirm"}</button>
      </div>
    `;

    overlay.classList.add("show");
    
    const confirmBtn = document.getElementById("modalConfirmBtn");
    const cancelBtn = document.getElementById("modalCancelBtn");

    confirmBtn.onclick = () => {
      let val = true;
      if (options.type === 'prompt') val = document.getElementById("modalInput").value;
      closeModal(val);
    };

    if (cancelBtn) {
      cancelBtn.onclick = () => closeModal(null);
    }

    if (options.type === 'prompt') {
      const input = document.getElementById("modalInput");
      input.focus();
      input.select();
      input.onkeydown = (e) => {
        if (e.key === "Enter") confirmBtn.click();
        if (e.key === "Escape") closeModal(null);
      };
    }
  });
}

function closeModal(value) {
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.remove("show");
  if (modalResolve) modalResolve(value);
  modalResolve = null;
}

async function ask(message, defaultValue = "") {
  return showCustomModal({ title: lang() === "ar" ? "مدخلات مطلوبة" : "Input Required", message, type: 'prompt', defaultValue });
}

async function confirmAction(message) {
  return showCustomModal({ title: lang() === "ar" ? "تأكيد" : "Confirmation", message, type: 'confirm' });
}

function activePlan() {
  if (!state.plans) return { id: 'empty', name: {ar: 'خالية', en: 'Empty'}, days: [] };
  return state.plans.find(p => p.id === (state.activePlanId || 'finals')) || state.plans[0];
}



const gradePoints = {
  "A": 4,
  "A-": 3.67,
  "B+": 3.33,
  "B": 3,
  "B-": 2.67,
  "C+": 2.33,
  "C": 2,
  "D": 1,
  "F": 0
};

const ui = {
  ar: {
    dir: "rtl",
    locale: "ar-EG",
    eyebrow: "من 14 مايو 2026 إلى نهاية الفاينلز",
    nav: {
      dashboard: "الرئيسية",
      plan: "الخطة",
      subjects: "المواد",
      code: "اللغات",
      cyber: "Cyber",
      tools: "الأدوات",
      cgpa: "CGPA",
      focus: "To-do وتركيز",
      projects: "المشاريع",
      cv: "CV"
    },
    titles: {
      dashboard: "لوحة التحكم",
      plan: "خطة الفاينلز",
      subjects: "مركز المواد",
      code: "مركز اللغات",
      cyber: "مسار Cyber Security",
      tools: "الأدوات الشخصية",
      cgpa: "حاسبة CGPA",
      focus: "To-do وتركيز",
      projects: "المشاريع",
      cv: "CV والإنجازات",
      history: "سجل الإنجازات"
    },
    buttons: {
      focus: "ابدأ بلوك",
      export: "تصدير البيانات",
      reset: "استرجاع الأساسي",
      dark: "🌙",
      light: "☀️",
      lang: "EN / AR",
      add: "إضافة",
      delete: "حذف",
      import: "استيراد",
      template: "قالب مادة",
      markDone: "حفظ كإنجاز",
      solved: "تم",
      next: "مسألة أخرى",
      start: "Start",
      pause: "Pause",
      resetTimer: "Reset",
      saveSession: "حفظ جلسة",
      open: "فتح"
    },
    labels: {
      nextExam: "الامتحان القادم",
      daysLeft: "يوم متبقي",
      predictedCgpa: "CGPA متوقع",
      completion: "إنجاز عام",
      cvItems: "عناصر في CV",
      currentGrade: "الدرجات الحالية",
      target: "الهدف",
      hours: "الساعات",
      grade: "التقدير",
      exam: "الامتحان",
      lectures: "المحاضرات",
      sheets: "الشيتات واللابات",
      tasks: "المهام",
      overview: "نظرة عامة",
      grades: "الدرجات",
      resources: "المصادر",
      languages: "اللغات",
      addLanguage: "أضف لغة",
      importLanguage: "استيراد لغة بنفس الستايل",
      modules: "الموديولات",
      guide: "الدليل الكامل",
      fullGuide: "فتح الدليل الكامل",
      fileMap: "خريطة الملفات",
      coreConcept: "الفكرة الأساسية",
      dailyChallenge: "تحدي اليوم",
      tools: "الأدوات",
      earned: "جايب",
      total: "من",
      component: "البند",
      percent: "النسبة",
      strategy: "الاستراتيجية",
      outcomes: "النتائج المطلوبة",
      practice: "تدريب",
      files: "الملفات",
      addSubject: "أضف مادة",
      importSubject: "استيراد مادة بنفس الستايل",
      todayBlock: "بلوك النهارده",
      gameRule: "قانون اللعب والمشاهدة",
      allSubjects: "كل المواد",
      selectedSubject: "تفاصيل المادة"
    },
    copy: {
      dashboardLead: "الموقع بقى مركز مذاكرة كامل: درجات، مواد، خطة، CV، تحديات، ومشاريع.",
      subjectLead: "اختار أي مادة من الأعلى أو من الكروت، وهتلاقي نفس الستايل: overview، lectures، sheets/labs، grades، tasks.",
      importHelp: "الصق JSON لمادة جديدة أو ارفع ملف JSON، وهيتضاف بنفس شكل باقي المواد.",
      languageLead: "مركز لغات كامل بنفس روح DS Guide: خريطة تعلم، موديولات، تحديات، مصادر، ومهام قابلة للإضافة.",
      languageImportHelp: "الصق JSON للغة جديدة أو ارفع ملف JSON، وهيتضاف بنفس الستايل.",
      toolsLead: "كل الأدوات غير الدراسية مجمعة هنا عشان الشريط الرئيسي يفضل نظيف للمذاكرة.",
      resetConfirm: "استرجاع البيانات الأساسية هيبدل البيانات الحالية. متأكد؟",
      saved: "اتحفظ",
      cvSaved: "دخلت CV",
      imported: "تم استيراد المادة",
      invalidJson: "JSON غير صالح",
      sessionDone: "اتحفظت جلسة التركيز",
      addToCv: "هل تريد إضافة هذه المهمة إلى الـ CV الخاص بك كإنجاز؟"
    }
  },
  en: {
    dir: "ltr",
    locale: "en-US",
    eyebrow: "May 14, 2026 through finals",
    nav: {
      dashboard: "Home",
      plan: "Plan",
      subjects: "Subjects",
      code: "Languages",
      cyber: "Cyber",
      tools: "Tools",
      cgpa: "CGPA",
      focus: "To-do",
      projects: "Projects",
      cv: "CV"
    },
    titles: {
      dashboard: "Command Center",
      plan: "Finals Plan",
      subjects: "Subject Center",
      code: "Language Hub",
      cyber: "Cyber Security Track",
      tools: "Personal Tools",
      cgpa: "CGPA Calculator",
      focus: "To-do and Focus",
      projects: "Projects",
      cv: "CV & Achievements",
      history: "Activity History"
    },
    buttons: {
      focus: "Start block",
      export: "Export data",
      reset: "Reset defaults",
      dark: "🌙",
      light: "☀️",
      lang: "EN / AR",
      add: "Add",
      delete: "Delete",
      import: "Import",
      template: "Subject template",
      markDone: "Save achievement",
      solved: "Done",
      next: "Another one",
      start: "Start",
      pause: "Pause",
      resetTimer: "Reset",
      saveSession: "Save session",
      open: "Open"
    },
    labels: {
      nextExam: "Next exam",
      daysLeft: "days left",
      predictedCgpa: "Predicted CGPA",
      completion: "Overall completion",
      cvItems: "CV items",
      currentGrade: "Current grades",
      target: "Target",
      hours: "Hours",
      grade: "Grade",
      exam: "Exam",
      lectures: "Lectures",
      sheets: "Sheets and labs",
      tasks: "Tasks",
      overview: "Overview",
      grades: "Grades",
      resources: "Resources",
      languages: "Languages",
      addLanguage: "Add language",
      importLanguage: "Import a language with the same style",
      modules: "Modules",
      guide: "Full Guide",
      fullGuide: "Open Full Guide",
      fileMap: "File map",
      coreConcept: "Core concept",
      dailyChallenge: "Daily challenge",
      tools: "Tools",
      earned: "Earned",
      total: "Total",
      component: "Component",
      percent: "Percent",
      strategy: "Strategy",
      outcomes: "Outcomes",
      practice: "Practice",
      files: "Files",
      addSubject: "Add subject",
      importSubject: "Import a subject with the same style",
      todayBlock: "Today's block",
      gameRule: "Gaming and shorts rule",
      allSubjects: "All subjects",
      selectedSubject: "Subject details"
    },
    copy: {
      dashboardLead: "This is now a full study command center: grades, subjects, plan, CV, challenges, and projects.",
      subjectLead: "Pick any subject from the cards. Every subject now has overview, lectures, sheets/labs, grades, and tasks.",
      importHelp: "Paste a subject JSON object or upload a JSON file to add it in the same style.",
      languageLead: "A full language hub inspired by DS Guide: roadmap, modules, challenges, resources, and editable tasks.",
      languageImportHelp: "Paste a language JSON object or upload a JSON file to add it in the same style.",
      toolsLead: "Non-study utilities are grouped here so the main nav stays clean for studying.",
      resetConfirm: "Resetting will replace your current saved data. Are you sure?",
      saved: "Saved",
      cvSaved: "Saved to CV",
      imported: "Subject imported",
      invalidJson: "Invalid JSON",
      sessionDone: "Focus session saved",
      addToCv: "Do you want to add this task to your professional CV?"
    }
  }
};

const routes = ["dashboard", "plan", "subjects", "code", "cyber", "tools", "cgpa", "focus", "projects", "cv", "history", "globalTasks"];
const mainRoutes = ["dashboard", "plan", "subjects", "code", "cyber", "tools"];
const toolRoutes = ["cgpa", "focus", "projects", "cv", "history", "globalTasks"];

const resources = [
  { area: "Cyber", name: "TryHackMe Cyber Security 101", url: "https://tryhackme.com/path/outline/introtocyber", note: { ar: "مسار بداية واضح للـ Cyber", en: "A clear beginner cyber path" } },
  { area: "Cyber", name: "TryHackMe Jr Penetration Tester", url: "https://tryhackme.com/r/path/outline/jrpenetrationtester", note: { ar: "بعد الأساسيات للممارسة العملية", en: "Hands-on path after fundamentals" } },
  { area: "Cyber", name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", note: { ar: "أفضل لابات Web Security", en: "Excellent web security labs" } },
  { area: "C++", name: "LearnCpp", url: "https://www.learncpp.com/", note: { ar: "مرجع مرتب للـ C++", en: "Structured C++ reference" } },
  { area: "C++", name: "The Cherno", url: "https://www.youtube.com/@TheCherno", note: { ar: "شرح قوي للـ C++", en: "Strong C++ explanations" } },
  { area: "JavaScript", name: "Elzero JavaScript", url: "https://elzero.org/category/courses/javascript/", note: { ar: "المسار العربي الأساسي", en: "Main Arabic JS path" } },
  { area: "JavaScript", name: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", note: { ar: "مرجع رسمي", en: "Official reference" } }
];

const challengeBank = {
  cpp: [
    { id: "cpp-1", title: "Frequency Counter", prompt: { ar: "اقرأ n أرقام واطبع أكثر رقم متكرر وعدد مرات ظهوره.", en: "Read n numbers and print the most frequent value and its count." }, code: "Input: 8\n4 2 4 7 2 4 9 2\nOutput: 2 3" },
    { id: "cpp-2", title: "Prime Window", prompt: { ar: "اطبع كل الأعداد الأولية بين L و R باستخدام دالة isPrime.", en: "Print all primes between L and R using an isPrime function." }, code: "Input: 10 25\nOutput: 11 13 17 19 23" },
    { id: "cpp-3", title: "STL Sort", prompt: { ar: "رتب طلاب حسب الدرجة تنازليًا، ولو تعادلوا حسب الاسم.", en: "Sort students by grade descending, then name ascending." }, code: "vector<pair<string,int>> students;" }
  ],
  java: [
    { id: "java-1", title: "Linked List Add At", prompt: { ar: "اكتب method تضيف node في index معين في Singly Linked List.", en: "Write an addAt method for a singly linked list." }, code: "void addAt(int index, int data) { ... }" },
    { id: "java-2", title: "BST Height", prompt: { ar: "اكتب recursive method لحساب height في BST.", en: "Write a recursive method to compute BST height." }, code: "int height(Node root)" },
    { id: "java-3", title: "JDBC Read", prompt: { ar: "اكتب JDBC code يقرأ users ويطبع name وemail.", en: "Write JDBC code that reads users and prints name/email." }, code: "Connection con = DriverManager.getConnection(...);" }
  ],
  html: [
    { id: "html-1", title: "Semantic Profile", prompt: { ar: "ابن صفحة profile باستخدام عناصر semantic.", en: "Build a profile page using semantic elements." }, code: "<main>\n  <section>...</section>\n</main>" },
    { id: "html-2", title: "Study Table", prompt: { ar: "اعمل جدول امتحانات بـ caption وthead وtbody.", en: "Build an exam table with caption, thead, and tbody." }, code: "<table>\n  <caption>Finals</caption>\n</table>" }
  ],
  css: [
    { id: "css-1", title: "Responsive Cards", prompt: { ar: "Grid من 3 أعمدة ديسكتوب وعمود موبايل.", en: "Create a 3-column desktop grid and 1-column mobile grid." }, code: ".grid { display:grid; grid-template-columns:repeat(3,1fr); }" },
    { id: "css-2", title: "Theme Tokens", prompt: { ar: "اعمل CSS variables للـ light/dark.", en: "Create CSS variables for light/dark themes." }, code: ":root { --bg:#fff; }\n[data-theme='dark'] { --bg:#111; }" }
  ],
  js: [
    { id: "js-1", title: "Local Storage Todo", prompt: { ar: "Todo تحفظ المهام في localStorage.", en: "Build a todo list saved in localStorage." }, code: "localStorage.setItem('tasks', JSON.stringify(tasks));" },
    { id: "js-2", title: "Daily Picker", prompt: { ar: "اختار تحدي يومي من array بناء على التاريخ.", en: "Pick a daily challenge from an array based on the date." }, code: "const index = Math.floor(Date.now()/86400000) % list.length;" }
  ]
};

function txt(ar, en) {
  return { ar, en };
}

function uid(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function tasks(items, prefix) {
  return items.map((item, index) => ({
    id: `${prefix}-${index + 1}`,
    text: Array.isArray(item) ? txt(item[0], item[1]) : item,
    done: false
  }));
}

function module(id, type, titleAr, titleEn, file, pages, topicsAr, topicsEn, practiceAr = [], practiceEn = []) {
  return {
    id,
    type,
    title: txt(titleAr, titleEn),
    file,
    pages,
    topics: topicsAr.map((topic, i) => txt(topic, topicsEn[i] || topic)),
    practice: practiceAr.map((item, i) => txt(item, practiceEn[i] || item))
  };
}

function grade(id, labelAr, labelEn, earned, total, noteAr = "", noteEn = "") {
  return { id, label: txt(labelAr, labelEn), earned, total, note: txt(noteAr, noteEn) };
}

function createSubjects() {
  return [
    {
      id: "advanced",
      tone: "indigo",
      code: "040103206",
      hours: 3,
      targetGrade: "A",
      name: txt("برمجة متقدمة", "Advanced Programming"),
      exam: { date: "2026-05-31", time: txt("11:30 إلى 1:30", "11:30 AM - 1:30 PM") },
      summary: txt("Java متقدم: Arrays، OOP، inheritance، abstract/interface، JavaFX، وDatabase/JDBC.", "Advanced Java: arrays, OOP, inheritance, abstract/interface, JavaFX, and Database/JDBC."),
      strategy: txt("لأن المادة بصمجة ودرجتك الحالية قوية، خلّيها تخلص قبل العيد: شيتات 1-4 + JDBC + mock exam.", "Because your coursework is strong and the exam is pattern-based, finish it before Eid: sheets 1-4, JDBC, and a mock exam."),
      gradeItems: [
        grade("adv-current", "أعمال السنة الحالية", "Current coursework", 50, 50, "حسب كلامك: 50/50", "As provided: 50/50")
      ],
      modules: [
        module("adv-l1", "lecture", "Lecture 1 - Arrays", "Lecture 1 - Arrays", "Advanced - Lec 1.pdf", 1, ["تعريف arrays", "length وindexing", "ArrayIndexOutOfBounds", "Tracing loops"], ["Array declaration", "length and indexing", "ArrayIndexOutOfBounds", "Loop tracing"], ["Advanced Sheet 1 answers"], ["Advanced Sheet 1 answers"]),
        module("adv-l2", "lecture", "Lecture 2 - Classes and Objects", "Lecture 2 - Classes and Objects", "Advanced - Lec 2.pdf", 1, ["classes", "constructors", "accessors/mutators", "method tracing"], ["classes", "constructors", "accessors/mutators", "method tracing"], ["Advanced Sheet 2 answers - Stock class"], ["Advanced Sheet 2 answers - Stock class"]),
        module("adv-l3", "lecture", "Lecture 3 - Inheritance and Polymorphism", "Lecture 3 - Inheritance and Polymorphism", "Advanced - Lec 3.pdf", 5, ["constructors in inheritance", "equals", "instanceof", "overriding"], ["constructors in inheritance", "equals", "instanceof", "overriding"], ["Advanced Sheet 3 answers"], ["Advanced Sheet 3 answers"]),
        module("adv-l4", "lecture", "Lecture 4 - Abstract Classes and Interfaces", "Lecture 4 - Abstract Classes and Interfaces", "Advanced - Lec 4.pdf", 5, ["abstract class rules", "interface implementation", "casting", "error finding"], ["abstract class rules", "interface implementation", "casting", "error finding"], ["Advanced Sheet 4 answers"], ["Advanced Sheet 4 answers"]),
        module("adv-l5", "lecture", "Lecture 5 - JavaFX GUI", "Lecture 5 - JavaFX GUI", "Advanced - Lec 5.pdf", 27, ["JavaFX vs AWT/Swing", "Application class", "Stage, Scene, Nodes", "Button and controls"], ["JavaFX vs AWT/Swing", "Application class", "Stage, Scene, Nodes", "Button and controls"], ["اكتب MyJavaFX example من الذاكرة"], ["Write MyJavaFX example from memory"]),
        module("adv-l6", "lecture", "Lecture 6 - Databases and JDBC", "Lecture 6 - Databases and JDBC", "Advanced - Lec 6 ( PDF ).pdf", 62, ["Database/DBMS", "tables, fields, records", "metadata", "JDBC connection"], ["Database/DBMS", "tables, fields, records", "metadata", "JDBC connection"], ["Connection + Statement + ResultSet"], ["Connection + Statement + ResultSet"])
      ],
      tasks: tasks([
        ["اقفل Database/JDBC من Lec 6", "Finish Database/JDBC from Lec 6"],
        ["حل شيتات 1-4 مرة تانية بنظام trace", "Redo sheets 1-4 with trace mindset"],
        ["اكتب JavaFX skeleton من غير ما تبص", "Write JavaFX skeleton without looking"],
        ["Mock exam شامل قبل العيد", "Full mock exam before Eid"]
      ], "adv-task")
    },
    {
      id: "logic",
      tone: "amber",
      code: "040103250",
      hours: 3,
      targetGrade: "B+",
      name: txt("دوائر منطقية رقمية", "Digital Logic Circuits"),
      exam: { date: "2026-06-03", time: txt("9 إلى 11", "9:00 AM - 11:00 AM") },
      summary: txt("Boolean algebra، K-map، combinational circuits، flip-flops، sequential circuits، decoders/encoders، multiplexers.", "Boolean algebra, K-map, combinational circuits, flip-flops, sequential circuits, decoders/encoders, and multiplexers."),
      strategy: txt("المادة محتاجة ورقة قوانين ورسومات. ركز على K-map، تصميم circuits، وفرق combinational/sequential.", "Make a formula/diagram sheet. Focus on K-map, circuit design, and combinational vs sequential differences."),
      gradeItems: [
        grade("logic-current", "درجات حالية", "Current score", 0, 0, "عدّلها لما تعرف درجتك", "Edit when you know your score")
      ],
      modules: [
        module("logic-l1", "lecture", "Lecture 1 - Boolean Algebra and Digital Logic", "Lecture 1 - Boolean Algebra and Digital Logic", "Circuits - Lec 1 ( PDF ).pdf", 30, ["Boolean logic", "simple logic circuits", "digital circuit foundations"], ["Boolean logic", "simple logic circuits", "digital circuit foundations"]),
        module("logic-l2", "lecture", "Lecture 2 - K-map Minimization", "Lecture 2 - K-map Minimization", "Circuits - Lec 2 ( PDF ).pdf", 34, ["K-map", "minimization", "Boolean expression simplification"], ["K-map", "minimization", "Boolean expression simplification"]),
        module("logic-l3", "lecture", "Lecture 3 - Combinational Circuits", "Lecture 3 - Combinational Circuits", "Circuits - Lec 3 ( PDF ).pdf", 20, ["logic gates", "inputs/outputs", "no memory"], ["logic gates", "inputs/outputs", "no memory"]),
        module("logic-l4", "lecture", "Lecture 4 - Flip Flops", "Lecture 4 - Flip Flops", "Circuits - Lec 4 ( PDF ).pdf", 27, ["one-bit storage", "clock pulse", "normal/complement outputs"], ["one-bit storage", "clock pulse", "normal/complement outputs"]),
        module("logic-l5", "lecture", "Lecture 5 - Sequential Circuits", "Lecture 5 - Sequential Circuits", "Circuits - Lec 5 ( PDF ).pdf", 23, ["flip-flops and gates", "state", "memory component"], ["flip-flops and gates", "state", "memory component"]),
        module("logic-l6", "lecture", "Lecture 6 - ICs, Decoders, Encoders", "Lecture 6 - ICs, Decoders, Encoders", "Circuits - Lec 6 ( PDF ).pdf", 24, ["integrated circuits", "decoders", "encoders"], ["integrated circuits", "decoders", "encoders"]),
        module("logic-l7", "lecture", "Lecture 7 - Multiplexers", "Lecture 7 - Multiplexers", "Circuits - Lec 7 ( PDF ).pdf", 40, ["MUX concept", "selection lines", "combinational design"], ["MUX concept", "selection lines", "combinational design"])
      ],
      tasks: tasks([
        ["اعمل ورقة K-map وقوانين", "Create a K-map and rules sheet"],
        ["راجع المحاضرات الجديدة الثلاثة", "Review the three new lectures"],
        ["حل أمثلة combinational/sequential", "Solve combinational/sequential examples"],
        ["اكتب فروق decoders/encoders/MUX", "Write decoder/encoder/MUX differences"]
      ], "logic-task")
    },
    {
      id: "toc",
      tone: "accent",
      code: "040103204",
      hours: 3,
      targetGrade: "A",
      guideFile: "toc",
      name: txt("نظرية الحسابات", "Theory of Computation"),
      exam: { date: "2026-06-09", time: txt("9 إلى 11", "9:00 AM - 11:00 AM") },
      summary: txt("Sets، regular expressions، DFA/NFA، CFG، PDA، Turing machines، ومشروع TOC.", "Sets, regular expressions, DFA/NFA, CFG, PDA, Turing machines, and the TOC project."),
      strategy: txt("درجتك 39/40، فالمطلوب مراجعة منهجية وحل sheets بدون استنزاف وقت.", "You have 39/40, so use systematic review and sheets without over-investing time."),
      gradeItems: [
        grade("toc-current", "أعمال السنة الحالية", "Current coursework", 39, 40)
      ],
      modules: [
        module("toc-l0", "lecture", "Lec 0 - Course Contents and Foundations", "Lec 0 - Course Contents and Foundations", "TOC - Lec 0 ( PDF ).pdf", 50, ["sets", "functions", "relations", "graphs", "models of computation"], ["sets", "functions", "relations", "graphs", "models of computation"], ["Sheet 0 - Sets"], ["Sheet 0 - Sets"]),
        module("toc-l1", "lecture", "Lec 1 - Languages and Regular Expressions", "Lec 1 - Languages and Regular Expressions", "TOC - Lec 1 ( PDF ).pdf", 17, ["alphabet", "string", "language", "regular expressions"], ["alphabet", "string", "language", "regular expressions"], ["Sheet 1 - Regular expressions"], ["Sheet 1 - Regular expressions"]),
        module("toc-l2", "lecture", "Lec 2 - DFA", "Lec 2 - DFA", "TOC - Lec 2 ( PDF ).pdf", 17, ["finite automata", "DFA transitions", "language recognition"], ["finite automata", "DFA transitions", "language recognition"]),
        module("toc-l3", "lecture", "Lec 3 - NFA", "Lec 3 - NFA", "TOC - Lec 3 ( PDF ).pdf", 22, ["nondeterminism", "NFA operation", "NFA to DFA"], ["nondeterminism", "NFA operation", "NFA to DFA"], ["Sheet 3 - NFA and conversion"], ["Sheet 3 - NFA and conversion"]),
        module("toc-l4", "lecture", "Lec 4 - CFG", "Lec 4 - CFG", "TOC - Lec 4 ( PDF ).pdf", 24, ["context-free grammar", "parse trees", "derivations"], ["context-free grammar", "parse trees", "derivations"], ["Sheet 4 - CFG"], ["Sheet 4 - CFG"]),
        module("toc-l5", "lecture", "Lec 5 - PDA", "Lec 5 - PDA", "TOC - Lec 5 ( PDF ).pdf", 13, ["pushdown automata", "stack memory", "CFL beyond FA"], ["pushdown automata", "stack memory", "CFL beyond FA"], ["Sheet 5 - PDA"], ["Sheet 5 - PDA"]),
        module("toc-l6", "lecture", "Lec 6 - Turing Machines", "Lec 6 - Turing Machines", "TOC - Lec 6 ( PDF ).pdf", 14, ["TM motivation", "tape/head/states", "general computation"], ["TM motivation", "tape/head/states", "general computation"], ["Sheet 6 - TM"], ["Sheet 6 - TM"]),
        module("toc-proj", "sheet", "TOC Final Project Requirements", "TOC Final Project Requirements", "Theory of Computation Project Requirements.pdf", 1, ["PDA", "NFA to DFA", "CFG to CNF", "implementation"], ["PDA", "NFA to DFA", "CFG to CNF", "implementation"])
      ],
      tasks: tasks([
        ["حل Sheets 0-6 بسرعة", "Solve sheets 0-6 quickly"],
        ["راجع DFA/NFA/PDA/TM برسمة لكل نوع", "Review DFA/NFA/PDA/TM with one diagram each"],
        ["ورقة خطوات تحويل RE/NFA/DFA", "Create a conversion steps sheet"],
        ["مراجعة نهائية يومين فقط", "Keep final review to two days"]
      ], "toc-task")
    },
    {
      id: "multimedia",
      tone: "coral",
      code: "040103308",
      hours: 3,
      targetGrade: "B+",
      name: txt("وسائط متعددة", "Multimedia"),
      exam: { date: "2026-06-11", time: txt("11:30 إلى 1:30", "11:30 AM - 1:30 PM") },
      summary: txt("مادة نظرية: introduction، digitization، audio، images، text/fonts، video/animation، compression.", "Theory-heavy: introduction, digitization, audio, images, text/fonts, video/animation, and compression."),
      strategy: txt("حول كل محاضرة إلى مصطلحات وتعريفات ونقاط مقارنة. لا تحفظ فقرات طويلة.", "Turn every lecture into terms, definitions, and comparison points. Avoid memorizing long paragraphs."),
      gradeItems: [
        grade("mm-current", "أعمال السنة الحالية", "Current coursework", 35, 40),
        grade("mm-task", "Task غير مؤكد", "Pending task", 0, 0, "اكتب 10 في total لما تعرف الدرجة", "Put 10 in total when known")
      ],
      modules: [
        module("mm-l1", "lecture", "Lec 1 - Introduction to Multimedia", "Lec 1 - Introduction to Multimedia", "Multimedia - Lec 1 ( PDF ).pdf", 35, ["multimedia overview", "fundamental concepts", "sound/images/video"], ["multimedia overview", "fundamental concepts", "sound/images/video"]),
        module("mm-l2", "lecture", "Lec 2 - Digitization Process", "Lec 2 - Digitization Process", "Multimedia - Lec 2 ( PDF ).pdf", 43, ["analog signals", "digital technology", "sampling/quantization"], ["analog signals", "digital technology", "sampling/quantization"]),
        module("mm-l3", "lecture", "Lec 3 - Sound and Audio", "Lec 3 - Sound and Audio", "Multimedia - Lec 3 ( PDF ).pdf", 60, ["digitized sound", "MIDI", "audio processing"], ["digitized sound", "MIDI", "audio processing"]),
        module("mm-l4", "lecture", "Lec 4 - Images and Graphics", "Lec 4 - Images and Graphics", "Multimedia - Lec 4 ( PDF ).pdf", 53, ["color", "graphics", "image processing"], ["color", "graphics", "image processing"]),
        module("mm-l5", "lecture", "Lec 5 - Text and Fonts", "Lec 5 - Text and Fonts", "Multimedia - Lec 5 ( PDF ).pdf", 38, ["text handling", "font measurement", "typography basics"], ["text handling", "font measurement", "typography basics"]),
        module("mm-l6", "lecture", "Lec 6 - Video and Animation", "Lec 6 - Video and Animation", "Multimedia - Lec 6 ( PDF ).pdf", 39, ["motion", "video", "animation", "human eye perception"], ["motion", "video", "animation", "human eye perception"]),
        module("mm-l7", "lecture", "Lec 7 - Data Compression and Information Theory", "Lec 7 - Data Compression and Information Theory", "Multimedia - Lec 7 ( PDF ).pdf", 28, ["why compression", "JPEG/MP3/MPEG", "storage and transmission"], ["why compression", "JPEG/MP3/MPEG", "storage and transmission"]),
        module("mm-l8", "lecture", "Lec 8 - Compression Types", "Lec 8 - Compression Types", "Multimedia - Lec 8 ( PDF ).pdf", 54, ["symmetric compression", "asymmetric compression", "retrieval/dialog mode"], ["symmetric compression", "asymmetric compression", "retrieval/dialog mode"])
      ],
      tasks: tasks([
        ["ملخص نقطي لكل Lecture", "Bullet summary for every lecture"],
        ["جدول مقارنة Audio/Image/Video/Compression", "Comparison table for audio/image/video/compression"],
        ["ورقة تعريفات ومصطلحات", "Definitions and terms sheet"],
        ["مراجعة ليلة 9-10 يونيو فقط", "Final review on June 9-10 only"]
      ], "mm-task")
    },
    {
      id: "ds",
      tone: "accent",
      code: "040103202",
      hours: 3,
      targetGrade: "A",
      guideFile: "ds",
      name: txt("تراكيب بيانات ومعالجة ملفات", "Data Structures and File Processing"),
      exam: { date: "2026-06-13", time: txt("9 إلى 11", "9:00 AM - 11:00 AM") },
      summary: txt("Java data structures: linked lists، stack، queue، BST، وتدريب مقالي كتابة كود.", "Java data structures: linked lists, stack, queue, BST, and written-code exam practice."),
      strategy: txt("نفس ستايل دليل DS: مفهوم سريع، operations، كود Java، ثم lab methods على ورق.", "Same DS-guide style: concept, operations, Java code, then lab methods on paper."),
      gradeItems: [
        grade("ds-current", "أعمال السنة الحالية", "Current coursework", 50, 50)
      ],
      modules: [
        module("ds-l1", "lecture", "Lec 1 - Singly Linked List", "Lec 1 - Singly Linked List", "Data Structure - Lec 1 ( PDF ).pdf", 9, ["nodes", "data/next", "head", "single traversal"], ["nodes", "data/next", "head", "single traversal"], ["Lab 1: add, delete, search, max, concat, sort display, similar, swap, reverse"], ["Lab 1: add, delete, search, max, concat, sorted display, similar, swap, reverse"]),
        module("ds-l2", "lecture", "Lec 2 - Circular and Doubly Linked List", "Lec 2 - Circular and Doubly Linked List", "Data Structure - Lec 2 ( PDF ).pdf", 11, ["circular list", "doubly list", "prev/next", "head/tail"], ["circular list", "doubly list", "prev/next", "head/tail"], ["Lab 2: add/delete/sort/concat/similar/swap/split"], ["Lab 2: add/delete/sort/concat/similar/swap/split"]),
        module("ds-l3", "lecture", "Lec 3 - Stack Implementations", "Lec 3 - Stack Implementations", "Data Structure - Lec 3 ( PDF ).pdf", 11, ["LIFO", "array stack", "linked stack", "push/pop/peek"], ["LIFO", "array stack", "linked stack", "push/pop/peek"]),
        module("ds-l4", "lecture", "Lec 4 - Stack Applications", "Lec 4 - Stack Applications", "Data Structure - Lec 4 ( PDF ).pdf", 13, ["reverse", "bracket checker", "infix/postfix", "postfix evaluation"], ["reverse", "bracket checker", "infix/postfix", "postfix evaluation"], ["Lab 3: stack average, min, reverse, similarity, infix/postfix"], ["Lab 3: stack average, min, reverse, similarity, infix/postfix"]),
        module("ds-l5", "lecture", "Lec 5/6 - Queue", "Lec 5/6 - Queue", "Data Structure - Lec 5 ( PDF ).pdf", 10, ["FIFO", "array queue", "linked queue", "front/rear"], ["FIFO", "array queue", "linked queue", "front/rear"], ["Lab 4: average, full, equality, reverse K, count, recursive search, palindrome, split even/odd"], ["Lab 4: average, full, equality, reverse K, count, recursive search, palindrome, split even/odd"]),
        module("ds-l6", "lecture", "Lec 8 - Binary Search Tree", "Lec 8 - Binary Search Tree", "Data Structure - Lec 6 ( PDF ).pdf", 15, ["BST node", "left/right", "insert/search", "traversal"], ["BST node", "left/right", "insert/search", "traversal"], ["Lab 5: height, even count, leaf sum, depth, mirror, balanced, valid BST, identical"], ["Lab 5: height, even count, leaf sum, depth, mirror, balanced, valid BST, identical"]),
        module("ds-guide", "sheet", "Full interactive DS Guide", "Full interactive DS Guide", "ds-guide.html", 1, ["Arrays", "Linked Lists", "Stack", "Queue"], ["Arrays", "Linked Lists", "Stack", "Queue"])
      ],
      tasks: tasks([
        ["اكتب Lab 1 وLab 2 على ورق", "Write Lab 1 and Lab 2 on paper"],
        ["احفظ templates للـ Stack/Queue/BST", "Memorize Stack/Queue/BST templates"],
        ["حل infix/postfix وpostfix evaluation", "Practice infix/postfix and postfix evaluation"],
        ["Mock exam مقالي قبل 13 يونيو", "Written mock exam before June 13"]
      ], "ds-task")
    },
    {
      id: "system",
      tone: "accent",
      code: "040103306",
      hours: 3,
      targetGrade: "A",
      name: txt("برمجة نظم", "System Programming"),
      exam: { date: "2026-06-16", time: txt("11:30 إلى 1:30", "11:30 AM - 1:30 PM") },
      summary: txt("Compiler design: lexical analysis، regex/FA، parsing، ambiguity، semantic analysis، LL(1)، code generation.", "Compiler design: lexical analysis, regex/FA, parsing, ambiguity, semantic analysis, LL(1), and code generation."),
      strategy: txt("دي مادة بصمجة. اربط كل lecture بالـ Review Questions بتاعته وخلي آخر 3 أيام System فقط.", "This is pattern-based. Pair every lecture with its review questions and reserve the final three days for System only."),
      gradeItems: [
        grade("sys-current", "أعمال السنة الحالية", "Current coursework", 43, 50, "ناقص 6 في quiz", "Lost 6 in one quiz")
      ],
      modules: [
        module("sys-l1", "lecture", "Lec 1 - Introduction to Compilers", "Lec 1 - Introduction to Compilers", "System Programming - Lec 1.pdf", 4, ["programming languages", "compiler phases", "assembler/interpreter"], ["programming languages", "compiler phases", "assembler/interpreter"], ["RQ Lec 1"], ["RQ Lec 1"]),
        module("sys-l2", "lecture", "Lec 2 - Lexical Analysis", "Lec 2 - Lexical Analysis", "System Programming - Lec 2.pdf", 5, ["scanner", "tokens", "lexemes", "pattern recognition"], ["scanner", "tokens", "lexemes", "pattern recognition"], ["RQ Lec 2"], ["RQ Lec 2"]),
        module("sys-l3", "lecture", "Lec 3 - FA and Regular Expressions", "Lec 3 - FA and Regular Expressions", "System Programming - Lec 3.pdf", 4, ["alphabet", "strings", "regular expressions", "finite automata"], ["alphabet", "strings", "regular expressions", "finite automata"], ["RQ Lec 3"], ["RQ Lec 3"]),
        module("sys-l4", "lecture", "Lec 4 - Parsing", "Lec 4 - Parsing", "System Programming - Lec 4.pdf", 4, ["syntax analysis", "CFG", "parse tree", "tokens to tree"], ["syntax analysis", "CFG", "parse tree", "tokens to tree"], ["RQ Lec 4"], ["RQ Lec 4"]),
        module("sys-l5", "lecture", "Lec 5 - Derivations", "Lec 5 - Derivations", "System Programming - Lec 5.pdf", 4, ["leftmost derivation", "rightmost derivation", "parse tree exercises"], ["leftmost derivation", "rightmost derivation", "parse tree exercises"], ["RQ Lec 5"], ["RQ Lec 5"]),
        module("sys-l6", "lecture", "Lec 6 - Ambiguous Grammars", "Lec 6 - Ambiguous Grammars", "System Programming - Lec 6.pdf", 1, ["ambiguity", "operator precedence", "remove ambiguity"], ["ambiguity", "operator precedence", "remove ambiguity"], ["RQ Lec 6"], ["RQ Lec 6"]),
        module("sys-l7", "lecture", "Lec 7 - Dangling Else", "Lec 7 - Dangling Else", "System Programming - Lec 7.pdf", 2, ["dangling else", "if grammar", "association rules"], ["dangling else", "if grammar", "association rules"], ["RQ Lec 7"], ["RQ Lec 7"]),
        module("sys-l8", "lecture", "Lec 8 - Semantic Analysis", "Lec 8 - Semantic Analysis", "System Programming - Lec 8.pdf", 3, ["attribute grammar", "static attributes", "type/value attributes"], ["attribute grammar", "static attributes", "type/value attributes"], ["RQ Lec 8"], ["RQ Lec 8"]),
        module("sys-l9", "lecture", "Lec 9 - LL(1) Parsing", "Lec 9 - LL(1) Parsing", "System Programming - Lec 9.pdf", 2, ["LL(1) parser actions", "grammar table", "predictive parsing"], ["LL(1) parser actions", "grammar table", "predictive parsing"], ["RQ Lec 9 with answers"], ["RQ Lec 9 with answers"]),
        module("sys-l10", "lecture", "Lec 10 - Code Generation", "Lec 10 - Code Generation", "System Programming - Lec 10.pdf", 4, ["target processor", "registers/cache", "optimization", "machine code"], ["target processor", "registers/cache", "optimization", "machine code"], ["RQ Lec 10"], ["RQ Lec 10"])
      ],
      tasks: tasks([
        ["خلص المحاضرات 6-10", "Finish lectures 6-10"],
        ["حل RQ لكل Lecture مع الإجابات", "Solve RQ for every lecture with answers"],
        ["اعمل جدول keywords لكل chapter", "Make a keyword table per chapter"],
        ["آخر 3 أيام System فقط", "Last 3 days: System only"]
      ], "sys-task")
    },
    {
      id: "life",
      tone: "coral",
      code: "049900020",
      hours: 2,
      targetGrade: "A",
      name: txt("مهارات حياتية", "Life Skills"),
      exam: { date: "2026-05-24", time: txt("11:30 إلى 1:30", "11:30 AM - 1:30 PM") },
      summary: txt("مادة سهلة بالنسبة لك. الهدف حفظ سريع قبلها بيوم بدون سحب وقت من المواد الثقيلة.", "A low-risk subject for you. Do a quick review the day before without stealing time from heavy subjects."),
      strategy: txt("ساعة إلى ساعتين يوم 23 مايو كفاية، والباقي Advanced وSystem.", "One to two hours on May 23 should be enough; keep the rest for Advanced and System."),
      gradeItems: [
        grade("life-current", "أعمال السنة الحالية", "Current coursework", 40, 40)
      ],
      modules: [
        module("life-r1", "sheet", "Quick review sheet", "Quick review sheet", "Life Skills notes", 1, ["definitions", "headlines", "expected questions"], ["definitions", "headlines", "expected questions"])
      ],
      tasks: tasks([
        ["مراجعة ساعة يوم 23 مايو", "One-hour review on May 23"],
        ["اقرأ العناوين والتعريفات", "Read headings and definitions"],
        ["نام كويس قبل الامتحان", "Sleep well before the exam"]
      ], "life-task")
    }
  ];
}

function enrichSubjects(subjects) {
  const extras = extraSubjectModules();
  return subjects.map(subject => {
    const existing = new Set((subject.modules || []).map(item => item.id));
    const extra = (extras[subject.id] || []).filter(item => !existing.has(item.id));
    return { ...subject, modules: [...(subject.modules || []), ...extra] };
  });
}

function extraSubjectModules() {
  return {
    advanced: [
      module("adv-sheet-1", "sheet", "Sheet 1 Answers - Arrays", "Sheet 1 Answers - Arrays", "Advanced - Sheet 1 ( Answers ).pdf", 4, ["array declaration", "length tracing", "index errors", "loop tracing"], ["array declaration", "length tracing", "index errors", "loop tracing"]),
      module("adv-sheet-2", "sheet", "Sheet 2 Answers - Classes and Objects", "Sheet 2 Answers - Classes and Objects", "Advanced - Sheet 2 ( Answers ).pdf", 5, ["Stock class", "constructors", "getters/setters", "method tracing"], ["Stock class", "constructors", "getters/setters", "method tracing"]),
      module("adv-sheet-3", "sheet", "Sheet 3 Answers - Inheritance", "Sheet 3 Answers - Inheritance", "Advanced - Sheet 3 ( Answers ).pdf", 10, ["constructor chaining", "equals", "instanceof", "overriding output"], ["constructor chaining", "equals", "instanceof", "overriding output"]),
      module("adv-sheet-4", "sheet", "Sheet 4 Answers - Abstract and Interface", "Sheet 4 Answers - Abstract and Interface", "Advanced - Sheet 4 ( Answers ).pdf", 11, ["abstract class errors", "interface implementation", "casting", "output tracing"], ["abstract class errors", "interface implementation", "casting", "output tracing"])
    ],
    ds: [
      module("ds-lab-1", "sheet", "Lab 1 - Singly Linked List", "Lab 1 - Singly Linked List", "Data Structure - Lab 1.pdf", 1, ["add at position", "delete at position", "search", "max", "concat", "reverse"], ["add at position", "delete at position", "search", "max", "concat", "reverse"]),
      module("ds-lab-2", "sheet", "Lab 2 - Doubly Linked List", "Lab 2 - Doubly Linked List", "Data Structure - Lab 2.pdf", 1, ["add/delete", "sort", "concat", "similarity", "swap", "split middle"], ["add/delete", "sort", "concat", "similarity", "swap", "split middle"]),
      module("ds-lab-3", "sheet", "Lab 3 - Stack and Applications", "Lab 3 - Stack and Applications", "Data Structure - Lab 3.pdf", 2, ["print stack", "average", "min", "reverse", "infix to postfix", "postfix evaluation"], ["print stack", "average", "min", "reverse", "infix to postfix", "postfix evaluation"]),
      module("ds-lab-4", "sheet", "Lab 4 - Queue", "Lab 4 - Queue", "Data Structures - Lab 4.pdf", 1, ["average", "isFull", "similarity", "reverse first K", "count", "palindrome", "split even/odd"], ["average", "isFull", "similarity", "reverse first K", "count", "palindrome", "split even/odd"]),
      module("ds-lab-5", "sheet", "Lab 5 - Binary Search Tree", "Lab 5 - Binary Search Tree", "Data Structures - Lab 5.pdf", 1, ["height", "even nodes", "leaf sum", "node depth", "mirror", "balanced", "valid BST", "identical"], ["height", "even nodes", "leaf sum", "node depth", "mirror", "balanced", "valid BST", "identical"])
    ],
    toc: [
      module("toc-sheet-0", "sheet", "Sheet 0 - Sets", "Sheet 0 - Sets", "TOC - Sheet 0.pdf", 2, ["list set members", "set builder notation", "basic set operations"], ["list set members", "set builder notation", "basic set operations"]),
      module("toc-sheet-1", "sheet", "Sheet 1 - Regular Expressions", "Sheet 1 - Regular Expressions", "TOC - Sheet 1.pdf", 1, ["contains one 1", "even length", "starts/ends conditions"], ["contains one 1", "even length", "starts/ends conditions"]),
      module("toc-sheet-2", "sheet", "Sheet 2 - DFA", "Sheet 2 - DFA", "TOC - Sheet 2.pdf", 2, ["DFA design", "language recognition", "state diagrams"], ["DFA design", "language recognition", "state diagrams"]),
      module("toc-sheet-3", "sheet", "Sheet 3 - NFA and Conversion", "Sheet 3 - NFA and Conversion", "TOC - Sheet 3.pdf", 1, ["NFA state diagrams", "RE to NFA", "NFA to DFA"], ["NFA state diagrams", "RE to NFA", "NFA to DFA"]),
      module("toc-sheet-4", "sheet", "Sheet 4 - CFG", "Sheet 4 - CFG", "TOC - Sheet 4.pdf", 1, ["CFG generation", "parse trees", "derivations"], ["CFG generation", "parse trees", "derivations"]),
      module("toc-sheet-5", "sheet", "Sheet 5 - PDA", "Sheet 5 - PDA", "TOC - Sheet 5.pdf", 2, ["PDA design", "stack languages", "a^n b^n style languages"], ["PDA design", "stack languages", "a^n b^n style languages"]),
      module("toc-sheet-6", "sheet", "Sheet 6 - TM", "Sheet 6 - TM", "TOC Sheet 6.pdf", 2, ["TM transitions", "tape marking", "state simulation"], ["TM transitions", "tape marking", "state simulation"])
    ],
    system: Array.from({ length: 10 }, (_, index) => {
      const n = index + 1;
      return module(`sys-rq-${n}`, "sheet", `Review Questions Lec ${n}`, `Review Questions Lec ${n}`, `System Programming - Lec ${n} ( RQ ).pdf`, n === 9 ? 3 : 5, ["review questions", "MCQ patterns", "doctor style questions"], ["review questions", "MCQ patterns", "doctor style questions"]);
    })
  };
}

function createDefaultState() {
  return {
    settings: { theme: "light", lang: "ar" },
    route: "dashboard",
    activeSubjectId: "advanced",
    activeSubjectTab: "overview",
    activeLanguageId: "cpp",
    activeLanguageTab: "overview",
    focusSeconds: 50 * 60,
    focusSessions: 0,
    gameBudgetDone: false,
    plans: [
      { id: "finals", name: txt("خطة الفاينال", "Finals Plan"), days: createStudyDays() }
    ],
    activePlanId: "finals",
    subjects: enrichSubjects(createSubjects()),
    languages: createLanguages(),
    cgpa: {
      previousCgpa: 3.35,
      previousHours: 72,
      semesters: [
        {
          id: "sem-current",
          name: txt("الترم الحالي (ربيع 2026)", "Current Semester (Spring 2026)"),
          courses: [
            { id: "cg-life", name: txt("مهارات حياتية", "Life Skills"), hours: 2, grade: "A" },
            { id: "cg-advanced", name: txt("برمجة متقدمة", "Advanced Programming"), hours: 3, grade: "A" },
            { id: "cg-logic", name: txt("دوائر منطقية رقمية", "Digital Logic Circuits"), hours: 3, grade: "B+" },
            { id: "cg-toc", name: txt("نظرية الحسابات", "Theory of Computation"), hours: 3, grade: "A" },
            { id: "cg-mm", name: txt("وسائط متعددة", "Multimedia"), hours: 3, grade: "B+" },
            { id: "cg-ds", name: txt("تراكيب بيانات", "Data Structures"), hours: 3, grade: "A" },
            { id: "cg-system", name: txt("برمجة نظم", "System Programming"), hours: 3, grade: "A" }
          ]
        }
      ]
    },
    tracks: createTracks(),
    cyber: createCyberTrack(),
    todos: tasks([
      ["رتب فولدرات المحاضرات حسب المادة", "Organize lecture folders by subject"],
      ["اعمل ورقة أخطاء لكل مادة", "Create an error sheet for every subject"]
    ], "todo"),
    projects: [
      { id: "proj-site", title: "Ahmed Command Center", stack: "HTML/CSS/JS", link: "", status: "in-progress", notes: txt("الموقع الشخصي ده نفسه أول مشروع portfolio", "This dashboard itself is the first portfolio project") },
      { id: "proj-cpp", title: "C++ Mini Bank", stack: "C++", link: "", status: "planned", notes: txt("Classes + file handling", "Classes + file handling") },
      { id: "proj-cyber", title: "Cyber Write-ups", stack: "Markdown/GitHub", link: "", status: "planned", notes: txt("3 labs من TryHackMe أو PortSwigger", "Three labs from TryHackMe or PortSwigger") }
    ],
    solvedChallenges: {},
    challengeShift: {},
    profile: {
      name: "Ahmed",
      title: "Cyber Security & Software Engineer",
      email: "ahmed@example.com",
      summary: "Aspiring cyber security professional and software engineer with a focus on C++ and network security."
    },
    globalSearch: "",
    globalTasksTab: "pending",
    planTab: "roadmap"
  };
}

function createStudyDays() {
  const raw = [
    ["2026-05-14", "14 مايو", "Advanced Programming بداية قوية", "Advanced Programming strong start", [["Database/JDBC ساعتين", "Database/JDBC for two hours"], ["OOP وCollections مراجعة", "Review OOP and Collections"], ["C++ فيديو واحد فقط", "One C++ video only"]]],
    ["2026-05-15", "15 مايو", "Advanced Programming تثبيت", "Advanced Programming consolidation", [["Database تطبيق عملي", "Practical database work"], ["Mock exam سريع", "Quick mock exam"], ["دوائر محاضرة جديدة 1", "Circuits new lecture 1"]]],
    ["2026-05-16", "16 مايو", "دوائر منطقية", "Digital Logic", [["محاضرة جديدة 2", "New lecture 2"], ["محاضرة جديدة 3", "New lecture 3"], ["مراجعة القديم 1-2", "Review old 1-2"]]],
    ["2026-05-17", "17 مايو", "دوائر ومراجعة قديم", "Circuits and old review", [["مراجعة القديم 3-5", "Review old 3-5"], ["حل أسئلة قديمة", "Solve old questions"], ["System تصفح سريع", "Quick System scan"]]],
    ["2026-05-18", "18 مايو", "System Programming", "System Programming", [["محاضرات 6-8", "Lectures 6-8"], ["أسئلة قديمة", "Old questions"], ["C++ فيديو واحد", "One C++ video"]]],
    ["2026-05-19", "19 مايو", "System Programming تكملة", "System Programming continuation", [["محاضرات 9-10", "Lectures 9-10"], ["حل RQ", "Solve RQ"], ["English 30 دقيقة", "English 30 minutes"]]],
    ["2026-05-20", "20 مايو", "Multimedia", "Multimedia", [["محاضرات 1-4 ملخص نقطي", "Lectures 1-4 bullet summary"], ["محاضرات 5-8 نقاط", "Lectures 5-8 bullets"], ["System بصمجة", "System memorization"]]],
    ["2026-05-21", "21 مايو", "Multimedia + Data Structures", "Multimedia + Data Structures", [["مصطلحات Multimedia", "Multimedia terms"], ["LinkedList وStack كتابة يدويًا", "Write LinkedList and Stack by hand"], ["Advanced تأكيد", "Advanced confirmation"]]],
    ["2026-05-22", "22 مايو", "Advanced Programming نهائي", "Advanced Programming final pass", [["Advanced mock كامل", "Full Advanced mock"], ["تصحيح الأخطاء", "Fix mistakes"], ["DS Queue/BST", "DS Queue/BST"]]],
    ["2026-05-23", "23 مايو", "تأكيد أخير + Life Skills", "Final confirmation + Life Skills", [["Advanced نقاط الضعف", "Advanced weak points"], ["Life Skills ساعة", "Life Skills one hour"], ["نوم مبكر", "Sleep early"]]],
    ["2026-05-26", "26-29 مايو", "عيد الأضحى", "Eid break", [["راحة وعيلة", "Rest and family"], ["اختياري: 30 دقيقة Advanced", "Optional: 30 minutes Advanced"]]],
    ["2026-06-13", "13-15 يونيو", "System Programming نهائي", "System Programming final stretch", [["System مراجعة مكثفة", "Intensive System review"], ["Mock exam يوم 14", "Mock exam on June 14"], ["راحة ذهنية يوم 15", "Mental rest on June 15"]]]
  ];
  return raw.map((item, index) => ({
    id: item[0],
    date: txt(item[1], item[0]),
    title: txt(item[2], item[3]),
    type: index < 10 ? "gold" : "between",
    tasks: tasks(item[4], `day-${index}`)
  }));
}

function createTracks() {
  return [
    { id: "cpp-track", title: txt("C++", "C++"), period: txt("بعد الفاينلز: الشهر الأول", "After finals: first month"), tasks: tasks([["Syntax وloops وfunctions", "Syntax, loops, and functions"], ["Pointers وreferences", "Pointers and references"], ["OOP وSTL", "OOP and STL"], ["مشروع Console", "Console project"]], "track-cpp") },
    { id: "js-track", title: txt("JavaScript", "JavaScript"), period: txt("بعد C++: الشهر الثاني", "After C++: second month"), tasks: tasks([["Elzero fundamentals", "Elzero fundamentals"], ["DOM وEvents", "DOM and events"], ["Async وFetch", "Async and fetch"], ["مشروع كامل", "Full project"]], "track-js") },
    { id: "english-track", title: txt("English", "English"), period: txt("يوميًا 30 دقيقة", "Daily 30 minutes"), tasks: tasks([["10 كلمات Anki", "10 Anki words"], ["فيديو تقني بدون ترجمة", "Technical video without subtitles"], ["تلخيص 5 جمل", "Five-sentence summary"]], "track-en") }
  ];
}

function createLanguages() {
  return [
    {
      id: "cpp",
      tone: "indigo",
      title: txt("C++", "C++"),
      subtitle: txt("أساسيات قوية ثم OOP وSTL ومشروع", "Core syntax, OOP, STL, then a project"),
      level: txt("Beginner → Intermediate", "Beginner → Intermediate"),
      goal: txt("تكتب برامج console كويسة وتفهم memory وSTL", "Write solid console apps and understand memory/STL"),
      resources: ["LearnCpp", "The Cherno", "Elzero C++"],
      modules: [
        languageModule("cpp-m1", "Syntax and Flow", "Syntax and Flow", ["variables", "conditions", "loops", "functions"], ["variables", "conditions", "loops", "functions"], "int main() {\n  int n;\n  cin >> n;\n  cout << n * 2;\n}"),
        languageModule("cpp-m2", "Pointers and References", "Pointers and References", ["addresses", "dereference", "references", "memory basics"], ["addresses", "dereference", "references", "memory basics"], "int x = 10;\nint* p = &x;\ncout << *p;"),
        languageModule("cpp-m3", "OOP", "OOP", ["classes", "constructors", "encapsulation", "inheritance"], ["classes", "constructors", "encapsulation", "inheritance"], "class Account {\n  double balance;\npublic:\n  void deposit(double v) { balance += v; }\n};"),
        languageModule("cpp-m4", "STL", "STL", ["vector", "map", "set", "stack", "queue", "sort"], ["vector", "map", "set", "stack", "queue", "sort"], "vector<int> a = {3,1,2};\nsort(a.begin(), a.end());")
      ],
      tasks: tasks([["فيديو واحد يوميًا بعد مذاكرة المواد", "One video daily after college study"], ["حل 3 مسائل صغيرة أسبوعيًا", "Solve three small problems weekly"], ["Mini Bank project", "Mini Bank project"]], "lang-cpp")
    },
    {
      id: "java",
      tone: "accent",
      title: txt("Java", "Java"),
      subtitle: txt("تقوية الجامعة وكتابة أكواد DS وAdvanced", "Strengthen college Java for DS and Advanced"),
      level: txt("College Core", "College Core"),
      goal: txt("تكتب OOP وDS وJDBC بثقة", "Write OOP, DS, and JDBC confidently"),
      resources: ["College PDFs", "DS Guide", "Oracle Java docs"],
      modules: [
        languageModule("java-m1", "OOP Essentials", "OOP Essentials", ["class", "object", "constructor", "encapsulation"], ["class", "object", "constructor", "encapsulation"], "class Student {\n  private String name;\n  Student(String name) { this.name = name; }\n}"),
        languageModule("java-m2", "Data Structures", "Data Structures", ["linked list", "stack", "queue", "BST"], ["linked list", "stack", "queue", "BST"], "class Node {\n  int data;\n  Node next;\n}"),
        languageModule("java-m3", "JavaFX", "JavaFX", ["Application", "Stage", "Scene", "Nodes"], ["Application", "Stage", "Scene", "Nodes"], "public void start(Stage stage) {\n  stage.setScene(new Scene(new Button(\"OK\")));\n  stage.show();\n}"),
        languageModule("java-m4", "JDBC", "JDBC", ["Connection", "Statement", "ResultSet", "SQL"], ["Connection", "Statement", "ResultSet", "SQL"], "Connection con = DriverManager.getConnection(url);\nResultSet rs = stmt.executeQuery(\"select * from users\");")
      ],
      tasks: tasks([["اكتب DS templates على ورق", "Write DS templates on paper"], ["راجع Advanced sheets", "Review Advanced sheets"], ["اكتب JDBC skeleton", "Write JDBC skeleton"]], "lang-java")
    },
    {
      id: "html",
      tone: "amber",
      title: txt("HTML", "HTML"),
      subtitle: txt("Semantic structure ونماذج وصفحات نظيفة", "Semantic structure, forms, and clean pages"),
      level: txt("Almost done", "Almost done"),
      goal: txt("تبني صفحات منظمة وقابلة للوصول", "Build structured and accessible pages"),
      resources: ["MDN HTML", "Elzero HTML"],
      modules: [
        languageModule("html-m1", "Semantic Layout", "Semantic Layout", ["header", "main", "section", "footer"], ["header", "main", "section", "footer"], "<main>\n  <section>\n    <h1>Title</h1>\n  </section>\n</main>"),
        languageModule("html-m2", "Forms", "Forms", ["label", "input", "fieldset", "validation"], ["label", "input", "fieldset", "validation"], "<label for=\"email\">Email</label>\n<input id=\"email\" type=\"email\" required>")
      ],
      tasks: tasks([["ابن صفحة profile semantic", "Build a semantic profile page"], ["اعمل form كامل لمشروع", "Build a full project form"]], "lang-html")
    },
    {
      id: "css",
      tone: "coral",
      title: txt("CSS", "CSS"),
      subtitle: txt("Layout وresponsive وthemes", "Layout, responsive design, and themes"),
      level: txt("Almost done", "Almost done"),
      goal: txt("تصمم واجهات مرتبة responsive", "Design clean responsive interfaces"),
      resources: ["MDN CSS", "Elzero CSS", "Kevin Powell"],
      modules: [
        languageModule("css-m1", "Layout", "Layout", ["flex", "grid", "spacing", "alignment"], ["flex", "grid", "spacing", "alignment"], ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}"),
        languageModule("css-m2", "Responsive UI", "Responsive UI", ["media queries", "clamp", "container sizing"], ["media queries", "clamp", "container sizing"], "@media (max-width: 700px) {\n  .grid { grid-template-columns: 1fr; }\n}"),
        languageModule("css-m3", "Themes", "Themes", ["variables", "dark mode", "transitions"], ["variables", "dark mode", "transitions"], ":root { --bg: #fff; }\n[data-theme=\"dark\"] { --bg: #111; }")
      ],
      tasks: tasks([["اعمل card responsive", "Build a responsive card"], ["اعمل dark mode variables", "Build dark mode variables"]], "lang-css")
    },
    {
      id: "js",
      tone: "indigo",
      title: txt("JavaScript", "JavaScript"),
      subtitle: txt("Elzero ثم DOM وAPIs ومشاريع", "Elzero, then DOM, APIs, and projects"),
      level: txt("Next major track", "Next major track"),
      goal: txt("تبني تطبيقات متفاعلة وتحفظ بيانات", "Build interactive apps and persist data"),
      resources: ["Elzero JS", "MDN JS", "The Odin Project"],
      modules: [
        languageModule("js-m1", "Fundamentals", "Fundamentals", ["variables", "functions", "arrays", "objects"], ["variables", "functions", "arrays", "objects"], "const user = { name: \"Ahmed\", level: 1 };"),
        languageModule("js-m2", "DOM", "DOM", ["querySelector", "events", "forms", "rendering"], ["querySelector", "events", "forms", "rendering"], "button.addEventListener(\"click\", () => {\n  app.innerHTML = \"Done\";\n});"),
        languageModule("js-m3", "Async and APIs", "Async and APIs", ["fetch", "promises", "async/await", "JSON"], ["fetch", "promises", "async/await", "JSON"], "const res = await fetch(url);\nconst data = await res.json();"),
        languageModule("js-m4", "Local Apps", "Local Apps", ["localStorage", "state", "routing", "components"], ["localStorage", "state", "routing", "components"], "localStorage.setItem(\"tasks\", JSON.stringify(tasks));")
      ],
      tasks: tasks([["ابدأ Elzero بعد الفاينلز", "Start Elzero after finals"], ["ابن To-do ب localStorage", "Build a localStorage todo"], ["اعمل مشروع dashboard صغير", "Build a small dashboard project"]], "lang-js")
    }
  ];
}

function languageModule(id, titleAr, titleEn, topicsAr, topicsEn, code) {
  return {
    id,
    title: txt(titleAr, titleEn),
    topics: topicsAr.map((topic, index) => txt(topic, topicsEn[index] || topic)),
    code
  };
}

function createCyberTrack() {
  return [
    { id: "cyber-foundation", title: txt("Foundation", "Foundation"), period: txt("بعد أسبوع راحة", "After one rest week"), tasks: tasks([["Linux revision", "Linux revision"], ["Networking: OSI/TCP/IP/DNS/HTTP", "Networking: OSI/TCP/IP/DNS/HTTP"], ["TryHackMe Cyber Security 101", "TryHackMe Cyber Security 101"], ["OverTheWire Bandit 0-10", "OverTheWire Bandit 0-10"]], "cyber-foundation") },
    { id: "cyber-web", title: txt("Web Security", "Web Security"), period: txt("الشهر الثاني", "Second month"), tasks: tasks([["HTTP/cookies/sessions", "HTTP/cookies/sessions"], ["SQL Injection beginner labs", "SQL Injection beginner labs"], ["XSS beginner labs", "XSS beginner labs"], ["OWASP Top 10 مختصر", "OWASP Top 10 short reading"]], "cyber-web") },
    { id: "cyber-jr", title: txt("Junior Pentester", "Junior Pentester"), period: txt("بعد الأساسيات", "After foundations"), tasks: tasks([["Reconnaissance basics", "Reconnaissance basics"], ["Nmap practice", "Nmap practice"], ["Kali tools بدون حفظ أعمى", "Kali tools without blind memorization"], ["3 write-ups", "Three write-ups"]], "cyber-jr") }
  ];
}


function loadState() {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    if (!stored) return createDefaultState();
    const parsed = JSON.parse(stored);
    const base = createDefaultState();
    const result = {
      ...base,
      ...parsed,
      settings: { ...base.settings, ...(parsed.settings || {}) },
      subjects: Array.isArray(parsed.subjects) ? enrichSubjects(parsed.subjects) : base.subjects,
      languages: Array.isArray(parsed.languages) ? parsed.languages : base.languages,
      cgpa: (parsed.cgpa && !Array.isArray(parsed.cgpa) && parsed.cgpa.semesters) ? parsed.cgpa : base.cgpa
    };

    if (parsed.days && !parsed.plans) {
      result.plans = [{ id: "finals", name: {ar: "خطة الفاينال", en: "Finals Plan"}, days: parsed.days }];
      result.activePlanId = "finals";
    }
    
    return result;
  } catch {
    return createDefaultState();
  }
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function lang() {
  try {
    if (typeof state === "undefined" || !state || !state.settings) return "ar";
    return state.settings.lang || "ar";
  } catch {
    return "ar";
  }
}

function tr(path) {
  return path.split(".").reduce((obj, key) => obj && obj[key], ui[lang()]) || path;
}

function loc(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  return value[lang()] || value.ar || value.en || "";
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function applyPreferences() {
  const current = ui[lang()];
  document.documentElement.lang = lang();
  document.documentElement.dir = current.dir;
  document.documentElement.dataset.theme = state.settings.theme;
  document.getElementById("themeToggle").innerHTML = `<span aria-hidden="true">${state.settings.theme === "dark" ? tr("buttons.light") : tr("buttons.dark")}</span>`;
  document.getElementById("themeToggle").setAttribute("aria-label", state.settings.theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  document.getElementById("langToggle").textContent = tr("buttons.lang");

  const localToday = new Date();
  const year = localToday.getFullYear();
  const month = String(localToday.getMonth() + 1).padStart(2, '0');
  const dayNum = String(localToday.getDate()).padStart(2, '0');
  const todayId = `${year}-${month}-${dayNum}`;

  const dateStr = formatDate(todayId);
  const throughText = lang() === "ar" ? "إلى نهاية الفاينلز" : "through finals";
  document.getElementById("pageEyebrow").textContent = `${dateStr} ${throughText}`;
  const brandSub = document.getElementById("brandSubtitle");
  if (brandSub) brandSub.textContent = dateStr;
}

function getRoute() {
  const route = window.location.hash.replace("#", "") || state.route || "dashboard";
  return routes.includes(route) ? route : "dashboard";
}

function renderNav(route) {
  const visibleRoute = toolRoutes.includes(route) ? "tools" : route;
  document.getElementById("mainNav").innerHTML = mainRoutes.map(item => `
    <button class="nav-btn ${visibleRoute === item ? "active" : ""}" data-route="${item}" type="button">${esc(tr(`nav.${item}`))}</button>
  `).join("");
}

function formatDate(date) {
  const value = new Date(`${date}T09:00:00`);
  return value.toLocaleDateString(ui[lang()].locale, { weekday: "short", month: "short", day: "numeric" });
}

function daysLeft(date) {
  if (!date) return 0;
  const localToday = new Date();
  localToday.setHours(0, 0, 0, 0);
  const target = new Date(`${date}T00:00:00`);
  return Math.max(0, Math.round((target - localToday) / 86400000));
}

function subjectGrade(subject) {
  if (!subject || !subject.gradeItems) return { earned: 0, total: 0, percent: 0 };
  const earned = subject.gradeItems.reduce((sum, item) => sum + Number(item.earned || 0), 0);
  const total = subject.gradeItems.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const percent = total ? Math.round((earned / total) * 100) : 0;
  return { earned, total, percent };
}

function expectedGradeFromPercent(percent) {
  if (percent >= 90) return "A";
  if (percent >= 85) return "B+";
  if (percent >= 80) return "B";
  if (percent >= 75) return "C+";
  if (percent >= 70) return "C";
  return "D";
}

function taskCompletion(list) {
  if (!list.length) return 0;
  return Math.round((list.filter(task => task.done).length / list.length) * 100);
}

function allTaskGroups() {
  return [
    ...activePlan().days.map(day => ({ type: tr("nav.plan"), source: loc(day.title), tasks: day.tasks, scope: "plan", parent: day.id })),
    ...state.subjects.map(subject => ({ type: tr("nav.subjects"), source: loc(subject.name), tasks: subject.tasks, scope: "subject", parent: subject.id })),
    ...state.languages.map(language => ({ type: tr("nav.code"), source: loc(language.title), tasks: language.tasks, scope: "language", parent: language.id })),
    ...state.tracks.map(track => ({ type: tr("nav.code"), source: loc(track.title), tasks: track.tasks, scope: "track", parent: track.id })),
    ...state.cyber.map(phase => ({ type: "Cyber", source: loc(phase.title), tasks: phase.tasks, scope: "cyber", parent: phase.id })),
    { type: "To-do", source: "General", tasks: state.todos, scope: "todo", parent: "none" }
  ];
}

function completedItems() {
  const items = [];
  allTaskGroups().forEach(group => {
    // Only include items explicitly marked for CV (task.inCv)
    // and usually only from Cyber or Programming tracks as per user request
    group.tasks.filter(task => task.done && task.inCv).forEach(task => items.push({
      id: task.id,
      title: loc(task.text),
      type: group.type,
      source: group.source
    }));
  });
  Object.entries(state.solvedChallenges).forEach(([id, item]) => {
    items.push({ id, title: item.title, type: "Challenge", source: item.lang });
  });
  state.projects.filter(project => project.status === "done").forEach(project => {
    items.push({ id: project.id, title: project.title, type: "Project", source: project.stack });
  });
  return items;
}

function calculateCgpa() {
  let totalTermHours = 0;
  let totalTermPoints = 0;
  const semesterResults = state.cgpa.semesters.map(sem => {
    const hours = sem.courses.reduce((sum, c) => sum + Number(c.hours || 0), 0);
    const points = sem.courses.reduce((sum, c) => sum + Number(c.hours || 0) * (gradePoints[c.grade] || 0), 0);
    const gpa = hours ? points / hours : 0;
    totalTermHours += hours;
    totalTermPoints += points;
    return { ...sem, hours, points, gpa };
  });
  const previousPoints = Number(state.cgpa.previousCgpa || 0) * Number(state.cgpa.previousHours || 0);
  const totalHours = Number(state.cgpa.previousHours || 0) + totalTermHours;
  const cumulative = totalHours ? (previousPoints + totalTermPoints) / totalHours : 0;
  return { semesterResults, totalTermHours, totalTermPoints, cumulative, totalHours };
}

function nextExam() {
  const sorted = [...state.subjects]
    .filter(subject => subject.exam && subject.exam.date)
    .sort((a, b) => new Date(a.exam.date) - new Date(b.exam.date));
  return sorted.find(subject => new Date(`${subject.exam.date}T23:59:59`) >= new Date()) || sorted.at(-1);
}

function renderMetric(value, label) {
  return `<div class="metric"><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`;
}

function renderTask(task, scope, parentId = "") {
  const overdueBadge = task.isOverdue ? `<span class="chip amber" style="margin-inline-start:8px;font-size:10px">${lang() === 'ar' ? `متأخر ${task.daysPast} يوم` : `Past ${task.daysPast} day${task.daysPast > 1 ? 's' : ''}`}</span>` : '';
  return `
    <label class="task-row ${task.done ? "done" : ""} ${task.isOverdue ? "overdue" : ""}">
      <input type="checkbox" data-action="toggle-task" data-scope="${esc(scope)}" data-parent="${esc(parentId)}" data-id="${esc(task.id)}" ${task.done ? "checked" : ""}>
      <span class="task-text" style="display:flex;align-items:center;flex-wrap:wrap">${esc(loc(task.text))}${overdueBadge}</span>
      <button class="delete-btn" data-action="delete-task" data-scope="${esc(scope)}" data-parent="${esc(parentId)}" data-id="${esc(task.id)}" type="button" aria-label="Delete task">x</button>
    </label>
  `;
}

function renderTaskList(list, scope, parentId) {
  return `<div class="task-list">${list.map(task => renderTask(task, scope, parentId)).join("")}</div>`;
}

function taskForm(form, parentId, placeholder) {
  return `
    <form class="form-line" data-form="${form}" data-parent="${esc(parentId)}">
      <input name="text" required placeholder="${esc(placeholder)}">
      <button class="secondary-btn" type="submit">${esc(tr("buttons.add"))}</button>
    </form>
  `;
}

function renderDashboard() {
  const exam = nextExam();
  const cgpa = calculateCgpa();
  const allTasks = allTaskGroups().flatMap(group => group.tasks);
  const cvCount = completedItems().length;
  const localToday = new Date();
  const year = localToday.getFullYear();
  const month = String(localToday.getMonth() + 1).padStart(2, '0');
  const dateNum = String(localToday.getDate()).padStart(2, '0');
  const todayId = `${year}-${month}-${dateNum}`;

  const planDays = activePlan().days || [];
  const day = planDays.find(item => item.id === todayId) || planDays.find(item => item.tasks.some(task => !task.done)) || planDays[0];
  const grade = subjectGrade(exam);
  const isAr = lang() === "ar";

  return `
    <section class="panel hero">
      <div class="section-head">
        <div>
          <h2>${esc(tr("titles.dashboard"))}</h2>
          <p class="muted">${esc(tr("copy.dashboardLead"))}</p>
        </div>
        ${exam ? `<span class="chip accent">${esc(formatDate(exam.exam.date))}</span>` : ''}
      </div>
      <div class="grid cols-4">
        ${renderMetric(exam ? daysLeft(exam.exam.date) : "0", exam ? `${tr("labels.daysLeft")} - ${loc(exam.name)}` : tr("labels.daysLeft"))}
        ${renderMetric(cgpa.cumulative.toFixed(3), tr("labels.predictedCgpa"))}
        ${renderMetric(`${taskCompletion(allTasks)}%`, tr("labels.completion"))}
        ${renderMetric(cvCount, tr("labels.cvItems"))}
      </div>
    </section>

    <section class="grid cols-2" style="margin-top:14px">
      <article class="panel">
        ${exam ? `
          <div class="section-head">
            <div>
              <h2>${esc(tr("labels.nextExam"))}</h2>
              <p class="muted">${esc(formatDate(exam.exam.date))} · ${esc(loc(exam.exam.time))}</p>
            </div>
            <span class="chip indigo">${esc(tr("labels.target"))}: ${esc(exam.targetGrade)}</span>
          </div>
          <h3>${esc(loc(exam.name))}</h3>
          <p class="muted">${esc(loc(exam.strategy))}</p>
          <div class="progress" style="--value:${grade.percent}%"><span></span></div>
          <p class="small muted" style="margin-top:8px">${esc(tr("labels.currentGrade"))}: ${grade.earned}/${grade.total} (${grade.percent}%)</p>
        ` : `
          <div style="text-align:center; padding: 40px;">
            <h3>${isAr ? "لا توجد امتحانات قادمة" : "No upcoming exams"}</h3>
            <p class="muted">${isAr ? "أضف مواعيد الامتحانات في صفحة المواد." : "Add exam dates in the subjects page."}</p>
          </div>
        `}
      </article>

      <article class="panel">
        ${day ? `
          <div class="section-head">
            <div>
              <h2>${esc(tr("labels.todayBlock"))}</h2>
              <p class="muted">${esc(loc(day.date))} · ${esc(loc(day.title))}</p>
            </div>
            <button class="secondary-btn" data-route="plan" type="button">${esc(tr("buttons.open"))}</button>
          </div>
          ${renderTaskList(day.tasks.slice(0, 4), "day", day.id)}
        ` : `
          <div style="text-align:center; padding: 30px;">
            <h3>${lang() === "ar" ? "مفيش مهام خطة اليوم" : "No plan tasks today"}</h3>
            <p class="muted">${lang() === "ar" ? "افتح صفحة الخطة وأضف يوم جديد." : "Open the plan page and add a new day."}</p>
            <button class="primary-btn" data-route="plan" style="margin-top:15px">${esc(tr("buttons.open"))}</button>
          </div>
        `}
      </article>
    </section>
  `;
}

function renderPlan() {
  const plan = activePlan();
  const isAr = lang() === "ar";
  const tab = state.planTab || "roadmap";

  return `
    <section class="panel hero">
      <div class="section-head">
        <div>
          <span class="chip coral">${esc(loc(plan.name))}</span>
          <h2 style="margin-top:8px">${isAr ? "خطة المذاكرة" : "Study Plan"}</h2>
        </div>
        <div class="page-actions">
          <button class="tab-btn ${tab === 'roadmap' ? 'active' : ''}" data-action="set-plan-tab" data-tab="roadmap" type="button">${isAr ? "خارطة الطريق" : "Daily Roadmap"}</button>
          ${plan.id === 'finals' ? `<button class="tab-btn ${tab === 'exams' ? 'active' : ''}" data-action="set-plan-tab" data-tab="exams" type="button">${isAr ? "جدول الامتحانات" : "Exam Schedule"}</button>` : ''}
        </div>
      </div>
    </section>

    ${tab === 'exams' ? `
      <section class="panel">
        <div class="section-head">
          <div>
            <h2>${esc(loc(plan.name))}</h2>
            <p class="muted">${isAr ? "بين الامتحانات مراجعة فقط. الشغل الصعب يتقفل قبل العيد قدر الإمكان." : "Between exams is for review only. Close the heavy work before Eid as much as possible."}</p>
          </div>
          <span class="chip coral">${isAr ? "العيد 26-29 مايو" : "Eid: May 26-29"}</span>
        </div>
        <div class="timeline">
          ${state.subjects.filter(subject => subject.exam?.date).sort((a, b) => new Date(a.exam.date) - new Date(b.exam.date)).map(subject => `
            <div class="timeline-row">
              <div class="date-box">${esc(formatDate(subject.exam.date))}<br><span class="small">${esc(loc(subject.exam.time))}</span></div>
              <div>
                <h3>${esc(loc(subject.name))}</h3>
                <p class="muted">${esc(tr("labels.target"))}: ${esc(subject.targetGrade)} · ${daysLeft(subject.exam.date)} ${esc(tr("labels.daysLeft"))}</p>
                <p>${esc(loc(subject.strategy))}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    ` : `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h2 style="margin:0">${esc(loc(plan.name))} - ${isAr ? "الخطة اليومية" : "Daily Roadmap"}</h2>
        <button class="primary-btn" data-action="add-new-day" style="padding: 8px 16px;">+ ${isAr ? "إضافة يوم جديد" : "Add New Day"}</button>
      </div>

      <section class="grid cols-2">
        ${(() => {
          const todayDate = new Date();
          todayDate.setHours(0, 0, 0, 0);
          
          const filteredDays = activePlan().days.map(day => {
            const dayDate = new Date(day.id);
            const daysPast = Math.floor((todayDate - dayDate) / 86400000);
            
            let filteredTasks = day.tasks.filter(task => !(daysPast > 0 && task.done));
            filteredTasks = filteredTasks.map(task => {
              if (daysPast > 0 && !task.done) return { ...task, isOverdue: true, daysPast };
              return task;
            });
            return { ...day, tasks: filteredTasks, daysPast };
          }).filter(day => !(day.daysPast > 0 && day.tasks.length === 0));

          return filteredDays.map(day => {
            const allDone = day.tasks.length > 0 && day.tasks.every(t => t.done);
            return `
            <article class="panel ${day.daysPast > 0 ? "past-due-panel" : ""} ${allDone ? "all-done-panel" : ""}">
              <div class="section-head">
                <div>
                  <span class="chip ${allDone ? "finished" : (day.daysPast > 0 ? "amber" : "indigo")}" style="${allDone ? "text-decoration: line-through; opacity: 0.7;" : ""}">
                    ${esc(loc(day.date))}
                  </span>
                  <h3 style="margin-top:8px">${esc(loc(day.title))}</h3>
                </div>
                <div style="display:flex; align-items:center; gap:8px">
                  <span class="chip">${taskCompletion(day.tasks)}%</span>
                  <button class="delete-btn" data-action="delete-day" data-id="${esc(day.id)}" style="background:transparent; border:none; color:var(--red); cursor:pointer; font-size: 1.2em;">×</button>
                </div>
              </div>
              ${renderTaskList(day.tasks, "day", day.id)}
              ${day.daysPast <= 0 ? taskForm("add-day-task", day.id, isAr ? "أضف مهمة في اليوم" : "Add a task to this day") : ''}
            </article>
          `;
          }).join("");
        })()}
      </section>
    `}
  `;
}

function renderSubjects() {
  const selected = state.subjects.find(subject => subject.id === state.activeSubjectId) || state.subjects[0];
  const tab = state.activeSubjectTab || "overview";
  const tabs = ["overview", "guide", "lectures", "sheets", "grades", "tasks"];

  return `
    <section class="panel hero">
      <div class="section-head">
        <div>
          <h2>${esc(tr("titles.subjects"))}</h2>
          <p class="muted">${esc(tr("copy.subjectLead"))}</p>
        </div>
      </div>
      ${renderAddSubjectTools()}
      <details class="import-box" style="margin-top:10px">
        <summary>${lang() === "ar" ? "\u{1F4D6} \u0631\u0641\u0639 \u062f\u0644\u064a\u0644 JSX \u0644\u0645\u0627\u062f\u0629" : "\u{1F4D6} Upload JSX Guide for Subject"}</summary>
        <div class="panel inset-panel" style="margin-top:10px">
          <p class="small muted">${lang() === "ar" ? "\u0627\u0631\u0641\u0639 \u0645\u0644\u0641 .jsx \u0648\u0627\u062e\u062a\u0631 \u0627\u0644\u0645\u0627\u062f\u0629 \u0627\u0644\u0644\u064a \u0639\u0627\u064a\u0632 \u062a\u0631\u0628\u0637\u0647 \u0628\u064a\u0647\u0627. \u0647\u064a\u0638\u0647\u0631 \u0632\u0631\u0627\u0631 Open Guide \u0641\u064a \u0635\u0641\u062d\u0629 \u0627\u0644\u0645\u0627\u062f\u0629." : "Upload a .jsx file and select which subject to link it to. An Open Guide button will appear on that subject page."}</p>
          <div class="form-grid" style="margin-top:8px">
            <select id="guideSubjectSelect">
              ${state.subjects.map(s => '<option value="' + esc(s.id) + '">' + esc(loc(s.name)) + '</option>').join("")}
            </select>
            <div class="file-upload-wrap">
              <div class="file-upload-btn">\u{1F4C4} ${lang() === "ar" ? "\u0627\u062e\u062a\u0631 \u0645\u0644\u0641 .jsx" : "Choose .jsx file"}</div>
              <input id="guideFileInput" type="file" accept=".jsx,.js,.tsx" aria-label="Upload JSX guide">
            </div>
          </div>
        </div>
      </details>
    </section>

    <section class="subject-grid" style="margin-top:14px">
      <aside class="subject-list" aria-label="${esc(tr("labels.allSubjects"))}">
        ${state.subjects.map(subject => renderSubjectCard(subject, selected.id)).join("")}
      </aside>
      <article class="panel">
        <div class="section-head">
          <div>
            <h2>${esc(loc(selected.name))}</h2>
            <p class="muted">${esc(selected.code)} · ${esc(tr("labels.exam"))}: ${esc(formatDate(selected.exam.date))} · ${esc(loc(selected.exam.time))}</p>
          </div>
          <div class="inline-actions subject-hero-actions">
            ${selected.guideFile ? `<a class="guide-open-btn" href="guide-viewer.html?guide=${esc(selected.guideFile)}" target="_blank">\u{1F4D6} ${esc(tr("labels.fullGuide"))}</a>` : `<button class="primary-btn" data-action="subject-tab" data-tab="guide" type="button">${esc(tr("labels.fullGuide"))}</button>`}
            <div class="target-wrap" style="display:flex;align-items:center;background:var(--bg-card);padding:2px 8px;border-radius:6px;border:1px solid var(--border-color);">
              <span class="small muted" style="${lang() === 'ar' ? 'margin-left:8px' : 'margin-right:8px'}">${esc(tr("labels.target"))}</span>
              <select class="target-select" data-action="change-target" data-id="${esc(selected.id)}" style="background:transparent;border:none;padding:0">${Object.keys(gradePoints).map(g => `<option value="${g}" ${selected.targetGrade === g ? "selected" : ""}>${g}</option>`).join("")}</select>
            </div>
          </div>
        </div>
        <div class="tabs">
          ${tabs.map(item => `<button class="tab-btn ${tab === item ? "active" : ""}" data-action="subject-tab" data-tab="${item}" type="button">${esc(tr(`labels.${item}`))}</button>`).join("")}
        </div>
        ${renderSubjectTab(selected, tab)}
      </article>
    </section>
  `;
}

function renderSubjectCard(subject, activeId) {
  const sg = subjectGrade(subject);
  const gradeOpts = Object.keys(gradePoints).map(g => `<option value="${g}" ${subject.targetGrade === g ? "selected" : ""}>${g}</option>`).join("");
  return `
    <div class="subject-card ${subject.tone || ""} ${subject.id === activeId ? "active" : ""}" data-action="select-subject" data-id="${esc(subject.id)}" role="button" tabindex="0">
      <div class="section-head">
        <div>
          <h3>${esc(loc(subject.name))}</h3>
          <p class="small muted">${esc(subject.code)} · ${esc(tr("labels.hours"))}: ${esc(subject.hours)}</p>
        </div>
        <span class="chip">${sg.percent}%</span>
      </div>
      <div class="progress" style="--value:${sg.percent}%"><span></span></div>
      <div class="subject-meta">
        <span class="chip accent">${esc(sg.earned)}/${esc(sg.total)}</span>
        <span class="chip">${esc(formatDate(subject.exam.date))}</span>
        <div class="target-wrap" style="display:flex;align-items:center;background:var(--bg-elevated);padding:2px 8px;border-radius:6px;border:1px solid var(--border-color);" onclick="event.stopPropagation()">
          <span class="small muted" style="${lang() === 'ar' ? 'margin-left:6px' : 'margin-right:6px'};font-size:11px">${esc(tr("labels.target"))}</span>
          <select class="target-select" data-action="change-target" data-id="${esc(subject.id)}" style="background:transparent;border:none;padding:0">${gradeOpts}</select>
        </div>
      </div>
    </div>
  `;
}

function renderSubjectTab(subject, tab) {
  if (tab === "lectures") return renderModuleList(subject, "lecture");
  if (tab === "sheets") return renderModuleList(subject, "sheet");
  if (tab === "guide") return renderSubjectGuide(subject);
  if (tab === "grades") return renderSubjectGrades(subject);
  if (tab === "tasks") return `
    ${renderTaskList(subject.tasks, "subject", subject.id)}
    ${taskForm("add-subject-task", subject.id, lang() === "ar" ? "أضف مهمة للمادة" : "Add a subject task")}
  `;
  const sg = subjectGrade(subject);
  return `
    <div class="grid cols-3">
      ${renderMetric(`${sg.earned}/${sg.total}`, tr("labels.currentGrade"))}
      ${renderMetric(`${sg.percent}%`, tr("labels.percent"))}
      ${renderMetric(subject.targetGrade, tr("labels.target"))}
    </div>
    <div class="grid cols-2" style="margin-top:14px">
      <div class="panel" style="box-shadow:none">
        <h3>${esc(tr("labels.overview"))}</h3>
        <p>${esc(loc(subject.summary))}</p>
      </div>
      <div class="panel" style="box-shadow:none">
        <h3>${esc(tr("labels.strategy"))}</h3>
        <p>${esc(loc(subject.strategy))}</p>
      </div>
    </div>
    <div class="module-grid" style="margin-top:14px">
      ${subject.modules.slice(0, 4).map(renderModuleCard).join("")}
    </div>
  `;
}

function renderSubjectGuide(subject) {
  const lectureCount = subject.modules.filter(item => item.type === "lecture").length;
  const extraCount = subject.modules.filter(item => item.type !== "lecture").length;
  return `
    <section class="guide-page">
      <div class="guide-banner">
        <div>
          <span class="chip accent">${esc(tr("labels.fullGuide"))}</span>
          <h2>${esc(loc(subject.name))}</h2>
          <p>${esc(loc(subject.summary))}</p>
        </div>
        <div class="guide-stats">
          ${renderMetric(lectureCount, tr("labels.lectures"))}
          ${renderMetric(extraCount, tr("labels.sheets"))}
          ${renderMetric(subjectGrade(subject).percent + "%", tr("labels.currentGrade"))}
        </div>
      </div>

      <div class="callout guide-core">
        <strong>${esc(tr("labels.coreConcept"))}</strong>
        <p>${esc(loc(subject.strategy))}</p>
      </div>

      <h3>${esc(tr("labels.fileMap"))}</h3>
      <div class="guide-timeline">
        ${subject.modules.map((item, index) => `
          <article class="guide-step">
            <div class="guide-step-num">${index + 1}</div>
            <div>
              <div class="section-head">
                <div>
                  <span class="chip ${item.type === "lecture" ? "accent" : "amber"}">${esc(item.type)}</span>
                  <h3>${esc(loc(item.title))}</h3>
                </div>
                <span class="chip">${esc(item.pages)}p</span>
              </div>
              <p class="small muted">${esc(item.file || "")}</p>
              <div class="guide-columns">
                <div>
                  <h4>${esc(tr("labels.outcomes"))}</h4>
                  <ul>${(item.topics || []).map(topic => `<li>${esc(loc(topic))}</li>`).join("")}</ul>
                </div>
                <div>
                  <h4>${esc(tr("labels.practice"))}</h4>
                  ${(item.practice || []).length
                    ? `<ul>${item.practice.map(practice => `<li>${esc(loc(practice))}</li>`).join("")}</ul>`
                    : `<p class="muted small">${lang() === "ar" ? "راجع الملف وحوّله لأسئلة قصيرة." : "Review the file and convert it into short questions."}</p>`}
                </div>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderModuleList(subject, type) {
  const modules = type === "sheet"
    ? subject.modules.filter(item => item.type !== "lecture")
    : subject.modules.filter(item => item.type === "lecture");
  const fallback = type === "sheet" ? subject.modules.filter(item => item.practice?.length) : modules;
  const list = modules.length ? modules : fallback;
  return `<div class="module-grid">${list.map(renderModuleCard).join("")}</div>`;
}

function renderModuleCard(item) {
  const hasPdf = item.pdfData || item.pdfName;
  return `
    <article class="module-card">
      <div class="section-head">
        <div>
          <span class="chip ${item.type === "lecture" ? "accent" : "amber"}">${esc(item.type)}</span>
          <h3 style="margin-top:8px">${esc(loc(item.title))}</h3>
        </div>
        <span class="chip">${esc(item.pages)}p</span>
      </div>
      <p class="small muted">${esc(item.file || "")}</p>
      ${hasPdf ? `<a class="pdf-badge" ${item.pdfData ? 'href="' + item.pdfData + '" target="_blank"' : ''}>📄 ${esc(item.pdfName || "PDF")}</a>` : ""}
      <div class="file-upload-wrap" style="margin:8px 0">
        <div class="file-upload-btn">📎 ${lang() === "ar" ? "رفع PDF" : "Upload PDF"}</div>
        <input type="file" accept=".pdf" data-action="upload-module-pdf" data-module="${esc(item.id)}">
      </div>
      <h4>${esc(tr("labels.outcomes"))}</h4>
      <ul>${(item.topics || []).map(topic => `<li>${esc(loc(topic))}</li>`).join("")}</ul>
      ${(item.practice || []).length ? `<h4>${esc(tr("labels.practice"))}</h4><ul>${item.practice.map(practice => `<li>${esc(loc(practice))}</li>`).join("")}</ul>` : ""}
    </article>
  `;
}

function renderSubjectGrades(subject) {
  const sg = subjectGrade(subject);
  return `
    <div class="grid cols-3">
      ${renderMetric(`${sg.earned}/${sg.total}`, tr("labels.currentGrade"))}
      ${renderMetric(`${sg.percent}%`, tr("labels.percent"))}
      ${renderMetric(expectedGradeFromPercent(sg.percent), tr("labels.grade"))}
    </div>
    <div class="table-wrap" style="margin-top:14px">
      <table>
        <thead>
          <tr>
            <th>${esc(tr("labels.component"))}</th>
            <th>${esc(tr("labels.earned"))}</th>
            <th>${esc(tr("labels.total"))}</th>
            <th>${esc(tr("labels.percent"))}</th>
            <th>${esc(tr("labels.tasks"))}</th>
          </tr>
        </thead>
        <tbody>
          ${subject.gradeItems.map(item => {
            const percent = Number(item.total) ? Math.round((Number(item.earned) / Number(item.total)) * 100) : 0;
            return `
              <tr>
                <td><input data-grade-field="label" data-subject="${esc(subject.id)}" data-id="${esc(item.id)}" value="${esc(loc(item.label))}"></td>
                <td><input type="number" step="0.25" data-grade-field="earned" data-subject="${esc(subject.id)}" data-id="${esc(item.id)}" value="${esc(item.earned)}"></td>
                <td><input type="number" step="0.25" data-grade-field="total" data-subject="${esc(subject.id)}" data-id="${esc(item.id)}" value="${esc(item.total)}"></td>
                <td>${percent}%</td>
                <td><button class="delete-btn" data-action="delete-grade" data-subject="${esc(subject.id)}" data-id="${esc(item.id)}" type="button">x</button></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
    <form class="form-grid" data-form="add-grade" data-subject="${esc(subject.id)}" style="margin-top:10px">
      <input name="label" placeholder="${esc(tr("labels.component"))}" required>
      <input name="earned" type="number" step="0.25" placeholder="${esc(tr("labels.earned"))}" required>
      <input name="total" type="number" step="0.25" placeholder="${esc(tr("labels.total"))}" required>
      <button class="secondary-btn" type="submit">${esc(tr("buttons.add"))}</button>
    </form>
  `;
}

function renderAddSubjectTools() {
  const template = JSON.stringify(subjectTemplate(), null, 2);
  return `
    <div class="grid cols-2">
      <div class="panel" style="box-shadow:none">
        <h3>${esc(tr("labels.addSubject"))}</h3>
        <form class="form-grid" data-form="add-subject">
          <input name="name" placeholder="${lang() === "ar" ? "اسم المادة" : "Subject name"}" required>
          <input name="code" placeholder="${lang() === "ar" ? "كود المادة" : "Subject code"}">
          <input name="hours" type="number" min="1" value="3" placeholder="${esc(tr("labels.hours"))}">
          <button class="secondary-btn" type="submit">${esc(tr("buttons.add"))}</button>
        </form>
      </div>
      <div class="panel" style="box-shadow:none">
        <div class="section-head">
          <div>
            <h3>${esc(tr("labels.importSubject"))}</h3>
            <p class="small muted">${esc(tr("copy.importHelp"))}</p>
          </div>
          <button class="secondary-btn" data-action="fill-template" type="button">${esc(tr("buttons.template"))}</button>
        </div>
        <textarea id="subjectJsonInput" spellcheck="false" placeholder='${esc(template.slice(0, 120))}...'></textarea>
        <div class="inline-actions" style="margin-top:8px">
          <button class="primary-btn" data-action="import-subject-json" type="button">${esc(tr("buttons.import"))}</button>
          <div class="file-upload-wrap">
            <div class="file-upload-btn">📂 ${lang() === "ar" ? "اختر ملف JSON" : "Choose JSON file"}</div>
            <input id="subjectFileInput" type="file" accept="application/json,.json" aria-label="Import JSON subject file">
          </div>
        </div>
      </div>
    </div>
  `;
}

function subjectTemplate() {
  return {
    id: "custom-subject",
    tone: "indigo",
    code: "CUSTOM101",
    hours: 3,
    targetGrade: "A",
    name: { ar: "مادة جديدة", en: "New Subject" },
    exam: { date: "2026-06-20", time: { ar: "9 إلى 11", en: "9:00 AM - 11:00 AM" } },
    summary: { ar: "اكتب ملخص المادة هنا.", en: "Write the subject summary here." },
    strategy: { ar: "اكتب استراتيجية المذاكرة هنا.", en: "Write the study strategy here." },
    gradeItems: [{ id: "custom-current", label: { ar: "درجات حالية", en: "Current score" }, earned: 0, total: 50, note: { ar: "", en: "" } }],
    modules: [{ id: "custom-l1", type: "lecture", title: { ar: "Lecture 1", en: "Lecture 1" }, file: "Lecture 1.pdf", pages: 10, topics: [{ ar: "موضوع 1", en: "Topic 1" }], practice: [] }],
    tasks: [{ id: "custom-task-1", text: { ar: "أول مهمة", en: "First task" }, done: false }]
  };
}

function renderCgpa() {
  const result = calculateCgpa();
  const gradeOptions = Object.keys(gradePoints).map(grade => `<option value="${grade}">${grade} (${gradePoints[grade]})</option>`).join("");
  const isAr = lang() === "ar";
  return `
    <section class="grid cols-4">
      ${renderMetric(Number(state.cgpa.previousCgpa).toFixed(3), isAr ? "CGPA السابق" : "Previous CGPA")}
      <div class="metric"><strong id="cgpa-term-hours">${esc(result.totalTermHours)}</strong><span>${isAr ? "ساعات الفصول" : "Semester hours"}</span></div>
      <div class="metric"><strong id="cgpa-predicted-top">${esc(result.cumulative.toFixed(3))}</strong><span>${esc(tr("labels.predictedCgpa"))}</span></div>
      <div class="metric"><strong id="cgpa-total-hours">${esc(result.totalHours)}</strong><span>${isAr ? "إجمالي الساعات" : "Total hours"}</span></div>
    </section>
    <section class="panel" style="margin-top:14px">
      <div class="form-grid">
        <label>${isAr ? "CGPA السابق" : "Previous CGPA"}<input type="number" min="0" max="4" step="0.001" data-cgpa-root="previousCgpa" value="${esc(Number(state.cgpa.previousCgpa).toFixed(3))}"></label>
        <label>${isAr ? "الساعات المجتازة سابقاً" : "Previous hours"}<input type="number" min="0" step="1" data-cgpa-root="previousHours" value="${esc(state.cgpa.previousHours)}"></label>
      </div>
    </section>
    ${result.semesterResults.map((sem, semIdx) => {
      const semGpa = sem.gpa.toFixed(2);
      return `
      <section class="semester-card stagger-${Math.min(semIdx + 1, 6)}" style="margin-top:14px">
        <div class="semester-header">
          <h3>${esc(typeof sem.name === 'object' ? loc(sem.name) : sem.name)}</h3>
          <div class="semester-stats">
            <div class="semester-stat"><strong id="sem-gpa-${esc(sem.id)}">${semGpa}</strong><span>GPA</span></div>
            <div class="semester-stat"><strong id="sem-hours-${esc(sem.id)}">${sem.hours}</strong><span>${isAr ? "ساعات" : "Hours"}</span></div>
            <button class="delete-btn" data-action="delete-semester" data-id="${esc(sem.id)}" type="button" title="Delete semester">✕</button>
          </div>
        </div>
        <div class="semester-body">
          <div class="table-wrap">
            <table>
              <thead><tr><th>${isAr ? "إسم المقرر" : "Course"}</th><th>${esc(tr("labels.hours"))}</th><th>${isAr ? "التقدير" : "Grade"}</th><th>${isAr ? "النقاط" : "Points"}</th><th></th></tr></thead>
              <tbody>
                ${sem.courses.map(course => `
                  <tr>
                    <td><input data-cgpa-course="${esc(course.id)}" data-sem="${esc(sem.id)}" data-field="name" value="${esc(typeof course.name === 'object' ? loc(course.name) : course.name)}"></td>
                    <td><input type="number" min="0" step="1" data-cgpa-course="${esc(course.id)}" data-sem="${esc(sem.id)}" data-field="hours" value="${esc(course.hours)}" style="width:60px"></td>
                    <td><select data-cgpa-course="${esc(course.id)}" data-sem="${esc(sem.id)}" data-field="grade">${gradeOptions.replace('value="' + course.grade + '"', 'value="' + course.grade + '" selected')}</select></td>
                    <td><strong id="course-points-${esc(course.id)}">${((gradePoints[course.grade] || 0) * Number(course.hours || 0)).toFixed(2)}</strong></td>
                    <td><button class="delete-btn" data-action="delete-cgpa-course" data-id="${esc(course.id)}" data-sem="${esc(sem.id)}" type="button">✕</button></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          <form class="form-grid" data-form="add-cgpa-course" data-sem="${esc(sem.id)}" style="padding:12px 18px">
            <input name="name" placeholder="${isAr ? "مادة جديدة" : "New course"}" required>
            <input name="hours" type="number" min="1" step="1" value="3" required style="width:70px">
            <select name="grade">${gradeOptions}</select>
            <button class="secondary-btn" type="submit">${esc(tr("buttons.add"))}</button>
          </form>
        </div>
        <div class="semester-footer" id="sem-footer-${esc(sem.id)}">
          ${isAr ? "عدد الساعات المكتسبة" : "Earned hours"}: ${sem.hours}
        </div>
      </section>`;
    }).join("")}
    <section class="panel" style="margin-top:14px">
      <form class="form-grid" data-form="add-semester">
        <input name="name" placeholder="${isAr ? "اسم الفصل (مثلاً: خريف 2025)" : "Semester name (e.g. Fall 2025)"}" required>
        <button class="secondary-btn" type="submit">${isAr ? "أضف فصل جديد" : "Add semester"}</button>
      </form>
    </section>
    <section class="panel" style="margin-top:14px;text-align:center;padding:20px">
      <p class="muted">${isAr ? "المعدل التراكمي المتوقع" : "Predicted Cumulative GPA"}</p>
      <strong id="cgpa-predicted-bottom" style="font-size:2.6em;color:var(--accent)">${result.cumulative.toFixed(3)}</strong>
      <p id="cgpa-total-bottom" class="small muted" style="margin-top:6px">${isAr ? "إجمالي" : "Total"}: ${result.totalHours} ${isAr ? "ساعة" : "hours"} (${Number(state.cgpa.previousHours)} ${isAr ? "سابقة" : "previous"} + ${result.totalTermHours} ${isAr ? "جديدة" : "new"})</p>
    </section>
  `;
}

function dailyChallenge(langId) {
  const list = challengeBank[langId];
  const dayIndex = Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000);
  const shift = state.challengeShift[langId] || 0;
  return list[(dayIndex + shift) % list.length];
}

function challengeKey(langId, challengeId) {
  return `${new Date().toISOString().slice(0, 10)}-${langId}-${challengeId}`;
}

function renderCode() {
  const selected = state.languages.find(item => item.id === state.activeLanguageId) || state.languages[0];
  const tab = state.activeLanguageTab || "overview";
  const tabs = ["overview", "modules", "tasks"];
  return `
    <section class="panel hero language-hero">
      <div class="section-head">
        <div>
          <h2>${esc(tr("titles.code"))}</h2>
          <p class="muted">${esc(tr("copy.languageLead"))}</p>
        </div>
        <span class="chip accent">${esc(state.languages.length)} ${esc(tr("labels.languages"))}</span>
      </div>
      ${renderAddLanguageTools()}
    </section>

    <section class="learn-grid" style="margin-top:14px">
      <aside class="learn-sidebar">
        ${state.languages.map(language => renderLanguageCard(language, selected.id)).join("")}
      </aside>
      <article class="panel learn-panel">
        <div class="learn-title">
          <div>
            <span class="chip ${selected.tone || "accent"}">${esc(loc(selected.level))}</span>
            <h2>${esc(loc(selected.title))}</h2>
            <p class="muted">${esc(loc(selected.subtitle))}</p>
          </div>
          <span class="chip indigo">${taskCompletion(selected.tasks)}%</span>
        </div>
        <div class="tabs">
          ${tabs.map(item => `<button class="tab-btn ${tab === item ? "active" : ""}" data-action="language-tab" data-tab="${item}" type="button">${esc(tr(`labels.${item}`))}</button>`).join("")}
        </div>
        ${renderLanguageTab(selected, tab)}
      </article>
    </section>
  `;
}

function renderLanguageCard(language, activeId) {
  return `
    <button class="learn-card ${language.tone || ""} ${language.id === activeId ? "active" : ""}" data-action="select-language" data-id="${esc(language.id)}" type="button">
      <div>
        <strong>${esc(loc(language.title))}</strong>
        <p class="small muted">${esc(loc(language.subtitle))}</p>
      </div>
      <div class="progress" style="--value:${taskCompletion(language.tasks)}%"><span></span></div>
      <div class="subject-meta">
        <span class="chip">${esc(loc(language.level))}</span>
        <span class="chip accent">${taskCompletion(language.tasks)}%</span>
      </div>
    </button>
  `;
}

function renderLanguageTab(language, tab) {
  if (tab === "modules") {
    return `<div class="module-grid">${language.modules.map(renderLanguageModule).join("")}</div>`;
  }

  if (tab === "tasks") {
    return `
      ${renderTaskList(language.tasks, "language", language.id)}
      ${taskForm("add-language-task", language.id, lang() === "ar" ? "أضف خطوة في اللغة" : "Add a language step")}
    `;
  }

  const bankId = challengeBank[language.id] ? language.id : null;
  const challenge = bankId ? dailyChallenge(bankId) : null;
  const solved = challenge ? state.solvedChallenges[challengeKey(bankId, challenge.id)] : null;
  return `
    <div class="guide-layout">
      <div>
        <h3>${esc(tr("labels.overview"))}</h3>
        <p>${esc(loc(language.goal))}</p>
        <div class="callout">
          <strong>${esc(tr("labels.resources"))}</strong>
          <p>${esc((language.resources || []).join(" · "))}</p>
        </div>
        ${(function(){ var ln = loc(language.name); var lr = resources.filter(function(r){ return r.area === ln || r.area === "C++" && language.id === "cpp" || r.area === "JavaScript" && language.id === "js"; }); return lr.length ? '<div class="callout" style="margin-top:8px"><strong>' + (lang() === "ar" ? "روابط مفيدة" : "Useful Links") + '</strong><div style="margin-top:6px">' + lr.map(function(r){ return '<div class="resource-row"><a href="' + esc(r.url) + '" target="_blank" rel="noreferrer">' + esc(r.name) + '</a><p class="small muted">' + esc(loc(r.note)) + '</p></div>'; }).join("") + '</div></div>' : ""; })()}
        <h3>${esc(tr("labels.modules"))}</h3>
        <div class="module-strip">
          ${language.modules.map(item => `<span class="chip">${esc(loc(item.title))}</span>`).join("")}
        </div>
      </div>
      <aside class="challenge-card sticky-card">
        <span class="chip indigo">${esc(tr("labels.dailyChallenge"))}</span>
        ${challenge ? `
          <h3>${esc(challenge.title)}</h3>
          <p>${esc(loc(challenge.prompt))}</p>
          <pre class="code-box">${esc(challenge.code)}</pre>
          <div class="inline-actions">
            <button class="primary-btn" data-action="solve-challenge" data-lang="${esc(bankId)}" type="button" ${solved ? "disabled" : ""}>${esc(solved ? tr("buttons.solved") : tr("buttons.markDone"))}</button>
            <button class="secondary-btn" data-action="next-challenge" data-lang="${esc(bankId)}" type="button">${esc(tr("buttons.next"))}</button>
          </div>
        ` : `
          <h3>${lang() === "ar" ? "أضف تحديات لهذه اللغة قريبًا" : "Add challenges for this language soon"}</h3>
          <p class="muted">${lang() === "ar" ? "اللغة الجديدة تشتغل بنفس الستايل، والتحديات المخصصة ممكن تضيفها في نسخة JSON القادمة." : "New languages use the same style; custom challenge banks can be added in the next JSON version."}</p>
        `}
      </aside>
    </div>
  `;
}

function renderLanguageModule(item) {
  return `
    <article class="module-card">
      <div class="section-head">
        <div>
          <span class="chip accent">Module</span>
          <h3 style="margin-top:8px">${esc(loc(item.title))}</h3>
        </div>
      </div>
      <ul>${item.topics.map(topic => `<li>${esc(loc(topic))}</li>`).join("")}</ul>
      <pre class="code-box">${esc(item.code || "")}</pre>
    </article>
  `;
}

function renderAddLanguageTools() {
  return `
    <details class="import-box">
      <summary>${esc(tr("labels.addLanguage"))}</summary>
      <div class="grid cols-2" style="margin-top:12px">
        <div class="panel inset-panel">
          <h3>${esc(tr("labels.addLanguage"))}</h3>
          <form class="form-grid" data-form="add-language">
            <input name="title" placeholder="${lang() === "ar" ? "اسم اللغة" : "Language name"}" required>
            <input name="level" placeholder="${lang() === "ar" ? "المستوى" : "Level"}">
            <input name="resource" placeholder="${lang() === "ar" ? "مصدر أساسي" : "Main resource"}">
            <button class="secondary-btn" type="submit">${esc(tr("buttons.add"))}</button>
          </form>
        </div>
        <div class="panel inset-panel">
          <div class="section-head">
            <div>
              <h3>${esc(tr("labels.importLanguage"))}</h3>
              <p class="small muted">${esc(tr("copy.languageImportHelp"))}</p>
            </div>
            <button class="secondary-btn" data-action="fill-language-template" type="button">${esc(tr("buttons.template"))}</button>
          </div>
          <textarea id="languageJsonInput" spellcheck="false" placeholder='${esc(JSON.stringify(languageTemplate(), null, 2).slice(0, 130))}...'></textarea>
          <div class="inline-actions" style="margin-top:8px">
            <button class="primary-btn" data-action="import-language-json" type="button">${esc(tr("buttons.import"))}</button>
            <div class="file-upload-wrap">
              <div class="file-upload-btn">\u{1F4C2} ${lang() === "ar" ? "\u0627\u062e\u062a\u0631 \u0645\u0644\u0641 JSON" : "Choose JSON file"}</div>
              <input id="languageFileInput" type="file" accept="application/json,.json" aria-label="Import JSON language file">
            </div>
          </div>
        </div>
      </div>
    </details>
  `;
}

function languageTemplate() {
  return {
    id: "python",
    tone: "accent",
    title: { ar: "Python", en: "Python" },
    subtitle: { ar: "أساسيات ثم automation", en: "Fundamentals then automation" },
    level: { ar: "Beginner", en: "Beginner" },
    goal: { ar: "اكتب scripts مفيدة", en: "Write useful scripts" },
    resources: ["Python docs", "freeCodeCamp"],
    modules: [
      {
        id: "python-m1",
        title: { ar: "Basics", en: "Basics" },
        topics: [{ ar: "variables", en: "variables" }, { ar: "loops", en: "loops" }],
        code: "name = input('Name: ')\nprint(f'Hello {name}')"
      }
    ],
    tasks: [{ id: "python-task-1", text: { ar: "اكتب أول script", en: "Write the first script" }, done: false }]
  };
}

function renderCyber() {
  return `
    <section class="panel hero">
      <h2>${esc(tr("titles.cyber"))}</h2>
      <p class="muted">${lang() === "ar" ? "المسار مبني على progress ظاهر: كل room/lab يتحول لإنجاز." : "The path is built around visible progress: every room/lab becomes an achievement."}</p>
    </section>
    <section class="grid cols-3" style="margin-top:14px">
      ${state.cyber.map(phase => `
        <article class="panel">
          <div class="section-head"><div><h2>${esc(loc(phase.title))}</h2><p class="muted">${esc(loc(phase.period))}</p></div><span class="chip">${taskCompletion(phase.tasks)}%</span></div>
          ${renderTaskList(phase.tasks, "cyber", phase.id)}
          ${taskForm("add-cyber-task", phase.id, lang() === "ar" ? "أضف خطوة Cyber" : "Add a cyber step")}
        </article>
      `).join("")}
    </section>
    <section class="panel" style="margin-top:14px">
      <h2>${esc(tr("labels.resources"))}</h2>
      <div class="grid cols-2">${resources.filter(r => r.area === "Cyber").map(resource => `<div class="resource-row"><div><a href="${esc(resource.url)}" target="_blank" rel="noreferrer">${esc(resource.name)}</a><p class="small muted">${esc(loc(resource.note))}</p></div><span class="chip">${esc(resource.area)}</span></div>`).join("")}</div>
    </section>
  `;
}

function renderTools() {
  const result = calculateCgpa();
  const cvCount = completedItems().length;
  const cards = [
    {
      route: "cgpa",
      title: tr("titles.cgpa"),
      meta: `${result.cumulative.toFixed(3)} CGPA`,
      text: lang() === "ar" ? "حاسبة دقيقة بثلاث خانات عشرية وسيناريوهات تقديرات." : "Precise three-decimal calculator and grade scenarios."
    },
    {
      route: "focus",
      title: tr("titles.focus"),
      meta: `${state.focusSessions} sessions`,
      text: lang() === "ar" ? "To-do وFocus timer وجلسات مذاكرة محفوظة." : "To-do, focus timer, and saved study sessions."
    },
    {
      route: "projects",
      title: tr("titles.projects"),
      meta: `${state.projects.length} projects`,
      text: lang() === "ar" ? "مشاريعك وروابط GitHub وحالة كل مشروع." : "Projects, GitHub links, and status tracking."
    },
    {
      route: "cv",
      title: tr("titles.cv"),
      meta: `${cvCount} items`,
      text: lang() === "ar" ? "كل إنجاز محفوظ من المهام والتحديات والمشاريع." : "Achievements from tasks, challenges, and projects."
    },
    {
      route: "history",
      title: lang() === "ar" ? "سجل النشاط" : "Activity Log",
      meta: "Daily tracking",
      text: lang() === "ar" ? "تقرير يومي باللي خلصته واللي مخلصتوش في الخطة." : "A daily report of what you finished and what you didn't in your plan."
    },
    {
      route: "globalTasks",
      title: lang() === "ar" ? "المهام المتبقية" : "Master To-Do",
      meta: "All pending tasks",
      text: lang() === "ar" ? "عرض شامل لكل اللي لسه مخلصتوش في المواد والبرمجة والخطة." : "A complete view of every unfinished task in subjects, code, and plan."
    }
  ];
  return `
    <section class="panel hero">
      <div class="section-head">
        <div>
          <h2>${esc(tr("titles.tools"))}</h2>
          <p class="muted">${esc(tr("copy.toolsLead"))}</p>
        </div>
      </div>
      <div class="tool-grid">
        ${cards.map(card => `
          <button class="tool-card" data-route="${card.route}" type="button">
            <span class="chip accent">${esc(card.meta)}</span>
            <strong>${esc(card.title)}</strong>
            <p>${esc(card.text)}</p>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function formatTimer(seconds) {
  return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

function renderFocus() {
  return `
    <section class="grid cols-2">
      <article class="panel">
        <div class="section-head"><div><h2>Focus Timer</h2><p class="muted">50/10</p></div><span class="chip">${state.focusSessions}</span></div>
        <div class="timer"><div><strong id="timerText">${formatTimer(state.focusSeconds)}</strong><div class="inline-actions" style="justify-content:center;margin-top:14px"><button class="primary-btn" data-action="timer-start" type="button">${esc(tr("buttons.start"))}</button><button class="secondary-btn" data-action="timer-pause" type="button">${esc(tr("buttons.pause"))}</button><button class="secondary-btn" data-action="timer-reset" type="button">${esc(tr("buttons.resetTimer"))}</button><button class="secondary-btn" data-action="timer-complete" type="button">${esc(tr("buttons.saveSession"))}</button></div></div></div>
      </article>
      <article class="panel">
        <div class="section-head"><div><h2>To-do</h2><p class="muted">${lang() === "ar" ? "أي حاجة خارج جدول المواد." : "Anything outside the subject plan."}</p></div><span class="chip">${taskCompletion(state.todos)}%</span></div>
        ${renderTaskList(state.todos, "todo", "")}
        ${taskForm("add-todo", "", lang() === "ar" ? "مهمة جديدة" : "New task")}
      </article>
    </section>
  `;
}

function renderProjects() {
  return `
    <section class="panel">
      <h2>${esc(tr("titles.projects"))}</h2>
      <form class="form-grid" data-form="add-project">
        <input name="title" placeholder="${lang() === "ar" ? "اسم المشروع" : "Project title"}" required>
        <input name="stack" placeholder="Stack">
        <input name="link" placeholder="GitHub / Demo">
        <button class="secondary-btn" type="submit">${esc(tr("buttons.add"))}</button>
      </form>
    </section>
    <section class="grid cols-3" style="margin-top:14px">
      ${state.projects.map(project => `
        <article class="project-card">
          <div class="section-head"><div><h3>${esc(project.title)}</h3><p class="small muted">${esc(project.stack)}</p></div><button class="delete-btn" data-action="delete-project" data-id="${esc(project.id)}" type="button">x</button></div>
          <p>${esc(loc(project.notes))}</p>
          ${project.link ? `<a href="${esc(project.link)}" target="_blank" rel="noreferrer">${esc(project.link)}</a>` : ""}
          <select data-project-status="${esc(project.id)}">${["planned", "in-progress", "done"].map(status => `<option value="${status}" ${project.status === status ? "selected" : ""}>${status}</option>`).join("")}</select>
        </article>
      `).join("")}
    </section>
  `;
}

function renderCv() {
  const items = completedItems();
  const grouped = items.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});
  
  const isAr = lang() === "ar";
  const profile = state.profile || { name: "Ahmed", title: "Cyber Security & Software Engineer", email: "ahmed@example.com", summary: "Aspiring cyber security professional." };

  return `
    <div class="cv-header">
      <h1 contenteditable="true" data-action="update-profile" data-field="name">${esc(profile.name)}</h1>
      <p contenteditable="true" data-action="update-profile" data-field="title" style="font-weight: 600; color: var(--accent);">${esc(profile.title)}</p>
      <p contenteditable="true" data-action="update-profile" data-field="email">${esc(profile.email)}</p>
      <div style="max-width: 800px; margin: 20px auto 0; line-height: 1.6;">
        <p contenteditable="true" data-action="update-profile" data-field="summary" class="muted">${esc(profile.summary)}</p>
      </div>
      <p class="small muted" style="margin-top: 15px;">${isAr ? "(اضغط على أي نص فوق لتعديله - بيتحفظ تلقائي)" : "(Click any text above to edit - saves automatically)"}</p>
    </div>

    <div class="cv-section">
      <h2>${isAr ? "المشاريع التقنية" : "Technical Projects"}</h2>
      <div class="cv-grid">
        ${state.projects.filter(p => p.status === "done").map(project => `
          <div class="cv-card">
            <h3>${esc(project.title)}</h3>
            <p class="accent" style="margin-bottom: 8px; font-weight: 600;">${esc(project.stack)}</p>
            <p>${esc(loc(project.notes))}</p>
            ${project.link ? `<a href="${esc(project.link)}" target="_blank" class="small" style="display: block; margin-top: 10px; text-decoration: underline;">${isAr ? "رابط المشروع" : "Project Link"}</a>` : ""}
          </div>
        `).join("")}
      </div>
    </div>

    ${Object.entries(grouped).map(([type, list]) => `
      <div class="cv-section">
        <h2>${esc(type)}</h2>
        <div class="cv-grid">
          ${list.map(item => `
            <div class="cv-card" style="border-left-color: var(--indigo);">
              <h3>${esc(item.title)}</h3>
              <p>${esc(item.source)}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("")}

    ${items.length === 0 && state.projects.filter(p => p.status === "done").length === 0 ? `
      <div class="panel hero" style="text-align: center; margin-top: 20px;">
        <h2>${isAr ? "لسه مفيش إنجازات تقنية" : "No technical achievements yet"}</h2>
        <p class="muted">${isAr ? "خلص مهام في لغات البرمجة أو الـ Cyber عشان تظهر هنا." : "Complete tasks in Programming or Cyber tracks to see them here."}</p>
      </div>
    ` : ""}
  `;
}

function renderHistory() {
  const isAr = lang() === "ar";
  const today = getLocalTodayId();
  const relevantDays = activePlan().days.filter(day => day.id <= today);
  
  // Get all tasks that are NOT in the daily plan to find "Extra" achievements
  const planTaskIds = new Set(activePlan().days.flatMap(d => d.tasks.map(t => t.id)));
  const extraTasks = allTaskGroups().flatMap(g => g.tasks.filter(t => t.doneAt && !planTaskIds.has(t.id)));

  return `
    <section class="panel hero">
      <div class="section-head">
        <div>
          <h2>${isAr ? "سجل النشاط الشامل" : "Comprehensive Activity Log"}</h2>
          <p class="muted">${isAr ? "تقرير يومي بالخطة، المواد، والبرمجة." : "A daily report of plan, subjects, and programming."}</p>
        </div>
        <span class="chip accent">${relevantDays.length} ${isAr ? "أيام" : "Days"}</span>
      </div>
    </section>

    <div style="margin-top: 20px;">
      ${relevantDays.slice().reverse().map(day => {
        const doneCount = day.tasks.filter(t => t.done).length;
        const totalCount = day.tasks.length;
        const allDone = doneCount === totalCount && totalCount > 0;
        const hasMissed = doneCount < totalCount && day.id < today;
        
        const extraForThisDay = extraTasks.filter(t => t.doneAt === day.id);
        
        return `
          <div class="history-day ${allDone ? 'all-done' : ''} ${hasMissed ? 'has-missed' : ''}">
            <div class="history-header">
              <div>
                <strong style="font-size: 1.1em;">${esc(loc(day.date))}</strong>
                <p class="small muted">${esc(loc(day.title))}</p>
              </div>
              <span class="chip ${allDone ? 'green' : hasMissed ? 'red' : 'indigo'}">
                ${doneCount}/${totalCount} ${isAr ? "الخطة" : "Plan"}
                ${extraForThisDay.length > 0 ? ` + ${extraForThisDay.length} ${isAr ? "إضافي" : "Extra"}` : ""}
              </span>
            </div>
            
            <div class="history-list">
              <p class="small muted" style="margin-bottom: 8px; border-bottom: 1px solid var(--line); padding-bottom: 4px;">${isAr ? "مهام الخطة" : "Plan Tasks"}</p>
              ${day.tasks.map(task => `
                <div class="history-item ${task.done ? 'done' : 'missed'}">
                  <div class="status-dot"></div>
                  <span>${esc(loc(task.text))}</span>
                </div>
              `).join("")}
              
              ${extraForThisDay.length > 0 ? `
                <p class="small muted" style="margin-top: 15px; margin-bottom: 8px; border-bottom: 1px solid var(--line); padding-bottom: 4px; color: var(--accent);">${isAr ? "إنجازات إضافية (مواد/برمجة)" : "Extra Achievements (Subjects/Code)"}</p>
                ${extraForThisDay.map(task => `
                  <div class="history-item done">
                    <div class="status-dot" style="background: var(--accent);"></div>
                    <span style="color: var(--accent); font-weight: 600;">${esc(loc(task.text))}</span>
                  </div>
                `).join("")}
              ` : ""}
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderGlobalTasks() {
  const isAr = lang() === "ar";
  const query = (state.globalSearch || "").toLowerCase();
  const tab = state.globalTasksTab || "pending";
  
  const allGroups = allTaskGroups();
  const allTasks = allGroups.flatMap(g => g.tasks.map(t => ({ ...t, groupType: g.type, groupSource: g.source, scope: g.scope, parent: g.parent })));
  
  const filtered = allTasks.filter(t => loc(t.text).toLowerCase().includes(query) || t.groupSource.toLowerCase().includes(query));
  const pending = filtered.filter(t => !t.done);
  const completed = filtered.filter(t => t.done);
  
  const totalCount = allTasks.length;
  const doneCount = allTasks.filter(t => t.done).length;
  const progress = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  return `
    <section class="panel hero">
      <div class="section-head">
        <div>
          <h2>${isAr ? "مركز المهام الشامل" : "Global Task Center"}</h2>
          <p class="muted">${isAr ? "تحكم كامل في كل مهام المشروع." : "Complete control over all project tasks."}</p>
        </div>
      </div>
      <div class="progress" style="--value:${progress}%; height: 10px; margin-top: 15px;"><span></span></div>
      <p class="small muted" style="margin-top: 5px;">${isAr ? "إجمالي الإنجاز" : "Overall progress"}: ${progress}%</p>
    </section>

    <div class="panel" style="margin-top: 14px;">
      <input type="text" class="search-input" placeholder="${isAr ? "بحث..." : "Search..."}" value="${esc(state.globalSearch)}" data-action="global-search" style="width: 100%; padding: 12px; border-radius: var(--radius); border: 1px solid var(--line); background: var(--surface); color: var(--ink);">
    </div>

    <div class="tabs" style="margin-top: 14px; display: flex; gap: 10px;">
      <button class="tab-btn ${tab === 'pending' ? 'active' : ''}" data-action="set-global-tab" data-tab="pending" style="flex: 1; padding: 12px; border-radius: var(--radius); font-weight: 600; cursor: pointer; border: none; background: ${tab === 'pending' ? 'var(--accent)' : 'var(--surface)'}; color: ${tab === 'pending' ? 'white' : 'var(--ink)'};">
        ${isAr ? "قيد العمل" : "Still Working"} (${pending.length})
      </button>
      <button class="tab-btn ${tab === 'completed' ? 'active' : ''}" data-action="set-global-tab" data-tab="completed" style="flex: 1; padding: 12px; border-radius: var(--radius); font-weight: 600; cursor: pointer; border: none; background: ${tab === 'completed' ? 'var(--green)' : 'var(--surface)'}; color: ${tab === 'completed' ? 'white' : 'var(--ink)'};">
        ${isAr ? "المهام المكتملة" : "Finished"} (${completed.length})
      </button>
    </div>

    <div id="global-tasks-results" style="margin-top: 14px;">
      ${renderGlobalTaskList(pending, completed, tab)}
    </div>
  `;
}

function renderGlobalTaskList(pending, completed, tab) {
  const isAr = lang() === "ar";
  const list = tab === "pending" ? pending : completed;
  
  return list.length > 0 ? list.map(task => renderGlobalTaskItem(task)).join("") : `
    <div class="panel" style="text-align: center; padding: 40px;">
      <h2>${isAr ? "مفيش مهام في القائمة دي" : "No tasks in this list"}</h2>
      <p class="muted">${isAr ? "استخدم البحث أو غير التبويب." : "Use search or switch tabs."}</p>
    </div>
  `;
}

function renderGlobalTaskItem(task) {
  return `
    <div class="panel" style="margin-bottom: 10px; padding: 12px 20px; opacity: ${task.done ? 0.6 : 1}">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 15px;">
          <input type="checkbox" data-action="toggle-task" data-scope="${esc(task.scope)}" data-parent="${esc(task.parent)}" data-id="${esc(task.id)}" ${task.done ? "checked" : ""} style="width: 20px; height: 20px; cursor: pointer;">
          <div>
            <strong style="${task.done ? 'text-decoration: line-through;' : ''}">${esc(loc(task.text))}</strong>
            <p class="small muted">${esc(task.groupType)} · ${esc(task.groupSource)}</p>
          </div>
        </div>
        <span class="chip">${esc(task.groupType)}</span>
      </div>
    </div>
  `;
}

function updateGlobalTasksDOM() {
  if (getRoute() !== "globalTasks") return;
  const query = (state.globalSearch || "").toLowerCase();
  const tab = state.globalTasksTab || "pending";
  
  const allGroups = allTaskGroups();
  const allTasks = allGroups.flatMap(g => g.tasks.map(t => ({ ...t, groupType: g.type, groupSource: g.source, scope: g.scope, parent: g.parent })));
  const filtered = allTasks.filter(t => loc(t.text).toLowerCase().includes(query) || t.groupSource.toLowerCase().includes(query));
  const pending = filtered.filter(t => !t.done);
  const completed = filtered.filter(t => t.done);
  
  const resultsDiv = document.getElementById("global-tasks-results");
  if (resultsDiv) {
    resultsDiv.innerHTML = renderGlobalTaskList(pending, completed, tab);
  }
}

function render() {
  const route = getRoute();
  state.route = route;
  applyPreferences();
  renderNav(route);
  document.getElementById("pageTitle").textContent = tr(`titles.${route}`);
  const views = { dashboard: renderDashboard, plan: renderPlan, subjects: renderSubjects, code: renderCode, cyber: renderCyber, tools: renderTools, cgpa: renderCgpa, focus: renderFocus, projects: renderProjects, cv: renderCv, history: renderHistory, globalTasks: renderGlobalTasks };
  document.getElementById("app").innerHTML = views[route]();
  saveState();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function findTask(scope, parent, id) {
  if (scope === "day") return activePlan().days.find(item => item.id === parent)?.tasks.find(task => task.id === id);
  if (scope === "subject") return state.subjects.find(item => item.id === parent)?.tasks.find(task => task.id === id);
  if (scope === "language") return state.languages.find(item => item.id === parent)?.tasks.find(task => task.id === id);
  if (scope === "track") return state.tracks.find(item => item.id === parent)?.tasks.find(task => task.id === id);
  if (scope === "cyber") return state.cyber.find(item => item.id === parent)?.tasks.find(task => task.id === id);
  if (scope === "todo") return state.todos.find(task => task.id === id);
  return null;
}

function deleteTask(scope, parent, id) {
  if (scope === "day") activePlan().days.find(item => item.id === parent).tasks = activePlan().days.find(item => item.id === parent).tasks.filter(task => task.id !== id);
  if (scope === "subject") state.subjects.find(item => item.id === parent).tasks = state.subjects.find(item => item.id === parent).tasks.filter(task => task.id !== id);
  if (scope === "language") state.languages.find(item => item.id === parent).tasks = state.languages.find(item => item.id === parent).tasks.filter(task => task.id !== id);
  if (scope === "track") state.tracks.find(item => item.id === parent).tasks = state.tracks.find(item => item.id === parent).tasks.filter(task => task.id !== id);
  if (scope === "cyber") state.cyber.find(item => item.id === parent).tasks = state.cyber.find(item => item.id === parent).tasks.filter(task => task.id !== id);
  if (scope === "todo") state.todos = state.todos.filter(task => task.id !== id);
}

function addTask(scope, parent, textValue, recurrence = 0) {
  const task = { 
    id: uid(scope), 
    text: txt(textValue, textValue), 
    done: false, 
    recurrence: parseInt(recurrence) || 0,
    lastDoneDate: null 
  };
  if (scope === "day") activePlan().days.find(item => item.id === parent)?.tasks.push(task);
  if (scope === "subject") state.subjects.find(item => item.id === parent)?.tasks.push(task);
  if (scope === "language") state.languages.find(item => item.id === parent)?.tasks.push(task);
  if (scope === "track") state.tracks.find(item => item.id === parent)?.tasks.push(task);
  if (scope === "cyber") state.cyber.find(item => item.id === parent)?.tasks.push(task);
  if (scope === "todo") state.todos.push(task);
}

function importSubjectObject(subject) {
  if (!subject || !subject.id || !subject.name) throw new Error("Invalid subject");
  subject.gradeItems = subject.gradeItems || [];
  subject.modules = subject.modules || [];
  subject.tasks = subject.tasks || [];
  const exists = state.subjects.findIndex(item => item.id === subject.id);
  if (exists >= 0) state.subjects[exists] = subject;
  else state.subjects.push(subject);
  state.activeSubjectId = subject.id;
  state.activeSubjectTab = "overview";
}

function importLanguageObject(language) {
  if (!language || !language.id || !language.title) throw new Error("Invalid language");
  language.modules = language.modules || [];
  language.tasks = language.tasks || [];
  language.resources = language.resources || [];
  const exists = state.languages.findIndex(item => item.id === language.id);
  if (exists >= 0) state.languages[exists] = language;
  else state.languages.push(language);
  state.activeLanguageId = language.id;
  state.activeLanguageTab = "overview";
}

document.addEventListener("click", async event => {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    window.location.hash = routeButton.dataset.route;
    return;
  }

  const actionEl = event.target.closest("[data-action]");
  if (!actionEl) return;
  const action = actionEl.dataset.action;

  if (action === "toggle-theme") {
    state.settings.theme = state.settings.theme === "dark" ? "light" : "dark";
    render();
  }

  if (action === "toggle-lang") {
    state.settings.lang = lang() === "ar" ? "en" : "ar";
    render();
  }

  if (action === "reset-demo" && confirm(tr("copy.resetConfirm"))) {
    state = createDefaultState();
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
    window.location.hash = "dashboard";
    render();
  }

  if (action === "export-data") {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ahmed-command-center-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (action === "select-subject") {
    state.activeSubjectId = actionEl.dataset.id;
    state.activeSubjectTab = "overview";
    render();
  }

  if (action === "subject-tab") {
    state.activeSubjectTab = actionEl.dataset.tab;
    render();
  }

  if (action === "select-language") {
    state.activeLanguageId = actionEl.dataset.id;
    state.activeLanguageTab = "overview";
    render();
  }

  if (action === "language-tab") {
    state.activeLanguageTab = actionEl.dataset.tab;
    render();
  }

  if (action === "delete-task") {
    deleteTask(actionEl.dataset.scope, actionEl.dataset.parent, actionEl.dataset.id);
    render();
  }

  if (action === "delete-grade") {
    const subject = state.subjects.find(item => item.id === actionEl.dataset.subject);
    subject.gradeItems = subject.gradeItems.filter(item => item.id !== actionEl.dataset.id);
    render();
  }

  if (action === "delete-cgpa-course") {
    const semId = actionEl.dataset.sem;
    const semester = state.cgpa.semesters.find(s => s.id === semId);
    if (semester) {
      semester.courses = semester.courses.filter(course => course.id !== actionEl.dataset.id);
    }
    render();
  }

  if (action === "delete-semester") {
    state.cgpa.semesters = state.cgpa.semesters.filter(s => s.id !== actionEl.dataset.id);
    render();
  }


  if (action === "fill-template") {
    document.getElementById("subjectJsonInput").value = JSON.stringify(subjectTemplate(), null, 2);
  }

  if (action === "fill-language-template") {
    document.getElementById("languageJsonInput").value = JSON.stringify(languageTemplate(), null, 2);
  }

  if (action === "import-subject-json") {
    try {
      importSubjectObject(JSON.parse(document.getElementById("subjectJsonInput").value));
      showToast(tr("copy.imported"));
      render();
    } catch {
      showToast(tr("copy.invalidJson"));
    }
  }

  if (action === "import-language-json") {
    try {
      importLanguageObject(JSON.parse(document.getElementById("languageJsonInput").value));
      showToast(tr("copy.imported"));
      render();
    } catch {
      showToast(tr("copy.invalidJson"));
    }
  }

  if (action === "solve-challenge") {
    const langId = actionEl.dataset.lang;
    const item = dailyChallenge(langId);
    state.solvedChallenges[challengeKey(langId, item.id)] = { title: item.title, lang: langId.toUpperCase(), date: new Date().toISOString().slice(0, 10) };
    showToast(tr("copy.cvSaved"));
    render();
  }

  if (action === "next-challenge") {
    const langId = actionEl.dataset.lang;
    state.challengeShift[langId] = (state.challengeShift[langId] || 0) + 1;
    render();
  }

  if (action === "toggle-game-budget") {
    state.gameBudgetDone = !state.gameBudgetDone;
    render();
  }

  if (action === "set-global-tab") {
    state.globalTasksTab = actionEl.dataset.tab;
    render();
  }

  if (action === "set-plan-tab") {
    state.planTab = actionEl.dataset.tab;
    render();
  }

  if (action === "select-plan") {
    state.activePlanId = actionEl.dataset.id;
    if (state.activePlanId !== 'finals') state.planTab = 'roadmap';
    render();
  }

  if (action === "create-new-plan") {
    const name = await ask(lang() === "ar" ? "اسم الخطة الجديدة:" : "New Plan Name:");
    if (!name) return;
    const id = "plan-" + Date.now();
    state.plans.push({
      id: id,
      name: { ar: name, en: name },
      days: []
    });
    state.activePlanId = id;
    saveState();
    render();
  }

  if (action === "delete-plan") {
    if (await confirmAction(lang() === "ar" ? "هل أنت متأكد من حذف هذه الخطة بالكامل؟" : "Are you sure you want to delete this entire plan?")) {
      state.plans = state.plans.filter(p => p.id !== actionEl.dataset.id);
      if (state.activePlanId === actionEl.dataset.id) {
        state.activePlanId = state.plans[0].id;
      }
      saveState();
      render();
    }
  }

  if (action === "add-new-day") {
    const isAr = lang() === "ar";
    const dateStr = await ask(isAr ? "دخل التاريخ (YYYY-MM-DD):" : "Enter date (YYYY-MM-DD):", new Date().toISOString().slice(0, 10));
    if (!dateStr) return;
    
    const title = await ask(isAr ? "دخل عنوان اليوم (مثلاً: مذاكرة مادة X):" : "Enter day title (e.g., Study Subject X):");
    if (!title) return;

    const plan = activePlan();
    if (plan.days.find(d => d.id === dateStr)) {
      showCustomModal({ title: isAr ? "خطأ" : "Error", message: isAr ? "اليوم ده موجود فعلاً!" : "This day already exists!", type: 'alert' });
      return;
    }

    plan.days.push({
      id: dateStr,
      date: { ar: dateStr, en: dateStr },
      title: { ar: title, en: title },
      tasks: []
    });
    plan.days.sort((a, b) => new Date(a.id) - new Date(b.id));
    saveState();
    render();
  }

  if (action === "delete-day") {
    if (await confirmAction(tr("resetConfirm"))) {
      const plan = activePlan();
      plan.days = plan.days.filter(d => d.id !== actionEl.dataset.id);
      saveState();
      render();
    }
  }

  if (action === "timer-start" && !timerInterval) {
    timerInterval = window.setInterval(() => {
      state.focusSeconds = Math.max(0, state.focusSeconds - 1);
      const timerText = document.getElementById("timerText");
      if (timerText) timerText.textContent = formatTimer(state.focusSeconds);
      if (state.focusSeconds === 0) {
        window.clearInterval(timerInterval);
        timerInterval = null;
      }
      saveState();
    }, 1000);
  }

  if (action === "timer-pause") {
    window.clearInterval(timerInterval);
    timerInterval = null;
  }

  if (action === "timer-reset") {
    state.focusSeconds = 50 * 60;
    render();
  }

  if (action === "timer-complete") {
    state.focusSessions += 1;
    state.focusSeconds = 50 * 60;
    state.todos.push({ id: uid("session"), text: txt(`جلسة تركيز ${state.focusSessions}`, `Focus session ${state.focusSessions}`), done: true });
    showToast(tr("copy.sessionDone"));
    render();
  }

  if (action === "delete-project") {
    state.projects = state.projects.filter(project => project.id !== actionEl.dataset.id);
    render();
  }
});

function updateCgpaDOM() {
  if (getRoute() !== "cgpa") return;
  const result = calculateCgpa();
  
  const termHours = document.getElementById("cgpa-term-hours");
  if (termHours) termHours.textContent = result.totalTermHours;
  
  const predictedTop = document.getElementById("cgpa-predicted-top");
  if (predictedTop) predictedTop.textContent = result.cumulative.toFixed(3);
  
  const totalHours = document.getElementById("cgpa-total-hours");
  if (totalHours) totalHours.textContent = result.totalHours;
  
  const predictedBottom = document.getElementById("cgpa-predicted-bottom");
  if (predictedBottom) predictedBottom.textContent = result.cumulative.toFixed(3);
  
  const totalBottom = document.getElementById("cgpa-total-bottom");
  if (totalBottom) totalBottom.textContent = `${lang() === "ar" ? "إجمالي" : "Total"}: ${result.totalHours} ${lang() === "ar" ? "ساعة" : "hours"} (${Number(state.cgpa.previousHours)} ${lang() === "ar" ? "سابقة" : "previous"} + ${result.totalTermHours} ${lang() === "ar" ? "جديدة" : "new"})`;

  result.semesterResults.forEach(sem => {
    const semGpa = document.getElementById(`sem-gpa-${sem.id}`);
    if (semGpa) semGpa.textContent = sem.gpa.toFixed(2);
    
    const semHours = document.getElementById(`sem-hours-${sem.id}`);
    if (semHours) semHours.textContent = sem.hours;
    
    const semFooter = document.getElementById(`sem-footer-${sem.id}`);
    if (semFooter) semFooter.textContent = `${lang() === "ar" ? "عدد الساعات المكتسبة" : "Earned hours"}: ${sem.hours}`;

    sem.courses.forEach(course => {
      const coursePoints = document.getElementById(`course-points-${course.id}`);
      if (coursePoints) coursePoints.textContent = ((gradePoints[course.grade] || 0) * Number(course.hours || 0)).toFixed(2);
    });
  });
}

document.addEventListener("change", async event => {
  const taskBox = event.target.closest('[data-action="toggle-task"]');
  if (taskBox) {
    const task = findTask(taskBox.dataset.scope, taskBox.dataset.parent, taskBox.dataset.id);
    if (task) {
      task.done = taskBox.checked;
      if (task.done) {
        task.doneAt = new Date().toISOString().slice(0, 10);
      } else {
        delete task.doneAt;
      }
      
      // If task is marked done and it's from a technical track (not subject/plan)
      // ask if it should be added to CV
      const technicalScopes = ["cyber", "language", "track"];
      if (task.done && technicalScopes.includes(taskBox.dataset.scope)) {
        if (await confirmAction(tr("copy.addToCv"))) {
          task.inCv = true;
          showToast(tr("copy.cvSaved"));
        } else {
          task.inCv = false;
          showToast(tr("copy.saved"));
        }
      } else {
        showToast(task.done ? tr("copy.saved") : tr("copy.saved"));
      }
      
      saveState();
      render();
    }
    return;
  }

  const gradeField = event.target.closest("[data-grade-field]");
  if (gradeField) {
    const subject = state.subjects.find(item => item.id === gradeField.dataset.subject);
    const item = subject?.gradeItems.find(gradeItem => gradeItem.id === gradeField.dataset.id);
    if (item) {
      const field = gradeField.dataset.gradeField;
      if (field === "label") item.label = txt(gradeField.value, gradeField.value);
      else item[field] = Number(gradeField.value);
      render();
    }
    return;
  }

  const cgpaRoot = event.target.closest("[data-cgpa-root]");
  if (cgpaRoot) {
    state.cgpa[cgpaRoot.dataset.cgpaRoot] = Number(cgpaRoot.value);
    saveState();
    if (typeof updateCgpaDOM === "function") updateCgpaDOM();
    return;
  }

  const cgpaCourse = event.target.closest("[data-cgpa-course]");
  if (cgpaCourse) {
    const semId = cgpaCourse.dataset.sem;
    const semester = state.cgpa.semesters.find(s => s.id === semId);
    const course = semester?.courses.find(item => item.id === cgpaCourse.dataset.cgpaCourse);
    if (course) {
      const field = cgpaCourse.dataset.field;
      course[field] = field === "hours" ? Number(cgpaCourse.value) : field === "name" ? txt(cgpaCourse.value, cgpaCourse.value) : cgpaCourse.value;
      saveState();
      if (typeof updateCgpaDOM === "function") updateCgpaDOM();
    }
    return;
  }

  const projectStatus = event.target.closest("[data-project-status]");
  if (projectStatus) {
    const project = state.projects.find(item => item.id === projectStatus.dataset.projectStatus);
    if (project) {
      project.status = projectStatus.value;
      showToast(project.status === "done" ? tr("copy.cvSaved") : tr("copy.saved"));
      render();
    }
    return;
  }

  const targetSelect = event.target.closest("[data-action='change-target']");
  if (targetSelect) {
    const subject = state.subjects.find(s => s.id === targetSelect.dataset.id);
    if (subject) {
      subject.targetGrade = targetSelect.value;
      saveState();
      document.querySelectorAll(`[data-action='change-target'][data-id='${subject.id}']`).forEach(el => {
        el.value = targetSelect.value;
      });
    }
    return;
  }

  const pdfInput = event.target.closest("[data-action='upload-module-pdf']");
  if (pdfInput && pdfInput.files && pdfInput.files[0]) {
    const moduleId = pdfInput.dataset.module;
    const file = pdfInput.files[0];
    for (const subject of state.subjects) {
      const mod = subject.modules.find(m => m.id === moduleId);
      if (mod) {
        mod.pdfName = file.name;
        mod.pdfData = URL.createObjectURL(file);
        showToast(lang() === "ar" ? "تم رفع PDF" : "PDF uploaded");
        render();
        break;
      }
    }
    return;
  }

  if (event.target.id === "subjectFileInput" && event.target.files[0]) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importSubjectObject(JSON.parse(reader.result));
        showToast(tr("copy.imported"));
        render();
      } catch {
        showToast(tr("copy.invalidJson"));
      }
    };
    reader.readAsText(file);
  }

  if (event.target.id === "languageFileInput" && event.target.files[0]) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importLanguageObject(JSON.parse(reader.result));
        showToast(tr("copy.imported"));
        render();
      } catch {
        showToast(tr("copy.invalidJson"));
      }
    };
    reader.readAsText(file);
  }

  if (event.target.id === "guideFileInput" && event.target.files[0]) {
    const file = event.target.files[0];
    const subjectId = document.getElementById("guideSubjectSelect")?.value;
    if (!subjectId) return;
    const reader = new FileReader();
    reader.onload = () => {
      const guideKey = "guide-" + subjectId;
      const customGuides = JSON.parse(localStorage.getItem("ahmed-custom-guides") || "{}");
      customGuides[guideKey] = { content: reader.result, title: file.name };
      localStorage.setItem("ahmed-custom-guides", JSON.stringify(customGuides));
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        subject.guideFile = guideKey;
      }
      showToast(lang() === "ar" ? "\u062a\u0645 \u0631\u0628\u0637 \u0627\u0644\u062f\u0644\u064a\u0644 \u0628\u0627\u0644\u0645\u0627\u062f\u0629" : "Guide linked to subject");
      render();
    };
    reader.readAsText(file);
  }
});

document.addEventListener("submit", async event => {
  const form = event.target.closest("form[data-form]");
  if (!form) return;
  event.preventDefault();
  const isAr = lang() === "ar";
  const data = new FormData(form);
  const type = form.dataset.form;
  const textValue = String(data.get("text") || "").trim();

  if (type.startsWith("add-") && type.endsWith("-task") && textValue) {
    const rec = await ask(isAr ? "التكرار (0=مرة واحدة، 1=يومي، 7=أسبوعي):" : "Recurrence (0=once, 1=daily, 7=weekly):", "0");
    addTask(type.split("-")[1], form.dataset.parent, textValue, rec);
    saveState();
    render();
    return;
  }
  
  if (type === "add-todo" && textValue) {
    const rec = await ask(isAr ? "التكرار (0=مرة واحدة، 1=يومي، 7=أسبوعي):" : "Recurrence (0=once, 1=daily, 7=weekly):", "0");
    addTask("todo", "", textValue, rec);
    saveState();
    render();
    return;
  }

  if (type === "add-grade") {
    const subject = state.subjects.find(item => item.id === form.dataset.subject);
    subject.gradeItems.push(grade(uid("grade"), String(data.get("label")), String(data.get("label")), Number(data.get("earned")), Number(data.get("total"))));
  }

  if (type === "add-subject") {
    const name = String(data.get("name") || "").trim();
    const id = uid("subject");
    state.subjects.push({
      ...subjectTemplate(),
      id,
      code: String(data.get("code") || "CUSTOM"),
      hours: Number(data.get("hours") || 3),
      name: txt(name, name),
      modules: [],
      tasks: []
    });
    state.activeSubjectId = id;
  }

  if (type === "add-language") {
    const title = String(data.get("title") || "").trim();
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || uid("language");
    const language = {
      ...languageTemplate(),
      id,
      title: txt(title, title),
      subtitle: txt(String(data.get("level") || "مسار جديد"), String(data.get("level") || "New track")),
      level: txt(String(data.get("level") || "Beginner"), String(data.get("level") || "Beginner")),
      resources: [String(data.get("resource") || "Custom resource")],
      modules: languageTemplate().modules,
      tasks: tasks([[lang() === "ar" ? `ابدأ ${title}` : `Start ${title}`, `Start ${title}`]], `lang-${id}`)
    };
    importLanguageObject(language);
  }

  if (type === "add-cgpa-course") {
    const semId = form.dataset.sem;
    const semester = state.cgpa.semesters.find(s => s.id === semId);
    if (semester) {
      semester.courses.push({ id: uid("course"), name: txt(String(data.get("name")), String(data.get("name"))), hours: Number(data.get("hours") || 3), grade: String(data.get("grade") || "A") });
    }
  }

  if (type === "add-semester") {
    state.cgpa.semesters.push({
      id: uid("sem"),
      name: txt(String(data.get("name")), String(data.get("name"))),
      courses: []
    });
  }

  if (type === "add-project") {
    state.projects.push({ id: uid("project"), title: String(data.get("title")), stack: String(data.get("stack") || ""), link: String(data.get("link") || ""), status: "planned", notes: txt("", "") });
  }

  form.reset();
  showToast(tr("copy.saved"));
  render();
});

document.addEventListener("blur", event => {
  const el = event.target.closest('[data-action="update-profile"]');
  if (el) {
    state.profile[el.dataset.field] = el.textContent.trim();
    saveState();
  }
}, true);

window.addEventListener("hashchange", render);

let state;
state = loadState();
checkRecurringTasks();
let timerInterval = null;
render();
document.addEventListener("input", event => {
  const searchInput = event.target.closest('[data-action="global-search"]');
  if (searchInput) {
    state.globalSearch = searchInput.value;
    updateGlobalTasksDOM();
  }
});
