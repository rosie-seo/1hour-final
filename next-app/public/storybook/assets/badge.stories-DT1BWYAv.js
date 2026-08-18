import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./badge-BHcvqZIy.js";var i,a,o,s,c;function l(){return(l=e((()=>{n(),i=t(),a={title:`UI/Badge`,component:r,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`default`,`secondary`,`destructive`,`outline`,`ghost`,`link`]}},args:{children:`Badge`}},o={args:{variant:`default`}},s={render:e=>(0,i.jsx)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[`default`,`secondary`,`destructive`,`outline`,`ghost`,`link`].map(t=>(0,i.jsx)(r,{...e,variant:t,children:t},t))})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "default"
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-wrap items-center gap-2">
      {(["default", "secondary", "destructive", "outline", "ghost", "link"] as const).map(variant => <Badge key={variant} {...args} variant={variant}>
          {variant}
        </Badge>)}
    </div>
}`,...s.parameters?.docs?.source}}},c=[`Playground`,`AllVariants`]})))()}l();export{s as AllVariants,o as Playground,c as __namedExportsOrder,a as default};