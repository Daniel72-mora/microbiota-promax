import { Baby, Stethoscope, User, Activity } from "lucide-react";

export const stages = [
{
    id: "neonatal",
    title: "Etapa Neonatal",
    subtitle: "El inicio de la vida",
    description: "La microbiota se adquiere principalmente en el parto. Es la base del sistema inmune.",
    clinicalData: "Predominan Lactobacillus (parto vaginal) o Staphylococcus (cesárea).",
    tips: "La lactancia materna aporta oligosacáridos (HMO) que alimentan bacterias buenas.",
    color: "from-blue-50 to-blue-100",
    icon: Baby
},
{
    id: "infancia",
    title: "Infancia",
    subtitle: "Diversificación (2-5 años)",
    description: "Con la introducción de alimentos sólidos, la microbiota se vuelve más compleja y estable.",
    clinicalData: "Aumento drástico de Bacteroidetes y Firmicutes.",
    tips: "El contacto con ambientes naturales aumenta la riqueza microbiana.",
    color: "from-green-50 to-green-100",
    icon: Stethoscope
},
{
    id: "adultez",
    title: "Adultez",
    subtitle: "Homeostasis",
    description: "Es la etapa de mayor estabilidad, pero muy sensible al estilo de vida y estrés.",
    clinicalData: "Relación directa entre el eje intestino-cerebro y la salud mental.",
    tips: "El consumo de fibra prebiótica mantiene la eubiosis (equilibrio).",
    color: "from-orange-50 to-orange-100",
    icon: User
},
{
    id: "vejez",
    title: "Adulto Mayor",
    subtitle: "Senescencia",
    description: "La diversidad disminuye, lo que se asocia con procesos inflamatorios crónicos.",
    clinicalData: "Fenómeno de 'Inflammaging' por reducción de bacterias productoras de butirato.",
    tips: "Probióticos específicos pueden ayudar a mejorar la respuesta inmune.",
    color: "from-purple-50 to-purple-100",
    icon: Activity
}
];