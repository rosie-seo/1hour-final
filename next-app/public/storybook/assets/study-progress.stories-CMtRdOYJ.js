import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{i as t,r as n}from"./study-data-CYGwjb6E.js";import{n as r,t as i}from"./study-progress-COXbq8vX.js";var a,o,s,c;function l(){return(l=e((()=>{t(),r(),a={title:`Classroom/학습 기록`,component:i,parameters:{layout:`padded`,docs:{description:{component:`목차가 '다음에 뭘 하지'라면 여기는 '방금 뭘 했고 몇 점이었나'다. 완료 단계는 점수와 시각을 남기고, 다시 할 수 있는 것만 액션을 노출한다. 미완료 단계에는 액션 대신 순서를 지키라는 안내가 들어간다.`}}},tags:[`autodocs`]},o={name:`진행 중`,args:{episode:n[0]}},s={name:`시작 전`,args:{episode:n[1]}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: "진행 중",
  args: {
    episode: episodes[0]
  }
}`,...o.parameters?.docs?.source},description:{story:`4/5 완료 — 마지막 단계만 남아 완주 화면으로 이어진다`,...o.parameters?.docs?.description}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: "시작 전",
  args: {
    episode: episodes[1]
  }
}`,...s.parameters?.docs?.source},description:{story:`아직 시작 전`,...s.parameters?.docs?.description}}},c=[`InProgress`,`NotStarted`]})))()}l();export{o as InProgress,s as NotStarted,c as __namedExportsOrder,a as default};