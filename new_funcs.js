function renderAllModules(subject) {
  const isAr = lang() === "ar";
  const lectures = subject.modules.filter(m => m.type === "lecture");
  const sheets = subject.modules.filter(m => m.type !== "lecture");
  return `
    <details class="import-box" style="margin-bottom:14px">
      <summary style="font-size:15px">+ ${isAr ? "\u0625\u0636\u0627\u0641\u0629 \u0645\u062d\u0627\u0636\u0631\u0629 \u062c\u062f\u064a\u062f\u0629" : "Add New Lecture"}</summary>
      <form data-form="add-lecture" data-subject="${esc(subject.id)}" style="margin-top:12px">
        <div class="form-grid" style="grid-template-columns:80px 1fr;gap:10px">
          <label style="font-size:13px;font-weight:700;color:var(--muted)">#</label>
          <input name="lecNum" type="number" min="0" placeholder="7" required style="max-width:120px">
          <label style="font-size:13px;font-weight:700;color:var(--muted)">${isAr ? "\u0627\u0644\u0639\u0646\u0648\u0627\u0646" : "Title"}</label>
          <input name="lecTitle" placeholder="${isAr ? '\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u062d\u0627\u0636\u0631\u0629' : 'Lecture title'}" required>
          <label style="font-size:13px;font-weight:700;color:var(--muted)">${isAr ? "\u0645\u0644\u062e\u0635" : "Summary"}</label>
          <input name="lecSummary" placeholder="${isAr ? '\u0645\u0644\u062e\u0635 \u0642\u0635\u064a\u0631' : 'Brief summary'}">
          <label style="font-size:13px;font-weight:700;color:var(--muted)">${isAr ? "\u0635\u0641\u062d\u0627\u062a" : "Pages"}</label>
          <input name="lecPages" type="number" min="1" value="1" style="max-width:120px">
        </div>
        <div style="margin-top:10px;display:flex;gap:8px;align-items:center">
          <button class="primary-btn" type="submit" style="padding:8px 20px">${isAr ? "\u0623\u0636\u0641" : "Add Lecture"}</button>
          <div class="file-upload-wrap"><div class="file-upload-btn">\u{1F4CE} PDF</div><input type="file" accept=".pdf" name="lecPdf" class="add-lec-pdf-input"></div>
        </div>
      </form>
    </details>
    <h3 style="margin-bottom:10px">${isAr ? "\u0627\u0644\u0645\u062d\u0627\u0636\u0631\u0627\u062a" : "Lectures"} (${lectures.length})</h3>
    <div class="module-grid">${lectures.map(item => renderModuleCard(item, subject.id)).join("")}</div>
    ${sheets.length ? `<h3 style="margin-top:20px;margin-bottom:10px">${isAr ? "\u0627\u0644\u0634\u064a\u062a\u0627\u062a \u0648\u0627\u0644\u0644\u0627\u0628\u0627\u062a" : "Sheets & Labs"} (${sheets.length})</h3><div class="module-grid">${sheets.map(item => renderModuleCard(item, subject.id)).join("")}</div>` : ""}
  `;
}

function renderModuleCard(item, subjectId) {
  const hasPdf = item.pdfData || item.pdfName;
  const isAr = lang() === "ar";
  const sections = item.sections || [];
  const sid = subjectId || "";
  return `
    <article class="module-card">
      <div class="section-head">
        <div>
          <span class="chip ${item.type === "lecture" ? "accent" : "amber"}">${esc(item.type)}</span>
          <h3 style="margin-top:8px">${esc(loc(item.title))}</h3>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span class="chip">${esc(item.pages)}p</span>
          <button class="secondary-btn" data-action="edit-module" data-subject="${esc(sid)}" data-module="${esc(item.id)}" type="button" style="padding:4px 8px;font-size:11px;min-height:26px" title="Edit">&#9998;</button>
          <button class="delete-btn" data-action="delete-module" data-subject="${esc(sid)}" data-module="${esc(item.id)}" type="button" style="width:26px;height:26px;font-size:11px">x</button>
        </div>
      </div>
      <p class="small muted">${esc(item.file || "")}</p>
      ${hasPdf ? `<a class="pdf-badge" ${item.pdfData ? 'href="' + item.pdfData + '" target="_blank"' : ''}>\u{1F4C4} ${esc(item.pdfName || "PDF")}</a>` : ""}
      <div class="file-upload-wrap" style="margin:8px 0">
        <div class="file-upload-btn">\u{1F4CE} ${isAr ? "\u0631\u0641\u0639 PDF" : "Upload PDF"}</div>
        <input type="file" accept=".pdf" data-action="upload-module-pdf" data-module="${esc(item.id)}">
      </div>
      <h4>${esc(tr("labels.outcomes"))}</h4>
      <ul>${(item.topics || []).map(topic => `<li>${esc(loc(topic))}</li>`).join("")}</ul>
      ${(item.practice || []).length ? `<h4>${esc(tr("labels.practice"))}</h4><ul>${item.practice.map(p => `<li>${esc(loc(p))}</li>`).join("")}</ul>` : ""}
      ${sections.length ? `<div style="margin-top:12px;padding-top:10px;border-top:1px dashed var(--line)"><h4 style="color:var(--accent);font-size:13px">${isAr ? "\u0627\u0644\u0623\u0642\u0633\u0627\u0645" : "Sections"}</h4>${sections.map((sec, si) => `<div style="margin:6px 0;padding:8px;border-radius:var(--radius);background:var(--surface-2);display:flex;align-items:center;justify-content:space-between;gap:8px"><div style="flex:1"><strong style="font-size:13px">${esc(loc(sec.title))}</strong>${sec.pdfName ? ` <a class="pdf-badge" style="font-size:10px" ${sec.pdfData ? 'href="' + sec.pdfData + '" target="_blank"' : ''}>\u{1F4C4} ${esc(sec.pdfName)}</a>` : ""}</div><button class="delete-btn" data-action="delete-section" data-subject="${esc(sid)}" data-module="${esc(item.id)}" data-index="${si}" type="button" style="width:22px;height:22px;font-size:10px">x</button></div>`).join("")}</div>` : ""}
      <details style="margin-top:8px"><summary class="small" style="cursor:pointer;color:var(--accent);font-weight:700">+ ${isAr ? "\u0625\u0636\u0627\u0641\u0629 \u0642\u0633\u0645" : "Add Section"}</summary><form data-form="add-section" data-subject="${esc(sid)}" data-module="${esc(item.id)}" style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap;align-items:center"><input name="secTitle" placeholder="${isAr ? '\u0627\u0633\u0645 \u0627\u0644\u0642\u0633\u0645' : 'Section name'}" required style="flex:1;min-width:140px;min-height:32px;padding:4px 8px;font-size:12px"><div class="file-upload-wrap"><div class="file-upload-btn" style="min-height:32px;padding:4px 10px;font-size:11px">\u{1F4CE} PDF</div><input type="file" accept=".pdf" name="secPdf" class="sec-pdf-input"></div><button class="secondary-btn" type="submit" style="min-height:32px;padding:4px 10px;font-size:12px">${isAr ? "\u0623\u0636\u0641" : "Add"}</button></form></details>
    </article>
  `;
}
