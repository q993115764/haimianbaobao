import { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// ── SVG Characters ─────────────────────────────────────────────
const SpongeBob = ({ size = 60, animate = false }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 12px rgba(255,200,0,0.4))", animation: animate ? "bobFloat 2s ease-in-out infinite" : "none", flexShrink: 0 }}>
    <rect x="20" y="30" width="60" height="55" rx="8" fill="#FFD700" stroke="#E6A800" strokeWidth="2"/>
    <rect x="20" y="68" width="60" height="17" rx="4" fill="#8B4513"/>
    <rect x="20" y="68" width="60" height="6" fill="#654321"/>
    <rect x="43" y="69" width="14" height="8" rx="2" fill="#FFD700" stroke="#E6A800" strokeWidth="1.5"/>
    <ellipse cx="38" cy="48" rx="9" ry="11" fill="white" stroke="#ccc" strokeWidth="1"/>
    <ellipse cx="62" cy="48" rx="9" ry="11" fill="white" stroke="#ccc" strokeWidth="1"/>
    <circle cx="40" cy="50" r="5" fill="#6AB0DE"/><circle cx="64" cy="50" r="5" fill="#6AB0DE"/>
    <circle cx="41" cy="49" r="2.5" fill="#1a1a1a"/><circle cx="65" cy="49" r="2.5" fill="#1a1a1a"/>
    <circle cx="42" cy="48" r="1" fill="white"/><circle cx="66" cy="48" r="1" fill="white"/>
    <line x1="30" y1="38" x2="33" y2="41" stroke="#1a1a1a" strokeWidth="1.5"/>
    <line x1="38" y1="37" x2="38" y2="41" stroke="#1a1a1a" strokeWidth="1.5"/>
    <line x1="46" y1="38" x2="43" y2="41" stroke="#1a1a1a" strokeWidth="1.5"/>
    <line x1="54" y1="38" x2="57" y2="41" stroke="#1a1a1a" strokeWidth="1.5"/>
    <line x1="62" y1="37" x2="62" y2="41" stroke="#1a1a1a" strokeWidth="1.5"/>
    <line x1="70" y1="38" x2="67" y2="41" stroke="#1a1a1a" strokeWidth="1.5"/>
    <ellipse cx="50" cy="57" rx="3" ry="2" fill="#F4A460"/>
    <path d="M 34 63 Q 50 76 66 63" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <rect x="40" y="63" width="8" height="6" rx="1" fill="white" stroke="#ddd" strokeWidth="0.5"/>
    <rect x="52" y="63" width="8" height="6" rx="1" fill="white" stroke="#ddd" strokeWidth="0.5"/>
    <circle cx="28" cy="40" r="2" fill="#F4C430" opacity="0.6"/>
    <circle cx="72" cy="55" r="1.5" fill="#F4C430" opacity="0.6"/>
    <circle cx="25" cy="58" r="1.8" fill="#F4C430" opacity="0.6"/>
    <circle cx="75" cy="42" r="2" fill="#F4C430" opacity="0.6"/>
    <rect x="6" y="38" width="14" height="6" rx="3" fill="#FFD700" stroke="#E6A800" strokeWidth="1.5"/>
    <rect x="80" y="38" width="14" height="6" rx="3" fill="#FFD700" stroke="#E6A800" strokeWidth="1.5"/>
    <ellipse cx="35" cy="87" rx="12" ry="6" fill="#1a1a1a"/>
    <ellipse cx="65" cy="87" rx="12" ry="6" fill="#1a1a1a"/>
    <polygon points="47,68 53,68 51,80 50,82 49,80" fill="#FF0000"/>
  </svg>
);

const Patrick = ({ size = 60, animate = false }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 12px rgba(255,182,193,0.4))", animation: animate ? "bobFloat 2.5s ease-in-out infinite" : "none", flexShrink: 0 }}>
    <path d="M50 15 L58 35 L78 28 L65 45 L82 58 L62 58 L55 80 L50 62 L45 80 L38 58 L18 58 L35 45 L22 28 L42 35 Z" fill="#FF69B4" stroke="#FF1493" strokeWidth="1.5"/>
    <path d="M38 58 L62 58 L55 80 L45 80 Z" fill="#5B3A29"/>
    <line x1="50" y1="58" x2="50" y2="80" stroke="#7D5030" strokeWidth="2"/>
    <ellipse cx="42" cy="44" rx="6" ry="7" fill="white"/><ellipse cx="58" cy="44" rx="6" ry="7" fill="white"/>
    <circle cx="43" cy="46" r="3.5" fill="#1a1a1a"/><circle cx="59" cy="46" r="3.5" fill="#1a1a1a"/>
    <circle cx="44" cy="45" r="1.2" fill="white"/><circle cx="60" cy="45" r="1.2" fill="white"/>
    <path d="M 40 54 Q 50 62 60 54" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

const MrKrabs = ({ size = 60, animate = false }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 12px rgba(200,80,80,0.4))", animation: animate ? "bobFloat 2.2s ease-in-out infinite" : "none", flexShrink: 0 }}>
    <ellipse cx="50" cy="65" rx="28" ry="22" fill="#CC3333" stroke="#AA2222" strokeWidth="1.5"/>
    <path d="M30 58 Q50 48 70 58" stroke="#AA2222" strokeWidth="1" fill="none"/>
    <path d="M28 65 Q50 55 72 65" stroke="#AA2222" strokeWidth="1" fill="none"/>
    <ellipse cx="15" cy="58" rx="12" ry="9" fill="#CC3333" stroke="#AA2222" strokeWidth="1.5"/>
    <path d="M 8 52 Q 5 46 10 44" stroke="#AA2222" strokeWidth="2" fill="none"/>
    <path d="M 14 50 Q 13 44 18 43" stroke="#AA2222" strokeWidth="2" fill="none"/>
    <ellipse cx="85" cy="58" rx="12" ry="9" fill="#CC3333" stroke="#AA2222" strokeWidth="1.5"/>
    <path d="M 92 52 Q 95 46 90 44" stroke="#AA2222" strokeWidth="2" fill="none"/>
    <path d="M 86 50 Q 87 44 82 43" stroke="#AA2222" strokeWidth="2" fill="none"/>
    <ellipse cx="50" cy="38" rx="20" ry="18" fill="#CC3333" stroke="#AA2222" strokeWidth="1.5"/>
    <rect x="36" y="18" width="5" height="14" rx="2.5" fill="#CC3333" stroke="#AA2222" strokeWidth="1"/>
    <rect x="59" y="18" width="5" height="14" rx="2.5" fill="#CC3333" stroke="#AA2222" strokeWidth="1"/>
    <circle cx="38" cy="17" r="7" fill="white" stroke="#AA2222" strokeWidth="1"/>
    <circle cx="62" cy="17" r="7" fill="white" stroke="#AA2222" strokeWidth="1"/>
    <circle cx="38" cy="17" r="4" fill="#1a1a1a"/><circle cx="62" cy="17" r="4" fill="#1a1a1a"/>
    <circle cx="39" cy="16" r="1.5" fill="white"/><circle cx="63" cy="16" r="1.5" fill="white"/>
    <path d="M 36 44 Q 50 54 64 44" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M 36 40 Q 43 37 50 40 Q 57 37 64 40" stroke="#881111" strokeWidth="2" fill="none"/>
  </svg>
);

const Sandy = ({ size = 60, animate = false }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 12px rgba(150,200,100,0.4))", animation: animate ? "bobFloat 2.8s ease-in-out infinite" : "none", flexShrink: 0 }}>
    <ellipse cx="50" cy="62" rx="24" ry="26" fill="#E8E8E8" stroke="#CCC" strokeWidth="2"/>
    <ellipse cx="50" cy="62" rx="20" ry="22" fill="#D4E8A0" stroke="#A8C86A" strokeWidth="1"/>
    <circle cx="50" cy="35" r="22" fill="#E8E8E8" stroke="#CCC" strokeWidth="2"/>
    <circle cx="50" cy="35" r="18" fill="#C8E8FF" stroke="#AAD0EE" strokeWidth="1" opacity="0.8"/>
    <ellipse cx="50" cy="35" rx="13" ry="14" fill="#F4A460"/>
    <ellipse cx="44" cy="30" rx="4" ry="5" fill="white"/><ellipse cx="56" cy="30" rx="4" ry="5" fill="white"/>
    <circle cx="44" cy="31" r="2.5" fill="#1a1a1a"/><circle cx="56" cy="31" r="2.5" fill="#1a1a1a"/>
    <circle cx="45" cy="30" r="1" fill="white"/><circle cx="57" cy="30" r="1" fill="white"/>
    <path d="M 42 39 Q 50 46 58 39" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <circle cx="29" cy="22" r="7" fill="#F4D03F" stroke="#E6B800" strokeWidth="1.5"/>
    <circle cx="71" cy="22" r="7" fill="#F4D03F" stroke="#E6B800" strokeWidth="1.5"/>
  </svg>
);

// ── API call ────────────────────────────────────────────────────
async function callClaude(messages, system = "") {
  const body = { model: "claude-sonnet-4-20250514", max_tokens: 2000, messages };
  if (system) body.system = system;
  const r = await fetch("/api/chat", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const d = await r.json();
  return d.content?.map(c => c.text || "").join("") || "";
}

// ── Helpers ─────────────────────────────────────────────────────
function getWeekStart(d) {
  const t = new Date(d), day = t.getDay();
  t.setDate(t.getDate() + (day === 0 ? -6 : 1 - day)); t.setHours(0, 0, 0, 0); return t;
}
function fmt(d) { return `${d.getMonth() + 1}/${d.getDate()}`; }
function wkey(ws) { return ws.toISOString().slice(0, 10); }

const DAYS = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

// ── Main App ────────────────────────────────────────────────────
export default function App() {
  // Global state
  const [screen, setScreen] = useState("onboard"); // onboard | analyzing | refine | main
  const [userInfo, setUserInfo] = useState({ name: "", age: "", gender: "男", height: "", weight: "", bodyFat: "", experience: "", goal: "", photo: null });
  const [aiPlan, setAiPlan] = useState(null); // { workouts: [], diet: {}, schedule: [], raw: "" }
  const [refineMessages, setRefineMessages] = useState([]);
  const [refineInput, setRefineInput] = useState("");
  const [refineLoading, setRefineLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [tab, setTab] = useState("schedule");
  const [wOff, setWOff] = useState(0);
  const [logs, setLogs] = useState({}); // { weekKey: { dayIdx: { exId: { sets: [{w,r}] } } } }
  const [activeDay, setActiveDay] = useState(null);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [running, setRunning] = useState(false);
  const [secs, setSecs] = useState(0);

  const [chartEx, setChartEx] = useState("");
  const [drag, setDrag] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [editDay, setEditDay] = useState(null);
  const [aiChatMsgs, setAiChatMsgs] = useState([]);
  const [aiChatInput, setAiChatInput] = useState("");
  const [aiChatLoading, setAiChatLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState({});
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState(false);
  const [aiSubTab, setAiSubTab] = useState("analysis");
  const timerRef = useRef(null);
  const refineEndRef = useRef(null);
  const chatEndRef = useRef(null);


  useEffect(() => {
    if (running) timerRef.current = setInterval(() => setSecs(s => s + 1), 1000);
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [running]);
  useEffect(() => { refineEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [refineMessages]);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [aiChatMsgs]);

  const ws = getWeekStart(new Date(Date.now() + wOff * 7 * 86400000));
  const wk = wkey(ws);
  const todayI = (() => { const t = new Date(); t.setHours(0, 0, 0, 0); const d = Math.round((t - ws) / 86400000); return d >= 0 && d < 7 ? d : -1; })();
  const wdays = Array.from({ length: 7 }, (_, i) => { const d = new Date(ws); d.setDate(d.getDate() + i); return d; });

  // Per-set log helpers
  function getSetLog(wkKey, di, exId, setIdx) {
    return logs[wkKey]?.[di]?.[exId]?.[setIdx] || { w: "", r: "" };
  }
  function setSetLog(wkKey, di, exId, setIdx, field, val) {
    setLogs(prev => ({
      ...prev,
      [wkKey]: {
        ...(prev[wkKey] || {}),
        [di]: {
          ...(prev[wkKey]?.[di] || {}),
          [exId]: {
            ...(prev[wkKey]?.[di]?.[exId] || {}),
            [setIdx]: { ...(prev[wkKey]?.[di]?.[exId]?.[setIdx] || {}), [field]: val }
          }
        }
      }
    }));
  }

  // Get previous week's log for reference
  function getPrevSetLog(di, exId, setIdx) {
    const prevWs = getWeekStart(new Date(Date.now() + (wOff - 1) * 7 * 86400000));
    const prevWk = wkey(prevWs);
    return logs[prevWk]?.[di]?.[exId]?.[setIdx] || null;
  }

  const fmtT = s => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sc = s % 60; return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sc).padStart(2, "0")}` : `${String(m).padStart(2, "0")}:${String(sc).padStart(2, "0")}`; };

  // ── ONBOARDING: Analyze & Generate Plan ─────────────────────
  async function generatePlan() {
    setAnalyzing(true);
    setScreen("analyzing");
    try {
      const photoNote = userInfo.photo ? "用户上传了身材照片，请在分析中提及照片显示的体型特征。" : "";
      const prompt = `你是专业健身教练AI。请根据以下用户信息生成个性化健身和饮食方案。

用户信息：
- 姓名：${userInfo.name || "用户"}
- 性别：${userInfo.gender}
- 年龄：${userInfo.age}岁
- 身高：${userInfo.height}cm
- 体重：${userInfo.weight}kg
- 体脂率：${userInfo.bodyFat ? userInfo.bodyFat + "%" : "未知"}
- 健身经验：${userInfo.experience}
- 目标：${userInfo.goal}
${photoNote}

请严格按照以下JSON格式返回，不要有任何其他文字，不要有markdown代码块：
{
  "analysis": "对用户现状的2-3句分析",
  "calories": 2200,
  "protein": 150,
  "schedule": ["chest","back","rest","legs","shoulder","rest","rest"],
  "workouts": [
    {
      "id": "chest",
      "label": "胸+三头",
      "color": "#FF6B6B",
      "char": "krabs",
      "muscles": ["胸大肌","三头肌"],
      "exercises": [
        {"id": "bench", "name": "杠铃平板卧推", "sets": 4, "repsTarget": "6-8", "type": "主力"},
        {"id": "incline", "name": "上斜哑铃卧推", "sets": 3, "repsTarget": "10-12", "type": "辅助"}
      ]
    }
  ],
  "diet": {
    "meals": [
      {"time": "早餐", "foods": ["燕麦100g", "鸡蛋3个"], "protein": 35, "calories": 450},
      {"time": "午餐", "foods": ["鸡胸肉200g", "米饭150g", "蔬菜"], "protein": 50, "calories": 600},
      {"time": "晚餐", "foods": ["鱼肉200g", "蔬菜"], "protein": 45, "calories": 400}
    ],
    "rules": ["训练日碳水加量", "每天喝水2.5升以上"]
  }
}

schedule数组只能包含这些值：chest, back, legs, shoulder, arms, rest
workouts的id必须和schedule中的值对应
char只能是：spongebob, patrick, krabs, squidward, sandy
每个workout至少4个动作，最多7个动作
sets必须是数字`;

      const raw = await callClaude([{ role: "user", content: prompt }]);
      let plan;
      try {
        const cleaned = raw.replace(/```json|```/g, "").trim();
        plan = JSON.parse(cleaned);
      } catch {
        plan = {
          analysis: "根据你的身体数据，我已为你制定了专属训练方案。",
          calories: 2200, protein: 150,
          schedule: ["chest", "back", "rest", "legs", "shoulder", "rest", "rest"],
          workouts: [
            { id: "chest", label: "胸+三头", color: "#FF6B6B", char: "krabs", muscles: ["胸大肌", "肱三头肌"],
              exercises: [
                { id: "bench", name: "杠铃平板卧推", sets: 4, repsTarget: "6-8", type: "主力" },
                { id: "incline", name: "上斜哑铃卧推", sets: 3, repsTarget: "10-12", type: "辅助" },
                { id: "fly", name: "蝴蝶机夹胸", sets: 3, repsTarget: "12-15", type: "辅助" },
                { id: "tricep", name: "绳索下压", sets: 3, repsTarget: "12", type: "辅助" },
              ]
            },
            { id: "back", label: "背+二头", color: "#5BA5C8", char: "squidward", muscles: ["背阔肌", "肱二头肌"],
              exercises: [
                { id: "deadlift", name: "杠铃硬拉", sets: 4, repsTarget: "6-8", type: "主力" },
                { id: "pullup", name: "引体向上", sets: 4, repsTarget: "6-10", type: "主力" },
                { id: "row", name: "坐姿划船", sets: 3, repsTarget: "10-12", type: "辅助" },
                { id: "curl", name: "杠铃弯举", sets: 3, repsTarget: "10", type: "辅助" },
              ]
            },
            { id: "legs", label: "腿", color: "#C27BA0", char: "patrick", muscles: ["股四头肌", "腘绳肌"],
              exercises: [
                { id: "squat", name: "杠铃深蹲", sets: 4, repsTarget: "6-8", type: "主力" },
                { id: "legpress", name: "腿举", sets: 3, repsTarget: "12", type: "辅助" },
                { id: "rdl", name: "罗马尼亚硬拉", sets: 3, repsTarget: "10", type: "辅助" },
                { id: "calf", name: "站姿提踵", sets: 4, repsTarget: "15-20", type: "辅助" },
              ]
            },
            { id: "shoulder", label: "肩", color: "#5BA55B", char: "sandy", muscles: ["三角肌"],
              exercises: [
                { id: "press", name: "坐姿哑铃推举", sets: 4, repsTarget: "8-10", type: "主力" },
                { id: "lateral", name: "哑铃侧平举", sets: 4, repsTarget: "12-15", type: "辅助" },
                { id: "facepull", name: "绳索面拉", sets: 3, repsTarget: "15", type: "辅助" },
                { id: "rearfly", name: "俯身飞鸟", sets: 3, repsTarget: "12", type: "辅助" },
              ]
            },
          ],
          diet: {
            meals: [
              { time: "早餐", foods: ["燕麦100g", "鸡蛋3个", "牛奶250ml"], protein: 35, calories: 450 },
              { time: "午餐", foods: ["鸡胸肉200g", "米饭150g", "蔬菜"], protein: 50, calories: 600 },
              { time: "晚餐", foods: ["鱼肉200g", "蔬菜", "鸡蛋2个"], protein: 45, calories: 400 },
            ],
            rules: ["训练日碳水适当加量", "每天喝水2.5升以上", "蛋白质分散到每餐摄入"]
          }
        };
      }
      plan.raw = raw;
      setAiPlan(plan);
      setSchedule(plan.schedule);
      if (plan.workouts?.[0]?.exercises?.[0]) setChartEx(plan.workouts[0].exercises[0].id);

      // Initial refine message
      setRefineMessages([{
        role: "assistant",
        content: `${plan.analysis}\n\n我已为你生成了专属训练和饮食方案！\n\n📋 训练安排：${plan.schedule.filter(s => s !== "rest").length}天分化训练\n🥩 每日热量目标：${plan.calories} kcal\n💪 蛋白质目标：${plan.protein}g\n\n你觉得这个方案怎么样？有什么想调整的地方吗？`
      }]);
      setScreen("refine");
    } catch (e) {
      setScreen("onboard");
    }
    setAnalyzing(false);
  }

  // ── REFINE: Chat to modify plan ─────────────────────────────
  async function sendRefine() {
    if (!refineInput.trim()) return;
    const userMsg = { role: "user", content: refineInput };
    const newMsgs = [...refineMessages, userMsg];
    setRefineMessages(newMsgs);
    setRefineInput("");
    setRefineLoading(true);
    try {
      const system = `你是专业健身教练AI。用户当前的训练计划：${JSON.stringify(aiPlan)}。用户信息：${JSON.stringify(userInfo)}。
根据用户的反馈，用自然语言回答并在需要时更新计划。如果需要更新计划，在回复末尾加上：
<UPDATE_PLAN>{"calories":xxx,"protein":xxx,"schedule":[...]}</UPDATE_PLAN>
如果不需要更新计划则不要加这个标签。用中文回答，简洁友好。`;
      const reply = await callClaude(newMsgs.map(m => ({ role: m.role, content: m.content })), system);

      // Check for plan update
      const updateMatch = reply.match(/<UPDATE_PLAN>([\s\S]*?)<\/UPDATE_PLAN>/);
      if (updateMatch) {
        try {
          const update = JSON.parse(updateMatch[1]);
          setAiPlan(prev => ({ ...prev, ...update }));
          if (update.schedule) setSchedule(update.schedule);
        } catch { }
      }
      const cleanReply = reply.replace(/<UPDATE_PLAN>[\s\S]*?<\/UPDATE_PLAN>/, "").trim();
      setRefineMessages(p => [...p, { role: "assistant", content: cleanReply }]);
    } catch {
      setRefineMessages(p => [...p, { role: "assistant", content: "网络错误，请重试" }]);
    }
    setRefineLoading(false);
  }

  // ── MAIN: AI Training Analysis ──────────────────────────────
  async function runAnalysis() {
    if (!activeWorkout) return;
    const wkObj = aiPlan?.workouts?.find(w => w.id === activeWorkout.wid);
    if (!wkObj) return;
    const di = activeWorkout.di >= 0 ? activeWorkout.di : 0;
    const summary = wkObj.exercises.map(ex => {
      const sets = Array.from({ length: ex.sets }, (_, si) => {
        const s = getSetLog(wk, di, ex.id, si);
        return s.w ? `第${si + 1}组: ${s.w}kg×${s.r || "?"}次` : null;
      }).filter(Boolean);
      return sets.length ? `${ex.name}: ${sets.join(", ")}` : null;
    }).filter(Boolean).join("\n");
    if (!summary) { alert("请先录入至少一个动作的数据"); return; }
    setAiAnalysisLoading(true);
    setTab("ai");
    try {
      const reply = await callClaude([{ role: "user", content: `专业健身教练，分析今日训练：\n类型：${wkObj.label}\n记录（每组独立数据）：\n${summary}\n用户：${userInfo.age}岁${userInfo.gender} ${userInfo.weight}kg 目标：${userInfo.goal}。\n中文分析：1.今日训练强度 2.预估消耗热量kcal 3.刺激到的肌肉 4.各动作状态评估 5.下次每个主力动作的具体进步目标 6.一句话总结` }]);
      setAiAnalysis(prev => ({ ...prev, [`${activeWorkout.wid}-${wk}`]: reply }));
    } catch { setAiAnalysis(prev => ({ ...prev, [`${activeWorkout.wid}-${wk}`]: "分析失败，请重试" })); }
    setAiAnalysisLoading(false);
  }

  async function sendAiChat(msg) {
    if (!msg.trim()) return;
    const nm = [...aiChatMsgs, { role: "user", content: msg }];
    setAiChatMsgs(nm); setAiChatInput(""); setAiChatLoading(true);
    try {
      const system = `你是用户的专属健身AI教练。用户信息：${JSON.stringify(userInfo)}。当前训练计划：${JSON.stringify(aiPlan?.workouts?.map(w => w.label))}。中文简洁口语化回答，偶尔用比奇堡的梗。`;
      const reply = await callClaude(nm.map(m => ({ role: m.role, content: m.content })), system);
      setAiChatMsgs(p => [...p, { role: "assistant", content: reply }]);
    } catch { setAiChatMsgs(p => [...p, { role: "assistant", content: "网络错误" }]); }
    setAiChatLoading(false);
  }

  const getChar = (char, size, animate) => {
    if (char === "krabs") return <MrKrabs size={size} animate={animate} />;
    if (char === "patrick") return <Patrick size={size} animate={animate} />;
    if (char === "sandy") return <Sandy size={size} animate={animate} />;
    return <SpongeBob size={size} animate={animate} />;
  };

  const typeColor = { "主力": "#FF6B6B", "辅助": "#5BA5C8", "腹部": "#5BA55B" };

  const chartData = (() => {
    if (!chartEx || !aiPlan) return [];
    const pts = [];
    Object.entries(logs).forEach(([w, days]) => Object.entries(days).forEach(([di, exs]) => {
      const sets = exs[chartEx];
      if (sets) {
        const maxW = Math.max(...Object.values(sets).map(s => parseFloat(s.w) || 0));
        if (maxW > 0) { const d = new Date(w); d.setDate(d.getDate() + parseInt(di)); pts.push({ date: fmt(d), weight: maxW }); }
      }
    }));
    return pts;
  })();

  // ── BG Layout ───────────────────────────────────────────────
  const BgLayout = ({ children }) => (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif", maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: "linear-gradient(160deg,#001F3F 0%,#003366 30%,#006994 65%,#0099CC 100%)", position: "relative", overflow: "hidden", paddingBottom: 90 }}>
      <style>{`
        @keyframes bobFloat{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-10px) rotate(2deg)}}
        @keyframes riseUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes bubbleRise{0%{transform:translateY(0);opacity:0.5}100%{transform:translateY(-110vh);opacity:0}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
        *{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}
        input,select,textarea{outline:none!important;transition:border-color 0.2s,box-shadow 0.2s;}
        input:focus,select:focus,textarea:focus{border-color:#FFD700!important;box-shadow:0 0 0 3px rgba(255,215,0,0.2)!important;}
        button{transition:transform 0.15s,opacity 0.15s;}
        button:active{transform:scale(0.95)!important;opacity:0.85;}
        ::-webkit-scrollbar{width:0;}
        ::placeholder{color:rgba(255,255,255,0.3);}
      `}</style>
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{ position: "fixed", borderRadius: "50%", width: [6, 10, 8, 14, 7, 12, 9, 11][i], height: [6, 10, 8, 14, 7, 12, 9, 11][i], background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", left: `${[8, 18, 30, 45, 58, 68, 80, 90][i]}%`, bottom: "-20px", zIndex: 1, pointerEvents: "none", animation: `bubbleRise ${[8, 12, 10, 14, 9, 11, 13, 10][i]}s linear ${[0, 2, 4, 1, 3, 5, 2, 6][i]}s infinite` }} />
      ))}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 65, zIndex: 1, pointerEvents: "none" }}>
        <svg viewBox="0 0 480 65" width="100%" height="65" preserveAspectRatio="none">
          <path d="M0 35 Q40 18 80 30 Q120 44 160 25 Q200 8 240 30 Q280 50 320 23 Q360 0 400 28 Q440 50 480 25 L480 65 L0 65Z" fill="#C4A35A" opacity="0.9"/>
          <path d="M0 50 Q60 36 120 48 Q180 58 240 44 Q300 30 360 46 Q420 58 480 40 L480 65 L0 65Z" fill="#D4B46A"/>
          <path d="M30 50 Q35 36 30 26 Q25 16 30 6" stroke="#2E8B57" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M33 46 Q40 38 38 31" stroke="#3CB371" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M200 50 Q205 34 200 21" stroke="#228B22" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M100 50 L100 38 M95 46 L100 38 L105 46 M92 42 L100 31 L108 42" stroke="#FF6B6B" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M350 50 L350 36 M344 44 L350 36 L356 44 M341 40 L350 28 L359 40" stroke="#FF69B4" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <ellipse cx="60" cy="60" rx="18" ry="7" fill="#8B7355"/>
          <ellipse cx="280" cy="61" rx="22" ry="6" fill="#7D6A4E"/>
          <text x="155" y="61" fontSize="14">⭐</text>
          <text x="380" y="61" fontSize="13">🐚</text>
        </svg>
      </div>
      <div style={{ position: "fixed", right: 10, bottom: 60, zIndex: 2, pointerEvents: "none", opacity: 0.8 }}>
        <svg width="45" height="65" viewBox="0 0 50 70">
          <ellipse cx="25" cy="52" rx="18" ry="20" fill="#F4A435"/>
          <path d="M12 42 Q25 35 38 42" stroke="#D4841A" strokeWidth="1" fill="none"/>
          <path d="M10 50 Q25 43 40 50" stroke="#D4841A" strokeWidth="1" fill="none"/>
          <path d="M14 65 Q25 59 36 65" stroke="#D4841A" strokeWidth="1" fill="none"/>
          <path d="M20 72 Q20 62 25 62 Q30 62 30 72" fill="#8B4513"/>
          <circle cx="25" cy="50" r="6" fill="#87CEEB" stroke="#5B9BD5" strokeWidth="1"/>
          <path d="M25 32 Q18 18 22 8" stroke="#2E8B57" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M25 32 Q32 16 28 5" stroke="#228B22" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M25 32 Q15 22 10 14" stroke="#2E8B57" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M25 32 Q35 22 40 14" stroke="#228B22" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{ position: "relative", zIndex: 3 }}>{children}</div>
    </div>
  );

  const cardStyle = { background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 18, border: "1px solid rgba(255,255,255,0.1)" };
  const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.15)", fontSize: 15, background: "rgba(0,0,0,0.3)", color: "white" };
  const goldBtn = { padding: "14px", borderRadius: 16, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#FFD700,#FF9500)", color: "#001F3F", fontSize: 15, fontWeight: "700", width: "100%" };
  const ghostBtn = { padding: "10px 18px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", fontSize: 13 };

  // ══════════════════════════════════════════════════════════════
  // SCREEN: ONBOARDING
  // ══════════════════════════════════════════════════════════════
  if (screen === "onboard") return (
    <BgLayout>
      <div style={{ padding: "30px 20px 20px", animation: "riseUp 0.4s ease both" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 30 }}>
          <SpongeBob size={90} animate />
          <div style={{ fontSize: 26, fontWeight: "700", color: "#FFD700", marginTop: 12, letterSpacing: -0.5 }}>比奇堡健身房</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>告诉我你的身体信息，AI为你定制专属方案</div>
        </div>

        <div style={{ ...cardStyle, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>昵称（可选）</div>
            <input placeholder="你叫什么名字？" value={userInfo.name} onChange={e => setUserInfo(p => ({ ...p, name: e.target.value }))} style={inputStyle} />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>性别</div>
              <select value={userInfo.gender} onChange={e => setUserInfo(p => ({ ...p, gender: e.target.value }))} style={{ ...inputStyle, appearance: "none" }}>
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>年龄</div>
              <input type="number" placeholder="如 24" value={userInfo.age} onChange={e => setUserInfo(p => ({ ...p, age: e.target.value }))} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>身高 (cm)</div>
              <input type="number" placeholder="如 178" value={userInfo.height} onChange={e => setUserInfo(p => ({ ...p, height: e.target.value }))} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>体重 (kg)</div>
              <input type="number" placeholder="如 79" value={userInfo.weight} onChange={e => setUserInfo(p => ({ ...p, weight: e.target.value }))} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>体脂率（可选）</div>
              <input type="number" placeholder="如 23" value={userInfo.bodyFat} onChange={e => setUserInfo(p => ({ ...p, bodyFat: e.target.value }))} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>健身经验</div>
              <select value={userInfo.experience} onChange={e => setUserInfo(p => ({ ...p, experience: e.target.value }))} style={{ ...inputStyle, appearance: "none" }}>
                <option value="新手（0-1年）">新手（0-1年）</option>
                <option value="初级（1-2年）">初级（1-2年）</option>
                <option value="中级（2-4年）">中级（2-4年）</option>
                <option value="高级（4年以上）">高级（4年以上）</option>
              </select>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>健身目标</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["减脂塑形", "增肌增重", "增肌减脂", "提升力量", "保持健康"].map(g => (
                <button key={g} onClick={() => setUserInfo(p => ({ ...p, goal: g }))} style={{ padding: "7px 14px", borderRadius: 20, border: userInfo.goal === g ? "1.5px solid #FFD700" : "1.5px solid rgba(255,255,255,0.2)", cursor: "pointer", background: userInfo.goal === g ? "rgba(255,215,0,0.2)" : "rgba(255,255,255,0.07)", color: userInfo.goal === g ? "#FFD700" : "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: userInfo.goal === g ? "600" : "400" }}>{g}</button>
              ))}
            </div>
          </div>

          {/* Photo upload */}
          <div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>身材照片（可选，AI会分析体型）</div>
            <label style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, border: "1.5px dashed rgba(255,255,255,0.2)", cursor: "pointer", background: "rgba(255,255,255,0.05)" }}>
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
                const f = e.target.files[0];
                if (f) { const r = new FileReader(); r.onload = ev => setUserInfo(p => ({ ...p, photo: ev.target.result })); r.readAsDataURL(f); }
              }} />
              {userInfo.photo ? (
                <><img src={userInfo.photo} style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover" }} alt="" /><span style={{ fontSize: 13, color: "#FFD700" }}>照片已上传 ✓</span></>
              ) : (
                <><div style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📷</div><span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>点击上传身材照片</span></>
              )}
            </label>
          </div>

          <button onClick={generatePlan} disabled={!userInfo.age || !userInfo.height || !userInfo.weight || !userInfo.goal}
            style={{ ...goldBtn, marginTop: 6, opacity: (!userInfo.age || !userInfo.height || !userInfo.weight || !userInfo.goal) ? 0.5 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <SpongeBob size={28} />AI 生成我的专属方案
          </button>
        </div>
      </div>
    </BgLayout>
  );

  // ══════════════════════════════════════════════════════════════
  // SCREEN: ANALYZING
  // ══════════════════════════════════════════════════════════════
  if (screen === "analyzing") return (
    <BgLayout>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: 20, gap: 20 }}>
        <SpongeBob size={100} animate />
        <div style={{ fontSize: 22, fontWeight: "700", color: "#FFD700", textAlign: "center" }}>海绵宝宝正在分析中...</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", textAlign: "center" }}>根据你的身体数据生成专属方案</div>
        <div style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFD700", animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
        </div>
      </div>
    </BgLayout>
  );

  // ══════════════════════════════════════════════════════════════
  // SCREEN: REFINE
  // ══════════════════════════════════════════════════════════════
  if (screen === "refine") return (
    <BgLayout>
      <div style={{ padding: "0 0 90px" }}>
        {/* Header */}
        <div style={{ background: "rgba(0,10,30,0.6)", backdropFilter: "blur(20px)", padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 12 }}>
          <SpongeBob size={36} />
          <div>
            <div style={{ fontSize: 17, fontWeight: "700", color: "#FFD700" }}>你的专属方案</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>和AI对话调整，满意后开始训练</div>
          </div>
        </div>

        {/* Plan preview */}
        {aiPlan && (
          <div style={{ padding: "14px 14px 0" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1, ...cardStyle, padding: "12px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: "700", color: "#FFD700" }}>{aiPlan.calories}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>每日热量 kcal</div>
              </div>
              <div style={{ flex: 1, ...cardStyle, padding: "12px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: "700", color: "#5EE85E" }}>{aiPlan.protein}g</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>每日蛋白质</div>
              </div>
              <div style={{ flex: 1, ...cardStyle, padding: "12px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: "700", color: "#5BA5C8" }}>{aiPlan.schedule?.filter(s => s !== "rest").length || 0}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>训练天数/周</div>
              </div>
            </div>

            {/* Schedule preview */}
            <div style={{ ...cardStyle, padding: "12px 14px", marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: "600", color: "rgba(255,255,255,0.7)", marginBottom: 10 }}>本周训练安排</div>
              <div style={{ display: "flex", gap: 6 }}>
                {(aiPlan.schedule || []).map((s, i) => {
                  const W = aiPlan.workouts?.find(w => w.id === s);
                  return (
                    <div key={i} style={{ flex: 1, background: W ? `${W.color}22` : "rgba(255,255,255,0.06)", border: W ? `1px solid ${W.color}55` : "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "6px 4px", textAlign: "center" }}>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>{DAYS[i]}</div>
                      <div style={{ fontSize: 12, fontWeight: "700", color: W ? W.color : "rgba(255,255,255,0.3)", marginTop: 2 }}>{W ? W.label.slice(0, 2) : "休"}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Chat */}
        <div style={{ padding: "0 14px" }}>
          <div style={{ ...cardStyle, overflow: "hidden" }}>
            <div style={{ height: 300, overflowY: "auto", padding: "14px" }}>
              {refineMessages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12, animation: "riseUp 0.25s ease both" }}>
                  {m.role === "assistant" && <SpongeBob size={28} style={{ marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }} />}
                  <div style={{ maxWidth: "78%", padding: "11px 14px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.role === "user" ? "linear-gradient(135deg,#FFD700,#FF9500)" : "rgba(255,255,255,0.12)", color: m.role === "user" ? "#001F3F" : "white", fontSize: 13, lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{m.content}</div>
                </div>
              ))}
              {refineLoading && <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}><SpongeBob size={28} animate /><div style={{ background: "rgba(255,255,255,0.12)", padding: "11px 14px", borderRadius: "18px 18px 18px 4px", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>海绵宝宝正在思考...</div></div>}
              <div ref={refineEndRef} />
            </div>
            <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 8 }}>
              <input value={refineInput} onChange={e => setRefineInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendRefine()} placeholder="告诉我你想调整的地方..." style={{ flex: 1, padding: "11px 14px", borderRadius: 16, border: "1.5px solid rgba(255,255,255,0.15)", fontSize: 14, background: "rgba(0,0,0,0.3)", color: "white" }} />
              <button onClick={sendRefine} disabled={refineLoading || !refineInput.trim()} style={{ padding: "11px 16px", borderRadius: 16, border: "none", cursor: "pointer", background: refineInput.trim() ? "linear-gradient(135deg,#FFD700,#FF9500)" : "rgba(255,255,255,0.1)", color: refineInput.trim() ? "#001F3F" : "rgba(255,255,255,0.3)", fontWeight: "700", fontSize: 14 }}>发</button>
            </div>
          </div>

          <button onClick={() => setScreen("main")} style={{ ...goldBtn, marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <SpongeBob size={26} />开始训练！进入我的健身房
          </button>
          <button onClick={() => setScreen("onboard")} style={{ ...ghostBtn, width: "100%", marginTop: 8, textAlign: "center" }}>← 重新填写信息</button>
        </div>
      </div>
    </BgLayout>
  );

  // ══════════════════════════════════════════════════════════════
  // SCREEN: MAIN APP
  // ══════════════════════════════════════════════════════════════
  const workoutMap = Object.fromEntries((aiPlan?.workouts || []).map(w => [w.id, w]));
  const allExercises = (aiPlan?.workouts || []).flatMap(w => w.exercises);

  return (
    <BgLayout>
      {/* Header */}
      <div style={{ background: "rgba(0,10,30,0.55)", backdropFilter: "blur(20px)", padding: "14px 16px 10px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <SpongeBob size={36} />
            <div>
              <div style={{ fontSize: 16, fontWeight: "700", color: "#FFD700" }}>{userInfo.name ? `${userInfo.name}的健身房` : "比奇堡健身房"}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>{new Date().toLocaleDateString('zh-CN', {year:'numeric',month:'long',day:'numeric',weekday:'long'})}</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: "700", fontFamily: "monospace", color: "#FFD700" }}>{fmtT(secs)}</div>
            <div style={{ display: "flex", gap: 5, marginTop: 4, justifyContent: "flex-end" }}>
              <button onClick={() => setRunning(r => !r)} style={{ padding: "4px 10px", borderRadius: 18, border: "none", cursor: "pointer", fontWeight: "600", fontSize: 11, background: running ? "rgba(255,107,107,0.9)" : "rgba(90,185,90,0.9)", color: "white" }}>{running ? "⏸" : "▶"}</button>
              <button onClick={() => { setSecs(0); setRunning(false); }} style={{ padding: "4px 8px", borderRadius: 18, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", fontSize: 11, background: "rgba(255,255,255,0.1)", color: "white" }}>↺</button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ display: "flex", background: "rgba(0,10,30,0.6)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0, zIndex: 20 }}>
        {[["schedule", "日程", "📅"], ["log", "记录", "📝"], ["diet", "饮食", "🥩"], ["ai", "AI", "🤖"], ["chart", "进度", "📈"]].map(([k, lb, ic]) => (
          <button key={k} onClick={() => setTab(k)} style={{ flex: 1, padding: "10px 0", border: "none", cursor: "pointer", background: "transparent", color: tab === k ? "#FFD700" : "rgba(255,255,255,0.45)", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, position: "relative" }}>
            <span style={{ fontSize: 15 }}>{ic}</span>
            <span style={{ fontSize: 9, fontWeight: "600" }}>{lb}</span>
            {tab === k && <div style={{ position: "absolute", bottom: 0, left: "20%", right: "20%", height: 2, borderRadius: 2, background: "#FFD700" }} />}
          </button>
        ))}
      </div>

      <div style={{ padding: "14px 12px", animation: "riseUp 0.3s ease both" }}>

        {/* ===== SCHEDULE ===== */}
        {tab === "schedule" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <button onClick={() => setWOff(o => o - 1)} style={{ width: 38, height: 38, borderRadius: 19, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", cursor: "pointer", color: "white", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: "700", fontSize: 14, color: "white" }}>{ws.getMonth() + 1}月{ws.getDate()}日 — {wdays[6].getMonth() + 1}月{wdays[6].getDate()}日</div>
                <div style={{ fontSize: 11, color: wOff === 0 ? "#FFD700" : "rgba(255,255,255,0.5)", marginTop: 1 }}>{wOff === 0 ? "本周" : wOff < 0 ? `${Math.abs(wOff)}周前` : `${wOff}周后`}</div>
              </div>
              <button onClick={() => setWOff(o => o + 1)} style={{ width: 38, height: 38, borderRadius: 19, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", cursor: "pointer", color: "white", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
            </div>

            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textAlign: "center", marginBottom: 12 }}>拖动可交换训练日 · 点"换"修改类型</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {wdays.map((date, i) => {
                const wid = schedule[i] || "rest";
                const W = workoutMap[wid];
                const isT = i === todayI && wOff === 0;
                const isDO = dragOver === i;
                return (
                  <div key={i} draggable
                    onDragStart={() => setDrag(i)}
                    onDragOver={e => { e.preventDefault(); setDragOver(i); }}
                    onDrop={() => { if (drag !== null && drag !== i) { const s = [...schedule]; [s[drag], s[i]] = [s[i], s[drag]]; setSchedule(s); } setDrag(null); setDragOver(null); }}
                    onDragEnd={() => { setDrag(null); setDragOver(null); }}
                    style={{ ...cardStyle, border: isT ? `1.5px solid ${W?.color || "#FFD700"}88` : isDO ? "1.5px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.1)", boxShadow: isT ? `0 6px 28px ${W?.color || "#FFD700"}33` : "0 2px 12px rgba(0,0,0,0.2)", opacity: drag === i ? 0.4 : 1, cursor: "grab", overflow: "hidden", transition: "all 0.2s" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ padding: "10px 8px 10px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, minWidth: 66, borderRight: "1px solid rgba(255,255,255,0.08)" }}>
                        {W ? getChar(W.char, 44, isT) : <SpongeBob size={44} />}
                        <div style={{ fontSize: 11, fontWeight: "700", color: "white" }}>{DAYS[i]}</div>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.45)" }}>{fmt(date)}</div>
                        {isT && <div style={{ fontSize: 8, background: W?.color || "#FFD700", color: "white", borderRadius: 5, padding: "1px 4px", fontWeight: "700" }}>今天</div>}
                      </div>
                      <div style={{ flex: 1, padding: "12px 12px" }}>
                        <div style={{ fontWeight: "700", fontSize: 14, color: W ? W.color : "rgba(255,255,255,0.35)", marginBottom: 4 }}>{W ? W.label : "休息日"}</div>
                        {W && <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                          {W.muscles?.slice(0, 3).map(m => <span key={m} style={{ fontSize: 9, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)", padding: "2px 6px", borderRadius: 6 }}>{m}</span>)}
                        </div>}
                        <div style={{ display: "flex", gap: 6 }}>
                          {W && <button onClick={() => { setActiveWorkout({ wid, di: i, wk }); setActiveDay(i); setTab("log"); }} style={{ padding: "6px 12px", borderRadius: 12, border: "none", cursor: "pointer", background: W.color, color: "white", fontSize: 11, fontWeight: "600" }}>记录</button>}
                          <button onClick={() => setEditDay(editDay === i ? null : i)} style={{ padding: "6px 10px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", fontSize: 11 }}>换</button>
                        </div>
                      </div>
                    </div>
                    {editDay === i && (
                      <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)", display: "flex", gap: 8, flexWrap: "wrap", animation: "riseUp 0.2s ease both" }}>
                        {[...aiPlan.workouts.map(w => w.id), "rest"].map(oid => {
                          const OW = workoutMap[oid];
                          return (
                            <button key={oid} onClick={() => { const s = [...schedule]; s[i] = oid; setSchedule(s); setEditDay(null); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 8px", borderRadius: 10, border: schedule[i] === oid ? `1.5px solid ${OW?.color || "#aaa"}` : "1.5px solid rgba(255,255,255,0.12)", cursor: "pointer", background: schedule[i] === oid ? `${OW?.color || "#aaa"}22` : "rgba(255,255,255,0.05)", color: "white", minWidth: 42 }}>
                              {OW ? getChar(OW.char, 28) : <SpongeBob size={28} />}
                              <span style={{ fontSize: 9, fontWeight: "600" }}>{OW ? OW.label.slice(0, 2) : "休"}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button onClick={() => setScreen("refine")} style={{ ...ghostBtn, width: "100%", marginTop: 12, textAlign: "center" }}>✏️ 修改训练方案</button>
          </div>
        )}

        {/* ===== LOG ===== */}
        {tab === "log" && (
          <div>
            {/* Workout selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14, overflowX: "auto", paddingBottom: 4 }}>
              {aiPlan?.workouts?.map(W => {
                const a = activeWorkout?.wid === W.id;
                return (
                  <button key={W.id} onClick={() => setActiveWorkout({ wid: W.id, di: schedule.indexOf(W.id), wk })} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 12px", borderRadius: 14, border: a ? `1.5px solid ${W.color}` : "1.5px solid rgba(255,255,255,0.12)", cursor: "pointer", background: a ? `${W.color}22` : "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)", minWidth: 58, transition: "all 0.2s", boxShadow: a ? `0 0 14px ${W.color}55` : "none" }}>
                    {getChar(W.char, 34, a)}
                    <span style={{ fontSize: 10, fontWeight: "600", color: a ? "white" : "rgba(255,255,255,0.55)", whiteSpace: "nowrap" }}>{W.label.slice(0, 3)}</span>
                  </button>
                );
              })}
            </div>

            {activeWorkout && workoutMap[activeWorkout.wid] ? (() => {
              const W = workoutMap[activeWorkout.wid];
              const di = activeWorkout.di >= 0 ? activeWorkout.di : 0;
              return (
                <div style={{ animation: "riseUp 0.3s ease both" }}>
                  <div style={{ background: `linear-gradient(135deg,${W.color}44,rgba(255,255,255,0.05))`, borderRadius: 18, padding: "14px", marginBottom: 14, border: `1.5px solid ${W.color}55`, display: "flex", alignItems: "center", gap: 12 }}>
                    {getChar(W.char, 60, true)}
                    <div>
                      <div style={{ fontWeight: "700", fontSize: 17, color: "white" }}>{W.label}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                        {W.muscles?.map(m => <span key={m} style={{ fontSize: 10, background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", padding: "2px 7px", borderRadius: 8 }}>{m}</span>)}
                      </div>
                    </div>
                  </div>

                  {W.exercises.map((ex, ei) => (
                    <div key={ex.id} style={{ ...cardStyle, padding: "14px", marginBottom: 10, animation: `riseUp 0.3s ease ${ei * 0.06}s both` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                            <span style={{ background: typeColor[ex.type] || "#888", color: "white", fontSize: 10, fontWeight: "700", padding: "2px 7px", borderRadius: 8 }}>{ex.type}</span>
                          </div>
                          <div style={{ fontWeight: "700", fontSize: 15, color: "white" }}>{ex.name}</div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>目标：{ex.sets}组 × {ex.repsTarget}次</div>
                        </div>
                      </div>

                      {/* Per-set inputs */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {Array.from({ length: ex.sets }, (_, si) => {
                          const cur = getSetLog(wk, di, ex.id, si);
                          const prev = getPrevSetLog(di, ex.id, si);
                          return (
                            <div key={si} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 12px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                <span style={{ fontSize: 11, fontWeight: "700", color: "rgba(255,255,255,0.6)" }}>第 {si + 1} 组</span>
                                {prev && prev.w && (
                                  <span style={{ fontSize: 10, color: "rgba(255,215,0,0.6)", background: "rgba(255,215,0,0.08)", padding: "2px 7px", borderRadius: 8 }}>
                                    上次：{prev.w}kg × {prev.r}次
                                  </span>
                                )}
                              </div>
                              <div style={{ display: "flex", gap: 8 }}>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginBottom: 3 }}>重量 kg</div>
                                  <input type="number" value={cur.w} onChange={e => setSetLog(wk, di, ex.id, si, "w", e.target.value)} placeholder={prev?.w || "kg"} style={{ width: "100%", padding: "9px 10px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.15)", fontSize: 18, fontWeight: "700", color: "#FFD700", background: "rgba(0,0,0,0.3)" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginBottom: 3 }}>次数</div>
                                  <input type="number" value={cur.r} onChange={e => setSetLog(wk, di, ex.id, si, "r", e.target.value)} placeholder={prev?.r || "次"} style={{ width: "100%", padding: "9px 10px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.15)", fontSize: 18, fontWeight: "700", color: "#5EE85E", background: "rgba(0,0,0,0.3)" }} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <button onClick={runAnalysis} style={{ ...goldBtn, marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <SpongeBob size={26} />AI分析今日训练
                  </button>
                </div>
              );
            })() : (
              <div style={{ textAlign: "center", padding: "50px 20px" }}>
                <SpongeBob size={90} animate />
                <div style={{ marginTop: 14, fontSize: 15, color: "white", fontWeight: "600" }}>选择训练类型开始记录</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>每组可以单独录入重量和次数</div>
              </div>
            )}
          </div>
        )}

        {/* ===== DIET ===== */}
        {tab === "diet" && aiPlan?.diet && (
          <div style={{ animation: "riseUp 0.3s ease both" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1, ...cardStyle, padding: "12px", textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: "700", color: "#FFD700" }}>{aiPlan.calories}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>每日热量 kcal</div>
              </div>
              <div style={{ flex: 1, ...cardStyle, padding: "12px", textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: "700", color: "#5EE85E" }}>{aiPlan.protein}g</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>每日蛋白质</div>
              </div>
            </div>

            {aiPlan.diet.meals?.map((meal, i) => (
              <div key={i} style={{ ...cardStyle, padding: "14px", marginBottom: 10, animation: `riseUp 0.3s ease ${i * 0.08}s both` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ fontWeight: "700", fontSize: 15, color: "#FFD700" }}>{meal.time}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontSize: 11, background: "rgba(90,185,90,0.2)", color: "#5EE85E", padding: "3px 8px", borderRadius: 8, fontWeight: "600" }}>蛋白质 {meal.protein}g</span>
                    <span style={{ fontSize: 11, background: "rgba(255,215,0,0.15)", color: "#FFD700", padding: "3px 8px", borderRadius: 8, fontWeight: "600" }}>{meal.calories}kcal</span>
                  </div>
                </div>
                {meal.foods?.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: j < meal.foods.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                    <span style={{ color: "#FFD700", fontSize: 14 }}>•</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{f}</span>
                  </div>
                ))}
              </div>
            ))}

            <div style={{ ...cardStyle, padding: "14px", marginBottom: 10 }}>
              <div style={{ fontWeight: "700", fontSize: 14, color: "rgba(255,255,255,0.85)", marginBottom: 10 }}>饮食原则</div>
              {aiPlan.diet.rules?.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: i < aiPlan.diet.rules.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <span style={{ color: "#5EE85E", fontWeight: "700", fontSize: 15 }}>✓</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{r}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setScreen("refine")} style={{ ...ghostBtn, width: "100%", textAlign: "center" }}>✏️ 调整饮食方案</button>
          </div>
        )}

        {/* ===== AI ===== */}
        {tab === "ai" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {[["analysis", "训练分析"], ["chat", "AI对话"]].map(([k, lb]) => (
                <button key={k} onClick={() => setAiSubTab(k)} style={{ flex: 1, padding: "10px", borderRadius: 14, border: aiSubTab === k ? "1.5px solid rgba(255,215,0,0.5)" : "1.5px solid rgba(255,255,255,0.1)", cursor: "pointer", fontWeight: "600", fontSize: 13, background: aiSubTab === k ? "rgba(255,215,0,0.12)" : "rgba(255,255,255,0.07)", color: aiSubTab === k ? "#FFD700" : "rgba(255,255,255,0.6)" }}>{lb}</button>
              ))}
            </div>

            {aiSubTab === "analysis" && (
              aiAnalysisLoading ? (
                <div style={{ ...cardStyle, padding: "50px 20px", textAlign: "center" }}>
                  <SpongeBob size={80} animate />
                  <div style={{ fontSize: 16, color: "#FFD700", fontWeight: "700", marginTop: 14 }}>海绵宝宝正在分析...</div>
                </div>
              ) : activeWorkout && aiAnalysis[`${activeWorkout.wid}-${wk}`] ? (
                <div style={{ ...cardStyle, padding: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <SpongeBob size={40} />
                    <div>
                      <div style={{ fontWeight: "700", fontSize: 14, color: "#FFD700" }}>AI训练分析报告</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>来自比奇堡健身顾问</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{aiAnalysis[`${activeWorkout.wid}-${wk}`]}</div>
                  <button onClick={runAnalysis} style={{ ...ghostBtn, width: "100%", marginTop: 12, textAlign: "center" }}>↺ 重新分析</button>
                </div>
              ) : (
                <div style={{ ...cardStyle, padding: "50px 20px", textAlign: "center" }}>
                  <SpongeBob size={80} />
                  <div style={{ marginTop: 14, fontSize: 14, color: "white", fontWeight: "600" }}>先在记录页填入训练数据</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>然后点击"AI分析今日训练"</div>
                </div>
              )
            )}

            {aiSubTab === "chat" && (
              <div style={{ ...cardStyle, overflow: "hidden" }}>
                <div style={{ padding: "10px 14px", background: "rgba(255,215,0,0.08)", borderBottom: "1px solid rgba(255,215,0,0.12)", display: "flex", alignItems: "center", gap: 8 }}>
                  <SpongeBob size={24} />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>AI教练了解你的全部训练数据</span>
                </div>
                <div style={{ height: 340, overflowY: "auto", padding: "14px" }}>
                  {aiChatMsgs.length === 0 && (
                    <div style={{ textAlign: "center", padding: "20px 10px" }}>
                      <SpongeBob size={70} animate />
                      <div style={{ fontSize: 13, marginTop: 12, color: "white", fontWeight: "600" }}>有什么想问的？</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                        {["今天状态不好要降重量吗？", "我的饮食计划合理吗？", "怎么更快达到我的目标？"].map(q => (
                          <button key={q} onClick={() => sendAiChat(q)} style={{ padding: "9px 12px", borderRadius: 12, border: "1px solid rgba(255,215,0,0.2)", background: "rgba(255,215,0,0.06)", cursor: "pointer", fontSize: 12, color: "rgba(255,255,255,0.7)", textAlign: "left" }}>💬 {q}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  {aiChatMsgs.map((m, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10, animation: "riseUp 0.2s ease both" }}>
                      {m.role === "assistant" && <SpongeBob size={26} style={{ marginRight: 6, alignSelf: "flex-end", flexShrink: 0 }} />}
                      <div style={{ maxWidth: "76%", padding: "10px 13px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.role === "user" ? "linear-gradient(135deg,#FFD700,#FF9500)" : "rgba(255,255,255,0.12)", color: m.role === "user" ? "#001F3F" : "white", fontSize: 13, lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{m.content}</div>
                    </div>
                  ))}
                  {aiChatLoading && <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}><SpongeBob size={26} animate /><div style={{ background: "rgba(255,255,255,0.12)", padding: "10px 13px", borderRadius: "18px 18px 18px 4px", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>思考中...</div></div>}
                  <div ref={chatEndRef} />
                </div>
                <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 8 }}>
                  <input value={aiChatInput} onChange={e => setAiChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendAiChat(aiChatInput)} placeholder="问AI教练..." style={{ flex: 1, padding: "10px 13px", borderRadius: 16, border: "1.5px solid rgba(255,255,255,0.12)", fontSize: 14, background: "rgba(0,0,0,0.3)", color: "white" }} />
                  <button onClick={() => sendAiChat(aiChatInput)} disabled={aiChatLoading || !aiChatInput.trim()} style={{ padding: "10px 16px", borderRadius: 16, border: "none", cursor: "pointer", background: aiChatInput.trim() ? "linear-gradient(135deg,#FFD700,#FF9500)" : "rgba(255,255,255,0.1)", color: aiChatInput.trim() ? "#001F3F" : "rgba(255,255,255,0.3)", fontWeight: "700" }}>发</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== CHART ===== */}
        {tab === "chart" && (
          <div style={{ animation: "riseUp 0.3s ease both" }}>
            <div style={{ ...cardStyle, padding: "14px", marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: "600", color: "rgba(255,255,255,0.8)", marginBottom: 10 }}>选择动作</div>
              <select value={chartEx} onChange={e => setChartEx(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.15)", fontSize: 14, background: "rgba(0,0,0,0.4)", color: "white", appearance: "none" }}>
                {(aiPlan?.workouts || []).map(W => (
                  <optgroup key={W.id} label={W.label}>
                    {W.exercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>

            {chartData.length > 0 ? (
              <div style={{ ...cardStyle, padding: "16px" }}>
                <div style={{ fontWeight: "700", fontSize: 14, color: "#FFD700", marginBottom: 14 }}>
                  {allExercises.find(e => e.id === chartEx)?.name} — 最大重量进度 (kg)
                </div>
                <ResponsiveContainer width="100%" height={190}>
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.5)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.5)" }} domain={["auto", "auto"]} />
                    <Tooltip contentStyle={{ background: "rgba(0,20,50,0.95)", border: "1px solid rgba(255,215,0,0.4)", borderRadius: 12, color: "white" }} formatter={v => [`${v} kg`, "最大重量"]} />
                    <Line type="monotone" dataKey="weight" stroke="#FFD700" strokeWidth={2.5} dot={{ fill: "#FFD700", r: 5, stroke: "#001F3F", strokeWidth: 2 }} activeDot={{ r: 7, fill: "#FF9500" }} />
                  </LineChart>
                </ResponsiveContainer>
                <div style={{ marginTop: 14 }}>
                  {chartData.slice().reverse().map((d, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 13 }}>
                      <span style={{ color: "rgba(255,255,255,0.45)" }}>{d.date}</span>
                      <span style={{ fontWeight: "700", color: "#FFD700" }}>{d.weight} kg</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ ...cardStyle, padding: "50px 20px", textAlign: "center" }}>
                <Patrick size={80} animate />
                <div style={{ marginTop: 14, fontSize: 14, color: "white", fontWeight: "600" }}>还没有训练记录</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>在记录页填入数据后图表自动生成</div>
              </div>
            )}
          </div>
        )}
      </div>
    </BgLayout>
  );
}
