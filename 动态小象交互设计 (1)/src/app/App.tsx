import React, { useState, useEffect } from 'react';
import { ElephantAvatar, ElephantState } from './components/ElephantAvatar';
import { MiniProgramGuide } from './components/MiniProgramGuide';
import { Sparkles, Apple, MessageCircleHeart, Hand, ChevronRight, MessageCircle, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [elephantState, setElephantState] = useState<ElephantState>('idle');
  const [dialogue, setDialogue] = useState<string>('你好！我是你的灵动小象，点点我吧。');
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // Reset to idle after interaction
  useEffect(() => {
    if (elephantState !== 'idle') {
      const timer = setTimeout(() => {
        setElephantState('idle');
        setDialogue('还有什么想和我玩的吗？');
        setIsInteracting(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [elephantState]);

  const handlePet = () => {
    if (isInteracting) return;
    setIsInteracting(true);
    setElephantState('happy');
    setDialogue('好舒服呀~ 谢谢你的抚摸！(˶ᵔ ᵕ ᵔ˶)');
  };

  const handleFeed = () => {
    if (isInteracting) return;
    setIsInteracting(true);
    setElephantState('eating');
    setDialogue('吧唧吧唧... 苹果真好吃！🍎');
  };

  const handleChat = () => {
    if (isInteracting) return;
    setIsInteracting(true);
    setElephantState('speaking');
    setDialogue('我会很多本领哦！可以帮你记备忘录、讲笑话，还能陪你聊天！');
  };

  // Click on the elephant directly
  const handleTapElephant = () => {
    if (isInteracting) return;
    handlePet();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-8 w-full max-w-6xl">
        
        {/* Mobile Mockup Area */}
        <div className="relative w-full max-w-[375px] h-[812px] bg-slate-100 rounded-[3rem] shadow-2xl border-[8px] border-slate-800 overflow-hidden flex flex-col shrink-0">
          
          {/* Top Status Bar (Fake) */}
          <div className="h-12 w-full flex items-center justify-between px-6 text-xs font-semibold text-slate-800 z-10 absolute top-0 left-0">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-3 bg-slate-800 rounded-sm"></div>
              <div className="w-4 h-3 bg-slate-800 rounded-sm"></div>
            </div>
          </div>
          
          {/* Dynamic Island (Fake) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-20"></div>

          {/* App Header */}
          <header className="pt-16 pb-6 px-6 bg-gradient-to-b from-indigo-100 to-transparent">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              灵动小象 <Sparkles size={20} className="text-indigo-500" />
            </h1>
            <p className="text-sm text-slate-500 mt-1">你的专属AI萌宠助理</p>
          </header>

          {/* Main Interaction Area */}
          <main className="flex-1 flex flex-col relative px-4">
            
            {/* Dialogue Bubble */}
            <div className="w-full flex justify-center h-24 mt-4">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={dialogue}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 max-w-[280px] relative text-sm leading-relaxed text-slate-700 font-medium z-10"
                >
                  {dialogue}
                  {/* Bubble tail */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-slate-100 rotate-45"></div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Avatar Area */}
            <div 
              className="flex-1 flex items-center justify-center cursor-pointer touch-none relative"
              onClick={handleTapElephant}
              title="点击小象摸摸它！"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 bg-indigo-200/40 rounded-full blur-3xl"></div>
              </div>
              <ElephantAvatar currentState={elephantState} />
            </div>

            {/* Action Buttons Panel */}
            <div className="bg-white rounded-[2rem] shadow-[0_-8px_30px_rgba(0,0,0,0.04)] p-6 mb-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">与小象互动</h3>
              <div className="flex gap-4 justify-around">
                
                <button 
                  onClick={handlePet}
                  disabled={isInteracting}
                  className="flex flex-col items-center gap-2 group transition-transform active:scale-95 disabled:opacity-50"
                >
                  <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-100 transition-colors">
                    <Hand size={24} />
                  </div>
                  <span className="text-xs font-medium text-slate-600">摸一摸</span>
                </button>
                
                <button 
                  onClick={handleFeed}
                  disabled={isInteracting}
                  className="flex flex-col items-center gap-2 group transition-transform active:scale-95 disabled:opacity-50"
                >
                  <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 group-hover:bg-amber-100 transition-colors">
                    <Apple size={24} />
                  </div>
                  <span className="text-xs font-medium text-slate-600">喂苹果</span>
                </button>

                <button 
                  onClick={handleChat}
                  disabled={isInteracting}
                  className="flex flex-col items-center gap-2 group transition-transform active:scale-95 disabled:opacity-50"
                >
                  <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-100 transition-colors">
                    <MessageCircleHeart size={24} />
                  </div>
                  <span className="text-xs font-medium text-slate-600">陪我聊</span>
                </button>

              </div>
            </div>

            {/* Extra Tools Card (Visual filler) */}
            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-4 mb-8 mx-2 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 text-emerald-500 p-2.5 rounded-xl">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">备忘录助手</h4>
                  <p className="text-xs text-slate-500">让小象帮你记事</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </div>

          </main>

        </div>

        {/* Educational/Guide Panel - Desktop */}
        <div className="w-full xl:max-w-xl hidden xl:block self-center">
          <MiniProgramGuide />
        </div>

        {/* Mobile toggle for guide */}
        <div className="xl:hidden w-full max-w-[375px] mt-4 flex justify-center">
          <button 
            onClick={() => setShowGuide(!showGuide)}
            className="text-indigo-600 font-medium text-sm flex items-center gap-1 bg-indigo-50 px-6 py-3 rounded-full hover:bg-indigo-100 transition-colors"
          >
            <Code size={16} /> 
            {showGuide ? "收起代码指南" : "查看小程序实现指南"}
          </button>
        </div>

        {/* Educational/Guide Panel - Mobile Drawer */}
        <AnimatePresence>
          {showGuide && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden w-full max-w-[375px] overflow-hidden"
            >
              <MiniProgramGuide />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
