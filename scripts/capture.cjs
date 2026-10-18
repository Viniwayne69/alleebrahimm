const { chromium } = require('playwright');
const { writeFileSync } = require('node:fs');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  const stage = process.argv[2] || 'after';
  const url = process.env.PREVIEW_URL || 'http://localhost:3001';
  const results = [];
  for (const [width, height] of [[360,740], [393,852], [430,932], [768,1024], [1440,900]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished)));
    const layout = await page.evaluate(() => {
      const box = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
      return {
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        background: getComputedStyle(document.body).backgroundColor,
        divider: getComputedStyle(document.querySelector('.divider')).backgroundColor,
        logo: box('.logo'), avatar: box('.avatar'), card: box('.card'), seal: box('.seal img'),
        buttonHeights: [...document.querySelectorAll('.link-button')].map(el => el.getBoundingClientRect().height),
        fonts: [...document.fonts].filter(font=>font.status === 'loaded').map(font=>({family:font.family,weight:font.weight,stretch:font.stretch})),
        buttonFour: (() => { const el = document.querySelectorAll('nav a')[3]; const pill = el.querySelector('.date'); return { background: getComputedStyle(el).backgroundColor, color: getComputedStyle(el).color, weight: getComputedStyle(el.querySelector('strong')).fontWeight, pillBackground: getComputedStyle(pill).backgroundColor, pillColor: getComputedStyle(pill).color, arrow: getComputedStyle(el.querySelector('.chevron')).color }; })(),
        buttonFive: (() => { const css = getComputedStyle(document.querySelectorAll('nav a')[4]); return {background:css.backgroundColor,border:css.borderTopColor}; })(),
        imagesLoaded: [...document.images].every(img=>img.complete && img.naturalWidth > 0),
        links: [...document.querySelectorAll('nav a')].map(el=>({text:el.textContent,href:el.getAttribute('href'),target:el.target,rel:el.rel})),
      };
    });
    assert.equal(layout.scrollWidth, width, 'No horizontal overflow');
    assert.equal(layout.background, 'rgb(0, 45, 60)');
    assert.equal(layout.divider, 'rgb(223, 146, 38)');
    assert.equal(layout.imagesLoaded, true);
    assert.equal(layout.links.length, 5);
    assert.deepEqual(layout.buttonFour,{background:'rgb(255, 248, 238)',color:'rgb(0, 45, 60)',weight:'800',pillBackground:'rgb(131, 20, 23)',pillColor:'rgb(255, 248, 238)',arrow:'rgb(0, 45, 60)'});
    assert.deepEqual(layout.buttonFive,{background:'rgba(0, 0, 0, 0)',border:'rgb(255, 248, 238)'});
    assert(layout.buttonHeights.every(height=>height>=44));
    assert(Math.abs(layout.logo.width/layout.logo.height-226/158)<.005);
    if (width===393) assert(layout.scrollHeight<=height, 'Whole card fits at 393 x 852');
    assert(errors.length===0,errors.join('\n'));
    await page.screenshot({ path: `artifacts/visual-review/${stage}-${width}x${height}.png`, fullPage: false });
    await page.keyboard.press('Tab');
    const focus = await page.locator('nav a').first().evaluate(el=>({focused:document.activeElement===el,style:getComputedStyle(el).outlineStyle,width:getComputedStyle(el).outlineWidth}));
    assert(focus.focused && focus.style==='solid' && focus.width==='3px');
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
    const {root} = await cdp.send('DOM.getDocument');
    const renderedFonts = [];
    for (const selector of ['h1','.button-copy','.button-copy strong','.date']) {
      const {nodeId} = await cdp.send('DOM.querySelector',{nodeId:root.nodeId,selector});
      const {fonts} = await cdp.send('CSS.getPlatformFontsForNode',{nodeId});
      renderedFonts.push({selector,fonts});
      
      assert(fonts.length>0 && fonts.every(font=>font.familyName.startsWith('Fira Sans') && font.isCustomFont), 'Only the actual Fira Sans font renders text');
    }
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.locator('nav li').first().evaluate(el=>getComputedStyle(el).animationName), 'none');
    results.push({width,height,...layout,focus,renderedFonts,errors});
    console.log(`${width}x${height}: passed, page ${layout.scrollWidth}x${layout.scrollHeight}`);
    await page.close();
  }
  await browser.close();
  writeFileSync('artifacts/visual-review/responsive-checks.json', JSON.stringify(results,null,2));
})().catch(error=>{console.error(error);process.exit(1)});




