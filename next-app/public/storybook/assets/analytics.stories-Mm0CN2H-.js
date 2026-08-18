import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,c as r,i,l as a,n as o,o as s,r as c,s as l,t as u,u as d}from"./weak-points-CysdeF2P.js";var f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{d(),r(),s(),i(),o(),f=t(),p={title:`MyPage/학습 분석`,parameters:{layout:`padded`,docs:{description:{component:`모든 실력 지표는 **내 실력(accent) vs 상위 10%(회색)** 두 계열로만 그린다. 내 값이 주인공이고 비교군은 배경이므로 categorical 팔레트가 아니라 emphasis 조합을 쓴다. accent가 밝은 톤이라 모든 마크에 값 라벨을 직접 붙여 색에만 기대지 않는다.`}}},tags:[`autodocs`]},m={name:`예측 점수 도넛`,render:()=>(0,f.jsx)(`div`,{className:`flex justify-center`,children:(0,f.jsx)(l,{})})},h={name:`영역별 실력`,render:()=>(0,f.jsx)(`div`,{className:`mx-auto max-w-sm rounded-2xl border border-border bg-card p-5`,children:(0,f.jsx)(n,{})})},g={name:`유형별 정답률`,render:()=>(0,f.jsx)(`div`,{className:`mx-auto max-w-md rounded-2xl border border-border bg-card p-5`,children:(0,f.jsx)(a,{})})},_={name:`취약한 표현`,render:()=>(0,f.jsx)(`div`,{className:`mx-auto max-w-md rounded-2xl border border-border bg-card p-5`,children:(0,f.jsx)(u,{})})},v={name:`학습 현황`,render:()=>(0,f.jsx)(`div`,{className:`mx-auto max-w-2xl`,children:(0,f.jsx)(c,{})})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: "예측 점수 도넛",
  render: () => <div className="flex justify-center">
      <ScoreDonut />
    </div>
}`,...m.parameters?.docs?.source},description:{story:`총점 = 발음 + 표현. 하나의 링을 두 구간으로 나누고 목표 지점에 눈금을 둔다`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: "영역별 실력",
  render: () => <div className="mx-auto max-w-sm rounded-2xl border border-border bg-card p-5">
      <SkillRadar />
    </div>
}`,...h.parameters?.docs?.source},description:{story:"5축 레이더. 축 라벨에 `62/88` 두 숫자를 병기해 색 없이도 읽힌다",...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: "유형별 정답률",
  render: () => <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-5">
      <AccuracyBars />
    </div>
}`,...g.parameters?.docs?.source},description:{story:`그룹 막대. 호버 시 툴팁, 스크린리더용 표를 함께 제공한다`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: "취약한 표현",
  render: () => <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-5">
      <WeakPoints />
    </div>
}`,..._.parameters?.docs?.source},description:{story:`내 정답률을 채우고 비교군 위치는 ▼ 눈금으로 표시`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: "학습 현황",
  render: () => <div className="mx-auto max-w-2xl">
      <StudyStatus />
    </div>
}`,...v.parameters?.docs?.source},description:{story:`학습 현황 탭 — 스트릭 · 캘린더 · 기간별 기록`,...v.parameters?.docs?.description}}},y=[`ScoreDonutStory`,`SkillRadarStory`,`AccuracyBarsStory`,`WeakPointsStory`,`StudyStatusStory`]})))()}b();export{g as AccuracyBarsStory,m as ScoreDonutStory,h as SkillRadarStory,v as StudyStatusStory,_ as WeakPointsStory,y as __namedExportsOrder,p as default};