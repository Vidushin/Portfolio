import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, TrendingUp, Database, Code, Mail, Linkedin, Github, ChevronDown, Award, Briefcase, GraduationCap, X, ExternalLink, Play } from 'lucide-react';

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [typedText, setTypedText] = useState('');
  const canvasRef = useRef(null);
  const fullName = "Vidushini Gnanapragasam";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullName.length) {
        setTypedText(fullName.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const dx = mousePosition.x - p.x;
        const dy = mousePosition.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const glowRadius = 150;
        let glowIntensity = 0;
        
        if (dist < glowRadius) {
          glowIntensity = 1 - (dist / glowRadius);
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        if (glowIntensity > 0) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 15);
          gradient.addColorStop(0, `rgba(34, 211, 238, ${glowIntensity * 0.8})`);
          gradient.addColorStop(0.4, `rgba(6, 182, 212, ${glowIntensity * 0.5})`);
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 15, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = `rgba(34, 211, 238, ${0.3 + glowIntensity * 0.7})`;
        } else {
          ctx.fillStyle = 'rgba(30, 58, 138, 0.3)';
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mousePosition]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // UPDATED PROJECTS SECTION BASED ON RESUME
  const projects = [
    {
      title: "AI-Powered Climate Urban Planning",
      description: "LSTM-based forecasting system for climate responsive urban planning",
      tech: ["Python", "LSTM", "Dashboards"],
      metrics: "🏆 3rd Place Winner",
      details: "Implemented LSTM-based forecasting and visual dashboards to generate insights aiding urban planning decisions. This project was recognized for its innovative approach to smart urban solutions.",
      impact: ["Won 3rd place at VEL IDEA FORGE 2K25", "Implemented LSTM forecasting models", "Generated actionable urban planning insights"]
    },
    {
      title: "Customer Segmentation (K-Means)",
      description: "Cluster-based segmentation to identify target market groups",
      tech: ["Python", "K-Means", "EDA"],
      metrics: "Targeted Marketing",
      details: "Performed Exploratory Data Analysis (EDA) and utilized K-Means clustering algorithms to segment customer data. Built visual reports that assisted the marketing team in creating targeted campaigns.",
      impact: ["Optimized marketing targeting strategy", "Performed detailed Exploratory Data Analysis", "Created visual reports for stakeholders"]
    },
    {
      title: "Sales Performance & Forecasting",
      description: "Interactive dashboard analyzing seasonal trends and KPIs",
      tech: ["Power BI", "Excel", "SQL"],
      metrics: "Seasonal Insights",
      details: "Analyzed sales data to identify seasonal trends and Key Performance Indicators (KPIs). Created interactive dashboards providing granular weekly and monthly insights to support decision-making.",
      impact: ["Identified critical seasonal sales trends", "tracked Key Performance Indicators (KPIs)", "Enabled weekly and monthly performance tracking"]
    },
    {
      title: "Customer Feedback Analysis",
      description: "Categorical segmentation system for analyzing review patterns",
      tech: ["Data Analysis", "Segmentation", "Excel"],
      metrics: "Satisfaction Dashboards",
      details: "Analyzed customer review patterns and created satisfaction dashboards. Identified specific service improvement opportunities using categorical segmentation techniques.",
      impact: ["Created customer satisfaction dashboards", "Identified service improvement opportunities", "Analyzed complex review patterns"]
    }
  ];

  const skills = [
    { 
      name: "Python", 
      level: 95, 
      description: "Expert in Pandas, NumPy, Scikit-learn, and data visualization libraries"
    },
    { 
      name: "SQL", 
      level: 90, 
      description: "Advanced querying, optimization, and database design across PostgreSQL, MySQL"
    },
    { 
      name: "Tableau/Power BI", 
      level: 88, 
      description: "Creating interactive dashboards and compelling data stories"
    },
    { 
      name: "Java", 
      level: 85, 
      description: "Statistical analysis, hypothesis testing, and data modeling"

    },
    {name: "AWS", 
      level: 80, 
      description: "Cloud Applications for data storage, processing, and analytics using S3, Redshift, Lambda"
      
    },
    { 
      name: "Machine Learning", 
      level: 82, 
      description: "Regression, classification, clustering, and neural networks"
    },
    { 
      name: "Excel", 
      level: 92, 
      description: "Advanced formulas, pivot tables, macros, and VBA"
    }
  ];

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
      
      <div 
        className="fixed w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-50 transition-transform duration-100"
        style={{ 
          left: `${mousePosition.x - 16}px`, 
          top: `${mousePosition.y - 16}px`,
          transform: selectedProject ? 'scale(1.5)' : 'scale(1)'
        }}
      />

      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-lg z-40 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-transform"
                 onClick={() => scrollToSection('home')}>
              DataAnalyst.io
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all relative group ${
                    activeSection === section 
                      ? 'text-cyan-400 font-semibold' 
                      : 'text-gray-300 hover:text-cyan-300'
                  }`}
                >
                  {section}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform origin-left transition-transform ${
                    activeSection === section ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </button>
              ))}
            </div>

            <button 
              className="md:hidden text-white hover:text-cyan-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={`w-6 h-0.5 bg-current mb-1 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-current mb-1 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-current transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-cyan-500/20 animate-slideDown">
            {['home', 'about', 'skills', 'projects', 'contact'].map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-4 py-3 capitalize hover:bg-cyan-500/10 transition-colors"
              >
                {section}
              </button>
            ))}
          </div>
        )}
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-cyan-900/20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-8 animate-float">
            <div className="inline-block p-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer hover:scale-110">
              <BarChart3 className="w-20 h-20 text-cyan-400" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient min-h-[6rem] flex items-center justify-center pb-4">
            {typedText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Transforming Raw Data into Actionable Insights
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['Python', 'SQL', 'Machine Learning', 'Data Visualization'].map((tech, i) => (
              <span 
                key={i}
                className="px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/30 hover:bg-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer transform hover:scale-110"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="mb-8 animate-bounce">
            <ChevronDown className="w-8 h-8 text-cyan-400 mx-auto" />
          </div>
          
          <button 
            onClick={() => scrollToSection('projects')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105 active:scale-95"
          >
            View My Work
          </button>
        </div>
      </section>

      <section id="about" className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: "Experience",
                description: "Completed Internship as Data Analyst at Ran Global Auto Engg pvt ltd, working on data cleaning, visualization, and reporting.",
                color: "cyan"
              },
              {
                icon: GraduationCap,
                title: "Education",
                description: "Final Year Student at Veltech Unviersity pursuing B.Tech in Computer Science with 9.3 CGPA.",
                color: "blue"
              },
              {
                icon: Award,
                title: "Achievements",
                description: "Certified in Advanced Analytics, awarded for projects on competitions conducted by college.",
                color: "cyan"
              }
            ].map((item, i) => (
              <div 
                key={i}
                className={`bg-gradient-to-br from-cyan-500/10 to-transparent p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer group`}
              >
                <item.icon className={`w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="relative py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, i) => (
              <div 
                key={i} 
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredSkill(i)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold flex items-center gap-2">
                    <span className="text-2xl group-hover:scale-125 transition-transform">{skill.icon}</span>
                    {skill.name}
                  </span>
                  <span className="text-cyan-400 font-mono">{skill.level}%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-cyan-500/50"
                    style={{ 
                      width: `${skill.level}%`,
                      animation: `slideIn 1s ease-out ${i * 0.1}s both`
                    }}
                  />
                </div>
                {hoveredSkill === i && (
                  <p className="text-sm text-gray-400 animate-fadeIn">{skill.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div 
                key={i}
                onClick={() => setSelectedProject(project)}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer group"
              >
                <div className="mb-4">
                  <Database className="w-10 h-10 text-cyan-400 mb-3 group-hover:rotate-12 transition-transform" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, j) => (
                    <span key={j} className="px-3 py-1 bg-cyan-500/20 rounded-full text-xs border border-cyan-500/30 group-hover:bg-cyan-500/30 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-green-400 font-semibold">{project.metrics}</div>
                  <ExternalLink className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-slate-900 rounded-2xl max-w-2xl w-full p-8 border border-cyan-500/30 relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {selectedProject.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tech.map((tech, j) => (
                <span key={j} className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm border border-cyan-500/30">
                  {tech}
                </span>
              ))}
            </div>
            
            <p className="text-gray-300 mb-6">{selectedProject.details}</p>
            
            <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
              <h4 className="text-xl font-semibold mb-4 text-cyan-400">Key Impact</h4>
              <ul className="space-y-2">
                {selectedProject.impact.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-2xl font-bold text-green-400">{selectedProject.metrics}</div>
          </div>
        </div>
      )}

      <section id="contact" className="relative py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 mb-12 text-center">
            Ready to turn your data into insights? Let's talk about your next project.
          </p>
          
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-cyan-500/20 mb-12">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-cyan-400">Name</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-cyan-400">Email</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-cyan-400">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button 
                onClick={handleSubmit}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105 active:scale-95"
              >
                Send Message
              </button>
              
              {formSubmitted && (
                <div className="text-center text-green-400 animate-fadeIn">
                  ✓ Message sent successfully!
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:vidushinimaria@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-full transition-all transform hover:scale-105 active:scale-95">
              <Mail className="w-5 h-5" />
              Email Me
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-all transform hover:scale-105 active:scale-95">
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-800 rounded-full transition-all transform hover:scale-105 active:scale-95">
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="relative py-8 px-4 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2024 Data Analyst Portfolio. Built with passion for data.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideIn {
          from { width: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );

};

export default Portfolio;