/* ==========================================================================
   TELEGRAM MINI APP APPLICATION LOGIC
   ========================================================================== */

// 1. Initial State & Default Data Mappings
const DEFAULT_BLOCKS = [
  { id: 'pdf', name: 'Работа с PDF', type: 'text' },
  { id: 'hex', name: 'Коды HEX', type: 'hex' }
];

const DEFAULT_PDF_ITEMS = [
  {
    id: 'pdf_1',
    title: 'Поменять первую страницу между двумя файлами',
    description: 'Меняет первую страницу в файле bauka.pdf на первую страницу с файла ilyar.pdf',
    code: 'qpdf kana.pdf --pages client.pdf 1 kana.pdf 2-z -- result.pdf'
  },
  {
    id: 'pdf_2',
    title: 'Разархивировать файл',
    description: 'Разархивирует файл PDF в декомпрессированном (qdf) виде для отладки',
    code: 'qpdf --qdf --stream-data=uncompress "/Users/market/Desktop/My Comp/Справки/кана1.pdf" "/Users/market/Desktop/My Comp/Справки/unpacked121.pdf"'
  },
  {
    id: 'pdf_3',
    title: 'Заархивировать файл',
    description: 'Сжимает файл PDF обратно',
    code: 'qpdf "unpacked121.pdf" "Выписка_по_счету_KZ82722S000039772537.pdf"'
  },
  {
    id: 'pdf_4',
    title: 'Путь к папке "Справки"',
    description: 'Быстрый переход в рабочую папку со справками',
    code: 'cd "/Users/market/Desktop/My Comp/Справки/"'
  }
];

const DEFAULT_HEX_MAPPINGS = {
  "0": "0013", "1": "0014", "2": "0015", "3": "0016", "4": "0017", "\u00A0": "0003", 
  "5": "0018", "6": "0019", "7": "001a", "8": "001b", "9": "001c", "/": "0012", 
  " ": "0003", "-": "0010", "+": "000e", ",": "000f", ".": "0011", 
  "А": "023a", "Б": "023b", "В": "023c", "Г": "023d", "Д": "023e", "Е": "023f", "Ж": "0240", "З": "0241", 
  "И": "0242", "Й": "0243", "К": "0244", "Қ": "0514", "Л": "0245", "М": "0246", "Н": "0247", "О": "0248", 
  "П": "0249", "Р": "024a", "С": "024b", "Т": "024c", "У": "024d", "Ф": "024e", "Х": "024f", "Ц": "0250", 
  "Ч": "0251", "Ш": "0252", "Щ": "0253", "Ъ": "0254", "Ы": "0255", "Э": "0257", "Ю": "0258", "Я": "0259", 
  "а": "025a", "б": "025b", "в": "025c", "г": "025d", "д": "025e", "е": "025f", "ж": "0260", "з": "0261", 
  "и": "0262", "й": "0263", "к": "0264", "қ": "0515", "л": "0265", "м": "0266", "н": "0267", "о": "0268", 
  "п": "0269", "р": "026a", "с": "026b", "т": "026c", "у": "026d", "ү": "051b", "ұ": "051d", "ф": "026e", 
  "х": "026f", "ц": "0270", "ч": "0271", "ш": "0272", "щ": "0273", "ъ": "0274", "ы": "0275", "ь": "0276", 
  "э": "0277", "ю": "0278", "я": "0279", "ә": "0525", "ғ": "0511", 
  "A": "0024", "B": "0025", "C": "0026", "D": "0027", "E": "0028", "F": "0029", "G": "002a", "H": "002b", 
  "I": "002c", "J": "002d", "K": "002e", "L": "002f", "M": "0030", "N": "0031", "O": "0032", "P": "0033", 
  "Q": "0034", "R": "0035", "S": "0036", "T": "0037", "U": "0038", "V": "0039", "W": "003a", "X": "003b", 
  "Y": "003c", "Z": "003d", 
  "a": "0044", "b": "0045", "c": "0046", "d": "0047", "e": "0048", "f": "0049", "g": "004a", "h": "004b", 
  "i": "004c", "j": "004d", "k": "004e", "l": "004f", "m": "0050", "n": "0051", "o": "0052", "p": "0053", 
  "q": "0054", "r": "0055", "s": "0056", "t": "0057", "u": "0058", "v": "0059", "w": "005a", "x": "005b", 
  "y": "005c", "z": "005d"
};

// Convert hex mappings into structured item list
const DEFAULT_HEX_ITEMS = Object.entries(DEFAULT_HEX_MAPPINGS).map(([char, code], idx) => ({
  id: `hex_${idx}`,
  char: char,
  code: code
}));

// Fallback Trip details
const TRIP_DETAILS = {
  rio: {
    name: 'Рио-де-Жанейро',
    country: 'Бразилия',
    rating: '5.0',
    reviews: '143',
    desc: 'Рио-де-Жанейро — огромный прибрежный город в Бразилии, знаменитый своими пляжами Копакабана и Ипанема, статуей Христа-Искупителя высотой 38 метров на горе Корковаду и горой Сахарная голова. Город славится колоритными трущобами (фавелами) и грандиозными карнавалами.',
    duration: '10 дней',
    price: '$1,400',
    image: 'assets/rio.png'
  },
  tokyo: {
    name: 'Токио',
    country: 'Япония',
    rating: '4.9',
    reviews: '212',
    desc: 'Токио — столица Японии, ультрасовременный мегаполис, сочетающий в себе неоновые небоскребы и величественные древние храмы. Здесь вы найдете изысканную японскую гастрономию, оживленные кварталы Сибуя и Акихабара и захватывающие дух виды на гору Фудзи.',
    duration: '8 дней',
    price: '$1,850',
    image: 'assets/tokyo.png'
  },
  paris: {
    name: 'Париж',
    country: 'Франция',
    rating: '4.8',
    reviews: '190',
    desc: 'Париж — столица Франции, мировой центр искусства, моды, гастрономии и культуры. Город славится своей архитектурой XIX века, живописными бульварами, Сеной и такими культовыми достопримечательностями, как Эйфелева башня и собор Нотр-Дам.',
    duration: '7 дней',
    price: '$1,200',
    image: 'assets/paris.png'
  }
};

// State Variables
let appBlocks = [];
let appItems = {}; // maps blockId -> array of item objects
let favoriteTrips = [];
let noteText = '';
let selectedAccent = 'indigo';
let syncTgTheme = true;
let isDarkTheme = false;

// 2. LocalStorage Persistence Wrapper
function loadState() {
  try {
    const savedBlocks = localStorage.getItem('tgapp_blocks');
    const savedItems = localStorage.getItem('tgapp_items');
    const savedFavs = localStorage.getItem('tgapp_fav_trips');
    const savedNote = localStorage.getItem('tgapp_note');
    const savedAccent = localStorage.getItem('tgapp_accent');
    const savedSync = localStorage.getItem('tgapp_sync_tg_theme');
    const savedDark = localStorage.getItem('tgapp_dark_mode');

    if (savedBlocks) appBlocks = JSON.parse(savedBlocks);
    else appBlocks = DEFAULT_BLOCKS;

    if (savedItems) appItems = JSON.parse(savedItems);
    else {
      appItems = {
        pdf: DEFAULT_PDF_ITEMS,
        hex: DEFAULT_HEX_ITEMS
      };
    }

    if (savedFavs) favoriteTrips = JSON.parse(savedFavs);
    else favoriteTrips = ['rio']; // Rio is liked by default!

    if (savedNote) noteText = savedNote;
    else noteText = '';

    if (savedAccent) selectedAccent = savedAccent;
    else selectedAccent = 'indigo';

    if (savedSync !== null) syncTgTheme = savedSync === 'true';
    else syncTgTheme = true;

    if (savedDark !== null) isDarkTheme = savedDark === 'true';
    else isDarkTheme = false;

  } catch (err) {
    console.error('Error loading localStorage state, resetting defaults', err);
    appBlocks = DEFAULT_BLOCKS;
    appItems = { pdf: DEFAULT_PDF_ITEMS, hex: DEFAULT_HEX_ITEMS };
    favoriteTrips = ['rio'];
    noteText = '';
    selectedAccent = 'indigo';
    syncTgTheme = true;
    isDarkTheme = false;
  }
}

function saveState() {
  localStorage.setItem('tgapp_blocks', JSON.stringify(appBlocks));
  localStorage.setItem('tgapp_items', JSON.stringify(appItems));
  localStorage.setItem('tgapp_fav_trips', JSON.stringify(favoriteTrips));
  localStorage.setItem('tgapp_note', noteText);
  localStorage.setItem('tgapp_accent', selectedAccent);
  localStorage.setItem('tgapp_sync_tg_theme', syncTgTheme.toString());
  localStorage.setItem('tgapp_dark_mode', isDarkTheme.toString());
}

// 3. Telegram WebApp Integration
const tg = window.Telegram?.WebApp;

function initTelegram() {
  if (tg) {
    tg.ready();
    tg.expand();
    
    // Read platform and theme configurations
    document.getElementById('tg-platform').innerText = tg.platform || 'unknown';
    document.getElementById('tg-version').innerText = tg.version || '1.0';
    document.getElementById('tg-color-scheme').innerText = tg.colorScheme || 'light';
    
    // Set headers
    if (tg.setHeaderColor) {
      tg.setHeaderColor(tg.themeParams.header_bg_color || '#f6f7f9');
    }

    // Read user parameters if available
    const user = tg.initDataUnsafe?.user;
    if (user) {
      document.getElementById('tg-user-id').innerText = user.id || 'N/A';
      
      // Update nickname
      const nickname = user.username ? `@${user.username}` : `${user.first_name || ''} ${user.last_name || ''}`.trim();
      if (nickname) {
        document.getElementById('user-name').innerText = nickname;
      }
      
      // Update avatar
      if (user.photo_url) {
        document.getElementById('user-avatar').src = user.photo_url;
      } else {
        // Generate beautiful fallback avatar with user initials
        const initials = ((user.first_name?.[0] || '') + (user.last_name?.[0] || '')).toUpperCase() || 'U';
        createLetterAvatar(initials);
      }
    } else {
      document.getElementById('tg-user-id').innerText = 'N/A';
      document.getElementById('user-name').innerText = 'Ilyar Arzuyev';
      createLetterAvatar('IA');
    }

    // Bind event for theme change
    tg.onEvent('themeChanged', function() {
      if (syncTgTheme) {
        applyThemeSettings();
      }
    });

  } else {
    // Normal browser execution setup
    document.getElementById('tg-user-id').innerText = 'N/A (Browser)';
    document.getElementById('tg-version').innerText = 'N/A';
    document.getElementById('user-name').innerText = 'Ilyar Arzuyev';
    createLetterAvatar('IA');
  }

  applyThemeSettings();
}

function createLetterAvatar(initials) {
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  
  // Create beautiful gradient background for letter avatar
  const gradients = [
    ['#ff9a9e', '#fecfef'],
    ['#a1c4fd', '#c2e9fb'],
    ['#84fab0', '#8fd3f4'],
    ['#fccb90', '#d5d2e3'],
    ['#e0c3fc', '#8ec5fc'],
    ['#f093fb', '#f5576c']
  ];
  const selectedGrad = gradients[Math.floor(Math.random() * gradients.length)];
  const grad = ctx.createLinearGradient(0, 0, 100, 100);
  grad.addColorStop(0, selectedGrad[0]);
  grad.addColorStop(1, selectedGrad[1]);
  
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(50, 50, 50, 0, Math.PI * 2);
  ctx.fill();
  
  // Font and styles
  ctx.font = 'bold 38px Outfit';
  ctx.fillStyle = '#1c1c1e';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, 50, 52);
  
  document.getElementById('user-avatar').src = canvas.toDataURL();
}

// Try haptic feedback
function triggerHaptic(type = 'light') {
  if (tg && tg.HapticFeedback) {
    if (type === 'light') tg.HapticFeedback.impactOccurred('light');
    else if (type === 'medium') tg.HapticFeedback.impactOccurred('medium');
    else if (type === 'heavy') tg.HapticFeedback.impactOccurred('heavy');
    else if (type === 'success') tg.HapticFeedback.notificationOccurred('success');
    else if (type === 'warning') tg.HapticFeedback.notificationOccurred('warning');
  }
}

// Theme Application Rules
function applyThemeSettings() {
  document.body.className = ''; // reset classes
  
  // Sync with Telegram CSS vars if active
  if (tg && syncTgTheme) {
    document.body.classList.add('tg-theme');
    isDarkTheme = tg.colorScheme === 'dark';
    if (isDarkTheme) {
      document.body.classList.add('dark-mode');
    }
  } else {
    // Normal custom styling overrides
    if (isDarkTheme) {
      document.body.classList.add('dark-mode');
    }
  }

  // Set header color matching
  if (tg && tg.setHeaderColor) {
    const bg = getComputedStyle(document.body).getPropertyValue('--header-bg').trim();
    tg.setHeaderColor(bg || '#f6f7f9');
  }

  // Update theme toggle icons
  const sunIcon = document.querySelector('.icon-sun');
  const moonIcon = document.querySelector('.icon-moon');
  if (sunIcon && moonIcon) {
    if (isDarkTheme) {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }

  // Set accent colors
  document.documentElement.style.setProperty('--accent-color', `var(--accent-${selectedAccent})`);
  
  // Accent RGB helper for custom box-shadows
  const accentRGBs = {
    indigo: '88, 86, 214',
    violet: '175, 82, 222',
    emerald: '52, 199, 89',
    amber: '255, 149, 0'
  };
  document.documentElement.style.setProperty('--accent-color-rgb', accentRGBs[selectedAccent]);

  // Sync checkboxes inside settings UI
  const syncToggle = document.getElementById('sync-tg-theme');
  if (syncToggle) syncToggle.checked = syncTgTheme;
}

// 4. Tab Manager
function initTabs() {
  const dockButtons = document.querySelectorAll('.dock-btn');
  const panes = document.querySelectorAll('.tab-pane');

  dockButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.getAttribute('data-target');
      if (!target) return;

      triggerHaptic('light');

      // Clear active states
      dockButtons.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      // Apply to clicked tab
      this.classList.add('active');
      const targetPane = document.getElementById(target);
      if (targetPane) {
        targetPane.classList.add('active');
        
        // Custom actions when switching tabs
        if (target === 'tab-favorites') {
          renderFavoritesTab();
        } else if (target === 'tab-data') {
          // Trigger layout reflow for accordions if needed
          recalculateAccordionHeights();
        }
      }
    });
  });
}

// 5. Accordion Expand/Collapse Logic
function initAccordionHandlers() {
  // We attach click listener to the parent container because items can be added dynamically!
  const container = document.getElementById('accordions-container');
  if (!container) return;

  container.addEventListener('click', function(e) {
    // Find closest accordion-header
    const header = e.target.closest('.accordion-header');
    if (!header) return;

    // Ignore if click was on action button inside the header
    if (e.target.closest('.action-btn')) return;

    const item = header.closest('.accordion-item');
    if (!item) return;

    const body = item.querySelector('.accordion-body');
    if (!body) return;

    triggerHaptic('light');

    if (item.classList.contains('open')) {
      // Collapse
      body.style.height = '0px';
      item.classList.remove('open');
    } else {
      // Expand
      // Force render of body contents
      const blockId = item.id.replace('block-', '');
      renderBlockItems(blockId);
      
      // Close other accordions? (Optional, let's keep them independent for better UX, or close them)
      // Let's close others for clean scrolling
      const allItems = container.querySelectorAll('.accordion-item');
      allItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.querySelector('.accordion-body').style.style = '0px';
          otherItem.querySelector('.accordion-body').style.height = '0px';
          otherItem.classList.remove('open');
        }
      });

      item.classList.add('open');
      body.style.height = body.scrollHeight + 'px';
      
      // Scroll the container slightly if needed so header is visible
      setTimeout(() => {
        header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  });
}

function recalculateAccordionHeights() {
  const openAccordions = document.querySelectorAll('.accordion-item.open');
  openAccordions.forEach(item => {
    const body = item.querySelector('.accordion-body');
    if (body) {
      body.style.height = 'auto'; // allow measuring
      body.style.height = body.scrollHeight + 'px';
    }
  });
}

// 6. Data Manager (CRUD) Logic

// Render all accordions in the container
function renderAccordionsList() {
  const container = document.getElementById('accordions-container');
  if (!container) return;

  // Clear all EXCEPT pre-defined hardcoded containers
  const items = container.querySelectorAll('.accordion-item');
  items.forEach(el => {
    if (el.id !== 'block-pdf' && el.id !== 'block-hex') {
      el.remove();
    }
  });

  // Render any user-defined blocks
  appBlocks.forEach(block => {
    if (block.id === 'pdf' || block.id === 'hex') return; // Skip default ones (already in HTML template)

    const blockHtml = `
      <div class="accordion-item" id="block-${block.id}">
        <div class="accordion-header">
          <div class="accordion-title-wrapper">
            <svg class="accordion-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            <span class="accordion-title-text">${escapeHtml(block.name)}</span>
          </div>
          <div class="accordion-actions">
            <button class="action-btn block-add-btn" onclick="event.stopPropagation(); openAddItemModal('${block.id}')" title="Добавить элемент">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <button class="action-btn block-edit-btn" onclick="event.stopPropagation(); openEditBlockModal('${block.id}')" title="Редактировать">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"/></svg>
            </button>
            <button class="action-btn block-delete-btn" onclick="event.stopPropagation(); deleteBlock('${block.id}')" title="Удалить">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
            <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div class="accordion-body">
          <div class="custom-block-list" id="${block.id}-items-container">
            <!-- Items injected dynamically -->
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', blockHtml);
  });

  // Make sure items are rendered for open blocks
  appBlocks.forEach(block => {
    const el = document.getElementById(`block-${block.id}`);
    if (el && el.classList.contains('open')) {
      renderBlockItems(block.id);
    }
  });
}

// Render the items inside a specific block
function renderBlockItems(blockId) {
  const block = appBlocks.find(b => b.id === blockId);
  if (!block) return;

  const container = document.getElementById(`${blockId}-items-container`);
  if (!container) return;

  const items = appItems[blockId] || [];

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Список пуст. Нажмите "+", чтобы добавить первый элемент.</p>
      </div>
    `;
    return;
  }

  // Type: Text layout (title, description, copyable code)
  if (block.type === 'text') {
    let html = '<div class="pdf-commands-list">';
    items.forEach((item, index) => {
      html += `
        <div class="pdf-item-card" data-item-id="${item.id}">
          <div class="item-row-controls">
            <button class="row-ctrl-btn edit" onclick="openEditItemModal('${blockId}', '${item.id}')" title="Редактировать">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"/></svg>
            </button>
            <button class="row-ctrl-btn delete" onclick="deleteItem('${blockId}', '${item.id}')" title="Удалить">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
          <div class="pdf-item-header">
            <span class="pdf-item-title">${index + 1}. ${escapeHtml(item.title)}</span>
          </div>
          ${item.description ? `<p class="pdf-item-description">${escapeHtml(item.description)}</p>` : ''}
          <div class="code-block-wrapper">
            <pre class="code-block" id="code-${item.id}">${escapeHtml(item.code)}</pre>
            <button class="copy-icon-btn" onclick="copyToClipboard('${item.id}')" title="Копировать код">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  }
  // Type: HEX grids
  else if (block.type === 'hex') {
    let html = `
      <div class="hex-grid-container">
        <div class="hex-help-text">Нажмите на ячейку, чтобы скопировать шестнадцатеричный код символа.</div>
        <div class="hex-grid">
    `;
    items.forEach(item => {
      // Render special labels for spacer characters
      let displayChar = item.char;
      if (displayChar === ' ') displayChar = '⎵ (пробел)';
      else if (displayChar === '\u00A0') displayChar = '⎵ (неразрыв.)';
      
      html += `
        <div class="hex-card" onclick="copyHexCode('${item.id}', '${escapeHtml(item.code)}')" id="hex-cell-${item.id}">
          <div class="hex-card-controls">
            <button class="hex-ctrl-btn edit" onclick="event.stopPropagation(); openEditItemModal('${blockId}', '${item.id}')" title="Редактировать">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"/></svg>
            </button>
            <button class="hex-ctrl-btn delete" onclick="event.stopPropagation(); deleteItem('${blockId}', '${item.id}')" title="Удалить">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
          <span class="hex-char">${escapeHtml(displayChar)}</span>
          <span class="hex-code">${escapeHtml(item.code)}</span>
        </div>
      `;
    });
    html += `
        </div>
      </div>
    `;
    container.innerHTML = html;
  }
}

// 7. Clipboard and Copy Helpers
function copyToClipboard(itemId) {
  const codeEl = document.getElementById(`code-${itemId}`);
  if (!codeEl) return;

  const textToCopy = codeEl.innerText;

  navigator.clipboard.writeText(textToCopy).then(() => {
    triggerHaptic('success');
    showToast('Скопировано в буфер обмена!');
  }).catch(err => {
    console.error('Copy failed', err);
    // Fallback if Clipboard API fails on older browsers
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Скопировано в буфер обмена!');
      triggerHaptic('success');
    } catch (e) {
      showToast('Не удалось скопировать.');
    }
    document.body.removeChild(textarea);
  });
}

function copyHexCode(itemId, hexCode) {
  const cell = document.getElementById(`hex-cell-${itemId}`);
  
  navigator.clipboard.writeText(hexCode).then(() => {
    triggerHaptic('success');
    showToast(`Код "${hexCode}" скопирован!`);
    
    // Add visual success flash
    if (cell) {
      cell.classList.add('copied');
      setTimeout(() => {
        cell.classList.remove('copied');
      }, 800);
    }
  }).catch(err => {
    console.error('Hex copy failed', err);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerText = message;
  toast.classList.add('show');

  // Cancel any existing timeout
  if (window.toastTimeout) clearTimeout(window.toastTimeout);

  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// 8. Custom Search Filtering (For Tab 1 and Tab 2)
function initSearchHandlers() {
  // Home Page Search
  const homeInput = document.getElementById('home-search-input');
  if (homeInput) {
    homeInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.trip-card');

      cards.forEach(card => {
        const name = card.querySelector('.trip-name').innerText.toLowerCase();
        const country = card.querySelector('.trip-country').innerText.toLowerCase();

        if (name.includes(query) || country.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Data Page Search
  const dataInput = document.getElementById('data-search-input');
  if (dataInput) {
    dataInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      
      if (query === '') {
        // Reset view: close all or just re-render
        appBlocks.forEach(block => {
          renderBlockItems(block.id);
          const el = document.getElementById(`block-${block.id}`);
          if (el) {
            el.style.display = 'block';
            // do not change collapse state on reset
          }
        });
        recalculateAccordionHeights();
        return;
      }

      // Filter
      appBlocks.forEach(block => {
        const items = appItems[block.id] || [];
        let matchingItems = [];

        if (block.type === 'text') {
          matchingItems = items.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.code.toLowerCase().includes(query) ||
            (item.description && item.description.toLowerCase().includes(query))
          );
        } else if (block.type === 'hex') {
          matchingItems = items.filter(item => 
            item.char.toLowerCase().includes(query) || 
            item.code.toLowerCase().includes(query)
          );
        }

        const blockEl = document.getElementById(`block-${block.id}`);
        if (!blockEl) return;

        if (matchingItems.length > 0) {
          blockEl.style.display = 'block';
          
          // Render filtered items specifically for this search
          renderFilteredBlockItems(block.id, matchingItems);
          
          // Auto-expand accordion to show results!
          const body = blockEl.querySelector('.accordion-body');
          blockEl.classList.add('open');
          body.style.height = 'auto'; // let it calculate
          body.style.height = body.scrollHeight + 'px';
        } else {
          blockEl.style.display = 'none';
          blockEl.classList.remove('open');
          blockEl.querySelector('.accordion-body').style.height = '0px';
        }
      });
    });
  }
}

// Render ONLY matching search results
function renderFilteredBlockItems(blockId, matchingItems) {
  const container = document.getElementById(`${blockId}-items-container`);
  if (!container) return;

  const block = appBlocks.find(b => b.id === blockId);
  if (!block) return;

  if (block.type === 'text') {
    let html = '<div class="pdf-commands-list">';
    matchingItems.forEach((item, index) => {
      html += `
        <div class="pdf-item-card" data-item-id="${item.id}">
          <div class="item-row-controls">
            <button class="row-ctrl-btn edit" onclick="openEditItemModal('${blockId}', '${item.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"/></svg>
            </button>
            <button class="row-ctrl-btn delete" onclick="deleteItem('${blockId}', '${item.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
          <div class="pdf-item-header">
            <span class="pdf-item-title">${index + 1}. ${escapeHtml(item.title)}</span>
          </div>
          ${item.description ? `<p class="pdf-item-description">${escapeHtml(item.description)}</p>` : ''}
          <div class="code-block-wrapper">
            <pre class="code-block" id="code-${item.id}">${escapeHtml(item.code)}</pre>
            <button class="copy-icon-btn" onclick="copyToClipboard('${item.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  } else if (block.type === 'hex') {
    let html = `
      <div class="hex-grid-container">
        <div class="hex-grid">
    `;
    matchingItems.forEach(item => {
      let displayChar = item.char;
      if (displayChar === ' ') displayChar = '⎵ (пробел)';
      else if (displayChar === '\u00A0') displayChar = '⎵ (неразрыв.)';

      html += `
        <div class="hex-card" onclick="copyHexCode('${item.id}', '${escapeHtml(item.code)}')" id="hex-cell-${item.id}">
          <div class="hex-card-controls">
            <button class="hex-ctrl-btn edit" onclick="event.stopPropagation(); openEditItemModal('${blockId}', '${item.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"/></svg>
            </button>
            <button class="hex-ctrl-btn delete" onclick="event.stopPropagation(); deleteItem('${blockId}', '${item.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
          <span class="hex-char">${escapeHtml(displayChar)}</span>
          <span class="hex-code">${escapeHtml(item.code)}</span>
        </div>
      `;
    });
    html += '</div></div>';
    container.innerHTML = html;
  }
}

// 9. Modals Trigger Mechanics
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  triggerHaptic('light');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  triggerHaptic('light');
}

// Global modal overlay click to close
window.onclick = function(event) {
  if (event.target.classList.contains('modal-overlay')) {
    event.target.classList.remove('open');
    triggerHaptic('light');
  }
};

// 10. CRUD operations details

// BLOCK CRUD
function openAddBlockModal() {
  document.getElementById('block-modal-title').innerText = 'Создать новый блок';
  document.getElementById('block-modal-id').value = '';
  document.getElementById('block-name-input').value = '';
  document.getElementById('block-type-input').value = 'text';
  document.getElementById('block-type-input').disabled = false;
  openModal('block-modal');
}

function openEditBlockModal(blockId) {
  const block = appBlocks.find(b => b.id === blockId);
  if (!block) return;

  document.getElementById('block-modal-title').innerText = 'Редактировать блок';
  document.getElementById('block-modal-id').value = block.id;
  document.getElementById('block-name-input').value = block.name;
  document.getElementById('block-type-input').value = block.type;
  document.getElementById('block-type-input').disabled = true; // cannot change type post-creation to prevent data bugs
  openModal('block-modal');
}

function saveBlock() {
  const name = document.getElementById('block-name-input').value.trim();
  const type = document.getElementById('block-type-input').value;
  const blockId = document.getElementById('block-modal-id').value;

  if (!name) {
    showToast('Введите название блока!');
    triggerHaptic('warning');
    return;
  }

  if (blockId) {
    // Edit Mode
    const block = appBlocks.find(b => b.id === blockId);
    if (block) {
      block.name = name;
      showToast('Блок успешно изменен!');
    }
  } else {
    // Add Mode
    const newId = 'block_' + Date.now();
    appBlocks.push({ id: newId, name: name, type: type });
    appItems[newId] = [];
    showToast('Новый блок создан!');
  }

  saveState();
  renderAccordionsList();
  closeModal('block-modal');
  triggerHaptic('success');
}

function deleteBlock(blockId) {
  if (blockId === 'pdf' || blockId === 'hex') {
    showToast('Нельзя удалить стандартные блоки!');
    triggerHaptic('warning');
    return;
  }

  openConfirmDialog('Удалить блок', 'Вы уверены, что хотите удалить этот блок со всеми его элементами?', () => {
    appBlocks = appBlocks.filter(b => b.id !== blockId);
    delete appItems[blockId];
    saveState();
    renderAccordionsList();
    showToast('Блок удален!');
    triggerHaptic('success');
  });
}

// ITEMS CRUD
function openAddItemModal(blockId) {
  const block = appBlocks.find(b => b.id === blockId);
  if (!block) return;

  document.getElementById('add-modal-block-id').value = blockId;
  document.getElementById('add-modal-title').innerText = `Добавить в "${block.name}"`;

  const container = document.getElementById('add-modal-fields-container');
  container.innerHTML = '';

  if (block.type === 'text') {
    container.innerHTML = `
      <div class="form-group">
        <label for="item-title-input">Название</label>
        <input type="text" id="item-title-input" placeholder="Например: Обрезать страницы">
      </div>
      <div class="form-group">
        <label for="item-desc-input">Описание</label>
        <input type="text" id="item-desc-input" placeholder="Краткое описание действия...">
      </div>
      <div class="form-group">
        <label for="item-code-input">Команда / Текст</label>
        <textarea id="item-code-input" placeholder="Команда для консоли или текст для копирования..."></textarea>
      </div>
    `;
  } else if (block.type === 'hex') {
    container.innerHTML = `
      <div class="form-group">
        <label for="item-char-input">Символ</label>
        <input type="text" id="item-char-input" placeholder="Например: А" maxlength="5">
      </div>
      <div class="form-group">
        <label for="item-hex-input">HEX-код</label>
        <input type="text" id="item-hex-input" placeholder="Например: 023a">
      </div>
    `;
  }

  openModal('add-item-modal');
}

function saveAddItem() {
  const blockId = document.getElementById('add-modal-block-id').value;
  const block = appBlocks.find(b => b.id === blockId);
  if (!block) return;

  const items = appItems[blockId] || [];

  if (block.type === 'text') {
    const title = document.getElementById('item-title-input').value.trim();
    const desc = document.getElementById('item-desc-input').value.trim();
    const code = document.getElementById('item-code-input').value.trim();

    if (!title || !code) {
      showToast('Заполните название и текст команды!');
      triggerHaptic('warning');
      return;
    }

    const newItem = {
      id: `item_${Date.now()}`,
      title: title,
      description: desc,
      code: code
    };

    items.push(newItem);

  } else if (block.type === 'hex') {
    const char = document.getElementById('item-char-input').value; // allow spaces
    const code = document.getElementById('item-hex-input').value.trim();

    if (!char || !code) {
      showToast('Заполните символ и HEX-код!');
      triggerHaptic('warning');
      return;
    }

    const newItem = {
      id: `item_${Date.now()}`,
      char: char,
      code: code
    };

    items.push(newItem);
  }

  appItems[blockId] = items;
  saveState();
  renderBlockItems(blockId);
  recalculateAccordionHeights();
  closeModal('add-item-modal');
  showToast('Элемент добавлен!');
  triggerHaptic('success');
}

function openEditItemModal(blockId, itemId) {
  const block = appBlocks.find(b => b.id === blockId);
  if (!block) return;

  const item = appItems[blockId]?.find(i => i.id === itemId);
  if (!item) return;

  document.getElementById('edit-modal-block-id').value = blockId;
  document.getElementById('edit-modal-item-id').value = itemId;
  document.getElementById('edit-modal-title').innerText = `Изменить элемент`;

  const container = document.getElementById('edit-modal-fields-container');
  container.innerHTML = '';

  if (block.type === 'text') {
    container.innerHTML = `
      <div class="form-group">
        <label for="edit-item-title-input">Название</label>
        <input type="text" id="edit-item-title-input" value="${escapeHtml(item.title)}">
      </div>
      <div class="form-group">
        <label for="edit-item-desc-input">Описание</label>
        <input type="text" id="edit-item-desc-input" value="${escapeHtml(item.description || '')}">
      </div>
      <div class="form-group">
        <label for="edit-item-code-input">Команда / Текст</label>
        <textarea id="edit-item-code-input">${escapeHtml(item.code)}</textarea>
      </div>
    `;
  } else if (block.type === 'hex') {
    container.innerHTML = `
      <div class="form-group">
        <label for="edit-item-char-input">Символ</label>
        <input type="text" id="edit-item-char-input" value="${escapeHtml(item.char)}" maxlength="5">
      </div>
      <div class="form-group">
        <label for="edit-item-hex-input">HEX-код</label>
        <input type="text" id="edit-item-hex-input" value="${escapeHtml(item.code)}">
      </div>
    `;
  }

  openModal('edit-item-modal');
}

function saveEditItem() {
  const blockId = document.getElementById('edit-modal-block-id').value;
  const itemId = document.getElementById('edit-modal-item-id').value;
  const block = appBlocks.find(b => b.id === blockId);
  if (!block) return;

  const item = appItems[blockId]?.find(i => i.id === itemId);
  if (!item) return;

  if (block.type === 'text') {
    const title = document.getElementById('edit-item-title-input').value.trim();
    const desc = document.getElementById('edit-item-desc-input').value.trim();
    const code = document.getElementById('edit-item-code-input').value.trim();

    if (!title || !code) {
      showToast('Название и команда не могут быть пустыми!');
      triggerHaptic('warning');
      return;
    }

    item.title = title;
    item.description = desc;
    item.code = code;

  } else if (block.type === 'hex') {
    const char = document.getElementById('edit-item-char-input').value;
    const code = document.getElementById('edit-item-hex-input').value.trim();

    if (!char || !code) {
      showToast('Символ и HEX-код не могут быть пустыми!');
      triggerHaptic('warning');
      return;
    }

    item.char = char;
    item.code = code;
  }

  saveState();
  renderBlockItems(blockId);
  recalculateAccordionHeights();
  closeModal('edit-item-modal');
  showToast('Элемент сохранен!');
  triggerHaptic('success');
}

function deleteItem(blockId, itemId) {
  openConfirmDialog('Удалить элемент', 'Вы уверены, что хотите удалить этот элемент из списка?', () => {
    appItems[blockId] = appItems[blockId].filter(i => i.id !== itemId);
    saveState();
    renderBlockItems(blockId);
    recalculateAccordionHeights();
    showToast('Элемент удален!');
    triggerHaptic('success');
  });
}

// CONFIRMATION DIALOG HELPER (replaces native window.confirm)
let confirmCallback = null;

function openConfirmDialog(title, description, onConfirm) {
  document.getElementById('confirm-modal-title').innerText = title;
  document.getElementById('confirm-modal-desc').innerText = description;
  confirmCallback = onConfirm;
  openModal('confirm-modal');
}

function initConfirmHandlers() {
  const okBtn = document.getElementById('confirm-ok-btn');
  const cancelBtn = document.getElementById('confirm-cancel-btn');

  if (okBtn) {
    okBtn.addEventListener('click', function() {
      if (confirmCallback) confirmCallback();
      closeModal('confirm-modal');
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      closeModal('confirm-modal');
    });
  }
}

// 11. Tab 3: Favorites & Notebook Utilities

function toggleFavoriteTrip(tripId) {
  triggerHaptic('light');
  const idx = favoriteTrips.indexOf(tripId);
  if (idx > -1) {
    favoriteTrips.splice(idx, 1);
    showToast('Удалено из избранного');
  } else {
    favoriteTrips.push(tripId);
    showToast('Добавлено в избранное');
    triggerHaptic('success');
  }
  
  saveState();
  updateLikesOnCards();
  renderFavoritesTab();
}

function updateLikesOnCards() {
  const cards = document.querySelectorAll('.trip-card');
  cards.forEach(card => {
    const id = card.getAttribute('data-trip-id');
    const likeBtn = card.querySelector('.like-btn');
    if (likeBtn) {
      if (favoriteTrips.includes(id)) {
        likeBtn.classList.add('favorited');
      } else {
        likeBtn.classList.remove('favorited');
      }
    }
  });
}

function renderFavoritesTab() {
  const container = document.getElementById('fav-trips-list');
  if (!container) return;

  if (favoriteTrips.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <p>Вы еще не добавили ни одного тура в избранное.</p>
      </div>
    `;
    return;
  }

  let html = '';
  favoriteTrips.forEach(tripId => {
    const details = TRIP_DETAILS[tripId];
    if (!details) return;

    html += `
      <div class="fav-trip-row-card" onclick="openTripDetails('${tripId}')">
        <img src="${details.image}" alt="${details.name}" class="fav-trip-thumb">
        <div class="fav-trip-info">
          <div class="fav-trip-name">${escapeHtml(details.name)}</div>
          <div class="fav-trip-country">${escapeHtml(details.country)}</div>
        </div>
        <button class="action-btn" onclick="event.stopPropagation(); toggleFavoriteTrip('${tripId}')" style="color: #ff3b30;" title="Удалить из избранного">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
    `;
  });
  container.innerHTML = html;
}

// Notebook Autosave with Debounce
let autosaveTimeout = null;

function initNotebook() {
  const textarea = document.getElementById('notebook-textarea');
  const statusSpan = document.getElementById('notebook-status');
  const clearBtn = document.getElementById('clear-notes-btn');

  if (!textarea) return;

  textarea.value = noteText;

  textarea.addEventListener('input', function() {
    if (statusSpan) {
      statusSpan.innerText = 'Сохранение...';
      statusSpan.classList.add('show');
      statusSpan.style.color = 'var(--text-secondary)';
    }

    if (autosaveTimeout) clearTimeout(autosaveTimeout);

    autosaveTimeout = setTimeout(() => {
      noteText = textarea.value;
      saveState();
      
      if (statusSpan) {
        statusSpan.innerText = 'Сохранено';
        statusSpan.style.color = '#34c759';
      }
    }, 1000);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      textarea.value = '';
      noteText = '';
      saveState();
      if (statusSpan) {
        statusSpan.innerText = 'Очищено';
        statusSpan.classList.add('show');
        statusSpan.style.color = '#ff3b30';
        setTimeout(() => statusSpan.classList.remove('show'), 1500);
      }
      triggerHaptic('light');
    });
  }
}

// 12. Bottom Modal Sheet (Trip details)
function openTripDetails(tripId) {
  const details = TRIP_DETAILS[tripId];
  if (!details) return;

  triggerHaptic('light');

  const container = document.getElementById('trip-modal-body');
  container.innerHTML = `
    <div class="modal-trip-header">
      <img src="${details.image}" alt="${details.name}" class="modal-trip-img">
      <div class="card-gradient"></div>
      <div class="modal-trip-info-overlay">
        <span class="modal-trip-country">${escapeHtml(details.country)}</span>
        <h2 class="modal-trip-title">${escapeHtml(details.name)}</h2>
      </div>
    </div>
    <div class="modal-trip-rating-row" style="display: flex; gap: 10px; align-items: center; margin-bottom: 16px;">
      <div class="rating-stars" style="background-color: var(--border-color); color: var(--text-color);">
        <svg class="icon-star" viewBox="0 0 24 24" fill="currentColor" style="width: 12px; height: 12px; color: #ffcc00;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span style="margin-left: 4px;">${details.rating}</span>
      </div>
      <span style="font-size: 13px; color: var(--text-secondary);">${details.reviews} отзывов от путешественников</span>
    </div>
    <p class="modal-trip-desc">${escapeHtml(details.desc)}</p>
    <div class="modal-trip-details-grid">
      <div class="modal-detail-tile">
        <span class="modal-detail-label">Длительность</span>
        <span class="modal-detail-val">${escapeHtml(details.duration)}</span>
      </div>
      <div class="modal-detail-tile">
        <span class="modal-detail-label">Ориентировочная цена</span>
        <span class="modal-detail-val">${escapeHtml(details.price)}</span>
      </div>
    </div>
    <button class="primary-btn" style="width: 100%; height: 50px; border-radius: 16px; font-size: 15px;" onclick="closeTripDetails()">Забронировать тур</button>
  `;

  openModal('details-modal');
}

function closeTripDetails() {
  closeModal('details-modal');
}

// 13. Settings Action Elements
function initSettingsHandlers() {
  // Theme Toggle Button in Header
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      triggerHaptic('light');
      // If we were synced to Telegram theme, turn sync off since user manually clicked
      if (syncTgTheme) {
        syncTgTheme = false;
        const tgCheck = document.getElementById('sync-tg-theme');
        if (tgCheck) tgCheck.checked = false;
      }
      
      isDarkTheme = !isDarkTheme;
      saveState();
      applyThemeSettings();
    });
  }

  // Accent selector triggers
  const accentDots = document.querySelectorAll('.accent-dot');
  accentDots.forEach(dot => {
    // Set active state visually on load
    if (dot.getAttribute('data-accent') === selectedAccent) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', function() {
      triggerHaptic('light');
      accentDots.forEach(d => d.classList.remove('active'));
      this.classList.add('active');
      selectedAccent = this.getAttribute('data-accent');
      saveState();
      applyThemeSettings();
    });
  });

  // Sync Telegram theme toggle
  const syncToggle = document.getElementById('sync-tg-theme');
  if (syncToggle) {
    syncToggle.addEventListener('change', function() {
      syncTgTheme = this.checked;
      saveState();
      initTelegram(); // re-init reading telegram parameters
    });
  }

  // Export JSON
  const exportBtn = document.getElementById('export-data-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', function() {
      triggerHaptic('light');
      const backup = {
        blocks: appBlocks,
        items: appItems,
        note: noteText,
        accent: selectedAccent,
        syncTgTheme: syncTgTheme,
        isDarkTheme: isDarkTheme
      };
      const json = JSON.stringify(backup, null, 2);
      
      // Save file
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tgb_app_backup_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showToast('Экспортировано успешно!');
    });
  }

  // Import JSON
  const importBtn = document.getElementById('import-data-btn');
  if (importBtn) {
    importBtn.addEventListener('click', function() {
      triggerHaptic('light');
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(evt) {
          try {
            const data = JSON.parse(evt.target.result);
            if (data.blocks && data.items) {
              appBlocks = data.blocks;
              appItems = data.items;
              if (data.note !== undefined) noteText = data.note;
              if (data.accent !== undefined) selectedAccent = data.accent;
              if (data.syncTgTheme !== undefined) syncTgTheme = data.syncTgTheme;
              if (data.isDarkTheme !== undefined) isDarkTheme = data.isDarkTheme;

              saveState();
              applyThemeSettings();
              renderAccordionsList();
              initNotebook();
              
              showToast('Импорт завершен успешно!');
              triggerHaptic('success');
            } else {
              showToast('Неверный формат файла!');
              triggerHaptic('warning');
            }
          } catch (err) {
            showToast('Ошибка чтения файла!');
            triggerHaptic('warning');
          }
        };
        reader.readAsText(file);
      };
      input.click();
    });
  }

  // Reset Data
  const resetBtn = document.getElementById('reset-data-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      triggerHaptic('warning');
      openConfirmDialog(
        'Сбросить все данные', 
        'Все внесенные изменения будут удалены. Данные вернутся к исходным настройкам по умолчанию.', 
        () => {
          localStorage.clear();
          loadState();
          applyThemeSettings();
          renderAccordionsList();
          initNotebook();
          updateLikesOnCards();
          showToast('Данные сброшены!');
          triggerHaptic('success');
        }
      );
    });
  }

  // Dynamic Accordion block creation trigger
  const createBlockBtn = document.getElementById('create-new-block-btn');
  if (createBlockBtn) {
    createBlockBtn.addEventListener('click', openAddBlockModal);
  }
  
  const addBlockBtnHeader = document.getElementById('add-block-btn');
  if (addBlockBtnHeader) {
    addBlockBtnHeader.addEventListener('click', openAddBlockModal);
  }
}

// 14. HTML escaping helper (prevent XSS security issues)
function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 15. Form Dialog Save Bindings
function initDialogFormBindings() {
  // Save Add Item
  const saveAddBtn = document.getElementById('save-add-item-btn');
  if (saveAddBtn) {
    saveAddBtn.addEventListener('click', saveAddItem);
  }

  // Save Edit Item
  const saveEditBtn = document.getElementById('save-edit-item-btn');
  if (saveEditBtn) {
    saveEditBtn.addEventListener('click', saveEditItem);
  }

  // Save Create/Edit Block
  const saveBlockBtn = document.getElementById('save-block-btn');
  if (saveBlockBtn) {
    saveBlockBtn.addEventListener('click', saveBlock);
  }
}

// 16. Initialize Application
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  initTelegram();
  initTabs();
  renderAccordionsList();
  initAccordionHandlers();
  initSearchHandlers();
  initNotebook();
  initSettingsHandlers();
  initConfirmHandlers();
  initDialogFormBindings();
  updateLikesOnCards();
});
