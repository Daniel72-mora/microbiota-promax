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
      </main>

      <footer style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>
        Hecho por Laura
      </footer>
    </div>
  );
}

export default App;