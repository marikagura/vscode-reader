/* ════════════════════════════════════════════════════════════
   kimi-dash · v3 全铺仪表盘 sidebar（停靠左侧 · 可滚 · 可隐）
   Mucha black-gold baroque · ported from _design_vscode v3
   真数据：目录(437) / 钉记 / 提醒 已接；其余为壳，待接 kimi
   ════════════════════════════════════════════════════════════ */
(function(){
function mount(){
  if(document.getElementById('kimi-dash'))return;
  if(!document.body||!document.querySelector('.monaco-workbench')){setTimeout(mount,400);return;}

  /* ───────── 真数据 ───────── */
  var CH=(window.READER_CHAPTERS && window.READER_CHAPTERS.length) ? window.READER_CHAPTERS : ["第1章 序","第2章 启程","第3章 远方","第4章 旧城","第5章 夜雨","第6章 抉择","第7章 归途","第8章 重逢","第9章 余烬","第10章 黎明","第11章 약속","第12章 终章"];
  var PIN=["在这里写你的钉记","点一下就能改 · 回车保存","＋ 钉一条 加新的"];
  var VOL=[{n:'卷一',s:0,e:6},{n:'卷二',s:6,e:12}];
  var ROM=['I','II','III'];
  var IC=(typeof window!=='undefined'&&window.KIMI_ICONS)||{};

  /* ───────── SVG 纹章库（id 全部 kd- 前缀，避免与其他 widget 冲突）───────── */
  var DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <linearGradient id="kd-ggold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8d199"/><stop offset=".5" stop-color="#c9a86a"/><stop offset="1" stop-color="#8a6f3c"/></linearGradient>
    <radialGradient id="kd-gmoon" cx="38%" cy="34%" r="75%"><stop offset="0" stop-color="#fdf3d4"/><stop offset=".55" stop-color="#e8cf94"/><stop offset="1" stop-color="#9c7e3f"/></radialGradient>
    <symbol id="kd-acat" viewBox="0 0 24 24"><path d="M5 5.5c2.5-1 5 0 7 .8 2-.8 4.5-1.8 7-.8v12c-2.5-1-5 0-7 .8-2-.8-4.5-1.8-7-.8z" class="ln"/><path d="M12 6.3v12" class="ln"/></symbol>
    <symbol id="kd-asrch" viewBox="0 0 24 24"><circle cx="11" cy="11" r="5.5" class="ln"/><path d="M15 15l4 4" class="ln"/></symbol>
    <symbol id="kd-anote" viewBox="0 0 24 24"><path d="M7 4h10v16l-5-3.4L7 20z" class="ln"/></symbol>
    <symbol id="kd-arem" viewBox="0 0 24 24"><path d="M8 4h8M8 20h8M8 4c0 4 8 4 8 8s-8 4-8 8M16 4c0 4-8 4-8 8" class="ln"/></symbol>
    <symbol id="kd-aarc" viewBox="0 0 24 24"><rect x="4.5" y="6" width="15" height="13" rx="1" class="ln"/><path d="M4.5 10h15M10 13.5h4" class="ln"/></symbol>
    <symbol id="kd-arad" viewBox="0 0 24 24"><circle cx="12" cy="13" r="6.5" class="ln"/><circle cx="12" cy="13" r="2" class="ln"/><path d="M16 5l-3 3" class="ln"/></symbol>
    <symbol id="kd-aset" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" class="ln"/><g class="ln"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M18.5 5.5l-2 2M7.5 16.5l-2 2"/></g></symbol>
    <symbol id="kd-mfull" viewBox="0 0 40 40"><circle cx="20" cy="20" r="14" fill="url(#kd-gmoon)"/></symbol>
    <symbol id="kd-mcres" viewBox="0 0 40 40"><path d="M27 6a16 16 0 1 0 0 28A20 20 0 0 1 27 6z" fill="url(#kd-gmoon)"/></symbol>
    <symbol id="kd-rose" viewBox="0 0 48 56"><g fill="none" stroke="url(#kd-ggold)" stroke-width="1.1" stroke-linecap="round"><circle cx="24" cy="20" r="9.5"/><path d="M24 13.5c3 0 5 2.4 5 4.8 0 3-2.4 4.7-5 4.7s-5-1.6-5-4.4c0-2 1.6-3.6 3.4-3.6"/><path d="M24 16.8c1.6 0 2.6 1.2 2.6 2.6s-1.2 2.4-2.6 2.4-2.6-1-2.6-2.4"/><path d="M24 29.5V44"/><path d="M24 34c-3-1-6-.6-8.5-3.2 3-.4 6 .2 8.5 2.4M24 38c3-1 6-.6 8.5-3.2-3-.4-6 .2-8.5 2.4"/></g></symbol>
    <symbol id="kd-fil" viewBox="0 0 80 80"><g fill="none" stroke="url(#kd-ggold)" stroke-width="1" stroke-linecap="round"><path d="M6 6c0 22 8 34 30 34"/><path d="M6 6c22 0 34 8 34 30"/><path d="M6 18c0 12 6 18 16 19M18 6c12 0 18 6 19 16"/><circle cx="9.5" cy="9.5" r="2.2"/><path d="M40 38c5 1 7-1 7-5M38 40c1 5-1 7-5 7"/><path d="M48 33a3 3 0 1 0 .1 0M33 48a3 3 0 1 0 .1 0" stroke-width=".8"/></g></symbol>
    <symbol id="kd-fox" viewBox="0 0 64 64"><g fill="none" stroke="url(#kd-ggold)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M27 13l2.5 4 3-5 3 5 2.5-4 .6 6.5h-11.7z"/><circle cx="27" cy="11.6" r="1.1" fill="url(#kd-ggold)" stroke="none"/><circle cx="32.5" cy="9.5" r="1.1" fill="url(#kd-ggold)" stroke="none"/><circle cx="38" cy="11.6" r="1.1" fill="url(#kd-ggold)" stroke="none"/><path d="M26 21c-1-4-4-6-6-9 1 4 .5 7-1 9-3 4-4 9-3 13 2 7 9 11 17 10 7-1 12-7 12-14 0-3-1-6-3-8"/><path d="M42 21c2-3 3-6 3-9-3 2-5 4-6 7"/><path d="M22 28c4 1 7 1 11 0M19 30l-3 1 3 1"/><path d="M27 26.5c.6 1 .6 2 0 3"/><path d="M21 44c-6 2-11 0-14-5 3 1 5 1 7 0-4-1-6-4-6-8 4 4 8 5 13 4"/></g></symbol>
    <symbol id="kd-spark" viewBox="0 0 16 16"><path d="M8 1l1.1 5.9L15 8l-5.9 1.1L8 15l-1.1-5.9L1 8l5.9-1.1z" fill="url(#kd-ggold)"/></symbol>
    <symbol id="kd-disc" viewBox="0 0 64 64"><g fill="none" stroke="url(#kd-ggold)" stroke-width="1"><circle cx="32" cy="32" r="29"/><circle cx="32" cy="32" r="22" stroke="var(--gold-line)"/><circle cx="32" cy="32" r="15" stroke="var(--gold-line)"/><circle cx="32" cy="32" r="9" stroke="url(#kd-ggold)"/></g><circle cx="32" cy="32" r="9" fill="url(#kd-gmoon)"/><circle cx="32" cy="32" r="2" fill="#0b0806"/></symbol>
    <symbol id="kd-seal" viewBox="0 0 48 48"><g fill="none" stroke="url(#kd-ggold)" stroke-width="1"><circle cx="24" cy="24" r="21" stroke-dasharray="1 3"/><circle cx="24" cy="24" r="17"/></g></symbol>
  </defs></svg>`;

  /* ───────── CSS（全部 #kimi-dash 作用域）───────── */
  var CSS=`
  @keyframes kdbreathe{0%,100%{opacity:.65;filter:drop-shadow(0 0 3px rgba(232,209,153,.55))}50%{opacity:1;filter:drop-shadow(0 0 9px rgba(232,209,153,.55))}}
  @keyframes kdpulse{0%,100%{opacity:.5;transform:scale(.85)}50%{opacity:1;transform:scale(1)}}
  @keyframes kdspin{to{transform:rotate(360deg)}}

  #kimi-dash{position:fixed;left:0;top:35px;bottom:0;width:416px;z-index:99990;display:flex;
    --bg:#0b0806;--gold:#b89456;--gold-2:#c9a86a;--gold-bright:#e8d199;--gold-dim:#6b5630;
    --gold-faint:rgba(201,168,106,.16);--gold-line:rgba(201,168,106,.30);--gold-glow:rgba(232,209,153,.55);
    --rose:#b06a5f;--rose-2:#c5847a;--rose-deep:#7d3f3a;
    --cream:#ece0c8;--cream-2:#cdbf9f;--muted:#8a7a5c;--muted-2:#62553c;
    --serif:'Cormorant Garamond',serif;--sc:'Cormorant SC','Cormorant Garamond',serif;--han:'Noto Serif SC','Cormorant Garamond',serif;
    font-family:var(--serif);color:var(--cream);user-select:none;-webkit-user-select:none;
    transition:transform .42s cubic-bezier(.4,0,.2,1),opacity .42s;}
  #kimi-dash.kd-off{transform:translateX(-112%);opacity:0;pointer-events:none;}
  #kimi-dash svg .ln{fill:none;stroke:var(--gold-2);stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round;}
  #kimi-dash svg .dot,#kimi-dash svg .petal{fill:var(--gold-2);stroke:none;}

  #kimi-dash .kd-rail{flex:none;width:50px;display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:10px 0;background:#090909;border-right:1px solid var(--gold-faint);}
  #kimi-dash .rail-top{display:flex;flex-direction:column;gap:6px;align-items:center;}
  #kimi-dash .kd-collapse{width:40px;height:28px;background:none;border:none;color:var(--gold-2);font-size:17px;cursor:pointer;opacity:.55;transition:.2s;margin-bottom:4px;line-height:1;}
  #kimi-dash .kd-collapse:hover{opacity:1;color:var(--gold-bright);}
  #kimi-dash .rail-ic{position:relative;width:40px;height:40px;background:none;border:1px solid transparent;cursor:pointer;display:grid;place-items:center;border-radius:3px;opacity:.7;transition:.22s;padding:0;}
  #kimi-dash .rail-ic svg{width:23px;height:23px;}
  #kimi-dash .rail-ic:hover{opacity:1;background:rgba(201,168,106,.08);border-color:var(--gold-faint);}
  #kimi-dash .rail-ic.active{opacity:1;background:rgba(201,168,106,.10);border-color:var(--gold-line);}
  #kimi-dash .rail-ic.active::before{content:"";position:absolute;left:-1px;top:7px;bottom:7px;width:2px;background:linear-gradient(180deg,transparent,var(--gold-2),transparent);box-shadow:0 0 6px var(--gold-glow);}
  #kimi-dash .rail-ic.active svg .ln{stroke:var(--gold-bright);}
  #kimi-dash .rail-ic::after{content:attr(data-tip);position:absolute;left:120%;top:50%;transform:translateY(-50%) translateX(-4px);font-family:var(--sc);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold-2);background:#0c0905;border:1px solid var(--gold-faint);padding:2px 7px;white-space:nowrap;opacity:0;pointer-events:none;transition:.18s;border-radius:2px;z-index:50;}
  #kimi-dash .rail-ic:hover::after{opacity:1;transform:translateY(-50%) translateX(0);}

  #kimi-dash .kd-main{flex:1;min-width:0;background:#0a0a0a;box-shadow:14px 0 38px -20px rgba(0,0,0,.95);padding:12px 10px;overflow:hidden;display:flex;flex-direction:column;}
  #kimi-dash .panel-frame{position:relative;flex:1;min-height:0;border:1px solid var(--gold-faint);background:linear-gradient(180deg,rgba(40,30,14,.13),rgba(12,9,5,.05));padding:18px 14px;overflow:auto;}
  #kimi-dash .corner{position:absolute;width:32px;height:32px;opacity:.7;pointer-events:none;z-index:2;}
  #kimi-dash .corner.tl{top:3px;left:3px;} #kimi-dash .corner.tr{top:3px;right:3px;transform:scaleX(-1);}
  #kimi-dash .corner.bl{bottom:3px;left:3px;transform:scaleY(-1);} #kimi-dash .corner.br{bottom:3px;right:3px;transform:scale(-1);}

  #kimi-dash .cap{font-family:var(--sc);letter-spacing:.2em;text-transform:uppercase;color:var(--gold);font-size:11px;white-space:nowrap;}
  #kimi-dash .sb-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px;}
  #kimi-dash .sb-head .hd-orn{width:16px;height:16px;opacity:.8;}
  #kimi-dash .sb-div{display:flex;margin:11px 2px;}
  #kimi-dash .rule{display:flex;align-items:center;gap:8px;color:var(--gold-dim);}
  #kimi-dash .rule::before,#kimi-dash .rule::after{content:"";height:1px;flex:1;background:linear-gradient(90deg,transparent,var(--gold-line),transparent);}

  #kimi-dash .dash{column-count:2;column-gap:11px;padding:1px;}
  #kimi-dash .dcard{break-inside:avoid;margin:0 0 11px;padding:13px 13px 14px;position:relative;border:1px solid var(--gold-faint);background:linear-gradient(180deg,rgba(24,17,6,.42),rgba(10,7,4,.32));}
  #kimi-dash .dcard.span{column-span:all;}
  #kimi-dash .dcard.flash{box-shadow:0 0 0 1px var(--gold-line),0 0 16px var(--gold-glow);transition:box-shadow .3s;}
  #kimi-dash .dcard::before,#kimi-dash .dcard::after{content:"";position:absolute;width:8px;height:8px;opacity:.65;border-color:var(--gold-line);border-style:solid;}
  #kimi-dash .dcard::before{top:-1px;left:-1px;border-width:1px 0 0 1px;}
  #kimi-dash .dcard::after{bottom:-1px;right:-1px;border-width:0 1px 1px 0;}
  #kimi-dash .dcard .cap{letter-spacing:.14em;}

  #kimi-dash .dcard[data-card-id="profile"]{display:flex;align-items:center;gap:12px;padding:12px 15px;}
  #kimi-dash .pm-fox{width:26px;height:26px;flex:none;filter:drop-shadow(0 0 4px rgba(201,168,106,.3));}
  #kimi-dash .pm-name{font-family:var(--sc);font-size:11px;letter-spacing:.1em;color:var(--gold-2);white-space:nowrap;flex:none;}
  #kimi-dash .pm-rule{flex:1;height:8px;background:radial-gradient(circle at center,var(--gold) 0 1.4px,transparent 1.6px) center/9px 8px,linear-gradient(90deg,transparent,var(--gold-line),transparent);background-repeat:no-repeat;}
  #kimi-dash .pm-moon{width:22px;height:22px;flex:none;animation:kdbreathe 6s ease-in-out infinite;}
  #kimi-dash .pm-dot{width:7px;height:7px;border-radius:50%;background:var(--rose-2);box-shadow:0 0 8px var(--rose-2);flex:none;animation:kdpulse 2.6s ease-in-out infinite;}

  #kimi-dash .tree{list-style:none;margin:0;padding:0;font-family:var(--han);font-size:12px;}
  #kimi-dash .dcard[data-panel="catalog"] .tree{max-height:232px;overflow:auto;}
  #kimi-dash .tree li{padding:2.5px 4px;color:var(--cream-2);border-radius:2px;letter-spacing:.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  #kimi-dash .tree .branch{color:var(--gold-2);font-family:var(--sc);letter-spacing:.14em;font-size:12px;position:sticky;top:0;background:linear-gradient(180deg,#181005,#120c06);z-index:1;}
  #kimi-dash .tree .tw{display:inline-block;width:14px;color:var(--gold-dim);}
  #kimi-dash .tree .leaf{color:var(--muted);font-size:11.5px;cursor:pointer;}
  #kimi-dash .tree .leaf:hover{color:var(--cream);}
  #kimi-dash .tree .leaf.cur{color:var(--cream);}
  #kimi-dash .tree .leaf.cur::before{content:"❧ ";color:var(--rose-2);}

  #kimi-dash .read-prog{margin-top:4px;}
  #kimi-dash .rp-head{display:flex;align-items:center;margin-bottom:4px;}
  #kimi-dash .rp-pct{display:block;font-family:var(--sc);font-size:12px;letter-spacing:.08em;color:var(--gold-2);margin:0 0 7px;}
  #kimi-dash .moon-bar{position:relative;height:6px;border:1px solid var(--gold-faint);border-radius:3px;overflow:hidden;background:repeating-linear-gradient(90deg,transparent 0 11px,var(--gold-faint) 11px 12px);}
  #kimi-dash .moon-fill{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,var(--gold-dim),var(--gold-2));box-shadow:0 0 8px var(--gold-glow);}
  #kimi-dash .kp-jump{display:flex;align-items:center;gap:6px;margin-top:9px;}
  #kimi-dash .kp-jl{font-family:var(--sc);font-size:11px;letter-spacing:.08em;color:var(--gold-dim);}
  #kimi-dash .kp-jin{width:46px;background:rgba(201,168,106,.06);border:1px solid var(--gold-faint);border-radius:3px;color:var(--cream);font-family:var(--sc);font-size:12px;text-align:center;padding:2px 4px;outline:none;-moz-appearance:textfield;}
  #kimi-dash .kp-jin::-webkit-outer-spin-button,#kimi-dash .kp-jin::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
  #kimi-dash .kp-jin:focus{border-color:var(--gold-line);background:rgba(201,168,106,.12);}
  #kimi-dash .kp-jin::placeholder{color:var(--muted-2);}

  #kimi-dash .search-field{display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--gold-line);padding:7px 2px;margin-bottom:8px;}
  #kimi-dash .search-field .sf-ic{width:16px;height:16px;opacity:.7;}
  #kimi-dash .search-field input{flex:1;min-width:0;background:none;border:none;outline:none;color:var(--cream);font-family:var(--han);font-size:13px;}
  #kimi-dash .search-field input::placeholder{color:var(--muted-2);}
  #kimi-dash .sb-subhead{display:flex;align-items:center;gap:8px;margin:14px 0 8px;}
  #kimi-dash .sub-cap{font-family:var(--sc);font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-dim);white-space:nowrap;}
  #kimi-dash .recent{list-style:none;margin:0 0 10px;padding:0;}
  #kimi-dash .recent li{font-family:var(--han);font-size:12.5px;color:var(--cream-2);padding:5px 6px;cursor:pointer;display:flex;align-items:center;gap:8px;}
  #kimi-dash .recent li::before{content:"";width:4px;height:4px;transform:rotate(45deg);background:var(--gold-dim);flex:none;}
  #kimi-dash .recent li:hover{color:var(--cream);}
  #kimi-dash .search-empty{display:flex;flex-direction:column;align-items:center;gap:8px;padding:18px 0 4px;opacity:.55;}
  #kimi-dash .search-empty svg{width:30px;height:36px;}
  #kimi-dash .se-it{font-family:var(--serif);font-style:italic;font-size:12px;color:var(--muted);}
  #kimi-dash .kd-count{font-family:var(--sc);font-size:10px;letter-spacing:.1em;color:var(--gold-2);}
  #kimi-dash .kd-results{list-style:none;margin:6px 0 4px;padding:0;max-height:208px;overflow:auto;}
  #kimi-dash .kd-results:empty{display:none;}
  #kimi-dash .kd-results li{padding:5px 7px;cursor:pointer;border-left:1px solid transparent;line-height:1.45;}
  #kimi-dash .kd-results li:hover{border-left-color:var(--rose-2);background:linear-gradient(90deg,rgba(197,132,122,.08),transparent);}
  #kimi-dash .kd-results li.more{cursor:default;color:var(--muted-2);font-family:var(--sc);font-size:10px;letter-spacing:.1em;border-left-color:transparent;}
  #kimi-dash .kd-results b{display:block;font-weight:400;font-family:var(--sc);font-size:11px;letter-spacing:.04em;color:var(--gold-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  #kimi-dash .kd-results .kd-sn{display:block;font-family:var(--han);font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  #kimi-dash .kd-results em,#kimi-dash .kd-results b em{color:var(--rose-2);font-style:normal;}
  #kimi-dash .tree .leaf.kd-hit{color:var(--cream)!important;background:rgba(201,168,106,.18);border-radius:2px;}

  #kimi-dash .note{position:relative;padding:8px 10px 8px 16px;margin-bottom:8px;border-left:1px solid var(--gold-line);background:linear-gradient(90deg,rgba(201,168,106,.05),transparent);}
  #kimi-dash .note::before{content:"";position:absolute;left:-3px;top:10px;width:5px;height:5px;transform:rotate(45deg);background:var(--gold-dim);}
  #kimi-dash .note-han{font-family:var(--han);font-size:12px;color:var(--cream-2);font-weight:300;line-height:1.6;}
  #kimi-dash .excerpt{margin:0;padding:11px 13px;border-left:2px solid var(--rose-deep);font-family:var(--han);font-weight:300;font-size:13px;color:var(--cream-2);line-height:1.75;background:linear-gradient(90deg,rgba(176,106,95,.06),transparent);}
  #kimi-dash .excerpt cite{display:block;margin-top:8px;font-family:var(--sc);font-style:normal;font-size:10px;letter-spacing:.16em;color:var(--gold-dim);}

  #kimi-dash .reminder{position:relative;display:flex;flex-direction:column;gap:4px;padding:14px 12px;border:1px solid var(--gold-faint);background:rgba(24,17,6,.35);text-align:center;}
  #kimi-dash .rm-moon{width:26px;height:26px;margin:0 auto 4px;animation:kdbreathe 6s ease-in-out infinite;}
  #kimi-dash .rm-en{font-family:var(--serif);font-size:15px;color:var(--cream);letter-spacing:.02em;}
  #kimi-dash .rm-it{font-family:var(--serif);font-style:italic;font-size:13px;color:var(--rose-2);}

  #kimi-dash .mood-staff{position:relative;height:74px;margin:6px 0 14px;border-top:1px solid var(--gold-faint);border-bottom:1px solid var(--gold-faint);background:repeating-linear-gradient(0deg,transparent 0 17px,var(--gold-faint) 17px 18px);}
  #kimi-dash .mood-note{position:absolute;width:8px;height:8px;border-radius:50%;transform:translate(-50%,-50%);}
  #kimi-dash .mood-legend{display:grid;grid-template-columns:1fr 1fr;gap:5px 10px;}
  #kimi-dash .ml{display:flex;align-items:center;gap:6px;font-family:var(--serif);font-style:italic;font-size:11px;color:var(--muted);}
  #kimi-dash .ml i{width:7px;height:7px;border-radius:50%;display:inline-block;flex:none;}

  #kimi-dash .stats{display:flex;flex-direction:column;gap:10px;}
  #kimi-dash .stat{display:grid;grid-template-columns:62px 1fr 20px;align-items:center;gap:9px;}
  #kimi-dash .st-l{font-family:var(--sc);font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--gold-2);white-space:nowrap;}
  #kimi-dash .meter{position:relative;height:5px;background:var(--gold-faint);border-radius:3px;overflow:hidden;}
  #kimi-dash .meter i{position:absolute;inset:0 auto 0 0;background:linear-gradient(90deg,var(--gold-dim),var(--gold-2));box-shadow:0 0 6px var(--gold-glow);}
  #kimi-dash .meter.accent i{background:linear-gradient(90deg,var(--rose-deep),var(--rose-2));}
  #kimi-dash .st-v{font-family:var(--sc);font-size:12px;color:var(--cream-2);text-align:right;}

  #kimi-dash .seals{display:flex;gap:12px;}
  #kimi-dash .seal-item{position:relative;width:46px;height:46px;display:grid;place-items:center;cursor:default;}
  #kimi-dash .seal-ring{position:absolute;inset:0;width:100%;height:100%;animation:kdspin 60s linear infinite;}
  #kimi-dash .seal-mo{width:25px;height:25px;}
  #kimi-dash .seal-item.locked{opacity:.55;}
  #kimi-dash .seal-item:hover .seal-ring{filter:drop-shadow(0 0 5px var(--gold-glow));}

  #kimi-dash .player{position:relative;width:108px;height:108px;margin:8px auto 12px;}
  #kimi-dash .disc{width:100%;height:100%;}
  #kimi-dash .kd-vinyl.spin{animation:kdspin 8s linear infinite;transform-origin:center;}
  #kimi-dash .tonearm{position:absolute;right:10px;top:8px;width:2px;height:52px;background:linear-gradient(180deg,var(--gold-2),var(--gold-dim));transform-origin:top right;transform:rotate(26deg);border-radius:2px;}
  #kimi-dash .tonearm::after{content:"";position:absolute;right:-2px;top:-4px;width:7px;height:7px;border-radius:50%;background:var(--gold-2);box-shadow:0 0 5px var(--gold-glow);}
  #kimi-dash .track{text-align:center;display:flex;flex-direction:column;gap:3px;}
  #kimi-dash .tr-title{font-family:var(--serif);font-size:17px;color:var(--cream);letter-spacing:.04em;}
  #kimi-dash .tr-sub{font-family:var(--serif);font-size:12px;color:var(--muted);}
  #kimi-dash .tr-sub.it{font-style:italic;}
  #kimi-dash .rd-bar{position:relative;height:2px;margin:16px 6px 5px;background:var(--gold-faint);}
  #kimi-dash .rd-fill{position:absolute;left:0;top:0;bottom:0;background:var(--gold-2);box-shadow:0 0 6px var(--gold-glow);}
  #kimi-dash .rd-fill::after{content:"";position:absolute;right:-3px;top:-2px;width:6px;height:6px;border-radius:50%;background:var(--gold-bright);}
  #kimi-dash .rd-time{display:flex;justify-content:space-between;font-family:var(--sc);font-size:10px;letter-spacing:.1em;color:var(--muted-2);}
  #kimi-dash .rd-ctrl{display:flex;justify-content:center;align-items:center;gap:14px;margin-top:12px;}
  #kimi-dash .rd-ctrl button{background:none;border:none;cursor:pointer;width:30px;height:30px;display:grid;place-items:center;opacity:.7;transition:.2s;padding:0;}
  #kimi-dash .rd-ctrl button svg{width:18px;height:18px;}
  #kimi-dash .rd-ctrl button svg .ln{fill:var(--gold-2);stroke:var(--gold-2);}
  #kimi-dash .rd-ctrl button:hover{opacity:1;}
  #kimi-dash .rd-ctrl button:hover svg .ln{fill:var(--gold-bright);stroke:var(--gold-bright);}
  #kimi-dash .rd-play{width:38px !important;height:38px !important;border:1px solid var(--gold-line) !important;border-radius:50%;}
  #kimi-dash .rd-on{font-family:var(--sc);font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--rose-2);}

  #kimi-dash .panel-frame::-webkit-scrollbar,#kimi-dash .tree::-webkit-scrollbar{width:8px;}
  #kimi-dash .panel-frame::-webkit-scrollbar-thumb,#kimi-dash .tree::-webkit-scrollbar-thumb{background:var(--gold-faint);border-radius:8px;}
  #kimi-dash .panel-frame::-webkit-scrollbar-track,#kimi-dash .tree::-webkit-scrollbar-track{background:transparent;}

  #kdHandle{position:fixed;left:0;top:46%;z-index:99991;display:none;flex-direction:column;align-items:center;gap:7px;padding:13px 7px;cursor:pointer;background:linear-gradient(180deg,#15100a,#0b0806);border:1px solid rgba(201,168,106,.3);border-left:0;border-radius:0 9px 9px 0;box-shadow:0 8px 30px -10px #000;transition:.2s;}
  #kdHandle:hover{background:linear-gradient(180deg,#1d150b,#100b06);box-shadow:0 8px 30px -8px #000,0 0 14px rgba(201,168,106,.28);}
  #kdHandle .kdh-chev{color:#c9a86a;font-size:15px;line-height:1;}
  #kdHandle svg{width:22px;height:22px;}
  #kdHandle svg .ln{fill:none;stroke:#c9a86a;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round;}

  /* ── 电台：独立可拖浮窗 ── */
  #kimi-radio{position:fixed;left:444px;top:96px;z-index:99994;width:162px;
    --gold:#b89456;--gold-2:#c9a86a;--gold-bright:#e8d199;--gold-dim:#6b5630;
    --gold-faint:rgba(201,168,106,.16);--gold-line:rgba(201,168,106,.30);--gold-glow:rgba(232,209,153,.55);
    --rose-2:#c5847a;--cream:#ece0c8;--muted:#8a7a5c;--muted-2:#62553c;
    --serif:'Cormorant Garamond',serif;--sc:'Cormorant SC','Cormorant Garamond',serif;
    font-family:var(--serif);color:var(--cream);cursor:grab;user-select:none;-webkit-user-select:none;}
  #kimi-radio.kr-drag{cursor:grabbing;}
  #kimi-radio.kr-off{display:none;}
  #kimi-radio .kr-card{position:relative;padding:12px 14px 13px;border:1px solid var(--gold-line);border-radius:3px;background:linear-gradient(180deg,rgba(26,19,8,.96),rgba(10,8,5,.97));box-shadow:0 18px 46px -18px #000,inset 0 0 30px rgba(0,0,0,.4);backdrop-filter:blur(2px);}
  #kimi-radio .kr-corner{position:absolute;width:24px;height:24px;opacity:.7;pointer-events:none;}
  #kimi-radio .kr-corner.tl{top:3px;left:3px;} #kimi-radio .kr-corner.tr{top:3px;right:3px;transform:scaleX(-1);}
  #kimi-radio .kr-corner.bl{bottom:3px;left:3px;transform:scaleY(-1);} #kimi-radio .kr-corner.br{bottom:3px;right:3px;transform:scale(-1);}
  #kimi-radio svg .ln{fill:none;stroke:var(--gold-2);stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round;}
  #kimi-radio .kr-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;}
  #kimi-radio .cap{font-family:var(--sc);letter-spacing:.16em;text-transform:uppercase;color:var(--gold);font-size:10px;white-space:nowrap;}
  #kimi-radio .rd-on{font-family:var(--sc);font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:var(--rose-2);}
  #kimi-radio .player{position:relative;width:94px;height:94px;margin:6px auto 10px;}
  #kimi-radio .disc{width:100%;height:100%;}
  #kimi-radio .kd-vinyl.spin{animation:kdspin 8s linear infinite;transform-origin:center;}
  #kimi-radio .tonearm{position:absolute;right:8px;top:6px;width:2px;height:44px;background:linear-gradient(180deg,var(--gold-2),var(--gold-dim));transform-origin:top right;transform:rotate(26deg);border-radius:2px;}
  #kimi-radio .tonearm::after{content:"";position:absolute;right:-2px;top:-4px;width:6px;height:6px;border-radius:50%;background:var(--gold-2);box-shadow:0 0 5px var(--gold-glow);}
  #kimi-radio .track{text-align:center;display:flex;flex-direction:column;gap:2px;}
  #kimi-radio .tr-title{font-family:var(--serif);font-size:15px;color:var(--cream);letter-spacing:.04em;}
  #kimi-radio .tr-sub{font-family:var(--serif);font-size:11px;color:var(--muted);}
  #kimi-radio .tr-sub.it{font-style:italic;}
  #kimi-radio .rd-bar{position:relative;height:2px;margin:12px 4px 5px;background:var(--gold-faint);overflow:hidden;}
  #kimi-radio .rd-fill{position:absolute;inset:0;background:linear-gradient(90deg,var(--gold-dim),var(--gold-2));opacity:.4;}
  #kimi-radio .rd-glow{position:absolute;top:0;bottom:0;left:-38%;width:38%;background:linear-gradient(90deg,transparent,var(--gold-bright),transparent);box-shadow:0 0 8px var(--gold-glow);opacity:0;}
  #kimi-radio .rd-time{display:flex;justify-content:space-between;font-family:var(--sc);font-size:9px;letter-spacing:.1em;color:var(--muted-2);}
  #kimi-radio .rd-ctrl{display:flex;justify-content:center;align-items:center;gap:12px;margin-top:10px;}
  #kimi-radio .rd-ctrl button{background:none;border:none;cursor:pointer;width:26px;height:26px;display:grid;place-items:center;opacity:.72;transition:.2s;padding:0;}
  #kimi-radio .rd-ctrl button svg{width:16px;height:16px;}
  #kimi-radio .rd-ctrl button svg .ln{fill:var(--gold-2);stroke:var(--gold-2);}
  #kimi-radio .rd-ctrl button:hover{opacity:1;}
  #kimi-radio .rd-ctrl button:hover svg .ln{fill:var(--gold-bright);stroke:var(--gold-bright);}
  #kimi-radio .rd-play{width:34px !important;height:34px !important;border:1px solid var(--gold-line) !important;border-radius:50%;}
  @keyframes kdorbit{to{transform:rotate(360deg)}}
  @keyframes kdscan{0%{left:-38%}100%{left:100%}}
  #kimi-radio .kr-orbit{position:absolute;inset:0;pointer-events:none;animation:kdorbit 6s linear infinite;animation-play-state:paused;}
  #kimi-radio.kr-playing .kr-orbit{animation-play-state:running;}
  #kimi-radio .kr-pip{position:absolute;top:6px;left:50%;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:var(--gold-bright);box-shadow:0 0 7px var(--gold-glow);}
  #kimi-radio.kr-playing .rd-glow{animation:kdscan 16s linear infinite;}
  #kimi-radio.kr-playing .rd-on{animation:kdbreathe 2.4s ease-in-out infinite;}
  #kimi-dash .kd-fox-line,#kimi-dash .kd-rose-gold,#kimi-dash .kd-bud-gold{background-size:contain;background-position:center;background-repeat:no-repeat;}
  #kimi-dash .kd-fox-line{background-image:url(${IC.foxLine});}
  #kimi-dash .kd-rose-gold{background-image:url(${IC.roseGold});filter:drop-shadow(0 0 2px rgba(230,197,126,.4));}
  #kimi-dash .kd-bud-gold{background-image:url(${IC.budGold});filter:drop-shadow(0 0 2px rgba(230,197,126,.35));}
  #kimi-dash .pm-rose{width:31px;height:31px;flex:none;background:url(${IC.rosePink}) center/contain no-repeat;filter:drop-shadow(0 0 3px rgba(225,150,160,.5));animation:kdbreathe2 6s ease-in-out infinite;}
  @keyframes kdbreathe2{0%,100%{opacity:.72}50%{opacity:1}}
  #kimi-dash [contenteditable="true"]{outline:none;cursor:text;border-radius:2px;transition:background .15s;}
  #kimi-dash [contenteditable="true"]:hover{background:rgba(201,168,106,.08);}
  #kimi-dash [contenteditable="true"]:focus{background:rgba(201,168,106,.14);box-shadow:inset 0 -1px 0 var(--gold-2);}
  #kimi-dash [contenteditable="true"]:empty:before{content:attr(data-ph);color:var(--muted-2);}
  #kimi-dash .kp-pins .note{position:relative;}
  #kimi-dash .kp-del{float:right;margin-left:6px;color:var(--gold-dim);cursor:pointer;opacity:0;transition:.15s;font-size:13px;line-height:1;}
  #kimi-dash .kp-pins .note:hover .kp-del{opacity:.6;}
  #kimi-dash .kp-del:hover{color:var(--rose-2);opacity:1;}
  #kimi-dash .kp-add{margin-top:5px;background:none;border:1px dashed var(--gold-line);color:var(--gold-2);font-family:var(--sc);font-size:10px;letter-spacing:.12em;text-transform:uppercase;padding:3px 9px;border-radius:3px;cursor:pointer;transition:.15s;}
  #kimi-dash .kp-add:hover{background:rgba(201,168,106,.1);color:var(--gold-bright);}
  `;
  var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);

  /* ───────── 目录树（真 437 章，按卷分组）───────── */
  var treeHtml='';
  VOL.forEach(function(v,vi){
    treeHtml+='<li class="branch"><span class="tw">▾</span>'+ROM[vi]+' · '+v.n+'</li>';
    for(var i=v.s;i<v.e;i++){treeHtml+='<li class="leaf'+(i===0?' cur':'')+'" data-ch="'+i+'">　'+CH[i]+'</li>';}
  });
  var pinHtml=PIN.map(function(p){return '<div class="note"><span class="note-han">'+p+'</span></div>';}).join('');

  /* ───────── 卡片 ───────── */
  var CARDS=
    `<section class="dcard span" data-card-id="profile"><span class="pm-fox kd-fox-line"></span><span class="pm-name" contenteditable="true" data-edit="assistantName" data-ph="点这里写助手名">Claude Opus 4.6</span><span class="pm-rule"></span><span class="pm-rose"></span><span class="pm-dot"></span></section>`+
    `<section class="dcard" data-panel="catalog"><div class="sb-head"><span class="cap">catalog · 目录</span><svg class="hd-orn" viewBox="0 0 40 40"><use href="#kd-mcres"/></svg></div><ul class="tree">`+treeHtml+`</ul><div class="sb-div"><span class="rule" style="flex:1"></span></div><div class="read-prog"><div class="rp-head"><span class="cap">progress · 进度</span></div><span class="rp-pct">1 / 437</span><div class="moon-bar"><span class="moon-fill" style="width:1%"></span></div><div class="kp-jump"><span class="kp-jl">跳到第</span><input class="kp-jin" type="number" min="1" max="437" placeholder="—"/><span class="kp-jl">章</span></div></div></section>`+
    `<section class="dcard" data-panel="notes"><div class="sb-head"><span class="cap">pinned · 钉记</span><svg class="hd-orn" viewBox="0 0 24 24" style="width:14px;height:14px"><use href="#kd-anote"/></svg></div><div class="kp-pins" id="kpPins"></div><button class="kp-add" data-add="pin">＋ 钉一条</button><div class="sb-div"><span class="rule" style="flex:1"></span></div><div class="sb-head"><span class="cap">excerpt · 摘抄</span></div><blockquote class="excerpt"><span contenteditable="true" data-edit="excerpt" data-ph="写句摘抄…">在这里写一句摘抄。</span><cite contenteditable="true" data-edit="excerptCite">— 出处</cite></blockquote></section>`+
    `<section class="dcard span" data-panel="atelier"><div class="sb-head"><span class="cap">reminder · 提醒</span></div><div class="reminder"><svg class="rm-moon" viewBox="0 0 40 40"><use href="#kd-mcres"/></svg><span class="rm-en" contenteditable="true" data-edit="remEn">✶ 你的提醒标题</span><span class="rm-it" contenteditable="true" data-edit="remIt">点这两行都能改 · 写你自己的</span></div><div class="sb-div"><span class="rule" style="flex:1"></span></div><div class="sb-head"><span class="cap">mood · 心绪乐谱</span><svg class="hd-orn" viewBox="0 0 40 40"><use href="#kd-mcres"/></svg></div><div class="mood-staff kd-mood"></div><div class="mood-legend"><span class="ml"><i style="background:#5b78b0"></i>brooding</span><span class="ml"><i style="background:#7a9a72"></i>calm</span><span class="ml"><i style="background:#c9a86a"></i>warmth</span><span class="ml"><i style="background:#b06a5f"></i>toward her</span></div></section>`+
    `<section class="dcard" data-panel="codex"><div class="sb-head"><span class="cap">seals · 印记</span><svg class="hd-orn" viewBox="0 0 24 24" style="width:14px;height:14px"><use href="#kd-aarc"/></svg></div><div class="seals"><div class="seal-item" title="新月之约"><svg class="seal-ring" viewBox="0 0 48 48"><use href="#kd-seal"/></svg><svg class="seal-mo" viewBox="0 0 40 40"><use href="#kd-mcres"/></svg></div><div class="seal-item" title="玫瑰之契"><svg class="seal-ring" viewBox="0 0 48 48"><use href="#kd-seal"/></svg><span class="seal-mo kd-rose-gold"></span></div><div class="seal-item" title="狐冠"><svg class="seal-ring" viewBox="0 0 48 48"><use href="#kd-seal"/></svg><span class="seal-mo kd-fox-line"></span></div><div class="seal-item locked" title="未解锁"><svg class="seal-ring" viewBox="0 0 48 48"><use href="#kd-seal"/></svg><span class="seal-mo kd-bud-gold"></span></div></div></section>`;

  var RAIL=`<div class="kd-rail"><div class="rail-top"><button class="kd-collapse" title="收起 sidebar">«</button><button class="rail-ic active" data-tip="目录" data-target="catalog"><svg viewBox="0 0 24 24"><use href="#kd-acat"/></svg></button><button class="rail-ic" data-tip="钉记" data-target="notes"><svg viewBox="0 0 24 24"><use href="#kd-anote"/></svg></button><button class="rail-ic" data-tip="提醒" data-target="atelier"><svg viewBox="0 0 24 24"><use href="#kd-arem"/></svg></button><button class="rail-ic" data-tip="典藏" data-target="codex"><svg viewBox="0 0 24 24"><use href="#kd-aarc"/></svg></button><button class="rail-ic kd-radio-btn" data-tip="电台"><svg viewBox="0 0 24 24"><use href="#kd-arad"/></svg></button></div><div class="rail-bot"><button class="rail-ic" data-tip="设置"><svg viewBox="0 0 24 24"><use href="#kd-aset"/></svg></button></div></div>`;
  var MAIN=`<div class="kd-main"><div class="panel-frame"><svg class="corner tl" viewBox="0 0 80 80"><use href="#kd-fil"/></svg><svg class="corner tr" viewBox="0 0 80 80"><use href="#kd-fil"/></svg><svg class="corner bl" viewBox="0 0 80 80"><use href="#kd-fil"/></svg><svg class="corner br" viewBox="0 0 80 80"><use href="#kd-fil"/></svg><div class="dash">`+CARDS+`</div></div></div>`;

  var el=document.createElement('div');el.id='kimi-dash';el.innerHTML=DEFS+RAIL+MAIN;document.body.appendChild(el);

  /* 顶部对齐到真 titlebar 高度 */
  try{var tb=document.querySelector('.monaco-workbench .part.titlebar');if(tb&&tb.offsetHeight)el.style.top=tb.offsetHeight+'px';}catch(e){}

  /* 收起手柄 */
  var handle=document.createElement('div');handle.id='kdHandle';handle.title='展开 sidebar';
  handle.innerHTML='<span class="kdh-chev">»</span><svg viewBox="0 0 64 64"><use href="#kd-fox"/></svg>';
  document.body.appendChild(handle);

  /* ───────── 行为 ───────── */
  // 心绪乐谱
  (function buildMood(){var m=el.querySelector('.kd-mood');if(!m)return;var cols={brooding:'#5b78b0',calm:'#7a9a72',warmth:'#c9a86a',toward:'#b06a5f'};var seq=[['calm',.5],['brooding',.68],['warmth',.4],['warmth',.46],['brooding',.7],['warmth',.36],['toward',.28],['warmth',.44],['toward',.3],['warmth',.38],['toward',.26],['toward',.22],['toward',.3],['toward',.24]];var s='';seq.forEach(function(d,i){var x=((i+0.5)/seq.length*100).toFixed(1),y=(d[1]*100).toFixed(1),c=cols[d[0]];s+='<span class="mood-note" style="left:'+x+'%;top:'+y+'%;background:'+c+';box-shadow:0 0 6px '+c+'"></span>';});m.innerHTML=s;})();

  // 活动栏 → 平滑滚到对应卡片 + 金光一闪
  (function initRail(){var frame=el.querySelector('.panel-frame');el.querySelectorAll('.rail-ic[data-target]').forEach(function(btn){btn.addEventListener('click',function(){var t=btn.getAttribute('data-target');var card=el.querySelector('.dcard[data-panel="'+t+'"]');el.querySelectorAll('.rail-ic').forEach(function(b){b.classList.toggle('active',b===btn);});if(card&&frame){frame.scrollTo({top:Math.max(0,card.offsetTop-16),behavior:'smooth'});card.classList.add('flash');setTimeout(function(){card.classList.remove('flash');},950);}});});})();

  // 目录导航 + 只读进度跟随（正文搜索用 VSCode 自带 Ctrl+F）
  (function initNav(){
    var catTree=el.querySelector('.dcard[data-panel="catalog"] .tree');
    var NV=(typeof window!=='undefined'&&window.KIMI_NOVEL)||null;
    var OFF=null,TOT=0;
    function buildOff(){OFF=new Array(CH.length);var acc=0;for(var i=0;i<CH.length;i++){OFF[i]=acc;var bl=(NV&&NV[i])?NV[i].length:240;acc+=CH[i].length+bl+1;}TOT=acc;}
    // —— Plan B：注入脚本无法驱动 monaco 正文滚动，故只做「目录定位 + 只读进度跟随」——
    function clamp(v,a,b){return v<a?a:(v>b?b:v);}
    function pickEditor(){var best=null,ba=0;document.querySelectorAll('.monaco-workbench .part.editor .monaco-editor').forEach(function(ed){var r=ed.getBoundingClientRect(),a=r.width*r.height;if(a>ba&&r.width>200&&r.height>200&&ed.querySelector('.view-lines')){ba=a;best=ed;}});return best;}
    function getRatio(ed){var slider=ed.querySelector('.scrollbar.vertical .slider'),track=ed.querySelector('.scrollbar.vertical');if(!slider||!track)return -1;var th=track.clientHeight,sh=slider.clientHeight,m=(slider.style.transform||'').match(/,\s*(-?[0-9.]+)px/),ty=m?parseFloat(m[1]):(parseFloat(slider.style.top)||0);if(ty<0)ty=0;return th-sh>4?clamp(ty/(th-sh),0,1):0;}
    function ratioToCh(r){if(!OFF)return 0;var x=r*TOT,lo=0,hi=CH.length-1;while(lo<hi){var mid=(lo+hi+1)>>1;if(OFF[mid]<=x)lo=mid;else hi=mid-1;}return lo;}
    function treeScrollTo(c){var tree=el.querySelector('.dcard[data-panel="catalog"] .tree');if(!tree||!c)return;var tr=tree.getBoundingClientRect(),cr=c.getBoundingClientRect();tree.scrollTop+=(cr.top-tr.top)-tree.clientHeight/2+cr.height/2;}
    // —— 手动阅读位置：点目录章 = 当前章，玫瑰 ❧ + 进度随之（localStorage 持久）——
    function setCh(idx,scroll){idx=Math.max(0,Math.min(CH.length-1,idx));
      el.querySelectorAll('.dcard[data-panel="catalog"] .tree .leaf.cur').forEach(function(x){x.classList.remove('cur');});
      var c=el.querySelector('.dcard[data-panel="catalog"] .tree .leaf[data-ch="'+idx+'"]');if(c){c.classList.add('cur');if(scroll)treeScrollTo(c);}
      var pe=el.querySelector('.dcard[data-panel="catalog"] .rp-pct'),fe=el.querySelector('.dcard[data-panel="catalog"] .moon-fill');
      if(pe)pe.textContent=(idx+1)+' / '+CH.length;
      if(fe)fe.style.width=Math.max(1,Math.round((idx+1)/CH.length*100))+'%';
      try{localStorage.setItem('kimiReadCh',idx);}catch(e){}}
    var startCh=0;try{var sv=parseInt(localStorage.getItem('kimiReadCh'),10);if(!isNaN(sv)&&sv>=0&&sv<CH.length)startCh=sv;}catch(e){}
    setCh(startCh,true);
    if(catTree)catTree.addEventListener('click',function(e){var lf=e.target&&e.target.closest?e.target.closest('.leaf[data-ch]'):null;if(lf)setCh(parseInt(lf.getAttribute('data-ch'),10),false);});
    // 手动输入：跳到第 N 章（回车确认，玫瑰滚过去）
    var jin=el.querySelector('.kp-jin');if(jin){jin.addEventListener('keydown',function(e){if(e.key==='Enter'){var n=parseInt(jin.value,10);if(!isNaN(n)){setCh(n-1,true);jin.blur();}}});jin.addEventListener('change',function(){var n=parseInt(jin.value,10);if(!isNaN(n))setCh(n-1,true);});}})();

  // 手动输入：钉记可增删改 + 摘抄/提醒可编辑（localStorage 持久）
  (function initEditable(){
    function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
    function onEnter(node){node.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();node.blur();}});}
    el.querySelectorAll('[data-edit]').forEach(function(node){var key='kimiEdit:'+node.getAttribute('data-edit');try{var v=localStorage.getItem(key);if(v!==null)node.textContent=v;}catch(e){}node.addEventListener('blur',function(){try{localStorage.setItem(key,node.textContent.replace(/\s+$/,''));}catch(e){}});onEnter(node);});
    function loadPins(){try{var s=JSON.parse(localStorage.getItem('kimiPins'));if(Array.isArray(s))return s;}catch(e){}return PIN.slice();}
    function savePins(a){try{localStorage.setItem('kimiPins',JSON.stringify(a));}catch(e){}}
    var box=el.querySelector('#kpPins');
    function render(){if(!box)return;var a=loadPins();box.innerHTML=a.map(function(p,i){return '<div class="note" data-i="'+i+'"><span class="kp-del" title="删除">×</span><span class="note-han" contenteditable="true" data-ph="写一条钉记…">'+esc(p)+'</span></div>';}).join('');
      box.querySelectorAll('.note').forEach(function(n){var i=+n.getAttribute('data-i');var span=n.querySelector('.note-han');
        span.addEventListener('blur',function(){var arr=loadPins();arr[i]=span.textContent.trim();savePins(arr);});onEnter(span);
        n.querySelector('.kp-del').addEventListener('click',function(){var arr=loadPins();arr.splice(i,1);savePins(arr);render();});});}
    render();
    var add=el.querySelector('[data-add="pin"]');if(add)add.addEventListener('click',function(){var a=loadPins();a.push('');savePins(a);render();var ns=box.querySelectorAll('.note-han');var last=ns[ns.length-1];if(last)last.focus();});
  })();

  // ───────── 电台：独立可拖浮窗 ─────────
  var radio=document.createElement('div');radio.id='kimi-radio';
  radio.innerHTML=`<div class="kr-card"><svg class="kr-corner tl" viewBox="0 0 80 80"><use href="#kd-fil"/></svg><svg class="kr-corner tr" viewBox="0 0 80 80"><use href="#kd-fil"/></svg><svg class="kr-corner bl" viewBox="0 0 80 80"><use href="#kd-fil"/></svg><svg class="kr-corner br" viewBox="0 0 80 80"><use href="#kd-fil"/></svg><div class="kr-head"><span class="cap">radio · 电台</span><span class="rd-on">on air</span></div><div class="player"><svg class="disc kd-vinyl" viewBox="0 0 64 64"><use href="#kd-disc"/></svg><div class="kr-orbit"><span class="kr-pip"></span></div><div class="tonearm"></div></div><div class="track"><span class="tr-title kr-name">moon edition</span><span class="tr-sub it kr-genre">lo-fi</span></div><div class="rd-bar"><span class="rd-fill"></span><span class="rd-glow"></span></div><div class="rd-time"><span>0:00</span><span>live</span></div><div class="rd-ctrl"><button class="kr-prev" title="上一台"><svg viewBox="0 0 24 24"><path d="M16 6v12M16 12L8 6v12z" class="ln"/></svg></button><button class="rd-play kr-play" title="播放/暂停"><svg viewBox="0 0 24 24"><path d="M9 6v12M15 6v12" class="ln"/></svg></button><button class="kr-next" title="下一台"><svg viewBox="0 0 24 24"><path d="M8 6v12M8 12l8-6v12z" class="ln"/></svg></button></div></div>`;
  document.body.appendChild(radio);

  // 播放/暂停 + 切台 + 真放流 + 播放感（转盘金点 / 呼吸进度 / 走时 / live）
  (function initRadio(){
    // ── 电台清单（全部实测可放；要加台照格式加一行）──
    var STATIONS=[
      {n:'Groove Salad', g:'lo-fi · chill',      u:'https://ice1.somafm.com/groovesalad-128-mp3'},
      {n:'Amsterdam Trance', g:'trance · vocal', u:'https://strm112.1.fm/atr_mobile_mp3'},
      {n:'Goa / Psy',    g:'trance · psy',       u:'https://strm112.1.fm/goa_mobile_mp3'},
      {n:'The Trip',     g:'trance · downtempo', u:'https://ice1.somafm.com/thetrip-128-mp3'},
      {n:'Drone Zone',   g:'清冷 · ambient',     u:'https://ice1.somafm.com/dronezone-128-mp3'},
      {n:'RauteMusik', g:'trance · 电子',       u:'https://rautemusik-de-hz-fal-stream14.radiohost.de/trance'},
      {n:'Venice Classic', g:'古典 · classical', u:'https://uk2.streamingpulse.com/ssl/vcr1'},
      {n:'Calm Classical', g:'古典 · 静谧',      u:'https://streams.calmradio.com/api/39/128/stream'},
      {n:'青espresso 古风', g:'古风 · 国风',      u:'https://lhttp.qingting.fm/live/4915/64k.mp3'},
      {n:'Pop Radio TW', g:'华语 · C-pop',       u:'https://stream.rcs.revma.com/aw9uqyxy2tzuv'}
    ];
    var disc=radio.querySelector('.kd-vinyl'),btn=radio.querySelector('.kr-play'),nameEl=radio.querySelector('.kr-name'),genreEl=radio.querySelector('.kr-genre'),tEl=radio.querySelectorAll('.rd-time span'),prev=radio.querySelector('.kr-prev'),next=radio.querySelector('.kr-next');
    var idx=0;try{var s=parseInt(localStorage.getItem('kimiRadioStation'),10);if(s>=0&&s<STATIONS.length)idx=s;}catch(e){}
    var audio=new Audio();audio.preload='none';
    var playing=false,secs=0,timer=null;
    function fmt(s){var m=Math.floor(s/60),x=s%60;return m+':'+(x<10?'0':'')+x;}
    function label(){var st=STATIONS[idx];if(nameEl)nameEl.textContent=st.n;if(genreEl)genreEl.textContent=st.g;}
    function setUI(){radio.classList.toggle('kr-playing',playing);if(disc)disc.classList.toggle('spin',playing);if(btn)btn.querySelector('svg').innerHTML=playing?'<path d="M9 6v12M15 6v12" class="ln"/>':'<path d="M9 6l9 6-9 6z" class="ln"/>';if(tEl[1])tEl[1].textContent=playing?'live':'—';if(playing){if(!timer)timer=setInterval(function(){secs++;if(tEl[0])tEl[0].textContent=fmt(secs);},1000);}else if(timer){clearInterval(timer);timer=null;}}
    function load(play){audio.src=STATIONS[idx].u;label();secs=0;if(tEl[0])tEl[0].textContent='0:00';try{localStorage.setItem('kimiRadioStation',idx);}catch(e){}if(play){var p=audio.play();if(p&&p.catch)p.catch(function(){});}}
    function go(d){idx=(idx+d+STATIONS.length)%STATIONS.length;load(playing);}
    audio.addEventListener('playing',function(){playing=true;setUI();});
    audio.addEventListener('pause',function(){playing=false;setUI();});
    audio.src=STATIONS[idx].u;label();
    if(btn)btn.addEventListener('click',function(e){e.stopPropagation();if(playing){audio.pause();return;}var p=audio.play();if(p&&p.catch)p.catch(function(){playing=true;setUI();if(genreEl)genreEl.textContent='连接失败 · 换台试试';});});
    if(prev)prev.addEventListener('click',function(e){e.stopPropagation();go(-1);});
    if(next)next.addEventListener('click',function(e){e.stopPropagation();go(1);});
    if(tEl[0])tEl[0].textContent='0:00';setUI();})();

  // 位置记忆 + 拖动（按住卡片拖，点控制键不拖）
  (function dragRadio(){function place(l,t){radio.style.left=Math.max(0,Math.min(window.innerWidth-radio.offsetWidth,l))+'px';radio.style.top=Math.max(0,Math.min(window.innerHeight-radio.offsetHeight,t))+'px';radio.style.right='auto';radio.style.bottom='auto';}try{var s=JSON.parse(localStorage.getItem('kimiRadioPos')||'null');if(s&&typeof s.left==='number')place(s.left,s.top);}catch(e){}var dg=false,mv=0,sx=0,sy=0,ox=0,oy=0;radio.addEventListener('mousedown',function(e){if(e.button!==0)return;if(e.target.closest&&e.target.closest('.rd-ctrl'))return;var r=radio.getBoundingClientRect();dg=true;mv=0;sx=e.clientX;sy=e.clientY;ox=r.left;oy=r.top;radio.classList.add('kr-drag');e.preventDefault();});window.addEventListener('mousemove',function(e){if(!dg)return;var dx=e.clientX-sx,dy=e.clientY-sy;mv=Math.max(mv,Math.abs(dx)+Math.abs(dy));place(ox+dx,oy+dy);});window.addEventListener('mouseup',function(){if(!dg)return;dg=false;radio.classList.remove('kr-drag');if(mv>=4){var r=radio.getBoundingClientRect();try{localStorage.setItem('kimiRadioPos',JSON.stringify({left:r.left,top:r.top}));}catch(e){}}});})();

  // 活动栏「电台」图标 → 显示/隐藏浮窗
  (function radioToggle(){var btn=el.querySelector('.kd-radio-btn');if(!btn)return;function setOff(off){radio.classList.toggle('kr-off',off);btn.classList.toggle('active',!off);try{localStorage.setItem('kimiRadioOff',off?'1':'0');}catch(e){}}var off=false;try{off=localStorage.getItem('kimiRadioOff')==='1';}catch(e){}setOff(off);btn.addEventListener('click',function(){setOff(!radio.classList.contains('kr-off'));});})();

  // 收起 / 展开
  function setOff(off){if(off){el.classList.add('kd-off');handle.style.display='flex';}else{el.classList.remove('kd-off');handle.style.display='none';}try{localStorage.setItem('kimiDashOff',off?'1':'0');}catch(e){}}
  el.querySelector('.kd-collapse').addEventListener('click',function(){setOff(true);});
  handle.addEventListener('click',function(){setOff(false);});
  var off=false;try{off=localStorage.getItem('kimiDashOff')==='1';}catch(e){}
  setOff(off);
}
setTimeout(mount,500);
})();
