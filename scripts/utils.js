(function(){
    function q(sel){ return document.querySelector(sel); }
    function qAll(sel){ return Array.from(document.querySelectorAll(sel)); }
    function onReady(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
    function safeSet(key, val){ try{ localStorage.setItem(key, val); }catch(e){} }
    function safeGet(key){ try{ return localStorage.getItem(key); }catch(e){ return null; } }

    window.SiteUtils = {
        q: q,
        qAll: qAll,
        onReady: onReady,
        safeSet: safeSet,
        safeGet: safeGet
    };
})();
