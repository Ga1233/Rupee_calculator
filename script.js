const DENOMS = [
  { value: 500, label: '₹500', name: '500 Rupees', type: 'note' },
  { value: 200, label: '₹200', name: '200 Rupees', type: 'note' },
  { value: 100, label: '₹100', name: '100 Rupees', type: 'note' },
  { value: 50,  label: '₹50',  name: '50 Rupees',  type: 'note' },
  { value: 20,  label: '₹20',  name: '20 Rupees',  type: 'both' },
  { value: 10,  label: '₹10',  name: '10 Rupees',  type: 'both' },
  { value: 5,   label: '₹5',   name: '5 Rupees',   type: 'coin' },
  { value: 2,   label: '₹2',   name: '2 Rupees',   type: 'coin' },
  { value: 1,   label: '₹1',   name: '1 Rupee',    type: 'coin' },
];

function calculate() {
  const input = document.getElementById('amountInput');
  const errorMsg = document.getElementById('errorMsg');
  const resultsSection = document.getElementById('resultsSection');
  const denomGrid = document.getElementById('denomGrid');
  const noResult = document.getElementById('noResult');
  const totalBadge = document.getElementById('totalBadge');

  let amount = parseInt(input.value, 10);

  // Validate
  errorMsg.classList.remove('show');
  if (!input.value || isNaN(amount) || amount <= 0 || !Number.isInteger(Number(input.value))) {
    errorMsg.classList.add('show');
    resultsSection.classList.remove('show');
    return;
  }

  const original = amount;
  const results = [];
  let maxCount = 1;

  for (const denom of DENOMS) {
    if (amount >= denom.value) {
      const count = Math.floor(amount / denom.value);
      amount = amount % denom.value;
      results.push({ ...denom, count });
      if (count > maxCount) maxCount = count;
    }
  }

  // Render
  denomGrid.innerHTML = '';
  noResult.classList.remove('show');

  if (results.length === 0) {
    noResult.classList.add('show');
  } else {
    results.forEach((r, i) => {
      const isNote = r.type === 'note';
      const isBoth = r.type === 'both';
      const isCoin = r.type === 'coin';
      const chipClass = (isNote || isBoth) ? 'note-chip' : 'coin-chip';
      const barClass  = (isNote || isBoth) ? 'note' : 'coin';
      const typeLabel = isNote ? 'Note' : isCoin ? 'Coin' : 'Note / Coin';
      const barWidth  = Math.round((r.count / maxCount) * 100);

      const row = document.createElement('div');
      row.className = 'denom-row';
      row.style.animationDelay = `${i * 55}ms`;
      row.innerHTML = `
        <div class="denom-left">
          <div class="denom-chip ${chipClass}">${r.label}</div>
          <div>
            <div class="denom-name">${r.name}</div>
            <div class="denom-type">${typeLabel}</div>
          </div>
        </div>
        <div class="denom-right">
          <div class="denom-bar-wrap">
            <div class="denom-bar ${barClass}" style="width:0%" data-width="${barWidth}%"></div>
          </div>
          <div class="denom-count">×${r.count}</div>
        </div>
      `;
      denomGrid.appendChild(row);
    });

    // Animate bars after paint
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.querySelectorAll('.denom-bar').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
      }, 80);
    });
  }

  totalBadge.textContent = '₹' + original.toLocaleString('en-IN');
  resultsSection.classList.add('show');
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function reset() {
  document.getElementById('amountInput').value = '';
  document.getElementById('resultsSection').classList.remove('show');
  document.getElementById('errorMsg').classList.remove('show');
  document.getElementById('amountInput').focus();
}

// Allow Enter key
document.getElementById('amountInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') calculate();
});
