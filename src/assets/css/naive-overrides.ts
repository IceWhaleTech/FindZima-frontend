import type { GlobalThemeOverrides } from 'naive-ui';
  /**
   * Use this for type hints under js file
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const themeOverrides: GlobalThemeOverrides = {
    common: {
      fontFamily: "'BrittiSans'",
      primaryColor: '#0057FF',
      primaryColorHover: '#0047DB',
      primaryColorPressed: '#0047DB',
      primaryColorSuppl: '#0047DB',
    },
    Button: {
      paddingMedium: '0 6px',
      paddingLarge: '0 6px',
      borderRadiusSmall: '10px',
      borderRadiusMedium: '12px',
      borderRadiusLarge: '14px',
      borderRadiusHuge: '16px',
      rippleDuration: 0,        // 设置波纹持续时间为0
      rippleColor: 'transparent', // 波纹颜色设置为透明
    },
    Modal: {
      borderRadius: '40px'
    },
  }
  export default themeOverrides;