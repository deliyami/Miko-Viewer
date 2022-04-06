//  Stacking Contexts
//  position: absolute or position: relative and z-index   > auto
//  with opacity < 1
//  flexbox or grid  > auto
// zIndex는 가능한 안 쓰는 편이 좋음.
// LINK https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
// LINK https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

//  React's Portals , 기본 document.body

export const zIndices = {
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
};
