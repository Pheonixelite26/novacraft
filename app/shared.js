// ============ NOVACRAFT SHARED ============
// Versiune: 2.0 | Multi-page architecture

// Config e in fiecare pagina
const AI_KEY = '';

// ============ SUPABASE ============
// db este initializat per-pagina (global var)

// ============ STATE ============
let user = null, profile = null;

// ============ AUTH ============
async function initAuth(requireAuth = true) {
  const { data: { session } } = await db.auth.getSession();
  if (session?.user) {
    user = session.user;
    const { data: prof } = await db.from('profiles').select('*').eq('id', user.id).single();
    profile = prof;
    updateNavbar();
    return true;
  } else {
    user = null; profile = null;
    if (requireAuth) {
      window.location.href = '/';
    }
    updateNavbar();
    return false;
  }
}

async function doLogout() {
  await db.auth.signOut();
  window.location.href = '/';
}

// ============ NAVBAR ============
function updateNavbar() {
  const isRo = (localStorage.getItem('uiLang') || 'ro') === 'ro';
  const navGuest = document.getElementById('navGuest');
  const navMember = document.getElementById('navMember');
  const navEmail = document.getElementById('navEmail');
  if (user) {
    if (navGuest) navGuest.style.display = 'none';
    if (navMember) navMember.style.display = 'flex';
    if (navEmail) navEmail.textContent = user.email;
  } else {
    if (navGuest) navGuest.style.display = 'flex';
    if (navMember) navMember.style.display = 'none';
  }
}

// ============ I18N ============
const LANGS={
  ro:{code:'RO'},
  en:{code:'EN',navHome:'Home',navPlans:'Plans',navLogin:'Login',navRegister:'Start Free',navLogout:'Logout',
    heroEyebrow:'// PREMIUM LISTING GENERATOR',
    heroH1:'Listings that <em>sell</em>,<br><span>generated in seconds</span>',
    heroSub:'The first tool for premium listings on any marketplace.',
    heroCta1:'Start Free',heroCta2:'I have an account',heroFunctOn:'WORKS ON',
    featEyebrow:'// WHY NOVACRAFT',featTitle:'Everything you need for a perfect listing',
    feat1Title:'11 Premium Sections',feat1Desc:'Complete template generated in ~60 seconds, ready to upload.',
    feat2Title:'Any Language',feat2Desc:'Generate your listing in any language and instantly translate it to any other &mdash; English, Bulgarian, Hungarian, German and more.',
    feat3Title:'Professional Photos',feat3Desc:'Background removal, infographics, complete image pack. (coming soon)',
    feat4Title:'Any Marketplace',feat4Desc:'eMAG, Amazon, eBay, Allegro, Wildberries, Shopify.',
    
    feat6Title:'Complete History',feat6Desc:'All listings saved. Access anytime, edit, export, reuse.',
    priceEyebrow:'// PLANS',priceTitle:'Simple and transparent',
    price1Desc:'First month free, then paid',price2Desc:'For individual sellers',
    price3Desc:'For active sellers',price4Desc:'For agencies and resellers',
    priceBtn1:'Start Free',priceBtn2:'Choose Starter',priceBtn3:'Choose Pro',priceBtn4:'Choose Agency',
    pf1a:'5 listings first month',pf1b:'All 11 sections',pf1c:'Translations included',
    pf1d:'Listing save',pf1e:'No card required',
    pf2a:'15 listings/month',pf2b:'All 11 sections',pf2c:'All languages',pf2d:'Full history',pf2e:'Email support',
    pf3a:'50 listings/month',pf3b:'Premium Photo Module',pf3c:'All languages',
    pf3d:'Unlimited history',pf3e:'ZIP Export',pf3f:'Priority support',
    pf4a:'Unlimited listings',pf4b:'Multi-brand / client',pf4c:'API Access',
    pf4d:'White-label optional',pf4e:'Dedicated support',
    footerText:'© 2025 NovaCraft · All rights reserved',
    modalTabLogin:'Login',modalTabReg:'New Account',
    labelEmail:'EMAIL',labelPass:'PASSWORD',labelName:'FULL NAME',
    btnLogin:'Sign in',btnRegister:'Create free account',
    sidebarMenu:'MENU',sidebarCont:'ACCOUNT',sidebarDash:'Profile',
    sidebarGen:'Generator',sidebarHist:'History',sidebarSett:'Settings',
    dashSub:'What listing are we generating today?',dashNewBtn:'+ New Listing',
    statLbl1:'// TOTAL LISTINGS',statHint1:'in your account',
    statLbl2:'// THIS MONTH',statLbl3:'// ACTIVE PLAN',
    statLbl1txt:'TOTAL LISTINGS',statLbl2txt:'THIS MONTH',
    statLbl3txt:'ACTIVE PLAN',statLbl4txt:'TRANSLATION CREDITS',
    statHintCredits:'extra credits available',
    settCreditLbl:'TRANSLATION CREDITS',
    recentTitle:'Recent Listings',recentLinkBtn:'View all →',
    genTitle:'Premium Listing Generator',
    genSub:'Fill in the product info — the complete listing is auto-generated',
    genPlatLbl:'Platform',genLangLbl:'Generation language',
    genNameLbl:'Product name',genSpecsLbl:'Specifications / Product info',
    genKwLbl:'Keywords',genCatLbl:'Product category',
    genPriceLbl:'Price (local currency)',genPkgLbl:'Package contents',
    genBrandLbl:'Brand',genBrandOpt:'— optional',
    platSite:'Own website',platUniversal:'Universal',
    genBtnText:'⚡ GENERATE COMPLETE LISTING',generating:'Generating...',
    outSaveBtn:'💾 SAVE',outCopyBtn:'COPY ALL',saved:'✓ SAVED',
    histTitle:'Listing History',histSub:'All listings generated and saved in your account',
    settTitle:'Account Settings',settSub:'Account and plan information',
    settEmailLbl:'EMAIL',settPlanLbl:'ACTIVE PLAN',settLangLbl:'INTERFACE LANGUAGE',
    settCreditsAvail:'credits available',settFreeTransInclus:'3 free translations included per listing',
    upgradeTitle:'Upgrade to Pro — 19€/month',upgradeDesc:'30 listings/month, photo module, all languages, unlimited history.',
    upgradeBtn:'Upgrade (coming soon)',
    welcome:'Welcome back!',loggedOut:'You have been logged out.',
    listingSaved:'Listing saved!',listingDeleted:'Listing deleted.',listingCopied:'Listing copied!',
    openBtn:'OPEN',deleteBtn:'DELETE',copyBtn:'COPY',copiedBtn:'✓ COPIED',
    emptyDash:"You haven't generated any listings yet.",emptyHist:'No saved listings yet.',
    newListingBtn:'Generate first listing',confirmDelete:'Delete this listing?',
    fillRequired:'Please fill in product name and specifications.',
    limitReached:'You have reached the FREE plan limit.',upgradeLink:'Upgrade to Pro →',
    listariPeL:'listings/month',din:'of',dinDisp:'available',
    plusMore:'+ more',firstMonth:'/first month',perMonth:'/month',
    freeTransPerListing:'3 free translations / listing',noExtraCredits:'0 extra credits',
    creditsPerMonth10:'+ 10 translation credits / month',
    creditsPerMonth50:'+ 50 translation credits / month',
    creditsPerMonth200:'+ 200 translation credits / month',
    priceBanner:'All plans include <strong>3 free translations</strong> per listing · Extra via credits',
    creditsBannerSub:'Extra credits: 10 = 2€ · 50 = 8€ · 100 = 14€'
  }
};

const TR={
ro:{'plusMore':'+ orice','priceBanner':'Toate planurile includ <strong>3 traduceri gratuite</strong> per listing · Traduceri extra prin credite','firstMonth':'/prima luna','perMonth':'/luna','freeTransPerListing':'3 traduceri gratuite / listing','noExtraCredits':'0 credite extra','creditsPerMonth10':'+ 10 credite traduceri / luna','creditsPerMonth50':'+ 50 credite traduceri / luna','creditsPerMonth200':'+ 200 credite traduceri / luna','creditsBannerSub':'Credite extra disponibile separat: 10 credite = 2€ · 50 credite = 8€ · 100 credite = 14€','upgradeBtn':'Upgrade (in curand)','settCreditsAvail':'credite disponibile','settFreeTransInclus':'3 traduceri gratuite incluse per listing','platSite':'Site propriu','platUniversal':'Universal','statLbl1txt':'TOTAL LISTARI','statLbl2txt':'LUNA ACEASTA','statLbl3txt':'PLAN ACTIV','statLbl4txt':'CREDITE TRADUCERI','limitReachedFull':'Ai atins limita planului FREE (3 listari/luna).','noCreditsMsg':'Ai folosit cele 3 traduceri gratuite pentru acest listing. Ai nevoie de credite extra pentru traduceri suplimentare.','genBrandLbl':'Brand','genBrandOpt':'— optional',statHintCredits:'credite extra disponibile',settCreditLbl:'CREDITE TRADUCERI',navLogin:'Login',navRegister:'Incepe Gratuit',navLogout:'Logout',heroEyebrow:'// GENERATOR PREMIUM DE LISTARI',heroH1:'Listari care <em>vand</em>,<br><span>generate in secunde</span>',heroSub:'Primul tool din Romania pentru listari premium pe orice marketplace. Text profesional + Poze + Traduceri automate.',heroCta1:'Incepe Gratuit',heroCta2:'Am deja cont',heroFunctOn:'FUNCTIONEAZA PE',featEyebrow:'// DE CE NOVACRAFT',featTitle:'Tot ce ai nevoie pentru un listing perfect',feat1Title:'11 Sectiuni Premium',feat1Desc:'Template complet: titlu SEO, beneficii, features, FAQ, garantie, CTA. Generat in ~60 secunde, gata de upload.',feat2Title:'Orice Limba',feat2Desc:'Genereaza listing-ul in orice limba si traduce-l instant in oricare alta &mdash; engleza, bulgara, maghiara, germana si nu numai.',feat3Title:'Poze Profesionale',feat3Desc:'Eliminare fundal, infografice cu specificatii, pachet complet imagini gata de upload. (in curand)',feat4Title:'Orice Marketplace',feat4Desc:'eMAG, Amazon, eBay, Allegro, Wildberries, Shopify. Standardul premium care functioneaza oriunde vinzi.',feat6Title:'Istoric Complet',feat6Desc:'Toate listingurile salvate in contul tau. Acces oricand, editare, export, refolosire pentru clienti noi.',priceEyebrow:'// PLANURI',priceTitle:'Simplu si transparent',price1Desc:'Prima luna gratuit, apoi platit',price2Desc:'Pentru vanzatori individuali',price3Desc:'Pentru vanzatori activi',price4Desc:'Pentru agentii si reselleri',priceBtn1:'Incepe Gratuit',priceBtn2:'Alege Starter',priceBtn3:'Alege Pro',priceBtn4:'Alege Agency',pf1a:'5 listari in prima luna',pf1b:'Toate cele 11 sectiuni',pf1c:'Traduceri incluse',pf1d:'Salvare listing',pf1e:'Fara card necesar',pf2a:'15 listari pe luna',pf2b:'Toate cele 11 sectiuni',pf2c:'Toate limbile',pf2d:'Istoric complet',pf2e:'Suport email',pf3a:'50 listari pe luna',pf3b:'Modul Poze Premium',pf3c:'Toate limbile',pf3d:'Istoric nelimitat',pf3e:'Export ZIP',pf3f:'Suport prioritar',pf4a:'Listari nelimitate',pf4b:'Multi-brand / client',pf4c:'API Access',pf4d:'White-label optional',pf4e:'Suport dedicat',footerText:'© 2025 NovaCraft · Toate drepturile rezervate',modalTabLogin:'Login',modalTabReg:'Cont Nou',labelEmail:'EMAIL',labelPass:'PAROLA',labelName:'NUME COMPLET',btnLogin:'Intra in cont',btnRegister:'Creeaza cont gratuit',sidebarMenu:'MENIU',sidebarCont:'CONT',sidebarDash:'Profile',sidebarGen:'Generator',sidebarHist:'Istoric',sidebarSett:'Setari',dashSub:'Ce listing generam azi?',dashNewBtn:'+ Listing Nou',statLbl1:'// TOTAL LISTARI',statHint1:'in contul tau',statLbl2:'// LUNA ACEASTA',statLbl3:'// PLAN ACTIV',recentTitle:'Listari Recente',recentLinkBtn:'Vezi toate →',genTitle:'Generator Listing Premium',genSub:'Completeaza informatiile produsului — listing-ul complet se genereaza automat',genPlatLbl:'Platforma',genLangLbl:'Limba generare',genNameLbl:'Nume produs',genSpecsLbl:'Specificatii / Informatii produs',genKwLbl:'Keywords',genCatLbl:'Categorie produs',genPriceLbl:'Pret (moneda locala)',genPkgLbl:'Continut pachet',genBtnText:'⚡ GENEREAZA LISTING COMPLET',generating:'Se genereaza...',outSaveBtn:'💾 SALVEAZA',outCopyBtn:'COPIAZA TOT',saved:'✓ SALVAT',histTitle:'Istoricul Listingurilor',histSub:'Toate listingurile generate si salvate in contul tau',settTitle:'Setari Cont',settSub:'Informatii despre contul si planul tau',settEmailLbl:'EMAIL',settPlanLbl:'PLAN ACTIV',settLangLbl:'LIMBA INTERFATA',upgradeTitle:'Upgrade la Pro — 19€/luna',upgradeDesc:'30 listari/luna, modul poze premium, toate limbile, istoric nelimitat, export ZIP.',upgradeBtn:'Upgrade (in curand)',welcome:'Bine ai revenit!',loggedOut:'Te-ai deconectat.',listingSaved:'Listing salvat!',listingDeleted:'Listing sters.',listingCopied:'Listing copiat complet!',openBtn:'DESCHIDE',deleteBtn:'STERGE',copyBtn:'COPIAZA',copiedBtn:'✓ COPIAT',emptyDash:'Nu ai generat inca nicio listare.',emptyHist:'Nu ai listari salvate inca.',newListingBtn:'Genereaza primul listing',confirmDelete:'Stergi acest listing?',fillRequired:'Completeaza minim numele produsului si specificatiile.',limitReached:'Ai atins limita planului FREE (3 listari/luna).',upgradeLink:'Upgrade la Pro →',listariPeL:'listari/luna',din:'din',dinDisp:'disponibile'},
en:{'plusMore':'+ more','priceBanner':'All plans include <strong>3 free translations</strong> per listing · Extra translations via credits','firstMonth':'/first month','perMonth':'/month','freeTransPerListing':'3 free translations / listing','noExtraCredits':'0 extra credits','creditsPerMonth10':'+ 10 translation credits / month','creditsPerMonth50':'+ 50 translation credits / month','creditsPerMonth200':'+ 200 translation credits / month','creditsBannerSub':'Extra credits available separately: 10 credits = 2€ · 50 credits = 8€ · 100 credits = 14€','upgradeBtn':'Upgrade (coming soon)','settCreditsAvail':'credits available','settFreeTransInclus':'3 free translations included per listing','platSite':'Own website','platUniversal':'Universal','statLbl1txt':'TOTAL LISTINGS','statLbl2txt':'THIS MONTH','statLbl3txt':'ACTIVE PLAN','statLbl4txt':'TRANSLATION CREDITS','limitReachedFull':'You have reached the FREE plan limit (3 listings/month).','noCreditsMsg':'You have used your 3 free translations for this listing. You need extra credits for additional translations.','genBrandLbl':'Brand','genBrandOpt':'— optional',statHintCredits:'extra credits available',settCreditLbl:'TRANSLATION CREDITS',navHome:'Home',navPlans:'Plans',navLogin:'Login',navRegister:'Start Free',navLogout:'Logout',heroEyebrow:'// PREMIUM LISTING GENERATOR',heroH1:'Listings that <em>sell</em>,<br><span>generated in seconds</span>',heroSub:'The first tool for premium listings on any marketplace. Professional text + Photos + Automatic translations.',heroCta1:'Start Free',heroCta2:'I have an account',heroFunctOn:'WORKS ON',featEyebrow:'// WHY NOVACRAFT',featTitle:'Everything you need for a perfect listing',feat1Title:'11 Premium Sections',feat1Desc:'Complete template: SEO title, benefits, features, FAQ, warranty, CTA. Generated in ~60 seconds, ready to upload.',feat2Title:'Any Language',feat2Desc:'Generate your listing in any language and instantly translate it to any other — English, Bulgarian, Hungarian, German and more.',feat3Title:'Professional Photos',feat3Desc:'Background removal, infographics with specs, complete image pack ready to upload. (coming soon)',feat4Title:'Any Marketplace',feat4Desc:'eMAG, Amazon, eBay, Allegro, Wildberries, Shopify. The premium standard that works anywhere you sell.',feat6Title:'Complete History',feat6Desc:'All listings saved in your account. Access anytime, edit, export, reuse for new clients.',priceEyebrow:'// PLANS',priceTitle:'Simple and transparent',price1Desc:'First month free, then paid',price2Desc:'For individual sellers',price3Desc:'For active sellers',price4Desc:'For agencies and resellers',priceBtn1:'Start Free',priceBtn2:'Choose Starter',priceBtn3:'Choose Pro',priceBtn4:'Choose Agency',pf1a:'5 listings in first month',pf1b:'All 11 sections',pf1c:'Translations included',pf1d:'Listing save',pf1e:'No card required',pf2a:'15 listings per month',pf2b:'All 11 sections',pf2c:'All languages',pf2d:'Full history',pf2e:'Email support',pf3a:'50 listings per month',pf3b:'Premium Photo Module',pf3c:'All languages',pf3d:'Unlimited history',pf3e:'ZIP Export',pf3f:'Priority support',pf4a:'Unlimited listings',pf4b:'Multi-brand / client',pf4c:'API Access',pf4d:'White-label optional',pf4e:'Dedicated support',footerText:'© 2025 NovaCraft · All rights reserved',modalTabLogin:'Login',modalTabReg:'New Account',labelEmail:'EMAIL',labelPass:'PASSWORD',labelName:'FULL NAME',btnLogin:'Sign in',btnRegister:'Create free account',sidebarMenu:'MENU',sidebarCont:'ACCOUNT',sidebarDash:'Profile',sidebarGen:'Generator',sidebarHist:'History',sidebarSett:'Settings',dashSub:'What listing are we generating today?',dashNewBtn:'+ New Listing',statLbl1:'// TOTAL LISTINGS',statHint1:'in your account',statLbl2:'// THIS MONTH',statLbl3:'// ACTIVE PLAN',recentTitle:'Recent Listings',recentLinkBtn:'View all →',genTitle:'Premium Listing Generator',genSub:'Fill in the product info — the complete listing is auto-generated',genPlatLbl:'Platform',genLangLbl:'Generation language',genNameLbl:'Product name',genSpecsLbl:'Specifications / Product info',genKwLbl:'Keywords',genCatLbl:'Product category',genPriceLbl:'Price (local currency)',genPkgLbl:'Package contents',genBtnText:'⚡ GENERATE COMPLETE LISTING',generating:'Generating...',outSaveBtn:'💾 SAVE',outCopyBtn:'COPY ALL',saved:'✓ SAVED',histTitle:'Listing History',histSub:'All listings generated and saved in your account',settTitle:'Account Settings',settSub:'Information about your account and plan',settEmailLbl:'EMAIL',settPlanLbl:'ACTIVE PLAN',settLangLbl:'INTERFACE LANGUAGE',upgradeTitle:'Upgrade to Pro — 19€/month',upgradeDesc:'30 listings/month, premium photo module, all languages, unlimited history, ZIP export.',upgradeBtn:'Upgrade (coming soon)',welcome:'Welcome back!',loggedOut:'You have been logged out.',listingSaved:'Listing saved!',listingDeleted:'Listing deleted.',listingCopied:'Listing copied!',openBtn:'OPEN',deleteBtn:'DELETE',copyBtn:'COPY',copiedBtn:'✓ COPIED',emptyDash:"You haven't generated any listings yet.",emptyHist:'No saved listings yet.',newListingBtn:'Generate first listing',confirmDelete:'Delete this listing?',fillRequired:'Please fill in product name and specifications.',limitReached:'You have reached the FREE plan limit (3 listings/month).',upgradeLink:'Upgrade to Pro →',listariPeL:'listings/month',din:'of',dinDisp:'available'},
};

function t(k){ const d=TR[uiLang]||TR.ro; return d[k]!==undefined?d[k]:(TR.ro[k]||k); }

function applyTranslations(){
  // 1. All elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    const v=t(key);
    if(v && v!==key){
      if(['heroH1'].includes(key)) el.innerHTML=v;
      else el.textContent=v;
    }
  });
  
  // 2. Specific elements by ID
  const ids={
    'heroH1':['innerHTML','heroH1'],
    'navLoginBtn':['textContent','navLogin'],
    'navRegBtn':['textContent','navRegister'],
    'navLogoutBtn':['textContent','navLogout'],
  };
  Object.entries(ids).forEach(([id,[prop,key]])=>{
    const el=document.getElementById(id); if(el) el[prop]=t(key);
  });
  
  // 3. Landing footer
  const ft=document.querySelector('.landing-footer'); if(ft) ft.textContent=t('footerText');
  
  // 4. Language selector UI
  const li=LANGS[uiLang]; if(li){
    const fl=document.getElementById('activeLangFlag'); if(fl){fl.textContent=li.code;}
    const lc=document.getElementById('activeLangCode'); if(lc) lc.textContent=li.code;
  }
  document.querySelectorAll('.lang-opt').forEach(o=>o.classList.toggle('cur',o.getAttribute('data-lang')===uiLang));
  const uiSel=document.getElementById('uiLangSel'); if(uiSel) uiSel.value=uiLang;
  const sl=document.getElementById('settLang'); if(sl) sl.value=uiLang;
  
  // 5. Price banner (has HTML inside)
  const pb=document.getElementById('priceBannerTxt'); if(pb) pb.innerHTML=t('priceBanner');
  
  // 6. Generate button
  const gb=document.getElementById('genMainBtn'); if(gb&&!gb.disabled) gb.innerHTML=t('genBtnText');
  
  // 7. Save button
  const sb=document.getElementById('saveBtn'); if(sb&&sb.textContent.trim().startsWith('💾')) sb.textContent=t('outSaveBtn');
  
  // 8. Greeting subtitle
  const gs=document.querySelector('[data-i18n="dashSub"]'); if(gs) gs.textContent=t('dashSub');
  
  // 9. Update placeholders
  const plMap={
    gName:{ro:'ex: Mini Camera 4K Sport Action + Telecomanda',en:'ex: Mini 4K Action Camera + Remote + Accessories'},
    gSpecs:{ro:'Lipeste orice ai gasit: specs, descriere, bullet points...',en:'Paste anything: specs, description, bullet points...'},
    gKeywords:{ro:'camera sport 4k, camera actiune, camera waterproof...',en:'sport camera 4k, action camera, waterproof camera...'},
    gBrand:{ro:'ex: Samsung, Philips, Bosch... (lasa gol daca nu ai brand)',en:'ex: Samsung, Philips, Bosch... (leave empty if no brand)'},
    gCategory:{ro:'ex: Camere sport, Accesorii PS5...',en:'ex: Sports Cameras, PS5 Accessories...'},
    gPrice:{ro:'ex: 199 RON, 39 EUR...',en:'ex: 199 RON, 39 EUR...'},
    gPackage:{ro:'ex: 1x camera, 2x baterie, 1x telecomanda, kit accesorii...',en:'ex: 1x camera, 2x battery, 1x remote, accessories kit...'}
  };
  Object.keys(plMap).forEach(id=>{
    const el=document.getElementById(id);
    if(el&&plMap[id][uiLang]) el.placeholder=plMap[id][uiLang];
  });
  
  // Translate gLang select options (listing generation language)
  const gLangSel=document.getElementById('gLang');
  if(gLangSel){
    Array.from(gLangSel.options).forEach(opt=>{
      const translated=opt.getAttribute('data-'+uiLang);
      if(translated) opt.textContent=translated;
    });
  }
  
  // 10. Reload dynamic content if currently visible
  const activePage=document.querySelector('.page.active');
  if(activePage){
    const pageId=activePage.id;
    if(pageId==='p-dash') loadDash();
    if(pageId==='p-hist') loadHist();
    if(pageId==='p-sett') loadSett();
  }
  // Re-render upgrade box on lang change
  if(document.getElementById('upgradeBox')) renderUpgradeBox();
  
}

function toggleLangDrop(e){
  e.stopPropagation();
  document.getElementById('langDrop').classList.toggle('open');
  document.getElementById('langTrigger').classList.toggle('open');
}
document.addEventListener('click',()=>{
  document.getElementById('langDrop')?.classList.remove('open');
  document.getElementById('langTrigger')?.classList.remove('open');
});

function setUILang(l){
  uiLang=l;
  localStorage.setItem('uiLang',l);
  applyTranslations();
  document.getElementById('langDrop')?.classList.remove('open');
  document.getElementById('langTrigger')?.classList.remove('open');
}


// ============ PLANS MODAL ============
const PLAN_DATA = [
  { key:'free',    labelRo:'Free',    labelEn:'Free',    price:'0€',  
    featuresRo:['5 listari/luna','Toate sectiunile','3 traduceri/listing','Salvare listing','Fara card'],
    featuresEn:['5 listings/month','All sections','3 translations/listing','Listing save','No card required'] },
  { key:'starter', labelRo:'Starter', labelEn:'Starter', price:'9€',  
    featuresRo:['15 listari/luna','Toate sectiunile','Toate limbile','Istoric complet','Email support'],
    featuresEn:['15 listings/month','All sections','All languages','Full history','Email support'] },
  { key:'pro',     labelRo:'Pro',     labelEn:'Pro',     price:'19€', highlight:true,
    featuresRo:['50 listari/luna','Modul foto premium','Toate limbile','Istoric nelimitat','Export ZIP','Suport prioritar'],
    featuresEn:['50 listings/month','Premium photo module','All languages','Unlimited history','ZIP export','Priority support'] },
  { key:'agency',  labelRo:'Agency',  labelEn:'Agency',  price:'49€', 
    featuresRo:['Listari nelimitate','Multi-brand / client','Acces API','White-label optional','Suport dedicat'],
    featuresEn:['Unlimited listings','Multi-brand / client','API access','White-label optional','Dedicated support'] },
];

function openPlansModal(){
  const modal = document.getElementById('plansModal');
  const grid = document.getElementById('plansGrid');
  const isRo = uiLang === 'ro';
  const currentPlan = (profile?.plan||'free').toLowerCase();

  document.getElementById('plansModalTitle').textContent = isRo ? 'Alege planul tău' : 'Choose your plan';
  document.getElementById('plansModalSub').textContent = isRo 
    ? 'Toate planurile includ 3 traduceri gratuite per listing' 
    : 'All plans include 3 free translations per listing';

  grid.innerHTML = PLAN_DATA.map(p => {
    const isCurrent = p.key === currentPlan;
    const isHigher = ['free','starter','pro','agency'].indexOf(p.key) > ['free','starter','pro','agency'].indexOf(currentPlan);
    const label = isRo ? p.labelRo : p.labelEn;
    const features = isRo ? p.featuresRo : p.featuresEn;
    const borderColor = p.highlight ? 'var(--accent)' : isCurrent ? '#4caf50' : 'var(--border)';
    const badge = isCurrent 
      ? `<span style="background:#4caf50;color:#fff;font-family:var(--mono);font-size:9px;padding:2px 8px;border-radius:4px;letter-spacing:.06em">${isRo?'PLAN CURENT':'CURRENT PLAN'}</span>`
      : p.highlight ? `<span style="background:var(--accent);color:#000;font-family:var(--mono);font-size:9px;padding:2px 8px;border-radius:4px;letter-spacing:.06em">${isRo?'POPULAR':'POPULAR'}</span>` : '';
    const btnLabel = isCurrent 
      ? (isRo?'Plan curent':'Current plan')
      : isHigher 
        ? (isRo?'Upgrade (curand)':'Upgrade (soon)') 
        : (isRo?'Downgrade (curand)':'Downgrade (soon)');
    const btnStyle = isCurrent 
      ? 'opacity:.5;cursor:not-allowed;background:var(--surface2);border:1px solid var(--border);color:var(--muted)'
      : 'cursor:not-allowed;opacity:.7';

    return `<div style="background:var(--surface);border:1px solid ${borderColor};border-radius:14px;padding:20px;display:flex;flex-direction:column;gap:12px;position:relative;transition:border-color .2s">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div style="font-family:var(--display);font-size:18px;font-weight:800">${label}</div>
        ${badge}
      </div>
      <div style="font-family:var(--display);font-size:26px;font-weight:800;color:var(--accent)">${p.price}<span style="font-size:13px;color:var(--muted);font-family:var(--mono)">/${isRo?'luna':'mo'}</span></div>
      <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px;flex:1">
        ${features.map(f=>`<li style="font-size:12px;color:var(--muted);display:flex;align-items:center;gap:7px"><span style="color:#4caf50;font-size:14px">✓</span>${f}</li>`).join('')}
      </ul>
      <button style="width:100%;padding:10px;font-family:var(--mono);font-size:11px;letter-spacing:.06em;border:1px solid var(--accent);border-radius:8px;color:${isCurrent?'var(--muted)':'var(--accent)'};${btnStyle};background:${isCurrent?'var(--surface2)':'transparent'}" 
        ${isCurrent?'disabled':''}>${btnLabel}</button>
    </div>`;
  }).join('');

  // Show cancel button only for paid plans
  const cancelSection = document.getElementById('cancelPlanSection');
  const cancelText = document.getElementById('cancelPlanText');
  const cancelBtn = document.getElementById('cancelPlanBtn');
  if(currentPlan !== 'free' && currentPlan !== 'admin'){
    cancelSection.style.display = 'block';
    cancelText.textContent = isRo ? 'Vrei să anulezi abonamentul?' : 'Want to cancel your subscription?';
    cancelBtn.textContent = isRo ? 'ANULEAZĂ ABONAMENTUL' : 'CANCEL SUBSCRIPTION';
  } else {
    cancelSection.style.display = 'none';
  }

  modal.classList.add('active');
}

function closePlansModal(){
  document.getElementById('plansModal').classList.remove('active');
}

function cancelPlan(){
  const isRo = uiLang === 'ro';
  const confirmed = confirm(isRo 
    ? 'Ești sigur că vrei să anulezi abonamentul? Planul tău va rămâne activ până la sfârșitul perioadei plătite.'
    : 'Are you sure you want to cancel? Your plan will remain active until the end of the paid period.');
  if(!confirmed) return;
  // Stripe cancel logic here — for now show info
  showToast(isRo 
    ? 'Functie disponibila curand. Contacteaza support pentru anulare manuala.'
    : 'Feature coming soon. Contact support for manual cancellation.', 'ok');
}

// ============ INIT LANG ============
function initLang() {
  uiLang = localStorage.getItem('uiLang') || 'ro';
  applyTranslations();
}

// ============ TOAST ============
function showToast(msg, type='ok') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show ' + type;
  setTimeout(() => t.className = 'toast', 3000);
}

// ============ PLANS MODAL ============
const PLAN_DATA = [
  { key:'free',    labelRo:'Free',    labelEn:'Free',    price:'0€',  
    featuresRo:['5 listari/luna','Toate sectiunile','3 traduceri/listing','Salvare listing','Fara card'],
    featuresEn:['5 listings/month','All sections','3 translations/listing','Listing save','No card required'] },
  { key:'starter', labelRo:'Starter', labelEn:'Starter', price:'9€',  
    featuresRo:['15 listari/luna','Toate sectiunile','Toate limbile','Istoric complet','Email support'],
    featuresEn:['15 listings/month','All sections','All languages','Full history','Email support'] },
  { key:'pro',     labelRo:'Pro',     labelEn:'Pro',     price:'19€', highlight:true,
    featuresRo:['50 listari/luna','Modul foto premium','Toate limbile','Istoric nelimitat','Export ZIP','Suport prioritar'],
    featuresEn:['50 listings/month','Premium photo module','All languages','Unlimited history','ZIP export','Priority support'] },
  { key:'agency',  labelRo:'Agency',  labelEn:'Agency',  price:'49€', 
    featuresRo:['Listari nelimitate','Multi-brand / client','Acces API','White-label optional','Suport dedicat'],
    featuresEn:['Unlimited listings','Multi-brand / client','API access','White-label optional','Dedicated support'] },
];

function openPlansModal() {
  const modal = document.getElementById('plansModal');
  if (!modal) return;
  const grid = document.getElementById('plansGrid');
  const isRo = uiLang === 'ro';
  const currentPlan = (profile?.plan || 'free').toLowerCase();

  document.getElementById('plansModalTitle').textContent = isRo ? 'Alege planul tău' : 'Choose your plan';
  document.getElementById('plansModalSub').textContent = isRo
    ? 'Toate planurile includ 3 traduceri gratuite per listing'
    : 'All plans include 3 free translations per listing';

  grid.innerHTML = PLAN_DATA.map(p => {
    const isCurrent = p.key === currentPlan;
    const isHigher = ['free','starter','pro','agency'].indexOf(p.key) > ['free','starter','pro','agency'].indexOf(currentPlan);
    const label = isRo ? p.labelRo : p.labelEn;
    const features = isRo ? p.featuresRo : p.featuresEn;
    const borderColor = p.highlight ? 'var(--accent)' : isCurrent ? '#4caf50' : 'var(--border)';
    const badge = isCurrent
      ? `<span style="background:#4caf50;color:#fff;font-family:var(--mono);font-size:9px;padding:2px 8px;border-radius:4px;letter-spacing:.06em">${isRo?'PLAN CURENT':'CURRENT PLAN'}</span>`
      : p.highlight ? `<span style="background:var(--accent);color:#000;font-family:var(--mono);font-size:9px;padding:2px 8px;border-radius:4px;letter-spacing:.06em">POPULAR</span>` : '';
    const btnLabel = isCurrent ? (isRo?'Plan curent':'Current plan') : isHigher ? (isRo?'Upgrade (curand)':'Upgrade (soon)') : (isRo?'Downgrade (curand)':'Downgrade (soon)');
    const btnDisabled = isCurrent ? 'disabled' : '';
    const btnStyle = isCurrent ? 'opacity:.5;cursor:not-allowed;background:var(--surface2);border:1px solid var(--border);color:var(--muted)' : 'cursor:not-allowed;opacity:.7';
    return `<div style="background:var(--surface);border:1px solid ${borderColor};border-radius:14px;padding:20px;display:flex;flex-direction:column;gap:12px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div style="font-family:var(--display);font-size:18px;font-weight:800">${label}</div>${badge}
      </div>
      <div style="font-family:var(--display);font-size:26px;font-weight:800;color:var(--accent)">${p.price}<span style="font-size:13px;color:var(--muted);font-family:var(--mono)">/${isRo?'luna':'mo'}</span></div>
      <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px;flex:1">
        ${features.map(f=>`<li style="font-size:12px;color:var(--muted);display:flex;align-items:center;gap:7px"><span style="color:#4caf50">✓</span>${f}</li>`).join('')}
      </ul>
      <button style="width:100%;padding:10px;font-family:var(--mono);font-size:11px;letter-spacing:.06em;border:1px solid var(--accent);border-radius:8px;color:${isCurrent?'var(--muted)':'var(--accent)'};${btnStyle};background:${isCurrent?'var(--surface2)':'transparent'}" ${btnDisabled}>${btnLabel}</button>
    </div>`;
  }).join('');

  const cancelSection = document.getElementById('cancelPlanSection');
  const cancelText = document.getElementById('cancelPlanText');
  const cancelBtn = document.getElementById('cancelPlanBtn');
  if (currentPlan !== 'free' && currentPlan !== 'admin') {
    if(cancelSection) cancelSection.style.display = 'block';
    if(cancelText) cancelText.textContent = isRo ? 'Vrei să anulezi abonamentul?' : 'Want to cancel your subscription?';
    if(cancelBtn) cancelBtn.textContent = isRo ? 'ANULEAZĂ ABONAMENTUL' : 'CANCEL SUBSCRIPTION';
  } else {
    if(cancelSection) cancelSection.style.display = 'none';
  }
  modal.classList.add('active');
}

function closePlansModal() {
  const modal = document.getElementById('plansModal');
  if (modal) modal.classList.remove('active');
}

function cancelPlan() {
  const isRo = uiLang === 'ro';
  const confirmed = confirm(isRo
    ? 'Esti sigur ca vrei sa anulezi abonamentul? Planul tau va ramane activ pana la sfarsitul perioadei platite.'
    : 'Are you sure you want to cancel? Your plan will remain active until the end of the paid period.');
  if (!confirmed) return;
  showToast(isRo
    ? 'Functie disponibila curand. Contacteaza support pentru anulare manuala.'
    : 'Feature coming soon. Contact support for manual cancellation.', 'ok');
}
