import Navbar from "./Navbar";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  return (
    <div className="layout-root">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container"
        style={{ paddingTop: '40px', paddingBottom: '40px', minHeight: 'calc(100vh - 70px)' }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
