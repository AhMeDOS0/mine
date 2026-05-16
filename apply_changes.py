import re, os

fp = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app.js')
with open(fp, 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Remove guide/sheets tabs
c = c.replace(
    'const tabs = ["overview", "guide", "lectures", "sheets", "grades", "tasks"];',
    'const tabs = ["overview", "lectures", "grades", "tasks"];'
)

# 2. Remove JSX guide upload details
c = re.sub(
    r'      \$\{renderAddSubjectTools\(\)\}\n\s*<details class="import-box" style="margin-top:10px">[\s\S]*?</details>\n\s*</section>',
    '      ${renderAddSubjectTools()}\n    </section>',
    c
)

# 3. Add target grade next to name in subject detail
c = c.replace(
    '            <h2>${esc(loc(selected.name))}</h2>',
    '            <h2>${esc(loc(selected.name))} <span class="chip accent" style="margin-inline-start:10px;vertical-align:middle;font-size:13px">${esc(tr("labels.target"))}: ${esc(selected.targetGrade)}</span></h2>'
)

# 4. Remove guide button
c = re.sub(
    r'            \$\{selected\.guideFile \? .*?\n',
    '',
    c
)

# 5. Add target grade next to sidebar card name
c = c.replace(
    '          <h3>${esc(loc(subject.name))}</h3>',
    '          <h3>${esc(loc(subject.name))} <span class="chip accent" style="font-size:11px;vertical-align:middle;margin-inline-start:6px">${esc(subject.targetGrade)}</span></h3>'
)

# 6. Update renderSubjectTab
c = c.replace(
    '''  if (tab === "lectures") return renderModuleList(subject, "lecture");
  if (tab === "sheets") return renderModuleList(subject, "sheet");
  if (tab === "guide") return renderSubjectGuide(subject);
  if (tab === "grades") return renderSubjectGrades(subject);''',
    '''  if (tab === "lectures") return renderAllModules(subject);
  if (tab === "grades") return renderSubjectGrades(subject);'''
)

# 7. Replace old functions with new
old_start = 'function renderSubjectGuide(subject) {'
old_end = '''    </article>
  `;
}

function renderSubjectGrades(subject) {'''

si = c.index(old_start)
ei = c.index(old_end)
new_funcs = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'new_funcs.js'), 'r', encoding='utf-8').read()
c = c[:si] + new_funcs + '\n\nfunction renderSubjectGrades(subject) {' + c[ei+len(old_end):]

# 8. Plan: Replace add button with inline form
old_btn = '        <button class="primary-btn" data-action="add-new-day" style="padding: 8px 16px;">+ ${isAr ? "\u0625\u0636\u0627\u0641\u0629 \u064a\u0648\u0645 \u062c\u062f\u064a\u062f" : "Add New Day"}</button>'
new_form = '''        <h2 style="margin:0">${esc(loc(plan.name))}</h2>
      </div>
      <div class="panel" style="margin-bottom:16px;background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 8%,var(--surface)),var(--surface))">
        <h3 style="margin-bottom:10px">${isAr ? "\u0625\u0636\u0627\u0641\u0629 \u064a\u0648\u0645 \u062c\u062f\u064a\u062f" : "Add New Day"}</h3>
        <form data-form="add-day-inline" style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">
          <div style="flex:1;min-width:160px">
            <label class="small muted" style="display:block;margin-bottom:4px">Date</label>
            <input name="dayDate" type="date" value="${new Date().toISOString().slice(0,10)}" required style="width:100%">
          </div>
          <div style="flex:2;min-width:200px">
            <label class="small muted" style="display:block;margin-bottom:4px">Title / Focus</label>
            <input name="dayTitle" placeholder="e.g. Study Advanced" required style="width:100%">
          </div>
          <button class="primary-btn" type="submit" style="min-height:40px;padding:8px 20px">+ Add Day</button>
        </form>
      </div'''
c = c.replace(old_btn, new_form)

# Remove old h2 heading
c = c.replace(
    '        <h2 style="margin:0">${esc(loc(plan.name))} - ${isAr ? "\u0627\u0644\u062e\u0637\u0629 \u0627\u0644\u064a\u0648\u0645\u064a\u0629" : "Daily Roadmap"}</h2>\n',
    ''
)

# 9. Improve past day styling
c = c.replace(
    '                  <span class="chip ${allDone ? "finished" : (day.daysPast > 0 ? "amber" : "indigo")}" style="${allDone ? "text-decoration: line-through; opacity: 0.7;" : ""}">',
    '                  <span class="chip ${allDone ? "finished" : (day.daysPast > 0 ? "amber" : "indigo")}" style="${(day.daysPast > 0 || allDone) ? "text-decoration: line-through; opacity: 0.7;" : ""}">'
)
c = c.replace(
    '                  <h3 style="margin-top:8px">${esc(loc(day.title))}</h3>',
    """                  <h3 style="margin-top:8px;${day.daysPast > 0 && !allDone ? 'color:var(--amber)' : ''}${allDone ? 'color:var(--green)' : ''}">${esc(loc(day.title))}</h3>"""
)

# 10. Add event handlers
timer_start = '  if (action === "timer-start" && !timerInterval) {'
new_handlers = '''  if (action === "edit-module") {
    const subject = state.subjects.find(s => s.id === actionEl.dataset.subject);
    if (!subject) return;
    const mod = subject.modules.find(m => m.id === actionEl.dataset.module);
    if (!mod) return;
    const newTitle = await ask(lang() === "ar" ? "\u0639\u0646\u0648\u0627\u0646 \u062c\u062f\u064a\u062f:" : "New title:", loc(mod.title));
    if (!newTitle) return;
    mod.title = txt(newTitle, newTitle);
    const newPages = await ask(lang() === "ar" ? "\u0639\u062f\u062f \u0627\u0644\u0635\u0641\u062d\u0627\u062a:" : "Number of pages:", String(mod.pages));
    if (newPages) mod.pages = Number(newPages) || mod.pages;
    saveState();
    render();
  }

  if (action === "delete-module") {
    const subject = state.subjects.find(s => s.id === actionEl.dataset.subject);
    if (!subject) return;
    if (await confirmAction(lang() === "ar" ? "\u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u062d\u062a\u0648\u0649\u061f" : "Delete this content?")) {
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

  ''' + timer_start
c = c.replace(timer_start, new_handlers)

# 11. Add form handlers
add_grade = '  if (type === "add-grade") {'
new_form_handlers = '''  if (type === "add-day-inline") {
    const dateStr = String(data.get("dayDate") || "").trim();
    const title = String(data.get("dayTitle") || "").trim();
    if (!dateStr || !title) return;
    const plan = activePlan();
    if (plan.days.find(d => d.id === dateStr)) { showToast("This day already exists!"); form.reset(); render(); return; }
    plan.days.push({ id: dateStr, date: { ar: dateStr, en: dateStr }, title: { ar: title, en: title }, tasks: [] });
    plan.days.sort((a, b) => new Date(a.id) - new Date(b.id));
    saveState(); form.reset(); render(); return;
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

  ''' + add_grade
c = c.replace(add_grade, new_form_handlers)

with open(fp, 'w', encoding='utf-8') as f:
    f.write(c)

print('All changes applied successfully!')
print('File size:', len(c))
