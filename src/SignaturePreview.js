import React from "react";

// Chrome strips out inline vendor prefixes so we're stuck 'dangerously' setting innerHTML
// see https://github.com/facebook/react/issues/14200

// original HTML from agency in ./pp-email-sig.html
// see below for more readable format!

const agencyHTML = `<table cellpadding=0 cellspacing=0 style="mso-table-lspace:0;mso-table-rspace:0;border-collapse:collapse;border-spacing:0;padding:0;margin:0;width:270px;background-repeat:repeat;background-position:center top"width=270 class=es-wrapper><tr style=border-collapse:collapse><td style=padding:0;margin:0 valign=top><table cellpadding=0 cellspacing=0 style="mso-table-lspace:0;mso-table-rspace:0;border-collapse:collapse;border-spacing:0;table-layout:fixed!important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"class=es-header align=center><tr style=border-collapse:collapse><td style=padding:0;margin:0 align=left><table cellpadding=0 cellspacing=0 style=mso-table-lspace:0;mso-table-rspace:0;border-collapse:collapse;border-spacing:0;background-color:#FFF width=270 class=es-header-body align=left bgcolor=#ffffff><tr style=border-collapse:collapse><td style=padding:0;margin:0 align=left><table cellpadding=0 cellspacing=0 style=mso-table-lspace:0;mso-table-rspace:0;border-collapse:collapse;border-spacing:0 width=100%><tr style=border-collapse:collapse><td style=padding:0;margin:0 align=center valign=top width=270 class=es-m-p0r><table cellpadding=0 cellspacing=0 style=mso-table-lspace:0;mso-table-rspace:0;border-collapse:collapse;border-spacing:0 width=100%><tr style=border-collapse:collapse><td style=padding:0;margin:0;padding-bottom:10px align=left class=es-m-txt-l><img alt=""src=$CDN_LOGO_PATH$ style=display:block;border:0;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic width=22><tr style=border-collapse:collapse><td style=padding:0;margin:0 align=left><p style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:'Century Gothic','Helvetica Neue',Helvetica,Arial,sans-serif;line-height:27px;color:#3F4F53"><strong>$INSERT_NAME$</strong><tr style=border-collapse:collapse><td style=padding:0;margin:0;padding-top:5px;padding-bottom:5px align=left><table cellpadding=0 cellspacing=0 style=width:100%!important width=100% border=0><tr><td style=background-color:#B0DFDE;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;mso-line-height-rule:exactly;line-height:1px align=left valign=top width=270px height=1><!--[if gte mso 15]><![endif]--></table><tr style=border-collapse:collapse><td style=padding:0;margin:0 align=left><p style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'Century Gothic','Helvetica Neue',Helvetica,Arial,sans-serif;line-height:24px;color:#3F4F53">Private Prep<tr style=border-collapse:collapse><td style=padding:0;margin:0 align=left><p style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'Century Gothic','Helvetica Neue',Helvetica,Arial,sans-serif;line-height:26px;color:#3F4F53">$TITLE$<tr style=border-collapse:collapse><td style=padding:0;margin:0;padding-bottom:10px align=left>$PHONES$<tr style=border-collapse:collapse><td style=padding:0;margin:0;padding-bottom:5px align=left><table cellpadding=0 cellspacing=0 style=width:100%!important width=100% border=0><tr><td style=background-color:#B0DFDE;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;mso-line-height-rule:exactly;line-height:1px align=left valign=top width=270px height=1><!--[if gte mso 15]><![endif]--></table><tr style=border-collapse:collapse><td style=padding:0;margin:0;padding-top:5px;padding-bottom:10px align=left class=es-m-txt-l><p style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:8px!important;font-family:'Century Gothic','Helvetica Neue',Helvetica,Arial,sans-serif;line-height:8px;color:#3F4F53;letter-spacing:1px;white-space:nowrap">TEST PREP | SUBJECT TUTORING | COLLEGE ADMISSIONS<tr style=border-collapse:collapse><td style=padding:0;margin:0 align=left></table></table></table></table></table>`
const CDN_LOGO_PATH =
  "https://isrxo.stripocdn.email/content/guids/CABINET_dfa2ad0d24e819202a7df94b6dc8a4e7/images/78731552557056196.gif";

const buildPhoneMarkup = ({ number, type, note }) => {
  const href = `tel:${number.split(".").join("-")}`
  const linkBody = `${!!type ? `${type} ` : ""}${number}${!!note ? ` ${note}` : ""}`

  return `<a href="${href}" rel="nofollow" style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'Century Gothic','Helvetica Neue',Helvetica,Arial,sans-serif;line-height:24px;color:#3F4F53;display:block;text-decoration:none"><strong>${linkBody}</strong></a>`
}

const SignaturePreview = ({ name, title, phones }) => {
  let htmlPreview = agencyHTML;
  htmlPreview = htmlPreview.replace('$CDN_LOGO_PATH$', CDN_LOGO_PATH);
  htmlPreview = htmlPreview.replace('$INSERT_NAME$', name);
  htmlPreview = htmlPreview.replace('$TITLE$', title);
  htmlPreview = htmlPreview.replace('$PHONES$', phones.map(buildPhoneMarkup).join(''));

  return <div id="SignaturePreview" dangerouslySetInnerHTML={{ __html: htmlPreview }}></div>
}

// essential shape
//   <table
//     cellPadding={0}
//     cellSpacing={0}
//     style={{
//       MsoTableLspace: 0,
//       MsoTableRspace: 0,
//       borderCollapse: "collapse",
//       borderSpacing: 0,
//       padding: 0,
//       margin: 0,
//       width: "270px",
//       backgroundRepeat: "repeat",
//       backgroundPosition: "center top",
//     }}
//     width={270}
//     className="es-wrapper"
//   >
//     <tbody>
//       <tr style={{ borderCollapse: "collapse" }}>
//         <td valign="top" style={{ padding: 0, margin: "0" }}>
//           <table
//             cellPadding={0}
//             cellSpacing={0}
//             style={{
//               MsoTableLspace: 0,
//               MsoTableRspace: 0,
//               borderCollapse: "collapse",
//               borderSpacing: 0,
//               tableLayout: "fixed", // removed !important!
//               width: "100%",
//               backgroundColor: "transparent",
//               backgroundRepeat: "repeat",
//               backgroundPosition: "center top",
//             }}
//             className="es-header"
//             align="center"
//           >
//             <tbody>
//               <tr style={{ borderCollapse: "collapse" }}>
//                 <td style={{ padding: 0, margin: 0 }} align="left">
//                   <table
//                     cellPadding={0}
//                     cellSpacing={0}
//                     style={{
//                       MsoTableLspace: 0,
//                       MsoTableRspace: 0,
//                       borderCollapse: "collapse",
//                       borderSpacing: 0,
//                       backgroundColor: "#FFF",
//                     }}
//                     width={270}
//                     className="es-header-body"
//                     align="left"
//                     bgcolor="#ffffff"
//                   >
//                     <tbody>
//                       <tr style={{ borderCollapse: "collapse" }}>
//                         <td style={{ padding: 0, margin: 0 }} align="left">
//                           <table
//                             cellPadding={0}
//                             cellSpacing={0}
//                             style={{
//                               MsoTableLspace: 0,
//                               MsoTableRspace: 0,
//                               borderCollapse: "collapse",
//                               borderSpacing: 0,
//                             }}
//                             width="100%"
//                           >
//                             <tbody>
//                               <tr style={{ borderCollapse: "collapse" }}>
//                                 <td
//                                   style={{ padding: 0, margin: 0 }}
//                                   align="center"
//                                   valign="top"
//                                   width={270}
//                                   className="es-m-p0r"
//                                 >
//                                   <table
//                                     cellPadding={0}
//                                     cellSpacing={0}
//                                     style={{
//                                       MsoTableLspace: 0,
//                                       MsoTableRspace: 0,
//                                       borderCollapse: "collapse",
//                                       borderSpacing: 0,
//                                     }}
//                                     width="100%"
//                                   >
//                                     <tbody>
//                                       <tr
//                                         style={{ borderCollapse: "collapse" }}
//                                       >
//                                         <td
//                                           style={{
//                                             padding: 0,
//                                             margin: 0,
//                                             paddingBottom: "10px",
//                                           }}
//                                           align="left"
//                                           className="es-m-txt-l"
//                                         >
//                                           <img
//                                             alt="Private Prep Logo"
//                                             src={CDN_LOGO_PATH}
//                                             style={{
//                                               display: "block",
//                                               border: 0,
//                                               outline: 0,
//                                               textDecoration: "none",
//                                               msInterpolationMode: "bicubic",
//                                             }}
//                                             width={22}
//                                           />
//                                         </td>
//                                       </tr>
//                                       <tr
//                                         style={{ borderCollapse: "collapse" }}
//                                       >
//                                         <td
//                                           style={{ padding: 0, margin: 0 }}
//                                           align="left"
//                                         >
//                                           <p
//                                             style={{
//                                               margin: 0,
//                                               WebkitTextSizeAdjust: "none",
//                                               MsTextSizeAdjust: "none",
//                                               MsoLineHeightRule: "exactly",
//                                               fontSize: "16px",
//                                               fontFamily:
//                                                 '"Century Gothic","Helvetica Neue",Helvetica,Arial,sans-serif',
//                                               lineHeight: "27px",
//                                               color: "#3F4F53",
//                                             }}
//                                           >
//                                             <strong>{name}</strong>
//                                           </p>
//                                         </td>
//                                       </tr>
//                                       <tr
//                                         style={{ borderCollapse: "collapse" }}
//                                       >
//                                         <td
//                                           style={{
//                                             padding: 0,
//                                             margin: 0,
//                                             paddingTop: "5px",
//                                             paddingBottom: "5px",
//                                           }}
//                                           align="left"
//                                         >
//                                           <table
//                                             cellPadding={0}
//                                             cellSpacing={0}
//                                             style={{ width: "100%!important" }}
//                                             width="100%"
//                                             border={0}
//                                           >
//                                             <tbody>
//                                               <tr>
//                                                 <td
//                                                   style={{
//                                                     backgroundColor: "#B0DFDE",
//                                                     borderCollapse: "collapse",
//                                                     MsoTableLspace: 0,
//                                                     MsoTableRspace: 0,
//                                                     MsoLineHeightRule:
//                                                       "exactly",
//                                                     lineHeight: "1px",
//                                                   }}
//                                                   align="left"
//                                                   valign="top"
//                                                   width="270px"
//                                                   height={1}
//                                                 />
//                                               </tr>
//                                             </tbody>
//                                           </table>
//                                         </td>
//                                       </tr>
//                                       <tr
//                                         style={{ borderCollapse: "collapse" }}
//                                       >
//                                         <td
//                                           style={{ padding: 0, margin: 0 }}
//                                           align="left"
//                                         >
//                                           <p
//                                             style={{
//                                               margin: 0,
//                                               WebkitTextSizeAdjust: "none",
//                                               MsTextSizeAdjust: "none",
//                                               MsoLineHeightRule: "exactly",
//                                               fontSize: "14px",
//                                               fontFamily:
//                                                 '"Century Gothic","Helvetica Neue",Helvetica,Arial,sans-serif',
//                                               lineHeight: "24px",
//                                               color: "#3F4F53",
//                                             }}
//                                           >
//                                             Private Prep
//                                           </p>
//                                         </td>
//                                       </tr>
//                                       <tr
//                                         style={{ borderCollapse: "collapse" }}
//                                       >
//                                         <td
//                                           style={{ padding: 0, margin: 0 }}
//                                           align="left"
//                                         >
//                                           <p
//                                             style={{
//                                               margin: 0,
//                                               WebkitTextSizeAdjust: "none",
//                                               MsTextSizeAdjust: "none",
//                                               MsoLineHeightRule: "exactly",
//                                               fontSize: "14px",
//                                               fontFamily:
//                                                 '"Century Gothic","Helvetica Neue",Helvetica,Arial,sans-serif',
//                                               lineHeight: "26px",
//                                               color: "#3F4F53",
//                                             }}
//                                           >
//                                             {title}
//                                           </p>
//                                         </td>
//                                       </tr>
//                                       {!!phones.length && (
//                                         <tr
//                                           style={{ borderCollapse: "collapse" }}
//                                         >
//                                           <td
//                                             style={{
//                                               padding: 0,
//                                               margin: 0,
//                                               paddingBottom: "10px",
//                                             }}
//                                             align="left"
//                                           >
//                                             {phones.map(
//                                               ({ type, number, note }, phoneIndex) => (
//                                                 <a
//                                                   key={phoneIndex}
//                                                   rel="nofollow"
//                                                   href={`tel:${number.split(".").join("-")}`}
//                                                   style={{
//                                                     margin: 0,
//                                                     WebkitTextSizeAdjust:
//                                                       "none",
//                                                     MsTextSizeAdjust: "none",
//                                                     MsoLineHeightRule:
//                                                       "exactly",
//                                                     fontSize: "14px",
//                                                     fontFamily:
//                                                       '"Century Gothic","Helvetica Neue",Helvetica,Arial,sans-serif',
//                                                     lineHeight: "24px",
//                                                     color: "#3F4F53",
//                                                     display: "block",
//                                                     textDecoration: "none"
//                                                   }}
//                                                 >
//                                                   <strong>{`${!!type ? `${type} ` : ""}${number}${!!note ? ` ${note}` : ""}`}</strong>
//                                                 </a>
//                                               )
//                                             )}
//                                           </td>
//                                         </tr>
//                                       )}
//                                       <tr
//                                         style={{ borderCollapse: "collapse" }}
//                                       >
//                                         <td
//                                           style={{
//                                             padding: 0,
//                                             margin: 0,
//                                             paddingBottom: "5px",
//                                           }}
//                                           align="left"
//                                         >
//                                           <table
//                                             cellPadding={0}
//                                             cellSpacing={0}
//                                             style={{ width: "100%!important" }}
//                                             width="100%"
//                                             border={0}
//                                           >
//                                             <tbody>
//                                               <tr>
//                                                 <td
//                                                   style={{
//                                                     backgroundColor: "#B0DFDE",
//                                                     borderCollapse: "collapse",
//                                                     MsoTableLspace: 0,
//                                                     MsoTableRspace: 0,
//                                                     MsoLineHeightRule:
//                                                       "exactly",
//                                                     lineHeight: "1px",
//                                                   }}
//                                                   align="left"
//                                                   valign="top"
//                                                   width="270px"
//                                                   height={1}
//                                                 />
//                                               </tr>
//                                             </tbody>
//                                           </table>
//                                         </td>
//                                       </tr>
//                                       <tr
//                                         style={{ borderCollapse: "collapse" }}
//                                       >
//                                         <td
//                                           style={{
//                                             padding: 0,
//                                             margin: 0,
//                                             paddingTop: "5px",
//                                             paddingBottom: "10px",
//                                           }}
//                                           align="left"
//                                           className="es-m-txt-l"
//                                         >
//                                           <p
//                                             style={{
//                                               margin: 0,
//                                               WebkitTextSizeAdjust: "none",
//                                               MsTextSizeAdjust: "none",
//                                               MsoLineHeightRule: "exactly",
//                                               fontSize: "8px", // removed !important!
//                                               fontFamily:
//                                                 '"Century Gothic","Helvetica Neue",Helvetica,Arial,sans-serif',
//                                               lineHeight: "8px",
//                                               color: "#3F4F53",
//                                               letterSpacing: "1px",
//                                               whiteSpace: "nowrap",
//                                             }}
//                                           >
//                                             TEST PREP | SUBJECT TUTORING |
//                                             COLLEGE ADMISSIONS
//                                           </p>
//                                         </td>
//                                       </tr>
//                                       <tr
//                                         style={{ borderCollapse: "collapse" }}
//                                       >
//                                         <td
//                                           style={{ padding: 0, margin: 0 }}
//                                           align="left"
//                                         />
//                                       </tr>
//                                     </tbody>
//                                   </table>
//                                 </td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </td>
//       </tr>
//     </tbody>
//   </table>
// );

export default SignaturePreview;
