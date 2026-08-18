import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./billing-cycle-summary-Dld06Myj.js";var r,i,a,o;function s(){return(s=e((()=>{t(),r={title:`MyPage/결제 주기 성과`,component:n,parameters:{layout:`centered`,docs:{description:{component:`정기결제는 매달 '계속할까?'를 묻는 순간을 만든다. 그 직전에 보이는 것이 결제 알림뿐이면 알림 자체가 해지 트리거가 된다. 같은 자리에서 지난 한 달의 기록을 먼저 보여준다.`}}},tags:[`autodocs`],argTypes:{dday:{control:{type:`number`,min:0,max:30}}}},i={name:`평상시`,args:{dday:16}},a={name:`결제 임박`,args:{dday:3}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: "평상시",
  args: {
    dday: 16
  }
}`,...i.parameters?.docs?.source},description:{story:`결제까지 여유가 있을 때 — 담백한 성과 요약`,...i.parameters?.docs?.description}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: "결제 임박",
  args: {
    dday: 3
  }
}`,...a.parameters?.docs?.source},description:{story:`결제 3일 이내 — 강조 배경과 "N일 뒤 결제돼요" 문구로 전환`,...a.parameters?.docs?.description}}},o=[`Default`,`BillingSoon`]})))()}s();export{a as BillingSoon,i as Default,o as __namedExportsOrder,r as default};