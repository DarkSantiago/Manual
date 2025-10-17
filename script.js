
    // Atajo para enfocar búsqueda
    const search = document.getElementById('search');
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== search) {
        e.preventDefault();
        search.focus();
      }
    });

    // Filtro simple de navegación
    const navList = document.getElementById('navList');
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase().trim();
      [...navList.querySelectorAll('a')].forEach(a => {
        const hit = a.textContent.toLowerCase().includes(q);
        a.parentElement.style.display = hit ? '' : 'none';
      });
    });

    // TOC automático por h2/h3 dentro del primer article visible
    function buildTOC() {
      const container = document.getElementById('tocLinks');
      container.innerHTML = '';
      const current = document.querySelector('article:target') || document.querySelector('article');
      const headings = current.querySelectorAll('h2, h3');
      headings.forEach(h => {
        if (!h.id) h.id = h.textContent.toLowerCase().replace(/\s+/g,'-').replace(/[¿?¡!.,]/g,'');
        const a = document.createElement('a');
        a.href = `#${h.id}`;
        a.textContent = h.textContent;
        a.style.marginLeft = h.tagName === 'H3' ? '8px' : '0';
        container.appendChild(a);
      });
    }
    buildTOC();
    window.addEventListener('hashchange', buildTOC);

    // Estado activo en la barra lateral
    function setActive() {
      const hash = location.hash || '#intro';
      [...navList.querySelectorAll('a')].forEach(a => a.classList.toggle('active', a.getAttribute('href') === hash));
    }
    setActive();
    window.addEventListener('hashchange', setActive);

    // Sidebar toggle en móvil
    const btnMenu = document.getElementById('btnMenu');
    const sidebar = document.getElementById('sidebar');
    btnMenu?.addEventListener('click', () => sidebar.classList.toggle('open'));
    // Cerrar al navegar (móvil)
    navList.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && sidebar.classList.contains('open')) sidebar.classList.remove('open');
    });
// yenga ss
    // Generar PDF al hacer clic en el CTA
    document.getElementById('cta').addEventListener('click', (e) => {
      e.preventDefault();
      const area = document.querySelector('main'); // Cambia a '#intro' si solo quieres esa sección
      const opt = {
        margin: 0.5,
        filename: 'manual-roxdoc.pdf',
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().from(area).set(opt).save();
    });
