import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./check-BpuNGwA0.js";import{a as i,i as a,n as o,o as s,r as c,t as l}from"./avatar-BZ5ipEhh.js";var u,d,f,p,m,h,g;function _(){return(_=e((()=>{n(),s(),u=t(),d={title:`UI/Avatar`,component:l,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`default`,`sm`,`lg`]}}},f={args:{size:`default`},render:e=>(0,u.jsx)(l,{...e,children:(0,u.jsx)(c,{className:`bg-primary/15 font-bold text-primary`,children:`김`})})},p={render:()=>(0,u.jsx)(`div`,{className:`flex items-center gap-3`,children:[`sm`,`default`,`lg`].map(e=>(0,u.jsx)(l,{size:e,children:(0,u.jsx)(c,{className:`bg-primary/15 font-bold text-primary`,children:`김`})},e))})},m={render:()=>(0,u.jsxs)(l,{size:`lg`,children:[(0,u.jsx)(c,{className:`bg-primary/15 font-bold text-primary`,children:`김`}),(0,u.jsx)(o,{children:(0,u.jsx)(r,{className:`size-2 text-primary-foreground`})})]})},h={render:()=>(0,u.jsxs)(a,{children:[(0,u.jsx)(l,{children:(0,u.jsx)(c,{className:`bg-primary/15 font-bold text-primary`,children:`김`})}),(0,u.jsx)(l,{children:(0,u.jsx)(c,{className:`bg-secondary font-bold`,children:`이`})}),(0,u.jsx)(l,{children:(0,u.jsx)(c,{className:`bg-muted font-bold`,children:`박`})}),(0,u.jsx)(i,{children:`+3`})]})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    size: "default"
  },
  render: args => <Avatar {...args}>
      <AvatarFallback className="bg-primary/15 font-bold text-primary">
        김
      </AvatarFallback>
    </Avatar>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      {(["sm", "default", "lg"] as const).map(size => <Avatar key={size} size={size}>
          <AvatarFallback className="bg-primary/15 font-bold text-primary">
            김
          </AvatarFallback>
        </Avatar>)}
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Avatar size="lg">
      <AvatarFallback className="bg-primary/15 font-bold text-primary">
        김
      </AvatarFallback>
      <AvatarBadge>
        <Check className="size-2 text-primary-foreground" />
      </AvatarBadge>
    </Avatar>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <AvatarGroup>
      <Avatar>
        <AvatarFallback className="bg-primary/15 font-bold text-primary">
          김
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-secondary font-bold">이</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-muted font-bold">박</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
}`,...h.parameters?.docs?.source}}},g=[`Playground`,`AllSizes`,`WithBadge`,`Group`]})))()}_();export{p as AllSizes,h as Group,f as Playground,m as WithBadge,g as __namedExportsOrder,d as default};