/* ============================================================
   合奏 · 交互层
   toast / dialog / sheet —— 所有页面共用，无依赖
   ============================================================ */
(function(){
  const CSS = `
  .ui-mask{
    position:fixed; inset:0; z-index:900;
    background:rgba(22,22,34,.20);
    backdrop-filter:blur(3px); -webkit-backdrop-filter:blur(3px);
    opacity:0; visibility:hidden; transition:all .2s;
    display:grid; place-items:center;
  }
  .ui-mask.on{ opacity:1; visibility:visible; }
  .ui-dlg{
    width:min(430px, calc(100vw - 48px));
    border-radius:18px; overflow:hidden;
    background:var(--glass, rgba(255,255,255,.97));
    backdrop-filter:blur(30px) saturate(180%);
    -webkit-backdrop-filter:blur(30px) saturate(180%);
    border:1px solid var(--glass-line, #E3E3E9);
    box-shadow:0 30px 70px -24px rgba(20,20,40,.4), inset 0 1px 0 #fff;
    transform:translateY(8px) scale(.98);
    transition:transform .22s cubic-bezier(.2,.8,.2,1);
  }
  .ui-mask.on .ui-dlg{ transform:none; }
  .ui-h{
    padding:20px 22px 0;
    font-size:15px; font-weight:600; letter-spacing:-.01em; color:var(--tx,#0D0D10);
  }
  .ui-b{
    padding:10px 22px 20px;
    font-size:13px; line-height:1.7; color:var(--tx-2,#47474F);
  }
  .ui-b p{ margin:0 0 8px; }
  .ui-b p:last-child{ margin-bottom:0; }
  .ui-b .kv{
    display:flex; gap:10px; padding:7px 0;
    border-bottom:1px solid var(--line,#E7E7EC); font-size:12.5px;
  }
  .ui-b .kv:last-child{ border-bottom:0; }
  .ui-b .kv b{ margin-left:auto; font-weight:500; color:var(--tx,#0D0D10); }
  .ui-code{
    margin-top:10px; padding:11px 13px; border-radius:10px;
    background:rgba(79,70,229,.06); border:1px solid rgba(79,70,229,.18);
    font-family:var(--mono, ui-monospace, monospace); font-size:11.5px;
    color:#3F38C4; word-break:break-all;
  }
  .ui-f{
    display:flex; gap:9px; padding:0 22px 20px;
  }
  .ui-f button, .ui-f a{
    flex:1; height:38px; border-radius:10px;
    font-size:13px; font-weight:500;
    display:inline-flex; align-items:center; justify-content:center;
    cursor:pointer; text-decoration:none;
  }
  .ui-ok{
    background:linear-gradient(135deg,#4F46E5,#7C3AED); color:#fff;
    border:0;
    box-shadow:0 6px 18px -8px rgba(79,70,229,.6), inset 0 1px 0 rgba(255,255,255,.26);
  }
  .ui-ok:hover{ filter:brightness(1.06); }
  .ui-no{
    background:rgba(255,255,255,.7); color:var(--tx-2,#47474F);
    border:1px solid var(--glass-line-2,#D6D6DE);
  }
  .ui-no:hover{ color:var(--tx,#0D0D10); }
  .ui-danger{ background:#DC2626; color:#fff; border:0; }

  .ui-toast{
    position:fixed; left:50%; bottom:34px; z-index:1000;
    transform:translate(-50%,14px);
    padding:11px 20px; border-radius:99px;
    background:rgba(20,20,32,.92); color:#fff;
    font-size:13px; letter-spacing:.01em;
    backdrop-filter:blur(20px);
    box-shadow:0 14px 34px -14px rgba(0,0,0,.6);
    opacity:0; visibility:hidden; transition:all .24s;
    display:flex; align-items:center; gap:8px;
    max-width:calc(100vw - 40px);
  }
  .ui-toast.on{ opacity:1; visibility:visible; transform:translate(-50%,0); }
  .ui-toast .dot{
    width:6px; height:6px; border-radius:99px; background:#7C3AED; flex:0 0 6px;
  }
  `;

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  let mask = null, toastEl = null, toastTimer = null;

  function close(){
    if(mask){ mask.classList.remove('on'); setTimeout(()=>{ mask && mask.remove(); mask = null; }, 220); }
  }

  function dialog(opt){
    close();
    const { title='', body='', ok='确定', cancel='取消', danger=false, onOk=null, hideCancel=false } = opt || {};
    mask = document.createElement('div');
    mask.className = 'ui-mask';
    mask.innerHTML = `
      <div class="ui-dlg" role="dialog" aria-modal="true">
        ${title ? `<div class="ui-h">${title}</div>` : ''}
        <div class="ui-b">${body}</div>
        <div class="ui-f">
          ${hideCancel ? '' : `<button class="ui-no" data-close>${cancel}</button>`}
          <button class="${danger ? 'ui-danger' : 'ui-ok'}" data-ok>${ok}</button>
        </div>
      </div>`;
    document.body.appendChild(mask);
    requestAnimationFrame(()=> mask.classList.add('on'));
    mask.addEventListener('click', e => {
      if(e.target === mask || e.target.hasAttribute('data-close')) close();
    });
    mask.querySelector('[data-ok]').addEventListener('click', () => {
      close();
      if(onOk) onOk();
    });
    document.addEventListener('keydown', escClose);
    return mask;
  }

  function escClose(e){ if(e.key === 'Escape'){ close(); document.removeEventListener('keydown', escClose); } }

  function toast(msg, ms){
    if(!toastEl){
      toastEl = document.createElement('div');
      toastEl.className = 'ui-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = '<span class="dot"></span>' + msg;
    toastEl.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=> toastEl.classList.remove('on'), ms || 1900);
  }

  window.UI = { dialog, toast, close };

  /* 全局兜底：任何 href="#" 都不跳页顶 */
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href="#"]');
    if(a) e.preventDefault();
  }, true);
})();
