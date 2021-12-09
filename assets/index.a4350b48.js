import { o as openBlock, c as createElementBlock, r as renderSlot, a as createBaseVNode, b as createVNode, w as withCtx, d as createStaticVNode, e as createTextVNode, p as pushScopeId, f as popScopeId, g as onMounted, G as Glide, h as GLightbox, t as toDisplayString, F as Fragment, i as renderList, n as normalizeClass, j as createCommentVNode, k as createApp } from "./vendor.41a0d35c.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
var _imports_0$4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH2SURBVHgB7ZZPKARRHMd/s0Qk4SZiSSmlUHIjyVVIHEk5Kq7Knzhx4sRBcXNT5GxZeyCRHKS2NZtNZNNuDpukfr5vZybT7Oyfmd0dl/3UZ367896832923r55RAUchpkH4Rk8Ed+LDY3NkiQ9kU1wfRXCKOyEFfADejHmMdqG8HkB9qjdH40Xr7LCNNlLPgcjbM6XyblJ/cVuXcO7eidWkq+wNWTjAOOGDkcWkk+xdc7hLpzVBlk26bSaYQEy28fvUsf5MRl7ER3W0iSfQHCTfTa0gcZSVHkD3UkK2GH7PIgxXPjQhvgCo0mq7IIy+u2ZFNJK9lkXB7EOXMNyMn8MeqaEKMKL6IFX0NK/xUCDVkAYNpJhUUpBr2q21IqDmIQH9D+UaQVswU9ynvicc2GdfkNcJucJxwsQBxSxibBCznKfcAYzfAQ+szPUGpPXQR87w6WW16WrIQbbyRm2EwrAPIgg9MEg5ZcQPE0oQC3iDqEf7lP+2EWeUNperGxSxMsmwLlDhhJZgZXNSoyz5xs2GccvVpOIl0oRLIGlpLzlxMZymP42kdkyj59eNrvDAc4/S0nLQmMLDHJ+ELvkGUoHKxNuj3OLh02eeSaFzMALtoe440PYl2lOKUUx1QgdsJuUFbIe1sBKXbdXGIB+6IO3mGhRKmCBX/yj0UI2HyoGAAAAAElFTkSuQmCC";
var _imports_1$3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIaSURBVHgB7ZZNKAVRFMfPoJRSPosUjySKYkHKwltYkWysJHaUIhtZChs2PrYKyU5JykJRZKNYKBRWXr5TQiGid/2PmdE07twZL++h3r9+77x33//cOffM7c4QRfVfJIRIAikefD6QSD8hTOQHI2Bf6Nr1kHNseLfAKKhS+TXJBEkI3aADpEtypkAcyDKiMMavwRtokuQEwACY0zTtkVxWMCHCpyFSdQCGQoQDCp+4W6XowuetjLEZ5ii84gWPS//B6htF5OQ3r2vtQCdFTn3ml489gIoKEI4ossrEXrgyO9BDkVc7f5gF1HhIEORdQQ+eho8C0P4SRJ/CGAB+tIuLzQWLCu8sSIY3FrHWyHVSGa6dwfe/3WXHlliz8DsBnEh8x/YrCP0oV6mFV1WhqPIIq9mzDuD3E8K8xDtpH4B3HeGCFF3gAvIUhleH8TvJ2IOD95mclcMF5CsMeUJ/ONlVKRmrtQ8g10fqBRazKehyn2Zsk3YpvG0WH++VBZe5zzT+JHcFwAbIBn4X7yo4BfUgzcX74rWAcCkYQ7+rBy7gTmHYAYcUutZJfRjdcAG94NLBEE/6qxmfFWNgm9TiV7JNMAj4XbAf3Dt4b8l8Bgn9TXZasVuXzCx8jwfloAY0g1ZQBwp551t8y4r5pkDql5KMiVckCS30TQn5Eb8Gqr0kFxkdOedIIcq44C0Y5sVRKBLyk9BzLtAoqr+sd/dI0wPnyVVoAAAAAElFTkSuQmCC";
var _imports_2$2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH6SURBVHgB7ZZLKHZBGMefY/F9ZaHvk6zU+7KSLIRSNghLpZQtZcHGJdZCsbEhxQ5Z2bnEGhEbuSTKpVwWSjYuW/L4TzNyms45c2bwWvCrX+e9zMzzzHOe5hyin45HKYaZ/+HSBOthBqUKBK6EU/CO3zmir0TsFvbBCw5mjj4bLPoH1sBV+MLRdNFngcVK4KBWYhMV9BFUidvVbsOISiidXGDZUOOGxUX5h2FnyP87tkHFbnvhIZtZg6URwQUzcYKmwSq4Ap/ZjKhIh5rbbxjbFhU4Hw6wXUNNwsyYwQVlQSVu5eiGCuKMfd3M8r6beCKtoUbZbreCe5Y98Vet47E86eKw4U/AdFgEIXoi6VsjAy5bzB/zJ9DMsmvjcA3rtFuXCffYjsagxkvCIQ4/t0dYPsn8cxLwhO0poigwoAJOw0c1YSEk4Qu254HigsHZLJtzVfs91zE462ulRSXged4tLmuwmFX5WTbfOkySG9uxE1AskXxzKVbfe2AOubNpm4B4aXiGb91fSB/D/i2I5el4qT6fszu3+tpxKiBYhAksUIBrLrmzS44JzKrrgfb7FayE5fCSzGyRK9j9plbOXZjw/f8fThhuQS25wvLt9g0RKD1kXAu8CUkgi1zB5Dy4D7tjjBWn5KkW/JhSjVa1efoOELia5dOygX4J4BXer9InlyIBVAAAAABJRU5ErkJggg==";
var AppNavLink_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$i = {
  name: "AppNavLink"
};
const _hoisted_1$f = { class: "font-opensans uppercase text-center lead leading-10 lg:leading-5" };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("a", _hoisted_1$f, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ]);
}
var AppNavLink = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$a], ["__scopeId", "data-v-0f891b4e"]]);
var AppSocialLink_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$h = {
  name: "AppSocialLink"
};
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("a", null, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ]);
}
var AppSocialLink = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$9], ["__scopeId", "data-v-3d1a55a4"]]);
var AppNavLinkDivider_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$g = {
  name: "AppNavLinkDivider"
};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", null, "/");
}
var AppNavLinkDivider = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$8], ["__scopeId", "data-v-f3e5c974"]]);
var AppNav_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$6 = (n) => (pushScopeId("data-v-3d99218c"), n = n(), popScopeId(), n);
const _hoisted_1$e = { class: "container flex justify-between items-center py-8" };
const _hoisted_2$b = /* @__PURE__ */ createStaticVNode('<a href="/" class="" data-v-3d99218c><svg width="233" height="16" viewBox="0 0 233 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-3d99218c><path d="M27.6022 0.154419H21.597V1.4126H27.6022C30.1339 1.4126 31.286 3.49226 31.286 5.42378C31.286 6.47804 30.9444 7.49575 30.352 8.21333C29.692 9.01172 28.7407 9.43497 27.6022 9.43497H22.174C22.0061 9.43497 21.8459 9.50037 21.7282 9.61965C21.6105 9.73701 21.543 9.89669 21.543 10.0641V15.3796H22.805V10.6912H27.6041C29.1324 10.6912 30.4195 10.1102 31.3265 9.01173C32.1157 8.05751 32.5499 6.78393 32.5499 5.42186C32.548 2.80353 30.8498 0.154419 27.6022 0.154419Z" fill="white" data-v-3d99218c></path><path d="M122.1 9.07901C122.906 8.1248 123.352 6.84737 123.352 5.48338C123.352 2.86505 121.619 0.215942 118.308 0.215942H112.166V1.47412H118.308C120.907 1.47412 122.092 3.55378 122.092 5.48338C122.092 6.5511 121.752 7.53995 121.137 8.26716C120.457 9.0694 119.481 9.49264 118.308 9.49264H112.754C112.407 9.49264 112.123 9.77352 112.123 10.1217V15.4373H113.385V10.7489H118.31C118.416 10.7489 118.522 10.7451 118.626 10.7393L122.372 15.3834L123.354 14.5966L120.033 10.4776C120.839 10.2102 121.54 9.73889 122.1 9.07901Z" fill="white" data-v-3d99218c></path><path d="M67.3716 13.4557C66.0864 12.8593 63.9213 11.3433 63.8345 7.88045C63.9503 5.23711 65.3165 3.11512 67.5839 2.05509C69.9284 0.958512 72.7825 1.2721 74.8511 2.84964L75.6056 1.86656C73.1337 -0.0187954 69.857 -0.374705 67.0551 0.933499C64.3478 2.19938 62.7211 4.7196 62.5898 7.84967C62.5898 7.86313 62.5898 7.8766 62.5898 7.89006C62.6593 10.9201 64.2108 13.3576 66.8448 14.5792C67.9968 15.114 69.2492 15.3738 70.49 15.3738C72.356 15.3738 74.1969 14.7831 75.6172 13.6442L74.8376 12.6785C72.8674 14.2618 69.7953 14.5792 67.3716 13.4557Z" fill="white" data-v-3d99218c></path><path d="M140.239 0.0332031C136.007 0.0332031 132.564 3.46531 132.564 7.68426C132.564 11.9032 136.007 15.3353 140.239 15.3353C144.471 15.3353 147.913 11.9032 147.913 7.68426C147.913 3.46531 144.471 0.0332031 140.239 0.0332031ZM140.239 14.0618C136.711 14.0618 133.844 11.201 133.844 7.68619C133.844 4.16943 136.713 1.3087 140.239 1.3087C143.766 1.3087 146.634 4.16943 146.634 7.68619C146.634 11.201 143.764 14.0618 140.239 14.0618Z" fill="white" data-v-3d99218c></path><path d="M185.471 0.0505371C181.249 0.0505371 177.814 3.47495 177.814 7.68429C177.814 11.8936 181.249 15.318 185.471 15.318C189.694 15.318 193.128 11.8936 193.128 7.68429C193.127 3.47687 189.692 0.0505371 185.471 0.0505371ZM185.471 14.0791C181.934 14.0791 179.057 11.2107 179.057 7.68429C179.057 4.15791 181.934 1.28948 185.471 1.28948C189.009 1.28948 191.886 4.15791 191.886 7.68429C191.884 11.2107 189.007 14.0791 185.471 14.0791Z" fill="white" data-v-3d99218c></path><path d="M165.788 7.50538C167.465 6.79357 168.551 5.57001 168.551 4.15599C168.551 1.90319 165.807 0.139038 162.305 0.139038H158.799V1.32989H162.305C165.043 1.32989 167.357 2.62463 167.357 4.15599C167.357 5.68544 165.043 6.97826 162.305 6.97826H158.799V8.16911H162.305C165.499 8.16911 168.198 9.55426 168.198 11.1934C168.198 12.8344 165.501 14.2215 162.305 14.2215H158.799V15.4123H162.305C166.28 15.4123 169.393 13.5578 169.393 11.1914C169.393 9.58697 167.955 8.21912 165.788 7.50538Z" fill="white" data-v-3d99218c></path><path d="M202.146 1.4511H207.366V15.4258H208.609V1.4511H213.9V0.212158H202.146V1.4511Z" fill="white" data-v-3d99218c></path><path d="M7.32483 7.09615C7.18975 7.07691 7.02959 7.05767 6.86749 7.04036C6.72084 7.02305 6.57032 7.00573 6.43524 6.98841C6.15544 6.94994 5.99528 6.92493 5.97019 6.91916C4.3782 6.55555 2.67814 5.65712 2.67814 4.2181C2.67814 2.69828 4.60976 1.41316 6.89644 1.41316C8.52702 1.41316 10.0303 2.05956 10.7288 3.05803L11.767 2.3366C10.8253 0.987992 8.95928 0.151123 6.89644 0.151123C3.87262 0.151123 1.41227 1.97492 1.41227 4.2181C1.41227 6.04189 3.05057 7.54825 5.68652 8.14848C5.76757 8.16772 6.00106 8.20235 6.24806 8.23506C6.2635 8.23698 6.27894 8.2389 6.29438 8.24083C6.34648 8.24852 6.40051 8.25429 6.45261 8.26199C6.46612 8.26391 6.47963 8.26776 6.49313 8.26968L6.63979 8.29085C6.86364 8.32163 7.12221 8.35625 7.40974 8.39473C7.42324 8.39666 7.43675 8.39666 7.45026 8.39666C9.47257 8.76796 10.8118 9.88185 10.8118 11.2266C10.8118 12.8195 8.74315 14.1662 6.29438 14.1662C4.1312 14.1662 2.21695 13.1177 1.84645 11.7383L1.83873 11.7076L1.22702 11.8692L0.621094 12.0539C1.1479 14.0085 3.53492 15.4263 6.29438 15.4263C9.48415 15.4263 12.0777 13.5429 12.0777 11.2247C12.0777 9.16042 10.1673 7.50015 7.32483 7.09615Z" fill="white" data-v-3d99218c></path><path d="M227.77 7.09361C227.635 7.07438 227.477 7.05706 227.315 7.03782C227.176 7.02243 227.035 7.00704 226.906 6.98973C226.61 6.94932 226.439 6.92239 226.414 6.91662C224.818 6.55494 223.114 5.66036 223.114 4.22903C223.114 2.7169 225.051 1.43755 227.344 1.43755C228.978 1.43755 230.487 2.08012 231.186 3.07666L232.203 2.36484C231.263 1.0297 229.401 0.198608 227.342 0.198608C224.324 0.198608 221.869 2.00701 221.869 4.22903C221.869 6.03551 223.504 7.5284 226.14 8.12478C226.213 8.1421 226.429 8.1748 226.695 8.21136C226.697 8.21136 226.699 8.21136 226.701 8.21136C226.765 8.21905 226.828 8.22867 226.896 8.23829C226.911 8.24214 226.925 8.24406 226.94 8.24599L227.857 8.36911C227.871 8.37103 227.886 8.37103 227.899 8.37103C229.928 8.74041 231.269 9.84854 231.269 11.1875C231.269 12.7728 229.194 14.1117 226.74 14.1117C224.571 14.1117 222.653 13.069 222.274 11.6742L221.068 11.9744C221.07 11.9782 221.076 12.0032 221.078 12.0071C221.603 13.9444 223.986 15.3488 226.74 15.3488C229.976 15.3488 232.511 13.5192 232.511 11.1856C232.513 9.13864 230.607 7.49377 227.77 7.09361Z" fill="white" data-v-3d99218c></path><path d="M95.9384 0.215942H85.5566V1.47411H95.9384V0.215942Z" fill="white" data-v-3d99218c></path><path d="M95.9384 7.24756H85.5566V8.50574H95.9384V7.24756Z" fill="white" data-v-3d99218c></path><path d="M95.9384 14.1176H85.5566V15.3757H95.9384V14.1176Z" fill="white" data-v-3d99218c></path><path d="M52.9482 0.144775H42.5664C42.2133 0.144775 41.9258 0.429507 41.9258 0.781567V8.14404C41.9258 8.21715 41.9412 8.28448 41.9624 8.34989H41.9354V15.4276H43.1974V8.78276H52.3094V15.4276H53.5888V8.14597V0.783487C53.5869 0.429503 53.3013 0.144775 52.9482 0.144775ZM52.3075 7.50726H43.2052V1.41835H52.3075V7.50726Z" fill="white" data-v-3d99218c></path></svg></a><input class="lg:hidden" id="menu__toggle" type="checkbox" data-v-3d99218c><label class="flex lg:hidden menu__btn" for="menu__toggle" data-v-3d99218c><span data-v-3d99218c></span></label>', 3);
const _hoisted_5$4 = {
  id: "menu",
  role: "navigation",
  class: "lg:flex items-center"
};
const _hoisted_6$4 = { class: "mr-0 lg:mr-12" };
const _hoisted_7$4 = /* @__PURE__ */ createTextVNode("Collection");
const _hoisted_8$2 = /* @__PURE__ */ createTextVNode("Project");
const _hoisted_9$1 = /* @__PURE__ */ createTextVNode("Roadmap");
const _hoisted_10$1 = /* @__PURE__ */ createTextVNode("Team");
const _hoisted_11$1 = /* @__PURE__ */ createTextVNode("Blog");
const _hoisted_12$1 = { class: "flex justify-center my-4 lg:my-0" };
const _hoisted_13$1 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_0$4,
  alt: "Twitter"
}, null, -1));
const _hoisted_14$1 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_1$3,
  alt: "Discord"
}, null, -1));
const _hoisted_15$1 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_2$2,
  alt: "Telegram"
}, null, -1));
const _sfc_main$f = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$e, [
        _hoisted_2$b,
        createBaseVNode("nav", _hoisted_5$4, [
          createBaseVNode("div", _hoisted_6$4, [
            createVNode(AppNavLink, {
              href: "#collection",
              title: "Collection",
              class: "block lg:inline-block"
            }, {
              default: withCtx(() => [
                _hoisted_7$4
              ]),
              _: 1
            }),
            createVNode(AppNavLinkDivider, { class: "hidden lg:inline-block" }),
            createVNode(AppNavLink, {
              href: "#project",
              title: "Project",
              class: "block lg:inline-block"
            }, {
              default: withCtx(() => [
                _hoisted_8$2
              ]),
              _: 1
            }),
            createVNode(AppNavLinkDivider, { class: "hidden lg:inline-block" }),
            createVNode(AppNavLink, {
              href: "#roadmap",
              title: "Roadmap",
              class: "block lg:inline-block"
            }, {
              default: withCtx(() => [
                _hoisted_9$1
              ]),
              _: 1
            }),
            createVNode(AppNavLinkDivider, { class: "hidden lg:inline-block" }),
            createVNode(AppNavLink, {
              href: "#team",
              title: "Team",
              class: "block lg:inline-block"
            }, {
              default: withCtx(() => [
                _hoisted_10$1
              ]),
              _: 1
            }),
            createVNode(AppNavLinkDivider, { class: "hidden lg:inline-block" }),
            createVNode(AppNavLink, {
              href: "https://spacerobotsnft.medium.com/",
              title: "Blog",
              class: "block lg:inline-block"
            }, {
              default: withCtx(() => [
                _hoisted_11$1
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_12$1, [
            createVNode(AppSocialLink, {
              href: "https://twitter.com/SpaceRobotsNFT",
              title: "Twitter",
              class: "mr-6"
            }, {
              default: withCtx(() => [
                _hoisted_13$1
              ]),
              _: 1
            }),
            createVNode(AppSocialLink, {
              href: "https://discord.gg/spacerobots",
              title: "Discord",
              class: "mr-6"
            }, {
              default: withCtx(() => [
                _hoisted_14$1
              ]),
              _: 1
            }),
            createVNode(AppSocialLink, {
              href: "https://t.me/spacerobots",
              title: "Telegram"
            }, {
              default: withCtx(() => [
                _hoisted_15$1
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
};
var AppNav = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-3d99218c"]]);
var _imports_0$3 = "/assets/video.520fe327.jpg";
var _imports_1$2 = "/assets/moonlorian-logo.965041ba.png";
var AppLink_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$e = {
  name: "AppLink"
};
const _hoisted_1$d = { class: "inline-block font-lato font-extrabold text-center uppercase" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("a", _hoisted_1$d, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ]);
}
var AppLink = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$7], ["__scopeId", "data-v-83bcc74c"]]);
var AppHeader_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$5 = (n) => (pushScopeId("data-v-34ec263c"), n = n(), popScopeId(), n);
const _hoisted_1$c = { class: "header" };
const _hoisted_2$a = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createBaseVNode("h1", { class: "font-lato font-extrabold text-center uppercase" }, "Space Robots Phase 2 Sale", -1));
const _hoisted_3$8 = /* @__PURE__ */ createTextVNode("Register");
const _sfc_main$d = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$c, [
        _hoisted_2$a,
        createVNode(AppLink, {
          href: "#register",
          class: "mt-6 mb-12 lg:mt-12"
        }, {
          default: withCtx(() => [
            _hoisted_3$8
          ]),
          _: 1
        })
      ]);
    };
  }
};
var AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-34ec263c"]]);
var SectionHeader_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$c = {
  name: "SectionHeader"
};
const _hoisted_1$b = { class: "font-lato font-extrabold text-center uppercase mb-6" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("h2", _hoisted_1$b, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ]);
}
var SectionHeader = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$6], ["__scopeId", "data-v-5ad99525"]]);
var SectionParagraph_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$b = {
  name: "SectionParagraph"
};
const _hoisted_1$a = { class: "font-opensans text-center" };
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("p", _hoisted_1$a, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ]);
}
var SectionParagraph = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$5], ["__scopeId", "data-v-00f527fe"]]);
const _sfc_main$a = {
  name: "Section"
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", null, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var Section = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$4]]);
const _sfc_main$9 = {
  name: "SectionDivider"
};
const _hoisted_1$9 = { class: "flex justify-center my-8" };
const _hoisted_2$9 = /* @__PURE__ */ createBaseVNode("svg", {
  width: "252",
  height: "19",
  viewBox: "0 0 252 19",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ createBaseVNode("path", {
    d: "M126 10C126.552 10 127 9.55228 127 9C127 8.44772 126.552 8 126 8L126 10ZM0.226494 9.00001L6 14.7735L11.7735 9.00001L6 3.22651L0.226494 9.00001ZM126 8L6 8.00001L6 10L126 10L126 8Z",
    fill: "white"
  }),
  /* @__PURE__ */ createBaseVNode("path", {
    d: "M126 8C125.448 8 125 8.44772 125 9C125 9.55228 125.448 10 126 10L126 8ZM251.774 9.00002L246 3.22652L240.227 9.00002L246 14.7735L251.774 9.00002ZM126 10L246 10L246 8.00002L126 8L126 10Z",
    fill: "white"
  }),
  /* @__PURE__ */ createBaseVNode("rect", {
    x: "117",
    y: "9.19238",
    width: "13",
    height: "13",
    transform: "rotate(-45 117 9.19238)",
    fill: "#DEA30B"
  })
], -1);
const _hoisted_3$7 = [
  _hoisted_2$9
];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$9, _hoisted_3$7);
}
var SectionDivider = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$3]]);
var _imports_0$2 = "/assets/1.9a915870.jpg";
var _imports_1$1 = "/assets/2.c1ff19fe.jpg";
var _imports_2$1 = "/assets/3.ac597e23.jpg";
var _imports_3 = "/assets/4.853d7e28.jpg";
var _imports_4 = "/assets/5.1930b572.jpg";
var AppSlider_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$4 = (n) => (pushScopeId("data-v-668170c9"), n = n(), popScopeId(), n);
const _hoisted_1$8 = { class: "glide mt-6 md:mt-14 mx-auto" };
const _hoisted_2$8 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createBaseVNode("div", {
  "data-glide-el": "track",
  class: "glide__track"
}, [
  /* @__PURE__ */ createBaseVNode("ul", { class: "glide__slides" }, [
    /* @__PURE__ */ createBaseVNode("li", { class: "glide__slide" }, [
      /* @__PURE__ */ createBaseVNode("img", {
        src: _imports_0$2,
        alt: "Slide 1"
      })
    ]),
    /* @__PURE__ */ createBaseVNode("li", { class: "glide__slide" }, [
      /* @__PURE__ */ createBaseVNode("img", {
        src: _imports_1$1,
        alt: "Slide 2"
      })
    ]),
    /* @__PURE__ */ createBaseVNode("li", { class: "glide__slide" }, [
      /* @__PURE__ */ createBaseVNode("img", {
        src: _imports_2$1,
        alt: "Slide 3"
      })
    ]),
    /* @__PURE__ */ createBaseVNode("li", { class: "glide__slide" }, [
      /* @__PURE__ */ createBaseVNode("img", {
        src: _imports_3,
        alt: "Slide 4"
      })
    ]),
    /* @__PURE__ */ createBaseVNode("li", { class: "glide__slide" }, [
      /* @__PURE__ */ createBaseVNode("img", {
        src: _imports_4,
        alt: "Slide 5"
      })
    ])
  ])
], -1));
const _hoisted_3$6 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createBaseVNode("div", { class: "flex justify-center items-center mt-8 mb-14" }, [
  /* @__PURE__ */ createBaseVNode("div", {
    "data-glide-el": "controls",
    class: "flex"
  }, [
    /* @__PURE__ */ createBaseVNode("button", { "data-glide-dir": "<" }, [
      /* @__PURE__ */ createBaseVNode("svg", {
        width: "127",
        height: "12",
        viewBox: "0 0 127 12",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, [
        /* @__PURE__ */ createBaseVNode("path", {
          d: "M125.5 7C126.052 7 126.5 6.55228 126.5 6C126.5 5.44772 126.052 5 125.5 5L125.5 7ZM0.226497 6.00001L6 11.7735L11.7735 6.00001L6 0.226508L0.226497 6.00001ZM125.5 5L6 5.00001L6 7.00001L125.5 7L125.5 5Z",
          fill: "white"
        })
      ])
    ]),
    /* @__PURE__ */ createBaseVNode("div", {
      class: "glide__bullets flex items-center justify-center mx-4 md:mx-10",
      style: { "min-height": "25px" },
      "data-glide-el": "controls[nav]"
    }, [
      /* @__PURE__ */ createBaseVNode("button", {
        class: "glide__bullet",
        "data-glide-dir": "=0"
      }),
      /* @__PURE__ */ createBaseVNode("button", {
        class: "glide__bullet",
        "data-glide-dir": "=1"
      }),
      /* @__PURE__ */ createBaseVNode("button", {
        class: "glide__bullet",
        "data-glide-dir": "=3"
      }),
      /* @__PURE__ */ createBaseVNode("button", {
        class: "glide__bullet",
        "data-glide-dir": "=4"
      }),
      /* @__PURE__ */ createBaseVNode("button", {
        class: "glide__bullet",
        "data-glide-dir": "=5"
      })
    ]),
    /* @__PURE__ */ createBaseVNode("button", { "data-glide-dir": ">" }, [
      /* @__PURE__ */ createBaseVNode("svg", {
        width: "127",
        height: "12",
        viewBox: "0 0 127 12",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, [
        /* @__PURE__ */ createBaseVNode("path", {
          d: "M1 5C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7V5ZM126.274 6L120.5 0.226497L114.726 6L120.5 11.7735L126.274 6ZM1 7H120.5V5H1V7Z",
          fill: "white"
        })
      ])
    ])
  ])
], -1));
const _hoisted_4$4 = [
  _hoisted_2$8,
  _hoisted_3$6
];
const _sfc_main$8 = {
  setup(__props) {
    onMounted(() => {
      new Glide(".glide", {
        type: "slider ",
        startAt: 2,
        gap: 50,
        peek: 0,
        perView: 5,
        focusAt: "center",
        breakpoints: {
          2200: {
            perView: 3,
            peek: 260,
            gap: 50
          },
          1400: {
            peek: 10,
            perView: 3,
            gap: 30
          },
          800: {
            peek: 0,
            perView: 2,
            gap: 20
          },
          450: {
            gap: 20,
            peek: 0,
            perView: 1
          }
        }
      }).mount();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, _hoisted_4$4);
    };
  }
};
var AppSlider = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-668170c9"]]);
var _imports_0$1 = "data:image/png;base64,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";
var AppVideo_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-3d8a3830"), n = n(), popScopeId(), n);
const _hoisted_1$7 = { class: "glightbox inline-block relative overflow-hidden rounded-lg mx-4" };
const _hoisted_2$7 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "overlay absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    class: "h-10 w-10 md:h-auto md:w-auto play-btn",
    src: _imports_0$1,
    alt: "Play video"
  })
], -1));
const _sfc_main$7 = {
  setup(__props) {
    onMounted(() => {
      GLightbox({
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("a", _hoisted_1$7, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true),
        _hoisted_2$7
      ]);
    };
  }
};
var AppVideo = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-3d8a3830"]]);
var SectionParagraphDivider_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$6 = {
  name: "SectionParagraphDivider"
};
const _withScopeId$2 = (n) => (pushScopeId("data-v-3bec04ae"), n = n(), popScopeId(), n);
const _hoisted_1$6 = { class: "text-center my-2" };
const _hoisted_2$6 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("span", null, null, -1));
const _hoisted_3$5 = [
  _hoisted_2$6
];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$6, _hoisted_3$5);
}
var SectionParagraphDivider = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$2], ["__scopeId", "data-v-3bec04ae"]]);
var __glob_0_0 = "/assets/Punk a \u20BFit_white.174645a8.jpg";
var __glob_0_1 = "/assets/Space-robots-parts-team-Tarantulo.2b0461fb.jpg";
var __glob_0_2 = "/assets/Space_robots_team_Kama.9d907d40.jpg";
var __glob_0_3 = "/assets/Space_robots_team_Smipleprick.5d1f3566.jpg";
var __glob_0_4 = "/assets/Space_robots_team_Spacemod 1.9ed2997f.jpg";
var MemberCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$5 = {
  name: "MemberCard",
  props: ["image", "link", "linkTitle", "name", "description"],
  methods: {
    getImageUrl() {
      return new URL({ "../assets/images/team/Punk a \u20BFit_white.jpg": __glob_0_0, "../assets/images/team/Space-robots-parts-team-Tarantulo.jpg": __glob_0_1, "../assets/images/team/Space_robots_team_Kama.jpg": __glob_0_2, "../assets/images/team/Space_robots_team_Smipleprick.jpg": __glob_0_3, "../assets/images/team/Space_robots_team_Spacemod 1.jpg": __glob_0_4 }[`../assets/images/team/${this.image}`], self.location).href;
    }
  }
};
const _hoisted_1$5 = {
  class: "flex flex-col items-center",
  style: { "width": "250px" }
};
const _hoisted_2$5 = ["href", "title"];
const _hoisted_3$4 = ["src"];
const _hoisted_4$3 = ["href", "title"];
const _hoisted_5$3 = {
  key: 1,
  class: "link font-opensans text-center"
};
const _hoisted_6$3 = { class: "title font-lato font-extrabold text-center uppercase my-4" };
const _hoisted_7$3 = { class: "description font-opensans text-center" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$5, [
    createBaseVNode("a", {
      href: $props.link,
      title: $props.name
    }, [
      createBaseVNode("img", {
        class: "rounded-full mb-4",
        src: $options.getImageUrl(),
        alt: "Member image",
        style: { "width": "200px", "height": "200px" }
      }, null, 8, _hoisted_3$4)
    ], 8, _hoisted_2$5),
    $props.link ? (openBlock(), createElementBlock("a", {
      key: 0,
      href: $props.link,
      title: $props.name,
      class: "link font-opensans text-center underline"
    }, "@" + toDisplayString($props.linkTitle), 9, _hoisted_4$3)) : (openBlock(), createElementBlock("p", _hoisted_5$3, "@" + toDisplayString($props.linkTitle), 1)),
    createBaseVNode("p", _hoisted_6$3, toDisplayString($props.name), 1),
    createBaseVNode("p", _hoisted_7$3, toDisplayString($props.description), 1)
  ]);
}
var MemberCard = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$1], ["__scopeId", "data-v-2d91a352"]]);
var _imports_0 = "/assets/lightning-full.08364670.svg";
var _imports_1 = "/assets/lightning-empty.80eb779c.svg";
var _imports_2 = "/assets/lightning-small.29c80754.svg";
var RoadMapItem_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$4 = {
  name: "RoadMapItem",
  props: {
    title: String,
    active: Boolean,
    nextActive: Boolean,
    items: {
      type: Array
    }
  }
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-ffa77206"), n = n(), popScopeId(), n);
const _hoisted_1$4 = {
  key: 0,
  class: "side",
  src: _imports_0,
  alt: "Lightning icon"
};
const _hoisted_2$4 = {
  key: 1,
  class: "side",
  src: _imports_1,
  alt: "Lightning icon"
};
const _hoisted_3$3 = { class: "title font-lato font-extrabold uppercase" };
const _hoisted_4$2 = {
  key: 0,
  class: "small",
  src: _imports_2,
  alt: "Lightning icon"
};
const _hoisted_5$2 = { key: 1 };
const _hoisted_6$2 = {
  class: "font-bold",
  style: { "color": "#FFC225" }
};
const _hoisted_7$2 = {
  key: 2,
  class: "font-opensans"
};
const _hoisted_8$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("span", { class: "dot" }, null, -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["box relative text-left mb-8", [$props.active ? "active" : "", $props.nextActive ? "next-active" : ""]])
  }, [
    $props.active ? (openBlock(), createElementBlock("img", _hoisted_1$4)) : (openBlock(), createElementBlock("img", _hoisted_2$4)),
    createBaseVNode("p", _hoisted_3$3, toDisplayString($props.title), 1),
    createBaseVNode("ul", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.items, (item, itemIndex) => {
        return openBlock(), createElementBlock("li", {
          key: itemIndex,
          class: "flex"
        }, [
          item.active ? (openBlock(), createElementBlock("img", _hoisted_4$2)) : createCommentVNode("", true),
          item.hasOwnProperty("title") ? (openBlock(), createElementBlock("p", _hoisted_5$2, [
            createBaseVNode("span", _hoisted_6$2, toDisplayString(item.title), 1),
            createBaseVNode("span", null, toDisplayString(item.text), 1)
          ])) : (openBlock(), createElementBlock("p", _hoisted_7$2, [
            _hoisted_8$1,
            createTextVNode(toDisplayString(item.text), 1)
          ]))
        ]);
      }), 128))
    ])
  ], 2);
}
var RoadMapItem = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render], ["__scopeId", "data-v-ffa77206"]]);
var RoadMap_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$3 = { class: "container flex justify-between mt-14 mb-14" };
const _hoisted_2$3 = { class: "road-map w-full" };
const _hoisted_3$2 = /* @__PURE__ */ createTextVNode("Snapshots of the Space Robots NFT owner's wallets will be taken at random intervals after launch. Snapshot data will be converted into points and will bring additional benefits in the future. Some of them are listed below.");
const _sfc_main$3 = {
  setup(__props) {
    const items1 = [
      {
        active: true,
        title: "Phase 1 complete",
        text: " - buyback of 25 EGLD from the market"
      },
      {
        active: false,
        title: "Phase 2 complete",
        text: " - 15X NFT airdropped to random wallets"
      },
      {
        active: false,
        title: "Public sale complete",
        text: " - 40,000 $ donation to charities picked by the community"
      },
      {
        active: false,
        title: "Bonus",
        text: " - for 1 week after public sale. 50 EGLD buybacks from the market"
      }
    ];
    const items2 = [
      {
        active: false,
        title: "Upgradable NFTs",
        text: " - use robot parts to upgrade your Space Robot!"
      },
      {
        active: false,
        title: "Staking",
        text: " - stake your Space Robot NFTs and earn robot parts"
      },
      {
        active: false,
        title: "Game release",
        text: " - codename: gc_space_miners"
      },
      {
        active: false,
        title: "Future projects",
        text: " - building the universe"
      }
    ];
    const items3 = [
      {
        active: false,
        text: "Listing on Elrond NFT market places"
      },
      {
        active: false,
        text: "Getting on Rarity Tools"
      },
      {
        active: false,
        text: "Space Robots Companion NFT drop (must hold 2x Space Robots)"
      },
      {
        active: false,
        text: "Real-life art projects featuring Space Robots"
      },
      {
        active: false,
        text: "Collaborating with artists, brands, NFT projects"
      }
    ];
    const items4 = [
      {
        active: false,
        text: "Exclusive giveaway and NFT drops"
      },
      {
        active: false,
        text: "Option to participate in future events with our partners"
      },
      {
        active: false,
        text: "Opportunities to participate in deciding on the future of the Space Robots"
      },
      {
        active: false,
        text: "Release of a comics series featuring stories from the Space Robots universe"
      },
      {
        active: false,
        text: "Discounts, memberships, and additional benefits in the feature Space Robots projects"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$3, [
          createVNode(RoadMapItem, {
            title: "SALES ROAD MAP",
            active: true,
            "next-active": false,
            items: items1
          }),
          createVNode(RoadMapItem, {
            title: "PROJECT DEVELOPMENT",
            active: false,
            "next-active": false,
            items: items2
          }),
          createVNode(RoadMapItem, {
            title: "Post - LAUNCH",
            active: false,
            "next-active": false,
            items: items3
          }),
          createVNode(RoadMapItem, {
            title: "ADDED VALUE PROPOSITION",
            active: false,
            "next-active": false,
            items: items4
          }),
          createVNode(SectionParagraph, null, {
            default: withCtx(() => [
              _hoisted_3$2
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
};
var RoadMap = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-1989791d"]]);
const _hoisted_1$2 = /* @__PURE__ */ createTextVNode("SPACE ROBOTS");
const _hoisted_2$2 = /* @__PURE__ */ createTextVNode("//: Upgradable NFT collection of 7777 randomly assembled 3D Robots presented in PFP format with staking and gamification mechanics - powered by Elrond blockchain.");
const _hoisted_3$1 = /* @__PURE__ */ createTextVNode("PHASE 2 SALE");
const _hoisted_4$1 = /* @__PURE__ */ createTextVNode("Register");
const _hoisted_5$1 = /* @__PURE__ */ createTextVNode("The journey continues to Phase 2 Sale (2368 RoboPacksPH2) of the Space Robots project. RoboPackPH2 will contain 1X Space Robots NFT and 1X Robots parts NFT. As specified in our Sale roadmap, after Phase 2 is complete, we will airdrop 15X NFTs to random wallets.");
const _hoisted_6$1 = /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_0$3,
  alt: "Video"
}, null, -1);
const _hoisted_7$1 = /* @__PURE__ */ createTextVNode("PROJECT");
const _hoisted_8 = /* @__PURE__ */ createTextVNode("Space Robots NFT project is the inception of the Space Robots universe! We are building a unique world with a rich story that will begin with 7777 randomly assembled Space Robots 3D characters.");
const _hoisted_9 = /* @__PURE__ */ createTextVNode("We have made more than 100 unique 3D assets, which at first will be used to create upgradable PFP NFTs, short video stories, educational content, a game, and other still unrevealed projects. ");
const _hoisted_10 = /* @__PURE__ */ createTextVNode("We are using the fast and scalable Elrond blockchain technology to develop unique features for the upcoming Space Robots projects.");
const _hoisted_11 = /* @__PURE__ */ createTextVNode("ROAD MAP");
const _hoisted_12 = /* @__PURE__ */ createTextVNode("Heroes! Welcome to the inception of the Space Robots universe! Do NOT Panic! Reading the roadmap will help guide you through the long journey we will all be about to depart. As the humans behind the Space Robots, we will build the vessel. But it depends on YOU, the team, how fast we will reach the destination!");
const _hoisted_13 = /* @__PURE__ */ createTextVNode("OUR TEAM");
const _hoisted_14 = {
  class: "flex flex-wrap justify-center items-start gap-8",
  style: { "max-width": "1528px", "padding": "0px 1rem", "margin": "0px auto" }
};
const _hoisted_15 = /* @__PURE__ */ createTextVNode("Developers");
const _hoisted_16 = /* @__PURE__ */ createBaseVNode("div", { class: "flex justify-center mt-2 mb-10" }, [
  /* @__PURE__ */ createBaseVNode("a", {
    href: "https://www.moonlorian.com/",
    title: "Moonlorian"
  }, [
    /* @__PURE__ */ createBaseVNode("img", {
      src: _imports_1$2,
      alt: "Moonlorian logo"
    })
  ])
], -1);
const _hoisted_17 = /* @__PURE__ */ createTextVNode("Trust to transform businesses, processes and community in this new innovation economy era. This is why moonlorian become the service partner of Elrond. To develop the full project lifecycle.");
const _sfc_main$2 = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(AppHeader),
        createVNode(Section, { id: "collection" }, {
          default: withCtx(() => [
            createVNode(SectionHeader, { class: "mt-4 md:mt-14" }, {
              default: withCtx(() => [
                _hoisted_1$2
              ]),
              _: 1
            }),
            createVNode(SectionParagraph, null, {
              default: withCtx(() => [
                _hoisted_2$2
              ]),
              _: 1
            }),
            createVNode(AppSlider)
          ]),
          _: 1
        }),
        createVNode(Section, { id: "register" }, {
          default: withCtx(() => [
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                _hoisted_3$1
              ]),
              _: 1
            }),
            createVNode(AppLink, {
              href: "https://spacerobots.typeform.com/phase-2-sale",
              class: "mt-2 mb-10"
            }, {
              default: withCtx(() => [
                _hoisted_4$1
              ]),
              _: 1
            }),
            createVNode(SectionParagraph, { style: { "color": "#606060", "text-shadow": "none" } }, {
              default: withCtx(() => [
                _hoisted_5$1
              ]),
              _: 1
            }),
            createVNode(AppVideo, {
              class: "mt-10 mb-6",
              href: "https://www.youtube.com/watch?v=R-BDCVFGnV4"
            }, {
              default: withCtx(() => [
                _hoisted_6$1
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(Section, { id: "project" }, {
          default: withCtx(() => [
            createVNode(SectionDivider),
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                _hoisted_7$1
              ]),
              _: 1
            }),
            createVNode(SectionParagraph, null, {
              default: withCtx(() => [
                _hoisted_8
              ]),
              _: 1
            }),
            createVNode(SectionParagraphDivider),
            createVNode(SectionParagraph, null, {
              default: withCtx(() => [
                _hoisted_9
              ]),
              _: 1
            }),
            createVNode(SectionParagraphDivider),
            createVNode(SectionParagraph, null, {
              default: withCtx(() => [
                _hoisted_10
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(Section, { id: "roadmap" }, {
          default: withCtx(() => [
            createVNode(SectionDivider),
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                _hoisted_11
              ]),
              _: 1
            }),
            createVNode(SectionParagraph, null, {
              default: withCtx(() => [
                _hoisted_12
              ]),
              _: 1
            }),
            createVNode(RoadMap)
          ]),
          _: 1
        }),
        createVNode(Section, {
          id: "team",
          class: "mb-12"
        }, {
          default: withCtx(() => [
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                _hoisted_13
              ]),
              _: 1
            }),
            createBaseVNode("div", _hoisted_14, [
              createVNode(MemberCard, {
                image: "Space-robots-parts-team-Tarantulo.jpg",
                link: "https://twitter.com/tarantulotv",
                "link-title": "TarantuloTV",
                name: "Tarantulo",
                description: "//: Description: Storyteller, Early Elrond ambassador"
              }),
              createVNode(MemberCard, {
                image: "Punk a \u20BFit_white.jpg",
                link: "https://twitter.com/punk_a_bit",
                "link-title": "punk_a_bit",
                name: "Punk a \u20BFit",
                description: "//: Crypto investor since 2017, NFT degen"
              }),
              createVNode(MemberCard, {
                image: "Space_robots_team_Kama.jpg",
                link: "https://twitter.com/marausk",
                "link-title": "marausk",
                name: "Kama",
                description: "//: Video designer and editor"
              }),
              createVNode(MemberCard, {
                image: "Space_robots_team_Smipleprick.jpg",
                link: "https://twitter.com/simpleprick",
                "link-title": "simpleprick",
                name: "SIMPLEPRICK",
                description: "//: Digital Artist. Creator of Space Robots 3D models"
              }),
              createVNode(MemberCard, {
                image: "Space_robots_team_Spacemod 1.jpg",
                link: "https://twitter.com/SpaceRobotsMod",
                "link-title": "spacemod",
                name: "SPACEMOD",
                description: "//: Discord moderator"
              })
            ])
          ]),
          _: 1
        }),
        createVNode(Section, { class: "mb-12" }, {
          default: withCtx(() => [
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                _hoisted_15
              ]),
              _: 1
            }),
            _hoisted_16,
            createVNode(SectionParagraph, null, {
              default: withCtx(() => [
                _hoisted_17
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ], 64);
    };
  }
};
var AppFooter_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-f8550256"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { style: { "background-color": "#0E0E0E" } };
const _hoisted_2$1 = { class: "container flex items-end justify-between" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", { class: "font-opensans text-xs md:text-base mb-6 mr-4" }, "\xA92021 SpaceRobots. All rights reserved.", -1));
const _hoisted_4 = { class: "flex items-center" };
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_0$4,
  alt: "Twitter"
}, null, -1));
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_1$3,
  alt: "Discord"
}, null, -1));
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_2$2,
  alt: "Telegram"
}, null, -1));
const _sfc_main$1 = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          _hoisted_3,
          createBaseVNode("div", _hoisted_4, [
            createVNode(AppSocialLink, {
              href: "https://twitter.com/SpaceRobotsNFT",
              title: "Twitter",
              class: "mr-4 md:mr-16 my-6"
            }, {
              default: withCtx(() => [
                _hoisted_5
              ]),
              _: 1
            }),
            createVNode(AppSocialLink, {
              href: "https://twitter.com/SpaceRobotsNFT",
              title: "Discord",
              class: "mr-4 md:mr-16 my-6"
            }, {
              default: withCtx(() => [
                _hoisted_6
              ]),
              _: 1
            }),
            createVNode(AppSocialLink, {
              href: "https://t.me/spacerobots",
              title: "Telegram",
              class: "my-6"
            }, {
              default: withCtx(() => [
                _hoisted_7
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
};
var AppFooter = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f8550256"]]);
var App_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { class: "main text-white" };
const _hoisted_2 = { style: { "position": "relative", "z-index": "1" } };
const _sfc_main = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(AppNav),
          createVNode(_sfc_main$2),
          createVNode(AppFooter)
        ])
      ]);
    };
  }
};
var index = "";
createApp(_sfc_main).mount("#app");
function canUseWebP() {
  var elem = document.createElement("canvas");
  if (!!(elem.getContext && elem.getContext("2d"))) {
    if (elem.toDataURL("image/webp").indexOf("data:image/webp") == 0) {
      document.querySelector("body").classList.add("webp");
    } else {
      document.querySelector("body").classList.add("no-webp");
    }
  }
  return false;
}
canUseWebP();
