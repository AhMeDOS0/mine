const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace tabs array - remove guide/sheets
content = content.replace(
  'const tabs = ["overview", "guide", "lectures", "sheets", "grades", "tasks"];',
  'const tabs = ["overview", "lectures", "grades", "tasks"];'
);

// 2. Remove the JSX guide upload details section  
content = content.replace(
  /      \$\{renderAddSubjectTools\(\)\}\n\s*<details class="import-box" style="margin-top:10px">[\s\S]*?<\/details>\n\s*<\/section>/,
  '      ${renderAddSubjectTools()}\n    </section>'
);

// 3. Replace h2 to add target grade next to name in subject detail
content = content.replace(
  '            <h2>${esc(loc(selected.name))}</h2>',
  '            <h2>${esc(loc(selected.name))} <span class="chip accent" style="margin-inline-start:10px;vertical-align:middle;font-size:13px">${esc(tr("labels.target"))}: ${esc(selected.targetGrade)}</span></h2>'
);

// 4. Remove the guide button line
content = content.replace(
  /            \$\{selected\.guideFile \? `<a class="guide-open-btn".*?`\}\n/,
  ''
);

// 5. Add target grade next to subject card name in sidebar
content = content.replace(
  '          <h3>${esc(loc(subject.name))}</h3>',
  '          <h3>${esc(loc(subject.name))} <span class="chip accent" style="font-size:11px;vertical-align:middle;margin-inline-start:6px">${esc(subject.targetGrade)}</span></h3>'
);

// 6. Replace renderSubjectTab - remove guide/sheets, use renderAllModules
content = content.replace(
  `  if (tab === "lectures") return renderModuleList(subject, "lecture");
  if (tab === "sheets") return renderModuleList(subject, "sheet");
  if (tab === "guide") return renderSubjectGuide(subject);
  if (tab === "grades") return renderSubjectGrades(subject);`,
  `  if (tab === "lectures") return renderAllModules(subject);
  if (tab === "grades") return renderSubjectGrades(subject);`
);

// 7. Replace renderSubjectGuide + renderModuleList + renderModuleCard with new functions
const oldFuncsStart = 'function renderSubjectGuide(subject) {';
const oldFuncsEnd = `    </article>
  \`;
}

function renderSubjectGrades(subject) {`;
const startIdx = content.indexOf(oldFuncsStart);
const endIdx = content.indexOf(oldFuncsEnd);
if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find old functions to replace!');
  console.log('startIdx:', startIdx, 'endIdx:', endIdx);
  process.exit(1);
}

const newFunctions = `function renderAllModules(subject) {
  const isAr = lang() === "ar";
  const lectures = subject.modules.filter(m => m.type === "lecture");
  const sheets = subject.modules.filter(m => m.type !== "lecture");
  return \`
    <details class="import-box" style="margin-bottom:14px">
      <summary style="font-size:15px">+ \${isAr ? "\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0645\\u062d\\u0627\\u0636\\u0631\\u0629 \\u062c\\u062f\\u064a\\u062f\\u0629" : "Add New Lecture"}</summary>
      <form data-form="add-lecture" data-subject="\${esc(subject.id)}" style="margin-top:12px">
        <div class="form-grid" style="grid-template-columns:80px 1fr;gap:10px">
          <label style="font-size:13px;font-weight:700;color:var(--muted)">#</label>
          <input name="lecNum" type="number" min="0" placeholder="7" required style="max-width:120px">
          <label style="font-size:13px;font-weight:700;color:var(--muted)">\${isAr ? "\\u0627\\u0644\\u0639\\u0646\\u0648\\u0627\\u0646" : "Title"}</label>
          <input name="lecTitle" placeholder="\${isAr ? '\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0627\\u0644\\u0645\\u062d\\u0627\\u0636\\u0631\\u0629' : 'Lecture title'}" required>
          <label style="font-size:13px;font-weight:700;color:var(--muted)">\${isAr ? "\\u0645\\u0644\\u062e\\u0635" : "Summary"}</label>
          <input name="lecSummary" placeholder="\${isAr ? '\\u0645\\u0644\\u062e\\u0635 \\u0642\\u0635\\u064a\\u0631' : 'Brief summary'}">
          <label style="font-size:13px;font-weight:700;color:var(--muted)">\${isAr ? "\\u0635\\u0641\\u062d\\u0627\\u062a" : "Pages"}</label>
          <input name="lecPages" type="number" min="1" value="1" style="max-width:120px">
        </div>
        <div style="margin-top:10px;display:flex;gap:8px;align-items:center">
          <button class="primary-btn" type="submit" style="padding:8px 20px">\${isAr ? "\\u0623\\u0636\\u0641" : "Add Lecture"}</button>
          <div class="file-upload-wrap"><div class="file-upload-btn">\\u{1F4CE} PDF</div><input type="file" accept=".pdf" name="lecPdf" class="add-lec-pdf-input"></div>
        </div>
      </form>
    </details>
    <h3 style="margin-bottom:10px">\${isAr ? "\\u0627\\u0644\\u0645\\u062d\\u0627\\u0636\\u0631\\u0627\\u062a" : "Lectures"} (\${lectures.length})</h3>
    <div class="module-grid">\${lectures.map(item => renderModuleCard(item, subject.id)).join("")}</div>
    \${sheets.length ? \`<h3 style="margin-top:20px;margin-bottom:10px">\${isAr ? "\\u0627\\u0644\\u0634\\u064a\\u062a\\u0627\\u062a \\u0648\\u0627\\u0644\\u0644\\u0627\\u0628\\u0627\\u062a" : "Sheets & Labs"} (\${sheets.length})</h3><div class="module-grid">\${sheets.map(item => renderModuleCard(item, subject.id)).join("")}</div>\` : ""}
  \`;
}

function renderModuleCard(item, subjectId) {
  const hasPdf = item.pdfData || item.pdfName;
  const isAr = lang() === "ar";
  const sections = item.sections || [];
  const sid = subjectId || "";
  return \`
    <article class="module-card">
      <div class="section-head">
        <div>
          <span class="chip \${item.type === "lecture" ? "accent" : "amber"}">\${esc(item.type)}</span>
          <h3 style="margin-top:8px">\${esc(loc(item.title))}</h3>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span class="chip">\${esc(item.pages)}p</span>
          <button class="secondary-btn" data-action="edit-module" data-subject="\${esc(sid)}" data-module="\${esc(item.id)}" type="button" style="padding:4px 8px;font-size:11px;min-height:26px" title="Edit">&#9998;</button>
          <button class="delete-btn" data-action="delete-module" data-subject="\${esc(sid)}" data-module="\${esc(item.id)}" type="button" style="width:26px;height:26px;font-size:11px">x</button>
        </div>
      </div>
      <p class="small muted">\${esc(item.file || "")}</p>
      \${hasPdf ? \`<a class="pdf-badge" \${item.pdfData ? 'href="' + item.pdfData + '" target="_blank"' : ''}>\\u{1F4C4} \${esc(item.pdfName || "PDF")}</a>\` : ""}
      <div class="file-upload-wrap" style="margin:8px 0">
        <div class="file-upload-btn">\\u{1F4CE} \${isAr ? "\\u0631\\u0641\\u0639 PDF" : "Upload PDF"}</div>
        <input type="file" accept=".pdf" data-action="upload-module-pdf" data-module="\${esc(item.id)}">
      </div>
      <h4>\${esc(tr("labels.outcomes"))}</h4>
      <ul>\${(item.topics || []).map(topic => \`<li>\${esc(loc(topic))}</li>\`).join("")}</ul>
      \${(item.practice || []).length ? \`<h4>\${esc(tr("labels.practice"))}</h4><ul>\${item.practice.map(p => \`<li>\${esc(loc(p))}</li>\`).join("")}</ul>\` : ""}
      \${sections.length ? \`<div style="margin-top:12px;padding-top:10px;border-top:1px dashed var(--line)"><h4 style="color:var(--accent);font-size:13px">\${isAr ? "\\u0627\\u0644\\u0623\\u0642\\u0633\\u0627\\u0645" : "Sections"}</h4>\${sections.map((sec, si) => \`<div style="margin:6px 0;padding:8px;border-radius:var(--radius);background:var(--surface-2);display:flex;align-items:center;justify-content:space-between;gap:8px"><div style="flex:1"><strong style="font-size:13px">\${esc(loc(sec.title))}</strong>\${sec.pdfName ? \` <a class="pdf-badge" style="font-size:10px" \${sec.pdfData ? 'href="' + sec.pdfData + '" target="_blank"' : ''}>\\u{1F4C4} \${esc(sec.pdfName)}</a>\` : ""}</div><button class="delete-btn" data-action="delete-section" data-subject="\${esc(sid)}" data-module="\${esc(item.id)}" data-index="\${si}" type="button" style="width:22px;height:22px;font-size:10px">x</button></div>\`).join("")}</div>\` : ""}
      <details style="margin-top:8px"><summary class="small" style="cursor:pointer;color:var(--accent);font-weight:700">+ \${isAr ? "\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0642\\u0633\\u0645" : "Add Section"}</summary><form data-form="add-section" data-subject="\${esc(sid)}" data-module="\${esc(item.id)}" style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap;align-items:center"><input name="secTitle" placeholder="\${isAr ? '\\u0627\\u0633\\u0645 \\u0627\\u0644\\u0642\\u0633\\u0645' : 'Section name'}" required style="flex:1;min-width:140px;min-height:32px;padding:4px 8px;font-size:12px"><div class="file-upload-wrap"><div class="file-upload-btn" style="min-height:32px;padding:4px 10px;font-size:11px">\\u{1F4CE} PDF</div><input type="file" accept=".pdf" name="secPdf" class="sec-pdf-input"></div><button class="secondary-btn" type="submit" style="min-height:32px;padding:4px 10px;font-size:12px">\${isAr ? "\\u0623\\u0636\\u0641" : "Add"}</button></form></details>
    </article>
  \`;
}

function renderSubjectGrades(subject) {`;

content = content.substring(0, startIdx) + newFunctions + content.substring(endIdx + oldFuncsEnd.length);

// 8. Plan: Replace add-new-day button with inline form + improve past day styling
const oldPlanLine = '        <button class="primary-btn" data-action="add-new-day" style="padding: 8px 16px;">+ ${isAr ? "\u0625\u0636\u0627\u0641\u0629 \u064a\u0648\u0645 \u062c\u062f\u064a\u062f" : "Add New Day"}</button>';
const newPlanForm = `        <h2 style="margin:0">\${esc(loc(plan.name))}</h2>
      </div>
      <div class="panel" style="margin-bottom:16px;background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 8%,var(--surface)),var(--surface))">
        <h3 style="margin-bottom:10px">\${isAr ? "\\u0625\\u0636\\u0627\\u0641\\u0629 \\u064a\\u0648\\u0645 \\u062c\\u062f\\u064a\\u062f" : "Add New Day"}</h3>
        <form data-form="add-day-inline" style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">
          <div style="flex:1;min-width:160px">
            <label class="small muted" style="display:block;margin-bottom:4px">Date</label>
            <input name="dayDate" type="date" value="\${new Date().toISOString().slice(0,10)}" required style="width:100%">
          </div>
          <div style="flex:2;min-width:200px">
            <label class="small muted" style="display:block;margin-bottom:4px">Title / Focus</label>
            <input name="dayTitle" placeholder="e.g. Study Advanced" required style="width:100%">
          </div>
          <button class="primary-btn" type="submit" style="min-height:40px;padding:8px 20px">+ Add Day</button>
        </form>
      </div`;
content = content.replace(oldPlanLine, newPlanForm);

// Also remove the old h2+button container heading since we put it in the new form
content = content.replace(
  '        <h2 style="margin:0">${esc(loc(plan.name))} - ${isAr ? "\u0627\u0644\u062e\u0637\u0629 \u0627\u0644\u064a\u0648\u0645\u064a\u0629" : "Daily Roadmap"}</h2>\n',
  ''
);

// 9. Improve past day styling - add line-through and color to past day dates/titles
content = content.replace(
  `                  <span class="chip \${allDone ? "finished" : (day.daysPast > 0 ? "amber" : "indigo")}" style="\${allDone ? "text-decoration: line-through; opacity: 0.7;" : ""}">`,
  `                  <span class="chip \${allDone ? "finished" : (day.daysPast > 0 ? "amber" : "indigo")}" style="\${(day.daysPast > 0 || allDone) ? "text-decoration: line-through; opacity: 0.7;" : ""}">`
);

content = content.replace(
  '                  <h3 style="margin-top:8px">${esc(loc(day.title))}</h3>',
  '                  <h3 style="margin-top:8px;${day.daysPast > 0 && !allDone ? \'color:var(--amber)\' : \'\'}${allDone ? \'color:var(--green)\' : \'\'}">${esc(loc(day.title))}</h3>'
);

// 10. Add event handlers for edit-module, delete-module, delete-section before timer-start
const timerStart = '  if (action === "timer-start" && !timerInterval) {';
const newHandlers = `  if (action === "edit-module") {
    const subject = state.subjects.find(s => s.id === actionEl.dataset.subject);
    if (!subject) return;
    const mod = subject.modules.find(m => m.id === actionEl.dataset.module);
    if (!mod) return;
    const newTitle = await ask(lang() === "ar" ? "\\u0639\\u0646\\u0648\\u0627\\u0646 \\u062c\\u062f\\u064a\\u062f:" : "New title:", loc(mod.title));
    if (!newTitle) return;
    mod.title = txt(newTitle, newTitle);
    const newPages = await ask(lang() === "ar" ? "\\u0639\\u062f\\u062f \\u0627\\u0644\\u0635\\u0641\\u062d\\u0627\\u062a:" : "Number of pages:", String(mod.pages));
    if (newPages) mod.pages = Number(newPages) || mod.pages;
    saveState();
    render();
  }

  if (action === "delete-module") {
    const subject = state.subjects.find(s => s.id === actionEl.dataset.subject);
    if (!subject) return;
    if (await confirmAction(lang() === "ar" ? "\\u062d\\u0630\\u0641 \\u0647\\u0630\\u0627 \\u0627\\u0644\\u0645\\u062d\\u062a\\u0648\\u0649\\u061f" : "Delete this content?")) {
      subject.modules = subject.modules.filter(m => m.id !== actionEl.dataset.module);
      saveState();
      render();
    }
  }

  if (action === "delete-section") {
    const subject = state.subjects.find(s => s.id === actionEl.dataset.subject);
    if (!subject) return;
    const mod = subject.modules.find(m => m.id === actionEl.dataset.module);
    if (!mod || !mod.sections) return;
    const idx = parseInt(actionEl.dataset.index);
    mod.sections.splice(idx, 1);
    saveState();
    render();
  }

  ${timerStart}`;
content = content.replace(timerStart, newHandlers);

// 11. Add form handlers for add-lecture, add-section, and add-day-inline
const addGradeHandler = '  if (type === "add-grade") {';
const newFormHandlers = `  if (type === "add-day-inline") {
    const dateStr = String(data.get("dayDate") || "").trim();
    const title = String(data.get("dayTitle") || "").trim();
    if (!dateStr || !title) return;
    const plan = activePlan();
    if (plan.days.find(d => d.id === dateStr)) {
      showToast("This day already exists!");
      form.reset();
      render();
      return;
    }
    plan.days.push({ id: dateStr, date: { ar: dateStr, en: dateStr }, title: { ar: title, en: title }, tasks: [] });
    plan.days.sort((a, b) => new Date(a.id) - new Date(b.id));
    saveState();
    form.reset();
    render();
    return;
  }

  if (type === "add-lecture") {
    const subject = state.subjects.find(s => s.id === form.dataset.subject);
    if (subject) {
      const num = String(data.get("lecNum") || "0");
      const title = String(data.get("lecTitle") || "").trim();
      const summary = String(data.get("lecSummary") || "").trim();
      const pages = Number(data.get("lecPages") || 1);
      const pdfInput = form.querySelector(".add-lec-pdf-input");
      const newMod = { id: uid("lec"), type: "lecture", title: txt("Lec " + num + " - " + title, "Lec " + num + " - " + title), file: "", pages: pages, topics: summary ? [txt(summary, summary)] : [], practice: [], sections: [] };
      if (pdfInput && pdfInput.files && pdfInput.files[0]) { newMod.pdfName = pdfInput.files[0].name; newMod.pdfData = URL.createObjectURL(pdfInput.files[0]); }
      subject.modules.push(newMod);
      state.activeSubjectTab = "lectures";
    }
  }

  if (type === "add-section") {
    const subject = state.subjects.find(s => s.id === form.dataset.subject);
    if (subject) {
      const mod = subject.modules.find(m => m.id === form.dataset.module);
      if (mod) {
        if (!mod.sections) mod.sections = [];
        const secTitle = String(data.get("secTitle") || "").trim();
        const sec = { title: txt(secTitle, secTitle) };
        const pdfInput = form.querySelector(".sec-pdf-input");
        if (pdfInput && pdfInput.files && pdfInput.files[0]) { sec.pdfName = pdfInput.files[0].name; sec.pdfData = URL.createObjectURL(pdfInput.files[0]); }
        mod.sections.push(sec);
      }
    }
  }

  ${addGradeHandler}`;
content = content.replace(addGradeHandler, newFormHandlers);

fs.writeFileSync(filePath, content, 'utf8');
console.log('All changes applied successfully!');
console.log('File size:', content.length);
