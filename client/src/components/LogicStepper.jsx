import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Hash } from "lucide-react";

/**
 * LogicStepper - A vertical timeline for step-by-step code explanation.
 */
const LogicStepper = ({ steps }) => {
  if (!Array.isArray(steps) || steps.length === 0) return null;

  return (
    <div className="logic-stepper">
      {steps.map((step, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="step-item"
        >
          <div className="step-indicator">
            <div className="step-number">
              <Hash size={12} /> {index + 1}
            </div>
            {index < steps.length - 1 && <div className="step-line"></div>}
          </div>
          
          <div className="step-content">
            <h5 className="step-title">{step.title}</h5>
            <p className="step-desc">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};


export default LogicStepper;
