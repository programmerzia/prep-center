import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { VARIANTS, CONTACT } from "./content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ink = "1B3A5F";
const body = "222222";

function htmlEscape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderHtml(v) {
  const jobs = v.jobs
    .map((j) => {
      const bullets = j.bullets
        ? `<ul>${j.bullets.map((b) => `<li>${htmlEscape(b)}</li>`).join("")}</ul>`
        : `<p class="one">${htmlEscape(j.one)}</p>`;
      return `<section class="job">
        <div class="job-h">
          <div><strong>${htmlEscape(j.company)}</strong> — ${htmlEscape(j.title)}</div>
          <div class="dates">${htmlEscape(j.dates)}</div>
        </div>
        <div class="loc">${htmlEscape(j.loc)}</div>
        ${bullets}
      </section>`;
    })
    .join("");

  const skills = v.skills
    .map(([k, val]) => `<p><span class="k">${htmlEscape(k)}:</span> ${htmlEscape(val)}</p>`)
    .join("");

  const projects = v.projects
    .map(
      (p) =>
        `<p class="proj"><strong>${htmlEscape(p.name)}</strong> — ${htmlEscape(p.text)} <span class="stack">${htmlEscape(p.stack)}</span></p>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${htmlEscape(CONTACT.name)}</title>
<style>
  @page { size: A4; margin: 14mm 14mm 14mm 14mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: Calibri, "Segoe UI", Arial, sans-serif;
    font-size: 10.4pt;
    line-height: 1.32;
    color: #${body};
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  h1 {
    font-size: 18pt;
    letter-spacing: 0.04em;
    text-align: center;
    margin: 0 0 2px;
    color: #${ink};
    font-weight: 700;
  }
  .headline {
    text-align: center;
    color: #${ink};
    font-size: 11pt;
    font-weight: 600;
    margin: 0 0 4px;
  }
  .meta {
    text-align: center;
    font-size: 9pt;
    color: #333;
    margin: 0 0 10px;
  }
  h2 {
    font-size: 10.5pt;
    color: #${ink};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-bottom: 1.4px solid #${ink};
    margin: 9px 0 5px;
    padding-bottom: 2px;
  }
  p { margin: 0 0 5px; }
  .k { font-weight: 700; color: #${ink}; }
  .job { margin-bottom: 7px; }
  .job-h { display: flex; justify-content: space-between; gap: 12px; font-size: 10.4pt; }
  .dates { white-space: nowrap; font-weight: 600; color: #${ink}; }
  .loc { font-size: 9pt; color: #555; margin: 1px 0 2px; }
  ul { margin: 2px 0 0 16px; padding: 0; }
  li { margin: 0 0 2.5px; }
  .one { margin: 2px 0 0; }
  .proj { margin: 0 0 4px; }
  .stack { color: #444; font-style: italic; }
</style>
</head>
<body>
  <h1>${htmlEscape(CONTACT.name)}</h1>
  <p class="headline">${htmlEscape(v.headline)}</p>
  <p class="meta">${htmlEscape(CONTACT.location)} · ${htmlEscape(CONTACT.email)} · ${htmlEscape(CONTACT.phone)}<br/>
  ${htmlEscape(CONTACT.linkedin)} · ${htmlEscape(CONTACT.github)} · ${htmlEscape(CONTACT.web)}</p>

  <h2>Professional summary</h2>
  <p>${htmlEscape(v.summary)}</p>

  <h2>Technical skills</h2>
  ${skills}

  <h2>Professional experience</h2>
  ${jobs}

  <h2>Selected work</h2>
  ${projects}

  <h2>Education</h2>
  <p><strong>${htmlEscape(v.education.degree)}</strong> — ${htmlEscape(v.education.school)} · ${htmlEscape(v.education.dates)}</p>
</body>
</html>`;
}

function runs(text, opts = {}) {
  return [new TextRun({ text, font: "Calibri", size: opts.size ?? 21, bold: !!opts.bold, color: opts.color ?? body, italics: !!opts.italics })];
}

function heading(text) {
  return new Paragraph({
    spacing: { before: 160, after: 60 },
    border: { bottom: { color: ink, space: 4, style: BorderStyle.SINGLE, size: 12 } },
    children: runs(text.toUpperCase(), { bold: true, size: 21, color: ink }),
  });
}

function renderDocx(v) {
  const children = [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: runs(CONTACT.name, { bold: true, size: 36, color: ink }) }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: runs(v.headline, { bold: true, size: 22, color: ink }) }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: runs(
        `${CONTACT.location}  ·  ${CONTACT.email}  ·  ${CONTACT.phone}   ${CONTACT.linkedin}  ·  ${CONTACT.github}  ·  ${CONTACT.web}`,
        { size: 18 }
      ),
    }),
    heading("Professional summary"),
    new Paragraph({ spacing: { after: 80 }, children: runs(v.summary, { size: 21 }) }),
    heading("Technical skills"),
    ...v.skills.map(
      ([k, val]) =>
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: `${k}: `, bold: true, font: "Calibri", size: 21, color: ink }),
            new TextRun({ text: val, font: "Calibri", size: 21, color: body }),
          ],
        })
    ),
    heading("Professional experience"),
  ];

  for (const j of v.jobs) {
    children.push(
      new Paragraph({
        spacing: { before: 80, after: 0 },
        children: [
          new TextRun({ text: `${j.company} — ${j.title}`, bold: true, font: "Calibri", size: 21, color: body }),
          new TextRun({ text: `\t${j.dates}`, bold: true, font: "Calibri", size: 21, color: ink }),
        ],
        tabStops: [{ type: "right", position: 9360 }],
      }),
      new Paragraph({ spacing: { after: 40 }, children: runs(j.loc, { size: 18, color: "555555" }) })
    );
    if (j.bullets) {
      for (const b of j.bullets) {
        children.push(
          new Paragraph({
            numbering: { reference: "bullets", level: 0 },
            spacing: { after: 40 },
            children: runs(b, { size: 21 }),
          })
        );
      }
    } else {
      children.push(new Paragraph({ spacing: { after: 60 }, children: runs(j.one, { size: 21 }) }));
    }
  }

  children.push(heading("Selected work"));
  for (const p of v.projects) {
    children.push(
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({ text: `${p.name} — `, bold: true, font: "Calibri", size: 21, color: body }),
          new TextRun({ text: `${p.text} `, font: "Calibri", size: 21, color: body }),
          new TextRun({ text: p.stack, italics: true, font: "Calibri", size: 20, color: "444444" }),
        ],
      })
    );
  }

  children.push(
    heading("Education"),
    new Paragraph({
      children: runs(`${v.education.degree} — ${v.education.school}  ·  ${v.education.dates}`, { size: 21 }),
    })
  );

  return new Document({
    styles: { default: { document: { styles: [{ id: "Normal", run: { font: "Calibri", size: 21 } }] } } },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [{ level: 0, format: "bullet", text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 280, hanging: 180 } } } }],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 720, bottom: 720, left: 720, right: 720 },
          },
        },
        children,
      },
    ],
  });
}

mkdirSync(join(root, "resumes", "html"), { recursive: true });

for (const v of Object.values(VARIANTS)) {
  const htmlPath = join(root, "resumes", "html", `${v.filename}.html`);
  writeFileSync(htmlPath, renderHtml(v));

  const pdfPath = join(root, `${v.filename}.pdf`);
  const chrome = spawnSync(
    "google-chrome",
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ],
    { encoding: "utf8" }
  );
  if (chrome.status !== 0) {
    console.error(chrome.stderr);
    throw new Error(`chrome failed for ${v.filename}`);
  }

  const doc = renderDocx(v);
  const buf = await Packer.toBuffer(doc);
  writeFileSync(join(root, `${v.filename}.docx`), buf);
  console.log("wrote", v.filename);
}
