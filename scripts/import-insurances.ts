import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Firebase configuration - usar las mismas credenciales que la app
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ID del usuario profesional - CAMBIAR POR TU USER ID
const USER_ID = 'TU_USER_ID_AQUI';

async function importInsurances() {
  try {
    // Leer el archivo CSV
    const csvPath = path.join(process.cwd(), 'scripts', 'obras-sociales.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');

    // Parsear CSV
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');

    console.log('Iniciando importación de obras sociales...');
    let imported = 0;
    let errors = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Parsear la línea teniendo en cuenta las comillas
      const values: string[] = [];
      let currentValue = '';
      let insideQuotes = false;

      for (let j = 0; j < line.length; j++) {
        const char = line[j];

        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim());

      const [code, acronym, contact, name] = values;

      if (!name) {
        console.log(`Línea ${i + 1}: Nombre vacío, saltando...`);
        continue;
      }

      try {
        const insuranceData = {
          code: code || '',
          acronym: acronym || '',
          name: name,
          type: 'obra-social' as const,
          phone: contact && !contact.includes('@') && !contact.includes('www') ? contact : '',
          email: contact && contact.includes('@') ? contact : '',
          website: contact && contact.includes('www') ? contact : '',
          notes: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: USER_ID,
        };

        await addDoc(collection(db, 'insurances'), insuranceData);
        imported++;

        if (imported % 10 === 0) {
          console.log(`Importadas ${imported} obras sociales...`);
        }
      } catch (error) {
        console.error(`Error en línea ${i + 1}:`, error);
        errors++;
      }
    }

    console.log('\n=== Importación completada ===');
    console.log(`✅ Obras sociales importadas: ${imported}`);
    console.log(`❌ Errores: ${errors}`);

  } catch (error) {
    console.error('Error al importar obras sociales:', error);
  }
}

importInsurances();
