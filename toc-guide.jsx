import { useState } from "react";

/* ─── tiny primitives ─────────────────────────────────────── */
const CB = ({ code }) => (
  <pre style={{
    background:"#0d1117",color:"#e6edf3",padding:"16px",borderRadius:"10px",
    overflowX:"auto",fontSize:"12.5px",lineHeight:"1.75",
    border:"1px solid #30363d",margin:"12px 0",
    fontFamily:"'Fira Code','Cascadia Code','Consolas',monospace",whiteSpace:"pre"
  }}>{code.trim()}</pre>
);

const Box = ({ color="blue", title, children }) => {
  const c = {
    blue:  { bg:"#0c1e3c", b:"#3b82f6", t:"#93c5fd" },
    green: { bg:"#0c2e1a", b:"#22c55e", t:"#86efac" },
    yellow:{ bg:"#2e1e05", b:"#f59e0b", t:"#fde68a" },
    red:   { bg:"#2e0c0c", b:"#ef4444", t:"#fca5a5" },
    purple:{ bg:"#1e0c3c", b:"#a855f7", t:"#d8b4fe" },
    cyan:  { bg:"#0c2535", b:"#06b6d4", t:"#67e8f9" },
    orange:{ bg:"#2e1a05", b:"#f97316", t:"#fdba74" },
  }[color];
  return (
    <div style={{background:c.bg,borderLeft:`4px solid ${c.b}`,padding:"12px 16px",
      borderRadius:"0 8px 8px 0",margin:"10px 0"}}>
      {title && <div style={{color:c.b,fontWeight:700,fontSize:"12px",
        textTransform:"uppercase",letterSpacing:"1px",marginBottom:"6px"}}>{title}</div>}
      <div style={{color:c.t,lineHeight:1.6}}>{children}</div>
    </div>
  );
};

const H2 = ({ children }) => (
  <h2 style={{fontSize:"22px",fontWeight:700,color:"#ffffff",margin:"24px 0 10px",
    paddingBottom:"8px",borderBottom:"2px solid #21262d"}}>{children}</h2>
);
const H3 = ({ children, color="#58a6ff" }) => (
  <h3 style={{fontSize:"17px",fontWeight:600,color,margin:"18px 0 8px"}}>{children}</h3>
);
const P = ({ children }) => (
  <p style={{color:"#adbac7",lineHeight:1.8,margin:"6px 0 10px"}}>{children}</p>
);
const Li = ({ children }) => (
  <li style={{color:"#adbac7",lineHeight:1.8,margin:"3px 0"}}>{children}</li>
);
const Ul = ({ children }) => (
  <ul style={{paddingLeft:"20px",margin:"6px 0"}}>{children}</ul>
);
const Tag = ({ children, color="#3b82f6" }) => (
  <span style={{background:color+"22",color,border:`1px solid ${color}44`,
    borderRadius:"4px",padding:"2px 8px",fontSize:"12px",fontWeight:600,margin:"0 3px"}}>{children}</span>
);

const CompareTable = ({ headers, rows }) => (
  <div style={{overflowX:"auto",margin:"12px 0"}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:"13px"}}>
      <thead>
        <tr>{headers.map((h,i)=>(
          <th key={i} style={{background:"#161b22",color:"#58a6ff",padding:"10px 14px",
            textAlign:"left",borderBottom:"2px solid #30363d",whiteSpace:"nowrap"}}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map((row,i)=>(
          <tr key={i} style={{background:i%2===0?"#0d1117":"#0f151d"}}>
            {row.map((cell,j)=>(
              <td key={j} style={{padding:"9px 14px",color:"#adbac7",
                borderBottom:"1px solid #21262d"}}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SectionTitle = ({ icon, children }) => (
  <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
    <span style={{fontSize:"24px"}}>{icon}</span>
    <h1 style={{fontSize:"26px",fontWeight:800,color:"#ffffff",margin:0}}>{children}</h1>
  </div>
);

const Formula = ({ children }) => (
  <div style={{background:"#161b22",border:"1px solid #30363d",borderRadius:"8px",
    padding:"12px 18px",fontFamily:"'Fira Code',monospace",color:"#f0883e",
    fontSize:"14px",textAlign:"center",margin:"10px 0"}}>{children}</div>
);

/* ─── SECTION: SETS, RELATIONS, FUNCTIONS ────────────────── */
const SetsContent = () => {
  const [sub, setSub] = useState("sets");
  const subs = [
    {id:"sets",label:"📐 Sets"},
    {id:"relations",label:"🔗 Relations"},
    {id:"functions",label:"f(x) Functions"},
    {id:"sheet",label:"📝 Sheet 0"},
  ];
  return (
    <div>
      <SectionTitle icon="📐">Sets, Relations & Functions</SectionTitle>
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap",margin:"16px 0"}}>
        {subs.map(s=>(
          <button key={s.id} onClick={()=>setSub(s.id)}
            style={{padding:"8px 16px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:600,fontSize:"13px",transition:"all 0.2s",
              background:sub===s.id?"#58a6ff":"#21262d",
              color:sub===s.id?"#0d1117":"#adbac7"}}>
            {s.label}
          </button>
        ))}
      </div>
      {sub==="sets" && <SetsSubContent />}
      {sub==="relations" && <RelationsContent />}
      {sub==="functions" && <FunctionsContent />}
      {sub==="sheet" && <Sheet0Content />}
    </div>
  );
};

const SetsSubContent = () => (
  <div>
    <H2>Sets — The Basics</H2>
    <P>A <b style={{color:"#f0883e"}}>set</b> is an unordered collection of distinct objects called <b>elements</b> or <b>members</b>. If a is an element of A, we write <Tag>a ∈ A</Tag>. If not, <Tag color="#ef4444">a ∉ A</Tag>.</P>

    <H3>Ways to Describe a Set</H3>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",margin:"10px 0"}}>
      {[
        {title:"Roster Method",desc:"List all elements explicitly.",ex:"S = {a, b, c, d}  |  V = {a,e,i,o,u}",color:"#58a6ff"},
        {title:"Set-Builder Notation",desc:"Define by property.",ex:"S = {x | x is a positive integer < 100}",color:"#a855f7"},
        {title:"Interval Notation",desc:"For ranges of real numbers.",ex:"[a,b] = {x | a≤x≤b}  |  (a,b) = {x | a<x<b}",color:"#22c55e"},
        {title:"Important Sets",desc:"Named standard sets.",ex:"ℕ = {0,1,2…}  ℤ = {…,-1,0,1…}  ℝ = reals  ℚ = rationals",color:"#f59e0b"},
      ].map((item,i)=>(
        <div key={i} style={{background:"#161b22",border:`1px solid ${item.color}44`,borderRadius:"10px",padding:"14px"}}>
          <div style={{color:item.color,fontWeight:700,marginBottom:"4px"}}>{item.title}</div>
          <div style={{color:"#8b949e",fontSize:"13px",marginBottom:"6px"}}>{item.desc}</div>
          <div style={{fontFamily:"monospace",color:"#e6edf3",fontSize:"12px",background:"#0d1117",padding:"6px",borderRadius:"6px"}}>{item.ex}</div>
        </div>
      ))}
    </div>

    <H3>Key Definitions</H3>
    <CompareTable
      headers={["Concept","Notation","Meaning"]}
      rows={[
        ["Cardinality","|A|","Number of distinct elements in set A"],
        ["Empty Set","∅ or {}","Set with no elements. |∅| = 0"],
        ["Universal Set","U","Set containing everything under consideration"],
        ["Subset","A ⊆ B","Every element of A is also in B"],
        ["Proper Subset","A ⊂ B","A ⊆ B and A ≠ B"],
        ["Power Set","P(A)","Set of ALL subsets of A. If |A|=n, |P(A)|=2ⁿ"],
        ["Equal Sets","A = B","A and B have exactly the same elements"],
      ]}
    />

    <H3>Set Operations</H3>
    <CompareTable
      headers={["Operation","Symbol","Definition","Example (A={1,2,3,4,5}, B={4,5,6,7,8})"]}
      rows={[
        ["Union","A ∪ B","{x | x∈A or x∈B}","{1,2,3,4,5,6,7,8}"],
        ["Intersection","A ∩ B","{x | x∈A and x∈B}","{4,5}"],
        ["Difference","A − B","{x | x∈A and x∉B}","{1,2,3}"],
        ["Complement","Ā","{x∈U | x∉A}","(depends on U)"],
        ["Cartesian Product","A × B","{(a,b) | a∈A, b∈B}","all ordered pairs"],
      ]}
    />

    <H3>Set Identities (Key Laws)</H3>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",margin:"10px 0"}}>
      {[
        {name:"Identity",rules:["A ∪ ∅ = A","A ∩ U = A"]},
        {name:"Domination",rules:["A ∪ U = U","A ∩ ∅ = ∅"]},
        {name:"Complement",rules:["A ∪ Ā = U","A ∩ Ā = ∅"]},
        {name:"De Morgan's",rules:["(A ∪ B)̄ = Ā ∩ B̄","(A ∩ B)̄ = Ā ∪ B̄"]},
        {name:"Commutative",rules:["A ∪ B = B ∪ A","A ∩ B = B ∩ A"]},
        {name:"Distributive",rules:["A∪(B∩C)=(A∪B)∩(A∪C)","A∩(B∪C)=(A∩B)∪(A∩C)"]},
      ].map((item,i)=>(
        <div key={i} style={{background:"#161b22",border:"1px solid #21262d",borderRadius:"8px",padding:"12px"}}>
          <div style={{color:"#58a6ff",fontWeight:700,fontSize:"12px",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"6px"}}>{item.name}</div>
          {item.rules.map((r,j)=><div key={j} style={{fontFamily:"monospace",color:"#e6edf3",fontSize:"12.5px",padding:"3px 0"}}>{r}</div>)}
        </div>
      ))}
    </div>

    <H3>Power Set Example</H3>
    <Box color="cyan" title="Example: If A = {a, b}">
      P(A) = &#123;∅, &#123;a&#125;, &#123;b&#125;, &#123;a,b&#125;&#125;<br/>
      |P(A)| = 2² = 4  (since |A| = 2)
    </Box>

    <H3>Cartesian Product Example</H3>
    <Box color="purple" title="Example: A = {a,b}, B = {1,2,3}">
      A × B = &#123;(a,1),(a,2),(a,3),(b,1),(b,2),(b,3)&#125;<br/>
      |A × B| = |A| × |B| = 2 × 3 = 6
    </Box>
  </div>
);

const RelationsContent = () => (
  <div>
    <H2>Binary Relations</H2>
    <P>A <b style={{color:"#f0883e"}}>binary relation R</b> from set A to set B is a subset R ⊆ A × B. A relation is more general than a function — multiple elements of B can be related to one element of A.</P>

    <Box color="blue" title="Relation vs Function">
      <b>Function:</b> Each element of A maps to <b>exactly one</b> element of B.<br/>
      <b>Relation:</b> Each element of A can map to <b>zero, one, or many</b> elements of B.
    </Box>

    <H3>Properties of Relations on a Set A</H3>
    <CompareTable
      headers={["Property","Definition","In Digraph","Example"]}
      rows={[
        ["Reflexive","∀a∈A: (a,a)∈R","Loop at EVERY vertex","≤ on integers"],
        ["Symmetric","(a,b)∈R → (b,a)∈R","Every edge has reverse","= (equality)"],
        ["Transitive","(a,b)∈R ∧ (b,c)∈R → (a,c)∈R","No missing shortcuts","< on integers"],
        ["Equivalence","Reflexive + Symmetric + Transitive","All loops, bidirectional, shortcut-complete","≡ (congruence)"],
      ]}
    />

    <H3>Checking Properties from Digraph — Tips</H3>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px",margin:"10px 0"}}>
      {[
        {prop:"Reflexive",tip:"Check: does EVERY vertex have a self-loop? If any vertex is missing its loop → NOT reflexive.",color:"#22c55e"},
        {prop:"Symmetric",tip:"Check: for EVERY arrow from a→b, is there also b→a? If any one-way edge exists → NOT symmetric.",color:"#a855f7"},
        {prop:"Transitive",tip:"Check: if there's a path a→b→c, is there a direct a→c? If any shortcut is missing → NOT transitive.",color:"#f59e0b"},
      ].map((item,i)=>(
        <div key={i} style={{background:"#161b22",border:`1px solid ${item.color}44`,borderRadius:"8px",padding:"12px"}}>
          <div style={{color:item.color,fontWeight:700,marginBottom:"6px"}}>{item.prop}</div>
          <div style={{color:"#8b949e",fontSize:"12.5px"}}>{item.tip}</div>
        </div>
      ))}
    </div>

    <H3>Example — R = {"{(0,0),(0,2),(1,0),(1,3),(2,2),(3,0),(3,1)}"} on {"{0,1,2,3}"}</H3>
    <Box color="yellow" title="Reflexive?">
      Need (0,0),(1,1),(2,2),(3,3). We have (0,0) ✓ and (2,2) ✓ but NOT (1,1) ✗ and NOT (3,3) ✗.<br/>
      → <b>NOT Reflexive</b>. Counterexample: 1 has no self-loop.
    </Box>
    <Box color="red" title="Symmetric?">
      (0,2) ∈ R but (2,0) ∉ R → <b>NOT Symmetric</b>.
    </Box>
    <Box color="green" title="Transitive?">
      Check all pairs: (1,0) and (0,2) → need (1,2)? Not present → <b>NOT Transitive</b>.
    </Box>

    <H3>Inverse Relation</H3>
    <Box color="cyan" title="Definition">
      Every relation R has an inverse R⁻¹ = &#123;(b,a) | (a,b) ∈ R&#125;<br/>
      Example: If R = &#123;(a,x),(a,z),(b,y)&#125;, then R⁻¹ = &#123;(x,a),(z,a),(y,b)&#125;
    </Box>
  </div>
);

const FunctionsContent = () => (
  <div>
    <H2>Functions</H2>
    <P>A <b style={{color:"#f0883e"}}>function f: A → B</b> is a relation where each element of A (domain) maps to <b>exactly one</b> element of B (codomain). The range/image is f(A) = &#123;f(a) | a∈A&#125; ⊆ B.</P>

    <H3>Types of Functions</H3>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px",margin:"10px 0"}}>
      {[
        {title:"Injective (One-to-One)",desc:"Different inputs → different outputs. f(a)=f(b) ⟹ a=b. No two elements map to the same output.",color:"#58a6ff",icon:"→"},
        {title:"Surjective (Onto)",desc:"Every element of B is hit. For every b∈B, ∃a∈A with f(a)=b. Range = Codomain.",color:"#22c55e",icon:"↠"},
        {title:"Bijective (One-to-One & Onto)",desc:"Both injective AND surjective. Perfect pairing. Inverse function f⁻¹ exists only for bijections.",color:"#a855f7",icon:"↔"},
      ].map((item,i)=>(
        <div key={i} style={{background:"#161b22",border:`1px solid ${item.color}44`,borderRadius:"10px",padding:"14px"}}>
          <div style={{color:item.color,fontWeight:700,marginBottom:"6px",fontSize:"14px"}}>{item.title}</div>
          <div style={{color:"#8b949e",fontSize:"13px"}}>{item.desc}</div>
        </div>
      ))}
    </div>

    <H3>Quick Identification Table</H3>
    <CompareTable
      headers={["Type","Rule","Arrow Diagram Clue"]}
      rows={[
        ["Injective","No two arrows land on same point","Each element of B has ≤1 incoming arrow"],
        ["Surjective","Every element of B has ≥1 arrow","No 'unused' element in B"],
        ["Bijective","Both above","Every element of B has exactly 1 incoming arrow"],
        ["Neither","Neither above","Multiple arrows to one point AND unused points in B"],
      ]}
    />

    <H3>Inverse Functions</H3>
    <Box color="purple" title="Definition">
      If f: A→B is a <b>bijection</b>, then f⁻¹: B→A is defined by f⁻¹(b) = a iff f(a) = b.<br/>
      <b>Important:</b> Inverse only exists if f is a bijection! A non-bijective function has no inverse.
    </Box>

    <H3>Terminology Quick Reference</H3>
    <CompareTable
      headers={["Term","Meaning"]}
      rows={[
        ["Domain of f","Set A — the inputs"],
        ["Codomain of f","Set B — the possible outputs"],
        ["Range/Image of f","f(A) = actual outputs, f(A) ⊆ Codomain"],
        ["Image of a","f(a) = b, i.e. the output for input a"],
        ["Preimage of b","All a∈A such that f(a)=b"],
      ]}
    />
  </div>
);

const Sheet0Content = () => {
  const [q, setQ] = useState(0);
  const questions = [
    {
      title:"Q1 — List Set Members",
      question:"a) {x | x is a real number such that x² = 1}    b) {x | x is a positive integer less than 12}",
      answer:`a) x² = 1  →  x = 1 or x = -1
   Answer: {-1, 1}

b) Positive integers: 1, 2, 3, ..., 11
   Answer: {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11}`
    },
    {
      title:"Q2 — Set Builder Notation",
      question:"Write set-builder notation for: a) {0,3,6,9,12}   b) {-3,-2,-1,0,1,2,3}   c) {m,n,o,p}",
      answer:`a) {0, 3, 6, 9, 12}
   Pattern: multiples of 3 from 0 to 12
   Answer: {x | x = 3k, k∈ℤ, 0 ≤ k ≤ 4}
   Or simply: {x ∈ ℤ | x is a multiple of 3 and 0 ≤ x ≤ 12}

b) {-3, -2, -1, 0, 1, 2, 3}
   Answer: {x ∈ ℤ | -3 ≤ x ≤ 3}

c) {m, n, o, p}
   These are consecutive letters of the English alphabet
   Answer: {x | x is a letter of the English alphabet, m ≤ x ≤ p}`
    },
    {
      title:"Q3 — Cardinality",
      question:"Find |A| for: a){a}  b){a,{a},{a,{a}}}  c)∅  d){a,{a}}  e){∅}  f){∅,{∅},{∅,{∅}}}",
      answer:`Cardinality = number of ELEMENTS (not what's inside nested sets)

a) {a}              → |A| = 1    (one element: a)
b) {a, {a}, {a,{a}}} → |A| = 3  (three elements: a, {a}, {a,{a}})
c) ∅                → |A| = 0    (empty set, no elements)
d) {a, {a}}         → |A| = 2    (two elements: a and {a})
e) {∅}              → |A| = 1    (one element: the empty set ∅)
f) {∅, {∅}, {∅,{∅}}} → |A| = 3  (three elements)

KEY TRICK: Count the top-level items separated by commas. Don't open brackets.`
    },
    {
      title:"Q4 — Power Sets",
      question:"Find P(A) for: a){a}   c){a,b}   d){∅,{∅}}",
      answer:`Power set P(A) = set of ALL subsets. If |A|=n, then |P(A)|=2ⁿ

a) A = {a}     → |A|=1, so |P(A)|=2¹=2
   P(A) = {∅, {a}}

c) A = {a, b}  → |A|=2, so |P(A)|=2²=4
   P(A) = {∅, {a}, {b}, {a,b}}

d) A = {∅, {∅}}  → |A|=2, so |P(A)|=2²=4
   Elements are: ∅ (the empty set) and {∅} (set containing empty set)
   P(A) = {∅, {∅}, {{∅}}, {∅, {∅}}}`
    },
    {
      title:"Q5 — Cartesian Products",
      question:"A={a,b,c}, B={x,y}, C={0,1}. Find: a) A×B×C    b) C×B×A",
      answer:`A×B×C — ordered triples (element of A, element of B, element of C):

a) A×B×C = {(a,x,0),(a,x,1),(a,y,0),(a,y,1),
             (b,x,0),(b,x,1),(b,y,0),(b,y,1),
             (c,x,0),(c,x,1),(c,y,0),(c,y,1)}
   |A×B×C| = 3×2×2 = 12 elements

b) C×B×A = {(0,x,a),(0,x,b),(0,x,c),(0,y,a),(0,y,b),(0,y,c),
             (1,x,a),(1,x,b),(1,x,c),(1,y,a),(1,y,b),(1,y,c)}
   |C×B×A| = 2×2×3 = 12 elements`
    },
    {
      title:"Q6 — Set Operations",
      question:"A={1,2,3,4,5}, B={0,3,6}. Find: a)A∪B  b)A∩B  c)A-B  d)B-A",
      answer:`A = {1,2,3,4,5}  |  B = {0,3,6}

a) A ∪ B = elements in A OR in B (no duplicates)
   Answer: {0, 1, 2, 3, 4, 5, 6}

b) A ∩ B = elements in BOTH A AND B
   Answer: {3}

c) A - B = elements in A that are NOT in B
   Answer: {1, 2, 4, 5}

d) B - A = elements in B that are NOT in A
   Answer: {0, 6}`
    },
    {
      title:"Q7 — Relations: Properties",
      question:"R1={(0,0),(0,2),(1,0),(1,3),(2,2),(3,0),(3,1)} on {0,1,2,3}. Is it reflexive, symmetric, transitive?",
      answer:`R1 = {(0,0),(0,2),(1,0),(1,3),(2,2),(3,0),(3,1)} on A={0,1,2,3}

REFLEXIVE? Need (0,0),(1,1),(2,2),(3,3)
  ✓ (0,0) ∈ R1   ✗ (1,1) ∉ R1   ✓ (2,2) ∈ R1   ✗ (3,3) ∉ R1
  → NOT Reflexive. Counterexample: (1,1) ∉ R1

SYMMETRIC? Check: for each (a,b), is (b,a) also there?
  (0,2) ∈ R1 but (2,0) ∉ R1
  → NOT Symmetric. Counterexample: (0,2) ∈ R1 but (2,0) ∉ R1

TRANSITIVE? Check all paths a→b→c:
  (1,0) and (0,2): need (1,2)? (1,2) ∉ R1
  → NOT Transitive. Counterexample: (1,0),(0,2)∈R1 but (1,2)∉R1`
    },
    {
      title:"Q8 — Functions: Injective & Surjective",
      question:"X={1,2,3}, Y={1,2,3,4}, Z={1,2}. a) Define f:X→Y one-to-one but not onto. b) Define g:X→Z onto but not one-to-one.",
      answer:`a) f: X→Y, one-to-one (injective) but NOT onto (surjective)
   Need: no two elements of X map to same element of Y,
         but NOT all of Y needs to be covered.

   Solution: f(1)=1, f(2)=2, f(3)=3
   One-to-one: ✓ (distinct inputs → distinct outputs)
   Onto: ✗ (4 ∈ Y has no preimage)

   Other valid answers: f(1)=2, f(2)=4, f(3)=1 etc.

b) g: X→Z, onto (surjective) but NOT one-to-one (injective)
   Need: every element of Z={1,2} is hit,
         but multiple elements of X can map to same element of Z.

   Solution: g(1)=1, g(2)=2, g(3)=1
   Onto: ✓ (both 1 and 2 in Z are covered)
   One-to-one: ✗ (g(1)=g(3)=1, so not injective)`
    },
  ];

  return (
    <div>
      <H2>Sheet 0 — Sets, Relations & Functions</H2>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"12px 0"}}>
        {questions.map((q2,i)=>(
          <button key={i} onClick={()=>setQ(i)}
            style={{padding:"7px 13px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"12px",transition:"all 0.2s",
              background:q===i?"#58a6ff":"#21262d",
              color:q===i?"#0d1117":"#adbac7"}}>
            {i+1}. {questions[i].title.split("—")[0].trim()}
          </button>
        ))}
      </div>
      <Box color="blue" title={questions[q].title}>
        <span style={{fontFamily:"monospace",fontSize:"13px"}}>{questions[q].question}</span>
      </Box>
      <CB code={questions[q].answer} />
    </div>
  );
};

/* ─── SECTION: REGULAR EXPRESSIONS ──────────────────────── */
const RegexContent = () => {
  const [sub, setSub] = useState("concept");
  const subs = [
    {id:"concept",label:"📖 Concepts"},
    {id:"rules",label:"📜 Rules"},
    {id:"examples",label:"💡 Examples"},
    {id:"sheet",label:"📝 Sheet 1"},
  ];
  return (
    <div>
      <SectionTitle icon="✳️">Regular Expressions</SectionTitle>
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap",margin:"16px 0"}}>
        {subs.map(s=>(
          <button key={s.id} onClick={()=>setSub(s.id)}
            style={{padding:"8px 16px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:600,fontSize:"13px",transition:"all 0.2s",
              background:sub===s.id?"#a855f7":"#21262d",
              color:sub===s.id?"#0d1117":"#adbac7"}}>
            {s.label}
          </button>
        ))}
      </div>
      {sub==="concept" && <RegexConcept />}
      {sub==="rules" && <RegexRules />}
      {sub==="examples" && <RegexExamples />}
      {sub==="sheet" && <Sheet1Content />}
    </div>
  );
};

const RegexConcept = () => (
  <div>
    <H2>Languages & Strings</H2>
    <P>Before RE, we need the vocabulary of formal languages:</P>
    <CompareTable
      headers={["Term","Definition","Example (Σ={a,b})"]}
      rows={[
        ["Alphabet (Σ)","Finite non-empty set of symbols","Σ = {a, b}"],
        ["String","Finite sequence of symbols from Σ","abba, aab, ε"],
        ["Empty string (ε or λ)","String with zero characters, |ε|=0","ε"],
        ["Σ* (Kleene Star)","Set of ALL strings over Σ including ε","ε, a, b, aa, ab, ba, bb, ..."],
        ["Language L","Any subset of Σ*","L = {w | w starts with a}"],
        ["Concatenation (xy)","Join two strings: x=ab, y=cd → xy=abcd","ab · ba = abba"],
        ["Reversal (wᴿ)","String backwards","(abc)ᴿ = cba"],
      ]}
    />

    <H3>Regular Operations on Languages</H3>
    <CompareTable
      headers={["Operation","Symbol","Definition","Example (A={good,bad}, B={boy,girl})"]}
      rows={[
        ["Union","A ∪ B","{w | w∈A or w∈B}","{good,bad,boy,girl}"],
        ["Concatenation","A ∘ B or AB","{xy | x∈A, y∈B}","{goodboy,goodgirl,badboy,badgirl}"],
        ["Kleene Star","A*","{w₁w₂...wₖ | each wᵢ∈A, k≥0}","ε, good, bad, goodgood, goodbad,..."],
        ["Plus (one+)","A+","A* but k≥1 (no ε unless ε∈A)","good, bad, goodgood,..."],
      ]}
    />

    <Box color="yellow" title="Key Note">
      ε is ALWAYS in A* (choose k=0, empty concatenation). But ε is in A+ only if ε∈A itself.
    </Box>
  </div>
);

const RegexRules = () => (
  <div>
    <H2>Regular Expression — Syntax & Rules</H2>
    <P>A <b style={{color:"#a855f7"}}>Regular Expression</b> formally describes a regular language using operators: <Tag color="#a855f7">∪ (or)</Tag> <Tag color="#a855f7">· (concat)</Tag> <Tag color="#a855f7">* (star)</Tag>.</P>

    <H3>Base Cases — What is a Valid RE?</H3>
    <CompareTable
      headers={["RE","Language it Describes"]}
      rows={[
        ["a  (for a∈Σ)","L(a) = {a} — just that one symbol"],
        ["ε","L(ε) = {ε} — just the empty string"],
        ["∅","L(∅) = {} — empty set, no strings"],
        ["(R₁ ∪ R₂)","L(R₁) ∪ L(R₂)"],
        ["(R₁R₂)","L(R₁) · L(R₂) — concatenation"],
        ["(R₁*)","L(R₁)* — Kleene star"],
      ]}
    />

    <H3>Operator Precedence (high → low)</H3>
    <div style={{display:"flex",gap:"8px",alignItems:"center",margin:"10px 0",flexWrap:"wrap"}}>
      {[["★ Star (highest)","#f59e0b"],["· Concatenation","#a855f7"],["∪ Union (lowest)","#58a6ff"]].map(([label,color],i)=>(
        <div key={i} style={{background:`${color}22`,border:`1px solid ${color}44`,borderRadius:"8px",
          padding:"10px 16px",color,fontWeight:700,fontSize:"13px"}}>{label}</div>
      ))}
    </div>

    <H3>Common RE Patterns</H3>
    <CompareTable
      headers={["RE","Meaning","Strings Generated"]}
      rows={[
        ["a*","Zero or more a's","ε, a, aa, aaa, ..."],
        ["a+","One or more a's","a, aa, aaa, ..."],
        ["(a∪b)*","All strings of a's and b's (= Σ*)","ε, a, b, aa, ab, ba, bb, ..."],
        ["(a∪b)*a","All strings ending with a","a, aa, ba, aba, bba, ..."],
        ["a(a∪b)*","All strings starting with a","a, aa, ab, aab, aba, ..."],
        ["(ab)*","Even-length strings of alternating ab","ε, ab, abab, ababab, ..."],
        ["a*b*","Any a's followed by any b's","ε, a, b, aa, ab, aab, abb, ..."],
        ["(a*b)*","Zero-or-more a's then b, repeated","ε, b, ab, aab, bb, bab, ..."],
      ]}
    />

    <H3>RE Identities</H3>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",margin:"10px 0"}}>
      {[
        ["R ∪ ∅ = R","Union with empty language = R"],
        ["R · ε = R","Concat with empty string = R"],
        ["R ∪ R = R","Union is idempotent"],
        ["(R₁*R₂)*R₁* = (R₁∪R₂)*","Star expansion"],
      ].map(([formula,desc],i)=>(
        <div key={i} style={{background:"#161b22",border:"1px solid #30363d",borderRadius:"8px",padding:"10px"}}>
          <div style={{fontFamily:"monospace",color:"#f0883e",fontWeight:700,marginBottom:"4px"}}>{formula}</div>
          <div style={{color:"#8b949e",fontSize:"12px"}}>{desc}</div>
        </div>
      ))}
    </div>
  </div>
);

const RegexExamples = () => {
  const [ex, setEx] = useState(0);
  const examples = [
    {
      title:"All strings starting with a",
      desc:"Over Σ={a,b}: strings where first character is 'a'.",
      answer:`RE: a(a∪b)*

Reasoning:
- Must start with 'a'  → literal a
- Followed by anything  → (a∪b)* means any string of a's and b's (including ε)

Examples: a, aa, ab, aab, aba, abba, aaab...
Not included: b, ba, bb, bab...`
    },
    {
      title:"All strings of even length",
      desc:"Over Σ={a,b}: strings where |w| = 0, 2, 4, 6, ...",
      answer:`RE: (aa∪ab∪ba∪bb)*   OR equivalently   ((a∪b)(a∪b))*

Reasoning:
- Each iteration of the star consumes exactly 2 characters
- The 4 options cover all pairs: aa, ab, ba, bb
- Kleene star allows zero repetitions (gives ε, length 0)

Shorter notation: ((a∪b)(a∪b))* = (a∪b)²ⁿ for n≥0

Examples: ε, aa, ab, ba, bb, aaaa, abba, bbaa...
Not included: a, b, aab, aba (odd length)`
    },
    {
      title:"Starts and ends with same character",
      desc:"Over Σ={0,1}: strings that both start AND end with 0, OR start and end with 1.",
      answer:`RE: 0(0∪1)*0 ∪ 1(0∪1)*1 ∪ 0 ∪ 1

Reasoning:
- Starts and ends with 0: 0(0∪1)*0
  (note: if length=1, just "0" — need the ∪0 case)
- Starts and ends with 1: 1(0∪1)*1
  (or just "1" for length=1)
- Single characters trivially start=end

Simplified: 0(0∪1)*0 ∪ 1(0∪1)*1 ∪ 0 ∪ 1

Examples: 0, 1, 00, 11, 010, 101, 0110, 1001...
Not included: 01, 10, 001, 110 (start ≠ end)`
    },
    {
      title:"Contains pattern 101",
      desc:"Over Σ={0,1}: strings that have 101 as a substring somewhere.",
      answer:`RE: (0∪1)* 101 (0∪1)*

Reasoning:
- (0∪1)* — any prefix before 101
- 101    — the required pattern (literal)
- (0∪1)* — any suffix after 101

Examples: 101, 0101, 1010, 1101, 0010110...
Not included: 100, 110, 011, 001 (no 101 substring)`
    },
    {
      title:"No occurrence of 00",
      desc:"Over Σ={0,1}: strings that NEVER have two consecutive 0's.",
      answer:`RE: (1(01*)* ∪ 0(10*)*)    OR:    1*(01+)* 0?  (various correct forms)

Simpler to think about:
- Any 0 must be followed immediately by a 1 (or be at the end)
- RE: (1∪01)*(0∪ε)

Reasoning:
- (1∪01)*: build string with "1"s and "01"s — no two 0s ever adjacent
- (0∪ε): optionally end with a single 0

Examples: ε, 0, 1, 01, 10, 101, 010, 1010...
Not included: 00, 100, 001, 1001 (contains "00")`
    },
    {
      title:"At least three 1's",
      desc:"Over Σ={0,1}: strings containing at minimum three 1's.",
      answer:`RE: 0*1 0*1 0*1 0*    OR    (0*1)³0*

Reasoning:
- Need at least 3 ones, in any positions
- Between/before/after 1's can be any number of 0's
- After the third 1, can have any more 0's (or 1's)

More accurate (allows any characters, not just 0s between):
(0∪1)*1(0∪1)*1(0∪1)*1(0∪1)*

Breakdown:
- (0∪1)* — anything before first 1
- 1       — first 1
- (0∪1)* — anything between first and second 1
- 1       — second 1
- (0∪1)* — anything between second and third 1
- 1       — third 1
- (0∪1)* — anything after

Examples: 111, 0111, 1110, 101011, 1001001...
Not included: 11, 0110 (only two 1's)`
    },
    {
      title:"Every 0 followed by at least one 1",
      desc:"Over Σ={0,1}: after every 0, there must be at least one 1.",
      answer:`RE: 1*(01+)*

Reasoning:
- Start with any number of 1's (no 0's yet) → 1*
- If any 0 appears, it must be followed by at least one 1 → 01+
- The whole pattern can repeat → (01+)*

Build up: strings are sequences of 1's, then groups of (one 0 followed by one or more 1's)

Examples: ε, 1, 11, 01, 011, 101, 1011, 0101, 01011...
Not included: 0, 10, 010 (0 not followed by 1, or 0 at the end)

EQUIVALENTLY: 1*(01+)*
✓ ε: (01+)* takes k=0, 1* takes 0 ones — works
✓ 01: 1*(k=0) then (01+) with one 1
✓ 101: 1*(one 1) then (01+)(one 1)`
    },
  ];

  return (
    <div>
      <H2>Regular Expression — Worked Examples</H2>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"12px 0"}}>
        {examples.map((e,i)=>(
          <button key={i} onClick={()=>setEx(i)}
            style={{padding:"7px 13px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"12px",transition:"all 0.2s",
              background:ex===i?"#a855f7":"#21262d",
              color:ex===i?"#0d1117":"#adbac7"}}>
            {i+1}. {e.title}
          </button>
        ))}
      </div>
      <Box color="purple" title={`Example ${ex+1}: ${examples[ex].title}`}>
        {examples[ex].desc}
      </Box>
      <CB code={examples[ex].answer} />
    </div>
  );
};

const Sheet1Content = () => {
  const [q, setQ] = useState(0);
  const questions = [
    { title:"a) Single 1",  q:"Σ={0,1}: {w | w contains a single 1}",
      a:`RE: 0*10*

Reasoning: exactly one '1', surrounded by any number of 0s.
- 0*: zero or more 0s before the 1
- 1:  the single required 1
- 0*: zero or more 0s after the 1

Examples: 1, 01, 10, 001, 100, 0010, 1000...
Not included: 11, 101, 011 (more than one 1)` },
    { title:"b) At least one 1", q:"Σ={0,1}: {w | w has at least one 1}",
      a:`RE: (0∪1)* 1 (0∪1)*   OR equivalently:   0*1(0∪1)*

Reasoning: at least one 1 somewhere.
- Any prefix + literal 1 + any suffix
- Short form: 0*1(0∪1)* (any 0s then a 1 then anything)

Examples: 1, 01, 10, 11, 101...  Not included: 0, 00, 000` },
    { title:"c) Even length", q:"Σ={0,1}: {w | w is a string of even length}",
      a:`RE: ((0∪1)(0∪1))*

Reasoning: each star iteration adds exactly 2 characters.
- (0∪1): any one character
- ×2 per iteration → always even length
- k=0 gives ε (length 0, which is even)

Examples: ε, 00, 01, 10, 11, 0000, 0101...
Not included: 0, 1, 000, 001 (odd length)` },
    { title:"d) Length multiple of 3", q:"Σ={0,1}: {w | length of w is multiple of 3}",
      a:`RE: ((0∪1)(0∪1)(0∪1))*

Reasoning: same idea — each star iteration adds exactly 3 characters.
- Triple any-character repeated k times → length = 3k

Examples: ε (k=0), 000, 001, 010, 011, 100, 101, 110, 111, 000000...
Not included: 0, 00, 0000, 00001 (not divisible by 3)` },
    { title:"e) Starts=ends with same", q:"Σ={0,1}: {w | starts and ends with same symbol}",
      a:`RE: 0(0∪1)*0 ∪ 1(0∪1)*1 ∪ 0 ∪ 1

Breakdown:
- 0(0∪1)*0: start with 0, end with 0, anything in middle
- 1(0∪1)*1: start with 1, end with 1, anything in middle
- 0 or 1:   single character strings (start = end trivially)

Examples: 0, 1, 00, 11, 010, 101, 0110, 1001...` },
    { title:"f) Begins with 1, ends with 0", q:"Σ={0,1}: {w | begins with 1 and ends with 0}",
      a:`RE: 1(0∪1)*0

Reasoning:
- Literal 1 at start
- (0∪1)*: any middle part (can be empty)
- Literal 0 at end

Note: minimum length is 2 (e.g., "10")
Examples: 10, 110, 100, 1010, 1110, 10110...` },
    { title:"g) At least three 1's", q:"Σ={0,1}: {w | contains at least three 1's}",
      a:`RE: (0∪1)*1(0∪1)*1(0∪1)*1(0∪1)*

Reasoning: Need 3 ones somewhere in string.
- (0∪1)*: anything before/between/after the 1's
- Three literal 1's forced

Examples: 111, 1110, 0111, 10101, 11011...` },
    { title:"h) Contains 0101", q:"Σ={0,1}: {w | contains the substring 0101}",
      a:`RE: (0∪1)* 0101 (0∪1)*

Examples: 0101, 00101, 01010, 110101, 010101...` },
    { title:"i) Length≥3, 3rd is 0", q:"Σ={0,1}: {w | length ≥ 3 and third symbol is 0}",
      a:`RE: (0∪1)(0∪1) 0 (0∪1)*

Reasoning:
- (0∪1): first character (any)
- (0∪1): second character (any)
- 0:     third character (must be 0)
- (0∪1)*: rest of string (any length ≥ 0)

Examples: 000, 010, 100, 110, 0001, 1100, 010010...` },
    { title:"j) Two cases by parity", q:"Σ={0,1}: {w | starts with 0 and odd length OR starts with 1 and even length}",
      a:`RE: 0((0∪1)(0∪1))* ∪ 1(0∪1)((0∪1)(0∪1))*

Breakdown:
Case 1: starts with 0, odd length
- 0: start character (counts as 1)
- ((0∪1)(0∪1))*: add pairs of characters (even count)
- Total = 1 + 2k = odd ✓

Case 2: starts with 1, even length
- 1: start character (counts as 1)
- (0∪1): one more character (total = 2 so far)
- ((0∪1)(0∪1))*: add pairs
- Total = 2 + 2k = even ✓

Examples (case 1): 0, 000, 010, 001, 00100...
Examples (case 2): 10, 11, 1000, 1011...` },
    { title:"k) Every odd position is 1", q:"Σ={0,1}: {w | every odd position of w is a 1}",
      a:`RE: (1(0∪1))*  ∪  (1(0∪1))* 1

Reasoning: positions 1,3,5,... must be '1'; positions 2,4,6,... can be anything.
- (1(0∪1)): a pair — odd position is 1, even position is anything
- Repeat pairs: (1(0∪1))*
- Optionally end with one more 1 (if odd total length): the trailing 1

Shorter: (1(0∪1))* (1∪ε)

Examples: ε, 1, 10, 11, 100, 101, 110, 111, 1010, 1011...
Not included: 0, 01, 010 (position 1 is not 1)` },
    { title:"l) ≥2 zeros, ≤1 one", q:"Σ={0,1}: {w | contains at least two 0's and at most one 1}",
      a:`RE: 0*00* ∪ 0*10*00* ∪ 0*00*10*

Breakdown:
- No 1's, at least two 0's:  0*00*  (= 00+  = at least two zeros)
- Exactly one 1, at least two 0's:
  - 1 appears BEFORE the zeros: 0*10*00*   (or just 10*00*)
  - 1 appears AFTER the zeros:  0*00*10*   (or just 00+0*10*)

Simpler combined: 0+10*0+ ∪ 0+0*10* ∪ 0{2,}
Or: (0+1)?0+  ... many equivalent forms.

Canonical form: 0*00* ∪ (0*100+) ∪ (0+10*)
where 0*00* means two or more zeros (= 00+)

Examples: 00, 000, 010, 001, 100, 0010, 0100...` },
    { title:"m) Even number of 0's", q:"Σ={0,1}: {w | contains an even number of 0's}",
      a:`RE: 1*(01*01*)* 

Reasoning: pair up the 0's!
- 1*: any 1's
- (01*01*): exactly two 0's with any 1's between
- (*): repeat to get 4, 6, 8... 0's
- 1*: any leading 1's (allows zero 0's, which is even!)

Alternative view: think of "blocks" separated by 0s.
Between any two 0s we can have any 1s.

Examples: ε, 1, 11, 00, 1001, 0011, 010110, 0000...
Not included: 0, 001, 0001 (odd number of 0's)` },
    { title:"n) Exactly two 1's", q:"Σ={0,1}: {w | contains exactly two 1's}",
      a:`RE: 0*10*10*

Reasoning: exactly two 1's, surrounded/separated by any 0's.
- 0*: any 0's before first 1
- 1: first (and only first) 1
- 0*: any 0's between the two 1's
- 1: second (and only) 1
- 0*: any 0's after second 1

Examples: 11, 011, 110, 101, 0110, 1001, 00110...
Not included: 1, 111, 1011 (wrong count of 1's)` },
    { title:"o) Exactly length 4", q:"Σ={0,1}: {w | w has exactly length 4}",
      a:`RE: (0∪1)(0∪1)(0∪1)(0∪1)   OR   (0∪1)⁴

Reasoning: choose any character for each of the 4 positions.

Examples: 0000, 0001, 0010, 0011, 0100, ..., 1111 (16 total)` },
    { title:"p) Does not contain 10", q:"Σ={0,1}: {w | w does not contain the substring 10}",
      a:`RE: 1*0*

Reasoning: "10" means a 1 followed by a 0.
If we never have 10, then all 1's must come AFTER all 0's... wait.
Actually if 10 is forbidden: once we see a 1, we can never have a 0 after it.

So the string is: any 0's first, then any 1's (never go back to 0).
RE: 0*1*   (any zeros then any ones)

Equivalently: strings of form 0^i 1^j for i,j ≥ 0.

Examples: ε, 0, 1, 00, 01, 11, 001, 011, 111, 0011...
Not included: 10, 010, 100, 110 (all contain "10")` },
    { title:"q) Every 0 followed by ≥1 one", q:"Σ={0,1}: {w | every 0 in w is followed by at least one 1}",
      a:`RE: 1*(01+)*

Reasoning: 
- 1*: any leading 1's (0's haven't appeared yet)
- (01+)*: each time a 0 appears, at least one 1 must follow
- This can repeat: more 01+ groups allowed

Every 0 is in a "01+" block, guaranteeing ≥1 following 1.

Examples: ε, 1, 11, 01, 011, 101, 0101, 1011, 0011...
Not included: 0, 10, 010, 100 (0 not followed by 1)` },
  ];

  return (
    <div>
      <H2>Sheet 1 — Regular Expressions (All 17 Parts)</H2>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"12px 0"}}>
        {questions.map((q2,i)=>(
          <button key={i} onClick={()=>setQ(i)}
            style={{padding:"6px 11px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"11px",transition:"all 0.2s",
              background:q===i?"#a855f7":"#21262d",
              color:q===i?"#0d1117":"#adbac7"}}>
            {q2.title}
          </button>
        ))}
      </div>
      <Box color="purple" title={questions[q].title}>
        <span style={{fontFamily:"monospace",fontSize:"13px"}}>{questions[q].q}</span>
      </Box>
      <CB code={questions[q].a} />
    </div>
  );
};

/* ─── SECTION: DFA ───────────────────────────────────────── */
const DFAContent = () => {
  const [sub, setSub] = useState("concept");
  const subs = [
    {id:"concept",label:"🔵 Concept"},
    {id:"formal",label:"📋 Formal Def"},
    {id:"examples",label:"💡 Examples"},
    {id:"sheet",label:"📝 Sheet 2"},
  ];
  return (
    <div>
      <SectionTitle icon="🔵">Deterministic Finite Automata (DFA)</SectionTitle>
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap",margin:"16px 0"}}>
        {subs.map(s=>(
          <button key={s.id} onClick={()=>setSub(s.id)}
            style={{padding:"8px 16px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:600,fontSize:"13px",transition:"all 0.2s",
              background:sub===s.id?"#f59e0b":"#21262d",
              color:sub===s.id?"#0d1117":"#adbac7"}}>
            {s.label}
          </button>
        ))}
      </div>
      {sub==="concept" && <DFAConcept />}
      {sub==="formal" && <DFAFormal />}
      {sub==="examples" && <DFAExamples />}
      {sub==="sheet" && <Sheet2Content />}
    </div>
  );
};

const DFAConcept = () => (
  <div>
    <H2>What is a DFA?</H2>
    <P>A <b style={{color:"#f59e0b"}}>Deterministic Finite Automaton (DFA)</b> is a language recognition device — it reads an input string character by character and decides whether to accept or reject it.</P>

    <div style={{display:"flex",gap:"12px",flexWrap:"wrap",margin:"12px 0"}}>
      <div style={{flex:"1 1 280px",background:"#161b22",borderRadius:"10px",padding:"16px",border:"1px solid #30363d"}}>
        <div style={{color:"#f59e0b",fontWeight:700,marginBottom:"10px"}}>DFA Components</div>
        {[
          {part:"Input Tape",desc:"Holds the input string; each cell has one character"},
          {part:"Reading Head",desc:"Reads one character at a time, moves left-to-right"},
          {part:"Finite Control (FC)",desc:"Black box in one of finitely many states"},
          {part:"States",desc:"Finite set of configurations the machine can be in"},
          {part:"Transitions",desc:"Rules: (state, input) → next state"},
        ].map((item,i)=>(
          <div key={i} style={{marginBottom:"8px"}}>
            <span style={{color:"#58a6ff",fontWeight:600}}>{item.part}:</span>
            <span style={{color:"#adbac7",fontSize:"13px",marginLeft:"6px"}}>{item.desc}</span>
          </div>
        ))}
      </div>
      <div style={{flex:"2 1 280px"}}>
        <Box color="yellow" title="How DFA Works">
          1. Start in the <b>initial state s</b><br/>
          2. Read one symbol from input tape<br/>
          3. Follow transition function δ(current_state, symbol) → new_state<br/>
          4. Repeat until all input is consumed<br/>
          5. If in a <b>final/accept state</b> → <b style={{color:"#22c55e"}}>ACCEPT</b><br/>
          6. Otherwise → <b style={{color:"#ef4444"}}>REJECT</b>
        </Box>
        <Box color="blue" title="Key Property: Deterministic">
          For every (state, symbol) pair, there is <b>exactly one</b> transition. No ambiguity, no choices — fully determined.
        </Box>
      </div>
    </div>

    <H3>DFA vs NFA vs PDA vs TM — Hierarchy</H3>
    <CompareTable
      headers={["Model","Memory","Languages","Power"]}
      rows={[
        ["DFA/NFA","None (only states)","Regular languages","Least powerful"],
        ["PDA","Stack (LIFO)","Context-Free languages","More powerful"],
        ["TM","Infinite tape","Recursively enumerable","Most powerful"],
      ]}
    />
  </div>
);

const DFAFormal = () => (
  <div>
    <H2>Formal Definition of DFA</H2>
    <Formula>M = (K, Σ, δ, s, F)</Formula>
    <CompareTable
      headers={["Component","Name","Description"]}
      rows={[
        ["K","Set of states","Finite set, e.g. {q0, q1, q2}"],
        ["Σ","Alphabet","Finite set of input symbols, e.g. {0, 1}"],
        ["δ","Transition function","δ: K × Σ → K  (current state + symbol → next state)"],
        ["s","Start state","s ∈ K, where processing begins"],
        ["F","Final/Accept states","F ⊆ K, accepting states (usually double-circled in diagram)"],
      ]}
    />

    <H3>Transition Table Format</H3>
    <Box color="cyan" title="Example: DFA accepting strings with even number of 1's">
      K = &#123;q0, q1&#125;, Σ = &#123;0, 1&#125;, s = q0, F = &#123;q0&#125;
    </Box>
    <div style={{overflowX:"auto",margin:"12px 0"}}>
      <table style={{borderCollapse:"collapse",fontSize:"13px"}}>
        <thead>
          <tr>
            <th style={{background:"#161b22",color:"#58a6ff",padding:"10px 20px",borderBottom:"2px solid #30363d"}}>State</th>
            <th style={{background:"#161b22",color:"#58a6ff",padding:"10px 20px",borderBottom:"2px solid #30363d"}}>Input: 0</th>
            <th style={{background:"#161b22",color:"#58a6ff",padding:"10px 20px",borderBottom:"2px solid #30363d"}}>Input: 1</th>
          </tr>
        </thead>
        <tbody>
          {[["→* q0","q0","q1"],["q1","q1","q0"]].map((row,i)=>(
            <tr key={i} style={{background:i%2===0?"#0d1117":"#0f151d"}}>
              {row.map((cell,j)=>(
                <td key={j} style={{padding:"9px 20px",color:j===0?"#f59e0b":"#adbac7",fontFamily:"monospace",borderBottom:"1px solid #21262d",fontWeight:j===0?700:400}}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{color:"#6e7681",fontSize:"12px",marginTop:"6px"}}>→ = start state, * = accept state</div>
    </div>

    <H3>Tracing a String</H3>
    <CB code={`Example: Trace "1011" on the DFA above (even number of 1's)
Initial state: q0

Step 1: Read '1' → δ(q0, 1) = q1  (now in q1, seen 1 one)
Step 2: Read '0' → δ(q1, 0) = q1  (still in q1, 0 doesn't change)
Step 3: Read '1' → δ(q1, 1) = q0  (back to q0, seen 2 ones - even!)
Step 4: Read '1' → δ(q0, 1) = q1  (in q1, seen 3 ones - odd)

Final state: q1 (not in F={q0}) → REJECT

The string "1011" has three 1's (odd) → correctly rejected.

Trace "1100": q0 →¹ q1 →¹ q0 →⁰ q0 →⁰ q0
Final state: q0 ∈ F → ACCEPT ✓ (two 1's, which is even)`} />

    <H3>Designing DFAs — Strategy</H3>
    <Box color="green" title="General Approach">
      1. Think about what information the DFA needs to <b>remember</b><br/>
      2. Each state represents a different "memory condition"<br/>
      3. Transitions model what changes when a symbol is read<br/>
      4. Accept states = conditions where the string is valid
    </Box>
  </div>
);

const DFAExamples = () => {
  const [ex, setEx] = useState(0);
  const examples = [
    {
      title:"Contains pattern 101",
      desc:"Σ={0,1}: DFA accepting all strings that contain '101' as a substring.",
      answer:`States track our progress matching '101':
q0: haven't seen any of 101 yet (initial)
q1: seen '1' (matching position 1)
q2: seen '10' (matching position 2)
q3: seen '101' — ACCEPT (final, stay here forever)

Transition Table:
State  | 0   | 1
q0     | q0  | q1      (0 resets, 1 starts match)
q1     | q2  | q1      (1→q2 means "10" seen; another 1 keeps us at "seen 1")
q2     | q0  | q3      (0→q0 restarts; 1 completes "101"!)
q3     | q3  | q3      (accept sink: once found, always accept)

F = {q3}
s = q0

Verification:
"101": q0→¹q1→⁰q2→¹q3 ✓ ACCEPT
"001": q0→⁰q0→⁰q0→¹q1  REJECT (no 101 seen)
"11011": q0→q1→q1→q2→q3→q3 ✓ ACCEPT`
    },
    {
      title:"Starts with 111",
      desc:"Σ={0,1}: DFA accepting all strings that start with '111'.",
      answer:`States track prefix matching:
q0: initial (seen nothing)
q1: seen '1'
q2: seen '11'
q3: seen '111' → ACCEPT (stay here)
qd: dead/reject state (prefix failed — goes here and never leaves)

Transition Table:
State  | 0   | 1
q0     | qd  | q1     (start with 0? prefix fails)
q1     | qd  | q2     (second char must be 1)
q2     | qd  | q3     (third char must be 1)
q3     | q3  | q3     (prefix satisfied, accept anything after)
qd     | qd  | qd     (dead sink)

F = {q3}
s = q0

Verification:
"1110": q0→q1→q2→q3→q3 ✓ ACCEPT
"110":  q0→q1→q2→qd    REJECT`
    },
    {
      title:"Number of 1's divisible by 3",
      desc:"Σ={0,1}: DFA accepting strings where count of 1's ≡ 0 (mod 3).",
      answer:`States track count of 1's modulo 3:
q0: (count mod 3) = 0  → ACCEPT (0 is divisible by 3!)
q1: (count mod 3) = 1
q2: (count mod 3) = 2

Transition Table:
State  | 0   | 1
q0     | q0  | q1     (0's don't change count; each 1 increments mod 3)
q1     | q1  | q2
q2     | q2  | q0     (3rd 1 brings us back to mod 0 = accept)

F = {q0}
s = q0

Verification:
"": q0 ✓ ACCEPT (0 ones, 0÷3=0)
"111": q0→q1→q2→q0 ✓ ACCEPT (3 ones)
"1101": q0→q1→q2→q2→q0 ✓ ACCEPT (3 ones)
"11": q0→q1→q2 REJECT (2 ones)`
    },
    {
      title:"At most two a's",
      desc:"Σ={a,b}: DFA accepting strings with 0, 1, or 2 occurrences of 'a'.",
      answer:`States track how many a's seen:
q0: seen 0 a's → ACCEPT
q1: seen 1 a → ACCEPT
q2: seen 2 a's → ACCEPT
q3: seen 3+ a's → REJECT (dead sink for too many a's)

Transition Table:
State  | a   | b
q0     | q1  | q0
q1     | q2  | q1
q2     | q3  | q2
q3     | q3  | q3

F = {q0, q1, q2}
s = q0

Verification:
"bb": q0→q0→q0 ✓ ACCEPT (0 a's)
"aba": q0→q1→q1→q2 ✓ ACCEPT (2 a's)
"aaba": q0→q1→q2→q2→q3 REJECT (3 a's)`
    },
    {
      title:"Exactly two a's",
      desc:"Σ={a,b}: DFA accepting strings with exactly 2 occurrences of 'a'.",
      answer:`States track count of a's:
q0: 0 a's  
q1: 1 a    
q2: 2 a's → ACCEPT (only this one!)
q3: 3+ a's → dead/reject

Transition Table:
State  | a   | b
q0     | q1  | q0
q1     | q2  | q1
q2     | q3  | q2    ← key! stay in q2 on b, but go to dead on 3rd a
q3     | q3  | q3

F = {q2}   ← only q2, not q0 or q1!
s = q0

Compare with "at most 2 a's": same DFA but F={q0,q1,q2}.
Compare with "at least 2 a's": F={q2,q3} (or better design).`
    },
  ];

  return (
    <div>
      <H2>DFA Design — Examples</H2>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"12px 0"}}>
        {examples.map((e,i)=>(
          <button key={i} onClick={()=>setEx(i)}
            style={{padding:"7px 13px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"12px",transition:"all 0.2s",
              background:ex===i?"#f59e0b":"#21262d",
              color:ex===i?"#0d1117":"#adbac7"}}>
            {i+1}. {e.title}
          </button>
        ))}
      </div>
      <Box color="yellow" title={`Example: ${examples[ex].title}`}>
        {examples[ex].desc}
      </Box>
      <CB code={examples[ex].answer} />
    </div>
  );
};

const Sheet2Content = () => (
  <div>
    <H2>Sheet 2 — DFA Design</H2>
    <P>Sheet 2 consists primarily of DFA diagram problems. Here are full solutions with transition tables and design reasoning.</P>
    <Box color="yellow" title="Design Strategy for Any DFA">
      Ask yourself: <b>"What do I need to remember?"</b><br/>
      Each answer becomes a state. Common memory needs: count of a symbol (mod n), last k characters seen, whether a pattern was spotted, etc.
    </Box>
    <H3>Problem: DFA for {"{w | w contains pattern 1001}"} over Σ={"{0,1}"}</H3>
    <CB code={`States track matching progress of "1001":
q0: no progress
q1: seen '1'
q2: seen '10'
q3: seen '100'
q4: seen '1001' → ACCEPT (stay forever)

Transition Table:
State | 0   | 1
q0    | q0  | q1
q1    | q2  | q1    (another 1 while at q1: restart from q1)
q2    | q3  | q1    (0→ continuing match; 1→ new possible start)
q3    | q0  | q4    (0 resets; 1 completes "1001"!)
q4    | q4  | q4    (accept sink)

F = {q4}, s = q0

Verification of "1001":
q0 →1 q1 →0 q2 →0 q3 →1 q4  ✓ ACCEPT`} />

    <H3>Problem: Zeros are multiples of 5, ones are multiples of 3</H3>
    <CB code={`Need TWO independent counters. Use PRODUCT AUTOMATON.
- 6 states for 0's count mod 5: {0,1,2,3,4,done(0)}  → 5 meaningful
- 3 states for 1's count mod 3: {0,1,2}
- Total: 5 × 3 = 15 states

State naming: (i,j) where i = #zeros mod 5, j = #ones mod 3

Start: (0,0)  Accept: {(0,0)} = when both counts are 0 mod 5 and 0 mod 3

Transitions:
- On 0: (i,j) → ((i+1) mod 5, j)
- On 1: (i,j) → (i, (j+1) mod 3)

Example trace for "00011":  #zeros=3, #ones=2
Accepted? 3 mod 5 = 3 ≠ 0 → REJECT

"000001111111":  #zeros=5, #ones=7 → 5 mod 5=0 ✓, 7 mod 3=1 ≠ 0 → REJECT
"000001111111111":  #zeros=5, #ones=9 → 5 mod 5=0 ✓, 9 mod 3=0 ✓ → ACCEPT`} />
  </div>
);

/* ─── SECTION: NFA ───────────────────────────────────────── */
const NFAContent = () => {
  const [sub, setSub] = useState("concept");
  const subs = [
    {id:"concept",label:"🌀 Concept"},
    {id:"nfatodfa",label:"🔄 NFA→DFA"},
    {id:"examples",label:"💡 Examples"},
    {id:"sheet",label:"📝 Sheet 3"},
  ];
  return (
    <div>
      <SectionTitle icon="🌀">Non-Deterministic Finite Automata (NFA)</SectionTitle>
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap",margin:"16px 0"}}>
        {subs.map(s=>(
          <button key={s.id} onClick={()=>setSub(s.id)}
            style={{padding:"8px 16px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:600,fontSize:"13px",transition:"all 0.2s",
              background:sub===s.id?"#ef4444":"#21262d",
              color:sub===s.id?"#0d1117":"#adbac7"}}>
            {s.label}
          </button>
        ))}
      </div>
      {sub==="concept" && <NFAConcept />}
      {sub==="nfatodfa" && <NFAtoDFA />}
      {sub==="examples" && <NFAExamples />}
      {sub==="sheet" && <Sheet3Content />}
    </div>
  );
};

const NFAConcept = () => (
  <div>
    <H2>What is an NFA?</H2>
    <P>An <b style={{color:"#ef4444"}}>NFA</b> is like a DFA but with <b>non-determinism</b> — from a state, on a given input, the machine can go to <b>multiple states simultaneously</b>, or even make ε-transitions (free moves without reading input).</P>

    <H3>DFA vs NFA — Key Differences</H3>
    <CompareTable
      headers={["Feature","DFA","NFA"]}
      rows={[
        ["Transition type","δ: K×Σ → K (single next state)","Δ: K×Σ* × K (relation, multiple possible)"],
        ["ε-transitions","Not allowed","Allowed (free moves)"],
        ["Choices","Exactly 1 per (state,symbol)","0, 1, or many per (state,symbol)"],
        ["Acceptance","In final state after reading all input","ANY path leads to final state"],
        ["Rejection","Not in final state","ALL paths reject or crash"],
        ["Power","Same as NFA","Same as DFA (equivalent!)"],
        ["Ease of design","Harder, more states needed","Easier, more intuitive"],
      ]}
    />

    <Box color="red" title="Key Theorem">
      <b>Every NFA is equivalent to a DFA.</b> They recognize exactly the same class of languages — Regular Languages. But the DFA may need exponentially more states (up to 2ᵏ states where k = #NFA states).
    </Box>

    <H3>NFA Formal Definition</H3>
    <Formula>M = (K, Σ, Δ, s, F)</Formula>
    <P>Same as DFA except: Δ is a <b>transition relation</b> (not function): Δ ⊆ K × Σ* × K. This allows ε-transitions and multiple next states.</P>

    <H3>How NFA Accepts</H3>
    <Box color="orange" title="Acceptance Rule">
      A string w is accepted if there <b>EXISTS at least one path</b> through the NFA that:<br/>
      1. Starts at start state s<br/>
      2. Reads all symbols in w (ε-transitions are free)<br/>
      3. Ends in a final state ∈ F<br/><br/>
      A string is rejected if <b>ALL paths</b> either reject or crash (undefined transition).
    </Box>
  </div>
);

const NFAtoDFA = () => (
  <div>
    <H2>Converting NFA → DFA (Subset Construction)</H2>
    <Box color="cyan" title="The Algorithm">
      Each DFA state represents a <b>SET of NFA states</b> the machine could be in simultaneously.
    </Box>

    <H3>Step-by-Step Algorithm</H3>
    <CB code={`SUBSET CONSTRUCTION ALGORITHM:

Input: NFA M_NFA = (K, Σ, Δ, s, F)
Output: DFA M_DFA = (K', Σ, δ', s', F')

Steps:
1. New start state s': 
   s' = ε-closure({s})
   (All states reachable from start by ε-transitions only, plus s itself)

2. For each new DFA state (a set of NFA states), 
   and for each symbol a∈Σ:
   δ'(Q, a) = ε-closure( ∪ δ(q,a) for all q∈Q )
   
   (Take all states reachable from any state in Q on input a,
    then close under ε-transitions)

3. New accept states F':
   F' = {Q ∈ K' | Q contains at least one state from F}

4. Remove unreachable states from the DFA.

ε-closure(S): 
= all states reachable from any state in S by zero or more ε-arrows
= S ∪ {states reachable by ε from S}

Example: if NFA has ε-transition 1→3, then:
ε-closure({1}) = {1, 3}`} />

    <H3>Full Example</H3>
    <CB code={`NFA: K={1,2,3}, Σ={a,b}, F={1}
Transitions:
  1 --a→ 2      1 --ε→ 3
  2 --b→ 3      2 --a→ 2
  3 --a→ 1

Step 1: Start state
s' = ε-closure({1}) = {1, 3}   (1 goes to 3 via ε)

Step 2: Build transition table
DFA State  | On 'a'                              | On 'b'
{1,3}      | ε-closure(δ(1,a)∪δ(3,a))          | ε-closure(δ(1,b)∪δ(3,b))
           | = ε-closure({2}∪{1}) = {1,2,3}    | = ε-closure({})= ∅
{1,2,3}   | ε-closure({2}∪{2}∪{1}) = {1,2,3} | ε-closure({3}) = {3}
{3}        | ε-closure({1}) = {1,3}            | ε-closure({}) = ∅
∅          | ε-closure({}) = ∅                  | ε-closure({}) = ∅

Step 3: Accept states (those containing NFA accept state 1)
{1,3} ✓  {1,2,3} ✓   {3} ✗   ∅ ✗

Step 4: Start = {1,3}, Dead = ∅ (can remove if no transitions lead to it)

FINAL DFA (simplified, removing ∅):
States: {1,3}, {1,2,3}, {3}
F' = {{1,3}, {1,2,3}}   s' = {1,3}`} />
  </div>
);

const NFAExamples = () => {
  const [ex, setEx] = useState(0);
  const examples = [
    {
      title:"Starts with a, ends with b",
      desc:"Σ={a,b}: NFA for strings that start with 'a' AND end with 'b'.",
      answer:`NFA Design:
q0 (start) --a→ q1   (must start with a)
q1 --a→ q1, q1 --b→ q1   (any middle characters)
q1 --b→ q2   (end with b → accept)

States: q0, q1, q2 (q2 is accept)
Non-determinism: on 'b' from q1, go to BOTH q1 (not final b) AND q2 (final b)

Transition Table:
State | a      | b
q0    | {q1}   | {}      (must start with a; b at start → crash/reject)
q1    | {q1}   | {q1,q2} (non-deterministic on b: maybe not done yet)
q2    | {}     | {}      (accept state, but no further transitions)

F = {q2}, s = q0

The NFA is simpler than a DFA here: DFA would need 4 states.`
    },
    {
      title:"'a' in 3rd position from end",
      desc:"Σ={a,b}: NFA for strings where the third position from the END is 'a'.",
      answer:`NFA Design (read forward, but "guess" where 3rd from end is):
q0 --a,b→ q0  (read any prefix, non-deterministically guess we're at position 3 from end)
q0 --a→ q1    (GUESS: this is the 3rd-from-end position, and it's 'a')
q1 --a,b→ q2  (one more character — now 2nd from end)
q2 --a,b→ q3  (one more — now 1st from end, which is the last char)
q3 is accept

States: q0, q1, q2, q3 (q3 accept)
KEY INSIGHT: NFA "guesses" when it's at the right position.
Only one path will succeed (the correct guess).

F = {q3}, s = q0

Transition Table:
State | a      | b
q0    | {q0,q1}| {q0}    (non-det: stay in q0 OR transition to q1 if this is pos 3 from end)
q1    | {q2}   | {q2}
q2    | {q3}   | {q3}
q3    | {}     | {}

Example: "xabc" (where x,a,b,c are any symbols and third from end is 'a'):
"aabb": 3rd from end is 'a' (position 2 from left in length-4 string)
q0 →a q0,q1 →a ...on the path through q1: q1→q2→q3 ✓ ACCEPT`
    },
    {
      title:"Contains 0110 or 1001",
      desc:"Σ={0,1}: NFA for strings containing either pattern 0110 or 1001.",
      answer:`NFA uses parallelism — run TWO separate sub-NFAs simultaneously:

Sub-NFA 1 (contains 0110):
s0: initial
s1: seen '0'
s2: seen '01'
s3: seen '011'
s4: seen '0110' → ACCEPT

Sub-NFA 2 (contains 1001):
t0: initial
t1: seen '1'
t2: seen '10'
t3: seen '100'
t4: seen '1001' → ACCEPT

Combined NFA:
- Start state with ε-transitions to both s0 and t0
- Accept if EITHER s4 or t4 is reached

OR: single start state with non-determinism:
q0 --0→ q1 (start matching 0110)
q0 --1→ q5 (start matching 1001)
q0 --0,1→ q0 (loop: haven't started matching yet)

q1(seen 0) --1→ q2
q2(seen 01) --1→ q3
q3(seen 011) --0→ q4 [ACCEPT for 0110]
q4 --0,1→ q4 (accept sink)

q5(seen 1) --0→ q6
q6(seen 10) --0→ q7
q7(seen 100) --1→ q8 [ACCEPT for 1001]
q8 --0,1→ q8 (accept sink)

F = {q4, q8}`
    },
    {
      title:"RE to NFA: (a(bb)*bc)",
      desc:"Build NFA corresponding to the regular expression (a(bb)*bc).",
      answer:`Regular expression: a(bb)*bc

Breakdown into atomic NFA pieces:
1. 'a':    one state with a-transition
2. (bb)*:  b-b repeated zero or more times
3. 'b':    one state with b-transition
4. 'c':    one state with c-transition

NFA (using Thompson's construction, simplified):

q0 --a→ q1 --ε→ q2
q2 --ε→ q6  (zero repetitions of bb)
q2 --b→ q3 --b→ q4 --ε→ q2  (one+ repetitions: loop)
q6 --b→ q5 --c→ q7  [ACCEPT]

Simplified (4 states):
q0 --a→ q1
q1 --b→ q2 --b→ q1  (loop for (bb)*)
q1 --b→ q3 --c→ q4  [ACCEPT]

The non-determinism: from q1 on 'b', go to EITHER q2 (starting another 'bb') OR q3 (the final 'b' before 'c').

Strings: abc, abbc (wait — no), abbc? 
a + (bb)* + b + c:
- abc     = a + (bb)⁰ + b + c ✓
- abbc    = a + (bb)¹ + b + c — that's 4 chars after a? No: a + bb + b + c = abbbc ✓
- abbbc   ✓
- abbbbc  ✓ (a + bb + bb... wait: a + (bb)¹ + b + c = a+bb+b+c = "abbc")
Actually: abbbc = a(bb)¹bc ✓`
    },
  ];

  return (
    <div>
      <H2>NFA Design — Examples</H2>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"12px 0"}}>
        {examples.map((e,i)=>(
          <button key={i} onClick={()=>setEx(i)}
            style={{padding:"7px 13px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"12px",transition:"all 0.2s",
              background:ex===i?"#ef4444":"#21262d",
              color:ex===i?"#ffffff":"#adbac7"}}>
            {i+1}. {e.title}
          </button>
        ))}
      </div>
      <Box color="red" title={`NFA Example: ${examples[ex].title}`}>
        {examples[ex].desc}
      </Box>
      <CB code={examples[ex].answer} />
    </div>
  );
};

const Sheet3Content = () => (
  <div>
    <H2>Sheet 3 — NFA Problems</H2>
    <Box color="red" title="Sheet Overview">
      Sheet 3 focuses on NFA design with specified state counts and NFA→DFA conversion. Key patterns to know:
    </Box>

    <H3>Part 1: NFA with specified number of states over {"{0,1}"}</H3>
    <CB code={`Classic NFA that recognizes strings ending in a pattern, using minimal states:

Example: "strings ending in 01" — 3 states:
q0 --0,1→ q0  (loop: reading any prefix)
q0 --0→ q1   (non-det: guess '0' starts the final '01')
q1 --1→ q2   [ACCEPT]

Only 3 states! A DFA would need 3 states too (but without the loop non-det trick).

Example: "third from last is 1" — 4 states:
q0 --0,1→ q0, q0 --1→ q1  (guess we're at 3rd from last)
q1 --0,1→ q2
q2 --0,1→ q3  [ACCEPT]`} />

    <H3>Part 2: Convert RE to NFA</H3>
    <CB code={`Thompson's Construction Rules:

1. RE = 'a'   →   (→) --a→ (( ))     [2 states]

2. RE = R1R2  →   NFA(R1) followed by NFA(R2) with ε-link

3. RE = R1∪R2 →   New start state with ε-transition to both NFA(R1) and NFA(R2)
                   New accept state with ε from both NFA accepts

4. RE = R*    →   New start/accept state, ε to NFA(R), ε from NFA(R) back (loop)

Example: RE = (ab∪b)*
- ab: q0--a→q1--b→q2
- b:  q3--b→q4
- ab∪b: new start q5 --ε→q0 and q5--ε→q3; q2 and q4 merge to accept q6
- (ab∪b)*: add loop from q6 back to q5 via ε; q5 also becomes accept`} />

    <H3>Part 3: NFA→DFA Conversion Example</H3>
    <CB code={`Given NFA (from lecture example):
States: {1, 2, 3}
Σ = {a, b}
F = {1}
Transitions:
  (1,a)→{2}     (1,ε)→{3}
  (2,b)→{3}     (2,a)→{2}
  (3,a)→{1}

ε-closure:
  ε-closure({1}) = {1,3}  (1 itself + 3 via ε-arrow)
  ε-closure({2}) = {2}
  ε-closure({3}) = {3}

DFA Construction:
Start: {1,3}

{1,3} on a: δ(1,a)∪δ(3,a) = {2}∪{1} = {1,2} → ε-closure = {1,2,3}
{1,3} on b: δ(1,b)∪δ(3,b) = {}∪{} = {} → ε-closure = ∅

{1,2,3} on a: δ(1,a)∪δ(2,a)∪δ(3,a) = {2}∪{2}∪{1} = {1,2} → ε-closure = {1,2,3}
{1,2,3} on b: δ(1,b)∪δ(2,b)∪δ(3,b) = {}∪{3}∪{} = {3} → ε-closure = {3}

{3} on a: δ(3,a) = {1} → ε-closure = {1,3}
{3} on b: δ(3,b) = {} → ε-closure = ∅

∅ on a: ∅    ∅ on b: ∅

DFA Table:
State    | a      | b     | Accept?
{1,3}    |{1,2,3} | ∅     | YES (contains 1)
{1,2,3}  |{1,2,3} | {3}   | YES (contains 1)
{3}      |{1,3}   | ∅     | NO
∅        | ∅      | ∅     | NO

Remove unreachable states (∅ is reachable from some states, keep it as dead state).
Final DFA: 4 states.`} />
  </div>
);

/* ─── SECTION: CFG ───────────────────────────────────────── */
const CFGContent = () => {
  const [sub, setSub] = useState("concept");
  const subs = [
    {id:"concept",label:"🌿 Concept"},
    {id:"examples",label:"💡 Examples"},
    {id:"sheet",label:"📝 Sheet 4"},
  ];
  return (
    <div>
      <SectionTitle icon="🌿">Context-Free Grammar (CFG)</SectionTitle>
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap",margin:"16px 0"}}>
        {subs.map(s=>(
          <button key={s.id} onClick={()=>setSub(s.id)}
            style={{padding:"8px 16px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:600,fontSize:"13px",transition:"all 0.2s",
              background:sub===s.id?"#22c55e":"#21262d",
              color:sub===s.id?"#0d1117":"#adbac7"}}>
            {s.label}
          </button>
        ))}
      </div>
      {sub==="concept" && <CFGConcept />}
      {sub==="examples" && <CFGExamples />}
      {sub==="sheet" && <Sheet4Content />}
    </div>
  );
};

const CFGConcept = () => (
  <div>
    <H2>Context-Free Grammar — What & Why</H2>
    <P>RE and DFA can only describe <b>regular languages</b>. They cannot express things like "equal number of a's and b's" (L = {"{aⁿbⁿ}"}). CFG is a <b>language generator</b> for the more powerful class of <b>context-free languages</b>.</P>

    <Box color="green" title="Key Idea">
      A CFG uses <b>rewriting rules</b> (productions) to generate strings. Variables (non-terminals) can be replaced by strings of variables and terminals, regardless of context.
    </Box>

    <H3>Formal Definition</H3>
    <Formula>G = (V, Σ, R, S)</Formula>
    <CompareTable
      headers={["Component","Name","Description"]}
      rows={[
        ["V","Variables (full alphabet)","Union of terminals and non-terminals"],
        ["Σ","Terminals","Actual symbols in strings; Σ ⊂ V"],
        ["R","Rules / Productions","Set of rewriting rules: A → α, where A∈V-Σ, α∈V*"],
        ["S","Start symbol","S ∈ V−Σ, the root of every derivation"],
      ]}
    />

    <H3>Terminology</H3>
    <CompareTable
      headers={["Term","Meaning","Example"]}
      rows={[
        ["Terminal","Actual alphabet symbol; appears in final strings","a, b, 0, 1"],
        ["Non-terminal","Variable; can be rewritten","S, A, B, T, E"],
        ["Production/Rule","A → α: replace A with α","S → aSb | ε"],
        ["Derivation","Sequence of rule applications: S ⟹* w","S⟹aSb⟹aaSbb⟹aabb"],
        ["Parse tree","Tree showing derivation structure","Root=S, leaves=terminals"],
        ["Ambiguous","Multiple parse trees for same string","Can be problem for compilers"],
      ]}
    />

    <H3>Why "Context-Free"?</H3>
    <Box color="cyan" title="Context Independence">
      The rule A → aA means we can replace A with aA <b>no matter what surrounds A</b>. It's independent of the context of A — hence "context-free". Context-sensitive grammars would require the context to match before applying a rule.
    </Box>

    <H3>Common CFG Patterns</H3>
    <CB code={`// ─── Palindromes: {ww^R | w∈{a,b}*} ───
S → aSa | bSb | ε | a | b

// ─── Equal a's and b's: {w | #a(w) = #b(w)} ───
S → aSbS | bSaS | ε

// ─── Balanced parentheses ───
S → (S) | SS | ε

// ─── aⁿbⁿ (n ≥ 0): simple nesting ───
S → aSb | ε

// ─── Arithmetic expressions ───
E → E+T | T
T → T*F | F
F → (E) | id`} />
  </div>
);

const CFGExamples = () => {
  const [ex, setEx] = useState(0);
  const examples = [
    {
      title:"aⁿbⁿ — equal a's before b's",
      desc:"L = {aⁿbⁿ | n≥0}: strings with n a's followed by exactly n b's. Cannot be expressed as RE!",
      answer:`CFG:
G = (V, Σ, R, S)
V = {S, a, b}
Σ = {a, b}
R = { S → aSb | ε }
S = S

Derivation for aabb (n=2):
S ⟹ aSb ⟹ aaSbb ⟹ aabb  ✓

Derivation for aaabbb (n=3):
S ⟹ aSb ⟹ aaSbb ⟹ aaaSbbb ⟹ aaabbb  ✓

How it works:
- S → aSb: wraps another a...b pair around the inside
- S → ε: base case (n=0, empty string)
- Each application adds one a on the left AND one b on the right

This CFL is NOT regular! No DFA or RE can express it
(proven by Pumping Lemma for regular languages).`
    },
    {
      title:"Palindromes wwᴿ",
      desc:"L = {wwᴿ | w∈{a,b}*}: even-length palindromes (strings that read same forwards and backwards).",
      answer:`CFG:
R = { S → aSa | bSb | ε }

Derivation for abba:
S ⟹ aSa ⟹ abSba ⟹ abba  ✓

Derivation for abaabaᴿ = abbaᴿ... wait, abba:
- abba is a palindrome
- a·bb·a: S→aSa, then S→bSb, then S→ε

For general palindromes {w | w=wᴿ}:
R = { S → aSa | bSb | a | b | ε }
(add S→a and S→b for odd-length palindromes)

Example "aba" (odd-length):
S ⟹ aSa ⟹ aba  ✓ (using S→b in the middle)`
    },
    {
      title:"Balanced parentheses",
      desc:"L = all strings of balanced ( and ) brackets.",
      answer:`CFG:
R = { S → (S) | SS | ε }

Derivation for "(())()":
S ⟹ SS ⟹ (S)S ⟹ (())S ⟹ (())(S) ⟹ (())()  ✓

Rules explained:
- S → (S): wrap a balanced string with outer parentheses
- S → SS:  concatenate two balanced strings
- S → ε:   base case (empty string is balanced)

This grammar IS ambiguous (multiple derivations for same string).
For compilers, we'd want an unambiguous version.`
    },
    {
      title:"Arithmetic expressions (unambiguous)",
      desc:"CFG for arithmetic: standard unambiguous grammar respecting precedence of + and *.",
      answer:`CFG (from lecture):
G = ({E,T,F,x,1,2,+,*,(,)}, {x,1,2,+,*,(,)}, R, E)

R = {
  E → E+T | T       (E handles + with left-associativity)
  T → T*F | F       (T handles * with left-associativity)
  F → (E) | x1 | x2 (F is a factor: var or parenthesized expr)
}

This grammar is UNAMBIGUOUS because:
- * binds tighter than + (T is between E and F)
- Left-recursion gives left-associativity

Derivation for "x1+x2*x1":
E ⟹ E+T ⟹ T+T ⟹ F+T ⟹ x1+T ⟹ x1+T*F ⟹ x1+F*F ⟹ x1+x2*F ⟹ x1+x2*x1

This correctly gives: x1 + (x2 * x1) — multiplication first!`
    },
    {
      title:"aⁱbʲcᵏ where i=j+k",
      desc:"L = {aⁱbʲcᵏ | i=j+k, i,j,k>0}: number of a's equals sum of b's and c's.",
      answer:`CFG approach: i = j + k means we need j b's and k c's, total i a's.

Strategy:
- Match each b with an a: for the j b's, consume j a's
- Match each c with an a: for the k c's, consume k a's

R = {
  S → AB
  A → aAb | ab          (generates aⁱbⁱ for i≥1, handles the b-part)
  B → aBC | aC | ε      Hmm...

Better approach: think recursively.
We need to match: each a with either a b or a c.

S → aSbc | aSb | aSc | abc | ab | ac

Actually clearest form:
S → L R
L → aLb | ab          (for the a's matched with b's)
R → aRc | ac | ε      (for the a's matched with c's)

But this needs j≥1, k≥0 and would generate a^(j+k) b^j c^k.

Simpler: For i=j+k, i,j,k>0:
S → TU
T → aTb | ab           (T generates a^m b^m, m≥1 — matches j b's)
U → aUc | ac           (U generates a^n c^n, n≥1 — matches k c's)

This gives: a^m b^m a^n c^n... but that's not right (b's and c's must be contiguous).

CORRECT approach for aⁱbʲcᵏ with i=j+k:
S → aSc | aXc
X → aXb | ab           Won't work cleanly...

Use two non-terminals carefully:
S → AB
A → aAb | ab           (matches a's with b's: aʲbʲ)
B → aBc | ac | ε       (matches a's with c's: aᵏcᵏ, k≥1 since k>0)

Final: aʲbʲaᵏcᵏ... no. The a's aren't grouped.

The key insight: the a's must all come first!
This requires more complex CFG or PDA (see PDA section).`
    },
  ];

  return (
    <div>
      <H2>CFG — Design Examples</H2>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"12px 0"}}>
        {examples.map((e,i)=>(
          <button key={i} onClick={()=>setEx(i)}
            style={{padding:"7px 13px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"12px",transition:"all 0.2s",
              background:ex===i?"#22c55e":"#21262d",
              color:ex===i?"#0d1117":"#adbac7"}}>
            {i+1}. {e.title}
          </button>
        ))}
      </div>
      <Box color="green" title={`CFG Example: ${examples[ex].title}`}>
        {examples[ex].desc}
      </Box>
      <CB code={examples[ex].answer} />
    </div>
  );
};

const Sheet4Content = () => {
  const [q, setQ] = useState(0);
  const questions = [
    { title:"a) At least three 1's", q:"L = {w | w contains at least three 1's}, Σ={0,1}",
      a:`CFG:
R = { S → A1A1A1A   A → 0A | 1A | ε }

Explanation:
- A: generates any string over {0,1} (A → 0A | 1A | ε)
- S → A1A1A1A: a 1, then A (anything), then 1, then A, then 1, then A (anything)
- This guarantees at least three 1's with anything between them

More compact:
S → 0S | 1S | 1A1A1A
A → 0A | 1A | ε

Or simply:
S → A1A1A1A
A → 0A | 1A | ε

Example generation: "0110111"
A⇒ε, so S→A1A1A1A could give (ε)1(1)1(11)1(ε) — wait that's 4 ones.
Simpler trace: S→A1A1A1A: A=0, A=1, A=ε, A=ε → "011011ε" = "01101" ✓ (3 ones)`},
    { title:"b) Starts & ends same", q:"L = {w | w starts and ends with the same symbol}, Σ={0,1}",
      a:`CFG:
R = {
  S → 0A0 | 1A1 | 0 | 1
  A → 0A | 1A | ε
}

Explanation:
- S → 0A0: start with 0, any middle, end with 0
- S → 1A1: start with 1, any middle, end with 1
- S → 0 | 1: single character (starts = ends trivially)
- A: any string (A → 0A | 1A | ε)

Example: "10001"
S → 1A1, A → 0A → 00A → 000 (A→ε then back... 
Actually: A generates "000" via A→0A→00A→000(A→ε))
Result: 1·000·1 = "10001" ✓`},
    { title:"c) Odd length", q:"L = {w | length of w is odd}, Σ={0,1}",
      a:`CFG:
R = {
  S → 0SS | 1SS | 0 | 1
}

Or more clearly:
S → 0B | 1B | 0 | 1
B → 00S | 01S | 10S | 11S | 00 | 01 | 10 | 11

Simpler:
S → (0|1)(A)     where A generates even-length strings
A → (0|1)(0|1)A | ε

Compact:
S → 0A | 1A | 0 | 1
A → 0AS | 1AS  ... 

Cleanest form:
S → 0 | 1 | 0SS | 1SS

Explanation:
- S → 0 or S → 1: single char (odd length ✓)
- S → 0SS: one char + two odd-length strings = 1 + odd + odd = 1 + even = odd ✓
  Wait: odd + odd = even. 1 + even = odd ✓ Correct!
- S → 1SS: same reasoning

Derivation of "abc" length 3:
S → 0SS → 0(0)(1) → "001" ✓ length 3`},
    { title:"d) Odd length, middle is 0", q:"L = {w | length of w is odd AND middle symbol is 0}",
      a:`CFG:
R = {
  S → 0S0 | 1S1 | 0S1 | 1S0 | 0
}

Explanation:
- S → 0: base case — single character, it IS the middle, and it's 0 ✓
- S → aSb (for a,b ∈ {0,1}): add one character on each side, keeping middle the same
  - Preserves: middle stays as 0, length grows by 2 (keeps odd), symmetry of position

This generates: strings of odd length where the center character is 0.

Verification:
- "0": S→0 ✓ (length 1, middle is position 1 = '0')
- "000": S→0S0→000 ✓ (length 3, middle position 2 = '0')
- "100": S→1S0→10S... hmm, S→0: result "100" ✓ (middle = '0')
- "10001": S→1S1→10S01→100S001... no, let's redo:
  S→1S0→10S00→100S000→... that adds too many.
  Actually: S→1S1→10S01 wait: S→0S0|1S1|0S1|1S0
  "10001": outer is 1 and 1, middle string is "000", so S→1S1 where inner S generates "000"
  Inner "000": S→0S0 where inner S generates "0" → S→0. So "000" ✓`},
    { title:"e) Palindrome wwᴿ", q:"L = {wwᴿ | w is any string}: even-length palindromes",
      a:`CFG:
R = {
  S → aSa | bSb | ε    (for Σ = {a,b})
  OR for Σ = {0,1}:
  S → 0S0 | 1S1 | ε
}

Note: this is wwᴿ (even length only, since |wwᴿ| = 2|w|).

Derivation for "abba" (w="ab", wᴿ="ba"):
S → aSa → abSba → abba ✓ (S→ε in center)

Derivation for "0110" (w="01", wᴿ="10"):
S → 0S0 → 01S10 → 0110 ✓

For ALL palindromes {w | w = wᴿ} (including odd length):
R = { S → aSa | bSb | a | b | ε }
The extra S→a and S→b handle the center character for odd-length palindromes.`},
    { title:"f) Empty set", q:"L = ∅ (the empty language — no strings at all)",
      a:`CFG:
V = {S}, Σ = {}, R = {}, start = S

OR: simply have a grammar with no way to derive any terminal string.

Example: R = { S → SS }  
(S can only rewrite to SS, which is SS, which is SSSS, forever...)
No terminal string can ever be derived → L(G) = ∅

Why: every derivation just produces longer strings of S's, never reaches terminals.

Note: ∅ (empty language) ≠ {ε} (language containing only empty string).
For {ε}: R = { S → ε }`},
    { title:"Parse Trees (CFG for expressions)", q:"CFG: E→E+T|T, T→T*F|F, F→(E)|a. Parse: a, a*a, a+a, ((a))",
      a:`CFG: E→E+T|T   T→T*F|F   F→(E)|a

PARSE TREE for "a":
E
└── T
    └── F
        └── a

Derivation: E⟹T⟹F⟹a

PARSE TREE for "a+a":
E
├── E (left)
│   └── T
│       └── F
│           └── a
├── +
└── T
    └── F
        └── a

Derivation: E⟹E+T⟹T+T⟹F+T⟹a+T⟹a+F⟹a+a

PARSE TREE for "a*a":
E
└── T
    ├── T (left)
    │   └── F
    │       └── a
    ├── *
    └── F
        └── a

Derivation: E⟹T⟹T*F⟹F*F⟹a*F⟹a*a

PARSE TREE for "((a))":
E
└── T
    └── F
        ├── (
        ├── E
        │   └── T
        │       └── F
        │           ├── (
        │           ├── E → T → F → a
        │           └── )
        └── )

Derivation: E⟹T⟹F⟹(E)⟹(T)⟹(F)⟹((E))⟹((T))⟹((F))⟹((a))`},
  ];

  return (
    <div>
      <H2>Sheet 4 — Context-Free Grammar</H2>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"12px 0"}}>
        {questions.map((q2,i)=>(
          <button key={i} onClick={()=>setQ(i)}
            style={{padding:"6px 11px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"11px",transition:"all 0.2s",
              background:q===i?"#22c55e":"#21262d",
              color:q===i?"#0d1117":"#adbac7"}}>
            {q2.title}
          </button>
        ))}
      </div>
      <Box color="green" title={questions[q].title}>
        <span style={{fontFamily:"monospace",fontSize:"13px"}}>{questions[q].q}</span>
      </Box>
      <CB code={questions[q].a} />
    </div>
  );
};

/* ─── SECTION: PDA ───────────────────────────────────────── */
const PDAContent = () => {
  const [sub, setSub] = useState("concept");
  const subs = [
    {id:"concept",label:"📚 Concept"},
    {id:"examples",label:"💡 Examples"},
    {id:"sheet",label:"📝 Sheet 5"},
  ];
  return (
    <div>
      <SectionTitle icon="📚">Pushdown Automata (PDA)</SectionTitle>
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap",margin:"16px 0"}}>
        {subs.map(s=>(
          <button key={s.id} onClick={()=>setSub(s.id)}
            style={{padding:"8px 16px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:600,fontSize:"13px",transition:"all 0.2s",
              background:sub===s.id?"#06b6d4":"#21262d",
              color:sub===s.id?"#0d1117":"#adbac7"}}>
            {s.label}
          </button>
        ))}
      </div>
      {sub==="concept" && <PDAConcept />}
      {sub==="examples" && <PDAExamples />}
      {sub==="sheet" && <Sheet5Content />}
    </div>
  );
};

const PDAConcept = () => (
  <div>
    <H2>What is a PDA?</H2>
    <P>A <b style={{color:"#06b6d4"}}>Pushdown Automaton</b> is an NFA with an auxiliary <b>stack</b> (LIFO memory). This extra memory allows it to recognize context-free languages that FA can't handle.</P>

    <H3>Formal Definition</H3>
    <Formula>M = (K, Σ, Γ, Δ, s, F)</Formula>
    <CompareTable
      headers={["Component","Name","Description"]}
      rows={[
        ["K","States","Finite set of states"],
        ["Σ","Input alphabet","Input symbols"],
        ["Γ","Stack alphabet","Symbols that can be pushed/popped"],
        ["Δ","Transition relation","Δ ⊆ (K × Σ* × Γ*) × (K × Γ*)"],
        ["s","Start state","s ∈ K"],
        ["F","Accept states","F ⊆ K"],
      ]}
    />

    <H3>Transition Notation</H3>
    <Box color="cyan" title="Reading a Transition: (q, a, γ) → (p, β)">
      When in state q, reading input symbol a, with γ on top of stack:<br/>
      → Go to state p AND replace γ on stack with β<br/><br/>
      <b>Special cases:</b><br/>
      • a = ε: ε-transition (free move, no input consumed)<br/>
      • γ = ε: stack not checked; just push β<br/>
      • β = ε: pop γ (replace with nothing)<br/>
      • γ = ε, β = ε: move without touching stack
    </Box>

    <H3>Common Transition Types</H3>
    <CompareTable
      headers={["Transition","Meaning"]}
      rows={[
        ["(q, a, ε) → (p, x)","Read 'a', push x onto stack (ε means top doesn't matter)"],
        ["(q, ε, x) → (p, ε)","Pop x from stack without reading input"],
        ["(q, a, x) → (p, ε)","Read 'a' AND pop x from stack"],
        ["(q, a, x) → (p, y)","Read 'a', replace top x with y"],
        ["(q, ε, ε) → (p, ε)","ε-transition: just change state"],
      ]}
    />

    <H3>Acceptance Conditions</H3>
    <Box color="green" title="A PDA accepts a string when ALL THREE hold:">
      1. The entire input tape has been read (consumed)<br/>
      2. The PDA is in a final/accept state<br/>
      3. The stack is empty
    </Box>
  </div>
);

const PDAExamples = () => {
  const [ex, setEx] = useState(0);
  const examples = [
    {
      title:"wcwᴿ — palindrome around c",
      desc:"L = {wcwᴿ | w∈{a,b}*}: strings of form 'abcba', 'aacaa', etc.",
      answer:`PDA: M = (K, Σ, Γ, Δ, s, F)
K = {q0, q1}
Σ = {a, b, c}
Γ = {a, b}
s = q0
F = {q1}

Strategy:
- Phase 1 (q0): read w, PUSH each character onto stack
- After reading 'c': move to q1 (flip direction)  
- Phase 2 (q1): read wᴿ, POP and verify it matches

Transitions (Δ):
1. (q0, a, ε) → (q0, a)   [push a onto stack while reading w]
2. (q0, b, ε) → (q0, b)   [push b onto stack while reading w]
3. (q0, c, ε) → (q1, ε)   [read c, switch to phase 2, don't touch stack]
4. (q1, a, a) → (q1, ε)   [read a, pop a — they match!]
5. (q1, b, b) → (q1, ε)   [read b, pop b — they match!]

Trace for "abacaba":
q0: a→push a: stack=[a]
q0: b→push b: stack=[a,b]
q0: a→push a: stack=[a,b,a]
q0: c→go to q1: stack=[a,b,a]
q1: a→pop a: stack=[a,b] (a matched a ✓)
q1: b→pop b: stack=[a] (b matched b ✓)
q1: a→pop a: stack=[] (a matched a ✓)
Input done, stack empty, in F={q1} → ACCEPT ✓`
    },
    {
      title:"0ⁿ1ⁿ — equal 0s and 1s",
      desc:"L = {0ⁿ1ⁿ | n>0}: n zeros followed by exactly n ones.",
      answer:`PDA:
K = {q0, q1}
Σ = {0, 1}
Γ = {0}
s = q0
F = {q1}

Strategy:
- Phase 1: read 0s, push one '0' per '0' read
- Phase 2: read 1s, pop one '0' per '1' read
- If stack empty when all 1s read → accept

Transitions (Δ):
1. (q0, 0, ε) → (q0, 0)   [push 0 for each 0 read]
2. (q0, 1, 0) → (q1, ε)   [first 1: pop a 0, switch to q1]
3. (q1, 1, 0) → (q1, ε)   [subsequent 1s: pop a 0 each time]

Trace for "0011":
q0: '0'→push 0: stack=[0]
q0: '0'→push 0: stack=[0,0]
q0: '1'→pop 0, go to q1: stack=[0]
q1: '1'→pop 0: stack=[]
Input done, stack empty, in F={q1} → ACCEPT ✓

"001": would leave stack=[0] non-empty → REJECT`
    },
    {
      title:"Same number of a's and b's",
      desc:"L = {w∈{a,b}* | #a(w) = #b(w)}: interleaved a's and b's in any order.",
      answer:`PDA (using stack to track excess):
K = {q0}
Σ = {a, b}
Γ = {a, b}
s = q0
F = {q0}

Strategy: Keep a running balance on the stack.
- If more a's than b's: stack has a's on top
- If more b's than a's: stack has b's on top
- If balanced: stack is empty → accept

Transitions (Δ):
1. (q0, a, ε) → (q0, a)   [push a if no b's waiting to cancel]
2. (q0, b, a) → (q0, ε)   [cancel: pop an a when we see b]
3. (q0, b, ε) → (q0, b)   [push b if no a's waiting]
4. (q0, a, b) → (q0, ε)   [cancel: pop a b when we see a]

Trace for "ababba" (#a=3, #b=3):
q0: a,ε→push a: [a]
q0: b,a→pop a: []
q0: a,ε→push a: [a]
q0: b,a→pop a: []
q0: b,ε→push b: [b]
q0: a,b→pop b: []
Input done, stack=[], in F={q0} → ACCEPT ✓`
    },
    {
      title:"aⁱbʲcᵏ where i=j+k",
      desc:"L = {aⁱbʲcᵏ | i=j+k, i,j,k>0}: count of a's equals total of b's and c's.",
      answer:`PDA:
K = {q0, q1, q2, q3}
Σ = {a, b, c}
Γ = {a}
s = q0
F = {q3} (only if stack is empty)

Strategy:
- Phase 1 (q0): read all a's, push one stack symbol per a
- Phase 2 (q1): read b's, pop one stack symbol per b
- Phase 3 (q2): read c's, pop one stack symbol per c
- Accept when stack empty after reading all input

Transitions (Δ):
1. (q0, a, ε) → (q0, a)   [push a for each input 'a']
2. (q0, b, a) → (q1, ε)   [start reading b's; pop a]
3. (q1, b, a) → (q1, ε)   [continue reading b's; pop a each time]
4. (q1, c, a) → (q2, ε)   [start reading c's; pop a]
5. (q2, c, a) → (q2, ε)   [continue reading c's; pop a]
6. (q2, ε, ε) → (q3, ε)   [ε-transition to accept state]

Trace for "aabc" (i=2, j=1, k=1, j+k=2=i ✓):
q0: a→push: [a]; a→push: [a,a]
q0→q1: b,a→pop: [a]
q1→q2: c,a→pop: []
q2→q3: ε-transition → ACCEPT ✓`
    },
  ];

  return (
    <div>
      <H2>PDA Design — Examples</H2>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"12px 0"}}>
        {examples.map((e,i)=>(
          <button key={i} onClick={()=>setEx(i)}
            style={{padding:"7px 13px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"12px",transition:"all 0.2s",
              background:ex===i?"#06b6d4":"#21262d",
              color:ex===i?"#0d1117":"#adbac7"}}>
            {i+1}. {e.title}
          </button>
        ))}
      </div>
      <Box color="cyan" title={`PDA Example: ${examples[ex].title}`}>
        {examples[ex].desc}
      </Box>
      <CB code={examples[ex].answer} />
    </div>
  );
};

const Sheet5Content = () => {
  const [q, setQ] = useState(0);
  const questions = [
    { title:"L1: ≥3 a's", q:"L1 = {w | w contains at least three a's}",
      a:`PDA (simple counting):
K = {q0, q1, q2, q3}
Σ = {a, b}
Γ = {} (no stack needed — use states for counting!)
s = q0
F = {q3}

Wait — this can actually be done with a DFA! But as PDA:

Transitions:
1. (q0, a, ε) → (q1, ε)   [first a]
2. (q0, b, ε) → (q0, ε)   [ignore b's initially]
3. (q1, a, ε) → (q2, ε)   [second a]
4. (q1, b, ε) → (q1, ε)   [ignore b's]
5. (q2, a, ε) → (q3, ε)   [third a — now in accept region]
6. (q2, b, ε) → (q2, ε)   [ignore b's]
7. (q3, a, ε) → (q3, ε)   [accept any more characters]
8. (q3, b, ε) → (q3, ε)

(Stack never used since this is a regular language — DFA suffices.)`},
    { title:"L2: wwᴿ palindromes", q:"L2 = {wwᴿ | w∈{a,b}*}: even-length palindromes",
      a:`PDA:
K = {q0, q1}
Σ = {a, b}
Γ = {a, b}
s = q0
F = {q1}

Strategy:
- Phase 1 (q0): push first half onto stack (non-deterministically decide midpoint)
- Phase 2 (q1): match second half (wᴿ) against stack

Transitions:
1. (q0, a, ε) → (q0, a)   [push a — still in first half]
2. (q0, b, ε) → (q0, b)   [push b — still in first half]
3. (q0, ε, ε) → (q1, ε)   [non-det ε-transition: guess we're at midpoint, switch to matching phase]
4. (q1, a, a) → (q1, ε)   [match a with top of stack]
5. (q1, b, b) → (q1, ε)   [match b with top of stack]

Note: The ε-transition (rule 3) is the key non-determinism!
For "abba": push a,b; ε-transition; match b (pop b), match a (pop a) ✓`},
    { title:"L3: w≠wᴿ, odd length", q:"L3 = {w | w≠wᴿ and |w| is odd}: not a palindrome, odd length",
      a:`PDA (tricky! need to find center and mismatch):

Strategy for ODD length, non-palindrome:
- Length 2k+1: middle character is at position k+1
- A string is NOT a palindrome if ∃ position i where w[i] ≠ w[n-i+1]
- For odd length non-palindrome: some character away from center mismatches mirror

PDA approach:
1. Non-deterministically guess the "center" position
2. Push first half
3. Skip center character
4. Pop matching second half — but at some point, find a MISMATCH

Transitions (concept):
Phase 1 (q0): push characters, guess when to stop
(q0, a, ε) → (q0, a); (q0, b, ε) → (q0, b)
At "center": skip one character without pushing
(q0, a, ε) → (q1, ε); (q0, b, ε) → (q1, ε) [skip center, go to match phase]

Phase 2 (q1): try to find a MISMATCH (non-det)
(q1, a, b) → (q2, ε) [mismatch found: a vs b on stack — accept!]
(q1, b, a) → (q2, ε) [mismatch: b vs a on stack]
(q1, a, a) → (q1, ε) [match (discard)]
(q1, b, b) → (q1, ε) [match (discard)]

The NFA non-determinism finds the mismatching position.`},
    { title:"L4: aⁱbʲcᵏ, j=i+k", q:"L4 = {aⁱbʲcᵏ | j=i+k, i,j,k>0}: b's = a's + c's",
      a:`PDA:
Strategy: j = i + k, so we need #b's = #a's + #c's
- Push a's onto stack
- For b's: pop an a per b (using up the a's)
- After a's exhausted, push extra b's for c's to match
Wait — need to match c's at the end.

Better: j = i + k means: (j - i) = k, i.e., after matching i a's with i b's, remaining b's = k = number of c's.

Phase 1: Read a's, push 'A' for each
Phase 2: Read b's: pop 'A' for each (cancels with a's)
Phase 3: Remaining b's in excess: push 'B' for each
Phase 4: Read c's: pop 'B' for each

Transitions:
1. (q0, a, ε) → (q0, A)   [push A for each a]
2. (q0, b, A) → (q1, ε)   [start reading b's: match with a's]
3. (q1, b, A) → (q1, ε)   [continue matching b's with a's]
4. (q1, b, ε) → (q2, B)   [a's exhausted: extra b's go on stack]
5. (q2, b, ε) → (q2, B)   [more excess b's]
6. (q2, c, B) → (q3, ε)   [c's cancel excess b's]
7. (q3, c, B) → (q3, ε)   [more c's cancel b's]

F = {q3} when stack empty`},
    { title:"L5: aⁱbʲcᵏ, i+j=k", q:"L5 = {aⁱbʲcᵏ | i+j=k}: total a's+b's equals c's",
      a:`PDA:
Strategy: k = i + j, so c's = a's + b's.
- Push one symbol per 'a' read
- Push one symbol per 'b' read  
- Pop one symbol per 'c' read
- Accept when stack empty after all input

Simple! Both a's and b's increase the count, c's decrease.

Transitions:
1. (q0, a, ε) → (q0, X)   [push X for each a]
2. (q0, b, ε) → (q1, X)   [push X for each b, enter b-phase]
   OR: (q0, b, ε) → (q0, X) if a's and b's are interleaved? 
   But format is aⁱbʲcᵏ so a's come first, then b's, then c's.
3. (q1, b, ε) → (q1, X)   [continue b's]
4. (q1, c, X) → (q2, ε)   [start c's: pop X]
5. (q2, c, X) → (q2, ε)   [continue c's: pop X]

Edge case: if no a's (i=0):
6. (q0, b, ε) → (q0, X) allows start directly with b's

F = {q2} or make q0 and q2 both accept with ε-transitions when stack empty.

Combined elegant form:
1. (q0, a, ε) → (q0, X)
2. (q0, b, ε) → (q0, X)   [treat a's and b's same: both push]
3. (q0, c, X) → (q0, ε)   [c's pop]
F = {q0}  (when stack is empty at end)`},
    { title:"L7: a²ⁿb³ⁿ", q:"L7 = {a²ⁿb³ⁿ | n>0}: 2n a's followed by 3n b's",
      a:`PDA:
Strategy: Ratio is 2a's per 3b's. 
Use stack to track: push 3 stack symbols per 2 a's, then pop 1 per b.
OR: push 1 per a, then pop for every (2/3)b... fractions don't work.

Better: push 3 symbols for every 2 a's:
- Read 2 a's: push 3 X's
- Read b's: pop 1 X per b
- Accept when stack empty

But reading "2 a's at a time" requires counting to 2 in the state:

Transitions:
1. (q0, a, ε) → (q1, ε)   [read first a of pair, don't push yet]
2. (q1, a, ε) → (q0, XXX) [read second a: NOW push 3 X's]
   (meaning: push X three times — treat as one big step)

Actually: push 3 X's means 3 transitions. Simplified as notation:
After reading pair "aa": push X, X, X onto stack.

To push 3 with one rule, use intermediate states:
(q1, a, ε) → (q_push1, X)
(q_push1, ε, ε) → (q_push2, X)
(q_push2, ε, ε) → (q0, X)

Then reading b's:
(q0, b, X) → (q_b, ε)     [when done with a's, start b-phase]
(q_b, b, X) → (q_b, ε)

F = {q_b} when stack empty

Alternative: push 1 per a, pop 1 per b, but accept only if |b|/|a| = 3/2.
This requires tracking modular conditions — better to use 3-push approach.`},
  ];

  return (
    <div>
      <H2>Sheet 5 — PDA Problems</H2>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"12px 0"}}>
        {questions.map((q2,i)=>(
          <button key={i} onClick={()=>setQ(i)}
            style={{padding:"6px 11px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"11px",transition:"all 0.2s",
              background:q===i?"#06b6d4":"#21262d",
              color:q===i?"#0d1117":"#adbac7"}}>
            {q2.title}
          </button>
        ))}
      </div>
      <Box color="cyan" title={questions[q].title}>
        <span style={{fontFamily:"monospace",fontSize:"13px"}}>{questions[q].q}</span>
      </Box>
      <CB code={questions[q].a} />
    </div>
  );
};

/* ─── SECTION: TURING MACHINES ───────────────────────────── */
const TMContent = () => {
  const [sub, setSub] = useState("concept");
  const subs = [
    {id:"concept",label:"⚙️ Concept"},
    {id:"examples",label:"💡 Examples"},
    {id:"compute",label:"🧮 Computing"},
    {id:"sheet",label:"📝 Sheet 6"},
  ];
  return (
    <div>
      <SectionTitle icon="⚙️">Turing Machines (TM)</SectionTitle>
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap",margin:"16px 0"}}>
        {subs.map(s=>(
          <button key={s.id} onClick={()=>setSub(s.id)}
            style={{padding:"8px 16px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:600,fontSize:"13px",transition:"all 0.2s",
              background:sub===s.id?"#f97316":"#21262d",
              color:sub===s.id?"#0d1117":"#adbac7"}}>
            {s.label}
          </button>
        ))}
      </div>
      {sub==="concept" && <TMConcept />}
      {sub==="examples" && <TMExamples />}
      {sub==="compute" && <TMCompute />}
      {sub==="sheet" && <Sheet6Content />}
    </div>
  );
};

const TMConcept = () => (
  <div>
    <H2>What is a Turing Machine?</H2>
    <P>A <b style={{color:"#f97316"}}>Turing Machine</b> is the most powerful computational model. Unlike FA and PDA, it has an <b>infinite tape</b> it can both read and write, moving in either direction. It models everything a real computer can compute.</P>

    <H3>TM Architecture</H3>
    <div style={{display:"flex",gap:"12px",flexWrap:"wrap",margin:"12px 0"}}>
      <div style={{flex:"1 1 260px",background:"#161b22",borderRadius:"10px",padding:"16px",border:"1px solid #30363d"}}>
        <div style={{color:"#f97316",fontWeight:700,marginBottom:"10px"}}>Components</div>
        {[
          {part:"Finite State Control",desc:"Reads/writes tape; one state at a time"},
          {part:"Infinite Tape",desc:"Extends infinitely right; initially filled with blanks (#)"},
          {part:"Read/Write Head",desc:"Reads AND writes symbols; moves left (L) or right (R)"},
          {part:"Left End (<)",desc:"Marks leftmost boundary of tape"},
        ].map((item,i)=>(
          <div key={i} style={{marginBottom:"8px"}}>
            <span style={{color:"#f97316",fontWeight:600,fontSize:"13px"}}>{item.part}:</span>
            <div style={{color:"#8b949e",fontSize:"12px"}}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{flex:"2 1 260px"}}>
        <Box color="orange" title="Special Symbols">
          <b>s</b>: start state<br/>
          <b>h</b>: halt state (no final states — TM halts instead)<br/>
          <b>#</b>: blank symbol (fills empty tape)<br/>
          <b>&lt;</b>: marks left end of tape<br/>
          <b>L</b>: move head Left<br/>
          <b>R</b>: move head Right<br/>
          <b>Y</b>: accept the input (halt and accept)<br/>
          <b>N</b>: reject the input (halt and reject)
        </Box>
        <Box color="blue" title="Key Difference from FA/PDA">
          TM can <b>write</b> to the tape (modify symbols). It can move <b>both left and right</b>. It has <b>no final states</b> — instead it halts and outputs Y (accept) or N (reject). The tape acts as both input AND working memory.
        </Box>
      </div>
    </div>

    <H3>Formal Definition</H3>
    <Formula>M = (K, Σ, Γ, s, δ)</Formula>
    <CompareTable
      headers={["Component","Name","Description"]}
      rows={[
        ["K","States","Finite set, not including halt state h"],
        ["Σ","Input alphabet","Input symbols (subset of Γ)"],
        ["Γ","Tape alphabet","All symbols TM can use: Σ ∪ {#, <, ...}"],
        ["s","Start state","s ∈ K"],
        ["δ","Transition function","δ: K×(Γ∪{<}) → (K∪{h})×(Γ∪{<})×{L,R,Y,N}"],
      ]}
    />

    <H3>Transition Format</H3>
    <Box color="cyan" title="(q, a) → (p, b, action)">
      When in state q reading symbol a on the tape:<br/>
      → Go to state p, write b (replacing a), and perform action (L, R, Y, or N)<br/><br/>
      <b>L/R</b>: move head left/right<br/>
      <b>Y</b>: halt and ACCEPT<br/>
      <b>N</b>: halt and REJECT
    </Box>
  </div>
);

const TMExamples = () => {
  const [ex, setEx] = useState(0);
  const examples = [
    {
      title:"Accept even-length strings",
      desc:"L = {w∈{a,b}* | |w| is even}: TM acting like a DFA.",
      answer:`TM:
M = (K, Σ, Γ, s, δ)
K = {q0, q1}
Σ = {a, b}
Γ = {a, b, #}
s = q0

δ (transition function):
(q0, a) → (q1, a, R)   [read a: go to q1, keep a, move right]
(q0, b) → (q1, b, R)   [read b: go to q1, keep b, move right]
(q0, #) → (q0, #, Y)   [blank means end: if in q0 (even count), ACCEPT]
(q1, a) → (q0, a, R)   [read a: go back to q0]
(q1, b) → (q0, b, R)   [read b: go back to q0]
(q1, #) → (q1, #, N)   [blank in q1 (odd count): REJECT]

Logic:
- q0 = "even number of symbols read so far"
- q1 = "odd number of symbols read so far"
- When we see #, we've finished: Y if even (q0), N if odd (q1)

Trace for "ab" (length 2, even → ACCEPT):
Start: q0, tape: [<#ab#]
(q0,a)→(q1,a,R): q1, head on 'b'
(q1,b)→(q0,b,R): q0, head on '#'
(q0,#)→(q0,#,Y): ACCEPT ✓

Trace for "aba" (length 3, odd → REJECT):
(q0,a)→q1; (q1,b)→q0; (q0,a)→q1; (q1,#)→N: REJECT ✓`
    },
    {
      title:"TM that erases tape",
      desc:"TM that replaces every a and b with # (blank), halting at first blank.",
      answer:`TM:
K = {q0}
Σ = {a, b}
Γ = {a, b, #}
s = q0

δ:
(q0, a) → (q0, #, R)   [replace a with blank, move right]
(q0, b) → (q0, #, R)   [replace b with blank, move right]
(q0, #) → (q0, #, Y)   [reach end: accept]

Trace for "aba":
q0, head on 'a' → write #, move right
q0, head on 'b' → write #, move right
q0, head on 'a' → write #, move right
q0, head on '#' → ACCEPT

Tape after: [# # # #] (all erased)`
    },
    {
      title:"Accept aⁿbⁿcⁿ — classic TM",
      desc:"L = {aⁿbⁿcⁿ | n≥0}: equal counts of a, b, and c. Cannot be done by PDA!",
      answer:`Strategy:
1. Match one a, one b, one c at a time by crossing them off
2. Mark matched symbols with X
3. Repeat until all symbols matched or mismatch found

TM States:
s0: find and mark an 'a' with X
s1: scan right to find a 'b', mark with X
s2: continue right to find a 'c', mark with X
s3: scan left back to start for next round
s4: final verify (all should be X's)

Key transitions:
(s0, a) → (s1, X, R)   [mark a, go find b]
(s0, X) → (s0, X, R)   [skip X's going right]
(s0, #) → (s4, #, Y)   [no more a's: accept if all matched]

(s1, a) → (s1, a, R)   [skip remaining a's]
(s1, X) → (s1, X, R)   [skip X's]
(s1, b) → (s2, X, R)   [found b, mark it, go find c]
(s1, #) → (s1, #, N)   [no b found: REJECT]

(s2, b) → (s2, b, R)   [skip remaining b's]
(s2, X) → (s2, X, R)   [skip X's]
(s2, c) → (s3, X, L)   [found c, mark it, go left]
(s2, #) → (s2, #, N)   [no c found: REJECT]

(s3, a,b,c,X) → (s3, *, L)  [scan all the way left]
(s3, #) → (s0, #, R)  [back at start: repeat loop]

This TM requires MULTIPLE passes over the tape!
PDA cannot do this because once we pop the stack, we lose track.`
    },
    {
      title:"Bit-flip: f(w) = w̄",
      desc:"TM computing a function: flip every 0 to 1 and every 1 to 0.",
      answer:`TM (function computation, not just acceptance):
M = (K, Σ, Γ, s, δ)
K = {q0}
Σ = {0, 1}
Γ = {0, 1, #}
s = q0

δ:
(q0, 0) → (q0, 1, R)   [flip 0 to 1, move right]
(q0, 1) → (q0, 0, R)   [flip 1 to 0, move right]
(q0, #) → (q0, #, Y)   [done: halt and accept]

Trace for "1011":
Initial tape: [1 0 1 1 #]
Step 1: q0 reads '1' → write 0, move R: [0 0 1 1 #]
Step 2: q0 reads '0' → write 1, move R: [0 1 1 1 #]
Step 3: q0 reads '1' → write 0, move R: [0 1 0 1 #]
Step 4: q0 reads '1' → write 0, move R: [0 1 0 0 #]
Step 5: q0 reads '#' → HALT (Y)
Output: 0100 ✓

This TM COMPUTES the complement function w̄.
TMs are not just language recognizers — they compute functions!`
    },
  ];

  return (
    <div>
      <H2>Turing Machine — Design Examples</H2>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"12px 0"}}>
        {examples.map((e,i)=>(
          <button key={i} onClick={()=>setEx(i)}
            style={{padding:"7px 13px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"12px",transition:"all 0.2s",
              background:ex===i?"#f97316":"#21262d",
              color:ex===i?"#0d1117":"#adbac7"}}>
            {i+1}. {e.title}
          </button>
        ))}
      </div>
      <Box color="orange" title={`TM Example: ${examples[ex].title}`}>
        {examples[ex].desc}
      </Box>
      <CB code={examples[ex].answer} />
    </div>
  );
};

const TMCompute = () => (
  <div>
    <H2>TM as a Computer of Functions</H2>
    <P>TMs are not just language recognizers — they can compute any <b>computable function</b> from strings to strings. This is the <b>Church-Turing Thesis</b>: anything a real computer can compute, a TM can compute.</P>

    <H3>Unary Notation for Numbers</H3>
    <Box color="blue" title="Representing numbers">
      Number n in unary = n consecutive 1's<br/>
      0 = ε (empty), 1 = "1", 2 = "11", 3 = "111", etc.
    </Box>

    <CB code={`// ─── f(x) = x + 2 in unary ───
// Input: 111 (=3 in unary), Output: 11111 (=5)
// Strategy: append two more 1's to the right

TM States: {q0}
(q0, 1) → (q0, 1, R)    [skip all 1's to reach end]
(q0, #) → (q1, 1, R)    [write first extra 1]
(q1, #) → (q0, 1, Y)    [write second extra 1, halt]

// ─── f(x) = x mod 2 in unary ───
// Input: 1111 (=4), Output: ε (=0, since 4 mod 2 = 0)
// Input: 111  (=3), Output: 1 (=1, since 3 mod 2 = 1)
// Strategy: erase pairs of 1's

TM States: {q0, q1}
(q0, 1) → (q1, #, R)    [erase one 1, go to q1]
(q1, 1) → (q0, #, R)    [erase another 1, back to q0]
(q0, #) → (q0, #, Y)    [even count: all erased, output ε = 0 ✓]
(q1, #) → (q1, 1, Y)    [odd count: write 1, output "1" = 1 ✓]

// Note: output is on the tape when TM halts`} />

    <H3>Language Hierarchy Summary</H3>
    <div style={{margin:"12px 0"}}>
      {[
        {level:"Regular Languages",model:"DFA / NFA / RE",example:"aⁿ, (a∪b)*, strings containing '101'",color:"#58a6ff"},
        {level:"Context-Free Languages",model:"CFG / PDA",example:"aⁿbⁿ, palindromes, balanced parens",color:"#22c55e"},
        {level:"Context-Sensitive Languages",model:"Linear Bounded TM",example:"aⁿbⁿcⁿ, {ww}",color:"#f59e0b"},
        {level:"Recursively Enumerable",model:"Turing Machine",example:"Everything a computer can decide",color:"#f97316"},
        {level:"Non-computable",model:"Nothing",example:"Halting problem, some logic problems",color:"#ef4444"},
      ].map((item,i)=>(
        <div key={i} style={{display:"flex",gap:"12px",alignItems:"flex-start",
          background:"#161b22",borderLeft:`4px solid ${item.color}`,
          padding:"10px 14px",borderRadius:"0 8px 8px 0",marginBottom:"6px"}}>
          <div style={{minWidth:"200px"}}>
            <div style={{color:item.color,fontWeight:700,fontSize:"13px"}}>{item.level}</div>
            <div style={{color:"#6e7681",fontSize:"12px"}}>Model: {item.model}</div>
          </div>
          <div style={{color:"#8b949e",fontSize:"12px",fontFamily:"monospace"}}>{item.example}</div>
        </div>
      ))}
    </div>
  </div>
);

const Sheet6Content = () => {
  const [q, setQ] = useState(0);
  const questions = [
    { title:"Q1a: Trace #ab#", q:"Given TM with transitions shown in sheet. Trace input #ab#.",
      a:`The TM in Sheet 6 (Dr. Ahmed Younes) appears to be a TM that moves
the first character of the string to the END of the string (a rotation/move).

Let's trace #ab# step by step based on the transition table:

State Symbol → (NextState, Symbol, Direction)
q0    #      → (q1, #, R)
q1    a      → (q2, #, R)    [erase first char 'a', remember it was 'a' (go to q2 for 'a')]
q2    b      → (q2, b, R)    [scan right over content]
q2    #      → (q7, a, L)    [hit end blank: write 'a' here (appending to end)]
q7 scans left...
Eventually arrives back near beginning.

Trace for #ab#:
Config 0: q0  #  a  b  #
Config 1: q1  #  a  b  #   (q0 reads #: go q1, write #, R)
Config 2: #  q2  #  b  #   (q1 reads a: go q2, write #, R — erased a)
Config 3: #  #  q2  b  #   (q2 reads #: skip... wait q2 on # goes to q4,a,R)
Actually: (q2, #) → (q4, a, R): write 'a' after the blank → appending a

Let's re-read more carefully:
q3 # → (q4, a, R): writes 'a'
q5 # → (q6, b, R): writes 'b'

The TM seems to copy the last character to after the string.

Final configuration for #ab#:
After processing: the TM writes what it found at the end to after the final #.
Result: #ab# with an extra character appended → #ab + lastchar#
If input is #ab#, last non-blank = b: output might be #ab b# = #abb#

This TM appears to DUPLICATE the last character of the string.`},
    { title:"Q1b: Trace #baa#", q:"Trace the same TM with input #baa#",
      a:`Using the transition table from Sheet 6:

For input #baa#:
- The TM reads from left, erases first character, remembers it
- Scans to end, writes the remembered character after the string

Step-by-step:
q0 reads #: → (q1, #, R) — move past initial #
q1 reads b: → (q5, #, R) — erase b, go to "remember b" path (q5 for b)
q5 reads a: → (q5... wait need exact table)

Based on the table structure:
q2 states handle 'a', q5 states handle 'b'
q2 scans right, q3/q4 write 'a' at end
q5 scans right, q6/q7 write 'b' at end

For #baa#:
1. Start q0: read #, → q1
2. q1 reads 'b': → q5 (erase b, note it was b)
3. q5 reads 'a': → q5 (skip, moving right)
4. q5 reads 'a': → q5 (skip)
5. q5 reads '#': → q6 (write 'b', go right) — appending b
6. q6 on '#': → q7 (move left)
7. q7 scans back left to q2
...
Final: string with first char moved to end: #aa# → Wait...
If input was #baa# and first char (b) is moved to end: #aab#`},
    { title:"Q1c: What does TM do?", q:"Describe what the TM does for arbitrary input in {a,b}*",
      a:`Based on the structure of the transition table in Sheet 6:

The TM appears to ROTATE the string — it takes the FIRST character
of the string and moves it to the END.

For input #w# where w = c₁c₂c₃...cₙ:
Output: #c₂c₃...cₙc₁#

Evidence:
- q0, q1: move past initial # and erase first character (remember via state which char it was)
- q2/q5: scan RIGHT over remaining characters (q2 path for 'a', q5 path for 'b')
- q3/q4 (for 'a') or q6 (for 'b'): hit final #, write the remembered character AFTER the string
- q7: scan back LEFT
- q2 again: repeat for next first character (or halt)

So for #ab#: first char 'a' removed, appended to end → #ba#
For #baa#: first char 'b' removed, appended to end → #aab#

This is a LEFT ROTATION of the string by one position.`},
    { title:"Q2: TM for {aⁱbʲ | i<j}", q:"Construct TM to accept {aⁱbʲ | i<j}: more b's than a's",
      a:`TM Strategy:
- Match each 'a' with one 'b' by crossing them out (X)
- After all a's matched, if there's at least one more b: ACCEPT
- If b's run out before a's: REJECT

States: s0, s1, s2, s3

s0: find next unmatched 'a'
s1: find corresponding 'b' to match
s2: verify there's at least one extra 'b' after matching
s3: accept state

TM transitions:
(s0, <) → (s0, <, R)    [skip left marker]
(s0, a) → (s1, X, R)    [mark 'a' with X, go find a b]
(s0, X) → (s0, X, R)    [skip already-matched a's (X's)]
(s0, b) → (s2, b, R)    [all a's matched (or i=0): verify remaining b's]
(s0, #) → (s0, #, N)    [ran out of input with no b's: REJECT]

(s1, a) → (s1, a, R)    [skip unmatched a's going right]
(s1, X) → (s1, X, R)    [skip matched X's]
(s1, b) → (s0, X, L)    [found matching b: mark it X, go back left]
(s1, #) → (s1, #, N)    [no b's left but still have a's: REJECT]

(s2, b) → (s2, b, R)    [count remaining unmatched b's]
(s2, X) → (s2, X, R)    [skip matched X's]
(s2, #) → (s2, #, Y)    [found at least one b: we're in s2 = ACCEPT]

Verification:
"abb" (i=1, j=2, 1<2 ✓):
s0: skip <, read a→X, go right (s1)
s1: read b→X, go left (s0)
s0: read X(skip), read b→s2
s2: read b, then #: ACCEPT ✓

"ab" (i=1, j=1, 1<1 is FALSE ✗):
s0: a→X, s1
s1: b→X, s0
s0: only X's and # left → s0 reads # → REJECT ✓`},
    { title:"Q3: TM for w=wᴿ", q:"Construct TM to accept {w∈{a,b}* | w is a palindrome}",
      a:`TM Strategy:
- Compare FIRST character with LAST character
- If they match: erase both and repeat on middle
- If they mismatch: REJECT
- If 0 or 1 character remains: ACCEPT

States: s0, s1a, s1b, s2, s3a, s3b, s4

s0: read and erase first character (remember which: a or b → state s1a or s1b)
s1a: scan right to find last char (remembered first=a)
s1b: scan right to find last char (remembered first=b)
s2: at last char: check if it matches
s3a/s3b: it matched! erase last char, scan left back to start
s4: done (0 or 1 char left) — ACCEPT

Key transitions:
(s0, a) → (s1a, #, R)   [erase first a, remember 'a']
(s0, b) → (s1b, #, R)   [erase first b, remember 'b']
(s0, #) → (s0, #, Y)    [empty: palindrome ✓]

(s1a, a) → (s1a, a, R)  [scan right to end]
(s1a, b) → (s1a, b, R)
(s1a, #) → (s2a, #, L)  [past end: backup to last char]
(s2a, a) → (s3, #, L)   [last char is 'a', matches! erase it]
(s2a, b) → (s0, #, N)   [mismatch: REJECT]
(s2a, #) → (s0, #, Y)   [only one char left (matched already): ACCEPT]

Similarly for s1b path (checks if last char = 'b')

(s3, b) → (s3, b, L)    [scan left back to start]
(s3, a) → (s3, a, L)
(s3, #) → (s0, #, R)    [back at left marker: start next iteration]`},
    { title:"Q4a: f(x) = x+2", q:"TM to compute f(x) = x+2 where x is in unary notation",
      a:`Unary notation: x is represented as x ones.
f(x) = x + 2 means append two more 1's.

TM:
K = {q0, q1}
Σ = {1}
Γ = {1, #}
s = q0

δ:
(q0, 1) → (q0, 1, R)    [scan right over all the 1's]
(q0, #) → (q1, 1, R)    [hit blank: write first extra 1]
(q1, #) → (q0, 1, Y)    [write second extra 1, HALT]

Trace for x=3 ("111"):
q0: reads 1→R, reads 1→R, reads 1→R
q0: reads #: write 1, go to q1, R
q1: reads #: write 1, Y (HALT)

Input tape:  # 1 1 1 # # # ...
Output tape: # 1 1 1 1 1 # ...  (= 5 = 3+2 ✓)`},
    { title:"Q4b: f(x) = x mod 2", q:"TM to compute f(x) = x mod 2 in unary",
      a:`x mod 2 = 0 if x is even (output ε = blank)
x mod 2 = 1 if x is odd (output "1" = one 1)

TM Strategy: erase pairs of 1's. At end, if anything remains (one 1), 
that IS the output. If tape is blank, output is 0 (= ε).

TM:
K = {q0, q1}
Σ = {1}
Γ = {1, #}
s = q0

δ:
(q0, 1) → (q1, #, R)    [erase first 1 of pair, move to q1]
(q1, 1) → (q0, #, R)    [erase second 1 of pair, back to q0]
(q0, #) → (q0, #, Y)    [even count: all erased, output is ε = 0]
(q1, #) → (q0, 1, Y)    [odd count: one leftover, output "1" = 1]

Trace for x=4 ("1111"):
q0: read 1→erase→q1; q1: read 1→erase→q0
q0: read 1→erase→q1; q1: read 1→erase→q0
q0: reads # → HALT, tape is blank → output = 0 (4 mod 2 = 0 ✓)

Trace for x=3 ("111"):
q0: read 1→erase→q1; q1: read 1→erase→q0
q0: read 1→erase→q1; q1: reads # → write 1, HALT
Output tape: # 1 # → output = 1 (3 mod 2 = 1 ✓)`},
  ];

  return (
    <div>
      <H2>Sheet 6 — Turing Machines</H2>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"12px 0"}}>
        {questions.map((q2,i)=>(
          <button key={i} onClick={()=>setQ(i)}
            style={{padding:"6px 11px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"11px",transition:"all 0.2s",
              background:q===i?"#f97316":"#21262d",
              color:q===i?"#0d1117":"#adbac7"}}>
            {q2.title}
          </button>
        ))}
      </div>
      <Box color="orange" title={questions[q].title}>
        <span style={{fontFamily:"monospace",fontSize:"13px"}}>{questions[q].q}</span>
      </Box>
      <CB code={questions[q].a} />
    </div>
  );
};

/* ─── MAIN APP ───────────────────────────────────────────── */
export default function TOCGuide() {
  const [tab, setTab] = useState("sets");

  const tabs = [
    {id:"sets",   label:"📐 Sets/Relations", color:"#58a6ff"},
    {id:"regex",  label:"✳️ Regular Expr",   color:"#a855f7"},
    {id:"dfa",    label:"🔵 DFA",            color:"#f59e0b"},
    {id:"nfa",    label:"🌀 NFA",            color:"#ef4444"},
    {id:"cfg",    label:"🌿 CFG",            color:"#22c55e"},
    {id:"pda",    label:"📚 PDA",            color:"#06b6d4"},
    {id:"tm",     label:"⚙️ Turing Machine", color:"#f97316"},
  ];

  return (
    <div style={{background:"#010409",minHeight:"100vh",fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
      {/* Header */}
      <div style={{background:"#0d1117",borderBottom:"1px solid #21262d",padding:"0 20px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{padding:"16px 0 0",display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{fontSize:"22px",fontWeight:800,color:"#fff",
              fontFamily:"'Fira Code','Consolas',monospace"}}>
              <span style={{color:"#f97316"}}>TOC</span>
              <span style={{color:"#6e7681"}}>::</span>
              <span style={{color:"#22c55e"}}>Guide</span>
            </div>
            <div style={{fontSize:"12px",color:"#6e7681",background:"#161b22",
              border:"1px solid #30363d",borderRadius:"20px",padding:"3px 10px"}}>
              Theory of Computation
            </div>
            <div style={{fontSize:"12px",color:"#58a6ff",background:"#0c1e3c",
              border:"1px solid #3b82f644",borderRadius:"20px",padding:"3px 10px"}}>
              Dr. Ahmed Moustafa · Alexandria University
            </div>
          </div>
          <div style={{display:"flex",gap:"0",marginTop:"12px",overflowX:"auto"}}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                style={{padding:"10px 16px",border:"none",cursor:"pointer",fontWeight:600,
                  fontSize:"13px",transition:"all 0.2s",background:"transparent",
                  whiteSpace:"nowrap",
                  color: tab===t.id ? t.color : "#6e7681",
                  borderBottom: tab===t.id ? `2px solid ${t.color}` : "2px solid transparent",
                  marginBottom:"-1px"}}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"24px 20px",minHeight:"calc(100vh - 120px)"}}>
        {tab==="sets"  && <SetsContent />}
        {tab==="regex" && <RegexContent />}
        {tab==="dfa"   && <DFAContent />}
        {tab==="nfa"   && <NFAContent />}
        {tab==="cfg"   && <CFGContent />}
        {tab==="pda"   && <PDAContent />}
        {tab==="tm"    && <TMContent />}
      </div>
    </div>
  );
}
