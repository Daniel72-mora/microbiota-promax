import { useState } from 'react';
import { 
  Baby, Stethoscope, User, Activity, ChevronRight, ChevronLeft, 
  HeartPulse, Pill, Leaf, Dna, Microscope, AlertCircle, Info, 
  Apple, Cookie, CheckCircle2, XCircle, ListTodo
} from 'lucide-react';

// --- DATA CIENTÍFICA ---
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
  { q: "¿Con qué frecuencia consumes alimentos ultraprocesados (dulces, embutidos, gaseosas)?", options: [{ t: "Casi nunca", v: 2 }, { t: "1 a 3 veces por semana", v: 1 }, { t: "Todos los días", v: 0 }] },
  { q: "¿Cuántas porciones de vegetales y fibra consumes diariamente?", options: [{ t: "Más de 4 porciones", v: 2 }, { t: "1 o 2 porciones", v: 1 }, { t: "Casi no consumo vegetales", v: 0 }] },
  { q: "¿Has tomado antibióticos en los últimos 6 meses?", options: [{ t: "No, ninguno", v: 2 }, { t: "Sí, un tratamiento recetado", v: 1 }, { t: "Sí, varias veces o automedicado", v: 0 }] },
  { q: "¿Cómo describes tu nivel de estrés y calidad de sueño?", options: [{ t: "Duermo bien y manejo el estrés", v: 2 }, { t: "Estrés ocasional, duermo regular", v: 1 }, { t: "Estrés crónico constante o insomnio", v: 0 }] },
  { q: "¿Realizas actividad física regular (mínimo 3 veces por semana)?", options: [{ t: "Sí, de forma constante", v: 2 }, { t: "A veces, soy algo sedentario", v: 1 }, { t: "No, soy completamente sedentario", v: 0 }] }
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
  const IconoActual = stages[current].icon;

  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [availableFoods, setAvailableFoods] = useState(initialFoods);
  const [eubiosisZone, setEubiosisZone] = useState([]);
  const [dysbiosisZone, setDysbiosisZone] = useState([]);
  const [gameMessage, setGameMessage] = useState("");

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

  const resetQuiz = () => { setQuizStep(0); setQuizScore(0); setQuizFinished(false); };

  const getQuizResult = () => {
    if (quizScore >= 8) return { title: "Eubiosis Óptima 🟢", desc: "¡Excelente! Tu microbiota está equilibrada, con alta diversidad.", color: "#10b981", bg: "#dcfce7" };
    if (quizScore >= 4) return { title: "Riesgo Moderado 🟡", desc: "Podrías mejorar. Aumenta prebióticos y cuida tu descanso.", color: "#eab308", bg: "#fef08a" };
    return { title: "Disbiosis Severa 🔴", desc: "¡Alerta! Tus hábitos afectan la diversidad bacteriana.", color: "#ef4444", bg: "#fee2e2" };
  };

  const onDragStart = (e, food, source) => { e.dataTransfer.setData("food", JSON.stringify({ ...food, source })); };
  const onDragOver = (e) => { e.preventDefault(); };
  
  const onDrop = (e, targetZone) => {
    e.preventDefault();
    const foodData = JSON.parse(e.dataTransfer.getData("food"));
    if (foodData.source === 'available') setAvailableFoods(prev => prev.filter(f => f.id !== foodData.id));
    if (foodData.source === 'eubiosis') setEubiosisZone(prev => prev.filter(f => f.id !== foodData.id));
    if (foodData.source === 'dysbiosis') setDysbiosisZone(prev => prev.filter(f => f.id !== foodData.id));

    let isCorrect = (targetZone === 'eubiosis' && foodData.type === 'good') || (targetZone === 'dysbiosis' && foodData.type === 'bad');

    if (targetZone !== 'available') {
      setGameMessage(isCorrect ? `¡Correcto! ${foodData.icon} ✅` : `Cuidado con ${foodData.name} ⚠️`);
    }

    if (targetZone === 'eubiosis') setEubiosisZone(prev => [...prev, foodData]);
    else if (targetZone === 'dysbiosis') setDysbiosisZone(prev => [...prev, foodData]);
    else setAvailableFoods(prev => [...prev, foodData]);
  };

  const resetGame = () => { setAvailableFoods(initialFoods); setEubiosisZone([]); setDysbiosisZone([]); setGameMessage(""); };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#e2e8f0', backgroundImage: 'radial-gradient(at 0% 0%, #ffffff 0px, transparent 50%), radial-gradient(at 100% 100%, #eff6ff 0px, transparent 50%)', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
      
      <style>{`
        .nav-container { display: flex; justify-content: space-between; align-items: center; padding: 15px 40px; background: rgba(255,255,255,0.75); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.5); position: sticky; top: 0; z-index: 100; }
        .responsive-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .tab-container { display: flex; gap: 8px; background: rgba(255,255,255,0.4); padding: 8px; border-radius: 20px; overflow-x: auto; }
        .game-zones { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        @media (max-width: 1024px) { .responsive-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { 
          .nav-container { flex-direction: column; gap: 15px; padding: 20px; text-align: center; } 
          .right-nav { gap: 15px !important; }
        }
      `}</style>

      {/* HEADER CORREGIDO */}
      <nav className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)', padding: '10px', borderRadius: '14px', display: 'flex' }}>
            <Dna color="white" size={28} />
          </div>
          <h1 style={{ fontSize: '1.6rem', margin: 0, fontWeight: '900', letterSpacing: '-0.5px' }}>
            Microbiota <span style={{ color: '#2563eb' }}>ProMax</span>
          </h1>
        </div>

        <div className="right-nav" style={{ display: 'flex', gap: '30px', fontSize: '0.85rem', fontWeight: '700', color: '#475569', alignItems: 'center' }}>
          <span style={{ color: '#2563eb', background: '#eff6ff', padding: '6px 14px', borderRadius: '10px' }}>Dashboard Interactivo</span>
          <span style={{ borderLeft: '2px solid #cbd5e1', paddingLeft: '20px', height: '20px', display: 'flex', alignItems: 'center' }}>Facultad de Enfermería</span>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* ROW 1: ETAPAS */}
        <div style={{ background: stages[current].color, borderRadius: '30px', padding: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid white' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div style={{ background: 'white', padding: '15px', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.03)' }}>
              <IconoActual size={40} color="#2563eb" />
            </div>
            <div>
              <h2 style={{ fontSize: '2rem', margin: 0, fontWeight: '900' }}>{stages[current].title}</h2>
              <span style={{ color: '#1d4ed8', fontWeight: '800', fontSize: '0.9rem' }}>{stages[current].subtitle}</span>
            </div>
          </div>
          
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '25px' }}>{stages[current].desc}</p>

          <div className="tab-container">
            {['clinical', 'nursing', 'pathology'].map((t) => (
              <button key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, padding: '12px', borderRadius: '15px', border: 'none', background: activeTab === t ? 'white' : 'transparent', color: activeTab === t ? '#2563eb' : '#64748b', fontWeight: '800', cursor: 'pointer', transition: '0.2s', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                {t === 'clinical' ? '🩺 Clínica' : t === 'nursing' ? '👩‍⚕️ Enfermería' : '🦠 Patología'}
              </button>
            ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.9)', padding: '20px', borderRadius: '20px', marginTop: '15px', minHeight: '80px' }}>
            {activeTab === 'clinical' && <div><strong>Firma Biológica:</strong> {stages[current].marker}<br/><br/>{stages[current].clinical}</div>}
            {activeTab === 'nursing' && <div>{stages[current].nursing}</div>}
            {activeTab === 'pathology' && <div>{stages[current].pathology}</div>}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button onClick={() => setCurrent(c => (c - 1 + stages.length) % stages.length)} style={{ padding: '15px', borderRadius: '15px', border: 'none', background: 'white', cursor: 'pointer' }}><ChevronLeft /></button>
            <button onClick={() => setCurrent(c => (c + 1) % stages.length)} style={{ flex: 1, padding: '15px', borderRadius: '15px', border: 'none', background: '#0f172a', color: 'white', fontWeight: '800', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>Avanzar Etapa <ChevronRight size={20}/></button>
          </div>
        </div>

        {/* ROW 2: INTERACTIVOS */}
        <div className="responsive-grid">
          
          {/* JUEGO */}
          <div style={{ background: 'white', padding: '30px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Apple color="#10b981" /> Laboratorio</h3>
            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '15px', display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', minHeight: '60px' }} onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'available')}>
              {availableFoods.map(f => (
                <div key={f.id} draggable onDragStart={(e) => onDragStart(e, f, 'available')} style={{ background: 'white', padding: '8px 12px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', cursor: 'grab', fontSize: '0.9rem', fontWeight: '700' }}>{f.icon} {f.name}</div>
              ))}
            </div>
            <div className="game-zones">
              <div onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'eubiosis')} style={{ background: '#f0fdf4', border: '2px dashed #86efac', borderRadius: '20px', padding: '15px', minHeight: '130px', textAlign: 'center' }}>
                <span style={{ color: '#16a34a', fontWeight: '900', fontSize: '0.8rem' }}>EUBIOSIS 🟢</span>
                {eubiosisZone.map(f => <div key={f.id} style={{ fontSize: '0.8rem', padding: '5px', background: 'white', borderRadius: '8px', marginTop: '5px' }}>{f.icon} {f.name}</div>)}
              </div>
              <div onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'dysbiosis')} style={{ background: '#fef2f2', border: '2px dashed #fca5a5', borderRadius: '20px', padding: '15px', minHeight: '130px', textAlign: 'center' }}>
                <span style={{ color: '#dc2626', fontWeight: '900', fontSize: '0.8rem' }}>DISBIOSIS 🔴</span>
                {dysbiosisZone.map(f => <div key={f.id} style={{ fontSize: '0.8rem', padding: '5px', background: 'white', borderRadius: '8px', marginTop: '5px' }}>{f.icon} {f.name}</div>)}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
               <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#64748b' }}>{gameMessage}</span>
               <button onClick={resetGame} style={{ background: '#f1f5f9', border: 'none', padding: '8px 15px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>Reiniciar</button>
            </div>
          </div>

          {/* TEST */}
          <div style={{ background: '#1e293b', color: 'white', padding: '30px', borderRadius: '30px' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}><ListTodo color="#60a5fa" /> Test Clínico</h3>
            {!quizFinished ? (
              <>
                <div style={{ background: '#334155', padding: '20px', borderRadius: '20px', marginBottom: '15px' }}>
                  <p style={{ margin: '0 0 15px 0', fontSize: '1rem', fontWeight: '500' }}>{quizQuestions[quizStep].q}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {quizQuestions[quizStep].options.map((o, i) => (
                      <button key={i} onClick={() => handleAnswer(o.v)} style={{ background: '#1e293b', border: '1px solid #475569', color: 'white', padding: '12px', borderRadius: '12px', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem' }}>{o.t}</button>
                    ))}
                  </div>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#334155', borderRadius: '10px' }}>
                  <div style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%`, height: '100%', background: '#60a5fa', borderRadius: '10px' }}></div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ background: getQuizResult().bg, color: getQuizResult().color, padding: '20px', borderRadius: '20px', marginBottom: '15px' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{getQuizResult().title}</h4>
                  <p style={{ color: '#0f172a', fontSize: '0.9rem', margin: 0 }}>{getQuizResult().desc}</p>
                </div>
                <button onClick={resetQuiz} style={{ background: 'transparent', border: '1px solid #475569', color: 'white', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer' }}>Volver a empezar</button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
        Microbiota ProMax • Facultad de Enfermería • 2026
      </footer>
    </div>
  );
}

export default App;