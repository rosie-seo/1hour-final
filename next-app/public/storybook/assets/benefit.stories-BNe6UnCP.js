import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,n as r,r as i,t as a}from"./benefit-DD2i49MH.js";import{c as o,p as s}from"./billing-data-B--8EKnR.js";var c,l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{o(),n(),c=t(),l=s[0],u=s[2],d={title:`MyPage/혜택`,parameters:{layout:`padded`,docs:{description:{component:`할인은 단일 숫자가 아니라 **출처가 있는 항목**들의 합이다. 같은 12만원이라도 '친구 초대로 받은 할인'과 '기존 수강생이라 받은 할인'은 사용자에게 전혀 다른 의미이므로, 금액이 아니라 이유를 화면에 남긴다.`}}},tags:[`autodocs`]},f={name:`배지`,render:()=>(0,c.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,c.jsx)(a,{label:`친구 초대 할인`,amount:12e4,type:`referral`}),(0,c.jsx)(a,{label:`기사용자 혜택`,amount:1e4,type:`loyalty`})]})},p={name:`혜택 패널 · 분할 적용`,render:()=>(0,c.jsx)(`div`,{className:`max-w-md`,children:(0,c.jsx)(r,{sub:l})})},m={name:`혜택 패널 · 1회 적용`,render:()=>(0,c.jsx)(`div`,{className:`max-w-md`,children:(0,c.jsx)(r,{sub:u})})},h={name:`할인 분해`,render:()=>(0,c.jsx)(`div`,{className:`max-w-md`,children:(0,c.jsx)(i,{transaction:u.transactions[0]})})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: "배지",
  render: () => <div className="flex flex-wrap gap-2">
      <BenefitBadge label="친구 초대 할인" amount={120000} type="referral" />
      <BenefitBadge label="기사용자 혜택" amount={10000} type="loyalty" />
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: "혜택 패널 · 분할 적용",
  render: () => <div className="max-w-md">
      <BenefitPanel sub={installment} />
    </div>
}`,...p.parameters?.docs?.source},description:{story:`분할 적용 혜택 — 남은 양이 곧 "지금 해지하면 잃는 것"이라 게이지로 보여준다`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: "혜택 패널 · 1회 적용",
  render: () => <div className="max-w-md">
      <BenefitPanel sub={once} />
    </div>
}`,...m.parameters?.docs?.source},description:{story:`1회 적용 혜택 — 게이지 없이 적용 시점만`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: "할인 분해",
  render: () => <div className="max-w-md">
      <DiscountBreakdown transaction={once.transactions[0]} />
    </div>
}`,...h.parameters?.docs?.source},description:{story:`정가 → 할인 항목 → 결제 금액 분해`,...h.parameters?.docs?.description}}},g=[`Badges`,`PanelInstallment`,`PanelOnce`,`Breakdown`]})))()}_();export{f as Badges,h as Breakdown,p as PanelInstallment,m as PanelOnce,g as __namedExportsOrder,d as default};