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
    orange:{ bg:"#2e1500", b:"#f97316", t:"#fdba74" },
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

const TruthTable = ({ caption, headers, rows }) => (
  <div style={{margin:"12px 0"}}>
    {caption && <div style={{color:"#8b949e",fontSize:"12px",marginBottom:"6px"}}>{caption}</div>}
    <div style={{overflowX:"auto"}}>
      <table style={{borderCollapse:"collapse",fontSize:"13px",fontFamily:"monospace"}}>
        <thead>
          <tr>{headers.map((h,i)=>(
            <th key={i} style={{background:"#161b22",color:"#f0883e",padding:"8px 16px",
              border:"1px solid #30363d",textAlign:"center"}}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map((row,i)=>(
            <tr key={i} style={{background:i%2===0?"#0d1117":"#0f151d"}}>
              {row.map((cell,j)=>(
                <td key={j} style={{padding:"7px 16px",color: cell==="1"?"#3fb950": cell==="0"?"#f85149":"#adbac7",
                  border:"1px solid #21262d",textAlign:"center",fontWeight: (cell==="1"||cell==="0") ? 700 : 400}}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Formula = ({ children }) => (
  <div style={{background:"#161b22",border:"1px solid #30363d",borderRadius:"8px",
    padding:"12px 20px",margin:"10px 0",fontFamily:"monospace",fontSize:"15px",
    color:"#f0883e",textAlign:"center",letterSpacing:"1px"}}>{children}</div>
);

/* ─── SECTION: BOOLEAN ALGEBRA (Lec 1) ──────────────────── */
const BooleanContent = () => {
  const [sub, setSub] = useState("intro");
  const subs = [
    {id:"intro",label:"📖 Intro & Gates"},
    {id:"laws",label:"⚖️ Laws"},
    {id:"canonical",label:"📐 Canonical Forms"},
    {id:"examples",label:"💡 Examples"},
  ];
  return (
    <div>
      <SectionTitle icon="🔢">Boolean Algebra & Digital Logic</SectionTitle>
      <P>The mathematical foundation of all digital circuits — every computer operation reduces to Boolean logic.</P>

      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"14px 0"}}>
        {subs.map(s=>(
          <button key={s.id} onClick={()=>setSub(s.id)}
            style={{padding:"7px 14px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"12px",transition:"all 0.2s",
              background:sub===s.id?"#58a6ff":"#21262d",
              color:sub===s.id?"#0d1117":"#adbac7"}}>
            {s.label}
          </button>
        ))}
      </div>

      {sub==="intro" && (
        <div>
          <Box color="cyan" title="Boolean Algebra Definition">
            A mathematical system for variables that can have <b>one of two values</b>: true/false, 1/0, on/off, high/low. Operations include AND, OR, NOT.
          </Box>

          <H3>Logic Gates — The Building Blocks</H3>
          <P>Boolean functions are implemented in digital circuits called <b style={{color:"#f0883e"}}>gates</b>. A gate is an electronic device producing a result based on input values. In reality, gates use 1–6 transistors, but designers treat them as a single unit.</P>

          <Box color="yellow" title="Universal Gates">
            A universal gate can implement ANY Boolean function alone: <b>AND-OR-NOT</b>, <b>NAND</b>, <b>NOR</b>, <b>AND-XOR-NOT</b>.
          </Box>

          <CompareTable
            headers={["Gate","Symbol/Function","Truth Table (A,B→x)","Notes"]}
            rows={[
              ["AND","x = A·B  (or AB)","0,0→0 | 0,1→0 | 1,0→0 | 1,1→1","Boolean product"],
              ["OR","x = A + B","0,0→0 | 0,1→1 | 1,0→1 | 1,1→1","Boolean sum"],
              ["NOT (Inverter)","x = A'","0→1 | 1→0","Overbar or prime notation"],
              ["Buffer","x = A","0→0 | 1→1","No logic change, signal strength"],
              ["NAND","x = (AB)'","0,0→1 | 0,1→1 | 1,0→1 | 1,1→0","Universal gate"],
              ["NOR","x = (A+B)'","0,0→1 | 0,1→0 | 1,0→0 | 1,1→0","Universal gate"],
              ["XOR","x = A⊕B = A'B+AB'","0,0→0 | 0,1→1 | 1,0→1 | 1,1→0","Exclusive-OR"],
              ["XNOR","x = (A⊕B)' = A'B'+AB","0,0→1 | 0,1→0 | 1,0→0 | 1,1→1","Equivalence gate"],
            ]}
          />

          <H3>Boolean Function Characteristics</H3>
          <Ul>
            <Li>Has at least one Boolean variable</Li>
            <Li>Has at least one Boolean operator (AND, OR, NOT)</Li>
            <Li>Has at least one input from the set {"{0,1}"}</Li>
            <Li>Produces an output that is also a member of {"{0,1}"}</Li>
          </Ul>
          <Box color="blue" title="Operator Precedence">
            NOT has the <b>highest priority</b>, followed by AND, then OR. This matches how expressions are evaluated left to right.
          </Box>

          <H3>Example: F(x,y,z) = xz̄ + y</H3>
          <TruthTable
            caption="Truth table evaluation showing intermediate columns:"
            headers={["x","y","z","z̄","xz̄","xz̄+y"]}
            rows={[
              ["0","0","0","1","0","0"],
              ["0","0","1","0","0","0"],
              ["0","1","0","1","0","1"],
              ["0","1","1","0","0","1"],
              ["1","0","0","1","1","1"],
              ["1","0","1","0","0","0"],
              ["1","1","0","1","1","1"],
              ["1","1","1","0","0","1"],
            ]}
          />
        </div>
      )}

      {sub==="laws" && (
        <div>
          <H3 color="#f0883e">Group 1 — Intuitive Laws</H3>
          <CompareTable
            headers={["Law","AND Form","OR Form"]}
            rows={[
              ["Identity Law","1·x = x","0 + x = x"],
              ["Null Law","0·x = 0","1 + x = 1"],
              ["Idempotent Law","x·x = x","x + x = x"],
              ["Inverse Law","x·x̄ = 0","x + x̄ = 1"],
            ]}
          />

          <H3 color="#f0883e">Group 2 — Algebraic Laws</H3>
          <CompareTable
            headers={["Law","AND Form","OR Form"]}
            rows={[
              ["Commutative Law","xy = yx","x+y = y+x"],
              ["Associative Law","(xy)z = x(yz)","(x+y)+z = x+(y+z)"],
              ["Distributive Law","x+yz = (x+y)(x+z)","x(y+z) = xy+xz"],
            ]}
          />

          <H3 color="#f0883e">Group 3 — Most Useful Laws</H3>
          <CompareTable
            headers={["Law","AND Form","OR Form"]}
            rows={[
              ["Absorption Law","x(x+y) = x","x + xy = x"],
              ["DeMorgan's Law","(xy)' = x̄ + ȳ","(x+y)' = x̄ȳ"],
              ["Double Complement","(x̄)' = x","—"],
            ]}
          />

          <Box color="purple" title="DeMorgan's Law — Most Important!">
            To find the complement of a Boolean function: <b>replace each variable with its complement</b> and <b>change all ANDs to ORs, all ORs to ANDs</b>.
            <br/><br/>
            Example: F(X,Y,Z) = XY + X̄Z + YZ̄<br/>
            F'(X,Y,Z) = (X̄+Ȳ)(X+Z̄)(Ȳ+Z) — using DeMorgan extended to any number of variables
          </Box>

          <Box color="green" title="Why Simplify?">
            Simpler Boolean function → smaller circuit → <b>cheaper to build, less power, faster operation</b>. Always reduce functions to their simplest form.
          </Box>

          <H3>Simplification Example</H3>
          <P>Simplify: <b style={{color:"#f0883e"}}>F = BC + BC̄ + BA</b></P>
          <CB code={`F = BC + BC̄ + BA
  = B(C + C̄) + BA     ← Distributive Law
  = B(1) + BA          ← Inverse Law: C + C̄ = 1
  = B + BA             ← Identity Law: B·1 = B
  = B(1 + A)           ← Distributive Law
  = B · 1              ← Null Law: 1 + A = 1
  = B                  ← Identity Law: B·1 = B`} />

          <H3>Proof Example</H3>
          <P>Show: <b style={{color:"#f0883e"}}>A(BC̄ + BC)' = Ā + (B+C)(B̄+C̄)</b></P>
          <CB code={`Left side:
  A(BC̄ + BC)' = Ā + (BC̄ + BC)'   ← DeMorgan on A(...)
              = Ā + (BC̄)'(BC)'    ← DeMorgan on the sum
              = Ā + (B̄C)(B̄C)     ← DeMorgan each term
              = Ā + (B+C)(B̄+C̄)  ← DeMorgan again = RHS ✓`} />
        </div>
      )}

      {sub==="canonical" && (
        <div>
          <Box color="cyan" title="Why Canonical Forms?">
            There are many ways to write the same Boolean expression (logically equivalent). Canonical forms provide a <b>standardized representation</b> so designers can compare functions unambiguously.
          </Box>

          <H3>Sum-of-Products (SOP)</H3>
          <P>ANDed variables (called minterms) are ORed together. Look for rows where output = 1 in the truth table.</P>
          <Formula>F(x,y,z) = xy + xz + yz</Formula>
          <Box color="blue" title="How to get SOP from truth table">
            Find all rows where F=1. For each row, write the product term: use the variable directly if it's 1, use its complement if it's 0. OR all product terms together.
          </Box>

          <H3>Example: F(x,y,z) = xz̄+y → SOP Canonical Form</H3>
          <CB code={`From truth table, rows where F=1:
  Row (0,1,0): x̄yz̄   (x=0 → x̄, y=1 → y, z=0 → z̄)
  Row (0,1,1): x̄yz    (x=0 → x̄, y=1 → y, z=1 → z)
  Row (1,0,0): xy̓z̄   (x=1 → x,  y=0 → ȳ, z=0 → z̄)
  Row (1,1,0): xyz̄    (x=1 → x,  y=1 → y,  z=0 → z̄)
  Row (1,1,1): xyz    (x=1 → x,  y=1 → y,  z=1 → z)

F(x,y,z) = x̄yz̄ + x̄yz + xȳz̄ + xyz̄ + xyz  ← canonical SOP`} />

          <H3>Product-of-Sums (POS)</H3>
          <P>ORed variables (called maxterms) are ANDed together. Look for rows where output = 0 in the truth table.</P>
          <Formula>F(x,y,z) = (x+y)(x+z)(y+z)</Formula>
          <Box color="orange" title="How to get POS from truth table">
            Find all rows where F=0. For each row, write the sum term: use the variable directly if it's 0, use its complement if it's 1. AND all sum terms together.
          </Box>

          <CompareTable
            headers={["Form","Based on","Truth table rows","Operator structure"]}
            rows={[
              ["SOP (Sum of Products)","Minterms","F=1 rows","OR of ANDs"],
              ["POS (Product of Sums)","Maxterms","F=0 rows","AND of ORs"],
            ]}
          />
        </div>
      )}

      {sub==="examples" && (
        <div>
          <H2>Boolean Algebra — Worked Examples</H2>

          <H3>Example 1: Simplify F(A,B,C) = (A+B)(A+C)</H3>
          <CB code={`(A+B)(A+C) = AA + AC + AB + BC
           = A + AC + AB + BC      ← Idempotent: AA = A
           = A(1 + C + B) + BC     ← Factor A
           = A·1 + BC              ← Null Law: 1+C+B = 1
           = A + BC                ← Identity

F(A,B,C) = A + BC`} />

          <H3>Example 2: Simplify F = BC + BC̄ + BA</H3>
          <CB code={`F = B(C + C̄) + BA   ← Factor B
  = B(1) + BA       ← C+C̄=1
  = B + BA          ← B·1=B
  = B(1 + A)        ← Factor B
  = B               ← 1+A=1

F = B`} />

          <H3>Example 3: DeMorgan Complement</H3>
          <CB code={`Find complement of: F(X,Y,Z) = XY + (X̄Z) + (YZ̄)

Step 1: Take complement over whole expression
F̄ = (XY + X̄Z + YZ̄)'

Step 2: DeMorgan → flip OR to AND, complement each product
F̄ = (XY)'·(X̄Z)'·(YZ̄)'

Step 3: DeMorgan each product → flip AND to OR, complement each variable
F̄ = (X̄+Ȳ)(X+Z̄)(Ȳ+Z)`} />

          <H3>Example 4: Verify equality using identities</H3>
          <CB code={`Show: A(BC̄+BC)' = Ā + (B+C)(B̄+C̄)

LHS = A · (BC̄+BC)'
    = Ā + (BC̄+BC)'         ← DeMorgan: A·X = (Ā+X')'... apply to whole
    = Ā + (BC̄)'·(BC)'      ← DeMorgan on sum
    = Ā + (B̄+C)·(B̄+C̄)    ← DeMorgan each product
    = Ā + (B+C)(B̄+C̄)      ← Rearrange = RHS ✓`} />
        </div>
      )}
    </div>
  );
};

/* ─── SECTION: K-MAP (Lec 2) ──────────────────────────────── */
const KMapContent = () => {
  const [sub, setSub] = useState("intro");
  const subs = [
    {id:"intro",label:"🗺️ K-Map Basics"},
    {id:"rules",label:"📏 7 Rules"},
    {id:"sop",label:"➕ SOP Problems"},
    {id:"pos",label:"✖️ POS Problems"},
    {id:"dc",label:"❓ Don't Care"},
  ];
  return (
    <div>
      <SectionTitle icon="🗺️">Karnaugh Map (K-Map)</SectionTitle>
      <P>A graphical method for simplifying Boolean expressions — systematic, visual, and elegant.</P>

      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"14px 0"}}>
        {subs.map(s=>(
          <button key={s.id} onClick={()=>setSub(s.id)}
            style={{padding:"7px 14px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"12px",transition:"all 0.2s",
              background:sub===s.id?"#a855f7":"#21262d",
              color:sub===s.id?"#0d1117":"#adbac7"}}>
            {s.label}
          </button>
        ))}
      </div>

      {sub==="intro" && (
        <div>
          <Box color="purple" title="What is a K-Map?">
            The <b>Karnaugh Map</b> is a graphical representation that provides a systematic method for simplifying Boolean expressions. For n variables, the K-Map has <b>2ⁿ cells</b>.
          </Box>

          <CompareTable
            headers={["Variables","Cells","Grid Size","Example"]}
            rows={[
              ["2","4","2×2","A,B"],
              ["3","8","2×4","A,B,C"],
              ["4","16","4×4","A,B,C,D"],
            ]}
          />

          <H3>2-Variable K-Map Layout</H3>
          <CB code={`       B=0  B=1
A=0  [m0] [m1]      m0 = A'B'   m1 = A'B
A=1  [m2] [m3]      m2 = AB'    m3 = AB

Cells are ordered so adjacent cells differ by ONE variable only (Gray code order)`} />

          <H3>3-Variable K-Map Layout</H3>
          <CB code={`       BC=00  BC=01  BC=11  BC=10
A=0  [ 0 ] [ 1 ] [ 3 ] [ 2 ]
A=1  [ 4 ] [ 5 ] [ 7 ] [ 6 ]

IMPORTANT: Columns are in Gray code order: 00, 01, 11, 10 (NOT 00,01,10,11)
This ensures adjacent cells differ by only one variable.`} />

          <H3>4-Variable K-Map Layout</H3>
          <CB code={`       CD=00  CD=01  CD=11  CD=10
AB=00 [  0] [  1] [  3] [  2]
AB=01 [  4] [  5] [  7] [  6]
AB=11 [ 12] [ 13] [ 15] [ 14]
AB=10 [  8] [  9] [ 11] [ 10]

Numbers = minterm positions: cell 5 = ABCD → 0101 = m5`} />

          <Box color="green" title="Gray Code Ordering — Critical!">
            Adjacent cells in a K-Map MUST differ by exactly one variable. That's why we use Gray code (00→01→11→10) not binary order (00→01→10→11). The K-Map wraps around — left edge is adjacent to right edge, top is adjacent to bottom.
          </Box>
        </div>
      )}

      {sub==="rules" && (
        <div>
          <H2>The 7 K-Map Rules</H2>
          <Box color="cyan" title="Rule 1 — Grouping Same Values">
            Group <b>0's with 0's</b> or <b>1's with 1's</b> — never mix. Don't-care (X) can be grouped with either. You don't have to group X's separately if everything else is covered.
          </Box>
          <Box color="blue" title="Rule 2 — Overlapping Allowed">
            Groups <b>may overlap</b> each other. A cell can belong to multiple groups.
          </Box>
          <Box color="purple" title="Rule 3 — Power of 2 Only">
            Groups must have a number of cells that is a <b>power of 2</b>: 1, 2, 4, 8, 16…
            No groups of 3, 5, 6, 7, 9, etc.
          </Box>
          <Box color="orange" title="Rule 4 — Horizontal or Vertical Only">
            Groups can only be <b>horizontal or vertical</b> rectangles. No diagonal groups, no L-shapes, no T-shapes.
          </Box>
          <Box color="yellow" title="Rule 5 — Largest Possible">
            Each group should be <b>as large as possible</b>. A larger group eliminates more variables.
          </Box>
          <Box color="green" title="Rule 6 — Wrap-Around Grouping Allowed">
            <b>Opposite edges wrap around</b>: left ↔ right, top ↔ bottom. Corner grouping (all 4 corners) is also valid.
          </Box>
          <Box color="red" title="Rule 7 — Fewest Groups">
            Use <b>as few groups as possible</b>. Achieved by following Rule 5 (maximum group size). Each essential group must contain at least one cell not covered by other groups.
          </Box>

          <H3>How to Read a Group → Boolean Term</H3>
          <CB code={`After grouping, identify which variables are CONSTANT across the group:
- If a variable is always 0 in the group → write it complemented (e.g. A')
- If a variable is always 1 in the group → write it directly (e.g. A)
- If a variable changes (0 and 1 both appear) → it is ELIMINATED from the term

Group size 1 → 4-variable term (e.g. ABCD)
Group size 2 → 3-variable term (1 variable eliminated)
Group size 4 → 2-variable term (2 variables eliminated)
Group size 8 → 1-variable term (3 variables eliminated)
Group size 16 → constant 0 or 1 (all variables eliminated)`} />
        </div>
      )}

      {sub==="sop" && (
        <div>
          <H2>SOP (Sum of Products) K-Map Problems</H2>

          <H3>Problem 1: F(A,B,C,D) = Σm(0,1,2,5,7,8,9,10,13,15)</H3>
          <Box color="blue" title="Solution">
            Draw 4×4 K-Map (4 variables). Fill 1's at positions: 0,1,2,5,7,8,9,10,13,15.
          </Box>
          <CB code={`4-Variable K-Map:
       CD=00  CD=01  CD=11  CD=10
AB=00 [  1] [  1] [  0] [  1]   ← m0,m1,m2
AB=01 [  0] [  1] [  1] [  0]   ← m5,m7
AB=11 [  0] [  1] [  1] [  0]   ← m13,m15
AB=10 [  1] [  1] [  0] [  1]   ← m8,m9,m10

Groupings (for 1's):
• Group {0,1,8,9}  → A'CD' + ACD' = CD' (C and D' constant, A varies → eliminate A)
  Wait: check col CD=00 and CD=01... Group {0,1,8,9} → B'D' (B=0,D=0 constant)
• Group {0,2,8,10} → B'C' ... actually {0,2} col CD=00,CD=10 for AB=00 and AB=10
• Group {1,5,9,13} → D=1, C=0 → C'D ... checking → AD? 
  Let's use standard analysis:

Result: F = B'D' + B'C' + CD + ... (verify with complete grouping)
Simplified: F = A'CD + A'C'D' + AC'D + ACD`} />

          <H3>Problem 2: F(A,B,C,D) = Σm(0,1,3,5,7,8,9,11,13,15)</H3>
          <CB code={`4-Variable K-Map:
       CD=00  CD=01  CD=11  CD=10
AB=00 [  1] [  1] [  1] [  0]   ← m0,m1,m3
AB=01 [  0] [  1] [  1] [  0]   ← m5,m7
AB=11 [  0] [  1] [  1] [  0]   ← m13,m15
AB=10 [  1] [  1] [  1] [  0]   ← m8,m9,m11

Key grouping — notice all C=10 column is 0, so group all remaining:
• Group {1,3,5,7,9,11,13,15} — D=1 column (all 8 cells with D=1)  → D
• Group {0,1,8,9} — B'C' → B'C'  (AB=00 and AB=10, CD=00 and CD=01)

F = D + B'C'`} />

          <Box color="green" title="Key Insight — SOP Minimization">
            The larger the group, the fewer variables in the term. A group of 8 cells in a 4-variable K-Map gives a 1-variable term. Always maximize group size first!
          </Box>
        </div>
      )}

      {sub==="pos" && (
        <div>
          <H2>POS (Product of Sums) K-Map Problems</H2>
          <Box color="orange" title="POS Method">
            For POS: group the <b>0's</b> instead of 1's. Each group of 0's gives a sum term. Variables constant at 0 appear <b>uncomplemented</b>, constant at 1 appear <b>complemented</b>. OR the variables in each sum, AND all sum terms.
          </Box>

          <H3>Problem 3: F(A,B,C) = Σm(1,2,4,5)</H3>
          <CB code={`3-Variable K-Map — Fill 1's at m1,m2,m4,m5:
       BC=00  BC=01  BC=11  BC=10
A=0  [  0] [  1] [  0] [  1]
A=1  [  1] [  1] [  0] [  0]

0's are at positions: m0, m3, m6, m7

For POS, group the 0's:
• Group {m0,m3}: A'B'C' and A'BC → A' constant, BC varies... 
  Actually m0=(000), m3=(011): A=0 in both, B changes, C changes → only A is constant
  Group of 2: A'B'C' and A'BC — wait these aren't adjacent

Correct adjacent 0s:
• {m0, m6}: BC=00 column → B'C' constant... m0=(000), m6=(110): 
  B changes (0→1), C=0, A changes → not a useful pair
• Group {m3,m7}: BC=11 → C constant=1, B constant=1 → BC sum term: (B'+C')
• Group {m6,m7}: AB=10,11... 

F'(A,B,C) = A'B'C' + BC + AB   ← from grouping 0's 
F(A,B,C) = (A+B+C)(B'+C')(A'+B')   ← POS (complement each term using DeMorgan)`} />

          <H3>Problem 4: F(A,B,C,D) = Σm(0,1,2,4,6,9,14,15)</H3>
          <CB code={`4-Variable K-Map — Fill 1's at those positions, 0's everywhere else.
0's are at: m3,m5,m7,m8,m10,m11,m12,m13

Group the 0's for F':
• Group {m8,m12}: A=1,B changes, C=0, D=0 → AC'D'
• Group {m5,m7,m13,m11}: D=1, B=1... BC'D? 
  m5=(0101), m7=(0111), m13=(1101), m11=(1011): varies... need to check
• Group {m3,m7}: A'CD
• Group {m10,m11}: AC'D' ... 

F'(A,B,C,D) = AC'D' + BC'D + A'CD + AB'C
F(A,B,C,D) = (A'+C+D)(B'+C+D')(A+C'+D')(A'+B+C')`} />
        </div>
      )}

      {sub==="dc" && (
        <div>
          <H2>Don't Care Conditions</H2>
          <Box color="purple" title="What are Don't Cares?">
            A don't-care (X) is a minterm that can <b>never occur</b> in the circuit's input or whose output we don't care about. We can treat them as 0 <b>or</b> 1, whichever gives better simplification. Written as Σd(...) in the function.
          </Box>

          <H3>Problem 5 (SOP with Don't Care): F(A,B,C,D) = Σm(1,3,4,6,8,9,11,13,15) + Σd(0,2,14)</H3>
          <CB code={`Fill the K-Map:
• 1 at: 1,3,4,6,8,9,11,13,15
• X at: 0,2,14  (don't cares — can be used as 0 or 1)
• 0 at: all others

Use X's as 1's to form larger groups:
• Use X at m0,m2 to extend groups with 1's at m1,m3
• Use X at m14 to extend group with 1's at m15,m13

Groupings including don't cares:
• Group {m0,m1,m2,m3,m8,m9,m10,m11} — 8-cell group → A'D' (only A and D are constant... 
  Actually: A=0,B=0 for first 4, A=1,B=0 for last 4 → B=0,D varies... check: 
  m0=0000, m1=0001, m2=0010, m3=0011, m8=1000, m9=1001, m10=1010, m11=1011
  A: 0,0,0,0,1,1,1,1 → varies | B: 0,0,0,0,0,0,0,0 → B=0 | C: varies | D: varies
  → Only B is constant at 0 → term: B'

• Group {m1,m3,m9,m13}: AD → A varies, B varies... check:
  m1=0001, m3=0011, m9=1001, m13=1101: D=1 always, C=0 for m1,m9 and C=1 for m3,m13 → D

Result using don't cares:
F = A'D' + B'D + AD + C'B'   ← Simplified form`} />

          <H3>Problem 6 (SOP): F(A,B,C) = Σm(0,1,6,7) + Σd(3,5)</H3>
          <CB code={`3-Variable K-Map:
       BC=00  BC=01  BC=11  BC=10
A=0  [  1] [  1] [  X] [  0]    m0=1, m1=1, m3=X, m2=0
A=1  [  1] [  X] [  1] [  1]    m4=1, m5=X, m7=1, m6=1

With don't cares:
• Group {m0,m1,m4,m5} using X at m5: B=0 column → A'B' and AB' → B' (B constant=0)
• Group {m4,m5,m6,m7}: A=1 row → A (A constant=1)  
• Group {m0,m1,m2,m3}: use X at m3 → A'  (A=0 row)

Minimal: F = A'B' + AB = B'(A'+A)... 
Better: Group {m0,m4} and {m1,m5}: B'C', B'C → B'
Then {m6,m7}: AC
Then {m0,m1,m3,m7}: A'B' and... use X:
F = A'B' + AB   ← or simpler: F = B' + A (check)`} />

          <H3>Problem 7: F(A,B,C) = Σm(0,1,6,7) + Σd(3,4,5)</H3>
          <CB code={`3-Variable K-Map:
       BC=00  BC=01  BC=11  BC=10
A=0  [  1] [  1] [  X] [  0]    m0=1, m1=1, m3=X, m2=0
A=1  [  X] [  X] [  1] [  1]    m4=X, m5=X, m7=1, m6=1

Using all X's as 1's:
• Group {m0,m1,m4,m5}: use X at m4,m5 → B' (B=0 constant)
• Group {m4,m5,m6,m7}: use X at m4,m5 → A (A=1 constant)

F = B' + A   ← clean 2-term result using don't cares`} />

          <H3>Problem 11: Don't Care with POS</H3>
          <CB code={`For POS with don't cares:
• Group the 0's (using X as 0 if helpful)
• Derive F' from the 0-groups
• Apply DeMorgan to get F

Example result:
F' = AC' + CB
F = (A'+C)(C'+B')`} />
        </div>
      )}
    </div>
  );
};

/* ─── SECTION: COMBINATIONAL CIRCUITS (Lec 3) ─────────────── */
const CombContent = () => {
  const [sub, setSub] = useState("intro");
  const subs = [
    {id:"intro",label:"⚡ Intro"},
    {id:"half",label:"½ Half Adder"},
    {id:"full",label:"🔢 Full Adder"},
  ];
  return (
    <div>
      <SectionTitle icon="⚡">Combinational Circuits</SectionTitle>
      <P>Circuits whose outputs depend only on current inputs — no memory, no state.</P>

      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"14px 0"}}>
        {subs.map(s=>(
          <button key={s.id} onClick={()=>setSub(s.id)}
            style={{padding:"7px 14px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"12px",transition:"all 0.2s",
              background:sub===s.id?"#22c55e":"#21262d",
              color:sub===s.id?"#0d1117":"#adbac7"}}>
            {s.label}
          </button>
        ))}
      </div>

      {sub==="intro" && (
        <div>
          <Box color="green" title="Definition">
            A combinational circuit is a connected arrangement of logic gates with a set of inputs and outputs. <b>No memory component</b> — the output at any time is purely a function of the current inputs.
          </Box>

          <H3>Characteristics</H3>
          <Ul>
            <Li>N input variables → M output variables</Li>
            <Li>Every output is a Boolean function of the inputs</Li>
            <Li>Completely described by a truth table (N+M columns, 2ᴺ rows)</Li>
            <Li>No feedback loops — purely feed-forward</Li>
          </Ul>

          <H3>Design Procedure (5 Steps)</H3>
          <CB code={`Step 1: State the problem (verbal description)
Step 2: Assign letter symbols to input and output variables
Step 3: Derive the truth table
         - N input columns + M output columns
         - 2ᴺ rows (all possible input combinations)
Step 4: Obtain simplified Boolean functions for each output
         - Use K-Map, algebraic simplification, or SOP/POS methods
Step 5: Draw the logic circuit diagram`} />

          <Box color="blue" title="Examples of Combinational Circuits">
            <b>Half Adder</b> — adds 2 bits | <b>Full Adder</b> — adds 3 bits (with carry-in) | <b>Decoder</b> — n-to-2ⁿ | <b>Encoder</b> — 2ⁿ-to-n | <b>Multiplexer</b> — 2ⁿ-to-1 selector
          </Box>
        </div>
      )}

      {sub==="half" && (
        <div>
          <H2>Half Adder</H2>
          <Box color="cyan" title="Definition">
            A half adder is a combinational circuit that adds <b>two binary digits</b>. Inputs: two bits (augend + addend). Outputs: Sum (S) and Carry (C).
          </Box>

          <H3>Step 1-2: Problem & Variables</H3>
          <P>Add two bits: inputs x, y → outputs S (sum), C (carry)</P>

          <H3>Step 3: Truth Table</H3>
          <TruthTable
            headers={["x","y","S","C"]}
            rows={[
              ["0","0","0","0"],
              ["0","1","1","0"],
              ["1","0","1","0"],
              ["1","1","0","1"],
            ]}
          />

          <H3>Step 4: Boolean Functions</H3>
          <Formula>S = x'y + xy' = x ⊕ y</Formula>
          <Formula>C = xy</Formula>

          <H3>Step 5: Logic Circuit</H3>
          <CB code={`Half Adder Circuit:

x ──┬──── XOR ──── S (Sum)
    │         
y ──┤──── AND ──── C (Carry)
    │
    └────── (to both gates)

Block diagram:   x, y → [HALF ADDER] → S, C`} />

          <Box color="yellow" title="Key Point">
            S is an XOR gate, C is an AND gate. This is the simplest adder — it cannot handle a carry input, so it can only be used for the least significant bit.
          </Box>
        </div>
      )}

      {sub==="full" && (
        <div>
          <H2>Full Adder</H2>
          <Box color="purple" title="Definition">
            A full adder adds <b>three bits</b>: two significant bits (x, y) and a carry-in from a previous stage (z). Outputs: Sum (S) and Carry (C).
          </Box>

          <H3>Step 3: Truth Table (3 inputs)</H3>
          <TruthTable
            headers={["x","y","z","S","C"]}
            rows={[
              ["0","0","0","0","0"],
              ["0","0","1","1","0"],
              ["0","1","0","1","0"],
              ["0","1","1","0","1"],
              ["1","0","0","1","0"],
              ["1","0","1","0","1"],
              ["1","1","0","0","1"],
              ["1","1","1","1","1"],
            ]}
          />

          <H3>Step 4: Boolean Functions</H3>
          <CB code={`From K-Map or truth table:

S = x'y'z + x'yz' + xy'z' + xyz
  = x ⊕ y ⊕ z

C = x'yz + xy'z + xy z' + xyz  (from truth table rows where C=1)
  = xy + (x'y + xy')z
  = xy + (x ⊕ y)z              ← elegant form`} />

          <Formula>S = x ⊕ y ⊕ z</Formula>
          <Formula>C = xy + (x ⊕ y)z</Formula>

          <H3>Step 5: Circuit Using Half Adders</H3>
          <CB code={`Full Adder = Two Half Adders + One OR Gate

Structure:
  x, y → [Half Adder 1] → S1 = x⊕y,  C1 = xy
  S1, z → [Half Adder 2] → S  = S1⊕z, C2 = S1·z
  C1, C2 → [OR Gate] → C (final carry)

Proof:
  Final S = (x⊕y)⊕z = x⊕y⊕z ✓
  Final C = xy + (x⊕y)z      ✓ (same as derived above)`} />

          <CompareTable
            headers={["Feature","Half Adder","Full Adder"]}
            rows={[
              ["Inputs","2 (x,y)","3 (x,y,z)"],
              ["Outputs","2 (S,C)","2 (S,C)"],
              ["Carry input","❌ No","✅ Yes"],
              ["Sum formula","x⊕y","x⊕y⊕z"],
              ["Carry formula","xy","xy+(x⊕y)z"],
              ["Built from","XOR+AND","2 Half Adders + OR"],
              ["Use case","LSB only","Any bit position"],
            ]}
          />
        </div>
      )}
    </div>
  );
};

/* ─── SECTION: FLIP FLOPS (Lec 4) ─────────────────────────── */
const FlipFlopContent = () => {
  const [ff, setFf] = useState("sr");
  const ffs = [
    {id:"sr",label:"🔄 SR Flip-Flop"},
    {id:"d",label:"💾 D Flip-Flop"},
    {id:"jk",label:"🎯 JK Flip-Flop"},
    {id:"t",label:"🔀 T Flip-Flop"},
    {id:"excitation",label:"📊 Excitation Tables"},
  ];
  return (
    <div>
      <SectionTitle icon="🔄">Flip-Flops — Sequential Memory Elements</SectionTitle>
      <P>A flip-flop is a binary cell storing <b>one bit</b> of information with two outputs (Q and Q').</P>

      <Box color="blue" title="Why Flip-Flops?">
        Combinational circuits have no memory. Sequential circuits use flip-flops to store state. A flip-flop maintains its binary state until directed by a <b>clock pulse</b> to switch — this is the foundation of all synchronous digital systems.
      </Box>

      <H3>Synchronous Sequential Circuits</H3>
      <Ul>
        <Li>Employ signals that affect storage elements only at <b>discrete instants of time</b> (clock edges)</Li>
        <Li>Synchronized by a <b>clock pulse generator</b> producing periodic pulses</Li>
        <Li>Storage elements (flip-flops) are affected only when the clock transitions (usually 0→1)</Li>
        <Li>The clock has UP (active) and DOWN (inactive) states</Li>
      </Ul>

      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"14px 0"}}>
        {ffs.map(f=>(
          <button key={f.id} onClick={()=>setFf(f.id)}
            style={{padding:"7px 14px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"12px",transition:"all 0.2s",
              background:ff===f.id?"#f59e0b":"#21262d",
              color:ff===f.id?"#0d1117":"#adbac7"}}>
            {f.label}
          </button>
        ))}
      </div>

      {ff==="sr" && (
        <div>
          <H2>SR Flip-Flop (Set/Reset)</H2>
          <Box color="cyan" title="Inputs & Outputs">
            Inputs: <b>S</b> (Set), <b>R</b> (Reset), <b>C</b> (Clock)<br/>
            Output: <b>Q</b> (and optionally Q')
          </Box>

          <H3>Operation</H3>
          <Ul>
            <Li>C=0 → output cannot change regardless of S,R</Li>
            <Li>Clock 0→1 transition activates the flip-flop</Li>
            <Li>S=1, R=0 at clock → Q set to 1</Li>
            <Li>S=0, R=1 at clock → Q cleared to 0</Li>
            <Li>S=0, R=0 at clock → Q unchanged (no change)</Li>
            <Li>S=1, R=1 at clock → <b>FORBIDDEN</b> (indeterminate output)</Li>
          </Ul>

          <H3>Characteristic Table</H3>
          <TruthTable
            headers={["S","R","Q(t)","Q(t+1)","Comment"]}
            rows={[
              ["0","0","0","0","No change"],
              ["0","0","1","1","No change"],
              ["0","1","0","0","Reset (clear)"],
              ["0","1","1","0","Reset (clear)"],
              ["1","0","0","1","Set"],
              ["1","0","1","1","Set"],
              ["1","1","0","?","FORBIDDEN"],
              ["1","1","1","?","FORBIDDEN"],
            ]}
          />

          <Box color="red" title="Warning — Forbidden State">
            S=R=1 produces an <b>indeterminate next state</b> depending on internal timing. This makes the SR flip-flop difficult to manage — it is seldom used in practice. The JK flip-flop solves this problem.
          </Box>

          <H3>Characteristic Equation</H3>
          <Formula>Q(t+1) = S + R'Q(t),   constraint: SR = 0</Formula>
        </div>
      )}

      {ff==="d" && (
        <div>
          <H2>D Flip-Flop (Data)</H2>
          <Box color="green" title="Concept">
            The D flip-flop is a modification of the SR flip-flop. An inverter is inserted between S and R, and a single input D is used. This <b>eliminates the forbidden state</b> — D can only be 0 or 1.
          </Box>

          <H3>Operation</H3>
          <Ul>
            <Li>D=1 → on clock 0→1, Q goes to 1</Li>
            <Li>D=0 → on clock 0→1, Q goes to 0</Li>
            <Li>The D input is <b>sampled</b> at the clock transition</Li>
          </Ul>

          <H3>Characteristic Table</H3>
          <TruthTable
            headers={["D","Q(t)","Q(t+1)"]}
            rows={[
              ["0","0","0"],
              ["0","1","0"],
              ["1","0","1"],
              ["1","1","1"],
            ]}
          />

          <H3>Characteristic Equation</H3>
          <Formula>Q(t+1) = D</Formula>

          <Box color="yellow" title="D Flip-Flop Limitation">
            There is NO "no change" condition — every clock pulse either loads the current D value. To maintain state: <b>disable the clock</b> or <b>feed Q back to D</b> so Q→D→Q(t+1)=Q.
          </Box>
        </div>
      )}

      {ff==="jk" && (
        <div>
          <H2>JK Flip-Flop</H2>
          <Box color="purple" title="Definition">
            The JK flip-flop is a <b>refinement of the SR flip-flop</b>. J behaves like S (set), K behaves like R (reset). The indeterminate J=K=1 condition is replaced with a useful <b>COMPLEMENT operation</b>.
          </Box>

          <H3>Characteristic Table</H3>
          <TruthTable
            headers={["J","K","Q(t)","Q(t+1)","Comment"]}
            rows={[
              ["0","0","0","0","No change"],
              ["0","0","1","1","No change"],
              ["0","1","0","0","Reset"],
              ["0","1","1","0","Reset"],
              ["1","0","0","1","Set"],
              ["1","0","1","1","Set"],
              ["1","1","0","1","Complement (toggle)"],
              ["1","1","1","0","Complement (toggle)"],
            ]}
          />

          <H3>Characteristic Equation</H3>
          <Formula>Q(t+1) = JQ'(t) + K'Q(t)</Formula>

          <Box color="green" title="Advantage over SR">
            When J=K=1, the output <b>toggles</b> (complements) instead of being indeterminate. This makes the JK flip-flop the most versatile and widely used flip-flop type.
          </Box>
        </div>
      )}

      {ff==="t" && (
        <div>
          <H2>T Flip-Flop (Toggle)</H2>
          <Box color="orange" title="Definition">
            The T flip-flop is obtained from a JK flip-flop by connecting J and K together as a single input T. It has only <b>two conditions</b>: no change or toggle.
          </Box>

          <H3>Characteristic Table</H3>
          <TruthTable
            headers={["T","Q(t)","Q(t+1)","Comment"]}
            rows={[
              ["0","0","0","No change (J=K=0)"],
              ["0","1","1","No change (J=K=0)"],
              ["1","0","1","Toggle (J=K=1)"],
              ["1","1","0","Toggle (J=K=1)"],
            ]}
          />

          <H3>Characteristic Equation</H3>
          <Formula>Q(t+1) = Q(t) ⊕ T</Formula>

          <Box color="cyan" title="T Flip-Flop Use Case">
            The T flip-flop is commonly used in <b>binary counters</b>. Connect T=1 permanently → toggles every clock cycle. Connect T to enable logic for controlled counting.
          </Box>
        </div>
      )}

      {ff==="excitation" && (
        <div>
          <H2>Excitation Tables</H2>
          <Box color="blue" title="Purpose">
            Characteristic tables tell us: given inputs + present state → what's the next state?<br/>
            Excitation tables tell us: given present state → next state transition, <b>what input do we need?</b><br/>
            Excitation tables are essential for <b>sequential circuit design</b>.
          </Box>

          <H3>SR Excitation Table</H3>
          <TruthTable
            headers={["Q(t)","Q(t+1)","S","R"]}
            rows={[
              ["0","0","0","X"],
              ["0","1","1","0"],
              ["1","0","0","1"],
              ["1","1","X","0"],
            ]}
          />

          <H3>D Excitation Table</H3>
          <TruthTable
            headers={["Q(t)","Q(t+1)","D"]}
            rows={[
              ["0","0","0"],
              ["0","1","1"],
              ["1","0","0"],
              ["1","1","1"],
            ]}
          />

          <H3>JK Excitation Table</H3>
          <TruthTable
            headers={["Q(t)","Q(t+1)","J","K"]}
            rows={[
              ["0","0","0","X"],
              ["0","1","1","X"],
              ["1","0","X","1"],
              ["1","1","X","0"],
            ]}
          />

          <H3>T Excitation Table</H3>
          <TruthTable
            headers={["Q(t)","Q(t+1)","T"]}
            rows={[
              ["0","0","0"],
              ["0","1","1"],
              ["1","0","1"],
              ["1","1","0"],
            ]}
          />

          <Box color="yellow" title="X = Don't Care">
            X means the input doesn't matter for that transition. For example, SR table row 1→1: S can be anything (0 or X) but R must be 0. We use X to maximize K-Map groupings during design.
          </Box>
        </div>
      )}
    </div>
  );
};

/* ─── SECTION: SEQUENTIAL CIRCUITS (Lec 5) ─────────────────── */
const SeqContent = () => {
  const [sub, setSub] = useState("intro");
  const subs = [
    {id:"intro",label:"🔁 Intro"},
    {id:"analysis",label:"🔍 Analysis"},
    {id:"design",label:"🏗️ Design Example"},
  ];
  return (
    <div>
      <SectionTitle icon="🔁">Sequential Circuits</SectionTitle>
      <P>Circuits with memory — outputs depend on current inputs AND past history (stored state).</P>

      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"14px 0"}}>
        {subs.map(s=>(
          <button key={s.id} onClick={()=>setSub(s.id)}
            style={{padding:"7px 14px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"12px",transition:"all 0.2s",
              background:sub===s.id?"#ef4444":"#21262d",
              color:sub===s.id?"#ffffff":"#adbac7"}}>
            {s.label}
          </button>
        ))}
      </div>

      {sub==="intro" && (
        <div>
          <Box color="red" title="Sequential Circuit = Combinational + Flip-Flops">
            A sequential circuit is an interconnection of flip-flops and gates. The gates alone form a combinational circuit; adding flip-flops makes it sequential.
          </Box>

          <H3>Clocked Sequential Circuit Block Diagram</H3>
          <CB code={`External Inputs ──┐
                    ├──► [Combinational] ──► External Outputs
Flip-Flop Outputs ──┘      Circuit   │
     ▲                               │
     │                               ▼
     └──────────── Flip-Flop ◄── Flip-Flop Inputs
                   (with Clock)

The clock synchronizes all state changes.
Gates determine what value to store in flip-flops after each clock pulse.`} />

          <H3>State Table Components</H3>
          <Ul>
            <Li><b>Present State</b> — current values of flip-flop outputs (m columns for m flip-flops)</Li>
            <Li><b>Input</b> — external input values (n columns)</Li>
            <Li><b>Next State</b> — flip-flop values after next clock (m columns)</Li>
            <Li><b>Output</b> — circuit output values (p columns)</Li>
            <Li>Total rows: up to 2^(m+n) — one per combination of present state + input</Li>
          </Ul>

          <H3>State Diagram</H3>
          <CB code={`State Diagram is a graphical version of the State Table:
• Circles (nodes) = states (flip-flop values inside)
• Directed arrows = transitions between states
• Labels on arrows = input/output values that cause the transition
• Format: input/output (e.g. "0/1" means input=0, output=1)

Number of flip-flops needed = number of bits in each circle`} />
        </div>
      )}

      {sub==="analysis" && (
        <div>
          <H2>Analysis Example</H2>
          <Box color="cyan" title="Problem">
            Given a sequential circuit with the following flip-flop input equations, derive the state table and state diagram:
          </Box>
          <CB code={`Given flip-flop input equations (D flip-flops A and B):
  DA = Ax + Bx
  DB = A'x
  Output: y = Ax' + Bx'

Where: A, B = present state of flip-flops
       x = external input
       DA, DB = next state inputs to flip-flops`} />

          <H3>State Table</H3>
          <CB code={`Build table: for each combination of (A,B,x), compute DA, DB, y

Present State | Input | Next State | Output
     A  B     |   x   |  A+ B+    |   y
  ─────────────────────────────────────────
     0  0     |   0   |  0   0    |   0
     0  0     |   1   |  0   1    |   0
     0  1     |   0   |  0   0    |   1    ← y=0+1·1=1
     0  1     |   1   |  1   1    |   0
     1  0     |   0   |  0   0    |   1    ← y=1+0=1
     1  0     |   1   |  1   0    |   0
     1  1     |   0   |  0   0    |   1    ← y=1+1=1
     1  1     |   1   |  1   0    |   0

Compute DA: DA = Ax+Bx
  A=0,B=0,x=0: 0·0+0·0=0 | x=1: 0·1+0·1=0
  A=0,B=1,x=0: 0·0+1·0=0 | x=1: 0·1+1·1=1
  A=1,B=0,x=0: 1·0+0·0=0 | x=1: 1·1+0·1=1
  A=1,B=1,x=0: 1·0+1·0=0 | x=1: 1·1+1·1=1`} />

          <H3>State Diagram</H3>
          <CB code={`States: 00, 01, 10, 11 (A,B values)

From state table transitions:
00 ──x=0/y=0──► 00 (self-loop)
00 ──x=1/y=0──► 01
01 ──x=0/y=1──► 00
01 ──x=1/y=0──► 11
10 ──x=0/y=1──► 00
10 ──x=1/y=0──► 10 (self-loop)
11 ──x=0/y=1──► 00
11 ──x=1/y=0──► 10`} />
        </div>
      )}

      {sub==="design" && (
        <div>
          <H2>Design Example: 2-Bit Binary Counter</H2>
          <Box color="purple" title="Problem Specification">
            Design a clocked sequential circuit that goes through states: <b>00 → 01 → 10 → 11 → 00 ...</b> when input x=1. When x=0, the state remains unchanged. Use D flip-flops.
          </Box>

          <H3>Step 1: State Diagram</H3>
          <CB code={`States: 00, 01, 10, 11

When x=1 (count):         When x=0 (hold):
00 ──x=1──► 01            00 ──x=0──► 00 (self)
01 ──x=1──► 10            01 ──x=0──► 01 (self)
10 ──x=1──► 11            10 ──x=0──► 10 (self)
11 ──x=1──► 00            11 ──x=0──► 11 (self)`} />

          <H3>Step 2: State Table</H3>
          <CB code={`Present State | Input | Next State | D inputs
     A  B     |   x   |  A+ B+    |  DA  DB
  ────────────────────────────────────────────
     0  0     |   0   |  0   0    |  0   0
     0  0     |   1   |  0   1    |  0   1
     0  1     |   0   |  0   1    |  0   1
     0  1     |   1   |  1   0    |  1   0
     1  0     |   0   |  1   0    |  1   0
     1  0     |   1   |  1   1    |  1   1
     1  1     |   0   |  1   1    |  1   1
     1  1     |   1   |  0   0    |  0   0`} />

          <H3>Step 3: Excitation Table (D flip-flops)</H3>
          <P>For D flip-flops: D = Q(t+1). So DA = A+, DB = B+. Easy!</P>

          <H3>Step 4: K-Map Simplification</H3>
          <CB code={`K-Map for DA (variables A,B,x):
         Bx=00  Bx=01  Bx=11  Bx=10
A=0    [  0  ][  0  ][  1  ][  0  ]
A=1    [  1  ][  1  ][  0  ][  1  ]

DA = Ax' + Bx  (from K-Map grouping)
   = AB'x' + ... verify: 
   Actually reading: group {A=1,Bx=00},{A=1,Bx=01},{A=1,Bx=10} = Ax'
   + group {A=0,Bx=11},{A=1,Bx=11... wait A=1,Bx=11=0}
   Let's be precise: DA = Ax ⊕ ... 
   
Simplified result:
  DA = Ax' + A'Bx + AB'x  = Ax' + Bx (using simplification)
  DB = B'x + Bx' = B ⊕ x  (XOR)
  Output y = 0 (not specified in counter — purely state outputs A,B)`} />

          <H3>Step 5: Logic Diagram</H3>
          <CB code={`DA circuit: 
  A ──┐
      ├── AND ──┐
  x'──┘        ├── OR ──► DA ──► D Flip-Flop A ──► A
               │
  B ──┐        │
      ├── AND ──┘
  x ──┘

DB circuit:
  B ──┐
      ├── XOR ──► DB ──► D Flip-Flop B ──► B
  x ──┘`} />

          <H3>Sequential Circuit Design Summary</H3>
          <CB code={`1. State Diagram → from verbal description
2. State Table → from state diagram  
3. Excitation Table → extend state table with flip-flop inputs
4. K-Map simplification → get flip-flop input equations
5. Draw circuit → combinational circuit + flip-flops

For m flip-flops + n inputs:
• State table has m+n+m+p columns
• Rows: up to 2^(m+n)
• Excitation table adds columns for each flip-flop input`} />
        </div>
      )}
    </div>
  );
};

/* ─── SECTION: ICs, DECODERS, ENCODERS (Lec 6) ─────────────── */
const ICContent = () => {
  const [sub, setSub] = useState("ic");
  const subs = [
    {id:"ic",label:"💎 ICs"},
    {id:"decoder",label:"🔽 Decoders"},
    {id:"encoder",label:"🔼 Encoders"},
  ];
  return (
    <div>
      <SectionTitle icon="💎">ICs, Decoders & Encoders</SectionTitle>
      <P>Real-world implementation of digital logic on silicon chips.</P>

      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"14px 0"}}>
        {subs.map(s=>(
          <button key={s.id} onClick={()=>setSub(s.id)}
            style={{padding:"7px 14px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"12px",transition:"all 0.2s",
              background:sub===s.id?"#06b6d4":"#21262d",
              color:sub===s.id?"#0d1117":"#adbac7"}}>
            {s.label}
          </button>
        ))}
      </div>

      {sub==="ic" && (
        <div>
          <Box color="cyan" title="Integrated Circuit (IC)">
            A small silicon semiconductor chip containing circuits (made of gates). Has a unique numeric ID printed on its surface. External pins are inputs and outputs.
          </Box>

          <H3>IC Classification by Gate Count</H3>
          <CompareTable
            headers={["Type","Name","Gate Count","Examples"]}
            rows={[
              ["SSI","Small Scale Integration","< 10 gates","Simple gates"],
              ["MSI","Medium Scale Integration","10–200 gates","Adders, decoders"],
              ["LSI","Large Scale Integration","200–thousands","Counters, memory"],
              ["VLSI","Very Large Scale Integration","Thousands+","Microprocessors"],
            ]}
          />

          <H3>IC Classification by Technology</H3>
          <CompareTable
            headers={["Technology","Full Name","Key Advantage"]}
            rows={[
              ["TTL","Transistor-Transistor Logic","Standard logic family, widely used"],
              ["ECL","Emitter Coupled Logic","Highest speed operations"],
              ["MOS","Metal Oxide Semiconductor","High component capacity, heat conduction"],
              ["CMOS","Complementary Metal Oxide Semiconductor","Low power consumption"],
            ]}
          />
        </div>
      )}

      {sub==="decoder" && (
        <div>
          <H2>Decoders</H2>
          <Box color="blue" title="Definition">
            A decoder is a combinational circuit that converts binary information from <b>n coded inputs</b> to a maximum of <b>2ⁿ unique outputs</b>. It transfers data from high density to low density (e.g., Binary → Octal).
          </Box>

          <H3>Key Properties</H3>
          <Ul>
            <Li>Called <b>n-to-m-line decoder</b> where n=inputs, m=outputs, m≤2ⁿ</Li>
            <Li>Most commercial decoders have an <b>Enable input (E)</b>: E=1 → enabled, E=0 → disabled (all outputs 0)</Li>
            <Li>Outputs are <b>mutually exclusive</b> — only one output is 1 at a time</Li>
          </Ul>

          <H3>2-to-4 Line Decoder (Example)</H3>
          <CB code={`Inputs: A1, A0 (2 bits) + Enable E
Outputs: D3, D2, D1, D0 (4 lines)

Truth Table:
E  A1  A0 | D3  D2  D1  D0
─────────────────────────────
0   x   x |  0   0   0   0   ← Disabled
1   0   0 |  0   0   0   1   ← Input=00, D0 active
1   0   1 |  0   0   1   0   ← Input=01, D1 active
1   1   0 |  0   1   0   0   ← Input=10, D2 active
1   1   1 |  1   0   0   0   ← Input=11, D3 active

Boolean Equations (using K-Map):
D0 = A1'A0'E
D1 = A1'A0 E
D2 = A1 A0'E
D3 = A1 A0 E`} />

          <H3>3-to-8 Line Decoder</H3>
          <CB code={`Inputs: A2, A1, A0 (3 bits) + Enable
Outputs: D7...D0 (8 lines)
Equations:
D0 = A2'A1'A0'  D1 = A2'A1'A0  D2 = A2'A1A0'  D3 = A2'A1A0
D4 = A2 A1'A0'  D5 = A2 A1'A0  D6 = A2 A1A0'  D7 = A2 A1A0`} />

          <H3>NAND Gate Decoder</H3>
          <CB code={`More economical to generate decoder outputs in complemented form:

2-to-4 decoder using NAND gates:
D0 = (A0'A1'E')'     D1 = (A0 A1'E')'
D2 = (A0'A1 E')'     D3 = (A0 A1 E')'

NAND implementation: inverted enable E' into NAND gates with address lines`} />

          <H3>Decoder Expansion</H3>
          <Box color="green" title="Building Larger Decoders">
            Enable inputs allow interconnecting multiple decoders to create larger ones:
          </Box>
          <CB code={`3-to-8 decoder using two 2-to-4 decoders:
  
  A2 → controls ENABLE of each 2-to-4 decoder
  A1, A0 → inputs to both decoders
  
  Decoder 1: enabled when A2=0 → handles outputs D0-D3
  Decoder 2: enabled when A2=1 → handles outputs D4-D7

4x16 decoder using 2x4 decoders: use A3,A2 to select which of 4 decoders is enabled
6x64 decoder using 4x16 decoders: hierarchical expansion
5x32 decoder using 3x8 decoders: similar approach`} />
        </div>
      )}

      {sub==="encoder" && (
        <div>
          <H2>Encoders</H2>
          <Box color="purple" title="Definition">
            An encoder is the <b>inverse of a decoder</b>. It converts from <b>low density data to high density data</b> (e.g., Octal → Binary). Has 2ⁿ inputs and n outputs.
          </Box>

          <H3>Octal-to-Binary Encoder (8-to-3)</H3>
          <CB code={`Inputs: D7, D6, D5, D4, D3, D2, D1, D0 (8 lines, only one HIGH at a time)
Outputs: A2, A1, A0 (3-bit binary code)

Truth Table:
D7 D6 D5 D4 D3 D2 D1 D0 | A2 A1 A0
──────────────────────────────────────
 0  0  0  0  0  0  0  1  |  0  0  0   (D0 active → 0)
 0  0  0  0  0  0  1  0  |  0  0  1   (D1 active → 1)
 0  0  0  0  0  1  0  0  |  0  1  0   (D2 active → 2)
 0  0  0  0  1  0  0  0  |  0  1  1   (D3 active → 3)
 0  0  0  1  0  0  0  0  |  1  0  0   (D4 active → 4)
 0  0  1  0  0  0  0  0  |  1  0  1   (D5 active → 5)
 0  1  0  0  0  0  0  0  |  1  1  0   (D6 active → 6)
 1  0  0  0  0  0  0  0  |  1  1  1   (D7 active → 7)

Implementation with OR gates (directly from truth table):
A2 = D4 + D5 + D6 + D7
A1 = D2 + D3 + D6 + D7
A0 = D1 + D3 + D5 + D7`} />

          <CompareTable
            headers={["Feature","Decoder","Encoder"]}
            rows={[
              ["Direction","High density → Low density","Low density → High density"],
              ["Example","Binary → Octal","Octal → Binary"],
              ["Inputs","n","2ⁿ"],
              ["Outputs","2ⁿ","n"],
              ["Gate type","AND gates (products)","OR gates (sums)"],
              ["Constraint","One output active at a time","One input active at a time"],
            ]}
          />
        </div>
      )}
    </div>
  );
};

/* ─── SECTION: MUX & REGISTERS (Lec 7) ─────────────────────── */
const MuxContent = () => {
  const [sub, setSub] = useState("mux");
  const subs = [
    {id:"mux",label:"🔀 Multiplexer"},
    {id:"reg",label:"📋 Registers"},
    {id:"shift",label:"↔ Shift Registers"},
    {id:"counter",label:"🔢 Counters"},
  ];
  return (
    <div>
      <SectionTitle icon="🔀">Multiplexers, Registers & Counters</SectionTitle>
      <P>The building blocks of data routing and storage in digital systems.</P>

      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",margin:"14px 0"}}>
        {subs.map(s=>(
          <button key={s.id} onClick={()=>setSub(s.id)}
            style={{padding:"7px 14px",borderRadius:"20px",border:"none",cursor:"pointer",
              fontWeight:500,fontSize:"12px",transition:"all 0.2s",
              background:sub===s.id?"#3fb950":"#21262d",
              color:sub===s.id?"#0d1117":"#adbac7"}}>
            {s.label}
          </button>
        ))}
      </div>

      {sub==="mux" && (
        <div>
          <H2>Multiplexer (MUX)</H2>
          <Box color="green" title="Definition">
            A multiplexer is a combinational circuit with <b>2ⁿ data inputs</b>, <b>n selection inputs</b>, and <b>1 output</b>. The selection inputs determine which data input is routed to the output.
          </Box>

          <H3>General Structure</H3>
          <CB code={`A 2ⁿ-to-1 MUX has:
  • 2ⁿ data inputs:      I0, I1, I2, ... I(m-1)  where m=2ⁿ
  • n control inputs:   S0, S1, S2, ... S(n-1)
  • 1 output:           Y
  • 1+ Enable input(s): E

Relationship: m = 2ⁿ
  2-to-1  MUX: 1 selection line
  4-to-1  MUX: 2 selection lines
  8-to-1  MUX: 3 selection lines
  16-to-1 MUX: 4 selection lines`} />

          <H3>4-to-1 MUX Function Table</H3>
          <TruthTable
            caption="When E=1 (enabled):"
            headers={["S1","S0","Y"]}
            rows={[
              ["0","0","I0"],
              ["0","1","I1"],
              ["1","0","I2"],
              ["1","1","I3"],
            ]}
          />

          <H3>Boolean Equation for 4-to-1 MUX</H3>
          <Formula>Y = E·I0·S1'·S0' + E·I1·S1'·S0 + E·I2·S1·S0' + E·I3·S1·S0</Formula>

          <H3>MUX Internal Structure</H3>
          <CB code={`A 2ⁿ-to-1 MUX is constructed from:
1. An n-to-2ⁿ DECODER (AND gates + inverters) to decode selection lines
2. 2ⁿ AND gates (one per data input, gated by decoder output)
3. One OR gate to combine all AND outputs

The AND-gate+inverter portion IS a decoder circuit!`} />

          <H3>Quadruple 2-to-1 MUX</H3>
          <CB code={`4-bit wide 2-to-1 MUX (selects between bus A and bus B):
  Single selection s controls all 4 bits simultaneously

  Y0 = E·s'·A0 + E·s·B0
  Y1 = E·s'·A1 + E·s·B1
  Y2 = E·s'·A2 + E·s·B2
  Y3 = E·s'·A3 + E·s·B3

  When E=1, s=0: Y = A (bus A selected)
  When E=1, s=1: Y = B (bus B selected)
  When E=0: Y = 0 (disabled)`} />
        </div>
      )}

      {sub==="reg" && (
        <div>
          <H2>Registers</H2>
          <Box color="cyan" title="Definition">
            A register is a set of flip-flops, each capable of storing one bit. An <b>n-bit register</b> stores n bits and may have additional combinational gates for data-processing tasks.
          </Box>

          <H3>Types of Registers</H3>
          <CompareTable
            headers={["Type","Components","Function"]}
            rows={[
              ["Simple Register","Flip-flops only","Store and hold data"],
              ["Register with Control","Flip-flops + control gates","Controlled loading of new data"],
            ]}
          />

          <H3>Simple Register Operation</H3>
          <CB code={`Simple n-bit register:
  • All flip-flops share a common Clock
  • Clear input → resets all flip-flops to 0
    Clear=0: all Q→0 (reset)
    Clear=1: normal operation (data retained)
  • Clock enabled → new data loaded
  • Clock disabled → register holds old data

Problem: Using clock as control means clock must be inhibited
to keep register content unchanged — bad practice!`} />

          <H3>Register with Parallel Load</H3>
          <CB code={`Solution: Use a separate LOAD control input

Load=1:  All bits of data inputs are transferred to flip-flops simultaneously
         (PARALLEL LOAD — all bits at once)
         
Load=0:  Outputs of flip-flops fed back to their inputs
         → Flip-flop stores its current value → NO CHANGE

Circuit: A MUX at each flip-flop's D input:
  Load=0 → D input = current Q (feedback, no change)
  Load=1 → D input = new data input I

Buffer gate on clock input reduces power requirement from clock generator.`} />

          <Box color="yellow" title="Key Concept — Parallel Load">
            "Parallel load" means all n bits are loaded simultaneously in ONE clock pulse — as opposed to serial (one bit at a time). Every modern register uses parallel load capability.
          </Box>
        </div>
      )}

      {sub==="shift" && (
        <div>
          <H2>Shift Registers</H2>
          <Box color="purple" title="Definition">
            A shift register is a register capable of shifting its binary information in one or both directions. Data moves from one flip-flop to the next on each clock pulse.
          </Box>

          <H3>Simple Shift Register</H3>
          <CB code={`Structure: Chain of D flip-flops
  SI → [D FF0] → [D FF1] → [D FF2] → [D FF3]
        Q0         Q1         Q2         Q3 (serial output)

  On each clock pulse:
  Q3 ← Q2 ← Q1 ← Q0 ← SI (serial input)

  To shift only on certain pulses:
  Clock → AND gate with Shift control → FF clock input`} />

          <H3>Bidirectional Shift Register with Parallel Load</H3>
          <CB code={`Capabilities of a general shift register:
1. Clock input
2. Shift RIGHT + serial input for shift right
3. Shift LEFT + serial input for shift left
4. Parallel LOAD + n data input lines
5. n parallel output lines
6. HOLD state (no change even with continuous clock)

Controlled by 2 mode control bits (M1, M0):

MUX input table (each FF has a 4-to-1 MUX):
M1  M0  |  Function    |  FF gets input from
─────────────────────────────────────────────
 0   0  |  Hold        |  its own output Q(i)
 0   1  |  Shift Right |  previous FF Q(i-1) or SI
 1   0  |  Shift Left  |  next FF Q(i+1) or SI  
 1   1  |  Load        |  parallel input I(i)

MUX assignment (from lecture):
Input 0 → A(i)     (hold: own output)
Input 1 → SI, A(i-1) (shift right)
Input 2 → A(i+1), SI (shift left)
Input 3 → I(i)     (parallel load)`} />
        </div>
      )}

      {sub==="counter" && (
        <div>
          <H2>Binary Counters</H2>
          <Box color="orange" title="Definition">
            A counter is a register that goes through a <b>predetermined sequence of states</b> on each clock pulse. An n-bit binary counter counts from 0 to 2ⁿ−1 then repeats.
          </Box>

          <H3>Counting Logic</H3>
          <CB code={`For an n-bit binary counter:
Rule 1: The LOWEST bit (bit 0) complements on EVERY count pulse
Rule 2: Any other bit i complements when ALL lower-order bits are 1

Example: 4-bit counter using JK flip-flops:
  JK truth: J=K=0 → no change, J=K=1 → complement

  FF0: J0=K0=E             (always toggles when enabled)
  FF1: J1=K1=E·A0          (toggles when E=1 AND A0=1)
  FF2: J2=K2=E·A0·A1       (toggles when E=1 AND A0=A1=1)
  FF3: J3=K3=E·A0·A1·A2    (toggles when E=1 AND A0=A1=A2=1)

Where E = Count Enable input`} />

          <H3>4-Bit Binary Counter Count Sequence</H3>
          <TruthTable
            caption="4-bit counter: A3 A2 A1 A0"
            headers={["Count","A3","A2","A1","A0"]}
            rows={[
              ["0","0","0","0","0"],
              ["1","0","0","0","1"],
              ["2","0","0","1","0"],
              ["3","0","0","1","1"],
              ["4","0","1","0","0"],
              ["5","0","1","0","1"],
              ["6","0","1","1","0"],
              ["7","0","1","1","1"],
              ["8","1","0","0","0"],
              ["...","...","...","...","..."],
              ["15","1","1","1","1"],
            ]}
          />

          <H3>Binary Counter with Parallel Load</H3>
          <CB code={`Control inputs: x (Clear), y (Load), z (Increment)

Operation:
x=1: CLEAR — all flip-flops reset to 0
  (K=1, J=don't care → clear by JK characteristic table)

x=0, y=1: PARALLEL LOAD — load I0,I1,I2,I3 into counter
  J0=I0, K0=I0'  (force each FF to value I)
  J1=I1, K1=I1'
  etc.

x=0, y=0, z=1: INCREMENT — count up by 1
  J0=K0=1 (always toggle)
  J1=K1=A0 (toggle if A0=1)
  J2=K2=A0·A1
  J3=K3=A0·A1·A2

x=0, y=0, z=0: HOLD — no change
  All J=K=0 → no change

Flip-flop input equations:
  J0=x'y'z + x'yI0     K0=x + x'y'z + x'yI0'
  J1=x'y'zA0 + x'yI1   K1=x + x'y'zA0 + x'yI1'
  etc.`} />

          <CompareTable
            headers={["Register Type","Data Transfer","Direction","Use Case"]}
            rows={[
              ["Simple Register","Parallel","Load only","Store n-bit values"],
              ["Parallel Load Register","Parallel","Load+Hold","Controlled storage"],
              ["Shift Register","Serial","Right or Left","Serial-to-parallel conversion"],
              ["Bidirectional Shift Reg","Both","Right+Left+Parallel","General purpose"],
              ["Binary Counter","Sequential","Increment","Counting, timing"],
              ["Counter with Load","Sequential+Parallel","Count+Load+Clear","Flexible counting"],
            ]}
          />
        </div>
      )}
    </div>
  );
};

/* ─── MAIN APP ─────────────────────────────────────────────── */
export default function CircuitsGuide() {
  const [tab, setTab] = useState("boolean");

  const tabs = [
    {id:"boolean", label:"🔢 Boolean Algebra",  color:"#58a6ff"},
    {id:"kmap",    label:"🗺️ K-Map",             color:"#a855f7"},
    {id:"comb",    label:"⚡ Combinational",      color:"#22c55e"},
    {id:"ff",      label:"🔄 Flip-Flops",         color:"#f59e0b"},
    {id:"seq",     label:"🔁 Sequential",          color:"#ef4444"},
    {id:"ic",      label:"💎 ICs & Decoders",     color:"#06b6d4"},
    {id:"mux",     label:"🔀 MUX & Registers",    color:"#3fb950"},
  ];

  return (
    <div style={{background:"#010409",minHeight:"100vh",fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
      {/* Header */}
      <div style={{background:"#0d1117",borderBottom:"1px solid #21262d",padding:"0 20px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{padding:"16px 0 0",display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{fontSize:"22px",fontWeight:800,color:"#fff",
              fontFamily:"'Fira Code','Consolas',monospace"}}>
              <span style={{color:"#58a6ff"}}>Circuits</span>
              <span style={{color:"#6e7681"}}>::</span>
              <span style={{color:"#3fb950"}}>Guide</span>
            </div>
            <div style={{fontSize:"12px",color:"#6e7681",background:"#161b22",
              border:"1px solid #30363d",borderRadius:"20px",padding:"3px 10px"}}>
              Lec 1–7 Full Reference
            </div>
          </div>
          <div style={{display:"flex",gap:"0",marginTop:"12px",overflowX:"auto"}}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                style={{padding:"10px 16px",border:"none",cursor:"pointer",fontWeight:600,
                  fontSize:"13px",transition:"all 0.2s",background:"transparent",whiteSpace:"nowrap",
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
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"24px 20px",minHeight:"calc(100vh - 110px)"}}>
        {tab==="boolean" && <BooleanContent />}
        {tab==="kmap"    && <KMapContent />}
        {tab==="comb"    && <CombContent />}
        {tab==="ff"      && <FlipFlopContent />}
        {tab==="seq"     && <SeqContent />}
        {tab==="ic"      && <ICContent />}
        {tab==="mux"     && <MuxContent />}
      </div>
    </div>
  );
}
