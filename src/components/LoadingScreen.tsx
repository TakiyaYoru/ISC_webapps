import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F5EF] select-none">
      {/* Centered Logo with smooth fade-in pulse */}
      <motion.div
        initial={{ opacity: 0.3, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
        className="w-56 md:w-72 flex justify-center px-6"
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtx8Tj9XFuAIxxbtQt-WlTECXBYosGkV8OLe3IMXa8nzKZCX1R7QQbkEHHve47qjgI4v7EBwbO5Ju2-DjaO3-fswugkJ2ZJGb21N_xBaUEHPe4hIi0Ms8N5c8oOCIvCxnxsqNYWA8-eD_uUEc6ffyzybONx-bvsI2EJL01PNz5Yx_mqGM2jC-wVdfWto3e6wTJFa_HSSt9ZAcxrmeS1eXkW23ik5Nl-ROAVCjuBC_CAYq79cNwDxSWs51LHqoKJ9CZyNSCCWtn0SU"
          alt="IMPERIAL SKINCARE Logo"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Branded Golden Circular Spinner (Cocoon Style) */}
      <div className="mt-8 relative">
        <div className="w-10 h-10 border-[3.5px] border-[#C8A96A]/20 border-t-[#C8A96A] rounded-full animate-spin" />
      </div>
    </div>
  )
}
