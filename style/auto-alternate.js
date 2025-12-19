(function(){
    function applyAlternation(){
        try{
            var sections = Array.from(document.querySelectorAll('body > section'));
            sections.forEach(function(sec, idx){
                if(idx % 2 === 1) sec.classList.add('alt-section'); else sec.classList.remove('alt-section');
            });
            // Ensure 'Patient Stories' explicitly uses alt-section in case content changes
            document.querySelectorAll('h2.section-title').forEach(function(h){
                if(h.textContent && h.textContent.trim().toLowerCase() === 'patient stories'){
                    var s = h.closest('section'); if(s) s.classList.add('alt-section');
                }
            });
        }catch(e){ /* safe fail */ }
    }
    SiteUtils.onReady(applyAlternation);
    // also re-run on DOM changes if needed later
    window.applySectionAlternation = applyAlternation;
})();
