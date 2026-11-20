/**
 * DDC Game - Pengendali Logik Permainan (HTML5 & Vanilla JavaScript)
 * Menyokong Drag-and-Drop, Touch/Pointer, dan Tap-to-Swap
 * Sistem Pengkelasan Perpuluhan Dewey (Dewey Decimal Classification)
 * Hak Cipta (c) 2026 Perpustakaan Tun Abdul Razak, Universiti Teknologi MARA
 */

class DDCGameApp {
  constructor() {
    this.levels = JSON.parse(JSON.stringify(DDC_LEVELS));
    this.state = {};
    this.selectedBook = null; // Untuk mod klik/ketik tukar kedudukan
    this.draggedBook = null;

    this.initLevelsState();
    this.bindEvents();
    this.render();
  }

  initLevelsState() {
    this.levels.forEach(lvl => {
      // Susun buku mengikut slot awal (initialSlot)
      const initialBooks = [...lvl.books].sort((a, b) => a.initialSlot - b.initialSlot);
      this.state[lvl.id] = {
        books: initialBooks,
        isSolved: false,
        statusText: null, // 'correct' | 'wrong' | null
        showHint: false
      };
    });
  }

  bindEvents() {
    // Butang Kawalan Bunyi
    document.getElementById('btn-mute')?.addEventListener('click', (e) => {
      const isMuted = sounds.toggleMute();
      e.currentTarget.textContent = isMuted ? '🔇 Bunyi: Mati' : '🔊 Bunyi: Hidup';
    });

    // Butang Reset Semua
    document.getElementById('btn-reset-all')?.addEventListener('click', () => {
      if (confirm('Adakah anda pasti mahu menyusun semula kesemua 10 tahap?')) {
        this.initLevelsState();
        this.render();
      }
    });

    // Tutup Modal Tahniah
    document.getElementById('btn-close-modal')?.addEventListener('click', () => {
      document.getElementById('victory-modal')?.classList.remove('show');
      if (window.confetti) {
        window.confetti.stop();
      }
    });
  }

  // Semak Susunan Buku untuk Sesuatu Tahap
  checkOrder(levelId) {
    const lvlState = this.state[levelId];
    if (!lvlState) return;

    // Periksa sama ada kedudukan buku di slot 1..5 padan dengan targetSlot 1..5
    let isCorrect = true;
    for (let slotIndex = 0; slotIndex < lvlState.books.length; slotIndex++) {
      const expectedSlot = slotIndex + 1;
      if (lvlState.books[slotIndex].targetSlot !== expectedSlot) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      lvlState.isSolved = true;
      lvlState.statusText = 'correct';
      sounds.playCorrect();
    } else {
      lvlState.isSolved = false;
      lvlState.statusText = 'wrong';
      sounds.playWrong();
    }

    this.updateStats();
    this.renderLevelCard(levelId);

    // Semak jika semua 10 tahap telah berjaya diselesaikan
    this.checkVictoryCondition();
  }

  // Susun Semula (Reset) Satu Tahap Sahaja
  resetLevel(levelId) {
    const originalLvl = this.levels.find(l => l.id === levelId);
    if (!originalLvl) return;

    const initialBooks = [...originalLvl.books].sort((a, b) => a.initialSlot - b.initialSlot);
    this.state[levelId] = {
      books: initialBooks,
      isSolved: false,
      statusText: null,
      showHint: false
    };

    this.updateStats();
    this.renderLevelCard(levelId);
  }

  // Buka/Tutup Paparan Petua (Hint)
  toggleHint(levelId) {
    const lvlState = this.state[levelId];
    if (lvlState) {
      lvlState.showHint = !lvlState.showHint;
      this.renderLevelCard(levelId);
    }
  }

  // Pengendali Klik/Ketik Buku (Untuk Kemudahan Akses & Skrin Sentuh)
  handleBookClick(levelId, bookIndex) {
    const lvlState = this.state[levelId];
    if (!lvlState) return;

    // Jika tiada buku dipilih sebelum ini, atau klik pada tahap berbeza
    if (!this.selectedBook || this.selectedBook.levelId !== levelId) {
      this.selectedBook = { levelId, bookIndex };
      sounds.playPickup();
      this.highlightSelectedBook();
      return;
    }

    // Jika klik buku yang sama, batalkan pilihan
    if (this.selectedBook.bookIndex === bookIndex) {
      this.selectedBook = null;
      this.highlightSelectedBook();
      return;
    }

    // Tukar kedudukan dua buku yang dipilih (Swap)
    this.swapBooks(levelId, this.selectedBook.bookIndex, bookIndex);
    this.selectedBook = null;
    this.highlightSelectedBook();
  }

  // Tukar Kedudukan Buku Antara Dua Slot
  swapBooks(levelId, fromIndex, toIndex) {
    const lvlState = this.state[levelId];
    if (!lvlState) return;

    const books = lvlState.books;
    const temp = books[fromIndex];
    books[fromIndex] = books[toIndex];
    books[toIndex] = temp;

    sounds.playPlace();

    // Reset status jawapan apabila susunan berubah
    lvlState.statusText = null;
    lvlState.isSolved = false;

    this.updateStats();
    this.renderLevelCard(levelId);
  }

  // Sorot (Highlight) Buku yang Sedang Dipilih
  highlightSelectedBook() {
    document.querySelectorAll('.book').forEach(b => b.classList.remove('selected'));
    if (this.selectedBook) {
      const card = document.querySelector(`.level-card[data-level-id="${this.selectedBook.levelId}"]`);
      if (card) {
        const bookElem = card.querySelectorAll('.book')[this.selectedBook.bookIndex];
        if (bookElem) {
          bookElem.classList.add('selected');
        }
      }
    }
  }

  // Semak Syarat Kemenangan Penuh (Semua 10 Tahap Selesai)
  checkVictoryCondition() {
    const allSolved = this.levels.every(lvl => this.state[lvl.id] && this.state[lvl.id].isSolved);
    if (allSolved) {
      setTimeout(() => {
        sounds.playVictory();
        if (window.confetti) {
          window.confetti.start(6000);
        }
        document.getElementById('victory-modal')?.classList.add('show');
      }, 350);
    }
  }

  // Kemas Kini Kaunter & Bar Kemajuan
  updateStats() {
    const total = this.levels.length;
    const solvedCount = this.levels.filter(lvl => this.state[lvl.id] && this.state[lvl.id].isSolved).length;
    const progressPercent = Math.round((solvedCount / total) * 100);

    // Header counter
    const statElem = document.getElementById('stat-solved-count');
    if (statElem) {
      statElem.textContent = `${solvedCount} / ${total} Selesai (${progressPercent}%)`;
      if (solvedCount === total) {
        statElem.classList.add('success-badge');
      } else {
        statElem.classList.remove('success-badge');
      }
    }

    // Sticky progress bar badge
    const stickyBadge = document.getElementById('sticky-solved-badge');
    if (stickyBadge) {
      stickyBadge.textContent = `${solvedCount} / ${total} Selesai (${progressPercent}%)`;
      if (solvedCount === total) {
        stickyBadge.classList.add('success-badge');
      } else {
        stickyBadge.classList.remove('success-badge');
      }
    }

    // Progress bar fill
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
      progressFill.style.width = `${progressPercent}%`;
    }

    // Sticky stage pills
    const pillsContainer = document.getElementById('sticky-stage-pills');
    if (pillsContainer) {
      pillsContainer.innerHTML = this.levels.map(lvl => {
        const isSolved = this.state[lvl.id] && this.state[lvl.id].isSolved;
        return `
          <button class="stage-pill ${isSolved ? 'solved' : ''}" 
                  title="Tahap ${lvl.id}: ${isSolved ? 'Selesai' : 'Belum selesai'} (Klik untuk lompat)" 
                  onclick="game.scrollToLevel(${lvl.id})">
            <span>${lvl.id}</span>
            ${isSolved ? '<span style="font-size: 11px;">✓</span>' : ''}
          </button>
        `;
      }).join('');
    }
  }

  // Lompat tatal (smooth scroll) ke kad tahap tertentu
  scrollToLevel(levelId) {
    const card = document.querySelector(`.level-card[data-level-id="${levelId}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.transition = 'box-shadow 0.3s ease';
      card.style.boxShadow = '0 0 0 4px #3b82f6, 0 10px 30px rgba(59, 130, 246, 0.3)';
      setTimeout(() => {
        card.style.boxShadow = '';
      }, 1200);
    }
  }

  // Rendering Keseluruhan (Memaparkan kesemua 10 tahap)
  render() {
    this.updateStats();

    const mainContainer = document.getElementById('game-levels-container');
    if (!mainContainer) return;

    mainContainer.innerHTML = this.levels.map(lvl => this.getLevelCardHTML(lvl)).join('');
    this.levels.forEach(lvl => this.attachDragDropEvents(lvl.id));
  }

  // Kemas kini paparan satu kad tahap tanpa memuat semula seluruh halaman
  renderLevelCard(levelId) {
    const cardElem = document.querySelector(`.level-card[data-level-id="${levelId}"]`);
    if (!cardElem) return;

    const lvl = this.levels.find(l => l.id === levelId);
    if (!lvl) return;

    // Gantikan kandungan kad dengan HTML baharu
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.getLevelCardHTML(lvl);
    const newCard = tempDiv.firstElementChild;

    cardElem.replaceWith(newCard);
    this.attachDragDropEvents(levelId);
    this.highlightSelectedBook();
  }

  // Jana HTML untuk satu Kad Tahap
  getLevelCardHTML(level) {
    const lvlState = this.state[level.id];
    const isSolved = lvlState.isSolved;
    const status = lvlState.statusText;

    const booksHTML = lvlState.books.map((book, idx) => {
      const callLinesHTML = (book.lines && book.lines.length ? book.lines : [book.callNumber])
        .map(line => `<span class="call-line">${line}</span>`)
        .join('');

      return `
        <div class="slot" data-slot-index="${idx}" data-slot-num="${idx + 1}">
          <div class="book" 
               draggable="true" 
               data-book-index="${idx}" 
               data-book-id="${book.id}"
               data-level-id="${level.id}"
               style="background: ${book.color.bg}; border: 2px solid ${book.color.border};"
               onclick="game.handleBookClick(${level.id}, ${idx})">
            
            <div class="book-rib"></div>

            <div class="call-number-label">
              ${callLinesHTML}
            </div>

            <div class="book-rib bottom"></div>
          </div>
        </div>
      `;
    }).join('');

    let feedbackHTML = '';
    if (status === 'correct') {
      feedbackHTML = `
        <div class="feedback-box show correct">
          <span>✓ CORRECT! TAHNIAH, SUSUNAN BUKU ADALAH TEPAT!</span>
          <span style="font-size: 13px; font-weight: normal;">Piawaian DDC Dipatuhi</span>
        </div>
      `;
    } else if (status === 'wrong') {
      feedbackHTML = `
        <div class="feedback-box show wrong">
          <span>✗ WRONG - SILA CUBA LAGI!</span>
          <span style="font-size: 13px; font-weight: normal;">Periksa nombor kelas, nilai perpuluhan, atau turutan abjad pengarang</span>
        </div>
      `;
    }

    return `
      <div class="level-card ${isSolved ? 'is-solved' : ''}" data-level-id="${level.id}">
        <div class="level-header">
          <div class="level-title-wrap">
            <span class="level-number-tag">${level.id}</span>
            <h2 class="level-title">${level.title}</h2>
          </div>
          <div class="stats-badges">
            ${isSolved ? '<span class="badge success-badge">✓ Selesai</span>' : '<span class="badge">Belum Selesai</span>'}
          </div>
        </div>

        <div class="level-body">
          <div class="shelf-container">
            <div class="shelf-slots">
              ${booksHTML}
            </div>
            <div class="shelf-plank"></div>
          </div>

          <div class="level-controls">
            <div class="btn-group">
              <button class="btn btn-danger" onclick="game.resetLevel(${level.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
                RESET
              </button>
              <button class="btn btn-outline" onclick="game.toggleHint(${level.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 18h6"/>
                  <path d="M10 22h4"/>
                  <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"/>
                </svg>
                HINT
              </button>
            </div>

            <div class="btn-group">
              <button class="btn btn-primary" onclick="game.checkOrder(${level.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                CHECK ORDER
              </button>
            </div>
          </div>

          ${feedbackHTML}

          <div class="hint-box ${lvlState.showHint ? 'show' : ''}">
            <strong>Petua / Hint:</strong> ${level.hint}
          </div>
        </div>
      </div>
    `;
  }

  // Pasang Acara Drag and Drop HTML5
  attachDragDropEvents(levelId) {
    const card = document.querySelector(`.level-card[data-level-id="${levelId}"]`);
    if (!card) return;

    const books = card.querySelectorAll('.book');
    const slots = card.querySelectorAll('.slot');

    books.forEach(book => {
      book.addEventListener('dragstart', (e) => {
        sounds.playPickup();
        const levelId = parseInt(book.getAttribute('data-level-id'));
        const bookIndex = parseInt(book.getAttribute('data-book-index'));

        this.draggedBook = {
          levelId: levelId,
          bookIndex: bookIndex
        };

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', book.getAttribute('data-book-index'));

        // Cipta klon imej seretan yang 100% padu, jelas, dan berbayang tajam
        try {
          const rect = book.getBoundingClientRect();
          const dragClone = book.cloneNode(true);
          dragClone.classList.add('drag-clone-preview');
          dragClone.style.position = 'fixed';
          dragClone.style.top = '-9999px';
          dragClone.style.left = '-9999px';
          dragClone.style.width = `${book.offsetWidth}px`;
          dragClone.style.height = `${book.offsetHeight}px`;
          dragClone.style.opacity = '1';
          dragClone.style.transform = 'none';
          dragClone.style.boxShadow = '0 14px 28px rgba(0, 0, 0, 0.65)';
          dragClone.style.zIndex = '99999';
          document.body.appendChild(dragClone);

          const offsetX = e.clientX - rect.left;
          const offsetY = e.clientY - rect.top;
          e.dataTransfer.setDragImage(dragClone, offsetX, offsetY);

          setTimeout(() => {
            if (dragClone && dragClone.parentNode) {
              dragClone.parentNode.removeChild(dragClone);
            }
          }, 0);
        } catch (err) {
          // Fallback pelayar jika setDragImage tidak disokong
        }

        // Tangguhkan penambahan kelas .dragging agar tangkapan pelayar kekal 100% legap
        setTimeout(() => {
          book.classList.add('dragging');
        }, 10);
      });

      book.addEventListener('dragend', () => {
        book.classList.remove('dragging');
        slots.forEach(s => s.classList.remove('drag-over'));
        this.draggedBook = null;
      });
    });

    slots.forEach(slot => {
      slot.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        slot.classList.add('drag-over');
      });

      slot.addEventListener('dragleave', () => {
        slot.classList.remove('drag-over');
      });

      slot.addEventListener('drop', (e) => {
        e.preventDefault();
        slot.classList.remove('drag-over');
        const targetIndex = parseInt(slot.getAttribute('data-slot-index'));

        if (this.draggedBook && this.draggedBook.levelId === levelId) {
          this.swapBooks(levelId, this.draggedBook.bookIndex, targetIndex);
        }
      });
    });
  }
}

// Mulakan aplikasi apabila DOM sedia
document.addEventListener('DOMContentLoaded', () => {
  window.game = new DDCGameApp();
});
