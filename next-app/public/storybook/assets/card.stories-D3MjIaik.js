import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{d as t}from"./iframe-CUVXqZxX.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./utils-Dm4OyE3Q.js";import{r as a,t as o}from"./button-cxtVKLL0.js";import{n as s,t as c}from"./badge-BHcvqZIy.js";function l({className:e,size:t=`default`,...n}){return(0,g.jsx)(`div`,{"data-slot":`card`,"data-size":t,className:i(`group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl`,e),...n})}function u({className:e,...t}){return(0,g.jsx)(`div`,{"data-slot":`card-header`,className:i(`group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)`,e),...t})}function d({className:e,...t}){return(0,g.jsx)(`div`,{"data-slot":`card-title`,className:i(`font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm`,e),...t})}function f({className:e,...t}){return(0,g.jsx)(`div`,{"data-slot":`card-description`,className:i(`text-sm text-muted-foreground`,e),...t})}function p({className:e,...t}){return(0,g.jsx)(`div`,{"data-slot":`card-action`,className:i(`col-start-2 row-span-2 row-start-1 self-start justify-self-end`,e),...t})}function m({className:e,...t}){return(0,g.jsx)(`div`,{"data-slot":`card-content`,className:i(`px-(--card-spacing)`,e),...t})}function h({className:e,...t}){return(0,g.jsx)(`div`,{"data-slot":`card-footer`,className:i(`flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)`,e),...t})}var g;function _(){return(_=e((()=>{t(),r(),g=n(),l.__docgenInfo={description:``,methods:[],displayName:`Card`,props:{size:{required:!1,tsType:{name:`union`,raw:`"default" | "sm"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"sm"`}]},description:``,defaultValue:{value:`"default"`,computed:!1}}}},u.__docgenInfo={description:``,methods:[],displayName:`CardHeader`},h.__docgenInfo={description:``,methods:[],displayName:`CardFooter`},d.__docgenInfo={description:``,methods:[],displayName:`CardTitle`},p.__docgenInfo={description:``,methods:[],displayName:`CardAction`},f.__docgenInfo={description:``,methods:[],displayName:`CardDescription`},m.__docgenInfo={description:``,methods:[],displayName:`CardContent`}})))()}var v,y,b,x,S;function C(){return(C=e((()=>{s(),a(),_(),v=n(),y={title:`UI/Card`,component:l,parameters:{layout:`centered`},tags:[`autodocs`]},b={render:()=>(0,v.jsxs)(l,{className:`w-80`,children:[(0,v.jsxs)(u,{children:[(0,v.jsx)(d,{children:`캘리쌤의 영어 챌린지`}),(0,v.jsx)(f,{children:`매일 30분으로 끝내는 국내 어학연수!`}),(0,v.jsx)(p,{children:(0,v.jsx)(c,{variant:`destructive`,children:`60% 할인`})})]}),(0,v.jsx)(m,{children:(0,v.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`캘리쌤의 실제 브이로그로 상황을 익히고, 매일 듣고 말하며 피드백을 받는 스피킹 전용 챌린지입니다.`})}),(0,v.jsx)(h,{children:(0,v.jsx)(o,{className:`w-full`,children:`지금 결제하고 시작하기`})})]})},x={render:()=>(0,v.jsxs)(l,{className:`w-80`,children:[(0,v.jsxs)(u,{children:[(0,v.jsx)(d,{children:`연속 수강일`}),(0,v.jsx)(f,{children:`현재 연속 수강일`})]}),(0,v.jsx)(m,{children:(0,v.jsx)(`p`,{className:`font-heading text-2xl font-black`,children:`0일`})})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-80">
      <CardHeader>
        <CardTitle>캘리쌤의 영어 챌린지</CardTitle>
        <CardDescription>매일 30분으로 끝내는 국내 어학연수!</CardDescription>
        <CardAction>
          <Badge variant="destructive">60% 할인</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          캘리쌤의 실제 브이로그로 상황을 익히고, 매일 듣고 말하며 피드백을 받는
          스피킹 전용 챌린지입니다.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">지금 결제하고 시작하기</Button>
      </CardFooter>
    </Card>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-80">
      <CardHeader>
        <CardTitle>연속 수강일</CardTitle>
        <CardDescription>현재 연속 수강일</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-heading text-2xl font-black">0일</p>
      </CardContent>
    </Card>
}`,...x.parameters?.docs?.source}}},S=[`Default`,`WithoutFooter`]})))()}C();export{b as Default,x as WithoutFooter,S as __namedExportsOrder,y as default};