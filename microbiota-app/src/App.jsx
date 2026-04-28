import { useState, useEffect } from 'react';
import { 
  Baby, Stethoscope, User, Activity, ChevronRight, ChevronLeft, 
  Dna, Apple, ListTodo, Globe
} from 'lucide-react';

// 1. Recomendaciones personalizadas según el puntaje (Bilingüe)
const dietaryAdvice = {
  eubiosis: {
    color: "#16a34a",
    title: { es: "¡Estado Óptimo de Eubiosis!", en: "Optimal Eubiosis State!" },
    desc: {
      es: "Tu microbiota está equilibrada y diversa. Estás produciendo suficientes AGCC (Butirato) para proteger tu barrera intestinal y regular tu sistema inmune.",
      en: "Your microbiota is balanced and diverse. You are producing enough SCFAs (Butyrate) to protect your intestinal barrier and regulate your immune system."
    },
    tips: {
      es: ["Sigue consumiendo MACs (Fibra fermentable)", "Mantén la variedad de polifenoles (frutos rojos, té)", "¡Excelente trabajo con tu estilo de vida!"],
      en: ["Keep consuming MACs (Fermentable fiber)", "Maintain polyphenol variety (berries, tea)", "Excellent job with your lifestyle!"]
    }
  },
  riesgo: {
    color: "#ca8a04",
    title: { es: "Alerta de Desequilibrio", en: "Imbalance Alert" },
    desc: {
      es: "Tu diversidad bacteriana podría estar disminuyendo. Hay señales de que factores externos (estrés, dieta) están afectando tu barrera protectora.",
      en: "Your bacterial diversity might be decreasing. There are signs that external factors (stress, diet) are affecting your protective barrier."
    },
    tips: {
      es: ["Aumenta el consumo de prebióticos (ajo, cebolla, alcachofa)", "Reduce los edulcorantes artificiales", "Prioriza el sueño para regular el eje Intestino-Cerebro"],
      en: ["Increase prebiotic consumption (garlic, onion, artichoke)", "Reduce artificial sweeteners", "Prioritize sleep to regulate the Gut-Brain axis"]
    }
  },
  disbiosis: {
    color: "#dc2626",
    title: { es: "Signos de Disbiosis Detectados", en: "Signs of Dysbiosis Detected" },
    desc: {
      es: "Es probable que tu permeabilidad intestinal esté aumentada. Existe riesgo de endotoxemia metabólica e inflamación crónica de bajo grado.",
      en: "Your intestinal permeability is likely increased. There is a risk of metabolic endotoxemia and low-grade chronic inflammation."
    },
    tips: {
      es: ["Elimina ultraprocesados y harinas refinadas inmediatamente", "Considera probióticos específicos tras consultar al médico", "Aumenta drásticamente el consumo de hojas verdes y legumbres"],
      en: ["Eliminate ultra-processed foods and refined flours immediately", "Consider specific probiotics after consulting a doctor", "Drastically increase consumption of leafy greens and legumes"]
    }
  }
};

// 2. Etapas del Ciclo Vital (Bilingüe + Imágenes)
const stages = [
  { 
    title: { es: "Etapa Neonatal", en: "Neonatal Stage" }, 
    subtitle: { es: "Los Primeros 1000 Días", en: "The First 1000 Days" }, 
    desc: {
      es: "La ventana de oportunidad inmunológica más crítica. El intestino del feto es casi estéril; la colonización masiva ocurre al romper aguas y durante el parto, estableciendo la base del sistema inmune.",
      en: "The most critical immunological window of opportunity. The fetal gut is nearly sterile; massive colonization occurs when water breaks and during birth, establishing the immune system's foundation."
    },
    img: "./img/neonatal.png",
    color: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)", icon: Baby, 
    clinical: {
      es: "La microbiota neonatal es pionera. En partos vaginales predominan Lactobacillus y Prevotella. Los HMO (Oligosacáridos de la Leche Materna) alimentan a las Bifidobacterium infantis, que acidifican el medio para evitar patógenos.",
      en: "Neonatal microbiota is pioneering. Lactobacillus and Prevotella predominate in vaginal births. HMOs (Human Milk Oligosaccharides) feed Bifidobacterium infantis, which acidify the environment to prevent pathogens."
    },
    nursing: {
      es: "Priorizar el 'Cuidado Canguro' para transferencia de microbiota cutánea. Educación sobre lactancia materna exclusiva (mínimo 6 meses) y evitar el uso innecesario de fórmulas que alteran el pH intestinal.",
      en: "Prioritize 'Kangaroo Care' for skin microbiota transfer. Education on exclusive breastfeeding (minimum 6 months) and avoiding unnecessary formula use that alters intestinal pH."
    },
    pathology: {
      es: "La disbiosis por cesárea o antibióticos prematuros reduce la diversidad de Bacteroidetes. Esto se asocia con la 'Marcha Atópica': dermatitis, alergias alimentarias y asma infantil.",
      en: "Dysbiosis from C-sections or premature antibiotics reduces Bacteroidetes diversity. This is associated with the 'Atopic March': dermatitis, food allergies, and childhood asthma."
    },
    marker: "Dominancia / Dominance: Actinobacteria & Proteobacteria"
  },
  { 
    title: { es: "Infancia y Adolescencia", en: "Childhood & Adolescence" }, 
    subtitle: { es: "Maduración y Resiliencia", en: "Maturation & Resilience" }, 
    desc: {
      es: "La introducción de sólidos (Ablactación) dispara la diversidad. El ecosistema pasa de ser un sistema de degradación de lactosa a un reactor de fermentación de polisacáridos complejos.",
      en: "The introduction of solids (Weaning) skyrockets diversity. The ecosystem transitions from a lactose degradation system to a complex polysaccharide fermentation reactor."
    },
    img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800",
    color: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)", icon: Stethoscope, 
    clinical: {
      es: "A los 3 años, la microbiota ya se asemeja a la de un adulto. La exposición a antígenos ambientales (microbiota del suelo, mascotas) es vital para la educación de las células T-reguladoras.",
      en: "By age 3, the microbiota resembles that of an adult. Exposure to environmental antigens (soil microbiota, pets) is vital for the education of T-regulatory cells."
    },
    nursing: {
      es: "Vigilancia estrecha en tratamientos con antibióticos: abogar por 'espectro reducido'. Fomentar dietas ricas en MACs (Carbohidratos Accesibles a la Microbiota) como legumbres y frutas.",
      en: "Close surveillance in antibiotic treatments: advocate for 'narrow spectrum'. Promote diets rich in MACs (Microbiota Accessible Carbohydrates) like legumes and fruits."
    },
    pathology: {
      es: "El eje Intestino-Cerebro cobra relevancia: la disbiosis en esta etapa se ha vinculado con trastornos del neurodesarrollo. La inflamación sistémica afecta la barrera hematoencefálica.",
      en: "The Gut-Brain axis gains relevance: dysbiosis at this stage is linked to neurodevelopmental disorders. Systemic inflammation affects the blood-brain barrier."
    },
    marker: "Firmicutes/Bacteroidetes (Radio 1:1)"
  },
  { 
    title: { es: "Adultez", en: "Adulthood" }, 
    subtitle: { es: "El Órgano Metabólico", en: "The Metabolic Organ" }, 
    desc: {
      es: "Un microbioma maduro pesa hasta 2kg y funciona como una glándula endocrina masiva, produciendo neurotransmisores (90% de la serotonina corporal) y vitaminas (K, B12).",
      en: "A mature microbiome weighs up to 2kg and functions as a massive endocrine gland, producing neurotransmitters (90% of body serotonin) and vitamins (K, B12)."
    },
    img: "./img/adultez.png",
    color: "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)", icon: User, 
    clinical: {
      es: "Producción de AGCC: El Butirato es el combustible del colonocito, el Propionato va al hígado y el Acetato regula la lipogénesis. Mantienen la integridad de las 'Tight Junctions'.",
      en: "SCFA Production: Butyrate fuels colonocytes, Propionate goes to the liver, and Acetate regulates lipogenesis. They maintain the integrity of 'Tight Junctions'."
    },
    nursing: {
      es: "Detección de 'Leaky Gut': distensión, fatiga crónica y niebla mental. Manejo de cortisol, ya que el exceso de glucocorticoides reduce la producción de moco protector en el intestino.",
      en: "Detecting 'Leaky Gut': bloating, chronic fatigue, brain fog. Cortisol management, as excess glucocorticoids reduce protective mucus production in the gut."
    },
    pathology: {
      es: "Disbiosis metabólica: Un radio elevado de Firmicutes/Bacteroidetes se asocia con obesidad. La translocación de LPS causa endotoxemia metabólica e inflamación crónica.",
      en: "Metabolic dysbiosis: A high Firmicutes/Bacteroidetes ratio is associated with obesity. LPS translocation causes metabolic endotoxemia and chronic inflammation."
    },
    marker: "Estabilidad en Diversidad Alfa / Alpha Diversity Stability"
  },
  { 
    title: { es: "Adulto Mayor", en: "Older Adult" }, 
    subtitle: { es: "Inmunosenescencia", en: "Immunosenescence" }, 
    desc: {
      es: "Pérdida drástica de diversidad. La microbiota se vuelve inestable y pierde 'resiliencia', volviéndose vulnerable a colonizaciones por patógenos como Clostridioides difficile.",
      en: "Drastic loss of diversity. The microbiota becomes unstable and loses 'resilience', becoming vulnerable to colonization by pathogens like Clostridioides difficile."
    },
    img: "./img/adulto.png",
    color: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)", icon: Activity, 
    clinical: {
      es: "Fenómeno de 'Inflammaging': La reducción de bacterias productoras de butirato debilita la barrera intestinal. Permite el paso de metabolitos pro-inflamatorios que aceleran el envejecimiento.",
      en: "'Inflammaging' phenomenon: The reduction of butyrate-producing bacteria weakens the gut barrier. It allows pro-inflammatory metabolites to pass, accelerating aging."
    },
    nursing: {
      es: "Manejo de polifarmacia: Los IBPs y AINEs alteran drásticamente el microbioma. Suplementación con probióticos multicepa para contrarrestar la sarcopenia mediada por inflamación.",
      en: "Polypharmacy management: PPIs and NSAIDs drastically alter the microbiome. Multi-strain probiotic supplementation to counteract inflammation-mediated sarcopenia."
    },
    pathology: {
      es: "Asociación directa con enfermedades neurodegenerativas (Alzheimer/Parkinson) a través del nervio vago. La acumulación de proteínas mal plegadas viaja al cerebro.",
      en: "Direct association with neurodegenerative diseases (Alzheimer's/Parkinson's) via the vagus nerve. Accumulation of misfolded proteins travels to the brain."
    },
    marker: "Aumento de Pathobiontes / Pathobionts Increase"
  }
];

// 3. Preguntas del Test (Bilingüe, lógica original de 5 preguntas)
const quizQuestions = [
  { 
    q: { es: "¿Con qué frecuencia consumes alimentos ultraprocesados?", en: "How often do you consume ultra-processed foods?" }, 
    options: [{ t: { es: "Casi nunca", en: "Almost never" }, v: 2 }, { t: { es: "1-3 veces por semana", en: "1-3 times a week" }, v: 1 }, { t: { es: "Todos los días", en: "Every day" }, v: 0 }] 
  },
  { 
    q: { es: "¿Cuántas porciones de vegetales consumes diariamente?", en: "How many servings of vegetables do you consume daily?" }, 
    options: [{ t: { es: "Más de 4", en: "More than 4" }, v: 2 }, { t: { es: "1 o 2", en: "1 or 2" }, v: 1 }, { t: { es: "Casi nada", en: "Almost none" }, v: 0 }] 
  },
  { 
    q: { es: "¿Has tomado antibióticos recientemente?", en: "Have you taken antibiotics recently?" }, 
    options: [{ t: { es: "No", en: "No" }, v: 2 }, { t: { es: "Sí, recetados", en: "Yes, prescribed" }, v: 1 }, { t: { es: "Sí, varias veces", en: "Yes, multiple times" }, v: 0 }] 
  },
  { 
    q: { es: "¿Cómo es tu calidad de sueño y estrés?", en: "How is your sleep quality and stress levels?" }, 
    options: [{ t: { es: "Buena", en: "Good" }, v: 2 }, { t: { es: "Regular", en: "Regular" }, v: 1 }, { t: { es: "Mala/Crónico", en: "Bad/Chronic" }, v: 0 }] 
  },
  { 
    q: { es: "¿Haces ejercicio regular?", en: "Do you exercise regularly?" }, 
    options: [{ t: { es: "Sí", en: "Yes" }, v: 2 }, { t: { es: "A veces", en: "Sometimes" }, v: 1 }, { t: { es: "No", en: "No" }, v: 0 }] 
  }
];

// 4. Laboratorio de Alimentos (Bilingüe + Imágenes ampliadas)
const initialFoods = [
  { id: 'f1', name: { es: 'Brócoli', en: 'Broccoli' }, type: 'good', icon: '🥦', img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&q=80&w=200' },
  { id: 'f2', name: { es: 'Hamburguesa', en: 'Burger' }, type: 'bad', icon: '🍔', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=200' },
  { id: 'f3', name: { es: 'Kéfir', en: 'Kefir' }, type: 'good', icon: '🥛', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPaq-l6VblDIKnX0lXdin5auSkzBZHjMi4sg&s' },
  { id: 'f4', name: { es: 'Gaseosa', en: 'Soda' }, type: 'bad', icon: '🥤', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=200' },
  { id: 'f5', name: { es: 'Avena', en: 'Oats' }, type: 'good', icon: '🌾', img: 'https://content21.sabervivirtv.com/medio/2024/02/28/avena_5963dcb7_886668116(1)_240228140726_1280x720.webp' },
  { id: 'f6', name: { es: 'Donas', en: 'Donuts' }, type: 'bad', icon: '🍩', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=200' },
  { id: 'f7', name: { es: 'Lentejas', en: 'Lentils' }, type: 'good', icon: '🍲', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaNjz0x0AWksCnucf4rJ99UHiqSSVAG5KMVQ&s' },
  { id: 'f8', name: { es: 'Dulces', en: 'Candy' }, type: 'bad', icon: '🍬', img: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=200' },
];

// ============================================================
// 🚂 TREN DE LA MICROBIOTA — MINI JUEGO
// ============================================================
const TRAIN_STAGES = [
  {
    id: 'neonatal',
    label: { es: 'Neonatal', en: 'Neonatal' },
    emoji: '👶',
    color: '#38bdf8',
    glow: '#7dd3fc',
    bacteria: ['Lactobacillus', 'Bifidobacterium', 'Prevotella'],
    badBacteria: ['E.coli patógeno', 'Staphylococcus aureus', 'Klebsiella'],
    fact: { es: 'El parto vaginal siembra Lactobacillus que protegen al bebé.', en: 'Vaginal birth seeds Lactobacillus that protect the baby.' },
    wagons: 3,
  },
  {
    id: 'infancia',
    label: { es: 'Infancia', en: 'Childhood' },
    emoji: '🧒',
    color: '#4ade80',
    glow: '#86efac',
    bacteria: ['Bacteroides', 'Faecalibacterium', 'Ruminococcus'],
    badBacteria: ['Clostridium perfringens', 'Campylobacter', 'Salmonella'],
    fact: { es: 'La alimentación sólida dispara la diversidad bacteriana.', en: 'Solid food skyrockets bacterial diversity.' },
    wagons: 4,
  },
  {
    id: 'adultez',
    label: { es: 'Adultez', en: 'Adulthood' },
    emoji: '🧑',
    color: '#fb923c',
    glow: '#fdba74',
    bacteria: ['Akkermansia', 'Roseburia', 'Blautia'],
    badBacteria: ['Fusobacterium', 'Clostridioides diff.', 'Helicobacter'],
    fact: { es: 'El microbioma adulto produce el 90% de la serotonina corporal.', en: 'The adult microbiome produces 90% of body serotonin.' },
    wagons: 5,
  },
  {
    id: 'vejez',
    label: { es: 'Adulto Mayor', en: 'Older Adult' },
    emoji: '👴',
    color: '#c084fc',
    glow: '#d8b4fe',
    bacteria: ['Christensenellaceae', 'Lachnospiraceae', 'Eubacterium'],
    badBacteria: ['Proteobacteria exc.', 'C. difficile', 'Enterococcus'],
    fact: { es: 'Los probióticos multiespecie frenan el Inflammaging.', en: 'Multi-species probiotics slow Inflammaging.' },
    wagons: 4,
  },
];

const ALL_BACTERIA = TRAIN_STAGES.flatMap(s => [
  ...s.bacteria.map(b => ({ name: b, type: 'good', stage: s.id, color: s.color })),
  ...s.badBacteria.map(b => ({ name: b, type: 'bad', stage: s.id, color: '#ef4444' })),
]);

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function BacteriaTrainGame({ lang, isMobile }) {
  const [trainStage, setTrainStage] = useState(0);
  const [queue, setQueue] = useState(() => shuffle(ALL_BACTERIA).slice(0, 12));
  const [currentBact, setCurrentBact] = useState(null);
  const [wagons, setWagons] = useState({ neonatal: [], infancia: [], adultez: [], vejez: [] });
  const [message, setMessage] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [trainAnim, setTrainAnim] = useState(false);
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [bgPulse, setBgPulse] = useState(false);

  useEffect(() => {
    if (queue.length > 0 && !currentBact) {
      setCurrentBact(queue[0]);
      setQueue(q => q.slice(1));
    } else if (queue.length === 0 && !currentBact && totalAnswered > 0) {
      setGameOver(true);
    }
  }, [queue, currentBact]);

  const handleDrop = (stageId) => {
    if (!currentBact) return;
    const stage = TRAIN_STAGES.find(s => s.id === stageId);
    const isCorrect = currentBact.stage === stageId && currentBact.type === 'good';
    
    setWagons(prev => ({ ...prev, [stageId]: [...(prev[stageId] || []), { ...currentBact, correct: isCorrect }] }));
    setTotalAnswered(t => t + 1);
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const bonus = newStreak >= 3 ? 30 : 10;
      setScore(s => s + bonus);
      setMessage({ type: 'success', text: lang === 'es' ? `🎉 ¡Exacto! +${bonus} pts${newStreak >= 3 ? ' 🔥 ¡Racha!' : ''}` : `🎉 Correct! +${bonus} pts${newStreak >= 3 ? ' 🔥 Streak!' : ''}` });
    } else {
      setStreak(0);
      const correctStage = TRAIN_STAGES.find(s => s.id === currentBact.stage);
      const label = correctStage?.label[lang] || currentBact.stage;
      setMessage({ type: 'error', text: lang === 'es' ? `❌ "${currentBact.name}" → ${label}` : `❌ "${currentBact.name}" → ${label}` });
    }

    setBgPulse(true);
    setTrainAnim(true);
    setTimeout(() => { setTrainAnim(false); setBgPulse(false); }, 600);
    setSelectedWagon(null);
    setCurrentBact(null);
    setTimeout(() => setMessage(null), 2200);
  };

  const handleReset = () => {
    setQueue(shuffle(ALL_BACTERIA).slice(0, 12));
    setCurrentBact(null);
    setWagons({ neonatal: [], infancia: [], adultez: [], vejez: [] });
    setMessage(null);
    setScore(0);
    setStreak(0);
    setGameOver(false);
    setTotalAnswered(0);
    setSelectedWagon(null);
  };

  const accuracy = totalAnswered > 0
    ? Math.round((Object.values(wagons).flat().filter(b => b.correct).length / totalAnswered) * 100)
    : 0;

  const trainY = trainAnim ? -8 : 0;

  return (
    <div style={{
      borderRadius: '30px',
      overflow: 'hidden',
      boxShadow: '0 30px 80px -10px rgba(0,0,0,0.18)',
      background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)',
      border: '1px solid rgba(255,255,255,0.08)',
      padding: isMobile ? '20px 16px' : '36px 40px',
      position: 'relative',
      transition: 'background 0.3s',
    }}>
      {/* Starfield background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(30)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            background: 'white',
            borderRadius: '50%',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 + 0.1,
          }} />
        ))}
      </div>

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '12px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '2rem' }}>🚂</span>
            <div>
              <h3 style={{ margin: 0, fontSize: isMobile ? '1.1rem' : '1.4rem', fontWeight: '900', color: 'white', letterSpacing: '-0.5px' }}>
                {lang === 'es' ? 'Tren de la Microbiota' : 'Microbiota Express'}
              </h3>
              <p style={{ margin: 0, fontSize: '0.72rem', color: '#94a3b8', fontWeight: '600' }}>
                {lang === 'es' ? '🦠 Asigna cada bacteria a su vagón correcto' : '🦠 Assign each bacterium to its correct wagon'}
              </p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '12px', padding: '8px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fbbf24' }}>{score}</div>
            <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '700' }}>{lang === 'es' ? 'PUNTOS' : 'SCORE'}</div>
          </div>
          {streak >= 2 && (
            <div style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', borderRadius: '12px', padding: '8px 14px', textAlign: 'center', animation: 'none' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '900', color: 'white' }}>🔥 ×{streak}</div>
              <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.8)', fontWeight: '700' }}>RACHA</div>
            </div>
          )}
          <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '12px', padding: '8px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#34d399' }}>{totalAnswered > 0 ? accuracy + '%' : '—'}</div>
            <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '700' }}>{lang === 'es' ? 'ACIERTOS' : 'ACCURACY'}</div>
          </div>
        </div>
      </div>

      {/* Train track visual */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: '20px' }}>
        {/* Track rails */}
        <div style={{ position: 'relative', height: isMobile ? '130px' : '160px', marginBottom: '8px' }}>
          {/* Rail lines */}
          <div style={{ position: 'absolute', bottom: '18px', left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.12)', borderRadius: '2px' }} />
          <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px' }} />
          {/* Sleepers */}
          {[...Array(isMobile ? 8 : 14)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute', bottom: '8px',
              left: `${(i / (isMobile ? 8 : 14)) * 100}%`,
              width: isMobile ? '5%' : '3.5%', height: '14px',
              background: 'rgba(120,80,40,0.5)', borderRadius: '2px',
            }} />
          ))}

          {/* LOCOMOTIVE */}
          <div style={{
            position: 'absolute', bottom: '22px', left: '8px',
            transform: `translateY(${trainY}px)`,
            transition: 'transform 0.3s cubic-bezier(.36,.07,.19,.97)',
            fontSize: isMobile ? '2.8rem' : '3.4rem',
            filter: 'drop-shadow(0 4px 16px rgba(251,191,36,0.5))',
            zIndex: 5,
          }}>🚂</div>

          {/* WAGONS */}
          <div style={{
            position: 'absolute', bottom: '22px',
            left: isMobile ? '70px' : '90px',
            right: 0,
            display: 'flex',
            gap: isMobile ? '6px' : '10px',
            transform: `translateY(${trainY}px)`,
            transition: 'transform 0.3s cubic-bezier(.36,.07,.19,.97)',
          }}>
            {TRAIN_STAGES.map((stage, idx) => {
              const wagonBacts = wagons[stage.id] || [];
              const isSelected = selectedWagon === stage.id;
              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    if (!currentBact) return;
                    setSelectedWagon(stage.id);
                    setTimeout(() => handleDrop(stage.id), 100);
                  }}
                  style={{
                    flex: 1,
                    background: isSelected
                      ? `linear-gradient(135deg, ${stage.color}55, ${stage.color}33)`
                      : 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                    border: `2px solid ${isSelected ? stage.color : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: '10px',
                    padding: '6px 4px',
                    cursor: currentBact ? 'pointer' : 'default',
                    transition: 'all 0.2s',
                    minHeight: isMobile ? '80px' : '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '3px',
                    boxShadow: isSelected ? `0 0 20px ${stage.color}44` : 'none',
                    transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Wagon label */}
                  <div style={{ fontSize: isMobile ? '1.1rem' : '1.3rem' }}>{stage.emoji}</div>
                  <div style={{ fontSize: '0.6rem', fontWeight: '800', color: stage.color, textAlign: 'center', lineHeight: 1.1 }}>{stage.label[lang]}</div>
                  {/* Bacteria dots */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', justifyContent: 'center', marginTop: '2px' }}>
                    {wagonBacts.slice(-6).map((b, bi) => (
                      <div key={bi} title={b.name} style={{
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: b.correct ? stage.color : '#ef4444',
                        opacity: 0.9,
                        boxShadow: `0 0 4px ${b.correct ? stage.color : '#ef4444'}`,
                      }} />
                    ))}
                  </div>
                  {/* Wagon wheels */}
                  <div style={{ position: 'absolute', bottom: '-5px', left: '15%', width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.3)' }} />
                  <div style={{ position: 'absolute', bottom: '-5px', right: '15%', width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.3)' }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current bacteria card + message */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: '16px' }}>
        {message && (
          <div style={{
            textAlign: 'center', padding: '10px 20px', borderRadius: '14px', marginBottom: '12px',
            background: message.type === 'success' ? 'rgba(52,211,153,0.18)' : 'rgba(239,68,68,0.18)',
            border: `1px solid ${message.type === 'success' ? '#34d399' : '#ef4444'}`,
            color: message.type === 'success' ? '#6ee7b7' : '#fca5a5',
            fontWeight: '800', fontSize: '0.9rem',
            animation: 'fadeIn 0.3s ease',
          }}>
            {message.text}
          </div>
        )}

        {!gameOver ? (
          currentBact ? (
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
              border: `2px solid rgba(255,255,255,0.15)`,
              borderRadius: '20px',
              padding: isMobile ? '16px' : '20px 28px',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              gap: '16px',
            }}>
              <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  background: currentBact.type === 'good'
                    ? `radial-gradient(circle, ${TRAIN_STAGES.find(s=>s.id===currentBact.stage)?.color || '#60a5fa'}, #1e293b)`
                    : 'radial-gradient(circle, #ef4444, #1e293b)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem',
                  boxShadow: `0 0 24px ${currentBact.type === 'good' ? (TRAIN_STAGES.find(s=>s.id===currentBact.stage)?.glow || '#60a5fa') : '#ef4444'}66`,
                  margin: '0 auto',
                }}>🦠</div>
                <div style={{ fontSize: '0.6rem', fontWeight: '700', color: currentBact.type === 'good' ? '#34d399' : '#ef4444', marginTop: '4px' }}>
                  {currentBact.type === 'good' ? (lang === 'es' ? '✅ BENÉFICA' : '✅ BENEFICIAL') : (lang === 'es' ? '⚠️ PATÓGENA' : '⚠️ PATHOGEN')}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', fontWeight: '900', color: 'white', marginBottom: '4px', fontStyle: 'italic' }}>
                  {currentBact.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '10px' }}>
                  {lang === 'es' ? '¿En qué vagón viaja esta bacteria? Toca el vagón correcto ↑' : 'Which wagon does this bacterium ride? Tap the correct wagon ↑'}
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {TRAIN_STAGES.map(stage => (
                    <button
                      key={stage.id}
                      onClick={() => handleDrop(stage.id)}
                      style={{
                        padding: '6px 14px', borderRadius: '10px', border: `1.5px solid ${stage.color}55`,
                        background: `${stage.color}18`, color: stage.color,
                        fontWeight: '800', fontSize: '0.72rem', cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {stage.emoji} {stage.label[lang]}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
                <div style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: '700' }}>
                  {lang === 'es' ? 'QUEDAN' : 'LEFT'}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: '#e2e8f0' }}>
                  {queue.length + 1}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#64748b', padding: '20px', fontStyle: 'italic' }}>
              {lang === 'es' ? 'Cargando bacteria...' : 'Loading bacterium...'}
            </div>
          )
        ) : (
          /* GAME OVER SCREEN */
          <div style={{
            background: 'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(139,92,246,0.12))',
            border: '2px solid rgba(251,191,36,0.3)',
            borderRadius: '20px',
            padding: '28px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🏆</div>
            <h3 style={{ color: '#fbbf24', margin: '0 0 6px 0', fontSize: '1.5rem', fontWeight: '900' }}>
              {lang === 'es' ? '¡Tren completado!' : 'Train Complete!'}
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', margin: '16px 0' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: '#fbbf24' }}>{score}</div>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{lang === 'es' ? 'PUNTOS' : 'SCORE'}</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: '#34d399' }}>{accuracy}%</div>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{lang === 'es' ? 'PRECISIÓN' : 'ACCURACY'}</div>
              </div>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: '12px 0', lineHeight: 1.5 }}>
              {accuracy >= 80
                ? (lang === 'es' ? '🌟 ¡Excelente! Dominas la taxonomía de la microbiota.' : '🌟 Excellent! You master microbiota taxonomy.')
                : accuracy >= 50
                ? (lang === 'es' ? '👍 Buen trabajo. Repasa las etapas con más errores.' : '👍 Good job. Review the stages with most errors.')
                : (lang === 'es' ? '📚 Sigue estudiando. La microbiota tiene muchos secretos.' : '📚 Keep studying. Microbiota has many secrets.')}
            </div>
            <button onClick={handleReset} style={{
              marginTop: '8px', padding: '12px 28px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #fbbf24, #f97316)',
              border: 'none', color: 'white', fontWeight: '900', fontSize: '0.9rem', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(251,191,36,0.4)',
            }}>
              🚂 {lang === 'es' ? 'Nuevo Viaje' : 'New Journey'}
            </button>
          </div>
        )}
      </div>

      {/* Stage facts ticker */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {TRAIN_STAGES.map((stage) => (
          <div key={stage.id} style={{
            flex: '0 0 auto',
            background: `${stage.color}12`,
            border: `1px solid ${stage.color}33`,
            borderRadius: '12px',
            padding: '8px 12px',
            minWidth: isMobile ? '180px' : '220px',
          }}>
            <div style={{ fontSize: '0.62rem', fontWeight: '800', color: stage.color, marginBottom: '3px' }}>
              {stage.emoji} {stage.label[lang]}
            </div>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8', lineHeight: 1.3 }}>
              {stage.fact[lang]}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// ============================================================
// 🫁 1. SISTEMA DIGESTIVO INTERACTIVO
// ============================================================
const DIGESTIVE_SECTIONS = [
  {
    id: 'esofago',
    label: { es: 'Esófago', en: 'Esophagus' },
    color: '#f87171', dotColor: '#ef4444',
    bacteria: { es: 'Streptococcus salivarius, Prevotella', en: 'Streptococcus salivarius, Prevotella' },
    ph: 'pH ~6',
    density: { es: '10¹–10³ UFC/mL', en: '10¹–10³ CFU/mL' },
    info: { es: 'Microbiota escasa. El peristaltismo rápido (~3–5 cm/s) impide la colonización duradera. La microbiota oral transitoria domina.', en: 'Sparse microbiota. Rapid peristalsis (~3–5 cm/s) prevents lasting colonization. Transient oral microbiota dominates.' },
    icon: '🔴',
  },
  {
    id: 'estomago',
    label: { es: 'Estómago', en: 'Stomach' },
    color: '#fb923c', dotColor: '#f97316',
    bacteria: { es: 'Helicobacter pylori (único colonizador estable)', en: 'Helicobacter pylori (only stable colonizer)' },
    ph: 'pH 1–3',
    density: { es: '10¹–10³ UFC/mL', en: '10¹–10³ CFU/mL' },
    info: { es: 'Ambiente extremadamente ácido. Solo H. pylori sobrevive gracias a su ureasa, que neutraliza el ácido local. Coloniza al ~50% de la humanidad y puede causar úlceras y adenocarcinoma gástrico.', en: 'Extremely acidic environment. Only H. pylori survives thanks to its urease, which locally neutralizes acid. It colonizes ~50% of humanity and can cause ulcers and gastric adenocarcinoma.' },
    icon: '🟠',
  },
  {
    id: 'intestino_delgado',
    label: { es: 'Intestino Delgado', en: 'Small Intestine' },
    color: '#facc15', dotColor: '#eab308',
    bacteria: { es: 'Lactobacillus, Enterococcus, Streptococcus', en: 'Lactobacillus, Enterococcus, Streptococcus' },
    ph: 'pH 6–7',
    density: { es: '10³–10⁷ UFC/mL', en: '10³–10⁷ CFU/mL' },
    info: { es: 'Principal sitio de absorción de nutrientes. La bilis y el tránsito rápido limitan la densidad bacteriana. El íleon terminal es más rico. Clave en la presentación de antígenos al sistema MALT.', en: 'Primary site of nutrient absorption. Bile and fast transit limit bacterial density. The terminal ileum is richer. Key in antigen presentation to the MALT system.' },
    icon: '🟡',
  },
  {
    id: 'colon',
    label: { es: 'Colon', en: 'Colon' },
    color: '#4ade80', dotColor: '#16a34a',
    bacteria: { es: 'Bacteroides, Bifidobacterium, Faecalibacterium prausnitzii, Akkermansia', en: 'Bacteroides, Bifidobacterium, Faecalibacterium prausnitzii, Akkermansia' },
    ph: 'pH 5.5–7',
    density: { es: '10¹¹–10¹² UFC/mL', en: '10¹¹–10¹² CFU/mL' },
    info: { es: 'El ecosistema microbiano más denso del cuerpo. La fermentación anaeróbica produce AGCC (Butirato, Propionato, Acetato) que nutren el epitelio. El 70% del sistema inmune reside en la lámina propia del colon.', en: 'The body\'s densest microbial ecosystem. Anaerobic fermentation produces SCFAs (Butyrate, Propionate, Acetate) that nourish the epithelium. 70% of the immune system resides in the colonic lamina propria.' },
    icon: '🟢',
  },
  {
    id: 'recto',
    label: { es: 'Recto', en: 'Rectum' },
    color: '#818cf8', dotColor: '#6366f1',
    bacteria: { es: 'Bacteroides fragilis, metanógenos (Methanobrevibacter)', en: 'Bacteroides fragilis, methanogens (Methanobrevibacter)' },
    ph: 'pH 6.5–7',
    density: { es: '10¹¹–10¹² UFC/mL', en: '10¹¹–10¹² CFU/mL' },
    info: { es: 'Reservorio final. Alta concentración de metanógenos que convierten H₂ en metano. La composición de esta zona es la que se analiza en la metagenómica de heces clínica y en el Trasplante de Microbiota Fecal (TMF).', en: 'Final reservoir. High concentration of methanogens converting H₂ into methane. This zone\'s composition is analyzed in clinical fecal metagenomics and Fecal Microbiota Transplant (FMT).' },
    icon: '🟣',
  },
];

function InteractiveGutMap({ lang, isMobile }) {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const active = selected || hovered;
  const activeSec = DIGESTIVE_SECTIONS.find(s => s.id === active);

  return (
    <div style={{ borderRadius: '30px', background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '1px solid #bbf7d0', padding: isMobile ? '16px' : '32px', boxShadow: '0 20px 60px -10px rgba(16,185,129,0.15)' }}>
      <h3 style={{ margin: '0 0 4px 0', fontWeight: '900', fontSize: isMobile ? '1.1rem' : '1.3rem', color: '#064e3b', display: 'flex', alignItems: 'center', gap: '10px' }}>
        🫁 {lang === 'es' ? 'Sistema Digestivo Interactivo' : 'Interactive Digestive System'}
      </h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '0.75rem', color: '#065f46', fontWeight: '600' }}>
        {lang === 'es' ? 'Toca cada zona para explorar su microbiota, pH y función clínica' : 'Tap each zone to explore its microbiota, pH and clinical function'}
      </p>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '24px', alignItems: 'flex-start' }}>

        {/* ── Anatomical IMAGE with overlaid hotspots ── */}
        <div style={{ flex: '0 0 auto', width: isMobile ? '100%' : '300px', display: 'flex', justifyContent: 'center' }}>
          {/* Wrapper keeps the image + SVG overlay perfectly aligned */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: isMobile ? '280px' : '300px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
            background: '#eef3f8',
          }}>
            {/* Real anatomical image */}
            <img
              src="./digestive_system.png"
              alt={lang === 'es' ? 'Sistema Digestivo' : 'Digestive System'}
              style={{ width: '100%', display: 'block', userSelect: 'none', pointerEvents: 'none' }}
            />

            {/* SVG overlay — same bounding box as the image (viewBox matches natural aspect ratio 1456×816 cropped to subject) */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
            >
              {/* 
                Hotspot % positions calibrated to the image:
                esofago          → tube entering top-center         ~50% x, 10% y
                estomago         → pink stomach bag right of center  ~56% x, 43% y
                intestino_delgado→ central loops                     ~60% x, 67% y
                colon            → outer frame of bowel              ~33% x, 65% y
                recto            → lower tube exiting down           ~50% x, 91% y
              */}
              {[
                { id: 'esofago',           px: 50, py: 10 },
                { id: 'estomago',          px: 57, py: 43 },
                { id: 'intestino_delgado', px: 51, py: 70 },
                { id: 'colon',             px: 40, py: 64 },
                { id: 'recto',             px: 50, py: 91 },
              ].map(h => {
                const sec = DIGESTIVE_SECTIONS.find(s => s.id === h.id);
                const isActive = active === h.id;
                const labelRight = h.px > 50;
                return (
                  <g key={h.id}
                    onClick={() => setSelected(selected === h.id ? null : h.id)}
                    onMouseEnter={() => setHovered(h.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: 'pointer' }}>
                    {/* Outer pulse ring */}
                    <circle cx={h.px} cy={h.py} r={isActive ? 7 : 5}
                      fill={sec.dotColor} opacity={isActive ? 0.18 : 0}
                      style={{ transition: 'all 0.2s' }}/>
                    {/* Dot */}
                    <circle cx={h.px} cy={h.py} r={isActive ? 4.2 : 3.2}
                      fill={sec.dotColor}
                      stroke="white"
                      strokeWidth="1"
                      opacity={isActive ? 1 : 0.88}
                      style={{ transition: 'all 0.2s', filter: isActive ? `drop-shadow(0 0 3px ${sec.color})` : 'none' }}/>
                    {/* Star / dot icon */}
                    <text x={h.px} y={h.py + 0.5}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="3" fontWeight="900" fill="white"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}>
                      {isActive ? '★' : '•'}
                    </text>
                    {/* Label pill */}
                    <rect
                      x={labelRight ? h.px + 5.5 : h.px - 5.5 - (sec.label[lang].length * 1.55)}
                      y={h.py - 2.8}
                      width={sec.label[lang].length * 1.55 + 2}
                      height="5.5"
                      rx="2.5"
                      fill={isActive ? sec.dotColor : 'rgba(255,255,255,0.85)'}
                      style={{ transition: 'fill 0.2s' }}/>
                    <text
                      x={labelRight ? h.px + 6.5 : h.px - 5}
                      y={h.py + 0.4}
                      textAnchor={labelRight ? 'start' : 'end'}
                      dominantBaseline="middle"
                      fontSize="3.2"
                      fontWeight="800"
                      fill={isActive ? 'white' : sec.dotColor}
                      style={{ pointerEvents: 'none', userSelect: 'none', transition: 'fill 0.2s' }}>
                      {sec.label[lang]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* ── Info panel ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {activeSec ? (
            <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: `2px solid ${activeSec.color}`, boxShadow: `0 8px 30px ${activeSec.color}33`, animation: 'fadeIn 0.25s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: activeSec.dotColor, boxShadow: `0 0 12px ${activeSec.color}` }}/>
                <span style={{ fontWeight: '900', fontSize: '1.15rem', color: '#0f172a' }}>{activeSec.label[lang]}</span>
                <span style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: '20px', background: activeSec.color + '22', color: activeSec.dotColor, fontWeight: '800', fontSize: '0.65rem' }}>{activeSec.ph}</span>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '10px 14px', marginBottom: '10px' }}>
                <div style={{ fontSize: '0.6rem', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>🦠 {lang === 'es' ? 'BACTERIAS DOMINANTES' : 'DOMINANT BACTERIA'}</div>
                <div style={{ fontStyle: 'italic', fontWeight: '700', color: '#1e293b', fontSize: '0.85rem', lineHeight: 1.4 }}>{activeSec.bacteria[lang]}</div>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '10px 14px', marginBottom: '12px' }}>
                <div style={{ fontSize: '0.6rem', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>🔢 {lang === 'es' ? 'DENSIDAD BACTERIANA' : 'BACTERIAL DENSITY'}</div>
                <div style={{ fontWeight: '700', color: activeSec.dotColor, fontSize: '0.85rem' }}>{activeSec.density[lang]}</div>
              </div>

              <p style={{ margin: 0, fontSize: '0.82rem', color: '#334155', lineHeight: '1.65' }}>{activeSec.info[lang]}</p>
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', border: '2px dashed #a7f3d0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>👆</div>
              <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: '0.85rem', fontWeight: '600', lineHeight: 1.5 }}>
                {lang === 'es'
                  ? 'Selecciona una zona del sistema digestivo para ver su microbiota, pH y función clínica.'
                  : 'Select a zone of the digestive system to see its microbiota, pH and clinical function.'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                {DIGESTIVE_SECTIONS.map(s => (
                  <button key={s.id} onClick={() => setSelected(s.id)} style={{ padding: '5px 12px', borderRadius: '20px', border: 'none', background: s.color + '22', color: s.dotColor, fontWeight: '800', fontSize: '0.7rem', cursor: 'pointer' }}>
                    {s.label[lang]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 📊 2. GRÁFICA DE DIVERSIDAD BACTERIANA POR ETAPA
// ============================================================
const DIVERSITY_DATA = [
  { stage: { es: 'Neonatal', en: 'Neonatal' }, emoji: '👶', alpha: 12, richness: 20, firmicutes: 35, bacteroidetes: 15, actinobacteria: 40, proteobacteria: 10, color: '#38bdf8' },
  { stage: { es: 'Infancia', en: 'Childhood' }, emoji: '🧒', alpha: 55, richness: 65, firmicutes: 45, bacteroidetes: 35, actinobacteria: 12, proteobacteria: 8, color: '#4ade80' },
  { stage: { es: 'Adultez', en: 'Adulthood' }, emoji: '🧑', alpha: 90, richness: 95, firmicutes: 50, bacteroidetes: 40, actinobacteria: 5, proteobacteria: 5, color: '#fb923c' },
  { stage: { es: 'Adulto Mayor', en: 'Older Adult' }, emoji: '👴', alpha: 48, richness: 42, firmicutes: 30, bacteroidetes: 28, actinobacteria: 8, proteobacteria: 34, color: '#c084fc' },
];

function DiversityChart({ lang, isMobile }) {
  const [metric, setMetric] = useState('alpha');
  const [hoveredBar, setHoveredBar] = useState(null);

  const metrics = [
    { key: 'alpha', label: { es: 'Diversidad Alfa', en: 'Alpha Diversity' }, desc: { es: 'Índice de Shannon — riqueza de especies por muestra', en: 'Shannon Index — species richness per sample' }, unit: 'índice' },
    { key: 'richness', label: { es: 'Riqueza de OTUs', en: 'OTU Richness' }, desc: { es: 'Número relativo de Unidades Taxonómicas Operacionales', en: 'Relative number of Operational Taxonomic Units' }, unit: '%' },
    { key: 'firmicutes', label: { es: 'Firmicutes', en: 'Firmicutes' }, desc: { es: 'Filo que incluye Lactobacillus, Clostridium, Faecalibacterium', en: 'Phylum including Lactobacillus, Clostridium, Faecalibacterium' }, unit: '%' },
    { key: 'bacteroidetes', label: { es: 'Bacteroidetes', en: 'Bacteroidetes' }, desc: { es: 'Filo clave en degradación de polisacáridos complejos', en: 'Key phylum in complex polysaccharide degradation' }, unit: '%' },
    { key: 'proteobacteria', label: { es: 'Proteobacteria', en: 'Proteobacteria' }, desc: { es: 'Marcador de inflamación — alto en disbiosis', en: 'Inflammation marker — high in dysbiosis' }, unit: '%' },
  ];

  const current = metrics.find(m => m.key === metric);
  const maxVal = Math.max(...DIVERSITY_DATA.map(d => d[metric]));

  return (
    <div style={{ borderRadius: '30px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', padding: isMobile ? '20px' : '32px', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <h3 style={{ margin: '0 0 4px 0', fontWeight: '900', fontSize: isMobile ? '1.1rem' : '1.3rem', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
        📊 {lang === 'es' ? 'Diversidad Bacteriana por Etapa' : 'Bacterial Diversity by Life Stage'}
      </h3>
      <p style={{ margin: '0 0 18px 0', fontSize: '0.72rem', color: '#94a3b8', fontWeight: '600' }}>{current.desc[lang]}</p>

      {/* Metric selector */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {metrics.map(m => (
          <button key={m.key} onClick={() => setMetric(m.key)} style={{
            padding: '6px 12px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '800',
            background: metric === m.key ? 'white' : 'rgba(255,255,255,0.07)',
            color: metric === m.key ? '#0f172a' : '#94a3b8',
            transition: 'all 0.2s',
          }}>{m.label[lang]}</button>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ display: 'flex', gap: isMobile ? '10px' : '16px', alignItems: 'flex-end', height: '160px', marginBottom: '16px' }}>
        {DIVERSITY_DATA.map((d, i) => {
          const pct = (d[metric] / maxVal) * 100;
          const isHovered = hoveredBar === i;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '6px', cursor: 'pointer' }}
              onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)} onClick={() => setHoveredBar(isHovered ? null : i)}>
              {isHovered && (
                <div style={{ fontSize: '0.65rem', fontWeight: '900', color: d.color, whiteSpace: 'nowrap' }}>{d[metric]}{current.unit === 'índice' ? '' : '%'}</div>
              )}
              <div style={{
                width: '100%', borderRadius: '8px 8px 4px 4px',
                height: `${pct}%`,
                background: `linear-gradient(180deg, ${d.color}, ${d.color}88)`,
                boxShadow: isHovered ? `0 0 20px ${d.color}88` : 'none',
                transform: isHovered ? 'scaleX(1.08)' : 'scaleX(1)',
                transition: 'all 0.25s',
                minHeight: '8px',
                position: 'relative',
              }}>
                {metric === 'proteobacteria' && d[metric] > 20 && (
                  <div style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem' }}>⚠️</div>
                )}
              </div>
              <div style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>{d.emoji}</div>
              <div style={{ fontSize: '0.55rem', color: '#64748b', fontWeight: '700', textAlign: 'center', lineHeight: 1.2 }}>{d.stage[lang]}</div>
            </div>
          );
        })}
      </div>

      {/* Legend bar */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '10px 14px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: '600' }}>
          💡 {lang === 'es' ? 'La diversidad alfa máxima ocurre en la adultez joven (índice ~90). La Proteobacteria elevada es un biomarcador de Inflammaging en el adulto mayor.' : 'Peak alpha diversity occurs in young adulthood (index ~90). Elevated Proteobacteria is a biomarker of Inflammaging in older adults.'}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 🎴 3. FLASHCARDS DE BACTERIAS
// ============================================================
const FLASHCARDS = [
  { front: { es: 'Akkermansia muciniphila', en: 'Akkermansia muciniphila' }, back: { es: 'Degrada mucina del intestino grueso. Alta concentración se correlaciona con menor obesidad y mejor control glucémico. "La guardiana de la barrera intestinal."', en: 'Degrades colon mucin. High levels correlate with less obesity and better glycemic control. "The intestinal barrier guardian."' }, type: 'good', emoji: '🛡️', phylum: 'Verrucomicrobia' },
  { front: { es: 'Faecalibacterium prausnitzii', en: 'Faecalibacterium prausnitzii' }, back: { es: 'Mayor productora de Butirato en el colon. Tiene efecto antiinflamatorio directo. Su ausencia es marcador de Enfermedad de Crohn activa.', en: 'Top butyrate producer in the colon. Has direct anti-inflammatory effect. Its absence is a marker of active Crohn\'s Disease.' }, type: 'good', emoji: '🔥', phylum: 'Firmicutes' },
  { front: { es: 'Bifidobacterium longum', en: 'Bifidobacterium longum' }, back: { es: 'Dominante en lactantes. Produce ácido acético y láctico. Hidroliza los HMO de la leche materna. Clave en la programación del sistema inmune neonatal.', en: 'Dominant in infants. Produces acetic and lactic acid. Hydrolyzes breast milk HMOs. Key in neonatal immune system programming.' }, type: 'good', emoji: '👶', phylum: 'Actinobacteria' },
  { front: { es: 'Clostridioides difficile', en: 'Clostridioides difficile' }, back: { es: 'Patógeno oportunista. Causa diarrea grave post-antibióticos. Produce toxinas A y B que destruyen el epitelio intestinal. Tratamiento: Trasplante de Microbiota Fecal (TMF).', en: 'Opportunistic pathogen. Causes severe post-antibiotic diarrhea. Produces toxins A and B that destroy intestinal epithelium. Treatment: Fecal Microbiota Transplant (FMT).' }, type: 'bad', emoji: '☠️', phylum: 'Firmicutes' },
  { front: { es: 'Lactobacillus rhamnosus', en: 'Lactobacillus rhamnosus' }, back: { es: 'Probiótico más estudiado del mundo (GG). Reduce la duración de la diarrea infecciosa. Activa células Treg. Produce GABA (efecto ansiolítico).', en: 'World\'s most studied probiotic (GG strain). Reduces infectious diarrhea duration. Activates Treg cells. Produces GABA (anxiolytic effect).' }, type: 'good', emoji: '🌟', phylum: 'Firmicutes' },
  { front: { es: 'Helicobacter pylori', en: 'Helicobacter pylori' }, back: { es: 'Único habitante del estómago (pH 1-3). Coloniza el 50% de la humanidad. Causa úlceras y adenocarcinoma gástrico. Su erradicación puede alterar el resto del microbioma.', en: 'Sole stomach inhabitant (pH 1-3). Colonizes 50% of humanity. Causes ulcers and gastric adenocarcinoma. Its eradication can alter the rest of the microbiome.' }, type: 'bad', emoji: '🔴', phylum: 'Proteobacteria' },
  { front: { es: 'Roseburia intestinalis', en: 'Roseburia intestinalis' }, back: { es: 'Segunda mayor productora de Butirato. Degrada almidón resistente. Reducida en pacientes con diabetes tipo 2 y enfermedad inflamatoria intestinal.', en: 'Second-largest butyrate producer. Degrades resistant starch. Reduced in type 2 diabetes and inflammatory bowel disease patients.' }, type: 'good', emoji: '🌿', phylum: 'Firmicutes' },
  { front: { es: 'Bacteroides fragilis', en: 'Bacteroides fragilis' }, back: { es: 'Bacteria comensal clave en la tolerancia inmune. La cepa enterotoxigénica (ETBF) produce fragilisina, una metaloproteasa que rompe la barrera epitelial y se asocia a cáncer de colon.', en: 'Key commensal in immune tolerance. The enterotoxigenic strain (ETBF) produces fragilysin, a metalloprotease that breaks the epithelial barrier and is associated with colon cancer.' }, type: 'neutral', emoji: '⚖️', phylum: 'Bacteroidetes' },
];

function FlashcardDeck({ lang, isMobile }) {
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState([]);
  const [review, setReview] = useState([]);

  const card = FLASHCARDS[cardIdx];
  const progress = ((known.length + review.length) / FLASHCARDS.length) * 100;

  const nextCard = () => { setFlipped(false); setTimeout(() => setCardIdx(i => (i + 1) % FLASHCARDS.length), 180); };
  const prevCard = () => { setFlipped(false); setTimeout(() => setCardIdx(i => (i - 1 + FLASHCARDS.length) % FLASHCARDS.length), 180); };
  const markKnown = () => { setKnown(k => [...k, cardIdx]); nextCard(); };
  const markReview = () => { setReview(r => [...r, cardIdx]); nextCard(); };

  const typeColor = card.type === 'good' ? '#4ade80' : card.type === 'bad' ? '#f87171' : '#fbbf24';
  const typeLabel = card.type === 'good' ? (lang === 'es' ? 'BENÉFICA' : 'BENEFICIAL') : card.type === 'bad' ? (lang === 'es' ? 'PATÓGENA' : 'PATHOGEN') : (lang === 'es' ? 'DUAL' : 'DUAL');

  return (
    <div style={{ borderRadius: '30px', background: 'linear-gradient(135deg, #fdf4ff, #fae8ff)', border: '1px solid #e9d5ff', padding: isMobile ? '20px' : '32px', boxShadow: '0 20px 60px -10px rgba(139,92,246,0.15)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontWeight: '900', fontSize: isMobile ? '1.1rem' : '1.3rem', color: '#4c1d95', display: 'flex', alignItems: 'center', gap: '10px' }}>
          🎴 {lang === 'es' ? 'Flashcards de Bacterias' : 'Bacteria Flashcards'}
        </h3>
        <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: '700' }}>{cardIdx + 1}/{FLASHCARDS.length}</div>
      </div>

      {/* Progress */}
      <div style={{ background: '#e9d5ff', borderRadius: '10px', height: '6px', marginBottom: '16px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #8b5cf6, #a855f7)', borderRadius: '10px', transition: 'width 0.4s' }} />
      </div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '0.7rem', fontWeight: '700' }}>
        <span style={{ color: '#16a34a' }}>✅ {known.length} {lang === 'es' ? 'dominadas' : 'mastered'}</span>
        <span style={{ color: '#ca8a04' }}>🔄 {review.length} {lang === 'es' ? 'revisar' : 'review'}</span>
      </div>

      {/* Card */}
      <div onClick={() => setFlipped(f => !f)} style={{ cursor: 'pointer', perspective: '1000px', marginBottom: '16px', height: isMobile ? '200px' : '220px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, transition: 'transform 0.5s', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          {/* Front */}
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', background: 'white', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', border: `2px solid ${typeColor}44`, boxShadow: `0 8px 30px ${typeColor}22` }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{card.emoji}</div>
            <div style={{ fontStyle: 'italic', fontWeight: '900', fontSize: isMobile ? '1.1rem' : '1.25rem', color: '#1e293b', textAlign: 'center', marginBottom: '8px' }}>{card.front[lang]}</div>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '700', marginBottom: '10px' }}>Phylum: {card.phylum}</div>
            <div style={{ padding: '4px 12px', borderRadius: '20px', background: typeColor + '22', color: typeColor, fontWeight: '800', fontSize: '0.65rem' }}>{typeLabel}</div>
            <div style={{ marginTop: '16px', fontSize: '0.7rem', color: '#94a3b8' }}>👆 {lang === 'es' ? 'Toca para revelar' : 'Tap to reveal'}</div>
          </div>
          {/* Back */}
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: `linear-gradient(135deg, ${typeColor}18, ${typeColor}08)`, borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px', border: `2px solid ${typeColor}66` }}>
            <div style={{ fontSize: '0.65rem', fontWeight: '800', color: typeColor, marginBottom: '10px' }}>🦠 {lang === 'es' ? 'FICHA CLÍNICA' : 'CLINICAL PROFILE'}</div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#1e293b', lineHeight: '1.6' }}>{card.back[lang]}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={prevCard} style={{ padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e9d5ff', background: 'white', cursor: 'pointer', fontWeight: '800', color: '#6b7280' }}>←</button>
        <button onClick={markReview} style={{ flex: 1, padding: '10px', borderRadius: '12px', border: 'none', background: '#fef3c7', color: '#b45309', fontWeight: '800', cursor: 'pointer', fontSize: '0.8rem' }}>🔄 {lang === 'es' ? 'Revisar' : 'Review'}</button>
        <button onClick={markKnown} style={{ flex: 1, padding: '10px', borderRadius: '12px', border: 'none', background: '#dcfce7', color: '#15803d', fontWeight: '800', cursor: 'pointer', fontSize: '0.8rem' }}>✅ {lang === 'es' ? 'Dominada' : 'Mastered'}</button>
        <button onClick={nextCard} style={{ padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e9d5ff', background: 'white', cursor: 'pointer', fontWeight: '800', color: '#6b7280' }}>→</button>
      </div>
    </div>
  );
}

// ============================================================
// 🧬 4. SIMULADOR DEL EJE INTESTINO-CEREBRO
// ============================================================
const GUT_BRAIN_FACTORS = [
  { id: 'fibra', label: { es: 'Fibra Prebiótica', en: 'Prebiotic Fiber' }, icon: '🌾', effect: { serotonin: +20, cortisol: -10, butyrate: +25, inflammation: -15 }, desc: { es: 'Los MACs alimentan bacterias que producen AGCC y modulan el nervio vago.', en: 'MACs feed bacteria that produce SCFAs and modulate the vagus nerve.' } },
  { id: 'probiotico', label: { es: 'Probióticos', en: 'Probiotics' }, icon: '🥛', effect: { serotonin: +15, cortisol: -8, butyrate: +10, inflammation: -12 }, desc: { es: 'Lactobacillus produce GABA; Bifidobacterium reduce IL-6 y TNF-α.', en: 'Lactobacillus produces GABA; Bifidobacterium reduces IL-6 and TNF-α.' } },
  { id: 'estres', label: { es: 'Estrés Crónico', en: 'Chronic Stress' }, icon: '😰', effect: { serotonin: -20, cortisol: +30, butyrate: -15, inflammation: +25 }, desc: { es: 'El cortisol aumenta la permeabilidad intestinal y altera la composición bacteriana.', en: 'Cortisol increases intestinal permeability and alters bacterial composition.' } },
  { id: 'antibiotico', label: { es: 'Antibióticos', en: 'Antibiotics' }, icon: '💊', effect: { serotonin: -15, cortisol: +10, butyrate: -30, inflammation: +20 }, desc: { es: 'Destruyen bacterias productoras de serotonina y butirato. Recuperación: 6-12 meses.', en: 'Destroy serotonin and butyrate-producing bacteria. Recovery: 6-12 months.' } },
  { id: 'ejercicio', label: { es: 'Ejercicio', en: 'Exercise' }, icon: '🏃', effect: { serotonin: +18, cortisol: -5, butyrate: +12, inflammation: -18 }, desc: { es: 'Aumenta Akkermansia y Lachnospiraceae. Activa el eje HPA de forma positiva.', en: 'Increases Akkermansia and Lachnospiraceae. Positively activates the HPA axis.' } },
  { id: 'ultraproc', label: { es: 'Ultraprocesados', en: 'Ultra-processed' }, icon: '🍟', effect: { serotonin: -12, cortisol: +15, butyrate: -20, inflammation: +30 }, desc: { es: 'Los emulsionantes (CMC, P80) destruyen la capa de moco del intestino.', en: 'Emulsifiers (CMC, P80) destroy the intestinal mucus layer.' } },
];

const BIOMARKERS = [
  { key: 'serotonin', label: { es: 'Serotonina', en: 'Serotonin' }, icon: '😊', color: '#fbbf24', goodDir: 'up', base: 50 },
  { key: 'cortisol', label: { es: 'Cortisol', en: 'Cortisol' }, icon: '😰', color: '#f87171', goodDir: 'down', base: 30 },
  { key: 'butyrate', label: { es: 'Butirato', en: 'Butyrate' }, icon: '🛡️', color: '#4ade80', goodDir: 'up', base: 40 },
  { key: 'inflammation', label: { es: 'Inflamación', en: 'Inflammation' }, icon: '🔥', color: '#f97316', goodDir: 'down', base: 20 },
];

function GutBrainSimulator({ lang, isMobile }) {
  const [active, setActive] = useState([]);
  const [values, setValues] = useState({ serotonin: 50, cortisol: 30, butyrate: 40, inflammation: 20 });
  const [lastFactor, setLastFactor] = useState(null);

  const toggleFactor = (factor) => {
    const isActive = active.includes(factor.id);
    const newActive = isActive ? active.filter(id => id !== factor.id) : [...active, factor.id];
    setActive(newActive);
    setLastFactor(factor);

    const newVals = { serotonin: 50, cortisol: 30, butyrate: 40, inflammation: 20 };
    newActive.forEach(id => {
      const f = GUT_BRAIN_FACTORS.find(x => x.id === id);
      if (f) {
        Object.keys(newVals).forEach(k => {
          newVals[k] = Math.max(0, Math.min(100, newVals[k] + (f.effect[k] || 0)));
        });
      }
    });
    setValues(newVals);
  };

  const overallHealth = Math.round((values.serotonin + values.butyrate + (100 - values.cortisol) + (100 - values.inflammation)) / 4);
  const healthColor = overallHealth >= 65 ? '#4ade80' : overallHealth >= 40 ? '#fbbf24' : '#f87171';
  const healthLabel = overallHealth >= 65 ? (lang === 'es' ? 'Eubiosis' : 'Eubiosis') : overallHealth >= 40 ? (lang === 'es' ? 'En Riesgo' : 'At Risk') : (lang === 'es' ? 'Disbiosis' : 'Dysbiosis');

  return (
    <div style={{ borderRadius: '30px', background: 'linear-gradient(135deg, #0f172a, #1e1b4b)', padding: isMobile ? '20px' : '32px', border: '1px solid rgba(99,102,241,0.3)', boxShadow: '0 20px 60px -10px rgba(99,102,241,0.2)' }}>
      <h3 style={{ margin: '0 0 4px 0', fontWeight: '900', fontSize: isMobile ? '1.1rem' : '1.3rem', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
        🧬 {lang === 'es' ? 'Simulador Eje Intestino-Cerebro' : 'Gut-Brain Axis Simulator'}
      </h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '0.72rem', color: '#94a3b8' }}>
        {lang === 'es' ? 'Activa/desactiva factores y observa cómo cambian los biomarcadores en tiempo real' : 'Toggle factors and watch biomarkers change in real time'}
      </p>

      {/* Axis visual */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '20px', padding: '16px 20px', textAlign: 'center', minWidth: '90px' }}>
          <div style={{ fontSize: '2rem' }}>🧠</div>
          <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '700', marginTop: '4px' }}>{lang === 'es' ? 'CEREBRO' : 'BRAIN'}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ fontSize: '0.55rem', color: '#818cf8', fontWeight: '800' }}>NERVIO VAGO ↕</div>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #818cf8, #6366f1)', borderRadius: '2px', boxShadow: '0 0 8px #818cf8' }} />
          <div style={{ fontSize: '0.55rem', color: '#818cf8', fontWeight: '800' }}>SEROTONINA ↕</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '20px', padding: '16px 20px', textAlign: 'center', minWidth: '90px' }}>
          <div style={{ fontSize: '2rem' }}>🦠</div>
          <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '700', marginTop: '4px' }}>{lang === 'es' ? 'INTESTINO' : 'GUT'}</div>
        </div>
        <div style={{ background: `${healthColor}22`, borderRadius: '20px', padding: '12px 18px', textAlign: 'center', border: `1.5px solid ${healthColor}55`, minWidth: '90px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '900', color: healthColor }}>{overallHealth}%</div>
          <div style={{ fontSize: '0.6rem', color: healthColor, fontWeight: '800' }}>{healthLabel}</div>
        </div>
      </div>

      {/* Biomarkers */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {BIOMARKERS.map(bm => {
          const val = values[bm.key];
          const isGood = (bm.goodDir === 'up' && val >= 50) || (bm.goodDir === 'down' && val <= 40);
          return (
            <div key={bm.key} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '12px', border: `1px solid ${bm.color}33` }}>
              <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{bm.icon}</div>
              <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '800', marginBottom: '6px' }}>{bm.label[lang]}</div>
              <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '6px', height: '8px', overflow: 'hidden', marginBottom: '4px' }}>
                <div style={{ height: '100%', width: `${val}%`, background: bm.color, borderRadius: '6px', transition: 'width 0.5s ease', boxShadow: `0 0 8px ${bm.color}66` }} />
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: '900', color: isGood ? '#4ade80' : '#f87171' }}>{val}%</div>
            </div>
          );
        })}
      </div>

      {/* Factor buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr', gap: '8px', marginBottom: '14px' }}>
        {GUT_BRAIN_FACTORS.map(factor => {
          const isOn = active.includes(factor.id);
          return (
            <button key={factor.id} onClick={() => toggleFactor(factor)} style={{
              padding: '10px 12px', borderRadius: '12px', border: isOn ? '1.5px solid rgba(255,255,255,0.3)' : '1.5px solid rgba(255,255,255,0.08)',
              background: isOn ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
              color: isOn ? 'white' : '#64748b',
              cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.2s',
              boxShadow: isOn ? '0 0 16px rgba(255,255,255,0.1)' : 'none',
            }}>
              <span>{factor.icon}</span>
              <span style={{ textAlign: 'left', lineHeight: 1.2, fontSize: '0.68rem' }}>{factor.label[lang]}</span>
              {isOn && <span style={{ marginLeft: 'auto', fontSize: '0.55rem', background: 'rgba(255,255,255,0.2)', padding: '2px 5px', borderRadius: '6px' }}>ON</span>}
            </button>
          );
        })}
      </div>

      {lastFactor && (
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px 14px', fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.5 }}>
          💡 <strong>{lastFactor.label[lang]}:</strong> {lastFactor.desc[lang]}
        </div>
      )}
    </div>
  );
}

// ============================================================
// ⏱️ 5. QUIZ CONTRARRELOJ CON RANKING
// ============================================================
const TIMED_QUESTIONS = [
  { q: { es: '¿Qué bacteria produce el 90% de la serotonina corporal?', en: 'Which bacteria produces 90% of body serotonin?' }, opts: [{ t: { es: 'Bacteroides', en: 'Bacteroides' }, correct: false }, { t: { es: 'Enterochromaffin cells (vía microbiota)', en: 'Enterochromaffin cells (via microbiota)' }, correct: true }, { t: { es: 'Clostridium', en: 'Clostridium' }, correct: false }, { t: { es: 'Helicobacter', en: 'Helicobacter' }, correct: false }] },
  { q: { es: '¿Qué significa "Inflammaging"?', en: 'What does "Inflammaging" mean?' }, opts: [{ t: { es: 'Inflamación aguda en niños', en: 'Acute inflammation in children' }, correct: false }, { t: { es: 'Inflamación crónica de bajo grado en el envejecimiento', en: 'Low-grade chronic inflammation in aging' }, correct: true }, { t: { es: 'Fiebre por infección', en: 'Fever from infection' }, correct: false }, { t: { es: 'Inflamación por antibióticos', en: 'Antibiotic-induced inflammation' }, correct: false }] },
  { q: { es: '¿Cuánto pesa aproximadamente el microbioma adulto?', en: 'How much does the adult microbiome approximately weigh?' }, opts: [{ t: { es: '200 gramos', en: '200 grams' }, correct: false }, { t: { es: '500 gramos', en: '500 grams' }, correct: false }, { t: { es: '2 kilogramos', en: '2 kilograms' }, correct: true }, { t: { es: '10 kilogramos', en: '10 kilograms' }, correct: false }] },
  { q: { es: '¿Qué son los HMO?', en: 'What are HMOs?' }, opts: [{ t: { es: 'Hormonas del metabolismo óseo', en: 'Bone metabolism hormones' }, correct: false }, { t: { es: 'Oligosacáridos de la leche materna', en: 'Human Milk Oligosaccharides' }, correct: true }, { t: { es: 'Medicamentos homeopáticos', en: 'Homeopathic medicines' }, correct: false }, { t: { es: 'Marcadores de hepatitis', en: 'Hepatitis markers' }, correct: false }] },
  { q: { es: '¿Qué bacteria es dominante en el estómago?', en: 'Which bacterium dominates the stomach?' }, opts: [{ t: { es: 'Lactobacillus', en: 'Lactobacillus' }, correct: false }, { t: { es: 'Bifidobacterium', en: 'Bifidobacterium' }, correct: false }, { t: { es: 'Helicobacter pylori', en: 'Helicobacter pylori' }, correct: true }, { t: { es: 'Faecalibacterium', en: 'Faecalibacterium' }, correct: false }] },
  { q: { es: '¿Qué son los AGCC (o SCFAs)?', en: 'What are SCFAs?' }, opts: [{ t: { es: 'Anticuerpos del colon', en: 'Colon antibodies' }, correct: false }, { t: { es: 'Ácidos grasos de cadena corta producidos por fermentación', en: 'Short-chain fatty acids produced by fermentation' }, correct: true }, { t: { es: 'Azúcares del intestino delgado', en: 'Small intestine sugars' }, correct: false }, { t: { es: 'Enzimas pancreáticas', en: 'Pancreatic enzymes' }, correct: false }] },
  { q: { es: '¿Qué porcentaje del sistema inmune reside en el intestino?', en: 'What percentage of the immune system resides in the gut?' }, opts: [{ t: { es: '20%', en: '20%' }, correct: false }, { t: { es: '40%', en: '40%' }, correct: false }, { t: { es: '70%', en: '70%' }, correct: true }, { t: { es: '90%', en: '90%' }, correct: false }] },
  { q: { es: '¿Cuál es el mejor tratamiento para Clostridioides difficile recurrente?', en: 'What is the best treatment for recurrent C. difficile?' }, opts: [{ t: { es: 'Más antibióticos', en: 'More antibiotics' }, correct: false }, { t: { es: 'Trasplante de Microbiota Fecal (TMF)', en: 'Fecal Microbiota Transplant (FMT)' }, correct: true }, { t: { es: 'Dieta líquida', en: 'Liquid diet' }, correct: false }, { t: { es: 'Cirugía intestinal', en: 'Bowel surgery' }, correct: false }] },
];

const INITIAL_TIME = 15;
const LOCAL_RANKING_KEY = 'microbiota_ranking';

function TimedQuiz({ lang, isMobile }) {
  const [phase, setPhase] = useState('start'); // start | playing | finished
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [ranking, setRanking] = useState(() => { try { return JSON.parse(localStorage.getItem(LOCAL_RANKING_KEY) || '[]'); } catch { return []; } });
  const timerRef = useState(null);

  useEffect(() => {
    if (phase !== 'playing' || answered) return;
    if (timeLeft <= 0) { handleAnswer(null); return; }
    const t = setTimeout(() => setTimeLeft(tl => tl - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft, answered]);

  const startGame = () => {
    setQIdx(0); setScore(0); setSelected(null); setAnswered(false);
    setTimeLeft(INITIAL_TIME); setPhase('playing');
  };

  const handleAnswer = (opt) => {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    const q = TIMED_QUESTIONS[qIdx];
    const isCorrect = opt && opt.correct;
    const timeBonus = Math.floor(timeLeft * 2);
    if (isCorrect) setScore(s => s + 10 + timeBonus);
    setTimeout(() => {
      if (qIdx + 1 < TIMED_QUESTIONS.length) {
        setQIdx(i => i + 1);
        setSelected(null);
        setAnswered(false);
        setTimeLeft(INITIAL_TIME);
      } else {
        setPhase('finished');
      }
    }, 1000);
  };

  const saveScore = () => {
    const name = playerName.trim() || (lang === 'es' ? 'Anónimo' : 'Anonymous');
    const entry = { name, score, date: new Date().toLocaleDateString() };
    const newRanking = [...ranking, entry].sort((a, b) => b.score - a.score).slice(0, 10);
    setRanking(newRanking);
    try { localStorage.setItem(LOCAL_RANKING_KEY, JSON.stringify(newRanking)); } catch {}
    setPhase('ranking');
  };

  const timerPct = (timeLeft / INITIAL_TIME) * 100;
  const timerColor = timeLeft > 8 ? '#4ade80' : timeLeft > 4 ? '#fbbf24' : '#f87171';

  return (
    <div style={{ borderRadius: '30px', background: 'linear-gradient(135deg, #fff7ed, #ffedd5)', border: '1px solid #fed7aa', padding: isMobile ? '20px' : '32px', boxShadow: '0 20px 60px -10px rgba(251,146,60,0.2)' }}>
      <h3 style={{ margin: '0 0 4px 0', fontWeight: '900', fontSize: isMobile ? '1.1rem' : '1.3rem', color: '#7c2d12', display: 'flex', alignItems: 'center', gap: '10px' }}>
        ⏱️ {lang === 'es' ? 'Quiz Contrarreloj' : 'Speed Quiz'}
      </h3>

      {phase === 'start' && (
        <div style={{ textAlign: 'center', paddingTop: '16px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '12px' }}>🏆</div>
          <p style={{ fontSize: '0.85rem', color: '#92400e', fontWeight: '600', marginBottom: '20px', lineHeight: 1.5 }}>
            {lang === 'es' ? `${TIMED_QUESTIONS.length} preguntas · ${INITIAL_TIME}s por pregunta · Puntos extra por rapidez` : `${TIMED_QUESTIONS.length} questions · ${INITIAL_TIME}s per question · Bonus points for speed`}
          </p>
          <input
            placeholder={lang === 'es' ? 'Tu nombre (opcional)' : 'Your name (optional)'}
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid #fed7aa', marginBottom: '12px', fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box' }}
          />
          <button onClick={startGame} style={{ width: '100%', padding: '14px', borderRadius: '14px', border: 'none', background: 'linear-gradient(135deg, #f97316, #ea580c)', color: 'white', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 20px rgba(249,115,22,0.4)' }}>
            🚀 {lang === 'es' ? '¡Comenzar!' : 'Start!'}
          </button>
          {ranking.length > 0 && (
            <button onClick={() => setPhase('ranking')} style={{ marginTop: '8px', width: '100%', padding: '10px', borderRadius: '12px', border: '1.5px solid #fed7aa', background: 'white', fontWeight: '800', color: '#92400e', cursor: 'pointer', fontSize: '0.8rem' }}>
              🏅 {lang === 'es' ? 'Ver Ranking' : 'View Ranking'}
            </button>
          )}
        </div>
      )}

      {phase === 'playing' && (
        <div>
          {/* Timer bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ flex: 1, background: '#f1f5f9', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${timerPct}%`, background: timerColor, borderRadius: '10px', transition: 'width 1s linear, background 0.3s', boxShadow: `0 0 8px ${timerColor}88` }} />
            </div>
            <div style={{ fontWeight: '900', fontSize: '1.1rem', color: timerColor, minWidth: '28px', textAlign: 'right' }}>{timeLeft}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#92400e', fontWeight: '700', marginBottom: '14px' }}>
            <span>{lang === 'es' ? 'Pregunta' : 'Question'} {qIdx + 1}/{TIMED_QUESTIONS.length}</span>
            <span>⭐ {score} pts</span>
          </div>
          <p style={{ fontWeight: '800', fontSize: isMobile ? '0.9rem' : '1rem', color: '#1e293b', lineHeight: 1.5, marginBottom: '16px' }}>
            {TIMED_QUESTIONS[qIdx].q[lang]}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {TIMED_QUESTIONS[qIdx].opts.map((opt, i) => {
              let bg = 'white'; let border = '1.5px solid #e2e8f0'; let color = '#1e293b';
              if (answered) {
                if (opt.correct) { bg = '#dcfce7'; border = '1.5px solid #4ade80'; color = '#15803d'; }
                else if (selected === opt) { bg = '#fee2e2'; border = '1.5px solid #f87171'; color = '#dc2626'; }
              } else if (selected === opt) { bg = '#dbeafe'; border = '1.5px solid #60a5fa'; }
              return (
                <button key={i} onClick={() => handleAnswer(opt)} disabled={answered}
                  style={{ padding: '12px 14px', borderRadius: '12px', border, background: bg, color, fontWeight: '700', fontSize: '0.82rem', cursor: answered ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                  {answered && opt.correct ? '✅ ' : answered && selected === opt && !opt.correct ? '❌ ' : ''}{opt.t[lang]}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {phase === 'finished' && (
        <div style={{ textAlign: 'center', paddingTop: '10px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🎯</div>
          <h4 style={{ color: '#7c2d12', margin: '0 0 4px 0' }}>{lang === 'es' ? '¡Tiempo agotado!' : 'Time\'s Up!'}</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#ea580c', marginBottom: '4px' }}>{score}</div>
          <div style={{ fontSize: '0.7rem', color: '#92400e', marginBottom: '20px' }}>{lang === 'es' ? 'puntos finales' : 'final points'}</div>
          <input
            placeholder={lang === 'es' ? 'Tu nombre para el ranking' : 'Your name for the ranking'}
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #fed7aa', marginBottom: '10px', fontSize: '0.85rem', fontFamily: 'inherit', boxSizing: 'border-box' }}
          />
          <button onClick={saveScore} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #f97316, #ea580c)', color: 'white', fontWeight: '900', cursor: 'pointer', marginBottom: '8px' }}>
            💾 {lang === 'es' ? 'Guardar Puntuación' : 'Save Score'}
          </button>
          <button onClick={startGame} style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1.5px solid #fed7aa', background: 'white', fontWeight: '800', color: '#92400e', cursor: 'pointer', fontSize: '0.85rem' }}>
            🔄 {lang === 'es' ? 'Jugar de nuevo' : 'Play Again'}
          </button>
        </div>
      )}

      {phase === 'ranking' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h4 style={{ margin: 0, color: '#7c2d12', fontWeight: '900' }}>🏅 {lang === 'es' ? 'Ranking Local' : 'Local Ranking'}</h4>
            <button onClick={() => setPhase('start')} style={{ padding: '6px 12px', borderRadius: '10px', border: '1.5px solid #fed7aa', background: 'white', cursor: 'pointer', fontWeight: '800', fontSize: '0.7rem', color: '#92400e' }}>← {lang === 'es' ? 'Volver' : 'Back'}</button>
          </div>
          {ranking.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#92400e', fontSize: '0.85rem' }}>{lang === 'es' ? 'Aún no hay puntuaciones' : 'No scores yet'}</p>
          ) : ranking.map((entry, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '12px', background: i === 0 ? '#fef3c7' : 'white', marginBottom: '6px', border: '1px solid #fed7aa' }}>
              <div style={{ fontSize: '1.2rem', minWidth: '28px', textAlign: 'center' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}</div>
              <div style={{ flex: 1, fontWeight: '800', fontSize: '0.85rem' }}>{entry.name}</div>
              <div style={{ fontWeight: '900', color: '#ea580c' }}>{entry.score} pts</div>
              <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{entry.date}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// 🔬 6. MICROSCOPIO VIRTUAL — BACTERIAS ULTRA-REALISTAS
// ============================================================
const MICROSCOPE_BACTERIA = [
  {
    id: 'lacto', name: 'Lactobacillus rhamnosus', shape: 'rod', color: '#4ade80', gram: '+', size: 12,
    desc: { es: 'Bacilo Gram+ de 2–4 μm. Forma cadenas. Produce ácido láctico L(+). El probiótico más estudiado del mundo (cepa GG). Produce GABA con efecto ansiolítico.', en: 'Gram+ rod of 2–4 μm. Forms chains. Produces L(+) lactic acid. World\'s most studied probiotic (GG strain). Produces GABA with anxiolytic effect.' },
    // realistic chain of rods with membrane texture, septa, cytoplasm gradient
    svg: (c) => `
      <defs>
        <radialGradient id="rg1a" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.55"/>
          <stop offset="55%" stop-color="${c}" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="${c}" stop-opacity="1"/>
        </radialGradient>
        <filter id="f1"><feGaussianBlur stdDeviation="0.6"/></filter>
      </defs>
      <!-- Cell wall halo -->
      <rect x="8" y="30" width="38" height="18" rx="9" fill="${c}" opacity="0.18" filter="url(#f1)"/>
      <rect x="30" y="27" width="38" height="18" rx="9" fill="${c}" opacity="0.15" filter="url(#f1)"/>
      <rect x="52" y="30" width="38" height="18" rx="9" fill="${c}" opacity="0.12" filter="url(#f1)"/>
      <!-- Rod 1 -->
      <rect x="9" y="32" width="36" height="14" rx="7" fill="url(#rg1a)"/>
      <rect x="9" y="32" width="36" height="14" rx="7" fill="none" stroke="${c}" stroke-width="1.2" opacity="0.7"/>
      <line x1="27" y1="33" x2="27" y2="45" stroke="white" stroke-width="0.8" opacity="0.35"/>
      <ellipse cx="17" cy="39" rx="5" ry="3.5" fill="white" opacity="0.15"/>
      <!-- Septum 1→2 -->
      <line x1="45" y1="34" x2="45" y2="44" stroke="${c}" stroke-width="1.5" opacity="0.5"/>
      <!-- Rod 2 -->
      <rect x="31" y="29" width="36" height="14" rx="7" fill="url(#rg1a)"/>
      <rect x="31" y="29" width="36" height="14" rx="7" fill="none" stroke="${c}" stroke-width="1.2" opacity="0.7"/>
      <line x1="49" y1="30" x2="49" y2="42" stroke="white" stroke-width="0.8" opacity="0.35"/>
      <ellipse cx="39" cy="36" rx="5" ry="3.5" fill="white" opacity="0.15"/>
      <!-- Septum 2→3 -->
      <line x1="67" y1="31" x2="67" y2="41" stroke="${c}" stroke-width="1.5" opacity="0.5"/>
      <!-- Rod 3 -->
      <rect x="53" y="32" width="36" height="14" rx="7" fill="url(#rg1a)"/>
      <rect x="53" y="32" width="36" height="14" rx="7" fill="none" stroke="${c}" stroke-width="1.2" opacity="0.7"/>
      <line x1="71" y1="33" x2="71" y2="45" stroke="white" stroke-width="0.8" opacity="0.35"/>
      <ellipse cx="61" cy="39" rx="5" ry="3.5" fill="white" opacity="0.15"/>
      <!-- Flagella (peritrichous) -->
      <path d="M12 32 Q5 22 14 14 Q22 6 10 2" stroke="${c}" stroke-width="0.9" fill="none" opacity="0.5"/>
      <path d="M78 32 Q85 20 78 12 Q71 4 80 0" stroke="${c}" stroke-width="0.9" fill="none" opacity="0.45"/>
      <path d="M45 43 Q52 55 44 62 Q36 69 48 75" stroke="${c}" stroke-width="0.9" fill="none" opacity="0.45"/>`,
  },
  {
    id: 'bifido', name: 'Bifidobacterium infantis', shape: 'bifid', color: '#38bdf8', gram: '+', size: 10,
    desc: { es: 'Bacilo Gram+ bifurcado en Y. Domina la microbiota del lactante. Hidroliza HMO de la leche materna. Programa el sistema inmune neonatal.', en: 'Y-shaped Gram+ rod. Dominates infant microbiota. Hydrolyzes breast milk HMOs. Programs the neonatal immune system.' },
    svg: (c) => `
      <defs>
        <linearGradient id="bifg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="${c}" stop-opacity="1"/>
        </linearGradient>
        <filter id="bf"><feGaussianBlur stdDeviation="0.8"/></filter>
      </defs>
      <!-- Glow halo -->
      <path d="M50 90 L50 50 L28 18" stroke="${c}" stroke-width="20" stroke-linecap="round" fill="none" opacity="0.12" filter="url(#bf)"/>
      <path d="M50 50 L72 18" stroke="${c}" stroke-width="20" stroke-linecap="round" fill="none" opacity="0.1" filter="url(#bf)"/>
      <!-- Main stem -->
      <path d="M50 88 L50 50" stroke="url(#bifg)" stroke-width="12" stroke-linecap="round" fill="none"/>
      <path d="M50 88 L50 50" stroke="${c}" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.9"/>
      <!-- Left arm -->
      <path d="M50 50 L29 20" stroke="url(#bifg)" stroke-width="11" stroke-linecap="round" fill="none"/>
      <path d="M50 50 L29 20" stroke="${c}" stroke-width="11" stroke-linecap="round" fill="none" opacity="0.85"/>
      <!-- Right arm -->
      <path d="M50 50 L71 20" stroke="url(#bifg)" stroke-width="11" stroke-linecap="round" fill="none"/>
      <path d="M50 50 L71 20" stroke="${c}" stroke-width="11" stroke-linecap="round" fill="none" opacity="0.85"/>
      <!-- Highlight streaks -->
      <path d="M47 85 L47 52" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.35"/>
      <path d="M47 48 L31 23" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
      <path d="M53 48 L69 23" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
      <!-- Nucleoid -->
      <ellipse cx="50" cy="68" rx="4" ry="7" fill="white" opacity="0.2"/>
      <!-- Second bacterium -->
      <path d="M75 95 L75 62 L60 38" stroke="${c}" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.55"/>
      <path d="M75 62 L88 38" stroke="${c}" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.5"/>`,
  },
  {
    id: 'akkerm', name: 'Akkermansia muciniphila', shape: 'coccus', color: '#fb923c', gram: '-', size: 9,
    desc: { es: 'Coco Gram− oval de ~1 μm. Anaerobio estricto. Único habitante estable de la capa de mucina. Alta correlación con menor obesidad y mejor control glucémico.', en: 'Oval Gram− coccus of ~1 μm. Strict anaerobe. Only stable inhabitant of the mucin layer. High correlation with less obesity and better glycemic control.' },
    svg: (c) => `
      <defs>
        <radialGradient id="akg1" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.6"/>
          <stop offset="50%" stop-color="${c}" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="${c}" stop-opacity="1"/>
        </radialGradient>
        <radialGradient id="akg2" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="${c}" stop-opacity="0.95"/>
        </radialGradient>
        <filter id="akf"><feGaussianBlur stdDeviation="1"/></filter>
      </defs>
      <!-- Mucin layer suggestion -->
      <ellipse cx="50" cy="60" rx="46" ry="36" fill="${c}" opacity="0.06" filter="url(#akf)"/>
      <!-- Outer membrane highlight ring (Gram−) -->
      <ellipse cx="50" cy="57" rx="28" ry="24" fill="none" stroke="${c}" stroke-width="2.5" opacity="0.3"/>
      <!-- Main coccus -->
      <ellipse cx="50" cy="57" rx="24" ry="20" fill="url(#akg1)"/>
      <ellipse cx="50" cy="57" rx="24" ry="20" fill="none" stroke="${c}" stroke-width="1.5" opacity="0.8"/>
      <!-- Specular highlight -->
      <ellipse cx="43" cy="49" rx="8" ry="6" fill="white" opacity="0.3"/>
      <!-- Nucleoid -->
      <ellipse cx="50" cy="59" rx="8" ry="6" fill="${c}" opacity="0.35"/>
      <!-- Second coccus -->
      <ellipse cx="78" cy="38" rx="18" ry="15" fill="url(#akg2)"/>
      <ellipse cx="78" cy="38" rx="18" ry="15" fill="none" stroke="${c}" stroke-width="1.2" opacity="0.7"/>
      <ellipse cx="72" cy="32" rx="5" ry="4" fill="white" opacity="0.28"/>
      <!-- Third coccus (smaller) -->
      <ellipse cx="24" cy="36" rx="14" ry="12" fill="url(#akg2)" opacity="0.85"/>
      <ellipse cx="24" cy="36" rx="14" ry="12" fill="none" stroke="${c}" stroke-width="1" opacity="0.6"/>
      <ellipse cx="20" cy="31" rx="4" ry="3" fill="white" opacity="0.25"/>`,
  },
  {
    id: 'cdiff', name: 'Clostridioides difficile', shape: 'spore', color: '#f87171', gram: '+', size: 14,
    desc: { es: 'Bacilo Gram+ formador de esporas subterminal. Esporas resistentes a calor, alcohol y desinfectantes. Produce toxinas A y B que destruyen el epitelio intestinal.', en: 'Subterminal spore-forming Gram+ rod. Spores resistant to heat, alcohol and disinfectants. Produces toxins A and B that destroy the intestinal epithelium.' },
    svg: (c) => `
      <defs>
        <radialGradient id="cdg1" cx="38%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="${c}" stop-opacity="1"/>
        </radialGradient>
        <radialGradient id="cdg2" cx="35%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#fef2f2" stop-opacity="0.9"/>
          <stop offset="60%" stop-color="${c}" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#991b1b" stop-opacity="1"/>
        </radialGradient>
        <filter id="cdf"><feGaussianBlur stdDeviation="0.7"/></filter>
      </defs>
      <!-- Halo -->
      <rect x="10" y="36" width="58" height="22" rx="11" fill="${c}" opacity="0.15" filter="url(#cdf)"/>
      <!-- Vegetative rod body -->
      <rect x="12" y="38" width="54" height="18" rx="9" fill="url(#cdg1)"/>
      <rect x="12" y="38" width="54" height="18" rx="9" fill="none" stroke="${c}" stroke-width="1.3" opacity="0.75"/>
      <!-- Internal organelles hint -->
      <ellipse cx="30" cy="47" rx="7" ry="5" fill="white" opacity="0.18"/>
      <ellipse cx="48" cy="47" rx="5" ry="4" fill="${c}" opacity="0.3"/>
      <!-- Spore (subterminal swelling) -->
      <ellipse cx="73" cy="47" rx="16" ry="19" fill="url(#cdg2)"/>
      <ellipse cx="73" cy="47" rx="16" ry="19" fill="none" stroke="#991b1b" stroke-width="2" opacity="0.7"/>
      <!-- Spore cortex ring -->
      <ellipse cx="73" cy="47" rx="11" ry="13" fill="none" stroke="#fca5a5" stroke-width="1.5" opacity="0.5"/>
      <!-- Spore core -->
      <ellipse cx="73" cy="47" rx="6" ry="7" fill="#fca5a5" opacity="0.4"/>
      <!-- Spore highlight -->
      <ellipse cx="68" cy="41" rx="4" ry="5" fill="white" opacity="0.3"/>
      <!-- Second bacterium below -->
      <rect x="20" y="64" width="48" height="16" rx="8" fill="url(#cdg1)" opacity="0.7"/>
      <rect x="20" y="64" width="48" height="16" rx="8" fill="none" stroke="${c}" stroke-width="1" opacity="0.5"/>
      <ellipse cx="74" cy="72" rx="13" ry="15" fill="${c}" opacity="0.55"/>
      <ellipse cx="74" cy="72" rx="13" ry="15" fill="none" stroke="#991b1b" stroke-width="1.5" opacity="0.5"/>`,
  },
  {
    id: 'helico', name: 'Helicobacter pylori', shape: 'helix', color: '#c084fc', gram: '-', size: 8,
    desc: { es: 'Bacilo Gram− espiral de 3–5 μm con 4–6 flagelos monopolares en penacho. Ureasa neutraliza el ácido gástrico (pH 1–3). Coloniza al 50% de la humanidad.', en: 'Spiral Gram− rod of 3–5 μm with 4–6 monopolar flagella in a tuft. Urease neutralizes gastric acid (pH 1–3). Colonizes 50% of humanity.' },
    svg: (c) => `
      <defs>
        <linearGradient id="hlg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="${c}" stop-opacity="1"/>
        </linearGradient>
        <filter id="hlf"><feGaussianBlur stdDeviation="1.2"/></filter>
      </defs>
      <!-- Outer membrane (Gram−) glow -->
      <path d="M12 62 Q28 28 52 50 Q76 72 88 36" stroke="${c}" stroke-width="20" stroke-linecap="round" fill="none" opacity="0.1" filter="url(#hlf)"/>
      <!-- Periplasmic space hint -->
      <path d="M12 62 Q28 28 52 50 Q76 72 88 36" stroke="#e9d5ff" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.4"/>
      <!-- Main helical body -->
      <path d="M12 62 Q28 28 52 50 Q76 72 88 36" stroke="url(#hlg)" stroke-width="9" stroke-linecap="round" fill="none"/>
      <path d="M12 62 Q28 28 52 50 Q76 72 88 36" stroke="${c}" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.9"/>
      <!-- Highlight on helix -->
      <path d="M15 60 Q30 32 52 51" stroke="white" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.35"/>
      <!-- Flagellar tuft (4 flagella at one pole) -->
      <path d="M87 35 Q98 22 94 10" stroke="${c}" stroke-width="1.8" fill="none" opacity="0.7"/>
      <path d="M87 35 Q100 28 100 14" stroke="${c}" stroke-width="1.5" fill="none" opacity="0.6"/>
      <path d="M87 35 Q102 34 105 20" stroke="${c}" stroke-width="1.4" fill="none" opacity="0.55"/>
      <path d="M87 35 Q98 38 100 24" stroke="${c}" stroke-width="1.3" fill="none" opacity="0.5"/>
      <!-- Flagella tips -->
      <circle cx="94" cy="10" r="1.5" fill="${c}" opacity="0.7"/>
      <circle cx="100" cy="14" r="1.5" fill="${c}" opacity="0.6"/>
      <circle cx="105" cy="20" r="1.5" fill="${c}" opacity="0.55"/>
      <!-- Second helix (faded) -->
      <path d="M8 80 Q22 50 44 68 Q66 86 78 55" stroke="${c}" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.3"/>`,
  },
  {
    id: 'faecali', name: 'Faecalibacterium prausnitzii', shape: 'rod', color: '#34d399', gram: '+', size: 11,
    desc: { es: 'Bacilo Gram+ de 2–5 μm. Produce el 20% del butirato colónico total. Marcador de salud intestinal. Extremadamente sensible al oxígeno (muere en minutos).', en: 'Gram+ rod of 2–5 μm. Produces 20% of total colonic butyrate. Marker of gut health. Extremely oxygen-sensitive (dies within minutes).' },
    svg: (c) => `
      <defs>
        <radialGradient id="fpg" cx="38%" cy="28%" r="65%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.6"/>
          <stop offset="55%" stop-color="${c}" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#059669" stop-opacity="1"/>
        </radialGradient>
        <filter id="fpf"><feGaussianBlur stdDeviation="0.8"/></filter>
      </defs>
      <!-- Halo -->
      <rect x="18" y="35" width="70" height="28" rx="14" fill="${c}" opacity="0.15" filter="url(#fpf)"/>
      <!-- Main rod body -->
      <rect x="20" y="37" width="66" height="24" rx="12" fill="url(#fpg)"/>
      <rect x="20" y="37" width="66" height="24" rx="12" fill="none" stroke="#059669" stroke-width="1.5" opacity="0.75"/>
      <!-- Peptidoglycan thickness (Gram+) inner membrane -->
      <rect x="23" y="40" width="60" height="18" rx="9" fill="none" stroke="#6ee7b7" stroke-width="1" opacity="0.4"/>
      <!-- Nucleoid region -->
      <ellipse cx="53" cy="49" rx="16" ry="7" fill="${c}" opacity="0.25"/>
      <!-- Specular highlight -->
      <ellipse cx="40" cy="42" rx="12" ry="5" fill="white" opacity="0.3"/>
      <!-- Peritrichous flagella -->
      <path d="M30 37 Q22 26 28 16 Q34 7 26 2" stroke="${c}" stroke-width="1" fill="none" opacity="0.6"/>
      <path d="M50 37 Q44 24 50 14 Q56 5 48 0" stroke="${c}" stroke-width="1" fill="none" opacity="0.55"/>
      <path d="M70 37 Q76 24 70 14 Q64 5 72 0" stroke="${c}" stroke-width="1" fill="none" opacity="0.55"/>
      <path d="M30 61 Q22 72 28 82 Q34 91 26 96" stroke="${c}" stroke-width="1" fill="none" opacity="0.55"/>
      <path d="M55 61 Q50 74 56 84 Q62 93 54 98" stroke="${c}" stroke-width="1" fill="none" opacity="0.5"/>
      <path d="M75 61 Q80 72 76 82 Q72 91 80 96" stroke="${c}" stroke-width="1" fill="none" opacity="0.5"/>
      <!-- Dividing cell (binary fission) -->
      <rect x="22" y="68" width="62" height="20" rx="10" fill="${c}" opacity="0.45"/>
      <rect x="22" y="68" width="62" height="20" rx="10" fill="none" stroke="#059669" stroke-width="1" opacity="0.55"/>
      <line x1="53" y1="69" x2="53" y2="87" stroke="#059669" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.5"/>`,
  },
];

function VirtualMicroscope({ lang, isMobile }) {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(40);
  const [brightness, setBrightness] = useState(70);
  const [contrast, setContrast] = useState(50);
  const [stain, setStain] = useState('gram'); // gram | fluorescent | neutral

  const bact = MICROSCOPE_BACTERIA[selected];
  const stainColors = {
    gram: bact.gram === '+' ? '#7c3aed' : '#ef4444',
    fluorescent: bact.color,
    neutral: '#94a3b8',
  };
  const bgColors = { gram: '#fdf4ff', fluorescent: '#0f172a', neutral: '#f8fafc' };
  const displayColor = stainColors[stain];
  const bgColor = bgColors[stain];
  const zoomScale = zoom / 40;

  const viewSize = isMobile ? 220 : 270;

  return (
    <div style={{ borderRadius: '30px', background: '#1c1917', padding: isMobile ? '16px' : '32px', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.5)' }}>
      <h3 style={{ margin: '0 0 4px 0', fontWeight: '900', fontSize: isMobile ? '1.1rem' : '1.3rem', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
        🔬 {lang === 'es' ? 'Microscopio Virtual' : 'Virtual Microscope'}
      </h3>
      <p style={{ margin: '0 0 14px 0', fontSize: '0.72rem', color: '#78716c', fontWeight: '600' }}>
        {lang === 'es' ? 'Morfología bacteriana ultra-realista · Laboratorio clínico virtual' : 'Ultra-realistic bacterial morphology · Virtual clinical lab'}
      </p>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', alignItems: isMobile ? 'center' : 'flex-start' }}>

        {/* ── Microscope viewer ── */}
        <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          {/* Outer barrel ring */}
          <div style={{
            width: viewSize + 28, height: viewSize + 28,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #57534e, #292524)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 5px #1c1917, 0 8px 40px rgba(0,0,0,0.7)',
          }}>
            {/* Inner objective ring */}
            <div style={{
              width: viewSize + 12, height: viewSize + 12,
              borderRadius: '50%',
              background: 'linear-gradient(225deg, #44403c, #1c1917)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.6)',
            }}>
              {/* Lens viewport */}
              <div style={{
                width: viewSize, height: viewSize,
                borderRadius: '50%',
                overflow: 'hidden',
                background: bgColor,
                position: 'relative',
                transition: 'background 0.4s',
                boxShadow: stain === 'fluorescent'
                  ? `inset 0 0 60px rgba(0,0,0,0.95), inset 0 0 20px ${bact.color}22`
                  : `inset 0 0 40px rgba(0,0,0,0.12)`,
              }}>
                {/* Vignette */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 55%, rgba(0,0,0,0.22) 100%)', zIndex: 3, pointerEvents: 'none' }}/>
                {/* Crosshair */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '8%', right: '8%', height: '1px', background: stain === 'fluorescent' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)' }}/>
                  <div style={{ position: 'absolute', left: '50%', top: '8%', bottom: '8%', width: '1px', background: stain === 'fluorescent' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)' }}/>
                </div>
                {/* Bacteria SVG — zoom + brightness/contrast */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: `scale(${zoomScale})`,
                  transition: 'transform 0.35s cubic-bezier(.4,0,.2,1)',
                  filter: `contrast(${0.75 + contrast / 100}) brightness(${0.45 + brightness / 100})`,
                }}>
                  <svg viewBox="0 0 110 110" width="90%" height="90%"
                    dangerouslySetInnerHTML={{ __html: bact.svg(displayColor) }}/>
                </div>
                {/* Fluorescent scan lines */}
                {stain === 'fluorescent' && (
                  <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,200,80,0.025) 4px)', zIndex: 5, pointerEvents: 'none' }}/>
                )}
                {/* Gram stain tint overlay */}
                {stain === 'gram' && (
                  <div style={{ position: 'absolute', inset: 0, background: bact.gram === '+' ? 'rgba(124,58,237,0.04)' : 'rgba(239,68,68,0.04)', zIndex: 2, pointerEvents: 'none' }}/>
                )}
              </div>
            </div>
          </div>
          {/* Objective label */}
          <div style={{ fontSize: '0.58rem', color: '#78716c', fontWeight: '700', textAlign: 'center', letterSpacing: '0.04em' }}>
            {lang === 'es' ? `Objetivo ×${zoom}` : `Objective ×${zoom}`} &nbsp;·&nbsp; {stain === 'gram' ? `Gram ${bact.gram}` : stain === 'fluorescent' ? (lang === 'es' ? 'Fluoresc.' : 'Fluoresc.') : (lang === 'es' ? 'Neutro' : 'Neutral')}
          </div>
        </div>

        {/* ── Controls + Info ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0, width: isMobile ? '100%' : 'auto' }}>
          {/* Stain selector */}
          <div>
            <div style={{ fontSize: '0.58rem', color: '#78716c', fontWeight: '800', marginBottom: '6px', letterSpacing: '0.06em' }}>{lang === 'es' ? 'TIPO DE TINCIÓN' : 'STAIN TYPE'}</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[['gram','Gram'],['fluorescent', lang === 'es' ? 'Fluoresc.' : 'Fluoresc.'],['neutral', lang === 'es' ? 'Neutro' : 'Neutral']].map(([k,l]) => (
                <button key={k} onClick={() => setStain(k)} style={{
                  flex: 1, padding: '7px 4px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  fontWeight: '800', fontSize: '0.65rem',
                  background: stain === k ? 'white' : 'rgba(255,255,255,0.07)',
                  color: stain === k ? '#1c1917' : '#78716c',
                  transition: 'all 0.2s',
                  boxShadow: stain === k ? '0 2px 8px rgba(0,0,0,0.4)' : 'none',
                }}>{l}</button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          {[
            { label: { es: 'Zoom', en: 'Zoom' }, val: zoom, set: setZoom, min: 10, max: 100, unit: '×' },
            { label: { es: 'Brillo', en: 'Brightness' }, val: brightness, set: setBrightness, min: 10, max: 100, unit: '%' },
            { label: { es: 'Contraste', en: 'Contrast' }, val: contrast, set: setContrast, min: 0, max: 100, unit: '%' },
          ].map(ctrl => (
            <div key={ctrl.label.es}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', color: '#78716c', fontWeight: '800', marginBottom: '4px' }}>
                <span>{ctrl.label[lang]}</span>
                <span style={{ color: 'white' }}>{ctrl.val}{ctrl.unit}</span>
              </div>
              <input type="range" min={ctrl.min} max={ctrl.max} value={ctrl.val}
                onChange={e => ctrl.set(Number(e.target.value))}
                style={{ width: '100%', accentColor: bact.color, cursor: 'pointer' }}/>
            </div>
          ))}

          {/* Bacteria info card */}
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '12px', border: `1px solid ${bact.color}44`, flex: 1 }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
              <div style={{ fontStyle: 'italic', fontWeight: '900', color: 'white', fontSize: '0.8rem', lineHeight: 1.3 }}>{bact.name}</div>
              <div style={{ padding: '2px 8px', borderRadius: '8px', background: bact.gram === '+' ? '#7c3aed33' : '#ef444433', color: bact.gram === '+' ? '#c4b5fd' : '#fca5a5', fontWeight: '800', fontSize: '0.55rem', whiteSpace: 'nowrap' }}>
                Gram {bact.gram}
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '0.7rem', color: '#a8a29e', lineHeight: 1.55 }}>{bact.desc[lang]}</p>
          </div>
        </div>
      </div>

      {/* ── Bacteria selector ── */}
      <div style={{ display: 'flex', gap: '6px', marginTop: '16px', overflowX: 'auto', paddingBottom: '4px', WebkitOverflowScrolling: 'touch' }}>
        {MICROSCOPE_BACTERIA.map((b, i) => (
          <button key={b.id} onClick={() => setSelected(i)} style={{
            flex: '0 0 auto', padding: '7px 13px', borderRadius: '10px',
            border: `1.5px solid ${selected === i ? b.color : 'rgba(255,255,255,0.08)'}`,
            background: selected === i ? `${b.color}22` : 'rgba(255,255,255,0.04)',
            color: selected === i ? b.color : '#78716c',
            cursor: 'pointer', fontWeight: '700', fontSize: '0.62rem',
            whiteSpace: 'nowrap', transition: 'all 0.2s',
            boxShadow: selected === i ? `0 0 12px ${b.color}44` : 'none',
          }}>
            {b.name.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================

function App() {
  const [lang, setLang] = useState('es'); // Controlador de idioma global
  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState('clinical');
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width < 768;

  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [availableFoods, setAvailableFoods] = useState(initialFoods);
  const [eubiosisZone, setEubiosisZone] = useState([]);
  const [dysbiosisZone, setDysbiosisZone] = useState([]);
  const [gameMessage, setGameMessage] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);

  const cardStyle = { 
    background: 'rgba(255, 255, 255, 0.85)', 
    backdropFilter: 'blur(16px)', 
    borderRadius: '30px', 
    padding: isMobile ? '20px' : '35px', 
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)',
    border: '1px solid rgba(255,255,255,0.4)' 
  };

  const handleAnswer = (value) => {
    const newScore = quizScore + value;
    if (quizStep + 1 < quizQuestions.length) { 
      setQuizScore(newScore); 
      setQuizStep(quizStep + 1); 
    } else { 
      setQuizScore(newScore); 
      setQuizFinished(true); 
    }
  };

  const moveFood = (food, targetZone) => {
    setAvailableFoods(prev => prev.filter(f => f.id !== food.id));
    setEubiosisZone(prev => prev.filter(f => f.id !== food.id));
    setDysbiosisZone(prev => prev.filter(f => f.id !== food.id));

    const isCorrect = (targetZone === 'eubiosis' && food.type === 'good') || (targetZone === 'dysbiosis' && food.type === 'bad');
    
    if (targetZone !== 'available') {
      const successMsg = lang === 'es' ? `✅ ¡Correcto! ${food.name.es}` : `✅ Correct! ${food.name.en}`;
      const errorMsg = lang === 'es' ? `⚠️ ${food.name.es} no va ahí` : `⚠️ ${food.name.en} doesn't go there`;
      setGameMessage(isCorrect ? successMsg : errorMsg);
    }

    if (targetZone === 'eubiosis') setEubiosisZone(prev => [...prev, food]);
    else if (targetZone === 'dysbiosis') setDysbiosisZone(prev => [...prev, food]);
    else setAvailableFoods(prev => [...prev, food]);
    
    setSelectedFood(null); 
  };

  const IconoActual = stages[current].icon;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#e2e8f0', color: '#0f172a', fontFamily: 'sans-serif' }}>
      
      {/* NAVBAR */}
      <nav style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(20px)', padding: isMobile ? '15px' : '20px 50px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Dna color="#2563eb" size={28} />
          <h1 style={{ fontSize: isMobile ? '1.2rem' : '1.6rem', margin: 0, fontWeight: '900' }}>Microbiota <span style={{ color: '#2563eb' }}>ProMax</span></h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569' }}>
            {lang === 'es' ? 'Dashboard • Facultad de Enfermería' : 'Dashboard • Nursing School'}
          </div>
          <button 
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '15px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}
          >
            <Globe size={16} /> {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: isMobile ? '20px auto' : '40px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* CICLO VITAL - AHORA CON IMAGEN INTEGRADA EN EL DISEÑO */}
        <div style={{ ...cardStyle, background: stages[current].color, overflow: 'hidden', padding: 0 }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
            
            <div style={{ flex: '1', minHeight: isMobile ? '200px' : 'auto' }}>
              <img src={stages[current].img} alt="Stage" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ flex: '1.5', padding: isMobile ? '20px' : '35px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ background: 'white', padding: '15px', borderRadius: '20px' }}>
                  <IconoActual size={35} color="#2563eb" />
                </div>
                <div>
                  <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', margin: 0, fontWeight: '900' }}>{stages[current].title[lang]}</h2>
                  <span style={{ color: '#1d4ed8', fontWeight: '800' }}>{stages[current].subtitle[lang]}</span>
                </div>
              </div>
              
              <p style={{ fontSize: '1.1rem', margin: '20px 0', lineHeight: '1.6' }}>{stages[current].desc[lang]}</p>

              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px', marginBottom: '20px' }}>
                {['clinical', 'nursing', 'pathology'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: '12px', borderRadius: '15px', border: 'none', background: activeTab === tab ? '#1e293b' : 'rgba(255,255,255,0.5)', color: activeTab === tab ? 'white' : '#475569', fontWeight: '800', cursor: 'pointer' }}>
                    {tab === 'clinical' ? (lang === 'es' ? '🩺 Clínica' : '🩺 Clinical') : 
                     tab === 'nursing' ? (lang === 'es' ? '👩‍⚕️ Enfermería' : '👩‍⚕️ Nursing') : 
                     (lang === 'es' ? '🦠 Fisiopatología' : '🦠 Pathology')}
                  </button>
                ))}
              </div>

              <div style={{ background: 'white', padding: '20px', borderRadius: '20px', minHeight: '120px', lineHeight: '1.5' }}>
                {activeTab === 'clinical' && <div><strong>{lang === 'es' ? 'Marcador:' : 'Marker:'}</strong> {stages[current].marker}<br/><br/>{stages[current].clinical[lang]}</div>}
                {activeTab === 'nursing' && <div>{stages[current].nursing[lang]}</div>}
                {activeTab === 'pathology' && <div>{stages[current].pathology[lang]}</div>}
              </div>

              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button onClick={() => setCurrent(c => (c - 1 + 4) % 4)} style={{ padding: '15px', borderRadius: '15px', border: 'none', background: 'white', cursor: 'pointer' }}><ChevronLeft/></button>
                <button onClick={() => setCurrent(c => (c + 1) % 4)} style={{ flex: 1, padding: '15px', borderRadius: '15px', border: 'none', background: '#0f172a', color: 'white', fontWeight: '800', cursor: 'pointer' }}>
                  {lang === 'es' ? 'Siguiente Etapa' : 'Next Stage'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 🚂 TREN DE LA MICROBIOTA */}
        <BacteriaTrainGame lang={lang} isMobile={isMobile} />

        {/* LABORATORIO Y TEST */}
        <div style={{ display: 'grid', gridTemplateColumns: width < 1024 ? '1fr' : '1fr 1fr', gap: '30px' }}>
          
          {/* LABORATORIO - AHORA CON IMÁGENES REALES */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 15px 0' }}><Apple color="#10b981" /> {lang === 'es' ? 'Laboratorio Nutricional' : 'Nutritional Lab'}</h3>
            
            <div 
              style={{ background: '#f1f5f9', padding: '15px', borderRadius: '15px', display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', border: selectedFood ? '2px solid #3b82f6' : '2px solid transparent' }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => moveFood(JSON.parse(e.dataTransfer.getData("food")), 'available')}
            >
              {availableFoods.map(food => (
                <div 
                  key={food.id} 
                  draggable 
                  onDragStart={(e) => e.dataTransfer.setData("food", JSON.stringify(food))}
                  onClick={() => setSelectedFood(food)}
                  style={{ 
                    background: selectedFood?.id === food.id ? '#3b82f6' : 'white', 
                    color: selectedFood?.id === food.id ? 'white' : 'black',
                    padding: '8px', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', transition: 'all 0.2s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px', border: '1px solid #e2e8f0'
                  }}
                >
                  <img src={food.img} alt={food.name[lang]} style={{ width: '100%', height: '50px', objectFit: 'cover', borderRadius: '8px', marginBottom: '5px' }} />
                  {food.name[lang]}
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '15px' }}>
              <div 
                onClick={() => selectedFood && moveFood(selectedFood, 'eubiosis')}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => moveFood(JSON.parse(e.dataTransfer.getData("food")), 'eubiosis')}
                style={{ background: '#f0fdf4', border: '2px dashed #86efac', borderRadius: '20px', padding: '15px', minHeight: '120px', textAlign: 'center', cursor: selectedFood ? 'pointer' : 'default' }}
              >
                <div style={{ color: '#16a34a', fontWeight: '900', fontSize: '0.8rem', marginBottom: '10px' }}>ZONA EUBIOSIS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
                  {eubiosisZone.map(f => <img key={f.id} src={f.img} alt={f.name[lang]} title={f.name[lang]} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #16a34a' }}/>)}
                </div>
              </div>
              <div 
                onClick={() => selectedFood && moveFood(selectedFood, 'dysbiosis')}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => moveFood(JSON.parse(e.dataTransfer.getData("food")), 'dysbiosis')}
                style={{ background: '#fef2f2', border: '2px dashed #fca5a5', borderRadius: '20px', padding: '15px', minHeight: '120px', textAlign: 'center', cursor: selectedFood ? 'pointer' : 'default' }}
              >
                <div style={{ color: '#dc2626', fontWeight: '900', fontSize: '0.8rem', marginBottom: '10px' }}>ZONA DISBIOSIS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
                  {dysbiosisZone.map(f => <img key={f.id} src={f.img} alt={f.name[lang]} title={f.name[lang]} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #dc2626' }}/>)}
                </div>
              </div>
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', textAlign: 'center' }}>
              {gameMessage || (isMobile ? (lang === 'es' ? "📱 Toca un alimento y luego su zona" : "📱 Tap a food then its zone") : (lang === 'es' ? "🖱️ Arrastra alimentos a las zonas" : "🖱️ Drag foods to zones"))}
            </div>
          </div>

          {/* TEST ORIGINAL INTACTO (AHORA BILINGÜE) */}
          <div style={{ ...cardStyle, background: '#1e293b', color: 'white' }}>
            <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ListTodo color="#60a5fa" /> {lang === 'es' ? 'Perfil de Salud Microbiana' : 'Microbial Health Profile'}
            </h3>
            {!quizFinished ? (
              <div>
                <div style={{ background: '#334155', height: '6px', borderRadius: '10px', marginBottom: '15px' }}>
                  <div style={{ 
                    background: '#60a5fa', 
                    height: '100%', 
                    borderRadius: '10px', 
                    width: `${((quizStep + 1) / quizQuestions.length) * 100}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{lang === 'es' ? 'Análisis:' : 'Analysis:'} {quizStep + 1} / {quizQuestions.length}</p>
                <h4 style={{ margin: '15px 0', lineHeight: '1.4' }}>{quizQuestions[quizStep].q[lang]}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {quizQuestions[quizStep].options.map((opt, idx) => (
                    <button key={idx} onClick={() => handleAnswer(opt.v)} style={{ background: '#334155', border: '1px solid #475569', color: 'white', padding: '12px', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem', transition: 'background 0.2s' }}>
                      {opt.t[lang]}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'left' }}>
                {(() => {
                  const result = quizScore >= 8 ? 'eubiosis' : quizScore >= 4 ? 'riesgo' : 'disbiosis';
                  const advice = dietaryAdvice[result];
                  return (
                    <>
                      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div style={{ display: 'inline-block', padding: '5px 15px', borderRadius: '20px', background: advice.color, fontWeight: '900', fontSize: '0.7rem', marginBottom: '10px', color: 'white' }}>
                          {lang === 'es' ? 'INFORME CLÍNICO' : 'CLINICAL REPORT'}
                        </div>
                        <h2 style={{ margin: 0, color: advice.color }}>{advice.title[lang]}</h2>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px', marginBottom: '20px', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {advice.desc[lang]}
                      </div>
                      <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#60a5fa' }}>{lang === 'es' ? 'Plan de Acción:' : 'Action Plan:'}</h4>
                        <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>
                          {advice.tips[lang].map((tip, i) => <li key={i} style={{ marginBottom: '5px' }}>{tip}</li>)}
                        </ul>
                      </div>
                      <button onClick={() => {setQuizStep(0); setQuizScore(0); setQuizFinished(false);}} style={{ width: '100%', background: 'white', border: 'none', padding: '12px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', color: '#1e293b' }}>
                        {lang === 'es' ? 'Reiniciar Análisis' : 'Restart Analysis'}
                      </button>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* 🗺️ MAPA DEL INTESTINO */}
        <InteractiveGutMap lang={lang} isMobile={isMobile} />

        {/* 📊 GRÁFICA DE DIVERSIDAD */}
        <DiversityChart lang={lang} isMobile={isMobile} />

        {/* 🎴 + 🧬 ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: width < 1024 ? '1fr' : '1fr 1fr', gap: '30px' }}>
          <FlashcardDeck lang={lang} isMobile={isMobile} />
          <GutBrainSimulator lang={lang} isMobile={isMobile} />
        </div>

        {/* ⏱️ + 🔬 ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: width < 1024 ? '1fr' : '1fr 1fr', gap: '30px' }}>
          <TimedQuiz lang={lang} isMobile={isMobile} />
          <VirtualMicroscope lang={lang} isMobile={isMobile} />
        </div>

      </main>

      <footer style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>
        Hecho por Laura
      </footer>
    </div>
  );
}

export default App;