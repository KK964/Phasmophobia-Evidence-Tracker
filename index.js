var shy = true;
var showTips = false;

var evidenceTypes = {
  box: 'Spirit Box',
  fingers: 'Fingerprints',
  writing: 'Ghost Writing',
  freezing: 'Freezing Temperatures',
  orb: 'Ghost Orbs',
  emf: 'EMF Level 5',
  types: ['box', 'fingers', 'writing', 'freezing', 'orb', 'emf'],
};

const ghosts = {
  spirit: {
    evidence: ['box', 'fingers', 'writing'],
    strengths: 'Nothing',
    weaknesses: 'Smudge Sticks',
  },
  wraith: {
    evidence: ['fingers', 'freezing', 'box'],
    strengths: 'Leaves no footprints (salt)',
    weaknesses: 'Salt',
  },
  phantom: {
    evidence: ['emf', 'orb', 'freezing'],
    strengths: 'Looking drops sanity',
    weaknesses: 'Taking photo makes it disappear temporarily',
    other: 'When viewing ghost, it will flash in and out of view in 1s+ intervals',
  },
  poltergeist: {
    evidence: ['box', 'fingers', 'orb'],
    strengths: 'Can throw lots of objects at once',
    weaknesses: 'Ineffective in an empty room',
  },
  banshee: {
    evidence: ['emf', 'fingers', 'freezing'],
    strengths: 'Targets one person at a time',
    weaknesses: 'Less effective near a crucifix',
    other:
      'If you can find who its targeting, make that person hide while the rest of the team gathers evidence',
  },
  jinn: {
    evidence: ['box', 'orb', 'emf'],
    strengths: 'Travels faster if current victim is far away',
    weaknesses: 'Turning off breaker will disable its ability',
  },
  mare: {
    evidence: ['box', 'orb', 'freezing'],
    strengths: 'Increased chance of attacking in the dark',
    weaknesses: 'Turning on lights lowers attack chance',
  },
  revenant: {
    evidence: ['emf', 'fingers', 'writing'],
    strengths: 'Travels faster when hunting a victim',
    weaknesses: 'Hiding will cause it to move slowly',
  },
  shade: {
    evidence: ['emf', 'orb', 'writing'],
    strengths: 'Shy, and harder to find',
    weaknesses: 'Will not enter hunt mode if multiple people are near',
  },
  demon: {
    evidence: ['box', 'writing', 'freezing'],
    strengths: 'Will attack more than other ghost types',
    weaknesses: 'Asking successful questions on Ouija Board wont lower users sanity',
  },
  yurei: {
    evidence: ['orb', 'writing', 'freezing'],
    strengths: 'Stronger effect on sanity',
    weaknesses: 'Smudging the room causes it to not wonder room for long',
  },
  oni: {
    evidence: ['emf', 'box', 'writing'],
    strengths: 'Can move objects at great speed and are more active when people are near',
    weaknesses: 'Being more active makes it easier to find and identify',
  },
};

function changeShyness() {
  shy = !shy;
  document.getElementById('ghost_shy').value = shy
    ? 'Shy Ghost (alone)'
    : 'Extrovert Ghost (everyone)';
}

function addGhostTypes() {
  var ghostTypeContainer = document.getElementById('ghost_types');
  for (var ghost of Object.keys(ghosts)) {
    var ghostDetails = ghosts[ghost];

    var ghostElement = document.createElement('div');
    ghostElement.classList.add('ghost');
    ghostElement.id = ghost;

    var ghostNameElement = document.createElement('div');
    ghostNameElement.classList.add('ghost-name');
    ghostNameElement.innerHTML = capitalizeFirstLetter(ghost);
    ghostElement.appendChild(ghostNameElement);

    for (var details of Object.keys(ghostDetails)) {
      var detailValue = ghostDetails[details];
      if (Array.isArray(detailValue)) {
        detailValue = detailValue.map((value) => (value = evidenceTypes[value]));
        detailValue = detailValue.join(', ');
      }
      var detailElement = document.createElement('div');
      detailElement.classList.add('ghost-detail');
      detailElement.classList.add(details);
      detailElement.innerHTML = capitalizeFirstLetter(details) + ': ' + detailValue;
      ghostElement.appendChild(detailElement);
    }

    ghostTypeContainer.appendChild(ghostElement);
  }
}

function hideOther() {
  var others = document.getElementsByClassName('other');
  for (var other of others) {
    other.classList.add('hidden');
  }
}

function showOther() {
  var others = document.getElementsByClassName('other');
  for (var other of others) {
    other.classList.remove('hidden');
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

(() => {
  addGhostTypes();
  hideOther();
  document.getElementById('ghost_tips').addEventListener('click', () => {
    showTips = !showTips;
    if (showTips) showOther();
    else hideOther();
  });
})();
