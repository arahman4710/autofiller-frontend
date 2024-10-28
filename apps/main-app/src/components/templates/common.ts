import { Font, StyleSheet } from '@react-pdf/renderer'

/**
 * Google fonts are added by going here: https://developers.google.com/fonts/docs/developer_api?apix_params=%7B%22family%22%3A%5B%22PT%20Serif%22%5D%2C%22sort%22%3A%22ALPHA%22%7D
 * and querying the font you want to use. Then copy the links under the "files" field. Be sure to replace `http` with `https`.
 */

Font.register({
  family: 'PT Serif',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/ptserif/v18/EJRVQgYoZZY2vCFuvDFRxL6ddjb-.ttf',
    },
    {
      fontStyle: 'italic',
      src: 'https://fonts.gstatic.com/s/ptserif/v18/EJRTQgYoZZY2vCFuvAFTzrq_cyb-vco.ttf',
    },
    {
      fontWeight: 700,
      src: 'https://fonts.gstatic.com/s/ptserif/v18/EJRSQgYoZZY2vCFuvAnt65qVXSr3pNNB.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: 'https://fonts.gstatic.com/s/ptserif/v18/EJRQQgYoZZY2vCFuvAFT9gaQVy7VocNB6Iw.ttf',
    },
  ],
})

Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: '/fonts/OpenSans-Regular.ttf',
    },
    {
      fontStyle: 'italic',
      src: '/fonts/OpenSans-Italic.ttf',
    },
    {
      fontWeight: 700,
      src: '/fonts/OpenSans-Bold.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: '/fonts/OpenSans-BoldItalic.ttf',
    },
  ],
})

Font.register({
  family: 'Merriweather',
  fonts: [
    {
      src: '/fonts/Merriweather-Regular.ttf',
    },
    {
      fontStyle: 'italic',
      src: '/fonts/Merriweather-Italic.ttf',
    },
    {
      fontWeight: 700,
      src: '/fonts/Merriweather-Bold.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: '/fonts/Merriweather-BoldItalic.ttf',
    },
  ],
})

export const spacing = {
  lg: 16,
  md: 12,
  sm: 8,
  xl: 20,
  xs: 4,
  xxs: 2,
}

/**
 * Avoid using non-native style properties like marginHorizontal, marginVertical, etc. as they are not supported when Document is
 * not rendered in a PDF Viewer.
 */

export const common = StyleSheet.create({
  _MerriweatherFontFamily: {
    fontFamily: 'Merriweather',
  },
  _OpenSansFontFamily: {
    fontFamily: 'Open Sans',
  },
  _PTSerifFontFamily: {
    fontFamily: 'PT Serif',
  },
  bold: {
    fontWeight: 'bold',
  },
  center: {
    itemsAlign: 'center',
    justifyContent: 'center',
  },
  columnGapXs: {
    columnGap: spacing.xs,
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  gapLg: {
    gap: spacing.lg,
  },
  gapMd: {
    gap: spacing.md,
  },
  gapSm: {
    gap: spacing.sm,
  },
  gapXl: {
    gap: spacing.xl,
  },
  gapXs: {
    gap: spacing.xs,
  },
  gapXxs: {
    gap: spacing.xxs,
  },
  justifyBetween: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  lightSubheader: {
    color: '#525252',
  },
  marginXLg: {
    marginLeft: spacing.lg,
    marginRight: spacing.lg,
  },
  marginXMd: {
    marginLeft: spacing.md,
    marginRight: spacing.md,
  },
  marginXSm: {
    marginLeft: spacing.sm,
    marginRight: spacing.sm,
  },
  marginYLg: {
    marginBottom: spacing.lg,
    marginTop: spacing.lg,
  },
  marginYMd: {
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  marginYSm: {
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  paddingXLg: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
  },
  paddingXMd: {
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
  },
  paddingXSm: {
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
  },
  paddingYLg: {
    paddingBottom: spacing.lg,
    paddingTop: spacing.lg,
  },
  paddingYMd: {
    paddingBottom: spacing.md,
    paddingTop: spacing.md,
  },
  paddingYSm: {
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
  },
  textCenter: {
    textAlign: 'center',
  },
})
