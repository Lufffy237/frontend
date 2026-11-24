const fs = require('fs');
const path = require('path');

// 🎯 CIBLES : Uniquement les dossiers 'app' et 'components'
const targetDirs = ['./app', './components'];

// Dictionnaire précis des caractères corrompus -> caractères français corrects
const replacements = [
  ['Ã©', 'é'], ['Ã¨', 'è'], ['Ã ', 'à'], ['Ã¹', 'ù'], ['Ã§', 'ç'],
  ['Ãª', 'ê'], ['Ã®', 'î'], ['Ã´', 'ô'], ['Ã»', 'û'], ['Ã«', 'ë'],
  ['Ã¯', 'ï'], ['Ã¼', 'ü'], ['Ã‰', 'É'], ['Ã€', 'À'], ['Ã‚', 'Â'],
  ['ÃŠ', 'Ê'], ['ÃŽ', 'Î'], ['Ã”', 'Ô'], ['Ã›', 'Û'], ['Ã™', 'Ù'],
  ['Ãœ', 'Ü'], ['â€™', "'"], ['â€œ', '"'], ['â€', '"'], ['â€"', '—'],
  ['ðŸ”§', '🔧'], ['ðŸš€', '🚀'], ['ðŸŽ¯', '🎯'], ['ðŸ› ', '🛠️']
];

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Ignorer les dossiers système
      if (file === 'node_modules' || file === '.next' || file === '.git') return;
      processDirectory(fullPath);
    } else if (file.match(/\.(tsx|ts|jsx|js)$/)) {
      try {
        // Lire le fichier tel qu'il est actuellement
        let content = fs.readFileSync(fullPath, 'utf8');
        let originalContent = content;
        let hasChanged = false;

        // Appliquer les corrections
        replacements.forEach(([bad, good]) => {
          if (content.includes(bad)) {
            content = content.split(bad).join(good);
            hasChanged = true;
          }
        });

        // Si des changements ont été faits, on sauvegarde proprement en UTF-8
        if (hasChanged) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`✅ Réparé : ${fullPath}`);
        }
      } catch (error) {
        console.error(`❌ Erreur sur ${fullPath} :`, error.message);
\n      }
    }
  });
}

console.log('🔍 Démarrage de la réparation ciblée sur /app et /components...\n');

targetDirs.forEach(dir => {
  console.log(`📂 Traitement du dossier : ${dir}`);
  processDirectory(dir);
});

console.log('\n🎉 RÉPARATION TERMINÉE !');
console.log('Vérifie un fichier (ex: AwardsSection.tsx) pour confirmer que les accents sont bons.');