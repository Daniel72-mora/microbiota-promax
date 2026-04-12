import { useState, useEffect } from 'react';
import { 
  Baby, Stethoscope, User, Activity, ChevronRight, ChevronLeft, 
  Dna, Apple, ListTodo
} from 'lucide-react';

// 1. Recomendaciones personalizadas según el puntaje
const dietaryAdvice = {
  eubiosis: {
    color: "#16a34a",
    title: "¡Estado Óptimo de Eubiosis!",
    desc: "Tu microbiota está equilibrada y diversa. Estás produciendo suficientes AGCC (Butirato) para proteger tu barrera intestinal y regular tu sistema inmune.",
    tips: ["Sigue consumiendo MACs (Fibra fermentable)", "Mantén la variedad de polifenoles (frutos rojos, té)", "¡Excelente trabajo con tu estilo de vida!"]
  },
  riesgo: {
    color: "#ca8a04",
    title: "Alerta de Desequilibrio",
    desc: "Tu diversidad bacteriana podría estar disminuyendo. Hay señales de que factores externos (estrés, dieta) están afectando tu barrera protectora.",
    tips: ["Aumenta el consumo de prebióticos (ajo, cebolla, alcachofa)", "Reduce los edulcorantes artificiales", "Prioriza el sueño para regular el eje Intestino-Cerebro"]
  },
  disbiosis: {
    color: "#dc2626",
    title: "Signos de Disbiosis Detectados",
    desc: "Es probable que tu permeabilidad intestinal esté aumentada. Existe riesgo de endotoxemia metabólica e inflamación crónica de bajo grado.",
    tips: ["Elimina ultraprocesados y harinas refinadas inmediatamente", "Considera probióticos específicos tras consultar al médico", "Aumenta drásticamente el consumo de hojas verdes y legumbres"]
  }
};

const stages = [
  { 
    title: "Etapa Neonatal", subtitle: "Los Primeros 1000 Días", 
    desc: "La ventana de oportunidad inmunológica más crítica. El intestino del feto es casi estéril; la colonización masiva ocurre al romper aguas y durante el parto, estableciendo la base del sistema inmune.", 
    color: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)", icon: Baby, 
    clinical: "La microbiota neonatal es pionera. En partos vaginales predominan Lactobacillus y Prevotella. Los HMO (Oligosacáridos de la Leche Materna) no son digeribles por el bebé, sino que están diseñados específicamente para alimentar a las Bifidobacterium infantis, que acidifican el medio para evitar patógenos.",
    nursing: "Priorizar el 'Cuidado Canguro' para transferencia de microbiota cutánea. Educación sobre lactancia materna exclusiva (mínimo 6 meses) y evitar el uso innecesario de fórmulas que pueden alterar el pH intestinal temprano y la maduración del GALT (Tejido Linfoide Asociado al Intestino).",
    pathology: "La disbiosis por cesárea o antibióticos prematuros reduce la diversidad de Bacteroidetes. Esto se asocia con la 'Marcha Atópica': una secuencia que inicia con dermatitis, sigue con alergias alimentarias y culmina en asma infantil.", marker: "Dominancia: Actinobacteria y Proteobacteria"
  },
  { 
    title: "Infancia y Adolescencia", subtitle: "Maduración y Resiliencia", 
    desc: "La introducción de sólidos (Ablactación) dispara la diversidad. El ecosistema pasa de ser un sistema de degradación de lactosa a un reactor de fermentación de polisacáridos complejos.", 
    color: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)", icon: Stethoscope, 
    clinical: "A los 3 años, la microbiota ya se asemeja a la de un adulto. La exposición a antígenos ambientales (microbiota del suelo, mascotas) es vital para la educación de las células T-reguladoras, evitando que el sistema inmune reaccione ante sustancias inocuas (polen, polvo).",
    nursing: "Vigilancia estrecha en tratamientos con antibióticos: abogar por 'espectro reducido' cuando sea posible. Fomentar dietas ricas en MACs (Carbohidratos Accesibles a la Microbiota) como legumbres y frutas con piel para establecer una reserva bacteriana resiliente.",
    pathology: "El eje Intestino-Cerebro cobra relevancia: la disbiosis en esta etapa se ha vinculado con trastornos del neurodesarrollo y del comportamiento. La inflamación sistémica de bajo grado afecta la permeabilidad de la barrera hematoencefálica.", marker: "Transición a: Firmicutes/Bacteroidetes (Radio 1:1)"
  },
  { 
    title: "Adultez", subtitle: "El Órgano Metabólico", 
    desc: "Un microbioma maduro pesa hasta 2kg y funciona como una glándula endocrina masiva, produciendo neurotransmisores (90% de la serotonina corporal) y vitaminas (K, B12).", 
    color: "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)", icon: User, 
    clinical: "Producción de AGCC (Ácidos Grasos de Cadena Corta): El Butirato es el combustible principal del colonocito, el Propionato va al hígado para regular la gluconeogénesis y el Acetato regula la lipogénesis. Estos metabolitos mantienen la integridad de las 'Tight Junctions' (uniones estrechas).",
    nursing: "Detección de síntomas de 'Leaky Gut': distensión abdominal, fatiga crónica y niebla mental. Intervención en el estilo de vida: manejo de cortisol (estrés cronico) ya que el exceso de glucocorticoides reduce la producción de moco protector (mucin) en el epitelio intestinal.",
    pathology: "Disbiosis metabólica: Un radio elevado de Firmicutes/Bacteroidetes se asocia con obesidad y resistencia a la insulina. La translocación de LPS (lipopolisacáridos bacterianos) al torrente sanguíneo causa endotoxemia metabólica e inflamación crónica.", marker: "Estabilidad en Diversidad Alfa"
  },
  { 
    title: "Adulto Mayor", subtitle: "Inmunosenescencia", 
    desc: "Pérdida drástica de diversidad. La microbiota se vuelve inestable y pierde 'resiliencia', volviéndose vulnerable a colonizaciones por Clostridioides difficile.", 
    color: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)", icon: Activity, 
    clinical: "Fenómeno de 'Inflammaging': La reducción de bacterias productoras de butirato (como Faecalibacterium prausnitzii) debilita la barrera intestinal. Esto permite el paso de metabolitos pro-inflamatorios que aceleran el envejecimiento celular y la degradación de tejidos.",
    nursing: "Manejo de polifarmacia: Los IBPs (protectores gástricos) y AINEs alteran drásticamente el microbioma. Suplementación con probióticos multicepa y prebióticos suaves (inulina) para contrarrestar la sarcopenia (pérdida de masa muscular) mediada por inflamación.",
    pathology: "Asociación directa con enfermedades neurodegenerativas (Alzheimer/Parkinson) a través del nervio vago. La acumulación de proteínas mal plegadas en el intestino puede viajar al cerebro en un ambiente de disbiosis crónica.", marker: "Aumento de: Pathobiontes (Enterobacteriaceae)"
  }
];

const quizQuestions = [
  { q: "¿Con qué frecuencia consumes alimentos ultraprocesados?", options: [{ t: "Casi nunca", v: 2 }, { t: "1-3 veces por semana", v: 1 }, { t: "Todos los días", v: 0 }] },
  { q: "¿Cuántas porciones de vegetales consumes diariamente?", options: [{ t: "Más de 4", v: 2 }, { t: "1 o 2", v: 1 }, { t: "Casi nada", v: 0 }] },
  { q: "¿Has tomado antibióticos recientemente?", options: [{ t: "No", v: 2 }, { t: "Sí, recetados", v: 1 }, { t: "Sí, varias veces", v: 0 }] },
  { q: "¿Cómo es tu calidad de sueño y estrés?", options: [{ t: "Buena", v: 2 }, { t: "Regular", v: 1 }, { t: "Mala/Crónico", v: 0 }] },
  { q: "¿Haces ejercicio regular?", options: [{ t: "Sí", v: 2 }, { t: "A veces", v: 1 }, { t: "No", v: 0 }] }
];

const initialFoods = [
  { id: 'f1', name: 'Brócoli', type: 'good', icon: '🥦' },
  { id: 'f2', name: 'Hamburguesa', type: 'bad', icon: '🍔' },
  { id: 'f3', name: 'Kéfir', type: 'good', icon: '🥛' },
  { id: 'f4', name: 'Gaseosa', type: 'bad', icon: '🥤' },
  { id: 'f5', name: 'Avena', type: 'good', icon: '🌾' },
  { id: 'f6', name: 'Donas', type: 'bad', icon: '🍩' },
];

function App() {
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
    if (targetZone !== 'available') setGameMessage(isCorrect ? `✅ ¡Correcto! ${food.name}` : `⚠️ ${food.name} no va ahí`);

    if (targetZone === 'eubiosis') setEubiosisZone(prev => [...prev, food]);
    else if (targetZone === 'dysbiosis') setDysbiosisZone(prev => [...prev, food]);
    else setAvailableFoods(prev => [...prev, food]);
    
    setSelectedFood(null); 
  };

  const IconoActual = stages[current].icon;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#e2e8f0', color: '#0f172a', fontFamily: 'sans-serif' }}>
      
      <nav style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(20px)', padding: isMobile ? '15px' : '20px 50px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Dna color="#2563eb" size={28} />
          <h1 style={{ fontSize: isMobile ? '1.2rem' : '1.6rem', margin: 0, fontWeight: '900' }}>Microbiota <span style={{ color: '#2563eb' }}>ProMax</span></h1>
        </div>
        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569' }}>Dashboard • Facultad de Enfermería</div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: isMobile ? '20px auto' : '40px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* CICLO VITAL */}
        <div style={{ ...cardStyle, background: stages[current].color }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '25px', alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '15px', borderRadius: '25px' }}>
              <IconoActual size={isMobile ? 40 : 50} color="#2563eb" />
            </div>
            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', margin: 0, fontWeight: '900' }}>{stages[current].title}</h2>
              <span style={{ color: '#1d4ed8', fontWeight: '800' }}>{stages[current].subtitle}</span>
            </div>
          </div>
          
          <p style={{ fontSize: isMobile ? '1rem' : '1.2rem', margin: '20px 0', lineHeight: '1.6' }}>{stages[current].desc}</p>

          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px', marginBottom: '20px' }}>
            {['clinical', 'nursing', 'pathology'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: '12px', borderRadius: '15px', border: 'none', background: activeTab === tab ? '#1e293b' : 'rgba(255,255,255,0.5)', color: activeTab === tab ? 'white' : '#475569', fontWeight: '800', cursor: 'pointer' }}>
                {tab === 'clinical' ? '🩺 Clínica' : tab === 'nursing' ? '👩‍⚕️ Enfermería' : '🦠 Fisiopatología'}
              </button>
            ))}
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '20px', minHeight: '100px' }}>
            {activeTab === 'clinical' && <div><strong>Marcador:</strong> {stages[current].marker}<br/><br/>{stages[current].clinical}</div>}
            {activeTab === 'nursing' && <div>{stages[current].nursing}</div>}
            {activeTab === 'pathology' && <div>{stages[current].pathology}</div>}
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button onClick={() => setCurrent(c => (c - 1 + 4) % 4)} style={{ padding: '15px', borderRadius: '15px', border: 'none', background: 'white', cursor: 'pointer' }}><ChevronLeft/></button>
            <button onClick={() => setCurrent(c => (c + 1) % 4)} style={{ flex: 1, padding: '15px', borderRadius: '15px', border: 'none', background: '#0f172a', color: 'white', fontWeight: '800', cursor: 'pointer' }}>Siguiente Etapa</button>
          </div>
        </div>

        {/* LABORATORIO Y TEST */}
        <div style={{ display: 'grid', gridTemplateColumns: width < 1024 ? '1fr' : '1fr 1fr', gap: '30px' }}>
          
          {/* LABORATORIO */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 15px 0' }}><Apple color="#10b981" /> Laboratorio Nutricional</h3>
            
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
                    padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', transition: 'all 0.2s'
                  }}
                >
                  {food.icon} {food.name}
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
                <div style={{ color: '#16a34a', fontWeight: '900', fontSize: '0.8rem' }}>ZONA EUBIOSIS</div>
                {eubiosisZone.map(f => <div key={f.id} style={{ fontSize: '0.8rem' }}>{f.icon} {f.name}</div>)}
              </div>
              <div 
                onClick={() => selectedFood && moveFood(selectedFood, 'dysbiosis')}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => moveFood(JSON.parse(e.dataTransfer.getData("food")), 'dysbiosis')}
                style={{ background: '#fef2f2', border: '2px dashed #fca5a5', borderRadius: '20px', padding: '15px', minHeight: '120px', textAlign: 'center', cursor: selectedFood ? 'pointer' : 'default' }}
              >
                <div style={{ color: '#dc2626', fontWeight: '900', fontSize: '0.8rem' }}>ZONA DISBIOSIS</div>
                {dysbiosisZone.map(f => <div key={f.id} style={{ fontSize: '0.8rem' }}>{f.icon} {f.name}</div>)}
              </div>
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.8rem', fontWeight: 'bold', color: '#475569' }}>
              {gameMessage || (isMobile ? "📱 Toca un alimento y luego su zona" : "🖱️ Arrastra alimentos a las zonas")}
            </div>
          </div>

          {/* TEST CON RECOMENDACIONES CLARAS */}
          <div style={{ ...cardStyle, background: '#1e293b', color: 'white' }}>
            <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ListTodo color="#60a5fa" /> Perfil de Salud Microbiana
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
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Análisis: {quizStep + 1} de 5</p>
                <h4 style={{ margin: '15px 0', lineHeight: '1.4' }}>{quizQuestions[quizStep].q}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {quizQuestions[quizStep].options.map((opt, idx) => (
                    <button key={idx} onClick={() => handleAnswer(opt.v)} style={{ background: '#334155', border: '1px solid #475569', color: 'white', padding: '12px', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}>{opt.t}</button>
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
                        <div style={{ display: 'inline-block', padding: '5px 15px', borderRadius: '20px', background: advice.color, fontWeight: '900', fontSize: '0.7rem', marginBottom: '10px' }}>INFORME CLÍNICO</div>
                        <h2 style={{ margin: 0, color: advice.color }}>{advice.title}</h2>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px', marginBottom: '20px', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {advice.desc}
                      </div>
                      <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#60a5fa' }}>Plan de Acción:</h4>
                        <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>
                          {advice.tips.map((tip, i) => <li key={i} style={{ marginBottom: '5px' }}>{tip}</li>)}
                        </ul>
                      </div>
                      <button onClick={() => {setQuizStep(0); setQuizScore(0); setQuizFinished(false);}} style={{ width: '100%', background: 'white', border: 'none', padding: '12px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', color: '#1e293b' }}>Reiniciar Análisis</button>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>
        Hecha por Laura
      </footer>
    </div>
  );
}

export default App;