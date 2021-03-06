var shy = true;
var showTips = false;

var evidenceSelections = {};

var evidenceTypes = {
  box: 'Spirit Box',
  fingers: 'Fingerprints',
  writing: 'Ghost Writing',
  freezing: 'Freezing Temperatures',
  orb: 'Ghost Orbs',
  emf: 'EMF Level 5',
  dots: 'DOTS Projector',
  types: ['dots', 'emf', 'fingers', 'freezing', 'orb', 'writing', 'box'],
};

addEvidenceSelection();

const ghosts = {
  banshee: {
    evidence: ['dots', 'fingers', 'orb'],
    strengths: 'Targets one person at a time',
    weaknesses: 'Less effective near a crucifix',
    other:
      'If you can find who its targeting, make that person hide while the rest of the team gathers evidence',
  },
  demon: {
    evidence: ['fingers', 'freezing', 'writing'],
    strengths: 'Will attack more than other ghost types',
    weaknesses: 'Asking successful questions on Ouija Board wont lower users sanity',
  },
  goryo: {
    evidence: ['dots', 'emf', 'fingers'],
    strengths: 'Only show itself on camera if no people are nearby',
    weaknesses: 'Rarely seen far from their place of death',
  },
  hantu: {
    evidence: ['fingers', 'freezing', 'orb'],
    strengths: 'Faster in cold areas',
    weaknesses: 'Slow in warmer areas',
  },
  jinn: {
    evidence: ['emf', 'fingers', 'freezing'],
    strengths: 'Travels faster if current victim is far away',
    weaknesses: 'Turning off breaker will disable its ability',
  },
  mare: {
    evidence: ['orb', 'writing', 'box'],
    strengths: 'Increased chance of attacking in the dark',
    weaknesses: 'Turning on lights lowers attack chance',
  },
  myling: {
    evidence: ['emf', 'fingers', 'writing'],
    strengths: 'Known to be quieter when hunting',
    weaknesses: 'Frequently make paranormal sounds',
  },
  oni: {
    evidence: ['dots', 'emf', 'freezing'],
    strengths: 'Can move objects at great speed and are more active when people are near',
    weaknesses: 'Being more active makes it easier to find and identify',
  },
  phantom: {
    evidence: ['dots', 'fingers', 'box'],
    strengths: 'Looking drops sanity',
    weaknesses: 'Taking photo makes it disappear temporarily',
    other: 'When viewing ghost, it will flash in and out of view in 1s+ intervals',
  },
  poltergeist: {
    evidence: ['fingers', 'writing', 'box'],
    strengths: 'Can throw lots of objects at once',
    weaknesses: 'Ineffective in an empty room',
  },
  revenant: {
    evidence: ['freezing', 'orb', 'writing'],
    strengths: 'Travels faster when hunting a victim',
    weaknesses: 'Hiding will cause it to move slowly',
  },
  shade: {
    evidence: ['emf', 'freezing', 'writing'],
    strengths: 'Shy, and harder to find',
    weaknesses: 'Will not enter hunt mode if multiple people are near',
  },
  spirit: {
    evidence: ['emf', 'writing', 'box'],
    strengths: 'Nothing',
    weaknesses: 'Smudge Sticks',
    other: 'Footstep sound timer is 2-15s where as other ghosts have a timer of 15-45s',
  },
  wraith: {
    evidence: ['dots', 'emf', 'box'],
    strengths: 'Leaves no footprints (salt)',
    weaknesses: 'Salt',
  },
  yurei: {
    evidence: ['dots', 'freezing', 'orb'],
    strengths: 'Stronger effect on sanity',
    weaknesses: 'Smudging the room causes it to not wonder room for long',
  },
  yokai: {
    evidence: ['dots', 'orb', 'box'],
    strengths: 'Talking near it will anger it',
    weaknesses: 'While hunting, it can only hear voices close to it',
  },
};

function addEvidenceSelection() {
  for (var i of evidenceTypes.types) {
    evidenceSelections[i] = 0;
  }
}

function changeShyness() {
  shy = !shy;
  updateEvidence();
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
      var detailElement = document.createElement('div');
      detailElement.classList.add('ghost-detail');
      detailElement.classList.add(details);
      if (Array.isArray(detailValue)) {
        detailElement.innerHTML = 'Evidence: ';
        for (var v of detailValue) {
          var evidenceElement = document.createElement('div');
          evidenceElement.classList.add('evidence_type');
          evidenceElement.classList.add(v);
          evidenceElement.innerHTML = evidenceTypes[v];
          detailElement.appendChild(evidenceElement);
        }
      } else detailElement.innerHTML = capitalizeFirstLetter(details) + ': ' + detailValue;
      ghostElement.appendChild(detailElement);
    }
    ghostTypeContainer.appendChild(ghostElement);
  }
}

function addEvidenceTypes() {
  var evidenceTypeContainer = document.getElementsByClassName('select-evidence')[0];
  for (var evidence of Object.keys(evidenceSelections)) {
    var evidenceElement = document.createElement('div');

    var evidenceNameElement = document.createElement('input');
    evidenceNameElement.type = 'button';
    evidenceNameElement.id = `evidence_${evidence}`;
    evidenceNameElement.value = capitalizeFirstLetter(evidenceTypes[evidence]);
    var disableEvidenceElement = document.createElement('input');
    disableEvidenceElement.type = 'button';
    disableEvidenceElement.id = `evidence_${evidence}_disable`;
    disableEvidenceElement.value = 'X';
    evidenceElement.appendChild(evidenceNameElement);
    evidenceElement.appendChild(disableEvidenceElement);
    evidenceTypeContainer.appendChild(evidenceElement);
    evidenceClickListeners(evidenceNameElement, disableEvidenceElement, evidence);
  }
}

function evidenceClickListeners(selectedButton, disabledButton, evidence) {
  selectedButton.addEventListener('click', () => {
    if (evidenceSelections[evidence] === 0) evidenceSelections[evidence] = 1;
    else evidenceSelections[evidence] = 0;
    updateEvidence();
  });

  disabledButton.addEventListener('click', (e) => {
    if (evidenceSelections[evidence] === -1) evidenceSelections[evidence] = 0;
    else evidenceSelections[evidence] = -1;
    updateEvidence();
  });
}

function updateEvidence() {
  document.getElementById('ghost_shy').value = shy
    ? 'Shy Ghost (alone)'
    : 'Extrovert Ghost (everyone)';

  for (var evidence of Object.keys(evidenceSelections)) {
    var evidenceElement = document.getElementById(`evidence_${evidence}`);
    if (evidenceSelections[evidence] === 1) {
      evidenceElement.classList.add('selected');
      evidenceElement.classList.remove('disabled');
      for (var ghostEvidence of document.getElementsByClassName(evidence))
        ghostEvidence.classList.add('selected');
    } else if (evidenceSelections[evidence] === -1) {
      evidenceElement.classList.remove('selected');
      evidenceElement.classList.add('disabled');
      for (var ghostEvidence of document.getElementsByClassName(evidence))
        ghostEvidence.classList.remove('selected');
    } else {
      evidenceElement.classList.remove('selected');
      evidenceElement.classList.remove('disabled');
      for (var ghostEvidence of document.getElementsByClassName(evidence))
        ghostEvidence.classList.remove('selected');
    }
  }

  var enableRemovingGhosts = false;
  var enabledEvidence = [];
  var disabledEvidence = [];
  for (var i of Object.keys(evidenceSelections)) {
    if (evidenceSelections[i] !== 0) enableRemovingGhosts = true;
    if (evidenceSelections[i] === 1) enabledEvidence.push(i);
    if (evidenceSelections[i] === -1) disabledEvidence.push(i);
  }

  for (var ghost of document.getElementsByClassName('ghost')) {
    if (!enableRemovingGhosts) {
      ghost.classList.remove('disabled');
      continue;
    }
    var ghostType = ghosts[ghost.id];
    var disabled = false;
    for (var ev of ghostType.evidence) if (disabledEvidence.includes(ev)) disabled = true;
    if (disabled) {
      ghost.classList.add('disabled');
      continue;
    }
    var hasAllEnabled = true;
    for (var enEv of enabledEvidence) if (!ghostType.evidence.includes(enEv)) hasAllEnabled = false;
    if (disabled || !hasAllEnabled) {
      ghost.classList.add('disabled');
    } else {
      ghost.classList.remove('disabled');
    }
  }
  updatePossibleEvidence();
}

function updatePossibleEvidence() {
  var ghostList = Array.from(document.getElementsByClassName('ghost'));
  var evidenceList = document.getElementsByClassName('evidence-list')[0];
  var possibleEvidence = [];
  ghostList = ghostList.filter((ghost) => {
    return !ghost.classList.contains('disabled');
  });
  for (var ghost of ghostList) {
    var ghostType = ghosts[ghost.id];
    for (var ev of ghostType.evidence)
      if (!possibleEvidence.includes(ev) && evidenceSelections[ev] === 0) possibleEvidence.push(ev);
  }
  evidenceList.innerHTML = possibleEvidence
    .map((v) => {
      v = evidenceTypes[v];
      return v;
    })
    .join(', ');
}

function reset() {
  shy = true;
  for (var ev of Object.keys(evidenceSelections)) evidenceSelections[ev] = 0;
  updateEvidence();

  var ghostName = document.getElementById('ghost_name');
  ghostName.value = '';
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

function downloadAddAll() {
  downloadURI('/Phasmophobia_Add_Tool.ahk', 'Phasmophobia_Add_Tool.ahk');
}

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.setAttribute('download', name);
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

(() => {
  addEvidenceTypes();
  addGhostTypes();
  hideOther();
  document.getElementById('ghost_tips').addEventListener('click', () => {
    showTips = !showTips;
    if (showTips) showOther();
    else hideOther();
  });
  updatePossibleEvidence();
})();
