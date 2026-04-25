import React from 'react';
import { BookOpen, Code, Lightbulb } from 'lucide-react';

export function MiniProgramGuide() {
  return (
    <div className="w-full max-w-2xl bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm border border-slate-100 text-slate-800 text-sm overflow-y-auto max-h-[80vh]">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
          <BookOpen size={24} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">如何在小程序中实现灵动小象？</h2>
      </div>

      <p className="mb-4 leading-relaxed text-slate-600">
        你之前制作了小象的 <strong>JSON 动画文件（Lottie）</strong>，但缺乏交互。要让它"活"起来，我们需要在小程序中监听用户的操作（如点击、滑动），然后控制 Lottie 播放不同的动画片段（Segments）。
      </p>

      <div className="space-y-6">
        <section>
          <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-3 text-base">
            <Lightbulb size={18} className="text-yellow-500" />
            1. 交互原理解析
          </h3>
          <ul className="list-disc list-inside space-y-2 text-slate-600 bg-slate-50 p-4 rounded-xl">
            <li><strong>Idle (默认状态)</strong>: 循环播放小象呼吸、眨眼的动画片段 (例如 0-60帧)。</li>
            <li><strong>Happy (摸一摸)</strong>: 用户点击小象时，播放开心的动作 (例如 60-120帧)，播完回到默认状态。</li>
            <li><strong>Eating (喂食)</strong>: 拖拽食物到小象嘴边，播放吃东西的动画 (例如 120-180帧)。</li>
          </ul>
        </section>

        <section>
          <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-3 text-base">
            <Code size={18} className="text-indigo-500" />
            2. 微信小程序代码实现参考
          </h3>
          <p className="text-slate-500 mb-2">使用官方推荐的 <code>lottie-miniprogram</code> 库：</p>
          <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
<pre>{`// 1. 在 wxml 中添加 Canvas
<canvas id="lottie-canvas" type="2d" bindtap="handleTapElephant" />

// 2. 在 js 文件中初始化并控制动画
import lottie from 'lottie-miniprogram';

Page({
  data: { ani: null, isAnimating: false },
  
  onReady() {
    wx.createSelectorQuery().select('#lottie-canvas').node(res => {
      const canvas = res.node;
      const context = canvas.getContext('2d');
      lottie.setup(canvas);
      
      const ani = lottie.loadAnimation({
        loop: true,
        autoplay: true,
        animationData: require('../../assets/elephant.json'), // 你的 JSON
        rendererSettings: { context }
      });
      
      // 默认循环播放 0-60 帧（闲置状态）
      ani.playSegments([0, 60], true);
      this.setData({ ani });
    }).exec();
  },

  handleTapElephant() {
    if (this.data.isAnimating) return;
    this.setData({ isAnimating: true });
    
    // 点击后播放 60-120 帧（开心状态），不循环
    this.data.ani.playSegments([60, 120], true);
    
    // 监听动画完成，恢复默认状态
    this.data.ani.addEventListener('complete', () => {
      this.data.ani.playSegments([0, 60], true);
      this.setData({ isAnimating: false });
      this.data.ani.removeEventListener('complete');
    });
  }
});`}</pre>
          </div>
        </section>

        <section>
          <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-3 text-base">
            <Lightbulb size={18} className="text-emerald-500" />
            3. 给你的建议
          </h3>
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl">
            <p className="mb-2"><strong>拆分动画帧：</strong> 在 AE (After Effects) 中导出 JSON 时，把所有动作做在同一个时间轴上，并记录下不同动作的<strong>起始帧和结束帧</strong>。</p>
            <p><strong>状态机控制：</strong> 使用变量（如 <code>currentState</code>）来管理小象当前在干什么，防止用户疯狂点击导致动画错乱。</p>
          </div>
        </section>
      </div>
    </div>
  );
}
