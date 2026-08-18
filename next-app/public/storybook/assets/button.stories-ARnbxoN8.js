import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./heart-CFYL7Ltx.js";import{r as i,t as a}from"./button-cxtVKLL0.js";var o,s,c,l,u,d,f;function p(){return(p=e((()=>{n(),i(),o=t(),s={title:`UI/Button`,component:a,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`default`,`outline`,`secondary`,`ghost`,`destructive`,`link`]},size:{control:`select`,options:[`default`,`xs`,`sm`,`lg`,`icon`,`icon-xs`,`icon-sm`,`icon-lg`]}},args:{children:`Button`}},c={args:{variant:`default`,size:`default`}},l={render:e=>(0,o.jsx)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[`default`,`outline`,`secondary`,`ghost`,`destructive`,`link`].map(t=>(0,o.jsx)(a,{...e,variant:t,children:t},t))})},u={render:e=>(0,o.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[[`xs`,`sm`,`default`,`lg`].map(t=>(0,o.jsx)(a,{...e,size:t,children:t},t)),(0,o.jsx)(a,{...e,size:`icon`,"aria-label":`좋아요`,children:(0,o.jsx)(r,{})})]})},d={args:{children:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r,{}),`응원하기`]})}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "default",
    size: "default"
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-wrap items-center gap-3">
      {(["default", "outline", "secondary", "ghost", "destructive", "link"] as const).map(variant => <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>)}
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-wrap items-center gap-3">
      {(["xs", "sm", "default", "lg"] as const).map(size => <Button key={size} {...args} size={size}>
          {size}
        </Button>)}
      <Button {...args} size="icon" aria-label="좋아요">
        <Heart />
      </Button>
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: <>
        <Heart />
        응원하기
      </>
  }
}`,...d.parameters?.docs?.source}}},f=[`Playground`,`AllVariants`,`AllSizes`,`WithIcon`]})))()}p();export{u as AllSizes,l as AllVariants,c as Playground,d as WithIcon,f as __namedExportsOrder,s as default};