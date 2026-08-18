import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,r as a,t as o}from"./accordion-NujmwbM7.js";var s,c,l,u,d,f;function p(){return(p=e((()=>{n(),s=t(),c={title:`UI/Accordion`,component:o,parameters:{layout:`centered`},tags:[`autodocs`]},l=[{question:`스마트폰으로만 공부가 가능한가요?`,answer:`PC, 태블릿, 스마트폰 등 인터넷 접속이 가능한 기기에서는 대부분 공부가 가능합니다.`},{question:`커리큘럼은 어떻게 되나요?`,answer:`1개월 기준, 총 20일 분량의 커리큘럼이 순차적으로 제공됩니다.`},{question:`할부 결제가 가능한가요?`,answer:`7개 카드사 무이자 할부를 지원합니다.`}],u={render:()=>(0,s.jsx)(o,{defaultValue:[0],className:`w-96 rounded-2xl border border-border bg-card px-4`,children:l.map((e,t)=>(0,s.jsxs)(a,{value:t,children:[(0,s.jsx)(r,{children:e.question}),(0,s.jsx)(i,{className:`text-muted-foreground`,children:e.answer})]},e.question))})},d={render:()=>(0,s.jsx)(o,{multiple:!0,defaultValue:[0,1],className:`w-96 rounded-2xl border border-border bg-card px-4`,children:l.map((e,t)=>(0,s.jsxs)(a,{value:t,children:[(0,s.jsx)(r,{children:e.question}),(0,s.jsx)(i,{className:`text-muted-foreground`,children:e.answer})]},e.question))})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Accordion defaultValue={[0]} className="w-96 rounded-2xl border border-border bg-card px-4">
      {faqs.map((item, index) => <AccordionItem key={item.question} value={index}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>)}
    </Accordion>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Accordion multiple defaultValue={[0, 1]} className="w-96 rounded-2xl border border-border bg-card px-4">
      {faqs.map((item, index) => <AccordionItem key={item.question} value={index}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>)}
    </Accordion>
}`,...d.parameters?.docs?.source}}},f=[`Default`,`Multiple`]})))()}p();export{u as Default,d as Multiple,f as __namedExportsOrder,c as default};